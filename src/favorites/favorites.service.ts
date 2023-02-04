import { forwardRef, HttpStatus, Inject, Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { TracksService } from '../tracks/tracks.service';
import { ArtistsService } from '../artists/artists.service';
import { FavoritesRepository } from '../common/DB/favorites-db';
import { RequestResult, FavoritesResponse } from '../common/interfaces';

@Injectable()
export class FavoritesService {
  private favorites: FavoritesRepository;

  constructor(
    @Inject(forwardRef(() => ArtistsService))
    private artistsService: ArtistsService,

    @Inject(forwardRef(() => AlbumsService))
    private albumsService: AlbumsService,

    @Inject(forwardRef(() => TracksService))
    private tracksService: TracksService
  ) {
    this.favorites = new FavoritesRepository();
  }

  async findAll(): Promise<RequestResult<FavoritesResponse>> {
    const artistIds = (await this.favorites.findAllArtist()).data;
    const trackIds = (await this.favorites.findAllTracks()).data;
    const albumIds = (await this.favorites.findAllAlbums()).data;

    return {
      data: {
        artists: (await this.artistsService.findAll(artistIds)).data,
        tracks: (await this.tracksService.findAll(trackIds)).data,
        albums: (await this.albumsService.findAll(albumIds)).data,
      },
      status: HttpStatus.OK,
    };
  }

  async addArtist(ArtistId: string) {
    const res = await this.artistsService.findOne(ArtistId);

    if (res.error) {
      res.status = HttpStatus.UNPROCESSABLE_ENTITY;
      return res;
    }

    return this.favorites.addArtist(ArtistId);
  }

  async addTrack(trackId: string) {
    const res = await this.tracksService.findOne(trackId);

    if (res.error) {
      res.status = HttpStatus.UNPROCESSABLE_ENTITY;
      return res;
    }

    return this.favorites.addTrack(trackId);
  }

  async addAlbum(albumId: string) {
    const res = await this.albumsService.findOne(albumId);

    if (res.error) {
      res.status = HttpStatus.UNPROCESSABLE_ENTITY;
      return res;
    }

    return this.favorites.addAlbum(albumId);
  }

  async removeArtist(ArtistId: string) {
    const res = await this.artistsService.findOne(ArtistId);

    if (res.error) return res;

    return this.favorites.removeArtist(ArtistId);
  }

  async removeTrack(trackId: string) {
    const res = await this.tracksService.findOne(trackId);

    if (res.error) return res;

    return this.favorites.removeTrack(trackId);
  }

  async removeAlbum(albumId: string) {
    const res = await this.albumsService.findOne(albumId);

    if (res.error) return res;

    return this.favorites.removeAlbum(albumId);
  }
}
