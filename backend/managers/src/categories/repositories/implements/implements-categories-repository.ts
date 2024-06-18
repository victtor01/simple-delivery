import { Category } from 'src/categories/entities/category.entity';
import { CategoriesRepository } from '../categories-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateCategoryDto } from 'src/categories/dto/create-category.dto';

export class ImplementsCategoriesRepository implements CategoriesRepository {
  constructor(
    @InjectRepository(Category)
    private readonly categoriesRepository: Repository<Category>,
  ) {}

  findByStore(storeId: string): Promise<Category[]> {
    return this.categoriesRepository.find({
      where: { storeId },
    });
  }

  async save(body: CreateCategoryDto): Promise<Category> {
    return this.categoriesRepository.save(body);
  }
}
