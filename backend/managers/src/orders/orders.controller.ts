import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { UpdateOrderDto } from './dto/update-order.dto';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller()
export class OrdersController {
  constructor(
    private readonly ordersService: OrdersService,
    private readonly proxy: ProxyService,
  ) {}

  @MessagePattern('createOrder')
  async create(
    @Payload() createOrderDto: CreateOrderDto,
    @Ctx() context: RmqContext,
  ) {
    const stores = await this.ordersService.create();
    this.proxy.confirmMessage(context);
    
    return JSON.stringify(stores);
  }
}
