import { Controller } from '@nestjs/common';
import {
  Ctx,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { StoresService } from './stores.service';
import { ProxyService } from 'src/proxy/proxy.service';

@Controller()
export class StoresControllerMessages {
  constructor(
    private readonly storesService: StoresService,
    private readonly proxy: ProxyService,
  ) {}

  @MessagePattern('stores.findAll')
  async findAll(@Ctx() context: RmqContext) {
    const stores = await this.storesService.findAll();
    this.proxy.confirmMessage(context);
    return JSON.stringify(stores);
  }

  @MessagePattern('stores.findByIdWithRelations')
  async findById(
    @Ctx() context: RmqContext,
    @Payload() payload: { storeId: string },
  ) {
    const stores = await this.storesService.findByIdWithProductsAndRelations(payload.storeId);
    this.proxy.confirmMessage(context);
    return JSON.stringify(stores);
  }
}
