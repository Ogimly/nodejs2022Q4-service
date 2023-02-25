import { NotFoundException } from '@nestjs/common';
import { DBMessages } from '../enums';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { CreateArtistDto } from '../../artists/dto/create-artist.dto';
import { UpdateArtistDto } from '../../artists/dto/update-artist.dto';
import { PrismaService } from './prisma.service';

export class ArtistsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createArtistDto: CreateArtistDto): Promise<ArtistEntity> {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return new ArtistEntity(newArtist);
  }

  public async findAll(): Promise<ArtistEntity[]> {
    const artists = await this.prisma.artist.findMany();

    return artists.map((artist) => new ArtistEntity(artist));
  }

  public async findOne(id: string): Promise<ArtistEntity> {
    const foundArtist = await this.prisma.artist.findUnique({ where: { id } });

    if (!foundArtist) throw new NotFoundException(DBMessages.ArtistNotFound);

    return new ArtistEntity(foundArtist);
  }

  public async update(
    id: string,
    updateArtistDto: UpdateArtistDto
  ): Promise<ArtistEntity> {
    const updatedArtist = await this.prisma.artist.update({
      where: { id },
      data: updateArtistDto,
    });

    return new ArtistEntity(updatedArtist);
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.artist.delete({ where: { id } });
  }

  public async validate(id: string): Promise<boolean> {
    if (id === null) return true;

    await this.findOne(id);

    return true;
  }
}
