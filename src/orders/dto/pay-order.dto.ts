import { IsNotEmpty } from 'class-validator';

export class PayOrderDto {
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  orderId: string;
  paymentMethodId: string;
}
