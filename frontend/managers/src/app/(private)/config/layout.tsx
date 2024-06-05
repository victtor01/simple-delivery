import { ConfigSidebar } from "./config-sidebar";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <main className="w-full h-screen overflow bg-gray-100 flex">
      <ConfigSidebar />

      <section className="flex h-auto overflow-auto flex-1 flex-col">
        {children}
      </section>
    </main>
  );
}
