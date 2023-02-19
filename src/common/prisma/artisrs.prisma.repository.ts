import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { PrismaService } from './prisma.service';

export class ArtistsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(
    createArtistDto: CreateArtistDto
  ): Promise<RequestResult<ArtistEntity>> {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return {
      data: new ArtistEntity(newArtist),
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<ArtistEntity[]>> {
    const artists = await this.prisma.artist.findMany();

    return {
      data: artists.map((artist) => new ArtistEntity(artist)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(id: string): Promise<RequestResult<ArtistEntity>> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!foundArtist) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.ArtistNotFound,
      };
    }

    return {
      data: new ArtistEntity(foundArtist),
      status: HttpStatus.OK,
    };
  }

  public async update(
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
      data: new ArtistEntity(updatedArtist),
      status: HttpStatus.OK,
    };
  }

  public async remove(id: string): Promise<RequestResult<ArtistEntity>> {
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
