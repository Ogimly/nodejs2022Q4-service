import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateAlbumDto {
  @ApiProperty({ description: 'album name', example: 'Innuendo' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'released', example: 1990 })
  @IsNotEmpty()
  @IsNumber()
  year: number;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @IsOptional()
  @IsNotEmpty()
  @IsString()
  artistId: string; // refers to Artist
}
