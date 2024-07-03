import { LoadCartState } from "@/components/load-cart-state";

export default function Layout({ children }: { children: React.ReactNode }) {
  return (
    <>
    <LoadCartState/>
    {children}
    </>
  )
}