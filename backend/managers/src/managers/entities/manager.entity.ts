import { Store } from 'src/stores/entities/store.entity';
import {
  Column,
  CreateDateColumn,
  Entity,
  OneToMany,
  PrimaryGeneratedColumn,
  UpdateDateColumn,
} from 'typeorm';

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
  stores: Store[]
}
