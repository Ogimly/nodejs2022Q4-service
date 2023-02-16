import { HttpStatus, Injectable } from '@nestjs/common';
import { DBEntities, DBMessages } from '../common/enums';
import { RequestResult, FavoritesResponse } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<RequestResult<FavoritesResponse>> {
    // const artistIds = (await this.favorites.findAllArtist()).data;
    // const trackIds = (await this.favorites.findAllTracks()).data;
    // const albumIds = (await this.favorites.findAllAlbums()).data;
    return {
      data: {
        artists: [],
        tracks: [],
        albums: [],
      },
      status: HttpStatus.OK,
    };
  }

  async addEntity(
    EntityId: string,
    nameEntity: DBEntities
  ): Promise<RequestResult<string>> {
    const namePrisma = nameEntity.toLocaleLowerCase();
    const res = await this.prisma[namePrisma].findUnique({ where: { id: EntityId } });

    if (!res) {
      return {
        data: null,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `${nameEntity} ${DBMessages.EntityNotFound}`,
      };
    }

    const favorites = await this.prisma.favorites.findMany();

    let favoritesId = '';
    if (favorites.length === 0) {
      const newFavorites = await this.prisma.favorites.create({ data: {} });
      favoritesId = newFavorites.id;
    } else {
      favoritesId = favorites[0].id;
    }

    await this.prisma[namePrisma].update({
      where: { id: EntityId },
      data: { favoritesId },
    });

    return {
      data: `${nameEntity} ${DBMessages.EntityAdded}`,
      status: HttpStatus.CREATED,
    };
  }

  async removeEntity(EntityId: string, nameEntity: DBEntities) {
    const namePrisma = nameEntity.toLocaleLowerCase();
    const res = await this.prisma[namePrisma].findUnique({ where: { id: EntityId } });

    if (!res) {
      return {
        data: null,
        status: HttpStatus.UNPROCESSABLE_ENTITY,
        error: `${nameEntity} ${DBMessages.EntityNotFound}`,
      };
    }

    if (res.favoritesId === null) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: `${nameEntity} ${DBMessages.EntityNotInFavorites}`,
      };
    }

    await this.prisma[namePrisma].update({
      where: { id: EntityId },
      data: { favoritesId: null },
    });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
