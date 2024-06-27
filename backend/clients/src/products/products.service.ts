import { Body, Get, Injectable } from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ClientProxy } from '@nestjs/microservices';
import { ProxyService } from 'src/proxy/proxy.service';
import { GetProductsByIds } from './dto/get-products-by-ids';
import { firstValueFrom } from 'rxjs';

@Injectable()
export class ProductsService {
  private proxy: ClientProxy;

  constructor(private readonly proxyService: ProxyService) {
    this.proxy = this.proxyService.configureToManagers();
  }

  async findAllByIds(data: { storeId: string; productIds: string[] }) {
    console.log(data)
    const products = await firstValueFrom(
      this.proxy.send('products.findAllByIdWithAllRelations', data),
    );
    const productsJSON = JSON.parse(products);


    return productsJSON;
  }
}
