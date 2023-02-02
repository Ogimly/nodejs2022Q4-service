import {
  Controller,
  Get,
  Post,
  Body,
  Param,
  Delete,
  HttpException,
} from '@nestjs/common';
import { UsersService } from './users.service';
import { CreateUserDto } from './dto/create-user.dto';
import { UpdateUserDto } from './dto/update-user.dto';
import { HttpCode, Put } from '@nestjs/common/decorators';

@Controller('users')
export class UsersController {
  constructor(private readonly usersService: UsersService) {}

  @Post()
  async create(@Body() createUserDto: CreateUserDto) {
    const res = await this.usersService.create(createUserDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get()
  async findAll() {
    const res = await this.usersService.findAll();

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Get(':id')
  async findOne(@Param('id') id: string) {
    const res = await this.usersService.findOne(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Put(':id')
  async update(@Param('id') id: string, @Body() updateUserDto: UpdateUserDto) {
    const res = await this.usersService.update(id, updateUserDto);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return res.data;
  }

  @Delete(':id')
  @HttpCode(204)
  async remove(@Param('id') id: string) {
    const res = await this.usersService.remove(id);

    if (res.error) {
      throw new HttpException(res.error, res.status);
    }

    return '';
  }
}
