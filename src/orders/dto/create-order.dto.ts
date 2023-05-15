import { CreateOrderProductType, CreateOrderType } from '@salesapp/types';
import {
  ArrayMinSize,
  IsArray,
  IsNotEmpty,
  IsNumber,
  IsOptional,
} from 'class-validator';

export class CreateOrderDto implements CreateOrderType {
  @IsNotEmpty()
  @IsNumber()
  client_id: number;

  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  products: CreateOrderProductDto[];
}

export class CreateOrderProductDto implements CreateOrderProductType {
  @IsNotEmpty()
  @IsNumber()
  product_id: number;

  @IsNotEmpty()
  @IsNumber()
  negotiated_price: number;

  @IsNotEmpty()
  @IsNumber()
  ordered_weight_in_grams: number;

  @IsOptional()
  notes?: string;
}
