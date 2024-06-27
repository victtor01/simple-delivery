import { Product } from "./product";

export interface Store {
  id: string;
  name: string;
  description: string;
  status: StoreStatus

  products?: Product[]
}

export type StoreStatus = 'open' | 'closed' 