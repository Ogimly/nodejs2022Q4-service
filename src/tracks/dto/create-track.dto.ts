import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  artistId: string; // refers to Artist

  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  albumId: string; // refers to Album

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  duration: number; // integer number
}
