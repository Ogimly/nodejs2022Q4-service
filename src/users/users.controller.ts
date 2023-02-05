import {
  UsePipes,
  ValidationPipe,
  UseInterceptors,
  ClassSerializerInterceptor,
  Controller,
  Post,
  Body,
  HttpException,
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

@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(UserApiText.tag)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: UserApiText.getSum, description: UserApiText.getDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: [UserEntity] })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  async findAll() {
    const res = await this.usersService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post()
  @ApiOperation({ summary: UserApiText.createSum, description: UserApiText.createDesc })
  @ApiCreatedResponse({ description: UserApiText.createOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.createBadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':userId')
  @ApiOperation({ summary: UserApiText.getIdSum, description: UserApiText.getIdDesc })
  @ApiOkResponse({ description: UserApiText.Ok, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  async findOne(@Param('userId', new ParseUUIDPipe()) id: string) {
    const res = await this.usersService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':userId')
  @ApiOperation({ summary: UserApiText.putSum, description: UserApiText.putDesc })
  @ApiOkResponse({ description: UserApiText.putOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiForbiddenResponse({ description: UserApiText.putForbidden })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  async update(
    @Param('userId', new ParseUUIDPipe()) id: string,
    @Body() updateUserDto: UpdateUserDto
  ) {
    const res = await this.usersService.update(id, updateUserDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete(':userId')
  @HttpCode(204)
  @ApiOperation({ summary: UserApiText.delSum, description: UserApiText.delDesc })
  @ApiNoContentResponse({ description: UserApiText.delOk })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: UserApiText.Unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  async remove(@Param('userId', new ParseUUIDPipe()) id: string) {
    const res = await this.usersService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return '';
  }
}
