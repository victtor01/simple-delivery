'use client'

import { Product } from "@/entities/product";

const getCartInLocalstorage = () => {
  const productsInCart: string | null = window?.localStorage?.getItem('cart') || null;
  
  const productsInCartJSON: Product[] | null = !!productsInCart
    ? JSON.parse(productsInCart)
    : null;

  return productsInCartJSON;
};

export { getCartInLocalstorage }