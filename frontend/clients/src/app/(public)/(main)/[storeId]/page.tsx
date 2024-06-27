"use client";

import { api } from "@/app/api";
import { fontInter, fontOpenSans } from "@/app/fonts";
import { Product } from "@/entities/product";
import { Store } from "@/entities/store";
import { getImageProduct } from "@/hooks/get-image-product";
import { queryClient } from "@/providers/react-query-provider";
import { useCartStore } from "@/states/cart-store";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect, useState } from "react";
import { BiCart } from "react-icons/bi";
import { BsCart } from "react-icons/bs";
import { IoCheckmark, IoClose } from "react-icons/io5";
import { toast } from "react-toastify";

interface Params {
  params: {
    storeId: string;
  };
}

const statusCart = {
  ["remover"]: { style: "bg-orange-600" },
  ["adicionar"]: { style: "bg-gray-800" },
};

const getCartInLocalstorage = () => {
  const productsInCart = localStorage.getItem("cart") || null;
  const productsInCartJSON: Product[] | null = productsInCart
    ? JSON.parse(productsInCart)
    : null;

  return productsInCartJSON;
};

const useStore = (storeId: string) => {
  const [productsIncludes, setProductsIncludes] = useState<string[] | null>(
    null
  );

  const [setProductsInCart, removeProductsInCart] = useCartStore((state) => [
    state.AddToCart,
    state.removeToCart,
  ]);

  const { data: store } = useQuery<Store>({
    queryKey: ["product", storeId],
    queryFn: async () => {
      if (!storeId) return null;
      return (await api.get(`/stores/${storeId}`)).data || null;
    },
  });

  const setIdsOfProductsSelected = (cart: Product[]) => {
    localStorage.setItem("cart", JSON.stringify(cart));

    setProductsIncludes(cart.map((product) => product.id));
  };

  const addOneProductInCart = (product: Product) => {
    setIdsOfProductsSelected([product]);
    setProductsInCart([product]);

    toast.success("Atualizado com sucesso!", {
      toastId: "toast-sucess-product",
    });
  };

  const addProductInCart = (product: Product) => {
    const productsInCartJSON = getCartInLocalstorage() || [];

    setIdsOfProductsSelected([...productsInCartJSON, product]);
    setProductsInCart([...productsInCartJSON, product]);
    toast.success("Atualizado com sucesso!", {
      toastId: "toast-sucess-product",
    });
  };

  const removeProductInCart = (product: Product) => {
    const productsInCartJSON = getCartInLocalstorage() || [];

    const functionToRemove = (item: any) => item.id !== product.id;
    const functionToFilterIdProduct = (item: Product) => item.id === product.id;

    const newProductsToCart = productsInCartJSON.filter(functionToRemove);
    const idToRemoveInCart =
      productsInCartJSON.filter(functionToFilterIdProduct)?.[0] || null;

    if (idToRemoveInCart?.id) removeProductsInCart(idToRemoveInCart.id);

    // remove product
    setIdsOfProductsSelected(newProductsToCart);

    toast.warn("Produto retirado do carrinho", {
      icon: <BiCart size={20} />,
      toastId: "toast-warn-product",
    });
  };

  const AddOrRemoveProductInCart = (product: Product) => {
    const productsInCartJSON = getCartInLocalstorage() || [];

    if (productsInCartJSON.length === 0) {
      addOneProductInCart(product);
      return;
    }

    const isProductInCart = productsInCartJSON.some(
      (item) => item.id === product.id
    );

    isProductInCart ? removeProductInCart(product) : addProductInCart(product);
  };

  useEffect(() => {
    const cartInStorage = getCartInLocalstorage();
    if (!cartInStorage?.[0]) return;
    setProductsIncludes(cartInStorage?.map((product) => product.id));
  }, []);

  return {
    store,
    productsIncludes,
    addProductToCart: AddOrRemoveProductInCart,
  };
};

export default function ({ params }: Params) {
  if (!params.storeId) return;

  const { store, productsIncludes, addProductToCart } = useStore(
    params.storeId
  );

  return (
    <section className="w-full">
      <header className="w-full p-2 bg-gradient-45 from-orange-500 to-rose-600 h-[15rem] relative z-20 shadow-xl ">
        <div className="w-full max-w-main absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] mx-5">
          <div
            className="bg-gray-800 top-[100%] left-[0] w-[7rem] h-[7rem]
            rounded-2xl"
          />
        </div>
      </header>

      <section className="w-full max-w-main mx-auto p-4 gap-3 flex flex-col mt-[6rem] min-h-[100vh]">
        <header className="text-xl font-semibold text-gray-600 flex gap-3 items-center rounded p-2">
          <BsCart /> Cardápio
        </header>

        <section className="flex w-full gap-4 h-auto relative items-start">
          <div className={`w-full flex gap-10 flex-wrap ${fontInter}`}>
            {store?.products?.map((product: Product) => {
              const image = getImageProduct(product?.photo);
              const includes = !!productsIncludes?.includes(product.id);
              const text = includes ? "remover" : "adicionar";

              return (
                <div
                  key={product.id}
                  style={{
                    opacity: product.quantity === 0 ? 0.5 : 1,
                    pointerEvents: product.quantity === 0 ? "none" : "all",
                  }}
                  className="w-full max-w-[18rem] bg-white shadow rounded-lg relative hover:shadow-xl
              flex flex-col"
                >
                  <div
                    className="w-full h-[10rem] bg-gradient-45 from-orange-500 to-rose-600
                  rounded-t-lg overflow-hidden relative"
                  >
                    {image && (
                      <Image
                        quality={20}
                        alt="imagem do produto"
                        src={image}
                        style={{ objectFit: "cover" }}
                        layout="fill"
                        sizes="(max-width: 768px) 2rem,
                      (max-width: 1200px) 2rem,
                      33vw"
                      />
                    )}
                  </div>

                  <div className="p-3 capitalize h-auto flex flex-col flex-1">
                    <div className="flex w-full justify-between">
                      <span className="font-semibold text-gray-600">
                        {product?.name}
                      </span>
                      <span className="p-1 px-2 text-xs bg-green-100 rounded text-green-800">
                        R$ {product.price}
                      </span>
                    </div>
                    <div className="font-normal text-gray-400 max-h-[3rem] flex-1 rounded overflow-auto text-sm">
                      {product?.description || "Sem descrição"}
                    </div>
                  </div>

                  <footer className="p-2 pt-0">
                    <button
                      type="button"
                      onClick={() => addProductToCart(product)}
                      className={`p-2 px-4 text-white rounded capitalize flex items-center gap-2
                      opacity-95 hover:opacity-100 hover:shadow-xl font-light text-sm
                      ${statusCart[text].style}`}
                    >
                      {includes ? <IoClose /> : <BsCart />}
                      {text}
                    </button>
                  </footer>
                </div>
              );
            })}
          </div>

          <div className="flex flex-col sticky gap-4 top-[1rem] h-auto">
            <div className="w-[25rem] h-[20rem] bg-white rounded-lg shadow flex flex-col gap-4">
              <header className="border-b p-3 items-center flex justify-between">
                <h1 className="text-xl text-gray-500">Seu pedido</h1>
              </header>
            </div>

            <footer>
              <button className="p-3 bg-gradient-45 from-orange-600 to-red-600 rounded w-full
              opacity-90 hover:opacity-100">
                <span className="text-white">Finalizar pedido</span>
              </button>
            </footer>
          </div>
        </section>
      </section>
    </section>
  );
}
