import { ClientType, ProductCategory } from '@prisma/client';
import { CreateProductType } from '@salesapp/types';
import { IsNotEmpty, IsNumber, IsString, Max, Min } from 'class-validator';
import { IsValidClientType } from '../../validators';
import { IsValidProductCategory } from '../../validators/product-category.validator';

export class CreateProductDto implements CreateProductType {
  @IsNotEmpty()
  @IsString()
  name: string;

  @IsNotEmpty()
  @IsNumber()
  @Min(0)
  @Max(99999)
  price: number;

  @IsNotEmpty()
  @IsValidClientType()
  type: ClientType;

  @IsNotEmpty()
  @IsValidProductCategory()
  category: ProductCategory;
}
