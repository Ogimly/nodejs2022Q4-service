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
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
  ApiUnprocessableEntityResponse,
} from '@nestjs/swagger';
import { FavApiText } from '../common/enums';
import { FavoriteEntity } from './entities/favorite.entity';
import { FavoritesService } from './favorites.service';

@UsePipes(new ValidationPipe())
@ApiTags(FavApiText.tag)
@Controller('favs')
export class FavoritesController {
  constructor(private readonly favoritesService: FavoritesService) {}

  @Get()
  @ApiOperation({ summary: FavApiText.getSum, description: FavApiText.getDesc })
  @ApiOkResponse({ description: FavApiText.Ok, type: [FavoriteEntity] })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  async findAll() {
    const res = await this.favoritesService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('artist/:id')
  @ApiOperation({ summary: FavApiText.artAddSum, description: FavApiText.artAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.artBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.artUnpr })
  async addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addArtist(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('track/:id')
  @ApiOperation({ summary: FavApiText.trAddSum, description: FavApiText.trAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.trBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.trUnpr })
  async addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addTrack(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post('album/:id')
  @ApiOperation({ summary: FavApiText.albAddSum, description: FavApiText.albAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.albBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.albUnpr })
  async addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.addAlbum(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.artDelSum, description: FavApiText.artDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.artBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.artNotFound })
  async removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.removeArtist(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.trDelSum, description: FavApiText.trDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.trBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.trNotFound })
  async removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.removeTrack(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.albDelSum, description: FavApiText.albDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.albBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.albNotFound })
  async removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.favoritesService.removeAlbum(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }
}
