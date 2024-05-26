import { Injectable } from '@nestjs/common';
import { ClientsRepository } from './repositories/clients-repository';
import Client from './clients.entity';
import { CreateClientDto } from './dtos/create-client.dto';

@Injectable()
export class ClientsService {
  constructor(private readonly clientsRepository: ClientsRepository) {}

  async create(data: CreateClientDto): Promise<Client> {
    return await this.clientsRepository.create(data);
  }

  async findByEmail(email: string): Promise<Client> {
    return await this.clientsRepository.findByEmail(email);
  }
}
