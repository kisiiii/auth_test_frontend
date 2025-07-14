import { getServerSession } from "next-auth";
import { authOptions } from "@/auth";
import LogoutButton from "@/components/LogoutButton";

interface PageProps {
  params: {
    id: string;
  };
}

export default async function HomePage({ params }: PageProps) {
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
