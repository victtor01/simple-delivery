export class CreateProductDto {
  name: string;
  photo?: string | null;
  quantity?: number | null;
  description: string;
  price: number;
}
