import { NotFoundException } from '@nestjs/common';
import { DBMessages } from '../enums';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { CreateAlbumDto } from '../../albums/dto/create-album.dto';
import { UpdateAlbumDto } from '../../albums/dto/update-album.dto';
import { PrismaService } from './prisma.service';

export class AlbumsPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    const newAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return new AlbumEntity(newAlbum);
  }

  public async findAll(): Promise<AlbumEntity[]> {
    const albums = await this.prisma.album.findMany();

    return albums.map((album) => new AlbumEntity(album));
  }

  public async findOne(id: string): Promise<AlbumEntity> {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum) throw new NotFoundException(DBMessages.AlbumNotFound);

    return new AlbumEntity(foundAlbum);
  }

  public async update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    const updatedAlbum = await this.prisma.album.update({
      where: { id },
      data: updateAlbumDto,
    });

    return new AlbumEntity(updatedAlbum);
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.album.delete({ where: { id } });
  }

  public async validate(id: string): Promise<boolean> {
    if (id === null) return true;

    await this.findOne(id);

    return true;
  }
}
