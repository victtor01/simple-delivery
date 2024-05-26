"use client";

import { api } from "@/api";
import { fontInter, fontOpenSans, fontValela } from "@/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import styles from "./style.module.css";
import { z } from "zod";

const authSchema = z.object({
  email: z.string().min(1),
  password: z.string().min(1),
});

type AuthData = z.infer<typeof authSchema>;

const useAuth = () => {
  const {
    register,
    handleSubmit,
    formState: { errors },
  } = useForm<AuthData>({
    resolver: zodResolver(authSchema),
  });

  const router = useRouter();

  const auth = async (body: AuthData) => {
    const response = await api.post("/auth", {
      email: body.email,
      password: body.password,
    });

    if (response?.data?.access_token) {
      router.push("/");
    }

    console.log(response);
  };

  return {
    auth,
    form: {
      register,
      handleSubmit,
    },
  };
};

export default function Login() {
  const {
    auth,
    form: { register, handleSubmit },
  } = useAuth();
  return (
    <>
      <div className="fixed top-0 left-0">
        <div className="w-[80vh] h-[80vh] bg-orange-400 bg-opacity-20 rounded-[30%]
        translate-x-[-40%] translate-y-[-40%] rotate-[23deg]">
        </div>
      </div>
      <div className="fixed bottom-0 right-0">
        <div className="w-[80vh] h-[80vh] bg-orange-400 bg-opacity-30 rounded-[30%]
        translate-x-[40%] translate-y-[40%] rotate-[23deg]">
        </div>
      </div>

      <header className="w-full flex justify-between p-10 z-10">
        <div></div>
        <div
          className="flex gap-3 items-center font-semibold
          text-white"
        >
          <span>Não tem uma conta?</span>
          <Link
            href="/signup"
            className="p-3 px-5 bg-white opacity-95 hover:opacity-100 shadow-2xl
            rounded-xl text-gray-700 "
          >
            Cadastrar-se
          </Link>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(auth)}
        className="flex flex-col p-12 gap-5 m-auto shadow-xl bg-white
      w-full max-w-[28rem] rounded-2xl z-10"
      >
        <header className={`${fontInter}`}>
          <h1 className="font-semibold text-2xl text-gray-700">
            Bem vindo de volta!
          </h1>
          <h2 className={`font-semibold text-gray-500`}>
            Digite sua informações para acessar.
          </h2>
        </header>
        <section className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-gray-600">Email</span>
            <input
              type="text"
              id="email"
              className="rounded-lg p-2
              bg-white outline-orange-500 border"
              placeholder="example@gmail.com"
              {...register("email")}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            <span className="font-semibold text-sm text-gray-600">Senha</span>
            <input
              type="text"
              id="password"
              className="rounded-lg p-2
              bg-white outline-orange-500 border"
              placeholder="••••••••••"
              {...register("password")}
            />
          </label>
          <label htmlFor="logged" className="flex gap-2 px-1">
            <input
              type="checkbox"
              id="logged"
              className="border rounded-lg p-2
            bg-zinc-50 outline-indigo-400"
            />
            <span className="text-gray-500">Continuar logado.</span>
          </label>
        </section>
        <footer className="w-full flex">
          <button
            className="p-3 w-full bg-gradient-45 from-rose-500 to-orange-500 hover:text-white hover:shadow-xl
            font-semibold hover:opacity-100 rounded-xl opacity-95 text-gray-100"
          >
            Entrar
          </button>
        </footer>
      </form>
    </>
  );
}
