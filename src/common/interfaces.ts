import { AlbumEntity } from '../albums/entities/album.entity';
import { ArtistEntity } from '../artists/entities/artist.entity';
import { TrackEntity } from '../tracks/entities/track.entity';

export interface RequestResult<T> {
  data: T | null;
  status: number;
  error?: string;
}

export interface FavoritesResponse {
  artists: ArtistEntity[];
  albums: AlbumEntity[];
  tracks: TrackEntity[];
}

export interface RequestLog {
  method: string;
  baseUrl: string;
  query: string;
  body: string;
  statusCode: number;
  deltaTime: number;
}
