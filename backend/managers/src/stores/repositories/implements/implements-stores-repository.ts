import { Injectable } from '@nestjs/common';
import { StoresRepository } from '../stores-repository';
import { Store } from 'src/stores/entities/store.entity';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateStoreDto } from 'src/stores/dto/create-store.dto';

@Injectable()
export class ImplementsStoresRepository implements StoresRepository {
  constructor(
    @InjectRepository(Store)
    private readonly storesRepository: Repository<Store>,
  ) {}

  create(data: CreateStoreDto, managerId: string): Store {
    return this.storesRepository.create({
      ...data,
      managerId,
    });
  }

  
  findByIdWithProductsAndRelations(storeId: string): Promise<Store> {
    return this.storesRepository.findOne({
      where: { id: storeId },
      relations: {
        products: {
          productTopics: true
        }
      },
      order: { products: { quantity: 'DESC' } },
    });
  }

  findAllStoresByManagerId(managerId: string): Promise<Store[]> {
    return this.storesRepository.find({
      where: { managerId }
    })  
  }

  findById(id: string): Promise<Store> {
    return this.storesRepository.findOne({
      where: { id },
    });
  }

  findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  save(data: Store): Promise<Store> {
    return this.storesRepository.save(data);
  }
}
