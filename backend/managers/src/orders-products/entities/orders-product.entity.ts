import { Order } from 'src/orders/entities/order.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToMany,
  OneToMany,
  PrimaryGeneratedColumn,
} from 'typeorm';

@Entity({ name: 'orders_products' })
export class OrdersProduct {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @ManyToMany(() => Product, (product) => product.ordersProducts)
  @JoinColumn({ name: 'orders_products' })
  product: Product;

  @Column({ type: 'int' })
  quantity: number;
  
  @Column({ name: 'orderId' })
  orderId: string;

  @OneToMany(() => Order, (order) => order.ordersProducts)
  @JoinColumn({ name: 'orderId' })
  order: Order
}
