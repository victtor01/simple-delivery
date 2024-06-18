import { Test, TestingModule } from '@nestjs/testing';
import { JwtService } from '@nestjs/jwt';
import { AuthService } from './auth.service';
import { ManagersService } from 'src/managers/managers.service';
import { StoresService } from 'src/stores/stores.service';
import { AuthDto } from './dtos/auth.dto';
import { Response } from 'express';
import { NotFoundException, UnauthorizedException } from '@nestjs/common';
import { compare } from 'bcryptjs';
import { Manager } from 'src/managers/entities/manager.entity';

const createManagerDto = {
  firstName: 'example',
  lastName: 'example',
  email: 'example@example.com',
  password: 'EXAMPLE',
};

jest.mock('bcryptjs');

describe('AuthService', () => {
  let service: AuthService;
  let managersService: ManagersService;
  let jwtService: JwtService;
  let response: Response;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [
        AuthService,
        {
          provide: ManagersService,
          useValue: {
            findByEmail: jest.fn(),
          },
        },
        {
          provide: StoresService,
          useValue: {},
        },
        {
          provide: JwtService,
          useValue: {
            signAsync: jest.fn(),
          },
        },
      ],
    }).compile();

    service = module.get<AuthService>(AuthService);
    managersService = module.get<ManagersService>(ManagersService);
    jwtService = module.get<JwtService>(JwtService);
    response = {
      cookie: jest.fn(),
    } as any;
  });

  it('should authenticate a user successfully', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const manager = new Manager(createManagerDto);

    jest
      .spyOn(managersService, 'findByEmail')
      .mockResolvedValue(await new Promise((resolve) => resolve(manager)));
    (compare as jest.Mock).mockResolvedValue(true);
    jest
      .spyOn(jwtService, 'signAsync')
      .mockResolvedValueOnce('access_token')
      .mockResolvedValueOnce('refresh_token');

    const result = await service.auth(authDto, response);

    expect(result).toEqual({
      access_token: 'access_token',
      refresh_token: 'refresh_token',
      manager: { email: 'example@example.com' },
    });
    expect(response.cookie).toHaveBeenCalledTimes(2);
    expect(response.cookie).toHaveBeenCalledWith(
      '__access_token',
      'access_token',
      {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      },
    );
    expect(response.cookie).toHaveBeenCalledWith(
      '__refresh_token',
      'refresh_token',
      {
        httpOnly: true,
        sameSite: 'strict',
        path: '/',
      },
    );
  });

  it('should throw NotFoundException if user does not exist', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'password',
    };

    jest.spyOn(managersService, 'findByEmail').mockResolvedValue(null);

    await expect(service.auth(authDto, response)).rejects.toThrow(
      new NotFoundException('usuário não encontrado!'),
    );
  });

  it('should throw UnauthorizedException if password is incorrect', async () => {
    const authDto: AuthDto = {
      email: 'test@example.com',
      password: 'password',
    };
    const manager = new Manager(createManagerDto);

    jest
      .spyOn(managersService, 'findByEmail')
      .mockResolvedValue(await Promise.resolve(manager));
    (compare as jest.Mock).mockResolvedValue(false);

    await expect(service.auth(authDto, response)).rejects.toThrow(
      new UnauthorizedException('senha incorreta!'),
    );
  });
});
