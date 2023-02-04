import { Injectable } from '@nestjs/common';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UsersRepository } from '../common/DB/users-db';

@Injectable()
export class UsersService {
  private users: UsersRepository;

  constructor() {
    this.users = new UsersRepository();
  }

  create(createUserDto: CreateUserDto) {
    return this.users.create(createUserDto);
  }

  findAll() {
    return this.users.findAll();
  }

  findOne(id: string) {
    return this.users.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto) {
    return this.users.update(id, updateUserDto);
  }

  remove(id: string) {
    return this.users.remove(id);
  }
}
