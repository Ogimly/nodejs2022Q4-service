import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBErrors } from '../common/enums';
import { RequestResult } from '../common/interfaces';
import { CreateUserDto } from './dto/create-user.dto';
import { User } from './entities/user.entity';
import { UpdateUserDto } from './dto/update-user.dto';

export class UsersRepository {
  private users: User[] = [];

  public async create(createUserDto: CreateUserDto): Promise<RequestResult<User>> {
    const newDate = Date.now();

    const newUser: User = {
      ...createUserDto,
      id: uuid.v4(),
      version: 0,
      createdAt: newDate,
      updatedAt: newDate,
    };
    this.users.push(newUser);

    return {
      data: newUser,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<User[]>> {
    return {
      data: this.users,
      status: HttpStatus.OK,
    };
  }

  public async findOne(userId: string): Promise<RequestResult<User>> {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.UserNotFound,
      };
    }

    return {
      data: user,
      status: HttpStatus.OK,
    };
  }

  public async update(
    userId: string,
    updateUserDto: UpdateUserDto
  ): Promise<RequestResult<User>> {
    const foundUser = this.users.find(({ id }) => id === userId);

    if (!foundUser)
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.UserNotFound,
      };

    if (foundUser.password !== updateUserDto.oldPassword)
      return {
        data: null,
        status: HttpStatus.FORBIDDEN,
        error: DBErrors.UserPasswordInvalid,
      };

    foundUser.version++;
    foundUser.updatedAt = Date.now();
    foundUser.password = updateUserDto.newPassword;

    return {
      data: foundUser,
      status: HttpStatus.OK,
    };
  }

  public async remove(userId: string): Promise<RequestResult<User>> {
    const index = this.users.findIndex(({ id }) => id === userId);

    if (index === -1) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBErrors.UserNotFound,
      };
    }

    this.users.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
