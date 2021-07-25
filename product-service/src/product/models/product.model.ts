import { AggregateRoot } from '@nestjs/cqrs';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

export class Product extends AggregateRoot {
  [x: string]: any;

  constructor(private readonly id: string | undefined) {
    super();
  }

  setData(data) {
    this.data = data;
  }

  createProduct() {
    this.apply(new ProductCreatedEvent(this.data));
  }

  updateProduct() {}

  deleteProduct() {}
}
