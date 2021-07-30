import { Logger } from '@nestjs/common';
import { NestFactory } from '@nestjs/core';
import { Transport } from '@nestjs/microservices';
import { AppModule } from './app.module';

async function bootstrap() {
  const app = await NestFactory.create(AppModule);
  const logger = new Logger('Main');
  const microservice = app.connectMicroservice({
    transport: Transport.RMQ,
    options: {
      urls: ['amqp://user:password@rabbitmq:5672/'],
      // urls: [
      //   'amqps://fpweywyq:zXcspMIEbbmmYefPOtzr5a1N11OUF1Ry@hummingbird.rmq.cloudamqp.com/fpweywyq',
      // ],
      queue: 'main_queue',
      queueOptions: {
        durable: false,
      },
    },
  });
  app.enableCors();
  await app.startAllMicroservices(() => {
    logger.log('Microservices is Listening ... ');
  });
  await app.listen(3001, () => {
    logger.log('app listening on port 3001 ...');
  });
}
bootstrap();
