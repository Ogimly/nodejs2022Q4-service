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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { TrackApiText } from '../common/enums';
import { TrackEntity } from './entities/track.entity';
import { TrackByIdPipe } from '../common/pipes/track-by-id/track-by-id.pipe';
import { ValidateArtistIdPipe } from '../common/pipes/validate-artist-id/validate-artist-id.pipe';
import { ValidateAlbumIdPipe } from '../common/pipes/validate-album-id/validate-album-id.pipe';

@ApiTags(TrackApiText.tag)
@ApiBearerAuth('access-token')
@Controller('track')
export class TracksController {
  constructor(private readonly tracksService: TracksService) {}

  @Get()
  @ApiOperation({ summary: TrackApiText.getSum, description: TrackApiText.getDesc })
  @ApiOkResponse({ description: TrackApiText.Ok, type: [TrackEntity] })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  findAll() {
    return this.tracksService.findAll();
  }

  @Post()
  @ApiOperation({ summary: TrackApiText.createSum, description: TrackApiText.createDesc })
  @ApiCreatedResponse({ description: TrackApiText.Ok, type: TrackEntity })
  @ApiBadRequestResponse({ description: TrackApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  create(
    @Body(ValidateArtistIdPipe, ValidateAlbumIdPipe) createTrackDto: CreateTrackDto
  ) {
    return this.tracksService.create(createTrackDto);
  }

  @Get(':id')
  @ApiOperation({ summary: TrackApiText.getIdSum, description: TrackApiText.getIdDesc })
  @ApiOkResponse({ description: TrackApiText.Ok, type: TrackEntity })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  @ApiParam({ name: 'id', type: String })
  findOne(@Param('id', ParseUUIDPipe, TrackByIdPipe) track: TrackEntity) {
    return track;
  }

  @Put(':id')
  @ApiOperation({ summary: TrackApiText.putSum, description: TrackApiText.putDesc })
  @ApiOkResponse({ description: TrackApiText.putOk, type: UpdateTrackDto })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  @ApiParam({ name: 'id', type: String })
  update(
    @Param('id', ParseUUIDPipe, TrackByIdPipe) track: TrackEntity,
    @Body(ValidateArtistIdPipe, ValidateAlbumIdPipe) updateTrackDto: UpdateTrackDto
  ) {
    return this.tracksService.update(track.id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: TrackApiText.delSum, description: TrackApiText.delDesc })
  @ApiNoContentResponse({ description: TrackApiText.delOk })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  @ApiParam({ name: 'id', type: String })
  remove(@Param('id', ParseUUIDPipe, TrackByIdPipe) track: TrackEntity) {
    return this.tracksService.remove(track.id);
  }
}
