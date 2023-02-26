import { Module } from '@nestjs/common';
import { UsersService } from './users.service';
import { UsersController } from './users.controller';
import { PrismaModule } from '../common/prisma/prisma.module';
import { HashService } from '../common/services/hash/hash.service';

@Module({
  imports: [PrismaModule],
  controllers: [UsersController],
  providers: [UsersService, HashService],
  exports: [UsersService],
})
export class UsersModule {}
