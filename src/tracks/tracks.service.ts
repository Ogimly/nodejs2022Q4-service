import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { TracksPrismaRepository } from '../common/prisma/tracks.prisma.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import { TrackEntity } from './entities/track.entity';

@Injectable()
export class TracksService {
  private tracks: TracksPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.tracks = new TracksPrismaRepository(prisma);
  }

  create(createTrackDto: CreateTrackDto): Promise<TrackEntity> {
    return this.tracks.create(createTrackDto);
  }

  findAll(): Promise<TrackEntity[]> {
    return this.tracks.findAll();
  }

  findOne(id: string): Promise<TrackEntity> {
    return this.tracks.findOne(id);
  }

  update(id: string, updateTrackDto: UpdateTrackDto): Promise<TrackEntity> {
    return this.tracks.update(id, updateTrackDto);
  }

  remove(id: string): Promise<void> {
    return this.tracks.remove(id);
  }
}
