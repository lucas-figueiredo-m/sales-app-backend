import { CanActivate, ExecutionContext } from '@nestjs/common';
import { Observable } from 'rxjs';
import { JwtService } from '@nestjs/jwt';

export class AuthGuard implements CanActivate {
  canActivate(
    context: ExecutionContext
  ): boolean | Promise<boolean> | Observable<boolean> {
    const req = context.switchToHttp().getRequest();

    const bearerToken = req.headers.authorization;

    try {
      const decoded = new JwtService().verify(
        bearerToken.replace('Bearer ', ''),
        {
          secret: 'mysupersecret',
        }
      );

      return decoded;
    } catch (error) {
      return false;
    }
  }
}
