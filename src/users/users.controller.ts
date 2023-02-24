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
  ApiCreatedResponse,
  ApiForbiddenResponse,
  ApiNoContentResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { UserApiText } from '../common/enums';

@ApiTags(UserApiText.tag)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: UserApiText.getSum, description: UserApiText.getDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: [UserEntity] })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  findAll() {
    return this.usersService.findAll();
  }

  @Post()
  @ApiOperation({ summary: UserApiText.createSum, description: UserApiText.createDesc })
  @ApiCreatedResponse({ description: UserApiText.createOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  create(@Body() createUserDto: CreateUserDto) {
    return this.usersService.create(createUserDto);
  }

  @Get(':userId')
  @ApiOperation({ summary: UserApiText.getIdSum, description: UserApiText.getIdDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  findOne(@Param('userId', new ParseUUIDPipe()) id: string) {
    return this.usersService.findOne(id);
  }

  @Put(':userId')
  @ApiOperation({ summary: UserApiText.putSum, description: UserApiText.putDesc })
  @ApiOkResponse({ description: UserApiText.putOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiForbiddenResponse({ description: UserApiText.putForbidden })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  update(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    return this.usersService.update(id, updateUserDto);
  }

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: UserApiText.delSum, description: UserApiText.delDesc })
  @ApiNoContentResponse({ description: UserApiText.delOk })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  remove(@Param('userId', new ParseUUIDPipe()) id: string) {
    return this.usersService.remove(id);
  }
}
