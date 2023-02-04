import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBErrors } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { TrackEntity } from '../tracks/entities/track.entity';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

export class TracksRepository {
  private artists: TrackEntity[] = [];

  public async create(
    createTrackDto: CreateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const newTrack = new TrackEntity({
      ...createTrackDto,
      id: uuid.v4(),
    });

    if (!newTrack.albumId) newTrack.albumId = null;
    if (!newTrack.artistId) newTrack.artistId = null;

    this.artists.push(newTrack);

    return {
      data: newTrack,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<TrackEntity[]>> {
    return {
      data: this.artists,
      status: HttpStatus.OK,
    };
  }

  public async findOne(artistId: string): Promise<RequestResult<TrackEntity>> {
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
    updateTrackDto: UpdateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const foundArtist = this.artists.find(({ id }) => id === artistId);

    if (!foundArtist)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.ArtistNotFound,
      };

    Object.assign(foundArtist, updateTrackDto);

    return {
      data: foundArtist,
      status: HttpStatus.OK,
    };
  }

  public async remove(artistId: string): Promise<RequestResult<TrackEntity>> {
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
