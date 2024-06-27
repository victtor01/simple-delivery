import { Test, TestingModule } from '@nestjs/testing';
import { OrdersProductsController } from './orders-products.controller';
import { OrdersProductsService } from './orders-products.service';

describe('OrdersProductsController', () => {
  let controller: OrdersProductsController;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      controllers: [OrdersProductsController],
      providers: [OrdersProductsService],
    }).compile();

    controller = module.get<OrdersProductsController>(OrdersProductsController);
  });

  it('should be defined', () => {
    expect(controller).toBeDefined();
  });
});
