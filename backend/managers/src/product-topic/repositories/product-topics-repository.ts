import { UpdateProductTopicDto } from "../dto/update-product-topic.dto";
import { ProductTopic } from "../entities/product-topic.entity";

export abstract class ProductTopicsRepository {
  abstract save(productTopic: ProductTopic): Promise<ProductTopic>;
}