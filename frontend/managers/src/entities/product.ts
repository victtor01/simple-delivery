export interface Product {
  id: string;
  name: string;
  price: string;
  description: string;
  quantity: number;
  storeId: string;
  photo?: string | null;
}
