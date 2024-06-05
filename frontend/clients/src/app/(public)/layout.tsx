import { PublicRoute } from "@/providers/public-route-provider";
import { Provider } from "jotai";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <PublicRoute>
      <main className="w-full h-screen bg-gray-50 overflow-auto">
        {children}
      </main>
    </PublicRoute>
  );
}
