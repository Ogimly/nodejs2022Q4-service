import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber, IsOptional } from 'class-validator';

export class CreateTrackDto {
  @ApiProperty({ description: 'track name', example: 'The Show Must Go On' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'refers to Artist', format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  artistId: string;

  @ApiProperty({ description: 'refers to Album', format: 'uuid' })
  @IsNotEmpty()
  @IsString()
  @IsOptional()
  albumId: string;

  @ApiProperty({ description: 'track duration', example: 262 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
