import {
  Controller,
  Get,
  Post,
  Param,
  Delete,
  ParseUUIDPipe,
  UsePipes,
  ValidationPipe,
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
  findAll() {
    return this.favoritesService.findAll();
  }

  @Post('artist/:id')
  @ApiOperation({ summary: FavApiText.artAddSum, description: FavApiText.artAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.artBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.artUnpr })
  addArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addArtist(id);
  }

  @Post('track/:id')
  @ApiOperation({ summary: FavApiText.trAddSum, description: FavApiText.trAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.trBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.trUnpr })
  addTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addTrack(id);
  }

  @Post('album/:id')
  @ApiOperation({ summary: FavApiText.albAddSum, description: FavApiText.albAddDesc })
  @ApiCreatedResponse({ description: FavApiText.addOk })
  @ApiBadRequestResponse({ description: FavApiText.albBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiUnprocessableEntityResponse({ description: FavApiText.albUnpr })
  addAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.addAlbum(id);
  }

  @Delete('artist/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.artDelSum, description: FavApiText.artDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.artBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.artNotFound })
  removeArtist(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeArtist(id);
  }

  @Delete('track/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.trDelSum, description: FavApiText.trDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.trBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.trNotFound })
  removeTrack(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeTrack(id);
  }

  @Delete('album/:id')
  @HttpCode(204)
  @ApiOperation({ summary: FavApiText.albDelSum, description: FavApiText.albDelDesc })
  @ApiNoContentResponse({ description: FavApiText.delOk })
  @ApiBadRequestResponse({ description: FavApiText.albBadRequest })
  @ApiUnauthorizedResponse({ description: FavApiText.Unauthorized })
  @ApiNotFoundResponse({ description: FavApiText.albNotFound })
  removeAlbum(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.favoritesService.removeAlbum(id);
  }
}
