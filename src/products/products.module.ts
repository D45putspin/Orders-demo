import { Module } from '@nestjs/common';
import { ProductsService } from './products.service';
import { ProductsController } from './products.controller';
import { MongooseModule } from '@nestjs/mongoose';
import { ProductsSchema, PRODUCT_MODEL } from './products.model';

@Module({
  imports: [
    MongooseModule.forFeature([
      { name: PRODUCT_MODEL, schema: ProductsSchema },
    ]),
  ],
  controllers: [ProductsController],
  providers: [ProductsService],
  exports: [ProductsService],
})
export class ProductsModule {}
