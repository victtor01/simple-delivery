import {
  Controller,
  Post,
  Body,
  UseGuards,
  Req,
  Patch,
  Param,
} from '@nestjs/common';
import { ProductTopicsService } from './product-topics.service';
import { CreateProductTopicDto } from './dto/create-product-topic.dto';
import { ApiTags } from '@nestjs/swagger';
import { StoresGuard } from 'src/stores/stores.guard';
import { ProductTopic } from './entities/product-topic.entity';
import { Manager } from 'src/managers/entities/manager.entity';

@UseGuards(StoresGuard)
@ApiTags('product-topic')
@Controller('product-topics')
export class ProductTopicsController {
  constructor(private readonly productTopicService: ProductTopicsService) {}

  @Post()
  async create(@Body() createProductTopicDto: CreateProductTopicDto) {
    const createdProductTopic = await this.productTopicService.create(
      createProductTopicDto,
    );

    return createdProductTopic;
  }

  @Patch(':productId')
  async updateMany(
    @Body() productTopics: Partial<ProductTopic[]>,
    @Param('productId') productId: string,
    @Req() req: { manager: Manager }
  ) {
    const { id: managerId } = req.manager;
    
    const updates = await this.productTopicService.updateManyTopicsWithOptions(
      productTopics,
      productId,
      managerId
    )

    return updates
  }
}
