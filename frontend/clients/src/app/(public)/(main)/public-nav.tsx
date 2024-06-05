import Link from "next/link";
import { FaBookmark } from "react-icons/fa";
import { IoSearch } from "react-icons/io5";
import { TbCategoryFilled } from "react-icons/tb";

const Search = () => {
  return (
    <label
      htmlFor="search"
      className="w-full max-w-[18rem] bg-gray-50 flex border rounded overflow-hidden"
    >
      <button
        className="w-12 h-10 grid place-items-center text-black bg-zinc-100 
        opacity-90 hover:opacity-100"
      >
        <IoSearch />
      </button>
      <input
        type="text"
        className="bg-transparent w-full p-1 rounded-r outline-none border 
        border-transparent focus:border-cyan-500"
      />
    </label>
  );
};

const PublicNav = () => {
  return (
    <div className="w-full p-3 bg-white flex shadow-md shadow-blue-50 relative z-20">
      <div className="mx-auto max-w-main w-full flex justify-between items-center">
        <div className="flex gap-6">
          <Link
            className="font-semibold opacity-70 hover:opacity-100 
          flex gap-2 items-center hover:text-orange-500"
            href="/"
          >
            <TbCategoryFilled />
            Categorias
          </Link>
          <Link
            className="font-semibold opacity-70 hover:opacity-100 
          flex gap-2 items-center hover:text-orange-500"
            href="/"
          >
            <FaBookmark />
            Salvos
          </Link>
        </div>
        <div className="gap-3 flex">
          <Search />
        </div>
      </div>
    </div>
  );
};

export { PublicNav };
