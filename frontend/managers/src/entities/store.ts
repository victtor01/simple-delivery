import { Manager } from "./manager";
import { Product } from "./product";

export interface Store {
  id: string;
  name: string;
  managerId: string;
  description?: string;
  manager?: Manager;
  createdAt?: string;
  updatedAt?: string;
  products?: Product[];
}
