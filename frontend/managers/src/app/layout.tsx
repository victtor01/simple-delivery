import type { Metadata } from "next";
import { Inter } from "next/font/google";
import { QueryProvider } from "@/providers/query-client";
import dayjs from "dayjs";
import "./globals.css";
import "dayjs/locale/pt-br";
import "react-toastify/dist/ReactToastify.css";
import { cookies } from "next/headers";
import { Bounce, ToastContainer } from "react-toastify";

dayjs.locale("pt-br");

const inter = Inter({ subsets: ["latin"] });

export const metadata: Metadata = {
  title: "Create Next App",
  description: "Generated by create next app",
};

export default function RootLayout({
  children,
}: Readonly<{
  children: React.ReactNode;
}>) {
  const theme = cookies().get("_theme")?.value || "light";

  return (
    <html lang="pt-br" className={theme}>
      <body
        className={`${inter.className}
        bg-white dark:bg-zinc-800
        text-gray-700 dark:text-gray-200`}
      >
        <QueryProvider>{children}</QueryProvider>
      </body>
    </html>
  );
}
