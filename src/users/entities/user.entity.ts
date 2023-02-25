import { ApiProperty } from '@nestjs/swagger';
import { User } from '@prisma/client';
import { Exclude, Transform } from 'class-transformer';

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
  @Transform(({ value }) => value.getTime())
  createdAt: Date;

  @ApiProperty({ description: 'timestamp of last update', example: 1655000000 })
  @Transform(({ value }) => value.getTime())
  updatedAt: Date;

  constructor(user: User) {
    this.id = user.id;
    this.login = user.login;
    this.version = user.version;
    this.createdAt = user.createdAt;
    this.updatedAt = user.updatedAt;
  }
}
