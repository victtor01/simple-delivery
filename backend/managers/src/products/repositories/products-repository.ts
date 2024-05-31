import { CreateProductDto } from "../dto/create-product.dto";
import { Product } from "../entities/product.entity";

export abstract class ProductsRepository {
    abstract create(body: CreateProductDto ): Product
    abstract save(product: Product): Promise<Product>
    abstract findByStore(storeId: string): Promise<Product[]>
    abstract findByIdAndManager(id: string, managerId: string): Promise<Product>
}