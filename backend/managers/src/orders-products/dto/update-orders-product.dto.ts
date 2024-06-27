import { PartialType } from '@nestjs/mapped-types';
import { CreateOrdersProductDto } from './create-orders-product.dto';

export class UpdateOrdersProductDto extends PartialType(CreateOrdersProductDto) {
  id: number;
}
