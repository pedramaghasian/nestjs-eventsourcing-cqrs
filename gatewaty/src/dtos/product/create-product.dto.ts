import { ApiProperty } from '@nestjs/swagger';
import { IsString } from 'class-validator';

export class CreateProductDto {
  @IsString()
  @ApiProperty({
    type: String,
    example: '12re',
  })
  id: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'title',
  })
  title: string;

  @IsString()
  @ApiProperty({
    type: String,
    example: 'image',
  })
  image: string;
}
