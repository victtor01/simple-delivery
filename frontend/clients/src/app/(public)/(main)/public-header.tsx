"use server";

import { fontInter } from "@/app/fonts";
import { UserComponentIcon } from "@/components/user-component-icon";
import { useSession } from "@/hooks/use-session";

const useHeader = async () => {
  const session = await useSession().getAuthorization();
  const user = session.client || null;

  return {
    user,
  };
};

const Header = async () => {
  const { user } = await useHeader();

  return (
    <header className="w-full flex bg-gradient-to-r from-white to-gray-50 text-gray-600 border px-3 overflow-visible z-30">
      <div className="items-center flex mx-auto w-full max-w-main justify-between">
        <div className="font-semibold text-lg">
          <h1 className={fontInter}>
            Mi Delivery
          </h1>
        </div>
        <div className="flex gap-2 items-center p-2">
          <UserComponentIcon logged={!!user?.email} />
        </div>
      </div>
    </header>
  );
};
export { Header };
