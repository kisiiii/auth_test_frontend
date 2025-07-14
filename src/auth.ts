import CredentialsProvider from "next-auth/providers/credentials";
import type { NextAuthOptions } from "next-auth";
import axios from "axios";

import type { Session, User } from "next-auth";
import type { JWT } from "next-auth/jwt";

declare module "next-auth" {
  interface Session {
    user: {
      id: string;
      name: string;
      email?: string;
    };
  }

  interface User {
    id: string;
    name: string;
    email?: string;
  }
}

declare module "next-auth/jwt" {
  interface JWT {
    id: string;
    name: string;
    email?: string;
  }
}

export const authOptions: NextAuthOptions = {
  providers: [
    CredentialsProvider({
      name: "Credentials",
      credentials: {
        company_user_name: { label: "ユーザー名", type: "text" },
        password: { label: "パスワード", type: "password" },
      },
      async authorize(credentials) {
        try {
          const res = await axios.post(`${process.env.NEXT_PUBLIC_API_URL}/auth/login`, {
            company_user_name: credentials?.company_user_name,
            password: credentials?.password,
          });

          const user = res.data;
          if (user) {
            return { id: user.id, name: user.name };
          }
          return null;
        } catch (error) {
          console.error("認証エラー:", error);
          return null;
        }
      },
    }),
  ],

  session: {
  strategy: "jwt", //デフォルトのJWET（暗号化されたJWT）を使用してセッションを管理
  maxAge: 60 * 60 * 12, // 12時間で再認証
  },
  jwt: {
    maxAge: 60 * 60 * 12, // 上記と同じ値を入れる
  },
  
  callbacks: {
    async jwt({ token, user }) {
      if (user) {
        token.id = user.id;
        token.name = user.name;
      }
      return token;
    },
    // user.idでルーティングする際に必要（一応設定）
    async session({ session, token }) {
      if (token) {
        session.user.id = token.id;
        session.user.name = token.name;
      }
      return session;
    },
  },
  pages: {
    signIn: "/login",
  },
  secret: process.env.NEXTAUTH_SECRET,
};
