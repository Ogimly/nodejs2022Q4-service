import { Controller, Post, Body } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiCreatedResponse,
  ApiOperation,
  ApiTags,
} from '@nestjs/swagger';
import { AuthApiText } from '../common/enums';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh-auth.dto';

@ApiTags(AuthApiText.tag)
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post('signup')
  @ApiOperation({ summary: AuthApiText.signupSum, description: AuthApiText.signupDesc })
  @ApiCreatedResponse({ description: AuthApiText.Ok, type: UserEntity })
  @ApiBadRequestResponse({ description: AuthApiText.signupBadRequest })
  signup(@Body() createAuthDto: CreateUserDto) {
    return this.authService.signup(createAuthDto);
  }

  @Post('login')
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  refresh(@Body() refreshDto: RefreshDto) {
    return this.authService.refresh(refreshDto);
  }
}
