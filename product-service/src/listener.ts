import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.createMicroservice(AppModule, {
    transport: Transport.RMQ,
    options: {
      // urls: ['amqp://user:password@localhost:5672/'],
      urls: [
        'amqps://fpweywyq:zXcspMIEbbmmYefPOtzr5a1N11OUF1Ry@hummingbird.rmq.cloudamqp.com/fpweywyq',
      ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });

  app.listen(() => {
    console.log('Microservices is Listening !');
  });
}
bootstrap();
