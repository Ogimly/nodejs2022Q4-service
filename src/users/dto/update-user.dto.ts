import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty, IsString } from 'class-validator';

export class UpdateUserDto {
  @ApiProperty({ description: 'previous password' })
  @IsNotEmpty()
  @IsString()
  oldPassword: string;

  @ApiProperty({ description: 'new password' })
  @IsNotEmpty()
  @IsString()
  newPassword: string;
}
