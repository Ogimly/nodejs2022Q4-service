import { Injectable, PipeTransform } from '@nestjs/common';
import { ArtistsService } from '../../../artists/artists.service';
import { ArtistEntity } from '../../../artists/entities/artist.entity';

@Injectable()
export class ArtistByIdPipe implements PipeTransform<string, Promise<ArtistEntity>> {
  constructor(private readonly artistsService: ArtistsService) {}

  async transform(id: string): Promise<ArtistEntity> {
    return this.artistsService.findOne(id);
  }
}
