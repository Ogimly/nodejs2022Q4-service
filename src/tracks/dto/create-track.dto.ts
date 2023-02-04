import { IsNotEmpty, IsString, IsNumber } from 'class-validator';

export class CreateTrackDto {
  @IsNotEmpty()
  @IsString()
  name: string;

  artistId?: string; // refers to Artist
  albumId?: string; // refers to Album

  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
