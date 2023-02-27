import { Controller, Post, Body, HttpCode, UseGuards } from '@nestjs/common';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { Public } from '../common/decorators/public/public.decorator';
import { AuthApiText } from '../common/enums';
import { RefreshGuard } from '../common/guards/refresh/refresh.guard';
import { ValidateTokenPipe } from '../common/pipes/validate-token/validate-token.pipe';
import { CreateUserDto } from '../users/dto/create-user.dto';
import { UserEntity } from '../users/entities/user.entity';
import { AuthService } from './auth.service';
import { RefreshDto } from './dto/refresh-auth.dto';
import { Tokens } from './dto/token-auth.dto';

@ApiTags(AuthApiText.tag)
@Public()
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
  @ApiForbiddenResponse({ description: AuthApiText.LoginPassInvalid })
  login(@Body() loginDto: CreateUserDto) {
    return this.authService.login(loginDto);
  }

  @Post('refresh')
  @UseGuards(RefreshGuard)
  @HttpCode(200)
  @ApiOperation({ summary: AuthApiText.refreshSum, description: AuthApiText.refreshDesc })
  @ApiOkResponse({ description: AuthApiText.Ok, type: Tokens })
  @ApiUnauthorizedResponse({ description: AuthApiText.BadRequest })
  @ApiForbiddenResponse({ description: AuthApiText.AccessDenied })
  @ApiBearerAuth('refresh-token')
  refresh(@Body(ValidateTokenPipe) { refreshToken }: RefreshDto) {
    return this.authService.refresh(refreshToken);
  }
}
