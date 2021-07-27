import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { Logger } from '@nestjs/common';
import { ProductCreatedEvent } from '../impl/product-created.event';
import {Event} from '@nordfjord/nestjs-cqrs-es'

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  handle(event: ProductCreatedEvent) {
    // console.log('productCreatedEventHandler\n',event)
  }
}
