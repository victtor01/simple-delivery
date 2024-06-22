"use client";

import { api } from "@/api";
import { Product } from "@/entities/product";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { ProductsCreateModel } from "./products-create-model";
import ProductPreview from "@/components/product-preview";
import { useCategories } from "@/hooks/useCategories";
import { ProductsHeader } from "./products-header";

type Model = "create" | null;

const DEFAULT_CATEGORY_NAME = "all";

const useProducts = () => {
  const searchParams = useSearchParams();
  const modelState: Model = searchParams.get("model") as Model;
  const categoryNameSelected: string =
    searchParams.get("category") || DEFAULT_CATEGORY_NAME;

  const { data: products } = useQuery<Product[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return (await api.get(`/products`)).data || [];
    },
  });

  return {
    products,
    modelState,
    categoryNameSelected,
  };
};

export default function Products() {
  const { products, modelState, categoryNameSelected } = useProducts();
  const { data: categories } = useCategories().getCategories();
  
  const styleForNoCategorySelected = categoryNameSelected === DEFAULT_CATEGORY_NAME
  ? `bg-gray-700 text-white shadow-xl`
  : `bg-white text-gray-700`;

  return (
    <>
      {modelState === "create" && <ProductsCreateModel />}

      <section className="flex flex-col w-full h-auto">
        
        <ProductsHeader/>

        <div className="w-full p-2 flex gap-3">
          <Link
            href={'?'}
            className={`p-3 px-5 capitalize font-semibold rounded-md 
            ${styleForNoCategorySelected}`}
          >
            Todos
          </Link>
          {!!categories && categories?.map((category) => {
            const selected = categoryNameSelected === category.name;
            const styleSelected = selected
              ? `bg-gray-700 text-white shadow-xl`
              : `bg-white text-gray-700 `;
            return (
              <Link
                href={`?category=${category.name}`}
                className={`p-2 px-4 capitalize font-semibold rounded-md shadow
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
