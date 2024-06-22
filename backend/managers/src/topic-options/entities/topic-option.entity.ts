import { UUID, randomUUID } from 'crypto';
import { ProductTopic } from 'src/product-topic/entities/product-topic.entity';
import {
  Column,
  Entity,
  JoinColumn,
  ManyToOne,
  PrimaryGeneratedColumn,
} from 'typeorm';
import { CreateTopicOptionDto } from '../dto/create-topic-option.dto';

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
}
