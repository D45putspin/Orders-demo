import { HttpException, Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { UserModel } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderModel, ORDER_MODEL } from './orders.model';
import * as _ from 'lodash';
import { PayOrderDto } from './dto/pay-order.dto';
import { PaymentTypesService } from 'src/payment-types/payment-types.service';
import { actionTypes } from 'src/payment-types/payment-types.model';
import { functions } from 'src/common/functions/entity.utils';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ORDER_MODEL) private readonly orderModel: Model<orderModel>,
    private readonly productsService: ProductsService,
    private readonly paymentTypesService: PaymentTypesService,
  ) {}

  async cleanInput(createOrderDto: CreateOrderDto) {
    const products = await Promise.all(
      await createOrderDto.products.map(async (p) => {
        const exists = await this.productsService.findById(p);
        if (exists) return p;
      }),
    );

    return _.compact(products);
  }

  async create(createOrderDto: CreateOrderDto, user: UserModel) {
    const clnInput = await this.cleanInput(createOrderDto);

    const prices = await Promise.all(
      clnInput.map(async (productId) => {
        const product = await this.productsService.findById(productId);
        return product.price;
      }),
    );
    const totalPrice = _.sum(prices);
    const newOrder = new this.orderModel({
      products: clnInput,
      userId: user._id,
      price: totalPrice,
    });
    return await newOrder.save();
  }

  async payOrder(payOrderDto: PayOrderDto, user: UserModel) {
    const paymentType = await this.paymentTypesService.getPaymentType(
      payOrderDto.paymentMethodId,
    );
    const order = await this.orderModel.findById(payOrderDto.orderId);
    if (!paymentType || !order) throw new HttpException('ERROR.BAD_INPUT', 401);
    if (!order.processing)
      throw new HttpException('ERROR.ORDER_ALREADY_CLOSED', 401);
    const paymentHelper =
      await this.paymentTypesService.actionAccordingToPaymentMethod(
        {
          paymentType,
          order,
        },
        user,
      );

    paymentHelper.success
      ? await this.orderModel.findByIdAndUpdate(payOrderDto.orderId, {
          paymentProcessed: true,
          payment: 'success',
          processing: false,
        })
      : await this.orderModel.findByIdAndUpdate(payOrderDto.orderId, {
          paymentProcessed: false,
          payment: 'not successful',
        });
    paymentHelper.type === actionTypes.DISCOUNT &&
      (await this.orderModel.findByIdAndUpdate(order._id, {
        price: paymentHelper.order?.price,
      }));
    return paymentHelper.success ? { success: true } : { success: false };
  }
  async findAll(step: number, limit: number) {
    const skip =
      step && limit ? await functions.skipCalculator(step, limit) : 0;
    return await this.orderModel
      .find()
      .skip(skip)
      .limit(limit ? limit - 1 : 0);
  }
}
