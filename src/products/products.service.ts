import { Injectable } from '@nestjs/common';
import { ProductCategory, Products } from '@prisma/client';
import { CreateProductType } from '@salesapp/types';
import { PrismaService } from '../services/prisma.service';
import { ProductsInterface } from './products.interface';

@Injectable()
export class ProductsService implements ProductsInterface {
  constructor(private prisma: PrismaService) {}

  async create(productData: CreateProductType): Promise<Products> {
    return await this.prisma.products.create({
      data: productData,
    });
  }

  async get(category: ProductCategory): Promise<Products[]> {
    return await this.prisma.products.findMany({ where: { category } });
  }

  async update(
    product_id: number,
    attr: Partial<CreateProductType>,
  ): Promise<Products> {
    return await this.prisma.products.update({
      where: {
        server_id: product_id,
      },
      data: attr,
    });
  }

  async delete(product_id: number): Promise<void> {
    await this.prisma.products.delete({ where: { server_id: product_id } });
  }
}
