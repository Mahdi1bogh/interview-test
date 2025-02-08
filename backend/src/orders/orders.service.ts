/* eslint-disable prettier/prettier */
import { Injectable, ForbiddenException, NotFoundException } from '@nestjs/common';
import { InjectRepository } from '@nestjs/typeorm';
import { Repository } from 'typeorm';
import { Order } from './entities/order.entity';
import { User } from '../users/entities/user.entity';
import { Product } from '../products/entities/product.entity';

@Injectable()
export class OrdersService {
  constructor(
    @InjectRepository(Order) private orderRepo: Repository<Order>,
    @InjectRepository(Product) private productRepo: Repository<Product>,
  ) {}

  async placeOrder(user: User, productId: number, quantity: number) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-enum-comparison
    if (user.role !== 'customer') {
      throw new ForbiddenException('Only customers can place orders');
    }

    const product = await this.productRepo.findOne({ where: { id: productId } });
    if (!product) {
      throw new NotFoundException('Product not found');
    }

    if (product.supply < quantity) {
      throw new ForbiddenException('Not enough supply available');
    }

    product.supply -= quantity; 
    await this.productRepo.save(product);

    const order = this.orderRepo.create({
      user: user,
      product,
      quantity,
      totalPrice: product.price * quantity
    });

    return this.orderRepo.save(order);
  }
}