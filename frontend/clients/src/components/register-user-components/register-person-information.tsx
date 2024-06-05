"use client";

import { useStepStore } from "@/app/(public)/register/store";
import { useFormContext } from "react-hook-form";

const RegisterPersonInformation = () => {
  const { register } = useFormContext();
  const setStep = useStepStore((state) => state.increment);

  return (
    <>
      <header className="w-full font-semibold text-xl text-orange-500">
        Preencha as informações necessárias.
      </header>
      <label htmlFor="firstname" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Nome</span>
        <input
          type="text"
          {...register("firstName")}
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
          placeholder="João"
        />
      </label>
      <label htmlFor="lastname" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Sobrenome</span>
        <input
          type="text"
          {...register("lastName")}
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
          placeholder="Martins"
        />
      </label>
      <label htmlFor="birth" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Aniversário</span>
        <input
          {...register("birth")}
          type="date"
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
        />
      </label>
      <button
        type="button"
        className="w-full p-3 mt-3 bg-orange-600 text-white font-semibold rounded opacity-90 hover:opacity-100"
        onClick={setStep}
      >
        Proximo
      </button>
    </>
  );
};

export { RegisterPersonInformation };
