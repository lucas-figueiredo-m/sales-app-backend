import {
  Body,
  Controller,
  Delete,
  Get,
  Post,
  Put,
  Query,
} from '@nestjs/common';
import { ProductCategory } from '@prisma/client';
import { CreateProductDto } from './dto/create-product.dto';
import { UpdateProductDto } from './dto/update-product.dto';
import { ProductsService } from './products.service';

@Controller('products')
export class ProductsController {
  constructor(private products: ProductsService) {}

  @Post()
  createProduct(@Body() body: CreateProductDto) {
    return this.products.create(body);
  }

  @Get()
  getAllProducts(@Query('category') category: ProductCategory) {
    return this.products.get(category);
  }

  @Put()
  updateProduct(
    @Query('server_id') server_id: string,
    @Body() body: UpdateProductDto
  ) {
    return this.products.update(parseInt(server_id), body);
  }

  @Delete()
  deleteProduct(@Query('server_id') server_id: string) {
    return this.products.delete(parseInt(server_id));
  }
}
