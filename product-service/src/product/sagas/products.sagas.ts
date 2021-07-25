import { Injectable, Logger } from '@nestjs/common';
import { ICommand, Saga, ofType } from '@nestjs/cqrs';
import { Observable } from 'rxjs';
import { delay, map } from 'rxjs/operators';
import { CreateProductCommand } from '../commands/impl/create-product.command';
import { ProductCreatedEvent } from '../events/impl/product-created.event';

@Injectable()
export class ProductsSagas {
  @Saga()
  dragonKilled = (events$: Observable<any>) => {
    return events$.pipe(
      ofType(ProductCreatedEvent
        
        ),
      delay(1000),
      map((event) => {
        console.log('Inside [ProductsSagas] Saga');
        Logger.log(event, 'inside ProductsSagas saga');
        // return new CreateProductCommand(event['productDto']);
      }),
    );
  };
}
