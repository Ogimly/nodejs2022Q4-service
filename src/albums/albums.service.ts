import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

type AlbumPrisma = InstanceType<typeof AlbumEntity> & {
  favoritesId: string;
};

@Injectable()
export class AlbumsService {
  constructor(private prisma: PrismaService) {}

  transform({ favoritesId, ...album }: AlbumPrisma): AlbumEntity {
    return { ...album };
  }

  async create(createAlbumDto: CreateAlbumDto): Promise<RequestResult<AlbumEntity>> {
    const newAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return {
      data: this.transform(newAlbum),
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<RequestResult<AlbumEntity[]>> {
    const albums = await this.prisma.album.findMany();
    return {
      data: albums.map((album) => this.transform(album)),
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    return {
      data: this.transform(foundAlbum),
      status: HttpStatus.OK,
    };
  }

  async update(
    id: string,
    updateAlbumDto: UpdateAlbumDto
  ): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return {
      data: this.transform(updatedAlbum),
      status: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    await this.prisma.album.delete({ where: { id } });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
