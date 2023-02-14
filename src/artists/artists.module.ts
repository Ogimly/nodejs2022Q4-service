import { forwardRef, Module } from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { ArtistsController } from './artists.controller';
// import { TracksModule } from '../tracks/tracks.module';
// import { AlbumsModule } from '../albums/albums.module';
// import { FavoritesModule } from '../favorites/favorites.module';
import { PrismaModule } from '../common/prisma/prisma.module';

@Module({
  imports: [
    PrismaModule,
    // forwardRef(() => TracksModule),
    // forwardRef(() => AlbumsModule),
    // forwardRef(() => FavoritesModule),
  ],
  controllers: [ArtistsController],
  providers: [ArtistsService],
  exports: [ArtistsService],
})
export class ArtistsModule {}
