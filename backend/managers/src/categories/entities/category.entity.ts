import { Product } from "src/products/entities/product.entity";
import { Store } from "src/stores/entities/store.entity";
import { Column, Entity, JoinColumn, ManyToMany, ManyToOne, PrimaryGeneratedColumn } from "typeorm";
import { CreateCategoryDto } from "../dto/create-category.dto";
import { randomUUID } from "crypto";

@Entity({ name: 'categories' })
export class Category {
  @PrimaryGeneratedColumn('uuid')
  id: string;

  @Column({ name: 'name' })
  name: string;

  @ManyToMany(() => Product, (product) => product.categories)
  products: Product[]

  @Column({ name: 'storeId' })
  storeId: string;

  @ManyToOne(() => Store, (store) => store.categories)
  @JoinColumn({ name: 'storeId' })
  store: Store

  constructor(props: CreateCategoryDto) {
    this.id = randomUUID();
    Object.assign(this, props);
  }
}
