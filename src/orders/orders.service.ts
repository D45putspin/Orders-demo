import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { ProductsService } from 'src/products/products.service';
import { UserModel } from 'src/users/users.model';
import { CreateOrderDto } from './dto/create-order.dto';
import { orderModel, ORDER_MODEL } from './orders.model';
import * as _ from 'lodash';
@Injectable()
export class OrdersService {
  constructor(
    @InjectModel(ORDER_MODEL) private readonly orderModel: Model<orderModel>,
    private readonly productsService: ProductsService,
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
    console.log(clnInput);
    const newOrder = new this.orderModel({
      products: clnInput,
      userId: user._id,
    });
    return await newOrder.save();
  }
}
