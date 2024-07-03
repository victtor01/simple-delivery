
import { Header } from "./public-header";
import { PublicNav } from "./public-nav";
import { OrderModel } from "@/components/order-model";
import { useEffect } from "react";
import { Product } from "@/entities/product";
import { useCartStore } from "@/states/cart-store";
import { LoadCartState } from "@/components/load-cart-state";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ({ children }: LayoutProps) {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col relative">
      <LoadCartState/>
      
      <OrderModel/>
      <Header />
      <PublicNav />
      {children}
    </div>
  );
}
