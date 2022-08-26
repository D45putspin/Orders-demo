import { Module } from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { PaymentTypesController } from './payment-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentTypesSchema, PAYMENT_TYPES_MODEL } from './payment-types.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PAYMENT_TYPES_MODEL, schema: PaymentTypesSchema },
    ]),
  ],
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService],
})
export class PaymentTypesModule {}
