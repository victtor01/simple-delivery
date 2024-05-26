import {
  BadRequestException,
  Injectable,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products-repository';

interface IFindByStore {
  storeId: string;
  managerId: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async create(createProductDto: CreateProductDto): Promise<Product> {
    const product = this.productRepo.create(createProductDto);
    return await this.productRepo.save(product);
  }

  async findByStore(data: IFindByStore): Promise<Product[]> {
    const { storeId, managerId } = data;

    const products = await this.productRepo.findByStore(storeId);

    if (!products?.[0]?.id) return [];

    const managerInStore = products[0].store.managerId === managerId;

    if (!managerInStore) {
      throw new UnauthorizedException(
        'Você não pode pegar os dados dessa loja.',
      );
    }

    console.log(products);

    return products;
  }
}
