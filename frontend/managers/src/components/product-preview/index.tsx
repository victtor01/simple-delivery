import { Product } from "@/interfaces/product";
import { getImageProduct } from "@/utils/getImageProduct";
import Image from "next/image";
import Link from "next/link";

export default function ProductPreview({
  product,
  index,
}: {
  product: Product;
  index: number;
}) {
  const imagePreview = getImageProduct(product?.photo);

  return (
    <Link
      key={index}
      href={`/products/${product.id}`}
      className="w-full max-w-[15rem] flex flex-col
      bg-white h-auto shadow hover:shadow-xl relative 
      rounded-xl dark:bg-zinc-800 dark:shadow-black"
    >
      <span
        className="absolute top-[-0.7rem] right-[-0.7rem]
        w-10 h-10 bg-zinc-700 shadow rounded-full
        grid place-items-center font-semibold
        text-gray-50 z-20"
      >
        {product?.quantity}
      </span>

      <div className="overflow-hidden rounded-xl">
        <div
          className="w-full h-[10rem] bg-gradient-45 
          from-orange-500 to-rose-500 relative"
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

        <div className="flex flex-col w-full p-3 gap-2 overflow-auto">
          <div
            className="flex items-center justify-between gap-2
            font-semibold text-gray-700 dark:text-white capitalize"
          >
            <span>{product?.name}</span>

            <span className="p-1 px-2 text-orange-500 bg-orange-100 rounded-md">
              {product?.price}
            </span>
          </div>

          <div className="text-gray-400">
            {product?.description || "Sem descrição"}
          </div>
        </div>
      </div>
    </Link>
  );
}
