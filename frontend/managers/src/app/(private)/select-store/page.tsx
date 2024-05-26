"use client";

import { FaUnlock, FaUser } from "react-icons/fa";
import styles from "./select-store.module.css";
import { IoAdd } from "react-icons/io5";
import { AnimatePresence, motion } from "framer-motion";
import { useQuery } from "@tanstack/react-query";
import { api } from "@/api";
import { Store } from "@/entities/store";
import { useState } from "react";
import { SelectedStore } from "./selected-store";

interface ResponseStores {
  firstName: string;
  lastName: string;
  email: string;
  stores: Store[];
}

const useSelectStore = () => {
  const [storeSelected, setStoreSelected] = useState<Store | null>(null);
  const handleStoreSelected = (store: Store) =>
    setStoreSelected((prev) => {
      return prev?.id === store?.id ? null : store;
    });

  const { data } = useQuery({
    queryKey: ["stores"],
    queryFn: async (): Promise<ResponseStores> => {
      return (await api.get("/managers/find-with-stores")).data;
    },
  });

  return {
    handleStoreSelected,
    storeSelected,
    data,
  };
};

export default function SelectStore() {
  const { data, handleStoreSelected, storeSelected } = useSelectStore();

  return (
    <div className={`w-full h-screen overflow-auto flex ${styles.background}`}>
      <div className="flex m-auto gap-4 items-center">
        <AnimatePresence>
          {data?.stores?.map((store: Store) => {
            return (
              <div className="w-[8rem] h-[8rem]" key={store.id}>
                <motion.div className={`w-full h-full`}>
                  <motion.button
                    layoutId={store.id}
                    onClick={() => handleStoreSelected(store)}
                    className={`w-[8rem] h-[8rem] rounded-xl
                    bg-white flex`}
                  >
                    <div
                      className="relative flex-1 h-full grid 
                    place-items-center w-full"
                    >
                      <span
                        className="font-semibold text-2xl text-gray-500
                      capitalize"
                      >
                        {store?.name?.[0]}
                      </span>
                      <div
                        className="w-10 h-10 bg-gray-600 bottom-0 absolute 
                        rounded-[0_0.6rem_0_0.6rem] grid place-items-center
                    text-white left-0"
                      >
                        <FaUser />
                      </div>
                    </div>
                  </motion.button>
                </motion.div>
              </div>
            );
          })}

          {storeSelected?.id && (
            <SelectedStore
              handleStoreSelected={handleStoreSelected}
              storeSelected={storeSelected}
            />
          )}
        </AnimatePresence>

        <button
          className="w-[4rem] h-[4rem] bg-white rounded-xl
          hover:scale-[1.03] transition-transform relative
          grid place-items-center"
        >
          <IoAdd size={24} />
        </button>
      </div>
    </div>
  );
}
