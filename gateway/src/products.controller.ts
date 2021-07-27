import { Body, Controller, Inject, Logger, Post } from "@nestjs/common";
import { ClientProxy } from "@nestjs/microservices";
import { ApiOperation, ApiResponse, ApiTags } from "@nestjs/swagger";
import { CreateProductDto } from "./dtos/product/create-product.dto";

@Controller('products')
@ApiTags('products')
export class ProductController{
    constructor(
    @Inject('PRODUCT_SERVICE') private readonly productServiceClient:ClientProxy
    ){}

    @ApiOperation({ description: 'create product' })
    @ApiResponse({ status: 200, description: 'Create Product' })
    @Post()
    async createProduct(@Body() data:CreateProductDto){
       const createProductResponse= await this.productServiceClient.emit('create_product',data).toPromise()
      Logger.log(data,'send to topic create_product')
       return createProductResponse;
    }

}