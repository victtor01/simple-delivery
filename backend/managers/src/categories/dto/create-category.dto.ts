import { IsNotEmpty, IsString } from "class-validator";

export class CreateCategoryDto {
  @IsString({ message: "O nome precisa ser um texto" })
  @IsNotEmpty({ message: "O campo obrigatório" })
  name: string;
}
