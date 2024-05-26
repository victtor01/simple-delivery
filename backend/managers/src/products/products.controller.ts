import { Controller, Post, Body, Get, Param, Req } from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Manager } from 'src/managers/entities/manager.entity';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post()
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':storeId')
  findByStore(
    @Param('storeId') storeId: string,
    @Req() req: { manager: Manager },
  ) {
    return this.productsService.findByStore({
      managerId: req.manager.id,
      storeId,
    });
  }
}
