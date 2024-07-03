import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthService } from './auth.service';
import { LoginDto } from './dtos/login.dto';
import { CookieOptions, Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Post()
  async login(
    @Body() body: LoginDto,
    @Res({ passthrough: true }) res: Response,
  ) {
    const { access_token, refresh_token, client } =
      await this.authService.login(body);

    const configCookies = {
      httpOnly: true,
      sameSite: 'strict',
      path: '/',
    } satisfies CookieOptions;

    res.cookie('__access_token', access_token, configCookies);
    res.cookie('__refresh_token', refresh_token, configCookies);

    return {
      error: false,
      client,
    };
  }
}
