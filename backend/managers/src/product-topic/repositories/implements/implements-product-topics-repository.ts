import { ProductTopic } from "src/product-topic/entities/product-topic.entity";
import { ProductTopicsRepository } from "../product-topics-repository";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";
import { Injectable } from "@nestjs/common";
import { UpdateProductTopicDto } from "src/product-topic/dto/update-product-topic.dto";

@Injectable()
export class ImplementsProductsTopicsRepository implements ProductTopicsRepository {
  constructor(@InjectRepository(ProductTopic) private readonly productTopic: Repository<ProductTopic>) {}

  save(productTopic: ProductTopic): Promise<ProductTopic> {
    return this.productTopic.save(productTopic)
  }

}