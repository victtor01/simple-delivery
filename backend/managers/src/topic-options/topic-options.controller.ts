import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicOptionsService } from './topic-options.service';
import { CreateTopicOptionDto } from './dto/create-topic-option.dto';
import { UpdateTopicOptionDto } from './dto/update-topic-option.dto';

@Controller('topic-options')
export class TopicOptionsController {
  constructor(private readonly topicOptionsService: TopicOptionsService) {}

  @Post()
  create(@Body() createTopicOptionDto: CreateTopicOptionDto) {
    console.log(createTopicOptionDto);
 /*    return this.topicOptionsService.save(createTopicOptionDto); */
  }

}
