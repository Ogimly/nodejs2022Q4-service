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
  HttpException,
  HttpCode,
} from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  async findAll() {
    const res = await this.albumsService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post()
  @ApiOperation({ summary: AlbumApiText.createSum, description: AlbumApiText.createDesc })
  @ApiCreatedResponse({ description: AlbumApiText.Ok, type: AlbumEntity })
  @ApiBadRequestResponse({ description: AlbumApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  async create(@Body() createAlbumDto: CreateAlbumDto) {
    const res = await this.albumsService.create(createAlbumDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':id')
  @ApiOperation({ summary: AlbumApiText.getIdSum, description: AlbumApiText.getIdDesc })
  @ApiOkResponse({ description: AlbumApiText.Ok, type: AlbumEntity })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.albumsService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':id')
  @ApiOperation({ summary: AlbumApiText.putSum, description: AlbumApiText.putDesc })
  @ApiOkResponse({ description: AlbumApiText.putOk, type: UpdateAlbumDto })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateAlbumDto: UpdateAlbumDto
  ) {
    const res = await this.albumsService.update(id, updateAlbumDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: AlbumApiText.delSum, description: AlbumApiText.delDesc })
  @ApiOkResponse({ description: AlbumApiText.delOk })
  @ApiBadRequestResponse({ description: AlbumApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: AlbumApiText.Unauthorized })
  @ApiNotFoundResponse({ description: AlbumApiText.NotFound })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.albumsService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }
}
