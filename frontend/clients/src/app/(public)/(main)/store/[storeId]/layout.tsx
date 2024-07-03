export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full flex flex-col">
      <header className="w-full p-2 bg-gradient-45 from-zinc-800 to-zinc-900 h-[15rem] relative z-20 shadow-xl ">
        <div className="w-full max-w-main absolute top-[100%] left-[50%] translate-x-[-50%] translate-y-[-50%] mx-5">
          <div
            className="bg-zinc-900 top-[100%] left-[0] w-[7rem] h-[7rem]
            rounded-2xl border border-gray-600"
          />
        </div>
      </header>

      <div className="w-full flex mt-20">
        <div className="w-full px-4 max-w-main mx-auto p-4 flex gap-3">

          <button
            type="button"
            className="bg-white rounded p-2 px-4 text-lg font-semibold text-gray-700
            shadow opacity-90 hover:opacity-100">
            Cardápio
          </button>

          <button
            type="button"
            className="bg-white rounded p-2 px-4 text-lg font-semibold text-gray-700
            shadow opacity-90 hover:opacity-100">
            Sobre a loja
          </button>

          <button
            type="button"
            className="bg-white rounded p-2 px-4 text-lg font-semibold text-gray-700
            shadow opacity-90 hover:opacity-100">
            Comentário e avaliações
          </button>

        </div>
      </div>

      {children}
    </section>
  );
}
