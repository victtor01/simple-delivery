"use client";

export default function Error({ error, reset }: { error: Error; reset: any }) {
  return (
    <div className="flex flex-col m-auto font-semibold text-gray-700 gap-4 text-lg">
      <div>{error?.message}</div>
      <div className="flex items-center justify-center">
        <button
          onClick={() => reset()}
          className="bg-gray-800 text-white p-2 px-4"
        >
          Tente novamente!
        </button>
      </div>
    </div>
  );
}
