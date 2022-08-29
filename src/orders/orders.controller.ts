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
import { CurrentUser, Roles } from 'src/common/decorators';
import { UserModel } from 'src/users/users.model';
import { PayOrderDto } from './dto/pay-order.dto';
import { UserRole } from 'src/users/user.interfaces';

@Controller('orders')
export class OrdersController {
  constructor(private readonly ordersService: OrdersService) {}
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  @Post('create')
  create(
    @Body() createOrderDto: CreateOrderDto,
    @CurrentUser() user: UserModel,
  ) {
    return this.ordersService.create(createOrderDto, user);
  }
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  @Post('pay')
  pay(@Body() payOrderDto: PayOrderDto, @CurrentUser() user: UserModel) {
    return this.ordersService.payOrder(payOrderDto, user);
  }
  @Get(':skip/:limit')
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  async findAll(@Param('skip') skip: number, @Param('limit') limit: number) {
    return await this.ordersService.findAll(skip, limit);
  }
}
