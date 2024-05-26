import { Controller, Get } from '@nestjs/common';
import { AppService } from './app.service';
import { firstValueFrom } from 'rxjs';
import { ProxyService } from './proxy/proxy.service';

@Controller()
export class AppController {
  constructor(private readonly appService: AppService) {}
}
