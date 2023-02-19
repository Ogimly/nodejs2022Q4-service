import { ApiProperty } from '@nestjs/swagger';
import { Artist } from '@prisma/client';

export class ArtistEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'artist name', example: 'Freddie Mercury' })
  name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  grammy: boolean;

  constructor(artist: Artist) {
    this.id = artist.id;
    this.name = artist.name;
    this.grammy = artist.grammy;
  }
}
