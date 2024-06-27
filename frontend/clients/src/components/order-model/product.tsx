"use client";

import { Product } from "@/entities/product";
import { motion } from "framer-motion";
import { IoClose } from "react-icons/io5";
import { ProductsTopics } from "./productsTopic";
import { useCartStore } from "@/states/cart-store";
import { formatToBRL } from "@/utils/format-to-brl";

interface ProductOrderModelProps {
  index: number;
  product: Product;
}

const ProductOrderModel = ({ product, index }: ProductOrderModelProps) => {
  const [removeToCart] = useCartStore((state) => [state.removeToCart]);

  const remove = () => {
    const cartStringfy = localStorage.getItem("cart") || null;
    const cartJSON: Product[] | null = cartStringfy
      ? JSON.parse(cartStringfy)
      : null;

    if (!cartStringfy || !cartJSON?.[0]?.id) return;

    const newItems = cartJSON.filter(
      (productCurrent) => productCurrent.id !== product.id
    );

    removeToCart(product.id);
    localStorage.setItem("cart", JSON.stringify(newItems));
  };

  return (
    <motion.div
      key={index}
      initial={{ opacity: 0 }}
      animate={{ opacity: 1 }}
      transition={{ delay: 0.2 * (index + 1) }}
      className="w-full p-3 bg-white rounded hover:shadow opacity-95 hover:opacity-100 gap-2 flex flex-col relative"
    >
      <span className="w-full top-[-0.5rem] h-[0.5rem] left-[50%] translate-x-[-50%] bg-gray-600 absolute
      rounded-t-full"/>

      <div className="font-semibold text-gray-600 flex justify-between items-center text-xl">
        <span className="flex-[2]">{product.name}</span>
        <span className="flex-1 text-green-700">{formatToBRL(Number(product.price))}</span>
        <button
          type="button"
          onClick={remove}
          className="w-8 h-8 bg-gray-50 rounded grid place-items-center hover:shadow
          hover:bg-rose-600 hover:text-white"
        >
          <IoClose />
        </button>
      </div>

      <div className="flex flex-col bg-gray-50 bg-opacity-40 p-2 rounded shadow-inner">
        {!product?.productTopics?.length && (
          <div className="w-full p-2 font-semibold text-gray-400 text-sm">
            Nenhum opção disponível
          </div>
        )}
        {product?.productTopics?.map((productTopic, index: number) => (
          <ProductsTopics productTopic={productTopic} key={index} />
        ))}
      </div>

      <footer>
        
      </footer>
    </motion.div>
  );
};

export { ProductOrderModel };
