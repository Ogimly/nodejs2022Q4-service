import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { PrismaService } from './prisma.service';
import { ArtistsService } from '../../artists/artists.service';

export class AlbumsPrismaRepository {
  constructor(
    private prisma: PrismaService,
    private readonly artistService: ArtistsService
  ) {}

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
    const artistValid = await this.artistService.validate(updateAlbumDto.artistId);
    if (artistValid.error)
      return {
        data: null,
        status: HttpStatus.BAD_REQUEST,
        error: DBMessages.ArtistNotFound,
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
    await this.prisma.album.delete({ where: { id } });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }

  public async validate(id: string): Promise<RequestResult<boolean>> {
    if (id === null)
      return {
        data: true,
        status: HttpStatus.OK,
      };

    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: false,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    return {
      data: true,
      status: HttpStatus.OK,
    };
  }
}
