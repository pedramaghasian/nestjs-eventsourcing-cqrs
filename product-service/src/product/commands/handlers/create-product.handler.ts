import { CommandHandler, EventPublisher, ICommandHandler } from '@nestjs/cqrs';
import { CreateProductCommand } from '../impl/create-product.command';

import { ProductAggregateRepository } from 'src/product/repository/product-aggregate.repository';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from 'src/product/models/product.aggregate';
import { ProductModelRepository } from 'src/product/repository/product-model.retpository';
import { BadRequestException } from '@nestjs/common';
import { EventStore } from '../../../core/index';
import { json } from 'express';

@CommandHandler(CreateProductCommand)
export class CreateProductHandler
  implements ICommandHandler<CreateProductCommand>
{
  constructor(
    private readonly publisher: EventPublisher,
    private readonly productAggregateRepo: ProductAggregateRepository,
    private readonly productModelRepo: ProductModelRepository,
    private readonly eventStore: EventStore,
  ) {}

  async execute(command: CreateProductCommand) {
    const { productDto } = command;
    const steams = await this.eventStore._readStream('$ce-product');
    const lastEventNumberInTheStream =
      this._calculateLastEventNumberInTheStream(steams);
    const lastEventCreatedDate = this._calcuEventCreatedDate(
      lastEventNumberInTheStream,
      steams,
    );

    if (!this._checkCreateNewProductDate(lastEventCreatedDate)) return false;

    const product = await this.publisher.mergeObjectContext(
      await this.productAggregateRepo.createProduct(productDto),
    );

    return product.commit();
  }

  _addMinutes(date, minutes) {
    return new Date(date.getTime() + minutes * 60000);
  }

  _checkCreateNewProductDate(lastProdutCreatedDate) {
    const now = Date.now();
    lastProdutCreatedDate = new Date(lastProdutCreatedDate);
    const gapTimeBetweenOldVsNewProduct = this._addMinutes(new Date(now), 10);
    if (lastProdutCreatedDate > gapTimeBetweenOldVsNewProduct) return false;
    return true;
  }

  _calculateLastEventNumberInTheStream(streams) {
    streams.lastEventNumber.toNumber();
  }

  _calcuEventCreatedDate(eventNumber, steams) {
    return steams.events[eventNumber].originalEvent.created;
  }
}
