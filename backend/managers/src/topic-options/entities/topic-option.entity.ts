import { UUID, randomUUID } from 'crypto';
import { ProductTopic } from 'src/product-topic/entities/product-topic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateTopicOptionDto } from '../dto/create-topic-option.dto';
import { OrdersProduct } from 'src/orders-products/entities/orders-product.entity';
import { Order } from 'src/orders/entities/order.entity';

@Entity({ name: 'topicOptions' })
export class TopicOption {
  constructor(props: CreateTopicOptionDto, id?: UUID) {
    Object.assign(this, props);
    this.id = id || randomUUID();
  }

  @PrimaryGeneratedColumn('uuid')
  id: UUID;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'price', type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column({ name: 'topicProductId' })
  topicProductId: string;

  @ManyToOne(() => ProductTopic, (topic) => topic.topicOptions, {
    onDelete: 'CASCADE',
    onUpdate: 'CASCADE',
  })
  @JoinColumn({ name: 'topicProductId' })
  topicProduct: ProductTopic;

  @ManyToMany(() => Order, (order) => order.topicOptions)
  orders: Order[];
}
