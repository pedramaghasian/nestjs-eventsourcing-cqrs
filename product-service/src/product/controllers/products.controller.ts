import { EventPattern } from '@nestjs/microservices';
import { Body, Controller, Post, UseInterceptors } from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';


@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /* Create User */
  /*--------------------------------------------*/

  @EventPattern('create_product')
  async createProduct(data: CreateProductDto) {
    console.log('im in the product controller this data i recive with rabbitmq',data);
    
    return this.productService.createProduct(data);
  }
}
