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

  // public async remove(albumId: string): Promise<RequestResult<AlbumEntity>> {
  //   const index = this.albums.findIndex(({ id }) => id === albumId);

  //   if (index === -1) {
  //     return {
  //       data: null,
  //       status: HttpStatus.NOT_FOUND,
  //       error: DBMessages.AlbumNotFound,
  //     };
  //   }

  //   this.albums.splice(index, 1);

  //   return {
  //     data: null,
  //     status: HttpStatus.NO_CONTENT,
  //   };
  //}
}
