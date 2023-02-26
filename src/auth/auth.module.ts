import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { UsersModule } from '../users/users.module';
import { PrismaModule } from '../common/prisma/prisma.module';
import { JwtModule } from '@nestjs/jwt';
import { HashService } from '../common/services/hash/hash.service';

@Module({
  imports: [UsersModule, PrismaModule, JwtModule.register({})],
  controllers: [AuthController],
  providers: [AuthService, HashService],
  exports: [AuthService],
})
export class AuthModule {}
