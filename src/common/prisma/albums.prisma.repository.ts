import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { PrismaService } from './prisma.service';

export class AlbumsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(
    createAlbumDto: CreateAlbumDto
  ): Promise<RequestResult<AlbumEntity>> {
    const newAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return {
      data: new AlbumEntity(newAlbum),
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<AlbumEntity[]>> {
    const albums = await this.prisma.album.findMany();

    return {
      data: albums.map((album) => new AlbumEntity(album)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(id: string): Promise<RequestResult<AlbumEntity>> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    return {
      data: new AlbumEntity(foundAlbum),
      status: HttpStatus.OK,
    };
  }

  public async update(
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
      data: new AlbumEntity(updatedAlbum),
      status: HttpStatus.OK,
    };
  }

  public async remove(id: string): Promise<RequestResult<AlbumEntity>> {
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
