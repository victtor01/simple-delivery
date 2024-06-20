import {
  Body,
  Controller,
  HttpCode,
  HttpStatus,
  Post,
  Req,
  Res,
} from '@nestjs/common';
import { AuthDto } from './dtos/auth.dto';
import { AuthService } from './auth.service';
import { Public } from 'src/config/constants';
import { Response } from 'express';
import { Manager } from 'src/managers/entities/manager.entity';
import {
  ApiBadRequestResponse,
  ApiNotFoundResponse,
  ApiOkResponse,
  ApiTags,
} from '@nestjs/swagger';

type AuthResponse = {
  access_token: string;
  refresh_token: string;
  manager: Partial<Manager>;
};

@ApiTags('Auth')
@Controller('auth')
export class AuthController {
  constructor(private readonly authService: AuthService) {}

  // Swagger documentation
  @ApiNotFoundResponse({ description: 'Not Found' })
  @ApiOkResponse({ description: 'login sucessful' })
  @Public()
  @Post()
  @HttpCode(HttpStatus.OK)
  async auth(
    @Body() AuthBody: AuthDto,
    @Res({ passthrough: true }) response: Response,
  ): Promise<AuthResponse> {
    const logged = await this.authService.auth(AuthBody, response);
    return logged;
  }

  /**
   * This function allows the manager to select
   * the store
   */

  // Swagger documentation
  @ApiBadRequestResponse({ description: 'Bad Request' })
  @ApiOkResponse({ description: 'store selected' })
  @Post('select-store')
  @HttpCode(HttpStatus.OK)
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
