"use client";

import Link from "next/link";
import { IoArrowBack } from "react-icons/io5";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { fontInter, fontOpenSans } from "@/fonts";
import { usePathname } from "next/navigation";
import { Product } from "@/entities/product";

interface ProductProps {
  params: {
    productId: string;
  };
}

const useProduct = (productId: string) => {
  const { data: product } = useQuery<Product>({
    queryKey: ["products", productId],
    queryFn: async () => {
      return (await api.get(`/products/${productId}`)).data;
    },
  });

  return {
    product,
  };
};

export default function ProductInformations({ params }: ProductProps) {
  const { productId } = params;
  const { product } = useProduct(productId);

  return (
    <div className="p-10 flex flex-col gap-4 rounded-xl">
      <div>
        <div
          className="w-[10rem] h-[10rem] 
              bg-gray-100 rounded-md border
              grid place-items-center"
        >
          <span
            className="font-semibold 
            text-gray-600"
          >
            Foto
          </span>
        </div>
      </div>

      <section
        className="flex flex-1 h-auto w-full 
        flex-wrap gap-3 *:whitespace-nowrap"
      >
        <div
          className="flex flex-col bg-gray-50
          p-2 px-3 rounded-lg flex-1"
        >
          <span className="text-gray-500 font-semibold">Nome</span>
          <span
            className="text-lg font-semibold text-zinc-700 
            capitalize"
          >
            {product?.name}
          </span>
        </div>

        <div
          className="flex flex-col bg-gray-50
          p-2 px-3 rounded-lg flex-1"
        >
          <span className="text-gray-500 font-semibold">Descrição</span>
          <span
            className="text-lg font-semibold text-zinc-700 
            capitalize"
          >
            {product?.description || "Sem descrição."}
          </span>
        </div>
     
        <div
          className="flex flex-col bg-gray-50
          p-2 px-3 rounded-lg flex-1"
        >
          <span className="text-gray-500 font-semibold">
            Quantidade no estoque
          </span>
          <span
            className="text-lg font-semibold text-zinc-700 
            capitalize"
          >
            {product?.quantity}
          </span>
        </div>

        <div
          className="flex flex-col
          p-2 px-3 rounded-lg flex-1 bg-emerald-50"
        >
          <span className="text-gray-500 font-semibold">Preço do produto</span>
          <span
            className="text-lg font-semibold text-green-600 
            capitalize"
          >
            R$ {product?.price}
          </span>
        </div>
      </section>
    </div>
  );
}
