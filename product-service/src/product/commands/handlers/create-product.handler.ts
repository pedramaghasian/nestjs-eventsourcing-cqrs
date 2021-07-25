import { CommandHandler, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';
import {
  AggregateRepository,
  InjectAggregateRepository,
} from '@nordfjord/nestjs-cqrs-es';
import { Product } from 'src/product/models/product.model';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    @InjectAggregateRepository(Product)
    private readonly repository: AggregateRepository<Product>,
  ) {}

  async execute(command: CreateProductCommand) {
    const { productDto } = command;
    const { id, image, title } = productDto;
    const produt = await this.repository.findOne(productDto.id);
    await produt.createProduct(id, title, image);
    await this.repository.save(produt);
    return { success: true };
  }
}
