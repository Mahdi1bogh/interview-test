/* eslint-disable prettier/prettier */
import { Injectable, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Product } from './entities/product.entity';

@Injectable()
export class ProductsService {
  constructor(
    @InjectRepository(Product)
    private readonly productRepository: Repository<Product>,
  ) {}

  async create(product: Omit<Product, 'id' | 'imageUrl'>): Promise<Product> {
    const newProduct = this.productRepository.create({
      ...product,
      imageUrl: `https://picsum.photos/200?random=${Math.floor(Math.random() * 1000)}`, // Random image URL
    });
    return await this.productRepository.save(newProduct);
  }

  async findAll(): Promise<Product[]> {
    return await this.productRepository.find();
  }

  async purchase(id: number): Promise<{ success: boolean; message: string }> {
    const product = await this.productRepository.findOne({ where: { id } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.supply > 0) {
      product.supply--;
      await this.productRepository.save(product);
      return { success: true, message: 'Purchase successful!' };
    }

    return { success: false, message: 'Product out of stock!' };
  }
}