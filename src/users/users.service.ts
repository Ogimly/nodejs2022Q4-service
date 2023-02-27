import { Injectable } from '@nestjs/common';
import { PrismaService } from '../common/prisma/prisma.service';
import { UsersPrismaRepository } from '../common/prisma/users.prisma.repository';
import { HashService } from '../common/services/hash/hash.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { UserEntity } from './entities/user.entity';

@Injectable()
export class UsersService {
  private users: UsersPrismaRepository;

  constructor(private prisma: PrismaService, private hashService: HashService) {
    this.users = new UsersPrismaRepository(prisma, hashService);
  }

  create(createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.users.create(createUserDto);
  }

  findAll(): Promise<UserEntity[]> {
    return this.users.findAll();
  }

  findOne(id: string): Promise<UserEntity> {
    return this.users.findOne(id);
  }

  update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    return this.users.update(id, updateUserDto);
  }

  remove(id: string): Promise<void> {
    return this.users.remove(id);
  }
}
