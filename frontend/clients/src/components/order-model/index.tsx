"use client";

import { fontInter } from "@/app/fonts";
import { Product } from "@/entities/product";
import { useCartStore } from "@/states/cart-store";
import { motion } from "framer-motion";
import Link from "next/link";
import { useSearchParams } from "next/navigation";
import { useEffect } from "react";
import { BsArrowRight } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { ProductOrderModel } from "./product";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/app/api";
import { queryClient } from "@/providers/react-query-provider";
import { z } from "zod";
import { useFieldArray, useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";

const schemaOrder = z.array(
  z.object({
    product: z.object({
      id: z.string(),
      name: z.string(),
    }),
    quantity: z.number(),
  })
);

type SchemaOrderData = z.infer<typeof schemaOrder>;

const useOrderModel = () => {
  const [productsInCart, setProductsInCart] = useCartStore((state) => [
    state.products,
    state.AddToCart,
  ]);

  const form = useForm<SchemaOrderData>({
    resolver: zodResolver(schemaOrder),
  });

  const params = useSearchParams();

  const modalVisible = !!(params.get("model") === "cart");

  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["cart"],
    queryFn: async () =>
      (
        await api.post("/products/findByIds", {
          productIds: productsInCart?.map((product) => product.id),
          storeId: productsInCart[0]?.storeId,
        })
      ).data,
/*     enabled: productsInCart?.length > 0, */
  });

  console.log(products)

  /*  const priceProducts = products?.reduce((product, current) => {
    return 0;
  }, 0); */

  const resetValuesInForm = () =>
    form.reset([
      ...productsInCart?.map((product) => ({
        quantity: 0,
        products: {
          id: product.id,
          name: product.name,
        },
      })),
    ]);

  useEffect(() => {
    resetValuesInForm()
  },[productsInCart])

  useEffect(() => {
    const cartStringfy = localStorage.getItem("cart") || null;
    const cartJSON: Product[] | null = cartStringfy
      ? JSON.parse(cartStringfy)
      : null;

    if (!cartStringfy || !cartJSON?.[0]?.id) return;

    setProductsInCart([...cartJSON]);
  }, []);

  useEffect(() => {
    queryClient.setQueryData(["cart"], () => {
      if (productsInCart.length === 0) return [];

      return [...productsInCart];
    });
  }, [productsInCart]);

  return {
    modalVisible,
    productsInCart,
    isLoading,
    form,
    products,
  };
};

const MainContainer = ({ children }: { children: React.ReactNode }) => (
  <motion.div
    className="fixed w-full h-screen overflow-auto overflow-x-hidden bg-black z-50 bg-opacity-50
    justify-end flex backdrop-blur-sm"
  >
    <motion.div
      className="w-full max-w-[30rem] bg-gray-100 h-screen overflow-auto right-0 shadow-xl shadow-black-400
      flex flex-col relative"
      initial={{ x: 1000 }}
      animate={{ x: 0 }}
      transition={{ type: "linear" }}
    >
      {children}
    </motion.div>
  </motion.div>
);

const OrderModel = () => {
  const { modalVisible, form, products, isLoading } = useOrderModel();
  if (!modalVisible) return;

  if (isLoading) {
    return (
      <MainContainer>
        <div className="w-auto m-3">Carregando...</div>
      </MainContainer>
    );
  }

  console.log(form.getValues())

  console.log(products)

  return (
    <MainContainer>
      <header className="w-full p-3 px-5 pb-5 flex flex-col justify-between bg-white border-b">
        <div className="w-auto flex justify-between items-center">
          <h1 className="text-xl font-semibold text-gray-700">
            Informações do pedido!
          </h1>

          <Link
            href={"?"}
            className="w-10 h-10 grid place-items-center bg-white shadow rounded-full"
          >
            <IoClose />
          </Link>
        </div>
        <p className="text-gray-400 font-sm w-[70%]">
          Note que você só deve fazer um pedido por loja!
        </p>
      </header>

      <section className="flex flex-1 flex-col p-5 gap-7">
        {!products?.length && (
          <div className="p-2 font-semibold text-gray-600">
            Nenhum produto no seu pedido!
          </div>
        )}

        {products?.map((product, index: number) => {
          return (
            <ProductOrderModel key={index} index={index} product={product} />
          );
        })}
      </section>

      <footer className="flex flex-col gap-4 p-4 w-full bg-white border rounded-t-lg">
        <div className={`w-full flex flex-col gap-2 text-lg ${fontInter}`}>
          <div className="flex gap-3 items-center">
            <span className="text-gray-500 flex-1">Valor total:</span>
            <div className="font-semibold text-gray-600 px-4 rounded p-1">
              R$ 38,40
            </div>
          </div>

          <div className="flex gap-3 items-center">
            <span className="text-gray-500 flex-1">Quantidade de items:</span>
            <div className="font-semibold text-gray-600 px-4 rounded p-1">
              18
            </div>
          </div>
        </div>

        <button
          className="w-full p-3 bg-gradient-45 from-orange-600 to-red-600 rounded
            text-white opacity-90 hover:opacity-100 flex justify-center items-center gap-4
            hover:gap-6 transition-all"
        >
          Seguir
          <BsArrowRight size={20} />
        </button>
      </footer>
    </MainContainer>
  );
};

export { OrderModel };
