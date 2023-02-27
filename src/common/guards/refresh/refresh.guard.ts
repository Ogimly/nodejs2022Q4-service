import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { AuthService } from '../../../auth/auth.service';
import { DBMessages } from '../../enums';

@Injectable()
export class RefreshGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) throw new UnauthorizedException(DBMessages.AccessDenied);

    const [bearer, refreshToken] = authorization.split(' ');

    if (bearer !== 'Bearer' || !refreshToken)
      throw new UnauthorizedException(DBMessages.AccessDenied);

    request.user = this.authService.verifyRefreshToken(refreshToken);

    const isValid = await this.authService.validRefreshToken(
      refreshToken,
      request.user.userId,
      request.user.login
    );
    if (!isValid) throw new UnauthorizedException(DBMessages.AccessDenied);

    return true;
  }
}
