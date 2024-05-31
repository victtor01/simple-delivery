import Link from "next/link";
import { IoMdPricetag } from "react-icons/io";
import { IoClose } from "react-icons/io5";
import { MdDriveFileRenameOutline } from "react-icons/md";
import { VscListFlat } from "react-icons/vsc";
import { motion } from "framer-motion";

function ProductsCreateModel() {
  return (
    <div
      className="w-full h-screen overflow-auto bg-zinc-950 
      fixed left-0 z-20 bg-opacity-40 backdrop-blur-[2px]
      flex p-4"
    >
      <motion.div
        initial={{ opacity: 0 }}
        animate={{ opacity: 1 }}
        className="m-auto w-full max-w-[28rem] flex flex-col
        bg-gray-100 p-10 rounded-xl shadow gap-3 dark:bg-zinc-800"
      >
        <header
          className="w-full flex font-semibold text-xl
          justify-between items-center"
        >
          <h1
            className="bg-clip-text text-transparent
          bg-gradient-45 from-orange-500 to-red-500"
          >
            Criar uma novo produto.
          </h1>
          <Link
            href={"/products"}
            className="p-3 bg-white rounded-full dark:bg-zinc-700
            hover:opacity-100 opacity-90 hover:shadow"
          >
            <IoClose />
          </Link>
        </header>
        <section className="w-full flex flex-col gap-3 mt-2">
          <label htmlFor="name" className="flex flex-col gap-1">
            <span
              className="w-full text-gray-500 text-md items-center
            flex gap-2 font-semibold dark:text-gray-300"
            >
              <MdDriveFileRenameOutline size={17} />
              Nome
            </span>
            <input
              type="text"
              placeholder="Produto01"
              className="bg-white outline-none
              p-2 rounded-md border-2 border-transparent
              focus:border-orange-500 shadow dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
          </label>
          <label htmlFor="name" className="flex flex-col gap-1">
            <span
              className="w-full text-gray-500 text-md items-center
                flex gap-2 font-semibold dark:text-gray-300"
            >
              <IoMdPricetag size={17} />
              Preço
            </span>
            <input
              maxLength={7}
              type="text"
              placeholder="19.90"
              className="bg-white outline-none resize-none
              p-2 rounded-md border-2 border-transparent
              focus:border-orange-500 shadow dark:bg-zinc-700
              dark:bg-opacity-40 dark:placeholder:text-gray-500"
            />
          </label>
          <label htmlFor="name" className="flex flex-col gap-1">
            <span
              className="w-full text-gray-500 text-md items-center
                flex gap-2 font-semibold dark:text-gray-300"
            >
              <VscListFlat size={17} />
              Descrição
            </span>
            <textarea
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
            className="w-full p-2 opacity-95 hover:opacity-100
            bg-gradient-45 from-orange-500 to-rose-500
            rounded-md text-white hover:shadow-xl"
          >
            Criar
          </button>
        </footer>
      </motion.div>
    </div>
  );
}

export { ProductsCreateModel };
