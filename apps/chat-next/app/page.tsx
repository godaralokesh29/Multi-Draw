"use client";

import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  return (
    <div className="h-screen flex flex-col justify-center items-center gap-4">
      <h1 className="text-5xl font-bold">Realtime Chat App</h1>

      <div className="flex gap-4">
        <button
          onClick={() => router.push("/signup")}
          className="bg-black text-white px-6 py-3 rounded"
        >
          Signup
        </button>

        <button
          onClick={() => router.push("/signin")}
          className="border px-6 py-3 rounded"
        >
          Signin
        </button>
      </div>
    </div>
  );
}