import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { compare } from 'bcryptjs';
import { AuthDto } from './dtos/auth.dto';
import { JwtService } from '@nestjs/jwt';
import { Response } from 'express';
import { ManagersService } from 'src/managers/managers.service';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
};

export interface TokenPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly managersService: ManagersService,
    private readonly jwtService: JwtService,
  ) {}

  async auth(body: AuthDto, response: Response): Promise<AuthResponse> {
    try {
      // auth user with password
      const userdb =
        (await this.managersService.findByEmail(body?.email)) || null;

      // case not exists user in database
      if (!userdb?.email)
        throw new NotFoundException('usuário não encontrado!');

      // compare passwords
      const comparePassword = await compare(body.password, userdb.password);
      if (!comparePassword) throw new UnauthorizedException('senha incorreta!');

      // create access
      const access_token = await this.jwtService.signAsync({
        id: userdb.id,
        email: userdb.email,
      });

      const refresh_token = await this.jwtService.signAsync(
        {
          id: userdb.id,
          email: userdb.email,
        },
        {
          expiresIn: '4d',
        },
      );

      // set cookies
      response.cookie('access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      response.cookie('refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      return {
        access_token,
        refresh_token,
      };
    } catch (error) {
      console.log(error);
      throw new BadRequestException(error);
    }
  }

  async decode(acesss_token: string): Promise<any> {
    return await this.jwtService.decode(acesss_token);
  }
}
