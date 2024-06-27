"use client";

import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { motion } from "framer-motion";
import { z } from "zod";
import { useForm } from "react-hook-form";
import { zodResolver } from "@hookform/resolvers/zod";
import { useFormState } from "react-dom";
import { api } from "@/api";
import { toast } from "react-toastify";
import { QueryClient } from "@tanstack/react-query";
import { queryClient } from "@/providers/query-client";
import { Product } from "@/entities/product";
import { useRouter } from "next/navigation";

const schemaCreateProduct = z.object({
  name: z.string().min(3, "o mínimo para o nome do produto é 3 caracteres"),
  price: z
    .string()
    .min(1, "Você deve colocar um valor acima de R$ 0,00")
    .max(7, "O máximo é 9999.99"),
  description: z.string(),
});

type CreateProductProps = z.infer<typeof schemaCreateProduct>;

const useCreateProduct = () => {
  const { register, handleSubmit, formState } = useForm<CreateProductProps>({
    resolver: zodResolver(schemaCreateProduct),
  });

  const router = useRouter();

  const createProduct = async (dataProduct: CreateProductProps) => {
    try {
      const responseApi = api.post("/products", dataProduct);

      const createdProduct: Product =
        (await (
          await toast.promise(responseApi, {
            pending: "Carregando...",
            success: "Criado com sucesso!",
            error: "Houve um erro, tente novamente mais tarde!",
          })
        )?.data) || {};

      queryClient.setQueriesData(
        { queryKey: ["products"] },
        (prev: Product[] | undefined) => {
          return [...(prev || []), createdProduct];
        }
      );
      
      router.push('?')
    } catch (error) {}
  };

  return {
    register,
    createProduct,
    handleSubmit,
    formState,
  };
};

function ProductsCreateModel() {
  const { register, handleSubmit, createProduct, formState } =
    useCreateProduct();

  return (
    <form
      onSubmit={handleSubmit(createProduct)}
      className="w-full h-screen overflow-auto bg-zinc-950 
      fixed left-0 z-50 bg-opacity-40 backdrop-blur-[2px]
      flex p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="m-auto w-full max-w-[28rem] flex flex-col
        bg-gray-100 p-10 rounded-xl shadow gap-3 dark:bg-zinc-800"
      >
        <header className="flex items-center justify-between w-full text-xl font-semibold">
          <h1 className="text-transparent bg-clip-text bg-gradient-45 from-orange-500 to-red-500">
            Criar uma novo produto.
          </h1>
          <Link
            href={"/products"}
            className="p-3 bg-white rounded-full dark:bg-zinc-700 hover:opacity-100 opacity-90 hover:shadow"
          >
            <IoClose />
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
              className="p-2 bg-white border-2 border-transparent rounded-md shadow outline-none focus:border-orange-500 dark:bg-zinc-700 dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
            {formState?.errors?.name && (
              <div className="font-semibold text-red-500">
                {formState?.errors?.name?.message}
              </div>
            )}
          </label>

          <label htmlFor="name" className="flex flex-col gap-1">
            <span className="flex items-center w-full gap-2 font-semibold text-gray-500 text-md dark:text-gray-300">
              <IoMdPricetag size={17} />
              Preço
            </span>
            <input
              {...register("price")}
              maxLength={7}
              type="text"
              placeholder="19.90"
              className="p-2 bg-white border-2 border-transparent rounded-md shadow outline-none resize-none focus:border-orange-500 dark:bg-zinc-700 dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
            {formState?.errors?.price && (
              <div className="font-semibold text-red-500">
                {formState?.errors?.price?.message}
              </div>
            )}
          </label>

          <label htmlFor="name" className="flex flex-col gap-1">
            <span className="flex items-center w-full gap-2 font-semibold text-gray-500 text-md dark:text-gray-300">
              <VscListFlat size={17} />
              Descrição
            </span>
            <textarea
              {...register("description")}
              placeholder="Produto01"
              className="bg-white outline-none resize-none
              p-2 rounded-md border-2 border-transparent
              focus:border-orange-500 shadow h-[10rem] dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
          </label>
        </section>
        <footer className="w-full">
          <button
            type="submit"
            className="w-full p-2 text-white rounded-md opacity-95 hover:opacity-100 bg-gradient-45 from-orange-500 to-rose-500 hover:shadow-xl"
          >
            Criar
          </button>
        </footer>
      </motion.div>
    </form>
  );
}

export { ProductsCreateModel };
