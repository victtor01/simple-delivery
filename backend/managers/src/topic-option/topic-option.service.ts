import { Injectable } from '@nestjs/common';
import { CreateTopicOptionDto } from './dto/create-topic-option.dto';
import { UpdateTopicOptionDto } from './dto/update-topic-option.dto';

@Injectable()
export class TopicOptionService {
  create(createTopicOptionDto: CreateTopicOptionDto) {
    return 'This action adds a new topicOption';
  }

  findAll() {
    return `This action returns all topicOption`;
  }

  findOne(id: number) {
    return `This action returns a #${id} topicOption`;
  }

  update(id: number, updateTopicOptionDto: UpdateTopicOptionDto) {
    return `This action updates a #${id} topicOption`;
  }

  remove(id: number) {
    return `This action removes a #${id} topicOption`;
  }
}
