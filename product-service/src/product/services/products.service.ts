import { Injectable } from '@nestjs/common';
import { CommandBus } from '@nestjs/cqrs';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { CreateProductDto } from '../dtos/create-product.dto';

@Injectable()
export class ProductService {
  constructor(private readonly commandBus: CommandBus) {}

  async createProduct(product: CreateProductDto) {
    return await this.commandBus.execute(new CreateProductCommand(product));
  }
}
