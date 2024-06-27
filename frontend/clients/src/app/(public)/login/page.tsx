"use client";

import { api } from "@/app/api";
import { zodResolver } from "@hookform/resolvers/zod";
import { createToken } from "@/utils/create-token-session";
import { useForm } from "react-hook-form";
import { FaArrowRight } from "react-icons/fa";
import { IoLogoGoogle } from "react-icons/io5";
import Cookies from "universal-cookie";
import Link from "next/link";
import { z } from "zod";
import { Variants, motion } from "framer-motion";

const cookies = new Cookies();

const loginSchema = z.object({
  email: z.string().min(1).email(),
  password: z.string().min(1),
});

export type LoginFormData = z.infer<typeof loginSchema>;

const useLogin = () => {
  // form state
  const { register, handleSubmit } = useForm<LoginFormData>({
    resolver: zodResolver(loginSchema),
  });

  // function for create user
  const loginUser = async (body: LoginFormData) => {
    // get response auth
    const response = await api.post("/auth", {
      ...body,
    });

    // verify access_token
    const { access_token, refresh_token, user } = response.data || {
      access_token: null,
      refresh_token: null,
      user: {},
    };

    // test
    if (!access_token || !refresh_token) {
      throw new Error("Houve um erro ao tentar fazer o login!");
    }

    // create token
    const tokenUser = await createToken({ payload: user });

    // set cookie session
    cookies.set("session", tokenUser);

    document.location.href = "/";
  };

  return {
    register,
    handleSubmit,
    loginUser,
  };
};

export default function Login() {
  const { register, handleSubmit, loginUser } = useLogin();

  return (
    <motion.form
      initial="initial"
      animate="animate"
      variants={variants}
      onSubmit={handleSubmit(loginUser)}
      className="p-6 bg-white m-auto w-full max-w-[54rem] min-h-screen rounded-t-3xl
      lg:min-h-[32rem] flex gap-10 lg:rounded z-20 shadow-[0px_160px_100px_-150px_rgba(0,0,0,0.6)] "
    >
      <section className="hidden lg:flex flex-col gap-4 flex-1 items-center justify-center overflow-hidden relative">
        <div className="text-3xl text-center font-semibold text-gray-700 z-20">
          Bem vindo ao melhor site de{" "}
          <b className="text-transparent bg-clip-text bg-orange-500">
            delivery
          </b>{" "}
          do nordeste!
        </div>
        <Link
          href={"#"}
          className="flex gap-3 items-center text-lg font-semibold p-2 px-4 rounded text-white 
        bg-orange-500 opacity-90 hover:opacity-100 hover:gap-4 transition-[gap]"
        >
          Saiba mais <FaArrowRight />
        </Link>
      </section>

      <span className="min-h-full lg:flex bg-zinc-100 w-[1px] hidden" />

      <section className="flex-1 flex justify-center flex-col gap-5">
        <div className="text-gray-500">
          <h1 className="text-2xl font-semibold text-gray-500">Login</h1>
        </div>
        <div className="flex flex-col w-full gap-3">
          <label htmlFor="email" className="flex flex-col w-full gap-2">
            <span className="font-semibold text-gray-500">Email *</span>
            <input
              type="text"
              {...register("email")}
              className="w-full p-2 bg-zinc-50 outline-none border-2 border-transparent 
              focus:border-orange-500 rounded focus:shadow focus:shadow-orange-100"
              placeholder="example@gmail.com"
            />
          </label>
          <label htmlFor="email" className="flex flex-col w-full gap-2">
            <div className="w-full justify-between flex items-end">
              <span className="font-semibold text-gray-500">Senha *</span>
              <Link
                href="/"
                className="font-semibold opacity-70 hover:opacity-100 text-gray-700 text-sm"
              >
                Esqueci minha senha
              </Link>
            </div>
            <input
              type="password"
              {...register("password")}
              className="w-full p-2 bg-zinc-50 outline-none border-2 border-transparent 
              focus:border-orange-500 rounded focus:shadow focus:shadow-orange-100"
              placeholder="••••••••••"
            />
          </label>
        </div>

        <footer className="w-full flex flex-col">
          <button className="w-full p-3 bg-orange-500 rounded font-semibold text-white opacity-90 hover:opacity-100">
            Entrar.
          </button>
          <Link
            href={"/register"}
            className="font-semibold mt-1 text-zinc-700  opacity-90 hover:opacity-100"
          >
            Crie uma conta gratuitamente!
          </Link>
        </footer>
        <div className="relative justify-center flex items-center flex-col my-3">
          <span className="w-[20rem] min-w-full flex h-[1px] bg-gradient-to-r from-transparent to-transparent via-zinc-300 " />
          <span className="bg-white absolute p-2 font-semibold text-gray-400">
            Ou
          </span>
        </div>
        <button className="w-full p-3 border rounded flex gap-3 items-center text-gray-700 font-semibold hover:bg-zinc-50">
          <IoLogoGoogle />
          <span>Entrar com o google</span>
        </button>
      </section>
    </motion.form>
  );
}

const variants: Variants = {
  initial: { opacity: 0, scale: 0.7 },
  animate: { opacity: 1, scale: 1 },
};
