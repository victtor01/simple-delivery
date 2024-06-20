import {
  BadRequestException,
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  Redirect,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY, IS_PUBLIC_KEY_STORE } from 'src/config/constants';
import { SECRET_KEY } from 'src/auth/constants/secret';
import { Request, Response, response } from 'express';

@Injectable()
export class StoresGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  private logger: Logger = new Logger('STORES_GUARD');

  private redirectToSelectStore(context: ExecutionContext) {
    const response: Response = context.switchToHttp().getResponse();

    return response.json({
      redirect: '/select-store',
    });
  }

  async canActivate(context: ExecutionContext): Promise<any> {
    const isPublicStore: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY_STORE,
      [context.getHandler(), context.getClass()],
    );


    if (isPublicStore) return true;

    const request: Request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();
    const store = request?.cookies?.['__store'] || null;

    if (!store) this.redirectToSelectStore(context);

    try {
      // try get payload
      const payload = await this.jwtService.verifyAsync(store, {
        secret: SECRET_KEY,
      });

      // returns user with payload
      request['store'] = payload;
    } catch (err) {
      this.logger.error(err);
      response.clearCookie('__store')
      this.redirectToSelectStore(context);

      return false;
    }

    return true;
  }
}
