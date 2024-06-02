import { Module } from '@nestjs/common';
import { AppController } from './app.controller';
import { AppService } from './app.service';
import { ManagersModule } from './managers/managers.module';
import { TypeOrmModule } from '@nestjs/typeorm';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProductsModule } from './products/products.module';
import { ProxyModule } from './proxy/proxy.module';
import { StoresGuard } from './stores/stores.guard';

@Module({
  imports: [
    ProxyModule,
    ManagersModule,
    AuthModule, 
    TypeOrmModule.forRoot({
      type: 'postgres',
      host: 'localhost',
      port: 5435,
      database: 'mc_managers',
      username: 'admin',
      password: 'admin',
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    StoresModule,
    ProductsModule,
  ],
  controllers: [AppController],
  providers: [
    AppService,
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
