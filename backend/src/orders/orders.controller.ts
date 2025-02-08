/* eslint-disable prettier/prettier */
import { Controller, Post, Body, UseGuards, Request, SetMetadata } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { AuthGuard } from '@nestjs/passport';
import { RolesGuard } from './guards/roles.guard';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}


@UseGuards(AuthGuard, RolesGuard)
@SetMetadata('role', 'customer')
@Post('place')
  async placeOrder(@Request() req, @Body() body: { productId: number; quantity: number }) {
    // eslint-disable-next-line @typescript-eslint/no-unsafe-argument, @typescript-eslint/no-unsafe-member-access
    return this.ordersService.placeOrder(req.user, body.productId, body.quantity);
  }
}