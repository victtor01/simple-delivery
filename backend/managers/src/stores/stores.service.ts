import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoresRepository } from './repositories/stores-repository';
import { Store } from './entities/store.entity';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepo: StoresRepository) {}

  async create(
    createStoreDto: CreateStoreDto,
    managerId: string,
  ): Promise<Store> {
    const IStore = this.storesRepo.create(createStoreDto, managerId);
    const store = await this.storesRepo.save(IStore);
    return store;
  }

  async findById(storeId: string) {
    const store = await this.storesRepo.findById(storeId);
    return store;
  }

  async findAll(): Promise<Store[]> {
    return await this.storesRepo.findAll();
  }
}
