"use client";

import { Product } from "@/entities/product";
import { useCartStore } from "@/states/cart-store";
import { useEffect } from "react";

export const LoadCartState = () => {
  const [setProductsInCart] = useCartStore((state) => [state.AddToCart]);

  useEffect(() => {
    const cartStringfy = localStorage.getItem("cart") || null;

    
    const cartJSON: Product[] | null = cartStringfy
    ? JSON.parse(cartStringfy)
    : null;
    console.log(cartJSON)

    if (!cartStringfy || !cartJSON?.[0]?.id) return;

    setProductsInCart([...cartJSON]);
  }, []);

  return <></>;
};
