import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { PrismaService } from '../common/prisma/prisma.service';
// import { AlbumsRepository } from '../common/DB/albums-db';
// import { FavoritesService } from '../favorites/favorites.service';
// import { TracksService } from '../tracks/tracks.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';

@Injectable()
export class AlbumsService {
  // private albums: AlbumsRepository;

  // constructor(
  //   @Inject(forwardRef(() => TracksService))
  //   private tracksService: TracksService,

  //   @Inject(forwardRef(() => FavoritesService))
  //   private favoritesService: FavoritesService
  // ) {
  //   this.albums = new AlbumsRepository();
  // }
  constructor(private prisma: PrismaService) {}

  async create(createAlbumDto: CreateAlbumDto) {
    const newAlbum = await this.prisma.album.create({
      data: createAlbumDto,
    });

    return {
      data: newAlbum,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(ids: string[] = []) {
    const albums = await this.prisma.album.findMany();
    return {
      data: albums,
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string) {
    const foundAlbum = await this.prisma.album.findUnique({ where: { id } });

    if (!foundAlbum)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.AlbumNotFound,
      };

    return {
      data: foundAlbum,
      status: HttpStatus.OK,
    };
  }

  async update(id: string, updateAlbumDto: UpdateAlbumDto) {
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
      data: updatedAlbum,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string) {
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

  // removeArtistId(artistId: string) {
  //   return this.albums.removeArtistId(artistId);
  // }
}
