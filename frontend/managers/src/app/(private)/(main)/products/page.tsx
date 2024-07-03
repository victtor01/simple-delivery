"use client";

import { api } from "@/api";
import { Product } from "@/interfaces/product";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductsCreateModel } from "./products-create-model";
import ProductPreview from "@/components/product-preview";
import { useCategories } from "@/hooks/useCategories";
import { ProductsHeader } from "./products-header";
import { BiCategory } from "react-icons/bi";
import { useEffect } from "react";

type Model = "create" | null;

const useProducts = () => {
  const searchParams = useSearchParams();
  const modelState: Model = searchParams.get("model") as Model;
  const categoryNameSelected: string | null =
    searchParams.get("category") || null;

  const { data: products, refetch, isLoading } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return categoryNameSelected
        ? (await api.get(`/products?category=${categoryNameSelected}`)).data
        : (await api.get(`/products`)).data;
    },
  });

  useEffect(() => {
    refetch()
  },[categoryNameSelected])

  return {
    products,
    isLoading,
    modelState,
    refetch,
    categoryNameSelected,
  };
};

export default function Products() {
  const { products, isLoading, modelState, categoryNameSelected } = useProducts();
  const { data: categories} = useCategories().getCategories();

  const styleForNoCategorySelected =
    categoryNameSelected === null
      ? `bg-gray-700 text-white shadow-xl`
      : `bg-white text-gray-700`;

  if(isLoading) {
    return (
      <div>
        Carregando
      </div>
    )
  }; 

  return (
    <>
      {modelState === "create" && <ProductsCreateModel />}

      <section className="flex flex-col w-full h-auto">
        <ProductsHeader />

        <div className="p-3 px-6 flex gap-2 items-center font-semibold text-gray-600">
          <BiCategory size={20} />
          Categorias
        </div>

        <div className="w-full p-2 px-6 flex gap-3">
          <Link
            href={"?"}
            className={`p-2 px-4 capitalize font-semibold rounded-md 
            ${styleForNoCategorySelected}`}
          >
            Todos
          </Link>
          {!!categories &&
            categories?.map((category) => {
              const selected = categoryNameSelected === category.name;
              const styleSelected = selected
                ? `bg-gray-700 text-white shadow-xl`
                : `bg-white text-gray-700 `;
              return (
                <Link
                href={`?category=${category.name}`}
                  className={`p-2 px-4 capitalize font-semibold rounded-md
                transition-all items-center flex
                ${styleSelected}`}
                >
                  {category.name}
                </Link>
              );
            })}
        </div>

        <div className="flex flex-wrap gap-3 p-5">
          {products?.map((product, index: number) => {
            return <ProductPreview product={product} index={index} />;
          })}
        </div>
      </section>
    </>
  );
}
