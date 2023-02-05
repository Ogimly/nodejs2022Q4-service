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
import { TracksService } from './tracks.service';
import { CreateTrackDto } from './dto/create-track.dto';
import { UpdateTrackDto } from './dto/update-track.dto';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
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
  async findAll() {
    const res = await this.tracksService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post()
  @ApiOperation({ summary: TrackApiText.createSum, description: TrackApiText.createDesc })
  @ApiCreatedResponse({ description: TrackApiText.Ok, type: TrackEntity })
  @ApiBadRequestResponse({ description: TrackApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  async create(@Body() createTrackDto: CreateTrackDto) {
    const res = await this.tracksService.create(createTrackDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':id')
  @ApiOperation({ summary: TrackApiText.getIdSum, description: TrackApiText.getIdDesc })
  @ApiOkResponse({ description: TrackApiText.Ok, type: TrackEntity })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  async findOne(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.tracksService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':id')
  @ApiOperation({ summary: TrackApiText.putSum, description: TrackApiText.putDesc })
  @ApiOkResponse({ description: TrackApiText.putOk, type: UpdateTrackDto })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  async update(
    @Param('id', new ParseUUIDPipe()) id: string,
    @Body() updateTrackDto: UpdateTrackDto
  ) {
    const res = await this.tracksService.update(id, updateTrackDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete(':id')
  @HttpCode(204)
  @ApiOperation({ summary: TrackApiText.delSum, description: TrackApiText.delDesc })
  @ApiOkResponse({ description: TrackApiText.delOk })
  @ApiBadRequestResponse({ description: TrackApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: TrackApiText.Unauthorized })
  @ApiNotFoundResponse({ description: TrackApiText.NotFound })
  async remove(@Param('id', new ParseUUIDPipe()) id: string) {
    const res = await this.tracksService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }
}
