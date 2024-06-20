import { NestFactory } from '@nestjs/core';
import { AppModule } from './app.module';
import { MicroserviceOptions, Transport } from '@nestjs/microservices';
import * as cookieParser from 'cookie-parser';
import { DocumentBuilder, SwaggerModule } from '@nestjs/swagger';
import { ValidationPipe } from '@nestjs/common';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);

  app.use(cookieParser());

  app.enableCors({
    origin: 'http://localhost:3001',
    credentials: true,
  });

  app.setGlobalPrefix("/api/v1")

  app.useGlobalPipes(new ValidationPipe());

  const config = new DocumentBuilder()
  .setTitle("Managers microservice")
  .setDescription("The managers' microservice's main objective is to provide the necessary tools for organizing products by MiDelivery")
  .setVersion('1.0')
  .addTag('managers')
  .build();

  const document = SwaggerModule.createDocument(app, config);

  SwaggerModule.setup('api', app, document);

  app.connectMicroservice<MicroserviceOptions>({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://guest:guest@127.0.0.1:5673'],
      queue: 'managers',
      noAck: false,
    },
  });

  app.startAllMicroservices();

  await app.listen(9000);
}
bootstrap();
