import {
  Body,
  Controller,
  Get,
  Inject,
  Logger,
  Param,
  Post,
} from '@nestjs/common';
import { ClientProxy } from '@nestjs/microservices';
import { ApiOperation, ApiResponse, ApiTags } from '@nestjs/swagger';
import { timeout } from 'rxjs';
import { CreateProductDto } from './dtos/product/create-product.dto';
@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  async onApplicationBootstrap() {
    await this.productServiceClient.connect();
  }

  @ApiOperation({ description: 'create product' })
  @ApiResponse({ status: 201, description: 'Create Product' })
  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    return this.productServiceClient
      .send<string>('create_product', data)
      .toPromise();
  }

  @ApiOperation({ description: 'find product by id ' })
  @ApiResponse({ status: 200, description: 'ok' })
  @Get('/:identifier')
  //   @ApiParam({ name: 'identifier' })
  async findOneById(@Param('identifier') productId) {
    const createProductResponse = await this.productServiceClient
      .emit('find_product_by_id', productId)
      .toPromise();
    console.log(createProductResponse);
    return createProductResponse;
  }
}
