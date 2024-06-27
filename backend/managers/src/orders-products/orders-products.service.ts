import { Injectable } from '@nestjs/common';
import { CreateOrdersProductDto } from './dto/create-orders-product.dto';
import { UpdateOrdersProductDto } from './dto/update-orders-product.dto';

@Injectable()
export class OrdersProductsService {
  create(createOrdersProductDto: CreateOrdersProductDto) {
    return 'This action adds a new ordersProduct';
  }

  findAll() {
    return `This action returns all ordersProducts`;
  }

  findOne(id: number) {
    return `This action returns a #${id} ordersProduct`;
  }

  update(id: number, updateOrdersProductDto: UpdateOrdersProductDto) {
    return `This action updates a #${id} ordersProduct`;
  }

  remove(id: number) {
    return `This action removes a #${id} ordersProduct`;
  }
}
