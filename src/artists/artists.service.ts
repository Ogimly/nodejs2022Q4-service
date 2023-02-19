import { Injectable } from '@nestjs/common';
import { ArtistsPrismaRepository } from '../common/prisma/artisrs.prisma.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: ArtistsPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.artists = new ArtistsPrismaRepository(prisma);
  }

  create(createArtistDto: CreateArtistDto) {
    return this.artists.create(createArtistDto);
  }

  findAll() {
    return this.artists.findAll();
  }

  findOne(id: string) {
    return this.artists.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artists.remove(id);
  }

  validate(id: string) {
    return this.artists.validate(id);
  }
}
