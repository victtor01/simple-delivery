import { Body, Controller, Post, Req, Res } from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/config/constants';
import { Response } from 'express';
import { Manager } from 'src/managers/entities/manager.entity';

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

  @Post('select-store')
  async selectedStore(
    @Body('storeId') storeId: string,
    @Req() req: { manager: Manager },
    @Res({ passthrough: true }) response: Response,
  ) {
    const managerId = req.manager.id;
    
    const result = await this.authService.selectStore({
      response,
      storeId,
      managerId,
    });

    return result;
  }
}
