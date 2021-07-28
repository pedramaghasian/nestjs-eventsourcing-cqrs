import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forRoot('mongodb://localhost:27017/product', {
      autoCreate: true,
    }),
    EventStoreModule.register({
      type: 'event-store',
      tcpEndpoint: {
        host: 'localhost',
        port: 1113,
      },
      options: {
        maxRetries: 1000, // Optional
        maxReconnections: 1000, // Optional
        reconnectionDelay: 1000, // Optional
        heartbeatInterval: 1000, // Optional
        heartbeatTimeout: 1000, // Optional
        defaultUserCredentials: {
          password: 'admin',
          username: 'chnageit',
        },
      },
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
