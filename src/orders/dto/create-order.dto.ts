import { IsNotEmpty } from 'class-validator';

export class CreateOrderDto {
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  products: [string];
}
