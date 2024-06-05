import { Controller, Get } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { UpdateStoreDto } from './dto/update-store.dto';
import { ProxyService } from 'src/proxy/proxy.service';
import { firstValueFrom } from 'rxjs';

@Controller('stores')
export class StoresController {
  constructor(private readonly proxyService: ProxyService) {}

  @Get()
  async findAll() {
    const proxy = this.proxyService.configureToManagers();
    const stores = await firstValueFrom(proxy.send('stores.findAll', {}));
    const storesJSON = JSON.parse(stores);

    return storesJSON;
  }
}
