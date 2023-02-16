import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsNumber } from 'class-validator';
import { CreateAlbumDto } from './create-album.dto';

export class UpdateAlbumDto extends CreateAlbumDto {
  @ApiProperty({ description: 'released', example: 1991 })
  @IsNotEmpty()
  @IsNumber()
  year: number;
}
