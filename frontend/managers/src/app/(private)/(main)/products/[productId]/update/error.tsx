"use client";

export default function Error({ error }: { error: Error }) {
  return (
    <div className="font-semibold text-red-500 bg-red-100 rounded-md p-2 mt-5">
      {error?.message}
    </div>
  );
}
