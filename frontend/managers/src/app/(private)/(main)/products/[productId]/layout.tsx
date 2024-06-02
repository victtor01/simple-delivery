"use client";

import { fontInter } from "@/fonts";
import { usePathname } from "next/navigation";
import { IoArrowBack } from "react-icons/io5";
import Link from "next/link";

interface LayoutProps {
  children: React.ReactNode;
  params: {
    productId: string;
  };
}

type LinkProduct = {
  [key: string]: { link?: string | null };
};

const linksProducts = {
  ["informações"]: { link: null },
  ["atualizar"]: { link: "update" },
  ["pedidos"]: { link: "orders" },
} satisfies LinkProduct;

export default function Layout({ children, params }: LayoutProps) {
  const pathName = usePathname();

  return (
    <>
      <header className="flex items-center justify-between w-full p-2 bg-white border-b">
        <Link
          href="/products"
          className={`flex items-center gap-2 p-1 px-3 
          font-semibold text-orange-500 rounded hover:bg-gray-100
          ${fontInter}`}
        >
          <IoArrowBack size={18} />
          Produtos
        </Link>

        <h1 className="px-2 font-semibold text-gray-500">
          Informações sobre o produto
        </h1>
      </header>

      <section
        className="flex mx-auto bg-white w-full max-w-[60rem]
        flex-col rounded-b-xl shadow overflow-hidden"
      >
        <header
          className="w-full flex gap-3 items-center bg-gray-800 relative
        p-2 before:content-[''] before:absolute before:w-[2rem] before:h-[2rem]
        before:bottom-[-1rem] before:right-[2rem] before:bg-gray-800 before:rotate-[45deg]"
        >
          {Object.entries(linksProducts).map(
            ([name, { link }], index: number) => {
              const href = !!link
                ? `/products/${params.productId}/${link}`
                : `/products/${params.productId}`;

              const selectedLink = pathName === href;
              const caseClassName = selectedLink
                ? "opacity-100 text-orange-500"
                : "bg-transparent text-gray-300 opacity-90";

              return (
                <Link
                  key={index}
                  href={href}
                  className={`p-2 font-semibold transition-all capitalize
                    hover:opacity-100 rounded whitespace-nowrap
                    ${caseClassName}`}
                >
                  {name}
                </Link>
              );
            }
          )}
        </header>

        <section
          className="w-full flex 
          flex-col gap-3 p-3"
        >
          {children}
        </section>
      </section>
    </>
  );
}