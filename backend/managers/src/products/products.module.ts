import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products-repository';
import { ImplementsProductsRepository } from './repositories/implements/implements-products-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Product])],
  controllers: [ProductsController],
  providers: [
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: ImplementsProductsRepository,
    },
  ],
})
export class ProductsModule {}
