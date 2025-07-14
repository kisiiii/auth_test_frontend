import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage({ params }: { params: { id: string } }) {
  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== params.id) {
    return <div>アクセスが許可されていません</div>;
  }

  return (
    <div className="p-8">
      <h1>{session.user.name} さん、ようこそ！</h1>
      <p>ユーザーID: {session.user.id}</p>
      <LogoutButton />
    </div>
  );
}

// 🔑 これがないと、Next.js が `params` を Promise 扱いしてしまう可能性がある
export async function generateStaticParams() {
  return []; // 空でもよい（SSR用途でもOK）
}
