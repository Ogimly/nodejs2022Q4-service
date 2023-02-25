import { HttpStatus, Injectable } from '@nestjs/common';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { DBMessages } from '../common/enums';
import { getHash } from '../common/helpers/hash-lelpers';
import { RequestResult } from '../common/interfaces';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
import { RefreshDto } from './dto/refresh-auth.dto';
import { Tokens } from './dto/token-auth.dto';

@Injectable()
export class AuthService {
  constructor(
    private userService: UsersService,
    private config: ConfigService,
    private prisma: PrismaService,
    private jwtService: JwtService
  ) {}

  signup(createAuthDto: CreateUserDto) {
    return this.userService.create(createAuthDto);
  }

  async login({ login, password }: CreateUserDto): Promise<RequestResult<Tokens>> {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user)
      return {
        data: null,
        status: HttpStatus.FORBIDDEN,
        error: DBMessages.AccessDenied,
      };

    if (getHash(password) !== user.password)
      return {
        data: null,
        status: HttpStatus.FORBIDDEN,
        error: DBMessages.AccessDenied,
      };

    const tokens = await this.getTokens(user.id, login);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return {
      data: tokens,
      status: HttpStatus.OK,
    };
  }

  refresh(createAuthDto: RefreshDto) {
    return 'This action refresh token';
  }

  async getTokens(userId: string, login: string): Promise<Tokens> {
    const jwtPayload: JwtPayload = { userId, login };

    const [accessToken, refreshToken] = await Promise.all([
      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('auth.jwtSecretKey'),
        expiresIn: this.config.get<string>('auth.tokenExpireTime'),
      }),

      this.jwtService.signAsync(jwtPayload, {
        secret: this.config.get<string>('auth.jwtSecretRefreshKey'),
        expiresIn: this.config.get<string>('auth.tokenExpireRefreshTime'),
      }),
    ]);

    return new Tokens({ accessToken, refreshToken });
  }

  private async updateRefreshTokenHash(id: string, token: string) {
    await this.prisma.user.update({
      where: { id },
      data: { refreshToken: getHash(token) },
    });
  }
}
