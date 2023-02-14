import { HttpStatus, Injectable } from '@nestjs/common';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
// import { AlbumsService } from '../albums/albums.service';
// import { ArtistsRepository } from '../common/DB/artisrs-db';
// import { FavoritesService } from '../favorites/favorites.service';
// import { TracksService } from '../tracks/tracks.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@Injectable()
export class ArtistsService {
  // private artists: ArtistsRepository;

  // constructor(
  //   @Inject(forwardRef(() => TracksService))
  //   private tracksService: TracksService,

  //   @Inject(forwardRef(() => AlbumsService))
  //   private albumsService: AlbumsService,

  //   @Inject(forwardRef(() => FavoritesService))
  //   private favoritesService: FavoritesService
  // ) {
  //   this.artists = new ArtistsRepository();
  // }
  constructor(private prisma: PrismaService) {}

  async create(createArtistDto: CreateArtistDto): Promise<RequestResult<ArtistEntity>> {
    const newArtist = await this.prisma.artist.create({
      data: createArtistDto,
    });

    return {
      data: newArtist,
      status: HttpStatus.CREATED,
    };
  }

  async findAll(ids: string[] = []): Promise<RequestResult<ArtistEntity[]>> {
    // return this.prisma.artist.findAll(ids);
    const artists = await this.prisma.artist.findMany();
    return {
      data: artists,
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
      data: foundArtist,
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
      data: updatedArtist,
      status: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<RequestResult<ArtistEntity>> {
    // await this.tracksService.removeArtistId(id);
    // await this.albumsService.removeArtistId(id);
    // await this.favoritesService.removeArtist(id);

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
