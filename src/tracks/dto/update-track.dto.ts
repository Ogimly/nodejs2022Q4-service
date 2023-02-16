import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsNumber } from 'class-validator';
import { CreateTrackDto } from './create-track.dto';

export class UpdateTrackDto extends CreateTrackDto {
  @ApiProperty({ description: 'track name', example: 'Bohemian Rhapsody' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'track duration', example: 355 })
  @IsNotEmpty()
  @IsNumber()
  duration: number;
}
