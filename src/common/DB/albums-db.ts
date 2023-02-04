import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';

export class AlbumsRepository {
  private albums: AlbumEntity[] = [];

  public async create(
    createAlbumDto: CreateAlbumDto
  ): Promise<RequestResult<AlbumEntity>> {
    const newAlbum = new AlbumEntity({
      ...createAlbumDto,
      id: uuid.v4(),
    });

    if (!newAlbum.artistId) newAlbum.artistId = null;

    this.albums.push(newAlbum);

    return {
      data: newAlbum,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(ids: string[] = []): Promise<RequestResult<AlbumEntity[]>> {
    return {
      data:
        ids.length === 0 ? this.albums : this.albums.filter(({ id }) => ids.includes(id)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(albumId: string): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = this.albums.find(({ id }) => id === albumId);

    if (!foundAlbum) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };
    }

    return {
      data: foundAlbum,
      status: HttpStatus.OK,
    };
  }

  public async update(
    albumId: string,
    updateAlbumDto: UpdateAlbumDto
  ): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = this.albums.find(({ id }) => id === albumId);

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    Object.assign(foundAlbum, updateAlbumDto);

    return {
      data: foundAlbum,
      status: HttpStatus.OK,
    };
  }

  public async remove(albumId: string): Promise<RequestResult<AlbumEntity>> {
    const index = this.albums.findIndex(({ id }) => id === albumId);

    if (index === -1) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };
    }

    this.albums.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }

  public async removeArtistId(idToRemoved: string): Promise<void> {
    const foundAlbums = this.albums.filter(({ artistId }) => artistId === idToRemoved);

    foundAlbums.forEach((album) => (album.artistId = null));
  }
}
