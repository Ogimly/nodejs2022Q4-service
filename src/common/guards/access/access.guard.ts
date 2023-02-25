import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Observable } from 'rxjs';
import { AuthService } from '../../../auth/auth.service';
import { DBMessages } from '../../enums';

@Injectable()
export class AccessGuard implements CanActivate {
  constructor(private readonly authService: AuthService) {}

  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    const authorization = request.headers.authorization;

    if (!authorization) throw new UnauthorizedException(DBMessages.AccessDenied);

    const [bearer, accessToken] = authorization.split(' ');

    if (bearer !== 'Bearer' || !accessToken)
      throw new UnauthorizedException(DBMessages.AccessDenied);

    request.user = this.authService.verifyAccessToken(accessToken);

    return true;
  }
}
