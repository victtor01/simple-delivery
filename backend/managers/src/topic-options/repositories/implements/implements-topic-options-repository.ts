import { TopicOption } from "src/topic-options/entities/topic-option.entity";
import { TopicOptionsRepository } from "../topic-options-repository";
import { Injectable } from "@nestjs/common";
import { InjectRepository } from "@nestjs/typeorm";
import { Repository } from "typeorm";

@Injectable()
export class ImplementsTopicOptionsRepository implements TopicOptionsRepository {
  constructor(
    @InjectRepository(TopicOption)
    private readonly topicOptionRepository: Repository<TopicOption>,
  ) {}

  save(data: TopicOption): Promise<TopicOption> {
    return this.topicOptionRepository.save(data);  
  }

  deleteManyById(idsToRemove: string[]): Promise<any> {
    return this.topicOptionRepository.delete(idsToRemove)
  }

  
}