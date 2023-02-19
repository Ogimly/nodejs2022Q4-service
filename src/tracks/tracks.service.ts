import { Injectable } from '@nestjs/common';
import { AlbumsService } from '../albums/albums.service';
import { ArtistsService } from '../artists/artists.service';
import { PrismaService } from '../common/prisma/prisma.service';
import { TracksPrismaRepository } from '../common/prisma/tracks.prisma.repository';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';

@Injectable()
export class TracksService {
  private tracks: TracksPrismaRepository;

  constructor(
    private prisma: PrismaService,
    private readonly artistService: ArtistsService,
    private readonly albumService: AlbumsService
  ) {
    this.tracks = new TracksPrismaRepository(prisma, artistService, albumService);
  }

  create(createTrackDto: CreateTrackDto) {
    return this.tracks.create(createTrackDto);
  }

  findAll() {
    return this.tracks.findAll();
  }

  findOne(id: string) {
    return this.tracks.findOne(id);
  }
  update(id: string, updateTrackDto: UpdateTrackDto) {
    return this.tracks.update(id, updateTrackDto);
  }

  remove(id: string) {
    return this.tracks.remove(id);
  }
}
