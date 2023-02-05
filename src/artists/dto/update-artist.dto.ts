import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsBoolean } from 'class-validator';
import { CreateArtistDto } from './create-artist.dto';

export class UpdateArtistDto extends CreateArtistDto {
  @ApiProperty({ description: 'artist has Grammy', example: 'true' })
  @IsNotEmpty()
  @IsBoolean()
  grammy: boolean;
}
