import { IsNotEmpty } from 'class-validator';

export class GetProductsByIds {
  @IsNotEmpty({ message: 'Ids dos produtos faltando!' })
  productIds: string[];

  @IsNotEmpty({ message: 'informações sobre a loja faltando!' })
  storeId: string;
}
