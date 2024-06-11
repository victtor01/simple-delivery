"use client";

import Link from "next/link";
import { usePathname } from "next/navigation";
import { IconType } from "react-icons";
import { FaKey } from "react-icons/fa6";
import { IoArrowBack, IoHome } from "react-icons/io5";

type ILink = {
  [key: string]: { link: string; icon: IconType };
};

const links: ILink = {
  general: { link: "general", icon: IoHome },
  security: { link: "security", icon: FaKey },
};

const ConfigSidebar = () => {
  const pathName = usePathname();

  return (
    <nav
      className="w-full max-w-[16rem] bg-white flex-1
      flex flex-col p-2 dark:bg-gray-900 border-r dark:border-gray-800"
    >
      <header className="flex p-2 justify-between items-center">
        <Link
          href={"/home"}
          className="w-10 h-10 bg-zinc-200 grid 
          place-items-center rounded-full dark:bg-gray-800"
        >
          <IoArrowBack />
        </Link>
        <h1 className="font-semibold text-gray-600 text-lg
        dark:text-gray-100">Configurações</h1>
      </header>

      <section className="w-full flex flex-col gap-3 mt-3">
        {Object.entries(links).map(([name, { link, icon: Icon }]) => {
          const href = `/config/${link}`;

          const selected = pathName === href;
          const classNameSelected = selected
            ? `bg-gray-800 dark:bg-gray-800
            text-white translate-x-[1.5rem] shadow-xl dark:text-white`
            : `bg-zinc-50 dark:bg-gray-900 dark:text-gray-400`;

          return (
            <Link
              href={href}
              key={name}
              className={`p-2 flex bg-gradient-to-r text-md text-gray-500 rounded-md px-3
              capitalize transition-all items-center gap-4
              ${classNameSelected}`}
            >
              <Icon />
              <span className="font-semibold">{name}</span>
            </Link>
          );
        })}
      </section>
    </nav>
  );
};

export { ConfigSidebar };
