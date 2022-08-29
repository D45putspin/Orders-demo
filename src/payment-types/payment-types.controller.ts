import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'src/users/user.interfaces';

@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  @Post('create')
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  @Get(':skip/:limit')
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  async findAll(@Param('skip') skip: number, @Param('limit') limit: number) {
    return await this.paymentTypesService.findAll(skip, limit);
  }
}
