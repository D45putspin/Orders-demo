import { IsNotEmpty } from 'class-validator';

export class CreateProductDto {
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  name: string;
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  price: number;
}
