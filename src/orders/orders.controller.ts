import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { OrdersService } from './orders.service';
import { CreateOrderDto } from './dto/create-order.dto';
import { CurrentUser } from 'src/common/decorators';
import { UserModel } from 'src/users/users.model';
import { PayOrderDto } from './dto/pay-order.dto';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}

  @Post('create')
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserModel,
  ) {
    return this.ordersService.create(createOrderDto, user);
  }
  @Post('pay')
  pay(@Body() payOrderDto: PayOrderDto, @CurrentUser() user: UserModel) {
    return this.ordersService.payOrder(payOrderDto, user);
  }
}
