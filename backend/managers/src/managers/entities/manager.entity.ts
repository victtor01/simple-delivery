import { Product } from 'src/products/entities/product.entity';
import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';
import { CreateManagerDto } from '../dto/create-manager.dto';
import { randomUUID } from 'crypto';

@Entity({ name: 'managers' })
export class Manager {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'firstName' })
  firstName: string;

  @Column({ name: 'lastName' })
  lastName: string;

  @Column({ name: 'email', unique: true })
  email: string;

  @Column({ name: 'password' })
  password: string;

  @CreateDateColumn({ name: 'createdAt' })
  createdAt: string;

  @UpdateDateColumn({ name: 'updatedAt' })
  updatedAt: string;

  @OneToMany(() => Store, (store) => store.manager)
  stores: Store[];

  @OneToMany(() => Product, (product) => product.manager)
  products: Product[];

  constructor(props: CreateManagerDto) {
    this.id = randomUUID();
    Object.assign(this, props)
  }
}
