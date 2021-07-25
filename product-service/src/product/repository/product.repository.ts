import { Injectable, Logger } from '@nestjs/common';
import { Product } from '../models/product.model';

@Injectable()
export class ProductRepository {
  // async createProduct(data) {
  //   const product = new Product(undefined);
  //   product.setData(data);
  //   product.createProduct();
  //   return product;
  // }
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
