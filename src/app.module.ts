import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { ConfigModule } from '@nestjs/config';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { APP_FILTER, APP_GUARD, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { PrismaModule } from './common/prisma/prisma.module';
import { AppExceptionsFilter } from './common/filters/app-exceptions/app-exceptions.filter';
import { LoggerMiddleware } from './common/middlewares/logger/logger.middleware';
import { AuthModule } from './auth/auth.module';
import appConfig from './common/config/app-config';
import loggerConfig from './common/config/logger-config';
import authConfig from './common/config/auth-config';
import { AccessGuard } from './common/guards/access/access.guard';
import { HashService } from './common/services/hash/hash.service';
import { LoggerInterceptor } from './common/interceptors/logger/logger.interceptor';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
    ConfigModule.forRoot({
      isGlobal: true,
      load: [appConfig, loggerConfig, authConfig],
    }),
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
    {
      provide: APP_GUARD,
      useClass: AccessGuard,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: LoggerInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
    HashService,
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
