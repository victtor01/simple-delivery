import { Injectable, UnauthorizedException } from '@nestjs/common';
import { CreateProductTopicDto } from './dto/create-product-topic.dto';
import { UpdateProductTopicDto } from './dto/update-product-topic.dto';
import { ProductTopic } from './entities/product-topic.entity';
import { ProductTopicsRepository } from './repositories/product-topics-repository';
import { ProductsRepository } from 'src/products/repositories/products-repository';
import { Product } from 'src/products/entities/product.entity';
import { TopicOptionsService } from 'src/topic-options/topic-options.service';
import { ProductsService } from 'src/products/products.service';
import { TopicOption } from 'src/topic-options/entities/topic-option.entity';

@Injectable()
export class ProductTopicsService {
  constructor(
    private readonly productTopicsRepository: ProductTopicsRepository,
    private readonly productsService: ProductsService,
    private readonly topicOptionsService: TopicOptionsService,
  ) {}

  async create(
    createProductTopicDto: CreateProductTopicDto,
  ): Promise<ProductTopic> {
    const productTopic = new ProductTopic(createProductTopicDto);

    return this.productTopicsRepository.save(productTopic);
  }

  async updateManyTopicsWithOptions(
    productTopics: ProductTopic[],
    productId: string,
    managerId: string,
  ): Promise<any> {
    const productInDatabase: Product =
      await this.productsService.findByIdWithAllRelations(productId);

    if (!productInDatabase?.id || productInDatabase?.managerId !== managerId) {
      throw new UnauthorizedException(
        'Usuário não tem permissão para atualizar os tópicos do produto!',
      );
    }
    
    // 1. delete topics

    const productTopicsIdsToDelete: string[] = productInDatabase?.productTopics?.filter((topic) =>
          !productTopics.some((topicInBody) => topicInBody.id === topic.id),
      )
      ?.map((productTopic) => productTopic.id);

    if (productTopicsIdsToDelete?.[0]) {
      console.log('entrou para deletar', productTopicsIdsToDelete)

      await this.productTopicsRepository.removeManyById(
        productTopicsIdsToDelete,
      );
    }

    // 2. update topics

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

    // 3. update options of topics

    // 3.1 get all options to update or create
    const optionsInBody = productTopics.flatMap((productTopicCurrent) => {
      return productTopicCurrent.topicOptions.map((option) => ({
        ...option,
        topicProductId: productTopicCurrent.id,
      }));
    });

    const optionsInDatabase = productInDatabase?.productTopics.flatMap(
      (productTopicCurrent) => {
        return productTopicCurrent.topicOptions.map((option) => ({
          ...option,
          topicProductId: productTopicCurrent.id,
        }));
      },
    );

    // 3.2 delete all options
    // 3.2.1 get all id to delete
    const topicOptionsIdsToDelete: string[] = optionsInDatabase
      ?.filter(
        (optionInDatabase) =>
          !optionsInBody.some(
            (topicInBody) => topicInBody.id === optionInDatabase.id,
          ),
      )
      .map((option) => option.id);

    // 3.2.2 Delete
    if(topicOptionsIdsToDelete) {
      await this.topicOptionsService.deleteMany(topicOptionsIdsToDelete);
    }

    // 3.3 save all options
    await Promise.all(
      optionsInBody?.map((option) =>
        this.topicOptionsService.save(
          new TopicOption(
            {
              name: option.name,
              price: Number(option.price) || 0,
              topicProductId: option.topicProductId,
            },
            option.id || null,
          ),
        ),
      ),
    );

    return updates;
  }
}
