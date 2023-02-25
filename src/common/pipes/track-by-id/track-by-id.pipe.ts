import { Injectable, PipeTransform } from '@nestjs/common';
import { TrackEntity } from '../../../tracks/entities/track.entity';
import { TracksService } from '../../../tracks/tracks.service';

@Injectable()
export class TrackByIdPipe implements PipeTransform<string, Promise<TrackEntity>> {
  constructor(private readonly trackService: TracksService) {}

  async transform(id: string): Promise<TrackEntity> {
    return this.trackService.findOne(id);
  }
}
