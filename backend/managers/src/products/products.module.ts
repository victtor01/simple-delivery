import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products-repository';
import { ImplementsProductsRepository } from './repositories/implements/implements-products-repository';
import { ProxyModule } from 'src/proxy/proxy.module';
import { ProductsMessagesController } from './products-messages.controller';

@Module({
  imports: [TypeOrmModule.forFeature([Product]), ProxyModule],
  controllers: [ProductsController, ProductsMessagesController],
  providers: [
    ProductsService,
    {
      provide: ProductsRepository,
      useClass: ImplementsProductsRepository,
    },
  ],
  exports: [ProductsService, ProductsRepository],
})
export class ProductsModule {}
