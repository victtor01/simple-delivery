import { Product } from "./product";
import { topicOptions } from "./topic-options";

export interface ProductTopic {
  id: string;
  name: string;
  productId: string;
  product: Product;

  topicOptions?: topicOptions[]
}
