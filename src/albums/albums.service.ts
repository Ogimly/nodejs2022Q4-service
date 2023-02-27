import { Injectable } from '@nestjs/common';
import { AlbumsPrismaRepository } from '../common/prisma/albums.prisma.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@Injectable()
export class AlbumsService {
  private albums: AlbumsPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.albums = new AlbumsPrismaRepository(prisma);
  }

  create(createAlbumDto: CreateAlbumDto): Promise<AlbumEntity> {
    return this.albums.create(createAlbumDto);
  }

  findAll(): Promise<AlbumEntity[]> {
    return this.albums.findAll();
  }

  findOne(id: string): Promise<AlbumEntity> {
    return this.albums.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto): Promise<AlbumEntity> {
    return this.albums.update(id, updateAlbumDto);
  }

  remove(id: string): Promise<void> {
    return this.albums.remove(id);
  }

  validate(id: string): Promise<boolean> {
    return this.albums.validate(id);
  }
}
