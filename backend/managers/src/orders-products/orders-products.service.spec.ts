import { Test, TestingModule } from '@nestjs/testing';
import { OrdersProductsService } from './orders-products.service';

describe('OrdersProductsService', () => {
  let service: OrdersProductsService;

  beforeEach(async () => {
    const module: TestingModule = await Test.createTestingModule({
      providers: [OrdersProductsService],
    }).compile();

    service = module.get<OrdersProductsService>(OrdersProductsService);
  });

  it('should be defined', () => {
    expect(service).toBeDefined();
  });
});
