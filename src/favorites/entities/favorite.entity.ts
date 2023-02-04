export class FavoriteEntity {
  artists: string[]; // favorite artists ids
  albums: string[]; // favorite albums ids
  tracks: string[]; // favorite tracks ids

  constructor(partial: Partial<FavoriteEntity>) {
    Object.assign(this, partial);
  }
}
