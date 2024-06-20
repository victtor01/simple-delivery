import { TopicOption } from "../entities/topic-option.entity";

export abstract class TopicOptionsRepository {
  abstract save(data: TopicOption): Promise<TopicOption> 
  abstract deleteManyById(idsToDelete: string[]): Promise<any>
}