import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';

import { ProductAggregateRepository } from 'src/product/repository/product-aggregate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/product.aggregate';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository: ProductAggregateRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    const { productDto } = command;
    const product = this.publisher.mergeObjectContext(
      await this.repository.createProduct(productDto),
    );

    product.commit();
    return product;
  }
}
