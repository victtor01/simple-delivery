import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { JwtModule } from '@nestjs/jwt';
import { SECRET_KEY } from './constants/secret';
import { constantsJWT } from './constants';
import { ManagersModule } from 'src/managers/managers.module';
import { StoresModule } from 'src/stores/stores.module';

@Module({
  imports: [
    ManagersModule,
    StoresModule,
    JwtModule.register({
      global: true,
      secret: SECRET_KEY,
      signOptions: { expiresIn: constantsJWT.token_expiration },
    }),
  ],
  providers: [AuthService],
  controllers: [AuthController],
  exports: [AuthService],
})
export class AuthModule {}
