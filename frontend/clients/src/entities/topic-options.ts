import { ProductTopic } from "./product-topic";

export interface topicOptions {
  id: string;
  name: string;
  price: number;
  
  topicId?: string;
  topic?: ProductTopic;

}