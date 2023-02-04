import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBErrors } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { CreateArtistDto } from '../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../artists/dto/update-artist.dto';

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

  public async findAll(): Promise<RequestResult<ArtistEntity[]>> {
    return {
      data: this.artists,
      status: HttpStatus.OK,
    };
  }

  public async findOne(artistId: string): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = this.artists.find(({ id }) => id === artistId);

    if (!foundArtist) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.ArtistNotFound,
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
        error: DBErrors.ArtistNotFound,
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
        error: DBErrors.ArtistNotFound,
      };
    }

    this.artists.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
