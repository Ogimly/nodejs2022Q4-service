import { HttpStatus } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { PrismaService } from './prisma.service';

export class UsersPrismaRepository {
  constructor(private prisma: PrismaService) {}

  public async create(createUserDto: CreateUserDto): Promise<RequestResult<UserEntity>> {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      data: new UserEntity(newUser),
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<UserEntity[]>> {
    const users = await this.prisma.user.findMany();

    return {
      data: users.map((user) => new UserEntity(user)),
      status: HttpStatus.OK,
    };
  }

  public async findOne(id: string): Promise<RequestResult<UserEntity>> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
      };
    }

    return {
      data: new UserEntity(foundUser),
      status: HttpStatus.OK,
    };
  }

  public async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<RequestResult<UserEntity>> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
      };

    if (foundUser.password !== updateUserDto.oldPassword)
      return {
        data: null,
        status: HttpStatus.FORBIDDEN,
        error: DBMessages.UserPasswordInvalid,
      };

    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: updateUserDto.newPassword,
        version: foundUser.version + 1,
        updatedAt: new Date(),
      },
    });

    return {
      data: new UserEntity(updatedUser),
      status: HttpStatus.OK,
    };
  }

  public async remove(id: string): Promise<RequestResult<UserEntity>> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
      };

    await this.prisma.user.delete({ where: { id } });

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
