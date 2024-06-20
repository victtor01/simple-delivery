'use client';

import { api } from "@/api";
import { Category } from "@/entities/category";
import { useQuery } from "@tanstack/react-query";

const useCategories = () => {
  const getCategories = () => {
    const { data } = useQuery<Category[]>({
      queryKey: ["categories"],
      queryFn: async () => (await api.get("categories")).data,
    });

    return { data }
  };

  return {
    getCategories,
  };
};

export { useCategories };
