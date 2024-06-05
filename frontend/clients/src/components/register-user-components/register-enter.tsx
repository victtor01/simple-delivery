"use client";

import { useStepStore } from "@/app/(public)/register/store";
import { fontInter } from "../../app/fonts";
import { motion } from "framer-motion";

export function RegisterEnter() {
  const setStep = useStepStore((state) => state.increment);
  return (
    <>
      <header className={`font-semibold ${fontInter}`}>
        <h1 className="text-2xl text-gray-500 text-center">
          Olá! Seja muito bem vindo ao{" "}
          <b
            className="text-transparent bg-clip-text 
            bg-gradient-45 from-purple-400 to-orange-400"
          >
            Mundo delivery!
          </b>
        </h1>
      </header>
      <button
        onClick={setStep}
        className="w-full p-3 rounded opacity-90 hover:opacity-100 max-w-[10rem] bg-orange-500 text-white font-semibold"
        type="button"
      >
        Começar
      </button>
    </>
  );
}
