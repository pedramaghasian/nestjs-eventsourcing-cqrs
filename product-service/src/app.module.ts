import { CqrsModule, CommandBus, EventBus } from '@nestjs/cqrs';
import { ProductModule } from './product/product.module';
import { Module, OnModuleInit } from '@nestjs/common';
import { EventStoreModule, EventStore, Event } from '@nordfjord/nestjs-cqrs-es';

@Module({
  imports: [
    CqrsModule,

    EventStoreModule.forRoot({
      connection: {
        defaultUserCredentials: { username: 'admin', password: 'changeit' },
      },
      tcpEndpoint: 'tcp://127.0.0.1:1113',
    }),

    ProductModule,
  ],
  controllers: [],
  providers: [],
})
export class AppModule implements OnModuleInit {
  constructor(
    private readonly eventStore: EventStore,
    private readonly eventBus: EventBus,
  ) {}

  async onModuleInit() {
    // this.eventBus.publisher =this.eventStore
  }
}
