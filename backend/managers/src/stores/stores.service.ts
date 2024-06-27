import { Injectable } from '@nestjs/common';
import { CreateStoreDto } from './dto/create-store.dto';
import { StoresRepository } from './repositories/stores-repository';
import { Store } from './entities/store.entity';
import { PublicStore } from 'src/config/constants';

@Injectable()
export class StoresService {
  constructor(private readonly storesRepository: StoresRepository) {}

  async create(
    createStoreDto: CreateStoreDto,
    managerId: string,
  ): Promise<Store> {
    const IStore = this.storesRepository.create(createStoreDto, managerId);
    const store = await this.storesRepository.save(IStore);
    return store;
  }

  async findAllStoresByManagerId(managerId: string): Promise<Store[]> {
    const stores = await this.storesRepository.findAllStoresByManagerId(managerId);

    return stores;
  }

  async findById(storeId: string) {
    const store = await this.storesRepository.findById(storeId);
  
    return store;
  }

  async findByIdWithProductsAndRelations (storeId: string) {
    const store = await this.storesRepository.findByIdWithProductsAndRelations(storeId);

    return store;
  }


  async findAll(): Promise<Store[]> {
    return await this.storesRepository.findAll();
  }
}
