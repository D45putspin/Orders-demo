import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import { paymentTypesModel, PAYMENT_TYPES_MODEL } from './payment-types.model';

@Injectable()
export class PaymentTypesService {
  constructor(
    @InjectModel(PAYMENT_TYPES_MODEL)
    private readonly paymentTypeModel: Model<paymentTypesModel>,
  ) {}
  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    const newPaymentType = new this.paymentTypeModel(createPaymentTypeDto);
    return await newPaymentType.save();
  }
}
