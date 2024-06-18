import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class CreateManagerDto {
  @ApiProperty({
    example: "Jonh",
    description: "this property refers to the user's first name"
  })

  @IsNotEmpty({ message: "campo 'Nome' faltando" })
  firstName: string;

  @ApiProperty({
    example: "Lennon",
    description: "this property refers to the user's second name"
  })

  @IsNotEmpty({ message: "campo 'Sobrenome' faltando" })
  lastName: string;

  @ApiProperty({
    example: "jonh.le@gmail.com",
    description: "this property refers to the user's email"
  })

  @IsNotEmpty({ message: "campo 'Email' faltando" })
  email: string;

  @ApiProperty({
    example: "Jonsh3#@lele",
    description: "this property refers to the user's password"
  })

  @IsNotEmpty({ message: "campo 'Senha' faltando" })
  password: string;
}
