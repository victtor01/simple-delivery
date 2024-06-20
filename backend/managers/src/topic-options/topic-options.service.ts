import { Injectable } from '@nestjs/common';
import { CreateTopicOptionDto } from './dto/create-topic-option.dto';
import { UpdateTopicOptionDto } from './dto/update-topic-option.dto';
import { TopicOptionsRepository } from './repositories/topic-options-repository';
import { TopicOption } from './entities/topic-option.entity';

@Injectable()
export class TopicOptionsService {
  constructor(
    private readonly topicOptionsRepository: TopicOptionsRepository
  ){} 

  async create(data: CreateTopicOptionDto) {
    const optionEntity = new TopicOption(data);

    return optionEntity
  }

  async save(data: TopicOption): Promise<TopicOption> {
    const create = this.topicOptionsRepository.save(data);

    return create;
  }

  async deleteMany(idsToDelete: string[]) {
    const deleted = await this.topicOptionsRepository.deleteManyById(idsToDelete);

    return deleted
  }
  
}
