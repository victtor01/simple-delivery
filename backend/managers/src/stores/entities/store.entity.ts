import { Category } from 'src/categories/entities/category.entity';
import { Manager } from 'src/managers/entities/manager.entity';
import { Product } from 'src/products/entities/product.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  JoinColumn,
  ManyToOne,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

@Entity('stores')
export class Store {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @Column({ name: 'description', nullable: true })
  description?: string;

  @Column({ name: 'managerId' })
  managerId: string;

  @ManyToOne(() => Manager, (manager) => manager.stores)
  @JoinColumn({ name: 'managerId' })
  manager: Manager;

  @OneToMany(() => Product, (product) => product.store)
  products: Product[];

  @OneToMany(() => Category, (category) => category.store)
  categories: Category[]

  @CreateDateColumn()
  createdAt: string;

  @UpdateDateColumn()
  updatedAt: string;
}
