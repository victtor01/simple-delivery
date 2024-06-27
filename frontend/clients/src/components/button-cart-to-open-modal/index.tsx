"use client";

import { useCartStore } from "@/states/cart-store";
import Link from "next/link";
import { MdOutlineLocalGroceryStore } from "react-icons/md";

const useButtonCartToOpenModal = () => {
  const [productsInCart] = useCartStore((state) => [state.products]);

  return {
    productsInCart,
  };
};

const ButtonCartToOpenModal = () => {
  const { productsInCart } = useButtonCartToOpenModal();

  return (
    <Link
      href={"?model=cart"}
      className="p-4 bg-orange-500 opacity-90 hover:opacity-100 text-white relative"
    >
      <span className="absolute bottom-0 right-0 w-6 h-6 bg-gray-800 grid place-items-center rounded-full text-white
      translate-x-[50%] translate-y-[50%]">
        {productsInCart?.length || 0}
      </span>
      <MdOutlineLocalGroceryStore size="20" />
    </Link>
  );
};

export { ButtonCartToOpenModal };
