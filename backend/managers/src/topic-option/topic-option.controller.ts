import { Controller, Get, Post, Body, Patch, Param, Delete } from '@nestjs/common';
import { TopicOptionService } from './topic-option.service';
import { CreateTopicOptionDto } from './dto/create-topic-option.dto';
import { UpdateTopicOptionDto } from './dto/update-topic-option.dto';

@Controller('topic-option')
export class TopicOptionController {
  constructor(private readonly topicOptionService: TopicOptionService) {}

  @Post()
  create(@Body() createTopicOptionDto: CreateTopicOptionDto) {
    return this.topicOptionService.create(createTopicOptionDto);
  }

  @Get()
  findAll() {
    return this.topicOptionService.findAll();
  }

  @Get(':id')
  findOne(@Param('id') id: string) {
    return this.topicOptionService.findOne(+id);
  }

  @Patch(':id')
  update(@Param('id') id: string, @Body() updateTopicOptionDto: UpdateTopicOptionDto) {
    return this.topicOptionService.update(+id, updateTopicOptionDto);
  }

  @Delete(':id')
  remove(@Param('id') id: string) {
    return this.topicOptionService.remove(+id);
  }
}
