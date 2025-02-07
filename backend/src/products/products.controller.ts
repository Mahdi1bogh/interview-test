/* eslint-disable prettier/prettier */
import {
    Controller,
    Get,
    Post,
    Body,
    Param,
    NotFoundException,
  } from '@nestjs/common';
  import { ProductsService } from './products.service';
  import { Product } from './entities/product.entity';
  
  @Controller('products')
  export class ProductsController {
    constructor(private readonly productsService: ProductsService) {}
  
    @Post()
    async create(@Body() product: Omit<Product, 'id' | 'imageUrl'>): Promise<Product> {
      return this.productsService.create(product);
    }
  
    @Get()
    async findAll(): Promise<Product[]> {
      return this.productsService.findAll();
    }
  
    @Post(':id/purchase')
    async purchase(@Param('id') id: string): Promise<{ success: boolean; message: string }> {
      const productId = parseInt(id, 10);
      if (isNaN(productId)) {
        throw new NotFoundException('Invalid product ID');
      }
      return this.productsService.purchase(productId);
    }
  }