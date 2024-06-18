import { Module } from '@nestjs/common';
import { TopicOptionService } from './topic-option.service';
import { TopicOptionController } from './topic-option.controller';

@Module({
  controllers: [TopicOptionController],
  providers: [TopicOptionService],
})
export class TopicOptionModule {}
