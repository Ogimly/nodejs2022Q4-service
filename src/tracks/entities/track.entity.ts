import { ApiProperty } from '@nestjs/swagger';
import { Track } from '@prisma/client';

export class TrackEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'track name', example: 'The Show Must Go On' })
  name: string;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  artistId: string | null;

  @ApiProperty({ description: 'refers to Album', format: 'uuid' })
  albumId: string | null;

  @ApiProperty({ description: 'track duration', example: 262 })
  duration: number;

  constructor(track: Track) {
    this.id = track.id;
    this.name = track.name;
    this.artistId = track.artistId;
    this.albumId = track.albumId;
    this.duration = track.duration;
  }
}
