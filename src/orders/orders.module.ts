import { Module } from '@nestjs/common';
import { OrdersService } from './orders.service';
import { OrdersController } from './orders.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { OrdersSchema, ORDER_MODEL } from './orders.model';
import { ProductsModule } from 'src/products/products.module';
import { PaymentTypesModule } from 'src/payment-types/payment-types.module';

@Module({
  imports: [
    PaymentTypesModule,
    ProductsModule,
    MongooseModule.forFeature([{ name: ORDER_MODEL, schema: OrdersSchema }]),
  ],
  controllers: [OrdersController],
  providers: [OrdersService],
})
export class OrdersModule {}
