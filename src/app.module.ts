import { Module } from '@nestjs/common';
import { APP_GUARD } from '@nestjs/core';
import { MasterGuard } from './common/guards';
import { ConfigModule } from '@nestjs/config';
import { MongooseModule } from '@nestjs/mongoose';
import { UsersModule } from 'src/users/users.module';
import { AuthModule } from './auth/auth.module';
import { GeneralModule } from './general/general.module';
import { ProductsModule } from './products/products.module';
import { OrdersModule } from './orders/orders.module';
import { PaymentTypesModule } from './payment-types/payment-types.module';

console.log(
  'DB Connection: ',
  process.env.DB_CONNECTION || 'mongodb://localhost:27017/mozantechDatabase',
);
@Module({
  imports: [
    ConfigModule.forRoot(),
    MongooseModule.forRootAsync({
      useFactory: () => ({
        uri: 'mongodb://localhost:27017/mozantechDB',
      }),
    }),
    UsersModule,
    AuthModule,
    GeneralModule,
    ProductsModule,
    OrdersModule,
    PaymentTypesModule,
  ],
  controllers: [],
  providers: [
    {
      provide: APP_GUARD,
      useClass: MasterGuard,
    },
  ],
})
export class AppModule {}
