import {
  Body,
  Controller,
  Get,
  Param,
  Patch,
  Post,
  Query,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import type {
  CreateOrderDto,
  OrderStatus,
  UpdateOrderStatusDto,
} from './orders.types';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Get('dashboard')
  getDashboard(@Query('userId') userId?: string) {
    return this.ordersService.getDashboard(userId);
  }

  @Get()
  list(
    @Query('status') status?: OrderStatus,
    @Query('userId') userId?: string,
  ) {
    return this.ordersService.list(status, userId);
  }

  @Get(':id')
  detail(@Param('id') id: string) {
    return this.ordersService.detail(id);
  }

  @Post()
  create(@Body() payload: CreateOrderDto) {
    return this.ordersService.create(payload);
  }

  @Patch(':id/status')
  updateStatus(@Param('id') id: string, @Body() payload: UpdateOrderStatusDto) {
    return this.ordersService.updateStatus(id, payload);
  }
}
