import { Injectable } from '@nestjs/common';
import { InjectModel } from '@nestjs/mongoose';
import { Model } from 'mongoose';
import { functions } from 'src/common/functions/entity.utils';
import { CreateProductDto } from './dto/create-product.dto';
import { productModel, PRODUCT_MODEL } from './products.model';
@Injectable()
export class ProductsService {
  constructor(
    @InjectModel(PRODUCT_MODEL)
    private readonly productModel: Model<productModel>,
  ) {}
  async create(createProductDto: CreateProductDto) {
    const newProduct = new this.productModel(createProductDto);
    return await newProduct.save();
  }

  async findAll(step: number, limit: number) {
    const skip =
      step && limit ? await functions.skipCalculator(step, limit) : 0;
    return await this.productModel
      .find()
      .skip(skip)
      .limit(limit ? limit - 1 : 0);
  }
  async findById(id: string) {
    return await this.productModel.findById(id);
  }
}
