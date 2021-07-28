import { Prop, Schema, SchemaFactory } from '@nestjs/mongoose';
import { Document } from 'mongoose';

export type ProductDocument = Product & Document;

@Schema()
export class Product {
  @Prop({ unique: true })
  id: string;

  @Prop({ unique: true })
  title: string;

  @Prop()
  image: string;
}

export const ProductSchema = SchemaFactory.createForClass(Product);
