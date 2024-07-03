"use client";

import { api } from "@/app/api";
import { fontInter, fontOpenSans } from "@/app/fonts";
import { Product } from "@/entities/product";
import { Store } from "@/entities/store";
import { getImageProduct } from "@/hooks/get-image-product";
import { useCartStore } from "@/states/cart-store";
import { formatToBRL } from "@/utils/format-to-brl";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useEffect } from "react";
import { BiCart, BiPlus } from "react-icons/bi";
import { BsArrowRight, BsCart } from "react-icons/bs";
import { IoClose } from "react-icons/io5";
import { toast } from "react-toastify";
import { AnimatePresence, motion } from "framer-motion";
import { useRouter } from "next/navigation";
import { getCartInLocalstorage } from "@/utils/cart-localstorage";

interface Params {
  params: {
    storeId: string;
  };
}

const statusCart = {
  ["remover"]: { style: "bg-rose-600" },
  ["adicionar"]: { style: "bg-gray-800" },
};


function useStore(storeId: string) {
  const [productsInCart, setProductsInCart, removeProductsInCart] =
    useCartStore((state) => [
      state.products,
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

  const router = useRouter();
  const finalizeOrder = async () => router.push("/order");

  const totalPrice = productsInCart?.reduce((acc, product) => {
    return (acc += Number(product.price) || 0);
  }, 0);

  const setProductsInLocalhost = (products: Product[]) =>
    localStorage.setItem("cart", JSON.stringify(products));

  const addOneProductInCart = (product: Product) => {
    setProductsInCart([product]);
    toast.success("Atualizado com sucesso!", {
      toastId: "toast-sucess-product",
    });
  };

  const addProductInCart = (product: Product) => {
    const productsInCartJSON = getCartInLocalstorage() || [];
    const productsToAdd = [...productsInCartJSON, product];
    setProductsInCart(productsToAdd);
    toast.success("Atualizado com sucesso!", {
      toastId: "toast-sucess-product",
    });
  };

  const removeProductInCart = (product: Product) => {
    removeProductsInCart(product.id);
    toast.warn("Produto retirado do carrinho", {
      icon: <BiCart size={20} />,
      toastId: "toast-warn-product",
    });
  };

  const AddOrRemoveProductInCart = (product: Product) => {
    const productsInCartJSON = getCartInLocalstorage() || [];
    if (productsInCartJSON.length > 0) {
      const isProductInCart = productsInCartJSON.some(
        (item) => item.id === product.id
      );
      isProductInCart
        ? removeProductInCart(product)
        : addProductInCart(product);
    } else {
      addOneProductInCart(product);
    }
  };

  useEffect(() => {
    setProductsInLocalhost(productsInCart);
  }, [productsInCart]);

  return {
    store,
    productsInCart,
    finalizeOrder,
    totalPrice,
    AddOrRemoveProductInCart,
  };
}

export default function ({ params }: Params) {
  if (!params.storeId) return;

  const {
    store,
    AddOrRemoveProductInCart,
    finalizeOrder,
    totalPrice,
    productsInCart,
  } = useStore(params.storeId);

  return (
    <section className="w-full">
      <section className="w-full max-w-main mx-auto p-4 gap-3 flex flex-col min-h-[100vh]">
        <header className="text-xl font-semibold text-gray-600 flex gap-3 items-center rounded p-2">
          <BsCart /> Cardápio
        </header>

        <section className="flex w-full gap-4 h-auto relative items-start">
          <div className={`w-full flex gap-10 flex-wrap ${fontInter}`}>
            {store?.products?.map((product: Product) => {
              const image = getImageProduct(product?.photo);
              const includes = !!productsInCart?.some(
                (curr) => curr.id === product.id
              );
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
                      onClick={() => AddOrRemoveProductInCart(product)}
                      className={`w-10 h-10  text-white rounded capitalize flex items-center gap-2
                      opacity-95 hover:opacity-100 hover:shadow-xl font-light text-sm justify-center
                      ${statusCart[text].style}`}
                    >
                      {includes ? <IoClose size={18} /> : <BiPlus size={20} />}
                    </button>
                  </footer>
                </div>
              );
            })}
          </div>

          <div className="flex gap-3 flex-col sticky top-[1rem] h-auto">
            <section className="w-[26rem] bg-white rounded border flex flex-col">
              <header className="border-b p-3 items-center flex justify-between">
                <h1 className="text-xl text-gray-500 font-semibold">
                  Seu pedido
                </h1>
                <div
                  className="text-green-700 bg-green-100 p-1 px-3 rounded
                  border-green-300 border"
                >
                  {formatToBRL(totalPrice)}
                </div>
              </header>

              <div className="flex flex-col overflow-x-hidden h-[18rem]">
                <AnimatePresence>
                  {productsInCart?.map((productInCart) => (
                    <motion.div
                      layout
                      initial={{ opacity: 0, scale: 0 }}
                      animate={{ opacity: 1, scale: 1 }}
                      exit={{ opacity: 0, scale: 0 }}
                      key={productInCart.id}
                      className="flex p-3 font-semibold text-gray-600 items-center
                      justify-between border-b"
                    >
                      <div className="flex flex-[2]">{productInCart.name}</div>
                      <div className="flex flex-1">
                        {formatToBRL(Number(productInCart?.price || 0))}
                      </div>
                      <button
                        type="button"
                        onClick={() => AddOrRemoveProductInCart(productInCart)}
                        className={`w-auto px-3 p-2 text-black rounded capitalize flex items-center gap-2
                        text-sm justify-center opacity-50 hover:opacity-100`}
                      >
                        <IoClose size={20} />
                      </button>
                    </motion.div>
                  ))}
                </AnimatePresence>
              </div>
            </section>

            <footer>
              <button
                className="p-3 bg-gradient-45 from-gray-900 to-zinc-900 w-full justify-center
              opacity-95 hover:opacity-100 rounded items-center flex text-white gap-3 transition-all
              hover:gap-4 capitalize"
                onClick={finalizeOrder}
              >
                Ir para pedido <BsArrowRight size={20} />
              </button>
            </footer>
          </div>
        </section>
      </section>
    </section>
  );
}
