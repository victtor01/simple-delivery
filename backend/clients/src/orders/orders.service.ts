import { Injectable } from '@nestjs/common';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProxyService } from 'src/proxy/proxy.service';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class OrdersService {
  constructor(private readonly proxyService: ProxyService) {}

  async create(createOrderDto: CreateOrderDto) {
    const proxy = this.proxyService.configureToManagers();
    const stores = await firstValueFrom(proxy.send('createOrder', createOrderDto));
    const storesJSON = JSON.parse(stores);

    return storesJSON;
  }
}
