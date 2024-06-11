"use client";

import { api } from "@/api";
import { NEXT_PUBLIC_BACKEND_URL } from "@/config/constants";
import { Product } from "@/entities/product";
import { zodResolver } from "@hookform/resolvers/zod";
import { useQuery } from "@tanstack/react-query";
import Image from "next/image";
import { useParams, useSearchParams } from "next/navigation";
import React, { useState } from "react";
import { useForm } from "react-hook-form";
import { IoMdPhotos, IoMdPricetag } from "react-icons/io";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { AnimatePresence, motion } from "framer-motion";
import { z } from "zod";
import Link from "next/link";
import { IoClose } from "react-icons/io5";

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

  const { register, handleSubmit, formState, reset } =
  useForm<UpdateProductProps>({
    resolver: zodResolver(schemaUpdateProduct),
  });

  const [imagePreview, setImagePreview] = useState<string | null>(null);

  // This function is used to update the product
  // The use of if and else should be refactored
  const updateProduct = async (body: UpdateProductProps) => {
    const form = new FormData();

    form.append("name", body.name);
    form.append("description", body.description);
    form.append("quantity", body.quantity.toString());
    form.append("price", body.price);

    // se tiver, vou atualizar a foto diretamente.

    if(body.photo) {
      form.append("photo", body.photo[0]);
    }

    if(product?.photo) {
      form.append("photo", product?.photo);
    }
    
    else {
     form.append("photo", "");
    }
    

    
    const response = await api.patch(
      `/products/${productId}`,
      form
      );

    console.log(response);
      
      /*   for (const [nameField, valueField] of Object.entries(body)) {
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
         */

    /* setImagePreview(() => {
      const url = NEXT_PUBLIC_BACKEND_URL;
      const image = response.data.url;

      return `${url}${image}`;
    }); */
  };

  // This function is used to reset the default values
  // (coming from the backend) of the inputs
  const resetValuesToDefault = () => {
    if(!product) return;

    reset({
      name: product.name,
      price: product.price,
      description: product.description,
    })
  };

  // When starting the page, set the values to default
  React.useEffect(() => {
    resetValuesToDefault()
  }, [product, reset]);

  return {
    product,
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
  const searchParams = useSearchParams();

  const productId: string | null = params.productId || null;
  const model: boolean = !!(searchParams.get("model") === "update");

  if (!productId) {
    throw new Error(
      "Houve um erro ao tentar encontrar o id do produto solicitado!"
    );
  }

  const { product, form, isLoading, updateProduct } =
    useProduct(productId);
  const { register, handleSubmit, formState } = form;

  const IMAGE_URL = NEXT_PUBLIC_BACKEND_URL

  const imagePreview = product?.photo ? 
  `${IMAGE_URL}/uploads/products/${product?.photo}` : null

  if (isLoading) return;

  return (
    <AnimatePresence>
      {model && (
        <motion.div
          initial={{ opacity: 0 }}
          animate={{ opacity: 1 }}
          exit={{ opacity: 0 }}
          transition={{ duration: 0.8, type: 'spring'}}
          className="fixed top-0 left-0 z-20 shadow-xl overflow-auto
          bg-zinc-800 w-full h-screen flex bg-opacity-50 dark:shadow-black"
        >
          <motion.form
            initial={{ y: 50 }}
            animate={{ y: 0 }}
            exit={{ y: -50 }}
            transition={{ duration: 0.8, type: 'spring'}}
            className="w-full max-w-[45rem] h-auto m-auto shadow-2xl
              rounded-2xl flex flex-col gap-3 bg-white p-10 dark:bg-zinc-800
              border border-transparent dark:border-zinc-700"
            onSubmit={handleSubmit(updateProduct)}
          >
            <header className="w-full p-y flex justify-between items-center">
              <h1 className="font-semibold text-orange-600 text-lg">
                Editar produto {product?.name}
              </h1>

              <Link
                href={"?"}
                className="p-3 bg-white rounded-full dark:bg-zinc-700 
                hover:opacity-100 opacity-90 hover:shadow"
              >
                <IoClose />
              </Link>
            </header>

            <section className="flex flex-col w-full gap-3 mt-2">
              <label htmlFor="photo" className="flex gap-1 w-full">
                <div
                  className="w-[10rem] h-[10rem] bg-zinc-100 
                  rounded relative overflow-auto
                  dark:bg-zinc-700"
                >
                  {imagePreview && (
                    <Image
                    quality={25}
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

                <div className="flex flex-col gap-2 flex-1">
                  <span
                    className="flex items-center w-full gap-2 font-semibold 
                  text-gray-500 text-md dark:text-gray-300"
                  >
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
                <span
                  className="flex items-center w-full gap-2 font-semibold 
                  text-gray-500 text-md dark:text-gray-300"
                >
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
          </motion.form>
        </motion.div>
      )}
    </AnimatePresence>
  );
}
