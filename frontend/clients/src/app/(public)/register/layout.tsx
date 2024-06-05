import { ButtonBack } from "@/components/button-back";

interface LayoutProps {
  children: React.ReactNode;
}

export default function Layout({ children }: LayoutProps) {
  return (
    <section className="w-full h-screen overflow-auto flex flex-col bg-gradient-to-r from-purple-600 to-orange-500">
      <header className="w-full p-3 h-auto flex justify-between items-center z-20">
        <ButtonBack />
      </header>
      {children}
    </section>
  );
}
