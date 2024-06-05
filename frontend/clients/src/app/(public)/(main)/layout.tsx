import { FixedComponentWhatsapp } from "@/components/fixed-whatsapp";
import { Header } from "./public-header";
import { PublicNav } from "./public-nav";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ({ children }: LayoutProps) {
  return (
    <div className="w-full h-screen overflow-auto flex flex-col relative">
      <FixedComponentWhatsapp />
      <Header />
      <PublicNav />
      {children}
    </div>
  );
}
