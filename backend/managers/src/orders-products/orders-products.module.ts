import { Module } from '@nestjs/common';
import { OrdersProductsService } from './orders-products.service';
import { OrdersProductsController } from './orders-products.controller';

@Module({
  controllers: [OrdersProductsController],
  providers: [OrdersProductsService],
})
export class OrdersProductsModule {}
