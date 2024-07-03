"use client";

import { api } from "@/app/api";
import { Product } from "@/entities/product";
import { ProductTopic } from "@/entities/product-topic";
import { useGetAllProductsByIdsAndStoreId } from "@/hooks/use-products";
import { useCartStore } from "@/states/cart-store";
import { getCartInLocalstorage } from "@/utils/cart-localstorage";
import { formatToBRL } from "@/utils/format-to-brl";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import { useEffect } from "react";
import { Controller, useForm } from "react-hook-form";
import { BiMinus, BiPlus } from "react-icons/bi";
import { z } from "zod";

const schemaProducts = z.object({
  products: z.array(
    z.object({
      productId: z.string(),
      quantity: z.number(),
      options: z.object({
        id: z.string(),
      }),
    })
  ),
});

type SchemaProducts = z.infer<typeof schemaProducts>;

const useOrderProducts = () => {
  const [cart] = useCartStore((state) => [state.products]);

  const form = useForm<SchemaProducts>({
    resolver: zodResolver(schemaProducts),
  });

  const productIds = cart?.map((product) => product.id);
  const storeId = cart?.[0]?.storeId;

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["cart"],
    queryFn: async () =>
      (
        await api.post("/products/findByIds", {
          productIds,
          storeId,
        })
      ).data,
  });

  useEffect(() => {
    if (products?.[0]?.id) {
      form.reset({
        products: [
          ...products.map((product) => ({
            productId: product.id,
            quantity: 1,
          })),
        ],
      });
    }
  }, [products]);

  return {
    form,
    products,
    isLoading,
  };
};

function OrderProducts() {
  const { form, products, isLoading } = useOrderProducts();

  if (isLoading) return <div>Carregando...</div>;

  console.log(form.getValues());

  return (
    <section className="flex flex-col gap-2">
      {products?.map((product, productIndex: number) => {
        return (
          <div className="flex flex-col w-full bg-white">
            <button
              key={product.id}
              className="p-3 border-b flex gap-5 items-center"
            >
              <div className="font-semibold text-gray-700 flex-1 flex">
                {product?.name}
              </div>
              <div className="font-semibold text-gray-700 flex-[3] flex">
                {product.description}
              </div>
              <Controller
                name={`products.${productIndex}.quantity`}
                control={form.control}
                render={({ field }) => (
                  <div className="flex gap-2 items-center">
                    <button
                      type="button"
                      className="w-8 h-8 bg-zinc-50 rounded grid place-items-center border"
                      onClick={() =>
                        field.onChange((prev: number) =>
                          prev > 1 ? prev - 1 : prev
                        )
                      }
                    >
                      <BiMinus />
                    </button>
                    <span className="font-semibold text-gray-500 w-8">
                      {field.value || 1}
                    </span>
                    <button
                      type="button"
                      className="w-8 h-8 bg-orange-500 rounded grid place-items-center text-white"
                      onClick={() => field.onChange((prev: number) => prev + 1)}
                    >
                      <BiPlus />
                    </button>
                  </div>
                )}
              />
              <button
                type="button"
                className="p-1 px-2 text-rose-600 opacity-50 hover:opacity-100 capitalize
                font-semibold"
              >
                retirar
              </button>
            </button>

            <section className="flex flex-col p-3 border-b-[0.6rem] gap-1">
              {!product?.productTopics?.length && (
                <div className="text-lg text-gray-400">
                  Nenhuma opção disponível
                </div>
              )}

              {product?.productTopics?.map((topic: ProductTopic) => (
                <div className="flex flex-col" key={topic.id}>
                  <span className="text-lg font-semibold text-gray-600">
                    {topic.name}
                  </span>

                  {topic?.topicOptions?.map((option) => (
                    <Controller
                      key={option.id}
                      control={form.control}
                      name="products"
                      render={({ field }) => (
                        <div className="flex gap-2 items-center">
                          <input type="checkbox" />
                          <div>{option.name}</div>
                        </div>
                      )}
                    />
                  ))}
                </div>
              ))}
            </section>
          </div>
        );
      })}
    </section>
  );
}

export { OrderProducts };
