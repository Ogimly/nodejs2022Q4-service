import { Controller, Post, Body, HttpCode } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthApiText } from '../common/enums';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh-auth.dto';
import { Tokens } from './dto/token-auth.dto';

@ApiTags(AuthApiText.tag)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: AuthApiText.signupSum, description: AuthApiText.signupDesc })
  @ApiCreatedResponse({ description: AuthApiText.Ok, type: UserEntity })
  @ApiBadRequestResponse({ description: AuthApiText.BadRequest })
  signup(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  @HttpCode(200)
  @ApiOperation({ summary: AuthApiText.loginSum, description: AuthApiText.loginDesc })
  @ApiOkResponse({ description: AuthApiText.Ok, type: Tokens })
  @ApiBadRequestResponse({ description: AuthApiText.BadRequest })
  @ApiForbiddenResponse({ description: AuthApiText.AccessDenied })
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @HttpCode(200)
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
