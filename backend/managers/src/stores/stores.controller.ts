import { Controller, Post, Body, Req, Res, Get, UseGuards } from '@nestjs/common';
import { StoresService } from './stores.service';
import { CreateStoreDto } from './dto/create-store.dto';
import { Manager } from 'src/managers/entities/manager.entity';
import { Response } from 'express';
import { ProxyService } from 'src/proxy/proxy.service';
import {
  Ctx,
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';

@Controller('stores')
export class StoresController {
  constructor(
    private readonly storesService: StoresService,
    private readonly proxy: ProxyService,
  ) {}

  @MessagePattern('stores.findAll')
  async findAll(@Ctx() context: RmqContext) {
    const stores = await this.storesService.findAll();
    this.proxy.confirmMessage(context);
    return JSON.stringify(stores);
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
