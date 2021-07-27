import { EventPattern } from '@nestjs/microservices';
import { Controller } from '@nestjs/common';
import { ProductService } from '../services/products.service';
import { CreateProductDto } from '../dtos/create-product.dto';
import { v4 as uuidv4 } from 'uuid';

@Controller('products')
export class ProductController {
  constructor(private readonly productService: ProductService) {}

  /* Create User */
  /*--------------------------------------------*/

  @EventPattern('create_product')
  async createProduct(data: CreateProductDto) {
    data.id = uuidv4();
    // console.log(data)
    return this.productService.createProduct(data);
  }
}
