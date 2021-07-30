// import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

export class Product extends AggregateRoot {
  [x: string]: any;

  constructor(private id: string | undefined) {
    super();
  }

  createProduct(data) {
    console.log(data, 'inside aggregate Product');
    this.apply(new ProductCreatedEvent(data));
  }

  updateProduct() {}

  deleteProduct() {}
}
