import { NotFoundException, UnprocessableEntityException } from '@nestjs/common';
import { DBEntities, DBMessages } from '../enums';
import { FavoritesResponse } from '../interfaces';
import { PrismaService } from './prisma.service';

export class FavoritesPrismaRepository {
  constructor(private prisma: PrismaService) {}

  async findAll(): Promise<FavoritesResponse> {
    const res = await this.prisma.favorites.findMany({
      select: {
        artists: {
          select: { id: true, name: true, grammy: true },
        },
        tracks: {
          select: {
            id: true,
            name: true,
            duration: true,
            artistId: true,
            albumId: true,
          },
        },
        albums: {
          select: { id: true, name: true, year: true, artistId: true },
        },
      },
    });

    return res.length === 0 ? { artists: [], tracks: [], albums: [] } : res[0];
  }

  async addEntity(EntityId: string, nameEntity: DBEntities): Promise<string> {
    const namePrisma = nameEntity.toLocaleLowerCase();
    const res = await this.prisma[namePrisma].findUnique({ where: { id: EntityId } });

    if (!res)
      throw new UnprocessableEntityException(
        `${nameEntity} ${DBMessages.EntityNotFound}`
      );

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

    return `${nameEntity} ${DBMessages.EntityAdded}`;
  }

  async removeEntity(EntityId: string, nameEntity: DBEntities): Promise<void> {
    const namePrisma = nameEntity.toLocaleLowerCase();
    const res = await this.prisma[namePrisma].findUnique({ where: { id: EntityId } });

    if (!res)
      throw new UnprocessableEntityException(
        `${nameEntity} ${DBMessages.EntityNotFound}`
      );

    if (res.favoritesId === null)
      throw new NotFoundException(`${nameEntity} ${DBMessages.EntityNotInFavorites}`);

    await this.prisma[namePrisma].update({
      where: { id: EntityId },
      data: { favoritesId: null },
    });
  }
}
