"use client";

import { api } from "@/app/api";
import Store from "@/components/store-view-component";
import { Store as StoreEntity } from "@/entities/store";
import { useQuery } from "@tanstack/react-query";

const useProducts = () => {
  const { data: stores } = useQuery<StoreEntity[]>({
    queryKey: ["products"],
    queryFn: async () => {
      return (await api.get("stores")).data;
    },
  });

  return {
    stores: stores,
  };
};

export default function Home() {
  const { stores: stores } = useProducts();

  return (
    <div className="flex w-full p-3">
      <div className="grid grid-cols-5 mx-auto w-full max-w-main gap-6">
        {stores?.map((store) => {
          return (
            <Store.View link={`/store/${store.id}`}>
              <Store.Photo />
              <Store.Information
                title={store.name}
                description={store.description}
                status={'open'}
              />
            </Store.View>
          );
        })}
      </div>
    </div>
  );
}
