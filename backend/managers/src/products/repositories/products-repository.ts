import { UpdateResult } from 'typeorm';
import { CreateProductDto } from '../dto/create-product.dto';
import { UpdateProductDto } from '../dto/update-product.dto';
import { Product } from '../entities/product.entity';

export abstract class ProductsRepository {
  abstract create(data: {
    body: CreateProductDto;
    managerId: string;
    storeId: string;
  }): Product;
  abstract save(product: Product): Promise<Product>;
  abstract findByIdWithAllRelations(productId: string): Promise<Product>;
  abstract findByStore(storeId: string): Promise<Product[]>;
  abstract update(productId: string, data: UpdateProductDto): Promise<UpdateResult>
  abstract findByIdAndManager(id: string, managerId: string): Promise<Product>;
  abstract findProductsByIdsAndStore(productsIds: string[], storeId: string): Promise<Product[]>
  abstract filter({ storeId, filters }: { storeId?: string, filters: { category?: string }} ): Promise<Product[]>
}
