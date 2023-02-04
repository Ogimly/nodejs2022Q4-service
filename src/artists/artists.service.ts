import { Injectable } from '@nestjs/common';
import { ArtistsRepository } from '../DB/artisrs-db';
import { CreateArtistDto } from './dto/create-artist.dto';
import { UpdateArtistDto } from './dto/update-artist.dto';

@Injectable()
export class ArtistsService {
  private artists: ArtistsRepository;

  constructor() {
    this.artists = new ArtistsRepository();
  }

  create(createArtistDto: CreateArtistDto) {
    return this.artists.create(createArtistDto);
  }

  findAll() {
    return this.artists.findAll();
  }

  findOne(id: string) {
    return this.artists.findOne(id);
  }

  update(id: string, updateArtistDto: UpdateArtistDto) {
    return this.artists.update(id, updateArtistDto);
  }

  remove(id: string) {
    return this.artists.remove(id);
  }
}
