import { EventsHandler, IEventHandler } from '@nestjs/cqrs';
import { ProductModelRepository } from 'src/product/repository/product-model.retpository';
import { ProductCreatedEvent } from '../impl/product-created.event';

@EventsHandler(ProductCreatedEvent)
export class ProductCreatedHandler
  implements IEventHandler<ProductCreatedEvent>
{
  constructor(
    private readonly productModelRepository: ProductModelRepository,
  ) {}
  handle(event: ProductCreatedEvent) {
    return this.productModelRepository.create(event['product']);
  }
}
