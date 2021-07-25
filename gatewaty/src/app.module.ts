import { Module } from '@nestjs/common';
import { ClientsModule, Transport } from '@nestjs/microservices';
import { ProductController } from './products.controller';

@Module({
  imports: [
    ClientsModule.register([
      {
        name: 'PRODUCT_SERVICE',
        transport: Transport.RMQ,
        options: {
          // urls: ['amqp://user:password@127.0.0.1:5672/'],
          urls: [
            'amqps://fpweywyq:zXcspMIEbbmmYefPOtzr5a1N11OUF1Ry@hummingbird.rmq.cloudamqp.com/fpweywyq',
          ],
          queue: 'main_queue',
          queueOptions: {
            durable: false,
          },
        },
      },
    ]),
  ],
  controllers: [ProductController],
  providers: [],
})
export class AppModule {}