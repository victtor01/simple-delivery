import { Category } from 'src/categories/entities/category.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { ProductTopic } from 'src/product-topic/entities/product-topic.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  JoinTable,
  ManyToMany,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UUID, randomUUID } from 'crypto';

@Entity({ name: 'products' })
export class Product {

  constructor(props: Partial<Product>, id?: UUID) {
      Object.assign(this, props);
      this.id = id || randomUUID();
  }

  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', type: 'text' })
  description: string;

  @Column({ name: 'price', type: 'decimal', precision: 7, scale: 2 })
  price: number;

  @Column({ name: 'photo', nullable: true })
  photo?: string;

  @Column({ name: 'quantity', type: 'int', default: 0 })
  quantity: number;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @Column({ name: 'storeId' })
  storeId: string;

  @Column({ name: 'managerId' })
  managerId: string;

  @ManyToMany(() => Category, (category) => category.products)
  @JoinTable()
  categories: Category[];

  @ManyToOne(() => Store, (store) => store.products)
  @JoinColumn({ name: 'storeId' })
  store: Store;

  @ManyToOne(() => Manager, (manager) => manager.products)
  @JoinColumn({ name: 'managerId' })
  manager: Manager;

  @OneToMany(() => ProductTopic, (productTopic) => productTopic.product)
  productTopics: ProductTopic[];
}
