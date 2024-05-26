import { BadRequestException, Injectable } from '@nestjs/common';
import { CreateManagerDto } from './dto/create-manager.dto';
import { ManagersRepository } from './repositories/managers-repository';
import { Manager } from './entities/manager.entity';
import * as bcrypt from 'bcryptjs';
import { Transactional } from 'typeorm-transactional';

@Injectable()
export class ManagersService {
  constructor(private readonly managersRepo: ManagersRepository) {}

  private salt = 10;

  private async hash(pass: string) {
    return await bcrypt.hash(pass, this.salt);
  }

  async create(createManagerDto: CreateManagerDto): Promise<Manager> {
    try {
      createManagerDto.password = await this.hash(createManagerDto.password);
      const managerCreated = await this.managersRepo.save(createManagerDto);
      return managerCreated;
    } catch (error) {
      throw new BadRequestException('error creating user');
    }
  }

  async findById(id: string): Promise<Partial<Manager>> {
    try {
      const manager = await this.managersRepo.findById(id);

      const responseManager = {
        email: manager.email,
        firstName: manager.firstName,
      } satisfies Partial<Manager>;

      return responseManager;
    } catch (error) {
      throw new BadRequestException('error in response informations');
    }
  }

  async findWithStores(managerId: string): Promise<Partial<Manager>> {
    try {
      const manager = await this.managersRepo.findWithStores(managerId);
      const { id, ...props } = manager;
      return props;
    } catch (error) {
      throw new BadRequestException('error in request stores');
    }
  }

  async findByEmail(email: string): Promise<Manager> {
    return await this.managersRepo.findByEmail(email);
  }
}
