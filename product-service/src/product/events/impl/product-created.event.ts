import { IEvent } from '@nestjs/cqrs';
import { CreateProductDto } from 'src/product/dtos/create-product.dto';
import {Event,ExpectedVersion} from '@nordfjord/nestjs-cqrs-es'

// export class ProductCreatedEvent implements IEvent {
//   constructor(private readonly product: CreateProductDto) {}
// }

export class ProductCreatedEvent extends Event<CreateProductDto|any> {
  constructor(data:CreateProductDto) {
    const version = ExpectedVersion.noStream
    super(`product-${data.id}`, data, version.toString())

  }
}