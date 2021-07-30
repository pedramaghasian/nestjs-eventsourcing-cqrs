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

  // @EventPattern('create_product')
  // async createProduct(data: CreateProductDto) {
  //   data.id = uuidv4();
  //   console.log(data)
  //   return this.productService.createProduct(data);

  // }

  @MessagePattern('create_product')
  getNotifications(
    @Payload() data: CreateProductDto,
    @Ctx() context: RmqContext,
  ) {
    data.id = uuidv4();
    return this.productService.createProduct(data);
  }

  @EventPattern('find_product_by_id')
  async findOneById(id) {
    return this.productService.findOneById(id);
  }
}
