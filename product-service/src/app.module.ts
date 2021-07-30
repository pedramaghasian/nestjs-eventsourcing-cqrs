import { CqrsModule } from '@nestjs/cqrs';
import { ProductModule } from './product/product.module';
import { Module } from '@nestjs/common';
import { EventStoreModule } from '@juicycleff/nestjs-event-store';
import { MongooseModule } from '@nestjs/mongoose';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.register({
      type: 'event-store',
      tcpEndpoint: {
        host: 'eventstoredb',
        port: 1113,
      },
      options: {
        defaultUserCredentials: {
          password: 'admin',
          username: 'chnageit',
        },
      },
    }),
    MongooseModule.forRoot('mongodb://mongodb:27017/product', {
      autoCreate: true,
    }),
    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule {}
