"use client";
import React, { useState } from "react";
import { useRouter } from "next/navigation";

interface Researcher {
  name: string;
  affiliation: string;
  department: string;
  id: string;
}

// Interface for API response researcher data
interface ApiResearcher {
  researcher_name: string;
  researcher_affiliation_current: string;
  researcher_department_current: string;
  researcher_id: string;
}

export default function Home() {
  const [query, setQuery] = useState("");
  const [results, setResults] = useState<Researcher[]>([]);
  const router = useRouter();

  const handleSearch = async () => {
    const res = await fetch(
      `${
        process.env.NEXT_PUBLIC_API_URL
      }/search-researcher?name=${encodeURIComponent(query)}`
    );
    const data = await res.json();

    if (data.status === "success" && data.researchers) {
      setResults(
        data.researchers.map((r: ApiResearcher) => ({
          name: r.researcher_name,
          affiliation: r.researcher_affiliation_current,
          department: r.researcher_department_current,
          id: r.researcher_id,
        }))
      );
    } else {
      alert("研究者が見つかりませんでした");
      setResults([]);
    }
  };

  return (
    <div className="grid grid-rows-[20px_1fr_20px] items-center justify-items-center min-h-screen p-8 pb-20 gap-16 sm:p-20 font-[family-name:var(--font-geist-sans)]">
      <main className="flex flex-col gap-8 row-start-2 items-center sm:items-start">
        <h1 className="text-4xl font-bold">研Q</h1>
        <p className="text-lg">研究者と企業をつなぐプラットフォーム</p>

        {/* 検索フォーム */}
        <div className="flex gap-2">
          <input
            type="text"
            value={query}
            onChange={(e) => setQuery(e.target.value)}
            placeholder="研究者名で検索"
            className="px-3 py-1 border rounded"
          />
          <button
            onClick={handleSearch}
            className="px-4 py-1 bg-blue-600 text-white rounded"
          >
            検索
          </button>
        </div>

        {/* 結果の表示 */}
        <div className="flex flex-col gap-2">
          {results.map((r) => (
            <button
              key={r.id}
              onClick={() => router.push(`/home/${r.id}`)}
              className="text-blue-700 underline text-left"
            >
              {r.affiliation} {r.department} の {r.name} さんのページへ移動
            </button>
          ))}
        </div>
      </main>
    </div>
  );
}
