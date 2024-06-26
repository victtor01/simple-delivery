
import { FixedComponentWhatsapp } from "@/components/fixed-whatsapp";
import { Header } from "./public-header";
import { PublicNav } from "./public-nav";
import { OrderModel } from "@/components/order-model";

interface LayoutProps {
  children: React.ReactNode;
}

export default function ({ children }: LayoutProps) {

  return (
    <div className="w-full h-screen overflow-auto flex flex-col relative">
      <OrderModel/>

      <Header />
      <PublicNav />
      <FixedComponentWhatsapp />
      {children}
    </div>
  );
}
