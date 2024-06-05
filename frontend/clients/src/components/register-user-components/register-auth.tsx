"use client";

import { useStepStore } from "@/app/(public)/register/store";
import { useFormContext } from "react-hook-form";

const RegisterAuth = () => {
  const { register } = useFormContext();
  return (
    <>
      <header className="w-full font-semibold text-xl text-orange-500">
        Preencha as informações necessárias.
      </header>
      <label htmlFor="email" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Email</span>
        <input
          type="text"
          {...register("email")}
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
          placeholder="example@gmail.com"
        />
      </label>
      <label htmlFor="password" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Senha</span>
        <input
          type="password"
          {...register("password")}
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
          placeholder="•••••••••"
        />
      </label>
      <label htmlFor="repeatPassword" className="flex flex-col gap-2 w-full">
        <span className="font-semibold text-gray-500">Repetir a senha</span>
        <input
          type="password"
          {...register("repeatPassword")}
          className="bg-gray-50 rounded p-2 border-2 border-transparent 
          focus:border-orange-500 outline-none"
          placeholder="•••••••••"
        />
      </label>
      <button
        type="submit"
        className="w-full mt-3 p-3 bg-gradient-45 from-purple-600 to-orange-600 text-white font-semibold 
        rounded opacity-90 hover:opacity-100"
      >
        Terminar
      </button>
    </>
  );
};

export { RegisterAuth };
