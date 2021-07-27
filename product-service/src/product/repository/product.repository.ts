import { Injectable } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { CreateProductDto } from '../dtos/create-product.dto';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository {


  
  async createProduct(productDto) {
    const product = new Product(undefined);
    product.setData(productDto);
    product.createProduct();
    return product;
  }

  async updateProduct(data) {
    const product = new Product(data.id);
    product.setData(data);
    product.updateProduct();
    return product;
  }
  async deleteProduct(data) {
    const product = new Product(data.id);
    product.deleteProduct();
    return product;
  }
}
