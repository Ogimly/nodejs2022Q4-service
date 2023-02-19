import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { PrismaService } from './prisma.service';

export class TracksPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(
    createTrackDto: CreateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const newTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return {
      data: new TrackEntity(newTrack),
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<TrackEntity[]>> {
    const tracks = await this.prisma.track.findMany();

    return {
      data: tracks.map((track) => new TrackEntity(track)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(id: string): Promise<RequestResult<TrackEntity>> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!foundTrack)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.TrackNotFound,
      };

    return {
      data: new TrackEntity(foundTrack),
      status: HttpStatus.OK,
    };
  }

  public async update(
    id: string,
    updateTrackDto: UpdateTrackDto
  ): Promise<RequestResult<TrackEntity>> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!foundTrack)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.TrackNotFound,
      };

    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return {
      data: new TrackEntity(updatedTrack),
      status: HttpStatus.OK,
    };
  }

  public async remove(id: string): Promise<RequestResult<TrackEntity>> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!foundTrack)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.TrackNotFound,
      };

    await this.prisma.track.delete({ where: { id } });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
