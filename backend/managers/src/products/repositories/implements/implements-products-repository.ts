import { Injectable } from '@nestjs/common';
import { ProductsRepository } from '../products-repository';
import { Product } from 'src/products/entities/product.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { In, Repository, UpdateResult } from 'typeorm';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { UpdateProductDto } from 'src/products/dto/update-product.dto';

@Injectable()
export class ImplementsProductsRepository implements ProductsRepository {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  create(data: {
    body: CreateProductDto;
    managerId: string;
    storeId: string;
  }): Product {
    const { body, managerId, storeId } = data;
    return this.productRepository.create({
      ...body,
      managerId,
      storeId,
    });
  }

  findByIdWithAllRelations(productId: string): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        id: productId,
      },
      relations: {
        productTopics: {
          topicOptions: true,
        },
        categories: true,
      },
    });
  }

  findProductsByIdsAndStore(
    ids: string[],
    storeId: string,
  ): Promise<Product[]> {
    return this.productRepository.find({
      where: {
        id: In(ids),
        storeId,
      },
      relations: {
        productTopics: {
          topicOptions: true,
        },
      },
    });
  }

  save(data: Product): Promise<Product> {
    return this.productRepository.save(data);
  }

  async filter(data: {
    filters: { category?: string };
    storeId: string;
  }): Promise<Product[]> {
    const queryBuilder = this.productRepository
      .createQueryBuilder('product')
      .leftJoinAndSelect('product.categories', 'category')
      .where('product.storeId = :storeId', { storeId: data.storeId });

    if (data.filters.category) {
      queryBuilder.andWhere('category.name = :category', {
        category: data.filters.category,
      });
    }

    return await queryBuilder.getMany();
  }

  findByIdAndManager(id: string, managerId: string): Promise<Product> {
    return this.productRepository.findOne({
      where: {
        managerId,
        id,
      },
    });
  }

  findByStore(storeId: string): Promise<Product[]> {
    return this.productRepository.find({
      where: { storeId },
      relations: {
        productTopics: true,
      },
    });
  }

  update(productId: string, data: UpdateProductDto): Promise<UpdateResult> {
    return this.productRepository.update(productId, data);
  }
}
