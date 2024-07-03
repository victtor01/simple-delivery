import { fontInter } from "@/app/fonts";
import { OrderProducts } from "./order-products";

// 1. products
// 2. payment
// 3. address

export default function Order() {
  return (
    <section className="flex w-full flex-col gap-2">
      <section className="flex w-full max-w-main mx-auto flex-col mt-5 border bg-white">
        <header className="p-3 flex-1 border-b bg-zinc-50">
          <h1 className={fontInter}>Produtos Escolhidos...</h1>
        </header>
        <OrderProducts />
      </section>

      <section className="flex w-full max-w-main mx-auto flex-col mt-5 border bg-white">
        <header className="p-3 flex-1 border-b bg-zinc-50">
          <h1 className={fontInter}>Observação</h1>
        </header>
      </section>
    </section>
  );
}
