import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { AlbumsService } from '../../../albums/albums.service';
import { AlbumEntity } from '../../../albums/entities/album.entity';

@Injectable()
export class AlbumByIdPipe implements PipeTransform<string, Promise<AlbumEntity>> {
  constructor(private readonly albumsService: AlbumsService) {}

  async transform(id: string): Promise<AlbumEntity> {
    const response = await this.albumsService.findOne(id);

    if (response.error) {
      throw new HttpException(response.error, response.status);
    }

    return response.data;
  }
}
