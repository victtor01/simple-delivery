import { ImplementsStoresRepository } from './repositories/implements/implements-stores-repository';
import { StoresRepository } from './repositories/stores-repository';
import { StoresController } from './stores.controller';
import { StoresService } from './stores.service';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Store } from './entities/store.entity';
import { Module } from '@nestjs/common';
import { ProxyModule } from 'src/proxy/proxy.module';
import { StoresGuard } from './stores.guard';
import { StoresControllerMessages } from './stores-messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Store]), ProxyModule],
  controllers: [StoresController, StoresControllerMessages],
  providers: [
    StoresGuard,
    StoresService,
    {
      provide: StoresRepository,
      useClass: ImplementsStoresRepository,
    },
  ],
  exports: [StoresService, StoresRepository, StoresGuard],
})
export class StoresModule {}
