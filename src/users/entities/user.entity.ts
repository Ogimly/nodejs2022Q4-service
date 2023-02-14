import { ApiProperty } from '@nestjs/swagger';
import { Exclude } from 'class-transformer';

export class UserEntity {
  @ApiProperty({ description: 'uuid v4', format: 'uuid' })
  id: string;

  @ApiProperty({ description: 'user login', example: 'TestUser' })
  login: string;

  @Exclude()
  password: string;

  @ApiProperty({ description: 'increments on update', example: 1 })
  version: number;

  @ApiProperty({ description: 'timestamp of creation', example: 1655000000 })
  createdAt: Date;

  @ApiProperty({ description: 'timestamp of last update', example: 1655000000 })
  updatedAt: Date;

  constructor(partial: Partial<UserEntity>) {
    Object.assign(this, partial);
  }
}
