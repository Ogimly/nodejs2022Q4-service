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
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { ArtistApiText } from '../common/enums';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@UsePipes(new ValidationPipe())
@ApiTags(ArtistApiText.tag)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: ArtistApiText.getSum, description: ArtistApiText.getDesc })
  @ApiOkResponse({ description: ArtistApiText.Ok, type: [ArtistEntity] })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  async findAll() {
    const res = await this.artistsService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post()
  @ApiOperation({
    summary: ArtistApiText.createSum,
    description: ArtistApiText.createDesc,
  })
  @ApiCreatedResponse({ description: ArtistApiText.Ok, type: ArtistEntity })
  @ApiBadRequestResponse({ description: ArtistApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  async create(@Body() createArtistDto: CreateArtistDto) {
    const res = await this.artistsService.create(createArtistDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':id')
  @ApiOperation({ summary: ArtistApiText.getIdSum, description: ArtistApiText.getIdDesc })
  @ApiOkResponse({ description: ArtistApiText.Ok, type: ArtistEntity })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.artistsService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':id')
  @ApiOperation({ summary: ArtistApiText.putSum, description: ArtistApiText.putDesc })
  @ApiOkResponse({ description: ArtistApiText.putOk, type: UpdateArtistDto })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
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
  @ApiOperation({ summary: ArtistApiText.delSum, description: ArtistApiText.delDesc })
  @ApiOkResponse({ description: ArtistApiText.delOk })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.artistsService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }
}
