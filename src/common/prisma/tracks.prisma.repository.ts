import { NotFoundException } from '@nestjs/common';
import { DBMessages } from '../enums';
import { TrackEntity } from '../../tracks/entities/track.entity';
import { CreateTrackDto } from '../../tracks/dto/create-track.dto';
import { UpdateTrackDto } from '../../tracks/dto/update-track.dto';
import { PrismaService } from './prisma.service';

export class TracksPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    const newTrack = await this.prisma.track.create({
      data: createTrackDto,
    });

    return new TrackEntity(newTrack);
  }

  public async findAll(): Promise<TrackEntity[]> {
    const tracks = await this.prisma.track.findMany();

    return tracks.map((track) => new TrackEntity(track));
  }

  public async findOne(id: string): Promise<TrackEntity> {
    const foundTrack = await this.prisma.track.findUnique({ where: { id } });

    if (!foundTrack) throw new NotFoundException(DBMessages.TrackNotFound);

    return new TrackEntity(foundTrack);
  }

  public async update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    const updatedTrack = await this.prisma.track.update({
      where: { id },
      data: updateTrackDto,
    });

    return new TrackEntity(updatedTrack);
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.track.delete({ where: { id } });
  }
}
