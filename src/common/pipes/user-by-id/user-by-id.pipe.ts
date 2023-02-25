import { Injectable, PipeTransform } from '@nestjs/common';
import { UserEntity } from '../../../users/entities/user.entity';
import { UsersService } from '../../../users/users.service';

@Injectable()
export class UserByIdPipe implements PipeTransform {
  constructor(private readonly usersService: UsersService) {}

  async transform(id: string): Promise<UserEntity> {
    return this.usersService.findOne(id);
  }
}
