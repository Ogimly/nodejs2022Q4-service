import { HttpException, Injectable, PipeTransform } from '@nestjs/common';
import { AlbumsService } from '../../../albums/albums.service';
import { CreateTrackDto } from '../../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../../tracks/dto/update-track.dto';

@Injectable()
export class ValidateAlbumIdPipe implements PipeTransform {
  constructor(private readonly albumsService: AlbumsService) {}

  async transform(
    dto: CreateTrackDto | UpdateTrackDto
  ): Promise<CreateTrackDto | UpdateTrackDto> {
    const response = await this.albumsService.validate(dto.albumId);

    if (response.error) {
      throw new HttpException(response.error, response.status);
    }

    return dto;
  }
}
