import { Module } from '@nestjs/common';
import { AlbumsService } from './albums.service';
import { AlbumsController } from './albums.controller';
import { PrismaModule } from '../common/prisma/prisma.module';
import { ArtistsModule } from '../artists/artists.module';

@Module({
  imports: [PrismaModule, ArtistsModule],
  controllers: [AlbumsController],
  providers: [AlbumsService],
  exports: [AlbumsService],
})
export class AlbumsModule {}
