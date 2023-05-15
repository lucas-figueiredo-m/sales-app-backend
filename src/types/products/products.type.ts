import { ClientType, ProductCategory } from '@prisma/client';

export type CreateProductType = {
  name: string;
  price: number;
  category: ProductCategory;
  type: ClientType;
};
