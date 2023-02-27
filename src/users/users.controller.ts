import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  ParseUUIDPipe,
  Put,
  Delete,
  HttpCode,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import {
  ApiBadRequestResponse,
  ApiBearerAuth,
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiParam,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserApiText } from '../common/enums';
import { UserByIdPipe } from '../common/pipes/user-by-id/user-by-id.pipe';

@ApiTags(UserApiText.tag)
@ApiBearerAuth('access-token')
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: UserApiText.getSum, description: UserApiText.getDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: [UserEntity] })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  findAll(): Promise<UserEntity[]> {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: UserApiText.createSum, description: UserApiText.createDesc })
  @ApiCreatedResponse({ description: UserApiText.createOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  create(@Body() createUserDto: CreateUserDto): Promise<UserEntity> {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: UserApiText.getIdSum, description: UserApiText.getIdDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  @ApiParam({ name: 'userId', type: String })
  findOne(@Param('userId', ParseUUIDPipe, UserByIdPipe) user: UserEntity): UserEntity {
    return user;
  }

  @Put(':userId')
  @ApiOperation({ summary: UserApiText.putSum, description: UserApiText.putDesc })
  @ApiOkResponse({ description: UserApiText.putOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiForbiddenResponse({ description: UserApiText.putForbidden })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  @ApiParam({ name: 'userId', type: String })
  update(
    @Param('userId', ParseUUIDPipe, UserByIdPipe) user: UserEntity,
    @Body() updateUserDto: UpdateUserDto
  ): Promise<UserEntity> {
    return this.usersService.update(user.id, updateUserDto);
  }

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: UserApiText.delSum, description: UserApiText.delDesc })
  @ApiNoContentResponse({ description: UserApiText.delOk })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  @ApiParam({ name: 'userId', type: String })
  remove(@Param('userId', ParseUUIDPipe, UserByIdPipe) user: UserEntity): Promise<void> {
    return this.usersService.remove(user.id);
  }
}
