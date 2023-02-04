import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty()
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string; // refers to Artist
}
