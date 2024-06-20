import Link from "next/link";

const ProductsHeader = () => {
  return (
    <header className="flex justify-between w-full p-2 bg-white dark:bg-zinc-800">
      <div className="flex items-center gap-3">
        <h1
          className={`font-semibold bg-gradient-to-r
              text-lg bg-clip-text text-transparent
              from-orange-600 to-orange-600`}
        >
          Todos os produtos
        </h1>
      </div>
      <div className="flex items-center gap-3">
        <input
          type="text"
          placeholder="Pesquisar produto..."
          className="p-1 w-full max-w-[12rem] px-2
              bg-zinc-100 rounded-md border outline-none
              dark:bg-zinc-900 dark:border-zinc-700"
        />
        <button
          className="p-1 px-2 border rounded-md dark:border-zinc-700 text-md 
            opacity-95 hover:opacity-100"
        >
          Filtrar
        </button>
        <Link
          href={"?model=create"}
          className="p-1 px-2 text-white rounded-md bg-gradient-45 from-orange-500 to-rose-500 
              hover:shadow-xl opacity-95 hover:opacity-100"
        >
          Create
        </Link>
      </div>
    </header>
  );
};

export { ProductsHeader }
