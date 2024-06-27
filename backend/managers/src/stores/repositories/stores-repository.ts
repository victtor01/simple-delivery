import { CreateStoreDto } from '../dto/create-store.dto';
import { Store } from '../entities/store.entity';

export abstract class StoresRepository {
  abstract create(data: CreateStoreDto, managerId: string): Store;
  abstract save(data: Store): Promise<Store>;
  abstract findById(id: string): Promise<Store>;
  abstract findAll(): Promise<Store[]>;
  abstract findByIdWithProductsAndRelations(storeId: string): Promise<Store>;
  abstract findAllStoresByManagerId(managerId: string): Promise<Store[]>;
}
