"use client";

import { Store } from "@/entities/store";
import { fontValela } from "@/fonts";
import { motion } from "framer-motion";
import { FaUnlock, FaUser } from "react-icons/fa";
import Cookies from "js-cookie";
import dayjs from "@/utils/dayjs";
import { useRouter } from "next/navigation";

interface SelectedStoreProps {
  storeSelected: Store;
  handleStoreSelected: (store: Store) => void;
}

const useSelectedStore = () => {
  const { push } = useRouter();

  const handleSelectStore = (storeSelected: Store) => {
    Cookies.set("selectedStore", JSON.stringify(storeSelected));
    push("/home");
  };

  return {
    handleSelectStore,
  };
};

const SelectedStore = ({
  storeSelected,
  handleStoreSelected,
}: SelectedStoreProps) => {
  const { handleSelectStore } = useSelectedStore();

  return (
    <motion.div
      exit={{ display: "none" }}
      className="fixed w-full h-full bg-zinc-900 bg-opacity-85 top-0 left-0
        flex z-20 gap-4 overflow-auto p-10"
    >
      <div className="mx-auto mt-[10%] flex gap-3 w-full max-w-[30rem] ">
        <motion.div
          layoutId={storeSelected?.id}
          className={`w-[11rem] h-[11rem] rounded-xl bg-white flex shadow-2xl`}
        >
          <div
            className="relative flex-1 h-full grid 
            place-items-center w-full"
          >
            <span
              className="font-semibold text-2xl text-gray-500
              capitalize"
            >
              {storeSelected?.name?.[0]}
            </span>
            <div
              className="w-10 h-10 bg-gray-600 bottom-0 absolute 
              rounded-[0_0.6rem_0_0.6rem] grid place-items-center
              text-white left-0"
            >
              <FaUser />
            </div>
          </div>
        </motion.div>

        <div className="flex flex-col gap-4 flex-1">
          <motion.header
            initial={{ opacity: 0, y: -20 }}
            animate={{ opacity: 1, y: 0 }}
            exit={{ opacity: 0, transition: { delay: 0 } }}
            transition={{ delay: 0.3 }}
            className="text-white flex-col flex
              gap-3"
          >
            <div className={`capitalize text-2xl ${fontValela}`}>
              {storeSelected.name}
            </div>
            <div className="flex flex-col text-lg text-gray-300 leading-[1.4rem]">
              <span>Criado em:</span>
              {dayjs(storeSelected?.createdAt).format("DD [de] MMMM - YYYY")}
            </div>
            <div className="flex flex-col text-lg text-gray-300 leading-[1.4rem]">
              <span>Decrição:</span>
              {storeSelected?.description}
            </div>
          </motion.header>

          <div className="flex gap-3 ">
            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{ delay: 0.3 }}
              onClick={() => handleSelectStore(storeSelected)}
              className="p-2 px-4 bg-gradient-45 from-rose-500 to-orange-500 
                text-white rounded-md text-lg flex gap-3 items-center flex-1
                justify-center hover:shadow-xl"
            >
              <FaUnlock size={16} />
              Entrar
            </motion.button>

            <motion.button
              initial={{ opacity: 0 }}
              animate={{ opacity: 0.9 }}
              whileHover={{ opacity: 1 }}
              exit={{ opacity: 0, transition: { delay: 0 } }}
              transition={{ delay: 0.4 }}
              onClick={() => handleStoreSelected(storeSelected)}
              className="p-2 px-4 bg-white text-gray-800
                rounded-md text-lg  hover:shadow-xl"
            >
              Cancelar
            </motion.button>
          </div>
        </div>
      </div>
    </motion.div>
  );
};

export { SelectedStore };
