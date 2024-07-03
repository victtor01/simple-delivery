// This list categories is used to show all categories of store
// alert: For the categories to be shown, the user must have a store selected

"use client";

import { api } from "@/api";
import { Category } from "@/interfaces/category";
import { useCategories } from "@/hooks/useCategories";
import { useQuery } from "@tanstack/react-query";

interface PropsListCategories {
  nameSelected: string;
}

const ListCategories = ({ nameSelected }: PropsListCategories) => {
  const { getCategories } = useCategories();
  const { data: categories } = getCategories();
  
  return (
    <div className="w-full p-2 flex">
      {categories?.map((category) => {
        const selected = nameSelected === category.name;
        const styleSelected = selected
          ? `bg-gray-700 text-white`
          : `bg-white text-gray-700`;
        return (
          <div
            className={`p-3 px-5 capitalize font-semibold rounded-md shadow
              ${styleSelected}`}
          >
            {category.name}
          </div>
        );
      })}
    </div>
  );
};

export { ListCategories };
