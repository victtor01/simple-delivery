import { PartialType } from '@nestjs/swagger';
import { CreateTopicOptionDto } from './create-topic-option.dto';

export class UpdateTopicOptionDto extends PartialType(CreateTopicOptionDto) {}
