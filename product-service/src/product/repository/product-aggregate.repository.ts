import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../models/product.aggregate';
import { v4 as uuidv4 } from 'uuid';

@Injectable()
export class ProductAggregateRepository {
  async createProduct(productDto) {
    const product = new Product();
    product.setId(productDto.id);
    product.createProduct(productDto);
    return product;
  }

  // async updateProduct(data) {
  //   const product = new Product(data.id);
  //   product.setData(data);
  //   product.updateProduct();
  //   return product;
  // }
  // async deleteProduct(data) {
  //   const product = new Product(data.id);
  //   product.deleteProduct();
  //   return product;
  // }
}
