import { Injectable } from '@nestjs/common';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RefreshDto } from './dto/refresh-auth.dto';

@Injectable()
export class AuthService {
  constructor(private userService: UsersService) {}

  signup(createAuthDto: CreateUserDto) {
    return this.userService.create(createAuthDto);
  }

  login(createAuthDto: CreateUserDto) {
    return 'This action login user';
  }

  refresh(createAuthDto: RefreshDto) {
    return 'This action refresh token';
  }
}
