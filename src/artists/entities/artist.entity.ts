import { ApiProperty } from '@nestjs/swagger';

export class ArtistEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'artist name', example: 'Freddie Mercury' })
  name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  grammy: boolean;

  constructor(partial: Partial<ArtistEntity>) {
    Object.assign(this, partial);
  }
}
