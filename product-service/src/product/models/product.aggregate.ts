// import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

export class Product extends AggregateRoot {
  [x: string]: any;

  constructor(private id: string | undefined) {
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
