import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

type TrackPrisma = InstanceType<typeof TrackEntity> & {
  favoritesId: string;
};

@Injectable()
export class TracksService {
  constructor(private prisma: PrismaService) {}

  transform({ favoritesId, ...track }: TrackPrisma): TrackEntity {
    return { ...track };
  }
  async create(createTrackDto: CreateTrackDto): Promise<RequestResult<TrackEntity>> {
    const newTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return {
      data: this.transform(newTrack),
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<RequestResult<TrackEntity[]>> {
    const tracks = await this.prisma.track.findMany();
    return {
      data: tracks.map((track) => this.transform(track)),
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
      data: this.transform(foundTrack),
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
      data: this.transform(updatedTrack),
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
