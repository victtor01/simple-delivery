import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../products-repository';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from 'src/products/dto/create-product.dto';

@Injectable()
export class ImplementsProductsRepository implements ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(body: CreateProductDto): Product {
    return this.productRepository.create(body);
  }

  save(data: Product): Promise<Product> {
    return this.productRepository.save(data);
  }

  findByIdAndManager(id: string, managerId: string): Promise<Product> {
    return this.productRepository.findOne({
      where: { 
        id,
      }
    })
  }

  findByStore(storeId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { storeId },
      relations: ['store'],
    });
  }
}