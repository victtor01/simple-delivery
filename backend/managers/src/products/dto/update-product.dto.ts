import { PartialType } from '@nestjs/mapped-types';
import { CreateProductDto } from './create-product.dto';
import { Category } from 'src/categories/entities/category.entity';
import { ProductTopic } from 'src/product-topic/entities/product-topic.entity';

export class UpdateProductDto extends PartialType(CreateProductDto) {
  categories?: Category[]
  productTopics: ProductTopic[]
}
