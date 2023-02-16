import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  async create(createTrackDto: CreateTrackDto): Promise<RequestResult<TrackEntity>> {
    const newTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return {
      data: newTrack,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<RequestResult<TrackEntity[]>> {
    const tracks = await this.prisma.track.findMany();
    return {
      data: tracks,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string): Promise<RequestResult<TrackEntity>> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!foundTrack)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.TrackNotFound,
      };

    return {
      data: foundTrack,
      status: HttpStatus.OK,
    };
  }

  async update(
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
      data: updatedTrack,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<RequestResult<TrackEntity>> {
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
