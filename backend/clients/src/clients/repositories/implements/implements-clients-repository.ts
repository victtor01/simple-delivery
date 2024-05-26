import { Injectable } from '@nestjs/common';
import { ClientsRepository } from '../clients-repository';
import { CreateClientDto } from 'src/clients/dtos/create-client.dto';
import { InjectRepository } from '@nestjs/typeorm';
import Client from 'src/clients/clients.entity';
import { Repository } from 'typeorm';

@Injectable()
export class ImplementsClientsRepository implements ClientsRepository {
  constructor(
    @InjectRepository(Client)
    private readonly clientsRepository: Repository<Client>,
  ) {}

  create(data: CreateClientDto): Promise<Client> {
    return this.clientsRepository.save(data);
  }

  findByEmail(email: string): Promise<Client> {
    return this.clientsRepository.findOne({
      where: {
        email,
      },
    });
  }
}
