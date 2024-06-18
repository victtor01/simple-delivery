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
import { StoresService } from 'src/stores/stores.service';
import { Store } from 'src/stores/entities/store.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { constantsJWT } from './constants';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  manager: Partial<Manager>;
};

interface ISelectStore {
  storeId: string;
  managerId: string;
  response: Response;
}

export interface TokenPayload {
  id: string;
  email: string;
}

@Injectable()
export class AuthService {
  constructor(
    private readonly managersService: ManagersService,
    private readonly storesService: StoresService,
    private readonly jwtService: JwtService,
  ) {}

  private refresh_token_expiration = {
    expiresIn: constantsJWT.token_refresh_expiration,
  };

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
        this.refresh_token_expiration,
      );

      // set cookies
      response.cookie('__access_token', access_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      response.cookie('__refresh_token', refresh_token, {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      });

      return {
        access_token,
        refresh_token,
        manager: {
          email: userdb.email,
        },
      };
    } catch (error) {
      throw new BadRequestException(error);
    }
  }

  async selectStore(data: ISelectStore): Promise<Partial<Store>> {
    const { managerId, storeId, response } = data;

    // check if the store belongs to the manager
    const store = await this.storesService.findById(storeId);

    const { managerId: managerIdInTheStore } = store;
    if (managerId.toString() !== managerIdInTheStore.toString()) {
      throw new UnauthorizedException('você não pode fazer essa ação!');
    }

    // create jwt and set cookie
    const jwtStore = await this.jwtService.signAsync({
      id: store.id,
    });

    response.cookie('__store', jwtStore, {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    });

    return {
      id: store.id,
      name: store.name,
    };
  }

  async decode(acesss_token: string): Promise<any> {
    return await this.jwtService.decode(acesss_token);
  }
}
