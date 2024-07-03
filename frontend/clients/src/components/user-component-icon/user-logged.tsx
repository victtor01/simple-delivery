import Link from "next/link";
import { useRouter } from "next/navigation";
import { useEffect, useRef, useState } from "react";
import { FaUserLarge } from "react-icons/fa6";

const UserLogged = () => {
  const ref = useRef<HTMLDivElement>(null);
  const [show, setShow] = useState<boolean>(false);
  const handleShow = () => setShow((prev) => !prev);

  const router = useRouter();

  const logout = () => {
    fetch("/api/logout").then(async () => {
      router.refresh();
    });
  };

  useEffect(() => {
    const handleClickOutside = (event: MouseEvent) => {
      if (ref.current && !ref.current.contains(event.target as Node)) {
        setShow(false);
      }
    };
    document.addEventListener("mousedown", handleClickOutside);

    return () => {
      document.removeEventListener("mousedown", handleClickOutside);
    };
  }, [ref]);

  return (
    <div ref={ref} className={`flex w-auto h-auto relative`}>
      <button
        type="button"
        onClick={handleShow}
        className="p-3 rounded-full bg-white shadow hover:opacity-100 hover:text-orange-500"
      >
        <FaUserLarge />
      </button>
      {show && (
        <div
          className={`w-[10rem] right-0 h-auto z-30 absolute top-[100%] mt-2 
            bg-zinc-800 text-gray-300 rounded overflow-hidden`}
        >
          <div className="flex flex-col">
            <Link href="#" className="w-full p-3 hover:bg-zinc-700">
              Minha conta
            </Link>
            <Link href="#" className="w-full p-3 hover:bg-zinc-700">
              Configurações
            </Link>
            <button
              type="button"
              onClick={logout}
              className="w-full p-3 hover:bg-zinc-700 flex"
            >
              Sair
            </button>
          </div>
        </div>
      )}
    </div>
  );
};

export { UserLogged };
