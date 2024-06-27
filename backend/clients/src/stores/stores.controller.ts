import { Controller, Get, Logger, Param } from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyService } from 'src/proxy/proxy.service';
import { firstValueFrom } from 'rxjs';
import { Public } from 'src/config/constants';

@Controller('stores')
export class StoresController {
  private proxy: ClientProxy;

  constructor(private readonly proxyService: ProxyService) {
    this.proxy = this.proxyService.configureToManagers();
  }
  
  @Public()
  @Get()
  async findAll() {
    const stores = await firstValueFrom(this.proxy.send('stores.findAll', {}));
    const storesJSON = JSON.parse(stores);

    return storesJSON;
  }

  @Get(`:storeId`)
  async findByIdWithRelations(@Param('storeId') storeId: string) {
    const store = await firstValueFrom(this.proxy.send('stores.findByIdWithRelations', {
      storeId
    }))

    const storesJSON = JSON.parse(store);

    return storesJSON;
  }
}
