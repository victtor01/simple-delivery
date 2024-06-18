import { ApiProperty } from "@nestjs/swagger";
import { IsNotEmpty } from "class-validator";

export class AuthDto {
  @ApiProperty({
    type: String,
    description: "This email is required propriety for login of user"
  })

  @IsNotEmpty({ message: "Campo email faltando!" })
  email: string;

  @ApiProperty({
    type: String,
    description: "This password is required propriety for login of user"
  })

  @IsNotEmpty({ message: "Campo senha faltando!" })
  password: string;
}
