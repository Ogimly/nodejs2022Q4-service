import { Injectable, PipeTransform, UnauthorizedException } from '@nestjs/common';
import { RefreshDto } from '../../../auth/dto/refresh-auth.dto';
import { DBMessages } from '../../enums';

@Injectable()
export class ValidateTokenPipe implements PipeTransform<RefreshDto, string> {
  transform({ refreshToken }: RefreshDto): string {
    if (!refreshToken || typeof refreshToken !== 'string') {
      throw new UnauthorizedException(DBMessages.RefreshTokenInvalid);
    }

    return refreshToken;
  }
}
