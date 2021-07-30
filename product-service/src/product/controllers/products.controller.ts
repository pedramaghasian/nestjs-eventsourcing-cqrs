import {
  EventPattern,
  MessagePattern,
  Payload,
  RmqContext,
} from '@nestjs/microservices';
import { Controller, Logger } from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { v4 as uuidv4 } from 'uuid';
import { Ctx } from 'type-graphql';

@Controller('products')
export class ProductController {
  logger = new Logger('ProductController');
  constructor(private readonly productService: ProductService) {}

  /* Create User */
  /*--------------------------------------------*/

  @MessagePattern('create_product')
  createProduct(@Payload() data: CreateProductDto, @Ctx() context: RmqContext) {
    data.id = 'pedram aghasian 007';
    return this.productService.createProduct(data);
  }

  @MessagePattern('find_product_by_id')
  async findOneById(@Payload() id) {
    return this.productService.findOneById(id);
  }
}
