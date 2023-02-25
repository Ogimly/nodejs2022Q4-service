import { Injectable } from '@nestjs/common';
import { ForbiddenException, UnauthorizedException } from '@nestjs/common/exceptions';
import { ConfigService } from '@nestjs/config';
import { JwtService } from '@nestjs/jwt';
import { JwtPayload } from 'jsonwebtoken';
import { DBMessages } from '../common/enums';
import { getHash } from '../common/helpers/hash-lelpers';
import { PrismaService } from '../common/prisma/prisma.service';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UsersService } from '../users/users.service';
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

  async login({ login, password }: CreateUserDto): Promise<Tokens> {
    const user = await this.prisma.user.findFirst({ where: { login } });

    if (!user) throw new ForbiddenException(DBMessages.LoginPassInvalid);

    if (getHash(password) !== user.password)
      throw new ForbiddenException(DBMessages.LoginPassInvalid);

    const tokens = await this.getTokens(user.id, login);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    this.verifyAccessToken(tokens.accessToken);

    return tokens;
  }

  async refresh(refreshToken: string): Promise<Tokens> {
    this.verifyRefreshToken(refreshToken);

    const jwtPayload = this.jwtService.decode(refreshToken);
    const userId = jwtPayload['userId'];
    const login = jwtPayload['login'];

    const user = await this.prisma.user.findUnique({
      where: { id: userId },
    });

    if (!user) throw new ForbiddenException(DBMessages.RefreshTokenInvalid);

    if (getHash(refreshToken) !== user.refreshToken || login !== user.login)
      throw new ForbiddenException(DBMessages.RefreshTokenInvalid);

    const tokens = await this.getTokens(user.id, login);
    await this.updateRefreshTokenHash(user.id, tokens.refreshToken);

    return tokens;
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

  public verifyAccessToken(accessToken: string) {
    try {
      const res = this.jwtService.verify(accessToken, {
        secret: this.config.get<string>('auth.jwtSecretKey'),
      });

      return res;
    } catch (error) {
      throw new UnauthorizedException(DBMessages.AccessDenied);
    }
  }

  private verifyRefreshToken(refreshToken: string) {
    try {
      return this.jwtService.verify(refreshToken, {
        secret: this.config.get<string>('auth.jwtSecretRefreshKey'),
      });
    } catch {
      throw new UnauthorizedException(DBMessages.RefreshTokenInvalid);
    }
  }
}
