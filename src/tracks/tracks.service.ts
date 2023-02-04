import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { TracksRepository } from '../common/DB/tracks-db';
import { FavoritesService } from '../favorites/favorites.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: TracksRepository;

  constructor(
    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService
  ) {
    this.tracks = new TracksRepository();
  }

  create(createTrackDto: CreateTrackDto) {
    return this.tracks.create(createTrackDto);
  }

  findAll(ids: string[] = []) {
    return this.tracks.findAll(ids);
  }

  findOne(id: string) {
    return this.tracks.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracks.update(id, updateTrackDto);
  }

  async remove(id: string) {
    await this.favoritesService.removeTrack(id);

    return this.tracks.remove(id);
  }

  removeArtistId(artistId: string) {
    return this.tracks.removeArtistId(artistId);
  }

  removeAlbumId(albumId: string) {
    return this.tracks.removeAlbumId(albumId);
  }
}
