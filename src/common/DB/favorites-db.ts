import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';

export class FavoritesRepository {
  private artists: string[] = [];
  private tracks: string[] = [];
  private albums: string[] = [];

  public async findAllArtist(): Promise<RequestResult<string[]>> {
    return {
      data: this.artists,
      status: HttpStatus.OK,
    };
  }

  public async findAllTracks(): Promise<RequestResult<string[]>> {
    return {
      data: this.tracks,
      status: HttpStatus.OK,
    };
  }

  public async findAllAlbums(): Promise<RequestResult<string[]>> {
    return {
      data: this.albums,
      status: HttpStatus.OK,
    };
  }

  public async addArtist(artistId: string): Promise<RequestResult<string>> {
    if (!this.artists.includes(artistId)) this.artists.push(artistId);

    return {
      data: DBMessages.ArtistAdded,
      status: HttpStatus.CREATED,
    };
  }

  public async addTrack(trackId: string): Promise<RequestResult<string>> {
    if (!this.tracks.includes(trackId)) this.tracks.push(trackId);

    return {
      data: DBMessages.TrackAdded,
      status: HttpStatus.CREATED,
    };
  }

  public async addAlbum(albumId: string): Promise<RequestResult<string>> {
    if (!this.albums.includes(albumId)) this.albums.push(albumId);

    return {
      data: DBMessages.AlbumAdded,
      status: HttpStatus.CREATED,
    };
  }

  public async removeArtist(artistId: string): Promise<RequestResult<string>> {
    const idx = this.artists.findIndex((id) => id === artistId);

    if (idx === -1)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotInFavorites,
      };

    this.artists.splice(idx, 1);

    return {
      data: DBMessages.ArtistRemoved,
      status: HttpStatus.NO_CONTENT,
    };
  }

  public async removeTrack(trackId: string): Promise<RequestResult<string>> {
    const idx = this.tracks.findIndex((id) => id === trackId);

    if (idx === -1)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.TrackNotInFavorites,
      };

    this.tracks.splice(idx, 1);

    return {
      data: DBMessages.TrackRemoved,
      status: HttpStatus.NO_CONTENT,
    };
  }

  public async removeAlbum(albumId: string): Promise<RequestResult<string>> {
    const idx = this.albums.findIndex((id) => id === albumId);

    if (idx === -1)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotInFavorites,
      };

    this.albums.splice(idx, 1);

    return {
      data: DBMessages.AlbumRemoved,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
