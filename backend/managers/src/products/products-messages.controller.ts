import { Controller, Logger } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { ProxyService } from 'src/proxy/proxy.service';
import { ProductsService } from './products.service';

@Controller()
export class ProductsMessagesController {
  constructor(
    private readonly proxy: ProxyService,
    private readonly productsService: ProductsService,
  ) {}

  private logger: Logger = new Logger('ProductsMessagesController');

  @MessagePattern('products.findAllByIdWithAllRelations')
  async findAllByIdWithAllRelations(
    @Ctx() context: RmqContext,
    @Payload() payload: { storeId: string; productIds: string[] },
  ) {
    if (!payload?.productIds || !payload.storeId) {
      this.logger.error('Campos para pegar todos os dados dos produtos faltando!' , payload);
      this.proxy.confirmMessage(context);
      return [];
    }

    const products =
      await this.productsService.findAllByIdsAndStoreIdWithRelations(
        payload.productIds,
        payload.storeId,
      );

    this.logger.error(products)

    this.proxy.confirmMessage(context);
    return JSON.stringify(products);

    
  }
}
