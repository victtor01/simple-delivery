"use client";

import { useQuery } from "@tanstack/react-query";
import { Product } from "@/entities/product";
import { api } from "@/api";
import { VscListFlat } from "react-icons/vsc";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { IoMdCart, IoMdPricetag } from "react-icons/io";
import { getImageProduct } from "@/utils/getImageProduct";
import Image from "next/image";
import { FaArrowTrendUp } from "react-icons/fa6";
import { ProductTopic } from "@/entities/product-topic";
import { PiPlus } from "react-icons/pi";
import { Category } from "@/entities/category";

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
  const imagePreview = getImageProduct(product?.photo);

  return (
    <div className="flex flex-col gap-4 rounded-xl">
      <div className="flex gap-3 px-8 pt-8">
        <div
          className="w-[10rem] h-[10rem] 
          bg-gray-50 rounded-md
          grid place-items-center dark:bg-zinc-700 dark:bg-opacity-40
          relative overflow-hidden"
        >
          {imagePreview && (
            <Image
              quality={20}
              alt="imagem do produto"
              src={imagePreview}
              style={{ objectFit: "cover" }}
              layout="fill"
              sizes="(max-width: 768px) 2rem,
                      (max-width: 1200px) 2rem,
                      33vw"
            />
          )}
        </div>

        <div
          className="flex flex-col bg-gray-50
          p-2 px-3 rounded-lg flex-1 dark:bg-zinc-700 
          dark:bg-opacity-40"
        >
          <span
            className="text-gray-500 font-semibold flex items-center gap-3
          dark:text-gray-300"
          >
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
        flex-wrap gap-3 *:whitespace-nowrap px-8"
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

      <section
        className="flex flex-col gap-3
        dark:border-zinc-700 border-t mt-5 relative"
      >
        <div className="absolute top-0 left-[2rem] translate-y-[-50%]">
          <span
            className="rounded-md bg-gray-700 text-white
          p-1 px-2 text-sm"
          >
            Categories
          </span>
        </div>

        <div className="flex p-8">
          {product?.categories?.map((category: Category) => (
            <div className="flex gap-1 w-auto shadow bg-gray-100 p-2 px-4 border
            rounded-lg dark:bg-zinc-700">
              <div
                className="font-semibold text-xl
                text-gray-600 dark:text-gray-200"
              >
                {category.name}
              </div>
            </div>
          ))}
        </div>
      </section>

      <section
        className="flex flex-col gap-3
        dark:border-zinc-700 border-t mt-5 relative"
      >
        <div className="absolute top-0 left-[2rem] translate-y-[-50%]">
          <span
            className="rounded-md bg-gray-700 text-white
          p-1 px-2 text-sm"
          >
            Tópicos
          </span>
        </div>

        <div className="flex flex-col p-8">
          {product?.productTopics?.map((topic: ProductTopic) => (
            <div className="flex flex-col gap-1 w-auto">
              <header className="flex justify-between w-auto items-center">
                <h1
                  className="font-semibold text-xl
                text-gray-600 dark:text-gray-200"
                >
                  {topic.name}
                </h1>
              </header>
            </div>
          ))}
        </div>
      </section>

      <footer
        className="w-full mt-5 border-t p-8 px-8 dark:border-gray-700
      relative"
      >
        <div className="absolute top-0 left-[2rem] translate-y-[-50%]">
          <span
            className="rounded-md bg-gray-700 text-white
            p-1 px-2 text-sm"
          >
            Outras opções
          </span>
        </div>

        <button
          className="flex items-center gap-3
          p-2 px-3 bg-gradient-to-r from-orange-600 to-red-600 rounded text-gray-200
          opacity-90 hover:opacity-100"
        >
          <FaArrowTrendUp />
          Pedidos recentes
        </button>
      </footer>
    </div>
  );
}
