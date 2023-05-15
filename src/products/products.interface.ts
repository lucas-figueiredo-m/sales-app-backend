import { Products } from '@prisma/client';
import { CreateProductType } from '@salesapp/types';

export abstract class ProductsInterface {
  abstract create(productData): Promise<Products>;
  abstract get(category: string): Promise<Products[]>;
  abstract update(
    product_id: number,
    attr: Partial<CreateProductType>,
  ): Promise<Products>;
  abstract delete(product_id: number): Promise<void>;
}
