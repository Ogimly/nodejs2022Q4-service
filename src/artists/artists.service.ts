import { forwardRef, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsRepository } from '../common/DB/artisrs-db';
import { FavoritesService } from '../favorites/favorites.service';
import { TracksService } from '../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: ArtistsRepository;

  constructor(
    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService,

    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @Inject(forwardRef(() => FavoritesService))
    private favoritesService: FavoritesService
  ) {
    this.artists = new ArtistsRepository();
  }

  create(createArtistDto: CreateArtistDto) {
    return this.artists.create(createArtistDto);
  }

  findAll(ids: string[] = []) {
    return this.artists.findAll(ids);
  }

  findOne(id: string) {
    return this.artists.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artists.update(id, updateArtistDto);
  }

  async remove(id: string) {
    await this.tracksService.removeArtistId(id);
    await this.albumsService.removeArtistId(id);
    await this.favoritesService.removeArtist(id);

    return this.artists.remove(id);
  }
}
