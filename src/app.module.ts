import {
  ClassSerializerInterceptor,
  MiddlewareConsumer,
  Module,
  NestModule,
  ValidationPipe,
} from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { UsersModule } from './users/users.module';
import { ArtistsModule } from './artists/artists.module';
import { TracksModule } from './tracks/tracks.module';
import { AlbumsModule } from './albums/albums.module';
import { FavoritesModule } from './favorites/favorites.module';
import { APP_FILTER, APP_INTERCEPTOR, APP_PIPE } from '@nestjs/core';
import { ErrorInterceptor } from './common/error/error.interceptor';
import { PrismaModule } from './common/prisma/prisma.module';
import { AppExceptionsFilter } from './common/app-exceptions/app-exceptions.filter';
import { LoggerMiddleware } from './common/app-logger/logger/logger.middleware';
import { AuthModule } from './auth/auth.module';

@Module({
  imports: [
    UsersModule,
    ArtistsModule,
    AlbumsModule,
    TracksModule,
    FavoritesModule,
    PrismaModule,
    AuthModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_INTERCEPTOR,
      useClass: ClassSerializerInterceptor,
    },
    {
      provide: APP_INTERCEPTOR,
      useClass: ErrorInterceptor,
    },
    {
      provide: APP_PIPE,
      useValue: new ValidationPipe(),
    },
    {
      provide: APP_FILTER,
      useClass: AppExceptionsFilter,
    },
  ],
})
export class AppModule implements NestModule {
  configure(consumer: MiddlewareConsumer) {
    consumer.apply(LoggerMiddleware).forRoutes('*');
  }
}
