import { Injectable } from '@nestjs/common';
import { CommandBus, QueryBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { CreateProductDto } from '../dtos/create-product.dto';
import { ReadProductQuery } from '../queries/impl/read-product.query';

@Injectable()
export class ProductService {
  constructor(
    private readonly commandBus: CommandBus,
    private readonly queryBus: QueryBus,
  ) {}

  async createProduct(product: CreateProductDto) {
    // console.log(product)
    return this.commandBus.execute(new CreateProductCommand(product));
  }

  async findOneById(id) {
    return this.queryBus.execute(new ReadProductQuery(id));
  }
}
