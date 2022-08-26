import { IsNotEmpty } from 'class-validator';
import { actionTypes } from '../payment-types.model';

export class CreatePaymentTypeDto {
  @IsNotEmpty({
    message: 'AUTH.THERE_ARE_EMPTY_FIELDS',
  })
  name: string;
  action: actionTypes;
}
