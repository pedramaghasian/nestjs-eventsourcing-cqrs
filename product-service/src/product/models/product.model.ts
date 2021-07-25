// import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events/impl/product-created.event';
import { AggregateRoot } from '@nordfjord/nestjs-cqrs-es';
export class Product extends AggregateRoot {
  createProduct(id, title, image) {
    this.apply(
      new ProductCreatedEvent({
        id,
        title,
        image,
      }),
    );
  }

  updateProduct() {}

  deleteProduct() {}
}
