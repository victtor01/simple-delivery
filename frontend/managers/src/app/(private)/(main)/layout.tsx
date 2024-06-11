import { cookies } from "next/headers";
import { MainSidebar } from "./main-sidebar";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const selectedStoreId = cookies().get("__store")?.value || null;
  if (!selectedStoreId) redirect("/select-store");

  return (
    <main
      className="bg-gradient-to-r from-orange-50 to-purple-50 dark:bg-zinc-900 w-full h-screen 
      overflow-auto flex dark:bg-opacity-60 dark:from-zinc-900 dark:to-zinc-900"
    >
      <MainSidebar />
      <section
        className="flex-col flex flex-1"
      >
        {children}
      </section>
    </main>
  );
}
