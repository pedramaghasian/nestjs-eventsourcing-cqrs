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
import { CreateProductDto } from './dtos/product/create-product.dto';
@Controller('products')
@ApiTags('products')
export class ProductController {
  constructor(
    @Inject('PRODUCT_SERVICE')
    private readonly productServiceClient: ClientProxy,
  ) {}

  @ApiOperation({ description: 'create product' })
  @ApiResponse({ status: 201, description: 'Create Product' })
  @Post()
  async createProduct(@Body() data: CreateProductDto) {
    const createProductResponse = await this.productServiceClient
      .emit('create_product', data)
      .toPromise();
    Logger.log(data, 'send to topic create_product');
    console.log(createProductResponse);
    return createProductResponse;
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
