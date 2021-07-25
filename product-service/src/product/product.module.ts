import { Module } from '@nestjs/common';
import { ProductController } from './controllers/products.controller';
import { ProductRepository } from './repository/product.repository';
import { ProductService } from './services/products.service';
import { ProductsSagas } from './sagas/products.sagas';
import { CommandHandlers } from './commands/handlers';
import { EventHandlers } from './events/handlers';
import { ProductCreatedEvent } from './events/impl/product-created.event';
import { CqrsModule ,CommandBus,EventBus} from '@nestjs/cqrs';
import {EventStoreModule} from '@nordfjord/nestjs-cqrs-es'
import { Product } from './models/product.model';

@Module({
  imports: [
    CqrsModule,
    EventStoreModule.forFeature([Product], {
      ProductCreatedEvent: event => new ProductCreatedEvent(event.data),
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
