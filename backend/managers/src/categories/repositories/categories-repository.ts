import { CreateCategoryDto } from '../dto/create-category.dto';
import { Category } from '../entities/category.entity';

export abstract class CategoriesRepository {
  abstract save(body: CreateCategoryDto): Promise<Category>;
  abstract findByStore(storeId: string): Promise<Category[]>;
}
