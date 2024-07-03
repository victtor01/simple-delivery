import {
  Controller,
  Post,
  Body,
  Req,
  Res,
  Get,
  UseGuards,
  Redirect,
} from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { Response } from 'express';
import { ApiTags } from '@nestjs/swagger';

@ApiTags('Stores')
@Controller('stores')
export class StoresController {
  constructor(private readonly storesService: StoresService) {}

  @Get()
  async findAllByManager(@Req() req: { manager: Manager }) {
    const stores = await this.storesService.findAllStoresByManagerId(
      req.manager.id,
    );

    return stores;
  }

  @Post()
  async create(
    @Body() createStoreDto: CreateStoreDto,
    @Req() req: { manager: Manager },
    @Res() res: Response,
  ) {
    const store = await this.storesService.create(
      createStoreDto,
      req.manager.id,
    );
    return res.status(201).json(store);
  }
}
