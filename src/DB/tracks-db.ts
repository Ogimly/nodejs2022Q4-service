import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBErrors } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { TrackEntity } from '../tracks/entities/track.entity';
import { CreateTrackDto } from '../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../tracks/dto/update-track.dto';

export class TracksRepository {
  private tracks: TrackEntity[] = [];

  public async create(
    createTrackDto: CreateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const newTrack = new TrackEntity({
      ...createTrackDto,
      id: uuid.v4(),
    });

    if (!newTrack.albumId) newTrack.albumId = null;
    if (!newTrack.artistId) newTrack.artistId = null;

    this.tracks.push(newTrack);

    return {
      data: newTrack,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<TrackEntity[]>> {
    return {
      data: this.tracks,
      status: HttpStatus.OK,
    };
  }

  public async findOne(trackId: string): Promise<RequestResult<TrackEntity>> {
    const foundTrack = this.tracks.find(({ id }) => id === trackId);

    if (!foundTrack) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.TrackNotFound,
      };
    }

    return {
      data: foundTrack,
      status: HttpStatus.OK,
    };
  }

  public async update(
    trackId: string,
    updateTrackDto: UpdateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const foundTrack = this.tracks.find(({ id }) => id === trackId);

    if (!foundTrack)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.TrackNotFound,
      };

    Object.assign(foundTrack, updateTrackDto);

    return {
      data: foundTrack,
      status: HttpStatus.OK,
    };
  }

  public async remove(trackId: string): Promise<RequestResult<TrackEntity>> {
    const index = this.tracks.findIndex(({ id }) => id === trackId);

    if (index === -1) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.TrackNotFound,
      };
    }

    this.tracks.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }

  public async removeArtistId(idToRemoved: string): Promise<void> {
    const foundTracks = this.tracks.filter(({ artistId }) => artistId === idToRemoved);

    foundTracks.forEach((track) => (track.artistId = null));
  }
}
