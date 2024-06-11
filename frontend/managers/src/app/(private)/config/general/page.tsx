import { LuLayoutDashboard } from "react-icons/lu";
import { GeneralAppearance } from "./general-appearance";

export default function General() {
  return (
    <div className="w-full flex flex-col gap-4">
      <GeneralAppearance />

      <section className="mx-auto w-full max-w-[60rem] bg-white border
      dark:bg-gray-800 dark:border-gray-700">
        <header className="w-full p-4 border-b
        dark:border-gray-700">
          <h1
            className="font-semibold text-gray-500 flex items-center
            gap-5 text-lg dark:text-gray-300"
          >
            <LuLayoutDashboard />
            Aparência
          </h1>
        </header>

        <div className="w-full block p-4"></div>
      </section>
    </div>
  );
}
