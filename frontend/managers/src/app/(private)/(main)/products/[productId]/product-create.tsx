"use client";

import { api } from "@/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { useForm } from "react-hook-form";
import { IoMdPricetag } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { z } from "zod";

interface ProductCreateProps {
  productId: string;
}

const schemaUpdateProduct = z.object({
  name: z.string().min(3, "o mínimo para o nome do produto é 3 caracteres"),
  price: z
    .string()
    .min(1, "Você deve colocar um valor acima de R$ 0,00")
    .max(7, "O máximo é 9999.99"),
  description: z.string(),
});

type UpdateProductProps = z.infer<typeof schemaUpdateProduct>;

const useProduct = (productId: string) => {
  const { register, handleSubmit, formState } = useForm<UpdateProductProps>({
    resolver: zodResolver(schemaUpdateProduct),
  });

  const { data: product } = useQuery({
    queryKey: ["products", productId],
    queryFn: async () => {
      return (await api.get(`/products/${productId}`)).data;
    },
  });

  return {
    product,
    form: {
      register,
      handleSubmit,
      formState,
    },
  };
};

export function ProductCreate({ productId }: ProductCreateProps) {
  const { form, product } = useProduct(productId);
  const { register, handleSubmit, formState } = form;

  return (
    <section
      className="w-full max-w-[30rem] h-auto p-6 bg-white m-auto
      rounded-2xl border flex flex-col gap-3"
    >
      <header className="flex justify-between w-full items-center">
        <div>
          <h1 className="text-gray-600 text-md">
            Detalhes sobre o produto{" "}
            <b className="text-orange-500">{product?.name}</b>
          </h1>
        </div>
        <Link
          href="/products"
          className="w-10 h-10 grid place-items-center
          bg-zinc-100 rounded-full"
        >
          <IoClose size={20} />
        </Link>
      </header>

      <section className="flex flex-col w-full gap-3 mt-2">
        <label htmlFor="name" className="flex flex-col gap-1">
          <span className="flex items-center w-full gap-2 font-semibold text-gray-500 text-md dark:text-gray-300">
            <MdDriveFileRenameOutline size={17} />
            Nome
          </span>
          <input
            {...register("name")}
            type="text"
            placeholder="Produto01"
            className="p-2 transparent border-2 border-transparent 
            rounded-md outline-none focus:border-orange-500 bg-gray-50
            dark:bg-zinc-700 dark:bg-opacity-40 dark:placeholder:text-gray-500"
          />
          {formState?.errors?.name && (
            <div className="font-semibold text-red-500">
              {formState?.errors?.name?.message}
            </div>
          )}
        </label>

        <label htmlFor="name" className="flex flex-col gap-1">
          <span
            className="flex items-center w-full gap-2 font-semibold 
            text-gray-500 text-md dark:text-gray-300"
          >
            <IoMdPricetag size={17} />
            Preço
          </span>
          <input
            {...register("price")}
            maxLength={7}
            type="text"
            placeholder="19.90"
            className="p-2 transparent border-2 border-transparent bg-gray-50
            rounded-md outline-none resize-none focus:border-orange-500 
            dark:bg-zinc-700 dark:bg-opacity-40 dark:placeholder:text-gray-500"
          />
          {formState?.errors?.price && (
            <div className="font-semibold text-red-500">
              {formState?.errors?.price?.message}
            </div>
          )}
        </label>

        <label htmlFor="name" className="flex flex-col gap-1">
          <span
            className="flex items-center w-full gap-2 font-semibold 
          text-gray-500 text-md dark:text-gray-300"
          >
            <VscListFlat size={17} />
            Descrição
          </span>
          <textarea
            {...register("description")}
            placeholder="Produto01"
            className="transparent outline-none resize-none
              p-2 rounded-md border-2 border-transparent bg-gray-50
              focus:border-orange-500 h-[10rem] dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
          />
        </label>
      </section>

      <footer className="w-full">
        <button
          type="submit"
          className="w-full p-2 text-white
            rounded-md opacity-95 hover:opacity-100 
            bg-gradient-45 from-orange-500 
            to-rose-500 hover:shadow-xl"
        >
          Atualizar
        </button>
      </footer>
    </section>
  );
}
