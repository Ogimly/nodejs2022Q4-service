import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString, IsBoolean } from 'class-validator';

export class CreateArtistDto {
  @ApiProperty()
  @IsNotEmpty()
  @IsString()
  name: string;

  @ApiProperty()
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
