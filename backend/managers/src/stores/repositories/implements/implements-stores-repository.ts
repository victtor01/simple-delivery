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

  findAll(): Promise<Store[]> {
    return this.storesRepository.find();
  }

  save(data: Store): Promise<Store> {
    return this.storesRepository.save(data);
  }
}
