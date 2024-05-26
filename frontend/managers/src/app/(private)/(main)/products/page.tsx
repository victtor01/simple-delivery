"use client";

import { api } from "@/api";
import { Product } from "@/entities/product";
import { useStore } from "@/hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";

const useProducts = () => {
  const { useCookies: useCookiesStore } = useStore();

  const cookiesStore = useCookiesStore();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products", cookiesStore?.store?.id],
    queryFn: async () =>
      (await api.get(`/products/${cookiesStore?.store?.id}`)).data,
  });

  console.log(products);

  return {
    products,
  };
};

export default function Products() {
  const { products } = useProducts();

  return (
    <section className="w-full flex flex-col h-auto">
      <header className="w-full p-2 bg-white justify-between flex">
        <div className="flex gap-3 items-center">
          <h1
            className="font-semibold 
            text-gray-500 text-lg"
          >
            Todos os produtos
          </h1>
        </div>
        <div className="flex gap-3 items-center">
          <input
            type="text"
            placeholder="Pesquisar produto..."
            className="p-1 w-full max-w-[12rem]
            bg-zinc-100 rounded-md border outline-none"
          />
          <button
            className="p-1 rounded-md px-2 
            border text-md hover:bg-gray-800 hover:text-white"
          >
            Filtrar
          </button>
        </div>
      </header>
      <div className="flex flex-wrap gap-3 p-5">
        {products?.map((product) => {
          return (
            <Link
              href={`/products/${product.id}`}
              className="w-full max-w-[14rem] flex flex-col
              bg-white h-auto rounded-xl shadow overflow-hidden
              hover:shadow-xl"
            >
              <div
                className="w-full h-[10rem] bg-gradient-45 from-orange-500
                to-rose-500"
              />

              <div className="flex flex-col w-full overflow-auto p-3">
                <div className="capitalize font-semibold text-gray-700">
                  {product?.name}
                </div>
                <div className="text-gray-400">
                  {product?.description || "Sem descrição"}
                </div>
              </div>
            </Link>
          );
        })}
      </div>
    </section>
  );
}
