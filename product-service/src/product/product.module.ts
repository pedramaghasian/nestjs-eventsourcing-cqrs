import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductAggregateRepository } from './repository/product-aggregate.repository';
import { ProductService } from './services/products.service';
import { ProductsSagas } from './sagas/products.sagas';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { QueryHandlers } from './queries/handlers';
import { ProductCreatedEvent } from './events/impl/product-created.event';
import { CqrsModule, QueryHandler } from '@nestjs/cqrs';
import {
  EventStoreModule,
  EventStoreSubscriptionType,
} from '@juicycleff/nestjs-event-store';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductSchema, Product } from 'src/product/models/product.model';
import { ProductModelRepository } from './repository/product-model.retpository';

@Module({
  imports: [
    CqrsModule,
    MongooseModule.forFeature([{ name: Product.name, schema: ProductSchema }]),
    EventStoreModule.registerFeature({
      featureStreamName: '$ce-product',
      type: 'event-store',
      // store: MongoStore, // Optional mongo store for persisting catchup events position for microservices to mitigate failures. Must implement IAdapterStore
      subscriptions: [
        {
          type: EventStoreSubscriptionType.CatchUp,
          stream: '$ce-product',
        },
      ],
      eventHandlers: {
        ProductCreatedEvent: (data) => new ProductCreatedEvent(data),
      },
    }),
  ],
  controllers: [ProductController],
  providers: [
    ProductAggregateRepository,
    ProductModelRepository,
    ProductService,
    ProductsSagas,
    ...CommandHandlers,
    ...EventHandlers,
    ...QueryHandlers,
  ],
})
export class ProductModule {}
