"use server";

import { UserComponentIcon } from "@/components/user-component-icon";
import { MdOutlineLocalGroceryStore } from "react-icons/md";
import { useSession } from "@/hooks/use-session";
import Link from "next/link";
import { useParams } from "next/navigation";
import { ButtonCartToOpenModal } from "@/components/button-cart-to-open-modal";

const useHeader = async () => {
  const session = await useSession().getAuthorization();
  const user = session.user || null;

  return {
    user,
  };
};

const Header = async () => {
  const { user } = await useHeader();

  return (
    <header className="w-full flex bg-white text-gray-600 border px-3 overflow-visible z-30">
      <div className="items-center flex mx-auto w-full max-w-main justify-between">
        <div className="font-semibold">
          <h1>Melhores lojas.</h1>
        </div>
        <div className="flex gap-2 items-center">
          <UserComponentIcon logged={!!user?.email} />
          <ButtonCartToOpenModal />
        </div>
      </div>
    </header>
  );
};
export { Header };
