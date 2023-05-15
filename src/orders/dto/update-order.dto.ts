import { UpdateOrderType } from '@salesapp/types';
import { IsNotEmpty, IsArray, ArrayMinSize } from 'class-validator';
import { CreateOrderProductDto } from './create-order.dto';

export class UpdateOrderDto implements UpdateOrderType {
  @IsNotEmpty()
  @IsArray()
  @ArrayMinSize(1)
  products: CreateOrderProductDto[];
}
