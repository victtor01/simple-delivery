'use client';

import { LuLayoutDashboard } from "react-icons/lu";
import Cookies from "js-cookie";

type Theme = 'light' | 'dark' | null;

const useGeneralAppearance = () => {
  const handleTheme = () => {
    const html = document.getElementsByTagName("html")[0];
    if(!html) return;

    const currentClass: Theme = html.className as Theme;
  
    const newThemeClassName = currentClass === 'light' ? 'dark' : 'light';
    // clear className
    html.className = '';
    // set className theme
    html.className = newThemeClassName;

    // set on cookies
    Cookies.set('_theme', newThemeClassName)
  }

  return {
    handleTheme,
  };
};

const GeneralAppearance = () => {
  const { handleTheme } = useGeneralAppearance();

  return (
    <section className="mx-auto w-full max-w-[60rem] bg-white border">
      <header className="w-full p-4 border-b">
        <h1
          className="font-semibold text-gray-500 flex items-center
        gap-5 text-xl"
        >
          <LuLayoutDashboard />
          Aparência
        </h1>
      </header>

      <div className="w-full block p-4">
        <div className="">
          <h1
            className="font-semibold text-lg
            text-gray-800"
          >
            Modo dark
          </h1>
        </div>

        <button
        type="button"
        className=""
        onClick={handleTheme}>
          Mudar
        </button>
      </div>
    </section>
  );
};

export { GeneralAppearance };
