import {
  CanActivate,
  ExecutionContext,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { Request } from 'express';
import { Observable } from 'rxjs';
import * as jwt from 'jsonwebtoken';
import { configs } from 'src/configs';

@Injectable()
export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext,
  ): boolean | Promise<boolean> | Observable<boolean> {
    const request = context.switchToHttp().getRequest();
    return this.validateRequest(request);
  }

  async validateRequest(request: Request): Promise<any> {
    try {
      const bearerToken = request.headers.authorization as string;

      if (!bearerToken)
        throw new UnauthorizedException(
          'Please provide Bearer token in Authorization header.',
        );

      const token = bearerToken.split(' ')[1];

      if (!token)
        throw new UnauthorizedException(
          'Auth token not found in Authorization header.',
        );

      const decodedToken = await jwt.verify(token, configs.APPLICATION_KEY);

      if (!decodedToken)
        throw new UnauthorizedException(
          'Invalid auth token or token has expired, please login to get new token.',
        );

      request['user'] = decodedToken;

      return true;
    } catch (error) {
      return false;
    }
  }
}
