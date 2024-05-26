import { Module } from '@nestjs/common';
import { AuthService } from './auth.service';
import { AuthController } from './auth.controller';
import { ClientsModule } from 'src/clients/clients.module';

@Module({
  imports: [ClientsModule],
  controllers: [AuthController],
  providers: [AuthService],
})
export class AuthModule {}
