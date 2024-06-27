import { Module } from '@nestjs/common';
import { ManagersModule } from './managers/managers.module';
import { TypeOrmModule, TypeOrmModuleAsyncOptions, TypeOrmModuleOptions } from '@nestjs/typeorm';
import { StoresModule } from './stores/stores.module';
import { AuthModule } from './auth/auth.module';
import { APP_GUARD } from '@nestjs/core';
import { AuthGuard } from './auth/auth.guard';
import { ProductsModule } from './products/products.module';
import { ProxyModule } from './proxy/proxy.module';
import { MulterModule } from '@nestjs/platform-express';
import { ServeStaticModule } from '@nestjs/serve-static';
import { join } from 'path';
import { ConfigModule } from '@nestjs/config';
import { CategoriesModule } from './categories/categories.module';
import { StoresGuard } from './stores/stores.guard';
import { ProductTopicsModule } from './product-topic/product-topics.module';
import { TopicOptionsModule } from './topic-options/topic-options.module';
import { OrdersModule } from './orders/orders.module';
import { OrdersProductsModule } from './orders-products/orders-products.module';

@Module({
  imports: [
    ConfigModule.forRoot(),
    ProxyModule,
    ManagersModule,
    AuthModule,
    MulterModule.register({ dest: './uploads' }),
    ServeStaticModule.forRoot({
      rootPath: join(__dirname, '..', 'uploads/products'),
      serveRoot: '/uploads/products',
      }),
      TypeOrmModule.forRoot({
      type: process.env.DB_TYPE as any,
      host: process.env.DB_HOST,
      port: Number(process.env.DB_PORT),
      database: process.env.DB_NAME,
      username: process.env.DB_USERNAME,
      password: process.env.DB_PASSWORD,
      synchronize: true,
      logging: false,
      entities: [__dirname + '/**/*.entity{.js,.ts}'],
    }),
    StoresModule,
    ProductsModule,
    CategoriesModule,
    ProductTopicsModule,
    TopicOptionsModule,
    OrdersModule,
    OrdersProductsModule,
  ],
  providers: [
    {
      provide: APP_GUARD,
      useClass: AuthGuard,
    },
  ],
})
export class AppModule {}
