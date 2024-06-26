"use client";

import { api } from "@/api";
import { fontInter, fontOpenSans } from "@/fonts";
import { useQuery } from "@tanstack/react-query";
import Link from "next/link";
import { BiSolidCrown } from "react-icons/bi";
import { IoMdSettings } from "react-icons/io";
import { useStore } from "@/hooks/useStore";
import { FaCartShopping } from "react-icons/fa6";
import { usePathname, useRouter } from "next/navigation";
import { FaHome } from "react-icons/fa";

const secound = 1000;
const minute = secound * 60;

interface PropsInformations {
  email: string;
  firstName: string;
}

const links = {
  home: { link: "/home", icon: FaHome },
  products: { link: "/products", icon: FaCartShopping },
};

const useMainSidebar = () => {

  const { data } = useQuery({
    queryKey: ["manager-informations"],
    queryFn: async (): Promise<PropsInformations> =>
      (await api.get("/managers/my-informations")).data,
    refetchInterval: minute * 60, // one hour
  });

  const { store } = useStore().useCookies();

  return {
    data,
    store,
  };
};

const MainSidebar = () => {
  const { data, store } = useMainSidebar();
  const { push: redirect } = useRouter();
  const pathName = usePathname();

  return (
    <section
      className="w-full max-w-[15rem] h-full border-r bg-white flex
      dark:bg-zinc-800 dark:border-zinc-700 dark:bg-opacity-60 
      dark:border-opacity-60 z-30"
    >
      <div className="flex flex-col w-full">
        <section className="flex-1 flex flex-col">
          <button
            type="button"
            onClick={() => redirect("/select-store")}
            className="text-gray-600 font-semibold text-md w-auto
            capitalize dark:text-white px-5 backdrop-blur-xl m-3 flex
            bg-purple-50 rounded-md p-2 shadow-inner hover:shadow-xl dark:shadow-black
            hover:bg-purple-100 transition-all dark:bg-zinc-700 dark:bg-opacity-50"
          >
            <span className={fontOpenSans}>{store?.name}.</span>
          </button>

          <div className="w-full p-2 flex flex-col gap-3">
            {Object.entries(links).map(([name, { link, icon: Icon }]) => {
              const selectedLink = pathName.includes(link);
              const styleSelected = selectedLink
                ? `bg-gradient-to-r from-rose-600 to-orange-500 text-white ml-5 shadow`
                : "hover:bg-zinc-200 dark:hover:bg-zinc-700 text-gray-500 dark:text-gray-200";

              return (
                <Link
                  key={name}
                  href={link}
                  className={`w-full p-2 px-3 flex items-center gap-3
                  text-md rounded-md transition-all font-semibold ${styleSelected}`}
                >
                  <Icon />
                  {name}
                </Link>
              );
            })}
          </div>
        </section>

        <footer
          className="p-2 border-t bg-gray-50 dark:bg-zinc-800 flex 
        justify-between items-center opacity-95 hover:opacity-100
        dark:border-zinc-700"
        >
          <div className="flex items-center gap-1 w-full">
            <div
              className="w-9 h-9 bg-gradient-45 from-rose-500 
              to-orange-500 rounded-[100%]"
            ></div>

            <div className="font-semibold flex-col flex gap-1 flex-1">
              <div
                className={`${fontOpenSans} dark:text-gray-200
              text-gray-700 capitalize text-md px-2 p-1`}
              >
                {data?.firstName}
              </div>
            </div>

            <Link
              href={"/config"}
              className="p-1 rounded-xl w-9 bg-gray-200 text-gray-800
            h-9 grid place-items-center dark:bg-zinc-700 dark:text-gray-400"
            >
              <IoMdSettings />
            </Link>
            <Link
              href={"#"}
              className="p-1 text-white rounded-xl
            bg-gradient-45 from-rose-600 to-orange-500 w-9
            h-9 grid place-items-center shadow-lg hover:shadow-rose-300"
            >
              <BiSolidCrown />
            </Link>
          </div>
        </footer>
      </div>
    </section>
  );
};

export { MainSidebar };
