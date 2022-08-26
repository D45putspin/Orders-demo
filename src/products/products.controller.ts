import {
  Controller,
  Get,
  Post,
  Body,
  Patch,
  Param,
  Delete,
} from '@nestjs/common';
import { ProductsService } from './products.service';
import { CreateProductDto } from './dto/create-product.dto';
import { Roles } from 'src/common/decorators';
import { UserRole } from 'src/users/user.interfaces';

@Controller('products')
export class ProductsController {
  constructor(private readonly productsService: ProductsService) {}

  @Post('create')
  @Roles([UserRole.ADMIN])
  create(@Body() createProductDto: CreateProductDto) {
    return this.productsService.create(createProductDto);
  }

  @Get(':skip/:limit')
  @Roles([UserRole.ADMIN, UserRole.DEFAULT])
  async findAll(@Param('skip') skip: number, @Param('limit') limit: number) {
    return await this.productsService.findAll(skip, limit);
  }
}
