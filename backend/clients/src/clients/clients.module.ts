import { Module } from '@nestjs/common';
import { ClientsController } from './clients.controller';
import { ClientsService } from './clients.service';
import { ClientsRepository } from './repositories/clients-repository';
import { ImplementsClientsRepository } from './repositories/implements/implements-clients-repository';
import Client from './entities/clients.entity';
import { TypeOrmModule } from '@nestjs/typeorm';

@Module({
  imports: [TypeOrmModule.forFeature([Client])],
  controllers: [ClientsController],
  providers: [
    ClientsService,
    {
      provide: ClientsRepository,
      useClass: ImplementsClientsRepository,
    },
  ],
  exports: [ClientsService, ClientsRepository],
})
export class ClientsModule {}
