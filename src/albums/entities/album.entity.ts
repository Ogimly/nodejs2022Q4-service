import { ApiProperty } from '@nestjs/swagger';
import { Album } from '@prisma/client';

export class AlbumEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  year: number;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  artistId: string | null;

  constructor(album: Album) {
    this.id = album.id;
    this.name = album.name;
    this.year = album.year;
    this.artistId = album.artistId;
  }
}
