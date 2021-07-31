import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';

import { ProductAggregateRepository } from 'src/product/repository/product-aggregate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/product.aggregate';
import { ProductModelRepository } from 'src/product/repository/product-model.retpository';
import { BadRequestException } from '@nestjs/common';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly productAggregateRepo: ProductAggregateRepository,
    private readonly productModelRepo: ProductModelRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    const { productDto } = command;
    const result = await this.publisher.mergeObjectContext(
      await this.productAggregateRepo.createProduct(productDto),
    );

    return result.commit();
  }
}
