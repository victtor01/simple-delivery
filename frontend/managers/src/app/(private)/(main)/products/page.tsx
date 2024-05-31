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

  const { useCookies: useCookiesStore } = useStore();

  const cookiesStore = useCookiesStore();

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products", cookiesStore?.store?.id],
    queryFn: async () => {
      if (!cookiesStore?.store?.id) return;
      return (await api.get(`/products/${cookiesStore?.store?.id}`)).data;
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

      <section className="w-full flex flex-col h-auto">
        <header className="w-full p-2 bg-white justify-between flex
        dark:bg-zinc-800">
          <div className="flex gap-3 items-center">
            <h1
              className={`font-semibold ${fontRoboto} bg-gradient-to-r
              text-lg uppercase bg-clip-text text-transparent
              from-orange-600 to-orange-500`}
            >
              Todos os produtos
            </h1>
          </div>
          <div className="flex gap-3 items-center">
            <input
              type="text"
              placeholder="Pesquisar produto..."
              className="p-1 w-full max-w-[12rem] px-2
              bg-zinc-100 rounded-md border outline-none
              dark:bg-zinc-900 dark:border-zinc-700"
            />
            <button
              className="p-1 rounded-md px-2 dark:border-zinc-700
              border text-md opacity-95 hover:opacity-100"
            >
              Filtrar
            </button>
            <Link
              href={"?model=create"}
              className="p-1 px-2 rounded-md bg-gradient-45
            from-orange-500 to-rose-500 text-white hover:shadow-xl
            opacity-95 hover:opacity-100"
            >
              Create
            </Link>
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
    </>
  );
}
