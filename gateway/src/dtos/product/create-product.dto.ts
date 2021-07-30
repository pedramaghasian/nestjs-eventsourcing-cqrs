import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  id?: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'some good title ',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'some good image url',
  })
  image: string;
}
