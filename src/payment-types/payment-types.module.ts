import { Module } from '@nestjs/common';
import { PaymentTypesService } from './payment-types.service';
import { PaymentTypesController } from './payment-types.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { PaymentTypesSchema, PAYMENT_TYPES_MODEL } from './payment-types.model';
import { ThirdPartyModule } from 'src/third-party/third-party.module';

@Module({
  imports: [
    ThirdPartyModule,
    MongooseModule.forFeature([
      { name: PAYMENT_TYPES_MODEL, schema: PaymentTypesSchema },
    ]),
  ],
  controllers: [PaymentTypesController],
  providers: [PaymentTypesService],
  exports: [PaymentTypesService],
})
export class PaymentTypesModule {}
