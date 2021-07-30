import { log } from 'console';
import { Injectable, Logger } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductDocument, Product } from '../models/product.model';
import { travelSchemaPossibleExtensions } from 'graphql-tools';

@Injectable()
export class ProductModelRepository {
  constructor(
    @InjectModel(Product.name)
    private readonly productModel: Model<ProductDocument>,
  ) {}

  async create(data): Promise<Product | any> {
    try {
      await new this.productModel(data).save();
    } catch (e) {
      if (e.code == 11000) {
        Logger.warn('duplicate Key error', e.code);
        return;
      }
      console.log(e);
    }
  }

  async update(_id: number, data): Promise<any> {
    return this.productModel.findOneAndUpdate({ _id }, data);
  }

  async delete(id: number): Promise<void> {
    await this.productModel.deleteOne({ id });
  }

  async findOneById(data) {
    const { id } = data;
    const product = await this.productModel.findOne({ _id: id });
    return product;
  }

  async findByTitle(title) {
    const product = await this.productModel.findOne({ title: title });
    return product;
  }
}
