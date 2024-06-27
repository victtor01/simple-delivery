import { Product } from "@/entities/product";
import { create } from "zustand";

type CartStore = {
  products: Product[];
  removeToCart: (productId: string) => void;
  AddToCart: (product: Product[]) => void;
};

const useCartStore = create<CartStore>((set) => ({
  products: [],
  AddToCart: (newProducts: Product[]) =>
    set((prev: CartStore) => {
      const { products: productsPrev } = prev;

      if (!productsPrev?.[0]) return { products: [...newProducts] };

      const storeId = productsPrev?.[0]?.storeId;

      return {
        products: [
          ...newProducts.filter(
            (currentProduct) => currentProduct?.storeId === storeId
          ),
        ],
      };
    }),

  removeToCart: (productId: string) => {
    set((prev: CartStore) => {
      if (prev.products.length === 1)
        return {
          products: [],
        };

      return {
        products: [
          ...prev.products.filter(
            (productCurrent) => productCurrent.id !== productId
          ),
        ],
      };
    });
  },
}));

export { useCartStore };
