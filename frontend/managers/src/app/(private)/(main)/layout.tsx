import { cookies } from "next/headers";
import { MainSidebar } from "./main-sidebar";
import { redirect } from "next/navigation";

interface MainLayoutProps {
  children: React.ReactNode;
}

export default function MainLayout({ children }: MainLayoutProps) {
  const selectedStoreId = cookies().get("selectedStore")?.value || null;
  if (!selectedStoreId) redirect("/select-store");

  return (
    <main
      className="bg-gray-50 w-full h-screen 
      overflow-auto flex bg-opacity-100"
    >
      <MainSidebar />
      <section
        className="flex 
        flex-col flex-1"
      >
        {children}
      </section>
    </main>
  );
}
