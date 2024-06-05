"use client";

import Link from "next/link";
import { UserLogged } from "./user-logged";
interface UserComponentIconProps {
  logged: boolean;
}

const SignedOut = () => (
  <Link
    href="/login"
    className="font-semibold border text-black p-2 px-4 rounded-md shadow-lg shadow-zinc-50 opacity-80 hover:opacity-100"
  >
    Entrar
  </Link>
);

const UserComponentIcon = ({ logged }: UserComponentIconProps) => {
  return logged ? <UserLogged /> : <SignedOut />;
};

export { UserComponentIcon };
