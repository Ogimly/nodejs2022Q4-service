import {
  Controller,
  Get,
  Post,
  Body,
  Put,
  Param,
  Delete,
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
import { ArtistApiText } from '../common/enums';
import { ArtistByIdPipe } from '../common/pipes/artist-by-id/artist-by-id.pipe';
import { ArtistsService } from './artists.service';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';
import { ArtistEntity } from './entities/artist.entity';

@ApiTags(ArtistApiText.tag)
@Controller('artist')
export class ArtistsController {
  constructor(private readonly artistsService: ArtistsService) {}

  @Get()
  @ApiOperation({ summary: ArtistApiText.getSum, description: ArtistApiText.getDesc })
  @ApiOkResponse({ description: ArtistApiText.Ok, type: [ArtistEntity] })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  findAll() {
    return this.artistsService.findAll();
  }

  @Post()
  @ApiOperation({
    summary: ArtistApiText.createSum,
    description: ArtistApiText.createDesc,
  })
  @ApiCreatedResponse({ description: ArtistApiText.Ok, type: ArtistEntity })
  @ApiBadRequestResponse({ description: ArtistApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  create(@Body() createArtistDto: CreateArtistDto) {
    return this.artistsService.create(createArtistDto);
  }

  @Get(':id')
  @ApiOperation({ summary: ArtistApiText.getIdSum, description: ArtistApiText.getIdDesc })
  @ApiOkResponse({ description: ArtistApiText.Ok, type: ArtistEntity })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
  findOne(@Param('id', ParseUUIDPipe, ArtistByIdPipe) artist: ArtistEntity) {
    return artist;
  }

  @Put(':id')
  @ApiOperation({ summary: ArtistApiText.putSum, description: ArtistApiText.putDesc })
  @ApiOkResponse({ description: ArtistApiText.putOk, type: UpdateArtistDto })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
  update(
    @Param('id', ParseUUIDPipe, ArtistByIdPipe) artist: ArtistEntity,
    @Body() updateArtistDto: UpdateArtistDto
  ) {
    return this.artistsService.update(artist.id, updateArtistDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: ArtistApiText.delSum, description: ArtistApiText.delDesc })
  @ApiNoContentResponse({ description: ArtistApiText.delOk })
  @ApiBadRequestResponse({ description: ArtistApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ArtistApiText.Unauthorized })
  @ApiNotFoundResponse({ description: ArtistApiText.NotFound })
  remove(@Param('id', ParseUUIDPipe, ArtistByIdPipe) artist: ArtistEntity) {
    return this.artistsService.remove(artist.id);
  }
}
