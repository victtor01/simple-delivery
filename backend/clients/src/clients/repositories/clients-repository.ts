import Client from '../entities/clients.entity';
import { CreateClientDto } from '../dtos/create-client.dto';

export abstract class ClientsRepository {
  abstract create(data: CreateClientDto): Promise<Client>;
  abstract findByEmail(email: string): Promise<Client>;
}
