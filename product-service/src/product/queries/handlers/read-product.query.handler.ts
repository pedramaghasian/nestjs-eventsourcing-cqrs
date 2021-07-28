import { QueryHandler, IQueryHandler } from '@nestjs/cqrs';
import { ProductModelRepository } from 'src/product/repository/product-model.retpository';
import { ReadProductQuery } from '../impl/read-product.query';

@QueryHandler(ReadProductQuery)
export class ReadProductHandler implements IQueryHandler<ReadProductQuery> {
  constructor(private productModelRepository: ProductModelRepository) {}

  async execute(query: ReadProductQuery) {
    const { id } = query;
    try {
      return await this.productModelRepository.findOneById({ id });
    } catch (error) {
      throw error;
    }
  }
}
