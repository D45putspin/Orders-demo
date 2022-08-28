import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { userInfo } from 'os';
import { async } from 'rxjs';
import { orderModel, OrdersSchema } from 'src/orders/orders.model';
import { TYPE_EMAIL } from 'src/shared';
import { ThirdPartyEmailService } from 'src/third-party/email.service';
import { UserModel } from 'src/users/users.model';
import { CreatePaymentTypeDto } from './dto/create-payment-type.dto';
import {
  actionTypes,
  paymentTypesModel,
  PAYMENT_TYPES_MODEL,
} from './payment-types.model';

@Injectable()
export class PaymentTypesService {
  constructor(
    @InjectModel(PAYMENT_TYPES_MODEL)
    private readonly paymentTypeModel: Model<paymentTypesModel>,
    private readonly thirdPartyEmailService: ThirdPartyEmailService,
  ) {}
  async create(createPaymentTypeDto: CreatePaymentTypeDto) {
    const newPaymentType = new this.paymentTypeModel(createPaymentTypeDto);
    return await newPaymentType.save();
  }
  async getPaymentType(id: string) {
    return await this.paymentTypeModel.findById(id);
  }
  async actionAccordingToPaymentMethod(
    info: {
      paymentType: paymentTypesModel;
      order: orderModel;
    },
    user: UserModel,
  ) {
    switch (info.paymentType.action) {
      case actionTypes.DISCOUNT:
        return {
          order: await this.addDiscount(info.order),
          success: true,
          type: actionTypes.DISCOUNT,
        };
        break;
      case actionTypes.EMAIL:
        this.sendPaymentEmail(user);
        return { order: info.order, success: true, type: actionTypes.EMAIL };
        break;
    }
  }

  async addDiscount(order: orderModel) {
    const price = order.price - order.price * 0.1;
    return { ...order, price };
  }
  async sendPaymentEmail(user) {
    this.thirdPartyEmailService.sendMail<any>(
      user,
      TYPE_EMAIL.CONFIRM_MB_PAYMENT,
      {
        name: user.fullname,
      },
    );
  }
}
