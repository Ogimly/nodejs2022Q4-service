import { ApiProperty } from '@nestjs/swagger';

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

  constructor(partial: Partial<TrackEntity>) {
    Object.assign(this, partial);
  }
}
