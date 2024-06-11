import { ConfigSidebar } from "./config-sidebar";

export default function Layout({ children }: { children: React.ReactElement }) {
  return (
    <main className="w-full h-screen overflow bg-gray-100 flex dark:text-gray-200">
      <ConfigSidebar />

      <section className="flex h-auto overflow-auto flex-1 flex-col dark:bg-gray-900">
        {children}
      </section>
    </main>
  );
}
