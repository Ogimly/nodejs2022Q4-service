import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';

export class ArtistsRepository {
  private artists: ArtistEntity[] = [];

  public async create(
    createArtistDto: CreateArtistDto
  ): Promise<RequestResult<ArtistEntity>> {
    const newArtist = new ArtistEntity({
      ...createArtistDto,
      id: uuid.v4(),
    });
    this.artists.push(newArtist);

    return {
      data: newArtist,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(ids: string[] = []): Promise<RequestResult<ArtistEntity[]>> {
    return {
      data:
        ids.length === 0
          ? this.artists
          : this.artists.filter(({ id }) => ids.includes(id)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(artistId: string): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = this.artists.find(({ id }) => id === artistId);

    if (!foundArtist) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };
    }

    return {
      data: foundArtist,
      status: HttpStatus.OK,
    };
  }

  public async update(
    artistId: string,
    updateArtistDto: UpdateArtistDto
  ): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = this.artists.find(({ id }) => id === artistId);

    if (!foundArtist)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };

    Object.assign(foundArtist, updateArtistDto);

    return {
      data: foundArtist,
      status: HttpStatus.OK,
    };
  }

  public async remove(artistId: string): Promise<RequestResult<ArtistEntity>> {
    const index = this.artists.findIndex(({ id }) => id === artistId);

    if (index === -1) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };
    }

    this.artists.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
