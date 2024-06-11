"use client";

import { fontInter } from "@/fonts";
import { usePathname } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";
import ProductUpdate from "./product-update";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    productId: string;
  };
}

export default function Layout({ children, params }: LayoutProps) {
  return (
    <>
      <ProductUpdate/>

      <header
        className="flex items-center justify-between w-full p-2 bg-white border-b
        dark:bg-zinc-800 dark:border-zinc-700"
      >
        <Link
          href="/products"
          className={`flex items-center gap-2 p-1 px-3 
          font-semibold text-orange-500 rounded hover:bg-gray-100
          ${fontInter}`}
        >
          <IoArrowBack size={18} />
          Produtos
        </Link>

        <div className="flex items-center gap-3">
          <Link
            href={"?model=update"}
            className="p-1 px-2 text-gray-500 rounded-md border
            hover:shadow-xl opacity-95 hover:opacity-100
            dark:text-gray-300 dark:border-zinc-600"
          >
            Editar
          </Link>
          <Link
            href={"?model=delete"}
            className="p-1 px-2 text-white rounded-md bg-rose-500
             hover:shadow-xl opacity-95 hover:opacity-100"
          >
            Deletar
          </Link>
        </div>
      </header>

      <section
        className="flex mx-auto bg-white w-full max-w-[50rem]
        flex-col rounded-b-xl border overflow-auto dark:border-zinc-700
        dark:bg-zinc-800 my-auto rounded-xl p-10 gap-4"
      >

        <section
          className="w-full flex 
          flex-col gap-3"
        >
          {children}
        </section>
      </section>
    </>
  );
}
