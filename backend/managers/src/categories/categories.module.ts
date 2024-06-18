import { Module } from '@nestjs/common';
import { CategoriesService } from './categories.service';
import { CategoriesController } from './categories.controller';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Category } from './entities/category.entity';
import { CategoriesRepository } from './repositories/categories-repository';
import { ImplementsCategoriesRepository } from './repositories/implements/implements-categories-repository';

@Module({
  imports: [TypeOrmModule.forFeature([Category])],
  controllers: [CategoriesController],
  providers: [CategoriesService, {
    provide: CategoriesRepository,
    useClass: ImplementsCategoriesRepository
  }],
})
export class CategoriesModule {}
