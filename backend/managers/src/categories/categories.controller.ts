import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
  UseGuards,
  Req,
} from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CreateCategoryDto } from './dto/create-category.dto';
import { StoresGuard } from 'src/stores/stores.guard';
import { Store } from 'src/stores/entities/store.entity';
import { Category } from './entities/category.entity';

@UseGuards(StoresGuard)
@Controller('categories')
export class CategoriesController {
  constructor(private readonly categoriesService: CategoriesService) {}

  @Get()
  async findByStore(@Req() request: { store: Store }) {
    const categories = await this.categoriesService.findByStore(
      request.store.id,
    );

    return categories;
  }

  @Post()
  async create(
    @Body() body: CreateCategoryDto,
    @Req() request: { store: Store },
  ) {
    const category = new Category(body);
    category.storeId = request.store.id;
    const createdCategory = await this.categoriesService.save(category);

    return createdCategory;
  }
}
