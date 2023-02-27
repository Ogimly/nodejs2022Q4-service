import { Injectable } from '@nestjs/common';
import { DBEntities } from '../common/enums';
import { FavoritesResponse } from '../common/interfaces';
import { FavoritesPrismaRepository } from '../common/prisma/favorites.prisma.repository';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  private favorites: FavoritesPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.favorites = new FavoritesPrismaRepository(prisma);
  }

  findAll(): Promise<FavoritesResponse> {
    return this.favorites.findAll();
  }

  addArtist(ArtistId: string): Promise<string> {
    return this.favorites.addEntity(ArtistId, DBEntities.Artist);
  }

  addTrack(trackId: string): Promise<string> {
    return this.favorites.addEntity(trackId, DBEntities.Track);
  }

  addAlbum(albumId: string): Promise<string> {
    return this.favorites.addEntity(albumId, DBEntities.Album);
  }

  removeArtist(ArtistId: string): Promise<void> {
    return this.favorites.removeEntity(ArtistId, DBEntities.Artist);
  }

  removeTrack(trackId: string): Promise<void> {
    return this.favorites.removeEntity(trackId, DBEntities.Track);
  }

  removeAlbum(albumId: string): Promise<void> {
    return this.favorites.removeEntity(albumId, DBEntities.Album);
  }
}
