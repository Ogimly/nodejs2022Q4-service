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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
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
import { TrackApiText } from '../common/enums';
import { TrackEntity } from './entities/track.entity';

@UsePipes(new ValidationPipe())
@ApiTags(TrackApiText.tag)
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
  create(@Body() createTrackDto: CreateTrackDto) {
    return this.tracksService.create(createTrackDto);
  }

  @Get(':id')
  @ApiOperation({ summary: TrackApiText.getIdSum, description: TrackApiText.getIdDesc })
  @ApiOkResponse({ description: TrackApiText.Ok, type: TrackEntity })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.findOne(id);
  }

  @Put(':id')
  @ApiOperation({ summary: TrackApiText.putSum, description: TrackApiText.putDesc })
  @ApiOkResponse({ description: TrackApiText.putOk, type: UpdateTrackDto })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto
  ) {
    return this.tracksService.update(id, updateTrackDto);
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: TrackApiText.delSum, description: TrackApiText.delDesc })
  @ApiNoContentResponse({ description: TrackApiText.delOk })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  remove(@Param('id', new ParseUUIDPipe()) id: string) {
    return this.tracksService.remove(id);
  }
}
