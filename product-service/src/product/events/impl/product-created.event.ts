import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { IEvent } from '@nestjs/cqrs';

export class ProductCreatedEvent implements IEvent {
  constructor(public readonly product: any, public readonly id: any) {}
}
