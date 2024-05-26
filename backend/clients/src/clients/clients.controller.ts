import { Body, Controller, Get, Post, Res } from '@nestjs/common';
import { Response } from 'express';
import { ClientsService } from './clients.service';
import { CreateClientDto } from './dtos/create-client.dto';

@Controller('clients')
export class ClientsController {
  constructor(private readonly clientsService: ClientsService) {}

  @Post()
  async create(@Res() response: Response, @Body() body: CreateClientDto) {
    const createdUser = await this.clientsService.create(body);
    return response.status(200).json(createdUser);
  }
}
