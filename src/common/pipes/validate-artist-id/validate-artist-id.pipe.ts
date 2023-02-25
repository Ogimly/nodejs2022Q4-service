import { Injectable, PipeTransform } from '@nestjs/common';
import { ArtistsService } from '../../../artists/artists.service';
import { CreateAlbumDto } from '../../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../../albums/dto/update-album.dto';
import { CreateTrackDto } from '../../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../../tracks/dto/update-track.dto';

@Injectable()
export class ValidateArtistIdPipe implements PipeTransform {
  constructor(private readonly artistsService: ArtistsService) {}

  async transform(
    dto: CreateTrackDto | CreateAlbumDto | UpdateTrackDto | UpdateAlbumDto
  ): Promise<CreateTrackDto | CreateAlbumDto | UpdateTrackDto | UpdateAlbumDto> {
    await this.artistsService.validate(dto.artistId);

    return dto;
  }
}
