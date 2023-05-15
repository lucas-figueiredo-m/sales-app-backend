import { ClientType, ProductCategory } from '@prisma/client';
import { CreateProductType } from '@salesapp/types';
import { IsNumber, IsOptional, IsString } from 'class-validator';
import { IsValidClientType } from '../../validators';
import { IsValidProductCategory } from '../../validators/product-category.validator';

export class UpdateProductDto implements CreateProductType {
  @IsString()
  @IsOptional()
  name: string;

  @IsNumber()
  @IsOptional()
  price: number;

  @IsOptional()
  @IsValidClientType()
  type: ClientType;

  @IsValidProductCategory()
  @IsOptional()
  category: ProductCategory;
}
