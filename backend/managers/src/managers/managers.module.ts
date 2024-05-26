import { Module } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { ManagersController } from './managers.controller';
import { ManagersRepository } from './repositories/managers-repository';
import { ImplementsManagersRepository } from './repositories/implements/implements-managers-repository';
import { TypeOrmModule } from '@nestjs/typeorm';
import { Manager } from './entities/manager.entity';

@Module({
  imports: [TypeOrmModule.forFeature([Manager])],
  controllers: [ManagersController],
  providers: [
    ManagersService,
    {
      provide: ManagersRepository,
      useClass: ImplementsManagersRepository,
    },
  ],
  exports: [ManagersService, ManagersRepository],
})
export class ManagersModule {}
