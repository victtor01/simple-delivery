import {
  Controller,
  Post,
  Body,
  Get,
  Param,
  Req,
  UseGuards,
  Res,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { StoresGuard } from 'src/stores/stores.guard';
import { Store } from 'src/stores/entities/store.entity';
import { Response } from 'express';

@UseGuards(StoresGuard)
@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  async create(
    @Body() createProductDto: CreateProductDto,
    @Req() request: { manager: Manager; store: Store },
  ) {
    const {
      manager: { id: managerId },
      store: { id: storeId },
    } = request;

    const created = await this.productsService.create({
      createProductDto,
      managerId,
      storeId,
    });

    return created;
  }

  @Get(':productId')
  async findById(
    @Req() req: { manager: Manager },
    @Param('productId') productId: string,
  ) { 
    return await this.productsService.findById({
      managerId: req.manager.id,
      productId,
    });
  }

  @Get()
  findByStore(
    @Req() request: { manager: Partial<Manager>; store: Partial<Store> },
  ) {
    return this.productsService.findByStore({
      managerId: request.manager.id,
      storeId: request?.store.id,
    });
  }
}
