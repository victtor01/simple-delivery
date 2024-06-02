"use client";

import { api } from "@/api";
import { Product } from "@/entities/product";
import { useStore } from "@/hooks/useStore";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductsCreateModel } from "./products-create-model";
import { fontRoboto } from "@/fonts";

type Model = "create" | null;

const useProducts = () => {
  const searchParams = useSearchParams();
  const modelState: Model = searchParams.get("model") as Model;

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return (await api.get(`/products`)).data;
    },
  });

  return {
    products,
    modelState,
  };
};

export default function Products() {
  const { products, modelState } = useProducts();

  return (
    <>
      {modelState === "create" && <ProductsCreateModel />}

      <section className="flex flex-col w-full h-auto">
        <header
          className="flex justify-between w-full p-2 bg-white dark:bg-zinc-800"
        >
          <div className="flex items-center gap-3">
            <h1
              className={`font-semibold bg-gradient-to-r
              text-lg bg-clip-text text-transparent
              from-orange-600 to-orange-500`}
            >
              Todos os produtos
            </h1>
          </div>
          <div className="flex items-center gap-3">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              className="p-1 w-full max-w-[12rem] px-2
              bg-zinc-100 rounded-md border outline-none
              dark:bg-zinc-900 dark:border-zinc-700"
            />
            <button
              className="p-1 px-2 border rounded-md dark:border-zinc-700 text-md opacity-95 hover:opacity-100"
            >
              Filtrar
            </button>
            <Link
              href={"?model=create"}
              className="p-1 px-2 text-white rounded-md bg-gradient-45 from-orange-500 to-rose-500 hover:shadow-xl opacity-95 hover:opacity-100"
            >
              Create
            </Link>
          </div>
        </header>
        <div className="flex flex-wrap gap-3 p-5">
          {products?.map((product, index: number) => {
            return (
              <Link
                key={index}
                href={`/products/${product.id}`}
                className="w-full max-w-[14rem] flex flex-col
                bg-white h-auto shadow hover:shadow-xl relative 
                rounded-xl"
              >
                <span
                  className="absolute top-[-0.7rem] right-[-0.7rem]
                  w-10 h-10 bg-zinc-600 shadow rounded-full
                  grid place-items-center font-semibold
                  text-gray-50"
                >
                  3
                </span>

                <div className="overflow-hidden rounded-xl">
                  <div
                    className="w-full h-[10rem] bg-gradient-45 
                    from-orange-500 to-rose-500"
                  />

                  <div className="flex flex-col w-full p-3 overflow-auto">
                    <div
                      className="flex items-center justify-between font-semibold text-gray-700 capitalize"
                    >
                      <span>{product?.name}</span>
                      <span
                        className="p-1 px-2 text-orange-500 bg-orange-100 rounded-md"
                      >
                        {product?.price}
                      </span>
                    </div>
                    <div className="text-gray-400">
                      {product?.description || "Sem descrição"}
                    </div>
                  </div>
                </div>
              </Link>
            );
          })}
        </div>
      </section>
    </>
  );
}
