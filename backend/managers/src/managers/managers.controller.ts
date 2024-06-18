import { Controller, Get, Post, Body, Req } from '@nestjs/common';
import { ManagersService } from './managers.service';
import { CreateManagerDto } from './dto/create-manager.dto';
import { Manager } from './entities/manager.entity';
import { Public } from 'src/config/constants';
import { ApiTags } from '@nestjs/swagger';

@ApiTags("Managers")
@Controller('managers')
export class ManagersController {
  constructor(private readonly managersService: ManagersService) {}

  @Post()
  create(@Body() createManagerDto: CreateManagerDto) {
    return this.managersService.create(createManagerDto);
  }

  @Get('find-with-stores')
  findWithStores(@Req() req: { manager: Manager }) {
    return this.managersService.findWithStores(req.manager.id);
  }

  @Get('my-informations')
  myInformations(@Req() req: { manager: Manager }) {
    return this.managersService.findById(req.manager.id);
  }
}
