import { ApiProperty } from '@nestjs/swagger';
import { IsNotEmpty } from 'class-validator';
import { randomUUID } from 'crypto';

export class CreateProductTopicDto {
  @ApiProperty({example: "Que tal um pouco mais de molho?"})

  @IsNotEmpty({ message: "Campo 'nome' faltando" })
  name: string;

  @ApiProperty({ example: randomUUID()})
  @IsNotEmpty({ message: "Campo 'productId' faltando" })
  productId: string;
}
