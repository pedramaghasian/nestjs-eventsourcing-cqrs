import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './services/products.service';
import { ProductsSagas } from './sagas/products.sagas';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ProductCreatedEvent } from './events/impl/product-created.event';
import { CqrsModule } from '@nestjs/cqrs';
import { EventStoreModule, EventStoreSubscriptionType } from '@juicycleff/nestjs-event-store';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.registerFeature({
      featureStreamName: 'product',
      type: 'event-store',
      // store: MongoStore, // Optional mongo store for persisting catchup events position for microservices to mitigate failures. Must implement IAdapterStore
      subscriptions: [
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: 'product',
          resolveLinkTos: true, // Default is true (Optional)
          lastCheckpoint: 13, // Default is 0 (Optional)
        },
      ],
      eventHandlers: {
        ProductCreatedEvent: (data) => new ProductCreatedEvent(data),
      },
    }),
  ],
  controllers: [ProductController],
  providers: [
      ProductRepository,
      ProductService,
      ProductsSagas,
      ...CommandHandlers,
      ...EventHandlers
    ],
})
export class ProductModule {

}
