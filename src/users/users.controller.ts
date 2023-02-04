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
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiOperation,
  ApiTags,
  ApiUnauthorizedResponse,
} from '@nestjs/swagger';
import { UserEntity } from './entities/user.entity';
import { ApiText, UserApiText } from '../common/enums';

@UsePipes(new ValidationPipe())
@UseInterceptors(ClassSerializerInterceptor)
@ApiTags(UserApiText.tag)
@Controller('user')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Get()
  @ApiOperation({ summary: UserApiText.getS, description: UserApiText.getD })
  @ApiOkResponse({ description: ApiText.ok, type: [UserEntity] })
  @ApiUnauthorizedResponse({ description: ApiText.unauthorized })
  async findAll() {
    const res = await this.usersService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Post()
  @ApiOperation({ summary: UserApiText.createS, description: UserApiText.createD })
  @ApiCreatedResponse({ description: UserApiText.createOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.createBadReq })
  @ApiUnauthorizedResponse({ description: ApiText.unauthorized })
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':userId')
  @ApiOperation({ summary: UserApiText.getIdS, description: UserApiText.getIdD })
  @ApiOkResponse({ description: ApiText.ok, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ApiText.unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  async findOne(@Param('userId', new ParseUUIDPipe()) id: string) {
    const res = await this.usersService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':userId')
  @ApiOperation({ summary: UserApiText.putS, description: UserApiText.putD })
  @ApiOkResponse({ description: UserApiText.putOk, type: UserEntity })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ApiText.unauthorized })
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
  @ApiOperation({ summary: UserApiText.delS, description: UserApiText.delD })
  @ApiOkResponse({ description: UserApiText.delOk })
  @ApiBadRequestResponse({ description: UserApiText.BadRequest })
  @ApiUnauthorizedResponse({ description: ApiText.unauthorized })
  @ApiNotFoundResponse({ description: UserApiText.NotFound })
  async remove(@Param('userId', new ParseUUIDPipe()) id: string) {
    const res = await this.usersService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return '';
  }
}
