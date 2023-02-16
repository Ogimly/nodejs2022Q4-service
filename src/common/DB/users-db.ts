import * as uuid from 'uuid';
import { HttpStatus } from '@nestjs/common';
import { DBMessages } from '../enums';
import { RequestResult } from '../interfaces';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { UpdateUserDto } from '../../users/dto/update-user.dto';

export class UsersRepository {
  private users: UserEntity[] = [];

  public async create(createUserDto: CreateUserDto): Promise<RequestResult<UserEntity>> {
    const newDate = new Date(); // Date.now();

    const newUser = new UserEntity({
      ...createUserDto,
      id: uuid.v4(),
      version: 1,
      createdAt: newDate,
      updatedAt: newDate,
    });
    this.users.push(newUser);

    return {
      data: newUser,
      status: HttpStatus.CREATED,
    };
  }

  public async findAll(): Promise<RequestResult<UserEntity[]>> {
    return {
      data: this.users,
      status: HttpStatus.OK,
    };
  }

  public async findOne(userId: string): Promise<RequestResult<UserEntity>> {
    const user = this.users.find(({ id }) => id === userId);

    if (!user) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
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
  ): Promise<RequestResult<UserEntity>> {
    const foundUser = this.users.find(({ id }) => id === userId);

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

    foundUser.version++;
    foundUser.updatedAt = new Date(); // Date.now();
    foundUser.password = updateUserDto.newPassword;

    return {
      data: foundUser,
      status: HttpStatus.OK,
    };
  }

  public async remove(userId: string): Promise<RequestResult<UserEntity>> {
    const index = this.users.findIndex(({ id }) => id === userId);

    if (index === -1) {
      return {
        data: null,
        status: HttpStatus.NOT_FOUND,
        error: DBMessages.UserNotFound,
      };
    }

    this.users.splice(index, 1);

    return {
      data: null,
      status: HttpStatus.NO_CONTENT,
    };
  }
}
