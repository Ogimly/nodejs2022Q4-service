import { Injectable } from '@nestjs/common';
import { AlbumsRepository } from '../common/DB/albums-db';
import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums: AlbumsRepository;

  constructor(private tracksService: TracksService) {
    this.albums = new AlbumsRepository();
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albums.create(createAlbumDto);
  }

  findAll(ids: string[] = []) {
    return this.albums.findAll(ids);
  }

  findOne(id: string) {
    return this.albums.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albums.update(id, updateAlbumDto);
  }

  async remove(id: string) {
    await this.tracksService.removeAlbumId(id);

    return this.albums.remove(id);
  }

  removeArtistId(artistId: string) {
    return this.albums.removeArtistId(artistId);
  }
}
