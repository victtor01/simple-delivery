import {
  BadRequestException,
  Body,
  Controller,
  Get,
  Param,
  Post,
} from '@nestjs/common';
import { Payload } from '@nestjs/microservices';
import { ProductsService } from './products.service';
import { GetProductsByIds as FindProductsByIds } from './dto/get-products-by-ids';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('findByIds')
  async findAllByIds(@Body() { storeId, productIds }: FindProductsByIds) {
    try {
      console.log(productIds)
      return await this.productsService
        .findAllByIds({
          storeId,
          productIds,
        });
    } catch (err) {
      throw new BadRequestException(err);
    }
  }
}
