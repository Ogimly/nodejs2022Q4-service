import { Injectable } from '@nestjs/common';
import { ArtistsService } from '../artists/artists.service';
import { AlbumsPrismaRepository } from '../common/prisma/albums.prisma.repository';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  private albums: AlbumsPrismaRepository;

  constructor(
    private prisma: PrismaService,
    private readonly artistService: ArtistsService
  ) {
    this.albums = new AlbumsPrismaRepository(prisma, artistService);
  }

  create(createAlbumDto: CreateAlbumDto) {
    return this.albums.create(createAlbumDto);
  }

  findAll() {
    return this.albums.findAll();
  }

  findOne(id: string) {
    return this.albums.findOne(id);
  }

  update(id: string, updateAlbumDto: UpdateAlbumDto) {
    return this.albums.update(id, updateAlbumDto);
  }

  remove(id: string) {
    return this.albums.remove(id);
  }

  validate(id: string) {
    return this.albums.validate(id);
  }
}
