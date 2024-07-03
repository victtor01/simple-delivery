import {
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ClientsService } from 'src/clients/clients.service';
import { JwtService } from '@nestjs/jwt';
import { Payload } from '@nestjs/microservices';
import { _jwtConstants } from './constants';
import Client from 'src/clients/entities/clients.entity';

export type TokenPayload = {
  id: string;
  email: string;
};

type PayloadPassport = {
  id: string;
  email: string;
};

type ResponseLogin = {
  access_token: string;
  refresh_token: string;
  client: Partial<Client>;
};

@Injectable()
export class AuthService {
  constructor(
    private readonly clientsService: ClientsService,
    private readonly jwtService: JwtService,
  ) {}

  async login({ email, password }: LoginDto): Promise<ResponseLogin> {
    const client = await this.clientsService.findByEmail(email);

    if (!client?.id) throw new NotFoundException('user not found!');

    if (client?.password !== password)
      throw new UnauthorizedException('Senha não coecidem');

    const payloadToPassport = {
      id: client.id,
      email: client.email,
    } satisfies PayloadPassport;

    const expiration_access_token = {
      expiresIn: _jwtConstants.access_token_expiration,
    };

    const expiration_refresh_token = {
      expiresIn: _jwtConstants.access_token_expiration,
    };

    const access_token = await this.jwtService.signAsync(
      payloadToPassport,
      expiration_access_token,
    );

    const refresh_token = await this.jwtService.signAsync(
      payloadToPassport,
      expiration_refresh_token,
    );

    return {
      access_token,
      refresh_token,
      client: {
        lastName: client.lastName,
        firstName: client.firstName,
        email: client.email,
      },
    };
  }
}
