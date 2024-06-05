'use client'

import { useRouter } from "next/navigation";
import { FaArrowLeftLong } from "react-icons/fa6";

const ButtonBack = () => {
  const router = useRouter();
  return (
    <button
      onClick={() => router.back()}
      className="p-4 rounded-lg bg-white text-gray-500 opacity-95 hover:opacity-100"
    >
      <FaArrowLeftLong />
    </button>
  );
};

export { ButtonBack };
