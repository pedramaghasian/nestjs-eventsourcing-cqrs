import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import { Event } from '@nordfjord/nestjs-cqrs-es';

export class ProductCreatedEvent extends Event<CreateProductDto> {
  constructor(data: CreateProductDto) {
    super(data);
  }
}
