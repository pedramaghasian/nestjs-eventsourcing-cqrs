import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';

import { ProductRepository } from 'src/product/repository/product.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/product.model';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly repository:ProductRepository,
  ) {}

  async execute(command: CreateProductCommand) {
    const { productDto } = command;
    const product = this.publisher.mergeObjectContext(
      await this.repository.createProduct(productDto)
     
    );
  
    
    
    product.commit()
    return product

  }
}
