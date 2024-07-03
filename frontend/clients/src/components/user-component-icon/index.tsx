"use client";

import Link from "next/link";
import { UserLogged } from "./user-logged";
import { CgEnter } from "react-icons/cg";

type UserComponentIconProps = {
  logged: boolean;
};

const SignedOut = () => (
  <div className=" p-1 rounded-lg border flex gap-2 items-center bg-white">
    <Link href={'/register'} className="text-gray-500 px-2 flex gap-1 items-center
    hover:bg-zinc-50 rounded p-1">
      Registrar-se
    </Link>
    <Link
      href="/login"
      className="text-white p-1 px-3 rounded
      opacity-95 hover:opacity-100
      bg-gradient-45 from-rose-500 to-orange-600"
    >
      Entrar
    </Link>
  </div>
);

const UserComponentIcon = ({ logged }: UserComponentIconProps) => {
  return logged ? <UserLogged /> : <SignedOut />;
};

export { UserComponentIcon };
