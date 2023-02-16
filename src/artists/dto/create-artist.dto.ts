import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty({ description: 'artist name', example: 'Freddie Mercury' })
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty({ description: 'artist has Grammy', example: 'false' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
