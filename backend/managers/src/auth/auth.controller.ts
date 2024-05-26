import { Body, Controller, Post, Res } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/config/constants';
import { Response } from 'express';

@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  @Public()
  @Post()
  async auth(
    @Body() AuthBody: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ) {
    return await this.authService.auth(AuthBody, response);
  }
}
