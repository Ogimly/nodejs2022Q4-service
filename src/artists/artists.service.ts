import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

type ArtistPrisma = InstanceType<typeof ArtistEntity> & {
  favoritesId: string;
};

@Injectable()
export class ArtistsService {
  constructor(private prisma: PrismaService) {}

  transform({ favoritesId, ...artist }: ArtistPrisma): ArtistEntity {
    return { ...artist };
  }

  async create(createArtistDto: CreateArtistDto): Promise<RequestResult<ArtistEntity>> {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return {
      data: this.transform(newArtist),
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<RequestResult<ArtistEntity[]>> {
    // return this.prisma.artist.findAll(ids);
    const artists = await this.prisma.artist.findMany();
    return {
      data: artists.map((artist) => this.transform(artist)),
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!foundArtist)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };

    return {
      data: this.transform(foundArtist),
      status: HttpStatus.OK,
    };
  }

  async update(
    id: string,
    updateArtistDto: UpdateArtistDto
  ): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!foundArtist)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };

    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return {
      data: this.transform(updatedArtist),
      status: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!foundArtist)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };

    await this.prisma.artist.delete({ where: { id } });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
