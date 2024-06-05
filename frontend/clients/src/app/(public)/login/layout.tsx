import { ButtonBack } from "@/components/button-back";
import React from "react";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <section className="w-full min-h-screen flex flex-col bg-gradient-45 
    from-purple-600 to-orange-500 relative">
      <header className="w-full p-3 h-auto flex justify-between 
      items-center z-20">
        <ButtonBack />
      </header>
      {children}
    </section>
  );
}
