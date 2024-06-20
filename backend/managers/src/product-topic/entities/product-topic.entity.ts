import { UUID, randomUUID } from 'crypto';
import { CreateProductDto } from 'src/products/dto/create-product.dto';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateProductTopicDto } from '../dto/create-product-topic.dto';
import { TopicOption } from 'src/topic-options/entities/topic-option.entity';

@Entity({ name: 'ProductTopics' })
export class ProductTopic {
  @PrimaryGeneratedColumn('uuid')
  id: UUID | string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'productId' })
  productId: string;

  @ManyToOne(() => Product, (product) => product.productTopics)
  product: Product;

  @OneToMany(() => TopicOption, (option) => option.topicProduct)
  topicOptions: TopicOption[];

  constructor(
    createProductTopicDto: CreateProductTopicDto,
    id?: UUID | string | null,
  ) {
    Object.assign(this, createProductTopicDto);
    this.id = id || randomUUID();
  }
}
