import { Injectable, NotFoundException } from '@nestjs/common';
import { LoginDto } from './dtos/login.dto';
import { ClientsService } from 'src/clients/clients.service';

@Injectable()
export class AuthService {
  constructor(private readonly clientsService: ClientsService) {}

  async login({ email, password }: LoginDto) {
    const client = await this.clientsService.findByEmail(email);

    if (!client?.id) throw new NotFoundException('user not found!');
    
    return client;
  }
}
