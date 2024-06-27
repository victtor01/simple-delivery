import { Controller } from '@nestjs/common';
import { MessagePattern, Payload } from '@nestjs/microservices';
import { OrdersProductsService } from './orders-products.service';
import { CreateOrdersProductDto } from './dto/create-orders-product.dto';
import { UpdateOrdersProductDto } from './dto/update-orders-product.dto';

@Controller()
export class OrdersProductsController {
  constructor(private readonly ordersProductsService: OrdersProductsService) {}

  @MessagePattern('createOrdersProduct')
  create(@Payload() createOrdersProductDto: CreateOrdersProductDto) {
    return this.ordersProductsService.create(createOrdersProductDto);
  }

  @MessagePattern('findAllOrdersProducts')
  findAll() {
    return this.ordersProductsService.findAll();
  }

  @MessagePattern('findOneOrdersProduct')
  findOne(@Payload() id: number) {
    return this.ordersProductsService.findOne(id);
  }

  @MessagePattern('updateOrdersProduct')
  update(@Payload() updateOrdersProductDto: UpdateOrdersProductDto) {
    return this.ordersProductsService.update(updateOrdersProductDto.id, updateOrdersProductDto);
  }

  @MessagePattern('removeOrdersProduct')
  remove(@Payload() id: number) {
    return this.ordersProductsService.remove(id);
  }
}
