import {
  CanActivate,
  ExecutionContext,
  Injectable,
  Logger,
  UnauthorizedException,
} from '@nestjs/common';
import { Reflector } from '@nestjs/core';
import { JwtService } from '@nestjs/jwt';
import { IS_PUBLIC_KEY } from 'src/config/constants';
import { SECRET_KEY } from './constants/secret';
import { Request, Response } from 'express';
import { TokenPayload } from './auth.service';

@Injectable()
export class AuthGuard implements CanActivate {
  constructor(
    private reflector: Reflector,
    private jwtService: JwtService,
  ) {}

  private logger: Logger = new Logger('AUTH_GUARD');

  async canActivate(context: ExecutionContext): Promise<boolean> {
    const isPublic: boolean = this.reflector.getAllAndOverride<boolean>(
      IS_PUBLIC_KEY,
      [context.getHandler(), context.getClass()],
    );

    if (isPublic) return true;

    const request = context.switchToHttp().getRequest();
    const response: Response = context.switchToHttp().getResponse();

    const token = request?.cookies?.['access_token'] || null;
    const refresh_token = request?.cookies?.['refresh_token'] || null;

    if (!token || !refresh_token) {
      throw new UnauthorizedException('passports não estão presentes!');
    }

    try {
      // try get payload

      const payload = await this.jwtService.verifyAsync(token, {
        secret: SECRET_KEY,
      });

      // returns user with payload

      request['manager'] = payload;
    } catch {
      try {
        // get payload of refresh_token

        const payload = this.jwtService.decode(token);

        // get payload of refresh_token and verify

        const refresh_payload =
          await this.jwtService.verifyAsync(refresh_token);

        // create new access_token and set in cookies

        const PayloadAccessToken: Partial<TokenPayload> = {
          id: refresh_payload.id,
          email: refresh_payload.email,
        };

        const access_token =
          await this.jwtService.signAsync(PayloadAccessToken);

        response.cookie('access_token', access_token, {
          httpOnly: true,
          sameSite: 'strict',
          path: '/',
        });

        request['manager'] = payload;
      } catch (error) {
        this.logger.error(error);
        throw new UnauthorizedException({
          message: 'houve um erro ao tentar autenticar',
        });
      }
    }

    return true;
  }
}
