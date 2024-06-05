"use client";

import { api } from "@/api";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/constants";
import { Product } from "@/entities/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos, IoMdPricetag } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { z } from "zod";

type ParamProps = {
  [key: string]: string;
};

const schemaUpdateProduct = z.object({
  photo: z.unknown().transform((value) => value as FileList | undefined),
  name: z.string().min(3, "o mínimo para o nome do produto é 3 caracteres"),
  quantity: z.number().default(0),
  price: z
    .string()
    .min(1, "Você deve colocar um valor acima de R$ 0,00")
    .max(7, "O máximo é 9999.99"),
  description: z.string(),
});

type UpdateProductProps = z.infer<typeof schemaUpdateProduct>;

const useProduct = (productId: string) => {
  const { data: product, isLoading } = useQuery<Product>({
    queryKey: ["products", productId],
    queryFn: async () => {
      return (await api.get(`/products/${productId}`)).data;
    },
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  const updateProduct = async (body: UpdateProductProps) => {
    const formData = new FormData();

    for (const [nameField, valueField] of Object.entries(body)) {
      if (typeof valueField === "number") {
        formData.append(nameField, valueField.toString());
      } 
      
      else if (valueField instanceof FileList) {
        Array.from(valueField).forEach((file) => {
          formData.append(nameField, file);
        });
      } 
      
      else formData.append(nameField, valueField);
    }

    const response = await api.patch<{ url: string }>("/products", formData);

    setImagePreview(() => {
      const url = NEXT_PUBLIC_BACKEND_URL;
      const image = response.data.url;

      return `${url}${image}`
    });
  };

  const { register, handleSubmit, formState, reset } =
    useForm<UpdateProductProps>({
      resolver: zodResolver(schemaUpdateProduct),
    });

  React.useEffect(() => {
    if (product) {
      reset({
        name: product.name,
        price: product.price,
        description: product.description,
      });
    }
  }, [product, reset]);

  return {
    isLoading,
    imagePreview,
    updateProduct,
    form: {
      register,
      handleSubmit,
      formState,
    },
  };
};

export default function ProductUpdate() {
  const params: ParamProps = useParams();
  const productId: string | null = params.productId || null;

  if (!productId) {
    throw new Error(
      "Houve um erro ao tentar encontrar o id do produto solicitado!"
    );
  }

  const { form, imagePreview, isLoading, updateProduct } =
    useProduct(productId);
  const { register, handleSubmit, formState } = form;

  if (isLoading) return;

  return (
    <form
      className="w-full h-auto p-10 bg-white m-auto
      rounded-2xl flex flex-col gap-3 "
      onSubmit={handleSubmit(updateProduct)}
    >
      <section className="flex flex-col w-full gap-3 mt-2">
        <label htmlFor="photo" className="flex gap-1 w-full">
          <div className="w-[10rem] h-[10rem] bg-zinc-100 rounde relative">
            {imagePreview && <Image alt="" src={imagePreview} width={400} height={400}/>}
          </div>

          <div className="flex flex-col gap-2 flex-1">
            <span className="flex items-center w-full gap-2 font-semibold text-gray-500 text-md dark:text-gray-300">
              <IoMdPhotos size={17} />
              Foto
            </span>
            <input
              {...register("photo")}
              type="file"
              className="p-2 transparent border-2 border-transparent 
            rounded-md outline-none focus:border-orange-500 bg-gray-100
            dark:bg-zinc-700 dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
            {formState?.errors?.photo && (
              <div className="font-semibold text-red-500">
                {formState?.errors?.name?.message}
              </div>
            )}
          </div>
        </label>

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

      <footer className="flex">
        <button
          type="submit"
          className="p-2 px-4 text-white
            rounded-md opacity-95 hover:opacity-100 
            bg-gradient-45 from-orange-500 
            to-rose-500 hover:shadow-xl"
        >
          Atualizar
        </button>
      </footer>
    </form>
  );
}
