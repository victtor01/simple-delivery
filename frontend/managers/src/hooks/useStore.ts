import { Store } from "@/entities/store";
import { cookies } from "next/headers";
import Cookies from "js-cookie";
import { useEffect, useState } from "react";

export function useStore() {
  const useCookies = (): { store: Partial<Store> | null } => {
    const [storeInfo, setStoreInfo] = useState<Partial<Store> | null>(null);

    useEffect(() => {
      const cookieStore: any = Cookies.get("selectedStore") || null;

      if (!cookieStore) return;

      setStoreInfo(JSON.parse(cookieStore));
    }, [setStoreInfo]);

    return {
      store: storeInfo,
    };
  };

  return {
    useCookies,
  };
}
