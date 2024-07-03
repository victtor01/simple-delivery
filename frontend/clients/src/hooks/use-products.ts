import { api } from "@/app/api";
import { Product } from "@/entities/product";
import { useQuery } from "@tanstack/react-query";

export const useGetAllProductsByIdsAndStoreId = (
  ids: string[] | undefined,
  storeId: string | undefined,
) => {
  const { data: products, isLoading } = useQuery<Product[]>({
    queryKey: ["cart"],
    queryFn: async () =>
      (
        await api.post("/products/findByIds", {
          productIds: ids,
          storeId,
        })
      ).data,
  });

  return {
    products,
    isLoading,
  };
};
