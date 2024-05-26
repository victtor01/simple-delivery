import { CreateStoreDto } from '../dto/create-store.dto';
import { Store } from '../entities/store.entity';

export abstract class StoresRepository {
  abstract create(data: CreateStoreDto, managerId: string): Store;
  abstract save(data: Store): Promise<Store>;
  abstract findAll(): Promise<Store[]>;
}
