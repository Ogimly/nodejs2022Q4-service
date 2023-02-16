import { HttpStatus, Injectable } from '@nestjs/common';
import { DBEntities, DBMessages } from '../common/enums';
import { RequestResult, FavoritesResponse } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';

@Injectable()
export class FavoritesService {
  constructor(private prisma: PrismaService) {}

  // async findAll(): Promise<RequestResult<FavoritesResponse>> {
  //   const artistIds = (await this.favorites.findAllArtist()).data;
  //   const trackIds = (await this.favorites.findAllTracks()).data;
  //   const albumIds = (await this.favorites.findAllAlbums()).data;
  //   return {
  //     data: {
  //       artists:
  //         artistIds.length === 0
  //           ? []
  //           : (await this.artistsService.findAll(artistIds)).data,
  //       tracks:
  //         trackIds.length === 0 ? [] : (await this.tracksService.findAll(trackIds)).data,
  //       albums:
  //         albumIds.length === 0 ? [] : (await this.albumsService.findAll(albumIds)).data,
  //     },
  //     status: HttpStatus.OK,
  //   };
  // }

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

  // async removeArtist(ArtistId: string) {
  //   const res = await this.artistsService.findOne(ArtistId);

  //   if (res.error) return res;

  //   return this.favorites.removeArtist(ArtistId);
  // }

  // async removeTrack(trackId: string) {
  //   const res = await this.tracksService.findOne(trackId);

  //   if (res.error) return res;

  //   return this.favorites.removeTrack(trackId);
  // }

  // async removeAlbum(albumId: string) {
  //   const res = await this.albumsService.findOne(albumId);

  //   if (res.error) return res;

  //   return this.favorites.removeAlbum(albumId);
  // }
}
