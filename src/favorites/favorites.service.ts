import { Injectable } from '@nestjs/common';

@Injectable()
export class FavoritesService {
  findAll() {
    return `This action returns all favorites`;
  }

  addTrack(trackId: string) {
    return `This action add a #${trackId} favorite`;
  }

  removeTrack(trackId: string) {
    return `This action removes a #${trackId} favorite`;
  }

  addAlbum(albumId: string) {
    return `This action add a #${albumId} favorite`;
  }

  removeAlbum(albumId: string) {
    return `This action removes a #${albumId} favorite`;
  }

  addArtist(ArtistId: string) {
    return `This action add a #${ArtistId} favorite`;
  }

  removeArtist(ArtistId: string) {
    return `This action removes a #${ArtistId} favorite`;
  }
}
