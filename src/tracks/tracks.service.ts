import { Injectable } from '@nestjs/common';
import { TracksRepository } from '../common/DB/tracks-db';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: TracksRepository;

  constructor() {
    this.tracks = new TracksRepository();
  }

  create(createTrackDto: CreateTrackDto) {
    return this.tracks.create(createTrackDto);
  }

  findAll() {
    return this.tracks.findAll();
  }

  findOne(id: string) {
    return this.tracks.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracks.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.tracks.remove(id);
  }

  removeArtistId(artistId: string) {
    return this.tracks.removeArtistId(artistId);
  }

  removeAlbumId(albumId: string) {
    return this.tracks.removeAlbumId(albumId);
  }
}
