import {
  CommandBus,
  CommandHandler,
  EventPublisher,
  ICommandHandler,
} from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import { Logger } from '@nestjs/common';
import { ProductRepository } from 'src/product/repository/product.repository';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly repository: ProductRepository,
    private readonly publisher: EventPublisher,
  ) {}

  async execute(command: CreateProductCommand) {
    Logger.log('Async CreateProductHandler...', 'CreateProductCommand');

    const { productDto } = command;
    const product = this.publisher.mergeObjectContext(
      await this.repository.createProduct(productDto),
    );
    product.commit();
  }
}
