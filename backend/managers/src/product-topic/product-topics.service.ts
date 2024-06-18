import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductTopicDto } from './dto/create-product-topic.dto';
import { UpdateProductTopicDto } from './dto/update-product-topic.dto';
import { ProductTopic } from './entities/product-topic.entity';
import { ProductTopicsRepository } from './repositories/product-topics-repository';
import { ProductsRepository } from 'src/products/repositories/products-repository';

@Injectable()
export class ProductTopicsService {
  constructor(
    private readonly productTopicsRepository: ProductTopicsRepository,
    private readonly productsRepository: ProductsRepository,
  ) {}

  async create(
    createProductTopicDto: CreateProductTopicDto,
  ): Promise<ProductTopic> {
    const productTopic = new ProductTopic(createProductTopicDto);

    return this.productTopicsRepository.save(productTopic);
  }

  async saveMany(
    productTopics: ProductTopic[],
    productId: string,
    managerId: string,
  ): Promise<any> {
    const productInDatabase = await this.productsRepository.findByIdAndManager(
      productId,
      managerId,
    );

    console.log(productTopics)

    if (!productInDatabase?.id || productInDatabase?.managerId !== managerId) {
      throw new UnauthorizedException(
        'Usuário não tem permissão para atualizar os tópicos do produto!',
      );
    }

    const updates = await Promise.all(
      productTopics?.map((productTopic) =>
        this.productTopicsRepository.save(
          new ProductTopic(
            {
              name: productTopic?.name,
              productId,
            },
            productTopic?.id || null,
          ),
        ),
      ),
    );

    return updates;
  }
}
