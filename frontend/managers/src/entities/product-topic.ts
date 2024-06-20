import { Product } from "./product";

export interface ProductTopic {
  id: string;
  name: string;
  productId: string;
  product: Product;
}
