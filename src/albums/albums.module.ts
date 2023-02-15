import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
// import { TracksModule } from '../tracks/tracks.module';
// import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    // forwardRef(() => TracksModule), forwardRef(() => FavoritesModule)
  ],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
