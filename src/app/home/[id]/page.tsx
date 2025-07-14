import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

export default async function HomePage(promise: Promise<{ params: { id: string } }>) {
  const { params } = await promise;

  const session = await getServerSession(authOptions);

  if (!session || session.user.id !== params.id) {
    return <div>認証エラー: アクセスが許可されていません</div>;
  }

  return (
    <div className="p-8">
      <h1>{session.user.name} さん、ようこそ！</h1>
      <p>ユーザーID: {session.user.id}</p>
      <LogoutButton />
    </div>
  );
}
