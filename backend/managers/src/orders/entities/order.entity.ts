import { OrdersProduct } from 'src/orders-products/entities/orders-product.entity';
import { Product } from 'src/products/entities/product.entity';
import { TopicOption } from 'src/topic-options/entities/topic-option.entity';
import {
  CreateDateColumn,
  Entity,
  JoinTable,
  ManyToMany,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders' })
export class Order {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToOne(() => OrdersProduct, (ordersProduct) => ordersProduct.order)
  ordersProducts: OrdersProduct[];

  @ManyToMany(() => TopicOption, (topicOption) => topicOption.orders)
  @JoinTable({ name: 'orders_topicOptions' })
  topicOptions: TopicOption[];

  @CreateDateColumn()
  createdAt: Date;
}
