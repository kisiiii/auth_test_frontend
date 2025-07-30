import { withAuth } from "next-auth/middleware";

export default withAuth(
  () => {
    // 認証されていれば何もしない（pass-through）
  },
  {
    callbacks: {
      authorized: ({ token }) => !!token, // JWTトークンがあればOK
    },
    pages: {
      signIn: "/login", // JWTトークンが無ければログインページへリダイレクト
    },
  }
);

// 認証が必要なページを指定
export const config = {
  matcher: ["/test"],
};