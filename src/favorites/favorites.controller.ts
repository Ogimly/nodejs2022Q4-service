import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
  HttpException,
} from '@nestjs/common';
import { FavoritesService } from './favorites.service';

@UsePipes(new ValidationPipe())
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  async findAll() {
    const res = await this.favoritesService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('artist/:id')
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addArtist(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('track/:id')
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addTrack(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('album/:id')
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addAlbum(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete('artist/:id')
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('track/:id')
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
