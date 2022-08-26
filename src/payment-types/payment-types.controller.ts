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

@Controller('payment-types')
export class PaymentTypesController {
  constructor(private readonly paymentTypesService: PaymentTypesService) {}

  @Post('create')
  create(@Body() createPaymentTypeDto: CreatePaymentTypeDto) {
    return this.paymentTypesService.create(createPaymentTypeDto);
  }
}
