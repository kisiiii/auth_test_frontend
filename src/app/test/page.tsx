"use client";
import React from "react";
import { signOut } from "next-auth/react";

export default function Home() {
  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">研Q</h1>
        <p className="text-lg">ログイン完了</p>

        {/* ✅ callbackUrl を指定して /login に遷移 */}
        <button
          onClick={() =>
            signOut({ callbackUrl: "/login" })
          }
          className="text-blue-700 underline text-left"
        >
          ログアウト
        </button>
      </main>
    </div>
  );
}
