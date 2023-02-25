import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { UsersPrismaRepository } from '../common/prisma/users.prisma.repository';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';

@Injectable()
export class UsersService {
  private users: UsersPrismaRepository;

  constructor(private prisma: PrismaService) {
    this.users = new UsersPrismaRepository(prisma);
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
