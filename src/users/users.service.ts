import { HttpStatus, Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { PrismaService } from '../common/prisma/prisma.service';
import { DBMessages } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { UserEntity } from './entities/user.entity';

type TransformedUser = {
  id: string;
  login: string;
  version: number;
  createdAt: number;
  updatedAt: number;
};

@Injectable()
export class UsersService {
  constructor(private prisma: PrismaService) {}

  transform({ password, createdAt, updatedAt, ...user }: UserEntity): TransformedUser {
    return { ...user, createdAt: createdAt.getTime(), updatedAt: updatedAt.getTime() };
  }

  async create(createUserDto: CreateUserDto): Promise<RequestResult<TransformedUser>> {
    const newUser = await this.prisma.user.create({
      data: createUserDto,
    });

    return {
      data: this.transform(newUser),
      status: HttpStatus.CREATED,
    };
  }

  async findAll(): Promise<RequestResult<TransformedUser[]>> {
    const users = await this.prisma.user.findMany();
    return {
      data: users.map((user) => this.transform(user)),
      status: HttpStatus.OK,
    };
  }

  async findOne(id: string): Promise<RequestResult<TransformedUser>> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
      };

    return {
      data: this.transform(foundUser),
      status: HttpStatus.OK,
    };
  }

  async update(
    id: string,
    updateUserDto: UpdateUserDto
  ): Promise<RequestResult<TransformedUser>> {
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
      data: this.transform(updatedUser),
      status: HttpStatus.OK,
    };
  }

  async remove(id: string): Promise<RequestResult<TransformedUser>> {
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
