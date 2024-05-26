import { CreateManagerDto } from 'src/managers/dto/create-manager.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { ManagersRepository } from '../managers-repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Injectable } from '@nestjs/common';

@Injectable()
export class ImplementsManagersRepository implements ManagersRepository {
  constructor(
    @InjectRepository(Manager)
    private readonly managersRepository: Repository<Manager>,
  ) {}

  async save(data: CreateManagerDto): Promise<Manager> {
    return await this.managersRepository.save(data);
  }

  async findWithStores(managerId: string): Promise<Manager> {
    return await this.managersRepository.findOne({
      where: { id: managerId },
      select: ['id', 'firstName', 'lastName', 'email'],
      relations: ['stores'],
    });
  }

  async findByEmail(email: string): Promise<Manager> {
    return await this.managersRepository.findOne({
      where: { email },
    });
  }

  async findById(id: string): Promise<Manager> {
    return await this.managersRepository.findOne({
      where: { id },
    });
  }
}
