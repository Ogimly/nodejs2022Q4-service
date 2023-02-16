import { ApiProperty } from '@nestjs/swagger';

export class AlbumEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  year: number;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  artistId: string | null;

  constructor(partial: Partial<AlbumEntity>) {
    Object.assign(this, partial);
  }
}
