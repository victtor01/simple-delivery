import { Injectable } from '@nestjs/common';
import {
  ClientProxy,
  ClientProxyFactory,
  RmqContext,
  Transport,
} from '@nestjs/microservices';

@Injectable()
export class ProxyService {
  private configure(queue: string): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5673'],
        queue: queue,
      },
    });
  }

  public configureToManagers(): ClientProxy {
    return ClientProxyFactory.create({
      transport: Transport.RMQ,
      options: {
        urls: ['amqp://guest:guest@127.0.0.1:5673'],
        queue: 'managers',
      },
    });
  }

  public confirmMessage(context: RmqContext) {
    try {
      const originalMsg = context.getMessage();
      const channel = context.getChannelRef();
      channel.ack(originalMsg);
    } catch (error) {
      throw new Error(error);
    }
  }

  configureProxy(queue: string): ClientProxy {
    return this.configure(queue);
  }
}
