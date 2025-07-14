"use client";
import React from "react";
import { useRouter } from "next/navigation";

export default function Home() {
  const router = useRouter();

  const handleGoToLogin = () => {
    router.push("/login");
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">研Q</h1>
        <p className="text-lg">研究者と企業をつなぐプラットフォーム</p>

        {/* ログインページへ移動 */}
        <button
          onClick={handleGoToLogin}
          className="px-6 py-2 bg-blue-600 text-white rounded"
        >
          ログインページへ
        </button>
      </main>
    </div>
  );
}
