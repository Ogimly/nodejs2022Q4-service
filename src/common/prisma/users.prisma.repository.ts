import { ForbiddenException, NotFoundException } from '@nestjs/common';
import { CreateUserDto } from '../../users/dto/create-user.dto';
import { UpdateUserDto } from '../../users/dto/update-user.dto';
import { UserEntity } from '../../users/entities/user.entity';
import { DBMessages } from '../enums';
import { HashService } from '../services/hash/hash.service';
import { PrismaService } from './prisma.service';

export class UsersPrismaRepository {
  constructor(private prisma: PrismaService, private hashService: HashService) {}

  public async create(createUserDto: CreateUserDto): Promise<UserEntity> {
    const { password } = createUserDto;

    const hashPassword = await this.hashService.getHash(password);
    const newUser = await this.prisma.user.create({
      data: { ...createUserDto, password: hashPassword },
    });

    return new UserEntity(newUser);
  }

  public async findAll(): Promise<UserEntity[]> {
    const users = await this.prisma.user.findMany();

    return users.map((user) => new UserEntity(user));
  }

  public async findOne(id: string): Promise<UserEntity> {
    const foundUser = await this.prisma.user.findUnique({ where: { id } });

    if (!foundUser) throw new NotFoundException(DBMessages.UserNotFound);

    return new UserEntity(foundUser);
  }

  public async update(id: string, updateUserDto: UpdateUserDto): Promise<UserEntity> {
    const { password, version } = await this.prisma.user.findUnique({ where: { id } });

    const matchHash = await this.hashService.matchHash(
      updateUserDto.oldPassword,
      password
    );
    if (!matchHash) throw new ForbiddenException(DBMessages.UserPasswordInvalid);

    const hashPassword = await this.hashService.getHash(updateUserDto.newPassword);
    const updatedUser = await this.prisma.user.update({
      where: { id },
      data: {
        password: hashPassword,
        version: version + 1,
        updatedAt: new Date(),
      },
    });

    return new UserEntity(updatedUser);
  }

  public async remove(id: string): Promise<void> {
    await this.prisma.user.delete({ where: { id } });
  }
}
