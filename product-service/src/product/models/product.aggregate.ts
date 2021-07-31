// import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

export class Product extends AggregateRoot {
  [x: string]: any;
  id: string;

  constructor() {
    super();
  }

  setId(id) {
    this.id = id;
  }

  createProduct(data) {
    this.apply(new ProductCreatedEvent(data, this.id));
  }

  updateProduct() {}

  deleteProduct() {}
}
