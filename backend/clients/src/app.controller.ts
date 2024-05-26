import { BadRequestException, Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { ProxyService } from './proxy/proxy.service';
import { EventPattern } from '@nestjs/microservices';
import { firstValueFrom } from 'rxjs';

@Controller()
export class AppController {
  constructor(
    private readonly proxy: ProxyService,
  ) {}

  @Get()
  async store(): Promise<any> {
    try {
      const proxy = this.proxy.configureToManagers();

      return JSON.parse(await firstValueFrom(proxy.send('findAllStores', {})));
    } catch (error) {
      throw new BadRequestException(error);
    }
  }
}
