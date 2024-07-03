import { fontInter } from "@/app/fonts";

export default function LayoutOrder({
  children,
}: {
  children: React.ReactNode;
}) {
  return (
    <section className="w-full flex flex-col h-screen bg-gray-100 overflow-auto">
      <header className="w-full bg-white p-2 flex items-center justify-between">
        <div className="flex justify-between items-center w-full max-w-main mx-auto">
          <div className="font-semibold text-gray-600 text-lg">
            <h1 className={fontInter}>Finalize seu pedido!</h1>
          </div>
        </div>
      </header>
      {children}
    </section>
  );
}
