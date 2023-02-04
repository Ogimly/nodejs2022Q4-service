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
  HttpException,
} from '@nestjs/common';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@UsePipes(new ValidationPipe())
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Post()
  async create(@Body() createArtistDto: CreateArtistDto) {
    const res = await this.artistsService.create(createArtistDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get()
  async findAll() {
    const res = await this.artistsService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':id')
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.artistsService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':id')
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    const res = await this.artistsService.update(id, updateArtistDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.artistsService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }
}
