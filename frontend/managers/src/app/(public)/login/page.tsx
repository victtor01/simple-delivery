"use client";

import { api } from "@/api";
import { fontInter, fontOpenSans, fontValela } from "@/fonts";
import { zodResolver } from "@hookform/resolvers/zod";
import Link from "next/link";
import { useRouter } from "next/navigation";
import { useForm } from "react-hook-form";
import { z } from "zod";

interface ResponseAuth {
  access_token: string;
  refresh_token: string;
  manager: {
    email: string;
  };
}

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
    const response = await api.post<ResponseAuth>("/auth", {
      email: body.email,
      password: body.password,
    });

    const data = response.data || null;

    if (!data?.access_token || !data?.manager?.email) {
      console.error("Houve um erro, verifique as informações!");
    }

    await fetch("/api/login", {
      method: "POST",
      body: JSON.stringify({
        email: data.manager.email,
      }),
    });
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
      <header className="w-full flex justify-between p-10 z-10">
        <div></div>
        <div className="flex gap-3 items-center font-semibold">
          <span className="text-gray-700 dark:text-white">
            Não tem uma conta?
          </span>
          <Link
            href="/signup"
            className="p-3 px-5 opacity-95 hover:opacity-100 shadow-xl
            rounded-lg bg-gradient-45 from-orange-500 to-rose-500
            text-white"
          >
            Cadastrar-se
          </Link>
        </div>
      </header>

      <form
        onSubmit={handleSubmit(auth)}
        className="flex flex-col p-12 gap-5 m-auto bg-transparent
        w-full max-w-[28rem] rounded-2xl z-10"
      >
        <header className={`${fontInter}`}>
          <h1
            className="text-2xl text-gray-700
          dark:text-white"
          >
            Bem vindo de volta!
          </h1>
          <h2
            className={`font-semibold text-gray-500
          dark:text-gray-300`}
          >
            Digite sua informações para acessar.
          </h2>
        </header>
        <section className="flex flex-col gap-4">
          <label htmlFor="email" className="flex flex-col gap-1">
            <span
              className="font-semibold text-sm text-gray-600
            dark:text-gray-300"
            >
              Email
            </span>
            <input
              type="text"
              id="email"
              className="rounded-lg p-2
              bg-transparent outline-none border
              dark:border-gray-600 focus:border-orange-500
              dark:focus:border-orange-500 focus:shadow-md
              bg-white dark:bg-zinc-800"
              placeholder="example@gmail.com"
              {...register("email")}
            />
          </label>
          <label htmlFor="password" className="flex flex-col gap-1">
            <span
              className="font-semibold text-sm text-gray-600
            dark:text-gray-300"
            >
              Senha
            </span>
            <input
              type="text"
              id="password"
              className="rounded-lg p-2
              bg-transparent outline-none border
              dark:border-gray-600 focus:border-orange-500
              dark:focus:border-orange-500 focus:shadow-md
              bg-white dark:bg-zinc-800"
              placeholder="••••••••••"
              {...register("password")}
            />
          </label>
          <label htmlFor="logged" className="flex gap-2 ">
            <Link href={"#"} className="text-gray-500 dark:text-gray-200">
              Esqueci minha senha
            </Link>
          </label>
        </section>
        <footer className="w-full flex">
          <button
            className="p-3 w-full bg-gradient-45 from-rose-500 to-orange-500 
            hover:text-white hover:shadow-xl text-gray-100
            font-semibold hover:opacity-100 rounded-lg opacity-95"
          >
            Entrar
          </button>
        </footer>
      </form>
    </>
  );
}

/* <div className="fixed top-0 left-0">
    <div
      className="w-[80vh] h-[80vh] bg-gray-100 bg-opacity-20 rounded-[30%]
    translate-x-[-40%] translate-y-[-40%] rotate-[23deg] dark:bg-zinc-800 dark:bg-opacity-50 border
    dark:border-gray-800"
    ></div>
  </div>
  <div className="fixed bottom-0 right-0">
    <div
      className="w-[80vh] h-[80vh] bg-gray-100 bg-opacity-30 rounded-[30%]
    translate-x-[40%] translate-y-[40%] rotate-[23deg] dark:bg-zinc-800 dark:bg-opacity-20 border
    dark:border-gray-800"
    ></div>
  </div> 
*/
