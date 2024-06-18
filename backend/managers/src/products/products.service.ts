import {
  BadRequestException,
  Injectable,
  NotFoundException,
  UnauthorizedException,
} from '@nestjs/common';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { Product } from './entities/product.entity';
import { ProductsRepository } from './repositories/products-repository';
import { Manager } from 'src/managers/entities/manager.entity';
import { NotFoundError } from 'rxjs';

interface IFindByStore {
  storeId: string;
  managerId: string;
}

@Injectable()
export class ProductsService {
  constructor(private readonly productRepo: ProductsRepository) {}

  async create(data: {
    createProductDto: CreateProductDto;
    managerId: string;
    storeId: string;
  }): Promise<Product> {
    const { createProductDto, managerId, storeId } = data;
    const product = this.productRepo.create({
      body: createProductDto,
      managerId,
      storeId,
    });

    return await this.productRepo.save(product);
  }

  async findById(data: { managerId: string; productId: string }) {
    const { managerId, productId } = data;
    const product: Product = await this.productRepo.findByIdWithTopics(productId);

    if (!product?.id) return [];

    const managerIdOfProduct = product.managerId;
    if (managerIdOfProduct !== managerId) {
      throw new UnauthorizedException(
        'Você não pode pegar as informações desse sproduto',
      );
    }

    return product;
  }

  async findByStore(data: IFindByStore): Promise<Product[]> {
    const { storeId, managerId } = data;
    const products = await this.productRepo.findByStore(storeId);

    if (!products?.[0]?.id) return [];

    const managerInStore = products[0].managerId === managerId;
    if (!managerInStore) {
      throw new UnauthorizedException(
        'Você não pode pegar os dados dessa loja.',
      );
    }

    return products;
  }

  async update(data: {
    updateProductDto: UpdateProductDto;
    managerId: string;
    productId: string;
  }): Promise<boolean> {
    const { updateProductDto, managerId, productId } = data;
    // first of all, check if the product belongs to the user
    const product = await this.productRepo.findByIdWithTopics(productId);

    if (product?.managerId !== managerId) {
      throw new UnauthorizedException(
        'usuário não tem permissão para atualizar esse produto',
      );
    }

    // before, update the product
    const updatedProduct = await this.productRepo.update(productId, updateProductDto);

    if(Number(updatedProduct.affected) === 0) {
      throw new NotFoundException("Nenhum produto atualizado!");
    }

    return true;
  }
}
