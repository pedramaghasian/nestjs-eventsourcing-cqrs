import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { IEvent } from '@nestjs/cqrs';

export class ProductCreatedEvent implements IEvent {
  constructor(private readonly product: CreateProductDto) {}
}
