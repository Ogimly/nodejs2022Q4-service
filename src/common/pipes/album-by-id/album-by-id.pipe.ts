import { Injectable, PipeTransform } from '@nestjs/common';
import { AlbumsService } from '../../../albums/albums.service';
import { AlbumEntity } from '../../../albums/entities/album.entity';

@Injectable()
export class AlbumByIdPipe implements PipeTransform<string, Promise<AlbumEntity>> {
  constructor(private readonly albumsService: AlbumsService) {}

  async transform(id: string): Promise<AlbumEntity> {
    return this.albumsService.findOne(id);
  }
}
