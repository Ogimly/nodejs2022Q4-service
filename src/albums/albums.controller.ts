import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
  UsePipes,
  ValidationPipe,
  ParseUUIDPipe,
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
} from '@nestjs/swagger';
import { AlbumApiText } from '../common/enums';
import { AlbumsService } from './albums.service';
import { CreateAlbumDto } from './dto/create-album.dto';
import { UpdateAlbumDto } from './dto/update-album.dto';
import { AlbumEntity } from './entities/album.entity';

@UsePipes(new ValidationPipe())
@ApiTags(AlbumApiText.tag)
@Controller('album')
export class AlbumsController {
  constructor(private readonly albumsService: AlbumsService) {}

  @Get()
  @ApiOperation({ summary: AlbumApiText.getSum, description: AlbumApiText.getDesc })
  @ApiOkResponse({ description: AlbumApiText.Ok, type: [AlbumEntity] })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  findAll() {
    return this.albumsService.findAll();
  }

  @Post()
  @ApiOperation({ summary: AlbumApiText.createSum, description: AlbumApiText.createDesc })
  @ApiCreatedResponse({ description: AlbumApiText.Ok, type: AlbumEntity })
  @ApiBadRequestResponse({ description: AlbumApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  create(@Body() createAlbumDto: CreateAlbumDto) {
    return this.albumsService.create(createAlbumDto);
  }

  @Get(':id')
  @ApiOperation({ summary: AlbumApiText.getIdSum, description: AlbumApiText.getIdDesc })
  @ApiOkResponse({ description: AlbumApiText.Ok, type: AlbumEntity })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: AlbumApiText.putSum, description: AlbumApiText.putDesc })
  @ApiOkResponse({ description: AlbumApiText.putOk, type: UpdateAlbumDto })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    return this.albumsService.update(id, updateAlbumDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: AlbumApiText.delSum, description: AlbumApiText.delDesc })
  @ApiNoContentResponse({ description: AlbumApiText.delOk })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.albumsService.remove(id);
  }
}
