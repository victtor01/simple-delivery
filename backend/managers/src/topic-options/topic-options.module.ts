import { Module } from '@nestjs/common';
import { TopicOptionsService } from './topic-options.service';
import { TopicOptionsController } from './topic-options.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { TopicOption } from './entities/topic-option.entity';
import { TopicOptionsRepository } from './repositories/topic-options-repository';
import { ImplementsTopicOptionsRepository } from './repositories/implements/implements-topic-options-repository';

@Module({
  imports: [TypeOrmModule.forFeature([TopicOption])],
  controllers: [TopicOptionsController],
  providers: [
    TopicOptionsService,
    {
      provide: TopicOptionsRepository,
      useClass: ImplementsTopicOptionsRepository,
    },
  ],
  exports: [TopicOptionsService, TopicOptionsRepository],
})
export class TopicOptionsModule {}
