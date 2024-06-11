"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/entities/product";
import { api } from "@/api";
import { VscListFlat } from "react-icons/vsc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdCart, IoMdPricetag } from "react-icons/io";

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
    <div className="flex flex-col gap-4 rounded-xl">
      <div className="flex gap-3">
        <div
          className="w-[10rem] h-[10rem] 
          bg-gray-50 rounded-md
          grid place-items-center dark:bg-zinc-700 dark:bg-opacity-40"
        >
          <span
            className="font-semibold 
            text-gray-600 dark:text-gray-300"
          >
            
          </span>
        </div>

        <div
          className="flex flex-col bg-gray-50
          p-2 px-3 rounded-lg flex-1 dark:bg-zinc-700 
          dark:bg-opacity-40"
        >
          <span className="text-gray-500 font-semibold flex items-center gap-3
          dark:text-gray-300">
            <VscListFlat size={17} />
            Descrição
          </span>
          <span
            className="text-lg font-semibold text-zinc-700 
            capitalize dark:text-zinc-100"
          >
            {product?.description || "Sem descrição."}
          </span>
        </div>
      </div>

      <section
        className="grid grid-cols-2 flex-1 h-auto w-full 
        flex-wrap gap-3 *:whitespace-nowrap"
      >
        <div className="flex flex-col gap-1">
          <span
            className="flex items-center w-full gap-2 font-semibold 
            text-gray-500 text-md dark:text-gray-300"
          >
            <MdDriveFileRenameOutline size={17} />
            Nome
          </span>
          <div
            className="transparent outline-none resize-none
              p-2 rounded-md border-2 border-transparent bg-gray-50
              focus:border-orange-500 h-auto dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
          >
            {product?.name}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="flex items-center w-full gap-2 font-semibold 
          text-gray-500 text-md dark:text-gray-300"
          >
            <IoMdCart />
            Quantidade
          </span>
          <div
            className="transparent outline-none resize-none
              p-2 rounded-md border-2 border-transparent bg-gray-50
              focus:border-orange-500 h-auto dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
          >
            {product?.quantity}
          </div>
        </div>

        <div className="flex flex-col gap-1">
          <span
            className="flex items-center w-full gap-2 font-semibold 
          text-gray-500 text-md dark:text-gray-300"
          >
            <IoMdPricetag size={17} />
            Preço
          </span>
          <div
            className="transparent outline-none resize-none
              p-2 rounded-md border-2 border-transparent bg-gray-50
              focus:border-orange-500 h-auto dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
          >
            R$ {product?.price}
          </div>
        </div>
      </section>
    </div>
  );
}
