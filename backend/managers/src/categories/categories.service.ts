import { Injectable } from '@nestjs/common';
import { CreateCategoryDto } from './dto/create-category.dto';
import { UpdateCategoryDto } from './dto/update-category.dto';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories-repository';

@Injectable()
export class CategoriesService {
  constructor(private readonly categoriesRepository: CategoriesRepository) {}

  async findByStore(storeId: string): Promise<Category[]> {
    const categories = await this.categoriesRepository.findByStore(storeId);

    return categories;
  }

  async save(data: Category): Promise<Category> {
    const createdCategory = await this.categoriesRepository.save(data);

    return createdCategory;
  }
}
