import { ApiProperty } from '@nestjs/swagger';
import { AlbumEntity } from '../../albums/entities/album.entity';
import { ArtistEntity } from '../../artists/entities/artist.entity';
import { TrackEntity } from '../../tracks/entities/track.entity';

export class FavoriteEntity {
  @ApiProperty({ description: 'favorite artists ids', type: [ArtistEntity] })
  artists: string[];

  @ApiProperty({ description: 'favorite albums ids', type: [AlbumEntity] })
  albums: string[];

  @ApiProperty({ description: 'favorite tracks ids', type: [TrackEntity] })
  tracks: string[];

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
