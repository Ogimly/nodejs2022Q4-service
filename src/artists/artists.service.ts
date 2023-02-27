import { Injectable } from '@nestjs/common';
import { ArtistsPrismaRepository } from '../common/prisma/artisrs.prisma.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  private artists: ArtistsPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.artists = new ArtistsPrismaRepository(prisma);
  }

  create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    return this.artists.create(createArtistDto);
  }

  findAll(): Promise<ArtistEntity[]> {
    return this.artists.findAll();
  }

  findOne(id: string): Promise<ArtistEntity> {
    return this.artists.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto): Promise<ArtistEntity> {
    return this.artists.update(id, updateArtistDto);
  }

  remove(id: string): Promise<void> {
    return this.artists.remove(id);
  }

  validate(id: string): Promise<boolean> {
    return this.artists.validate(id);
  }
}
