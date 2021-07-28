// import { AggregateRoot } from '@nestjs/cqrs';
import { AggregateRoot } from '@nestjs/cqrs';
import { CreateProductDto } from '../dtos/create-product.dto';
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
    console.log(this.data, 'in the model');
    this.apply(new ProductCreatedEvent(this.data));
  }

  updateProduct() {}

  deleteProduct() {}
}
