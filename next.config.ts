import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "standalone",
  images: {
    remotePatterns: [
      // 現在外部画像を使用していないため、空の配列
    ],
  },
  async headers() {
    return [
      {
        source: "/(.*)", // 全てのルートに適用
        headers: [
          {
            key: "Content-Security-Policy", // コンテンツセキュリティポリシーを設定
            value:
              `default-src 'self'; ` +
              `script-src 'self' 'unsafe-inline' 'unsafe-eval'; ` +
              `style-src 'self' 'unsafe-inline' fonts.googleapis.com; ` +
              `font-src 'self' fonts.gstatic.com; ` +
              `img-src 'self' data:; ` +
              `connect-src 'self' ${process.env.API_URL || ''}; ` +
              `object-src 'none';`,
          },
          {
            key: "X-Frame-Options", // フレーム内での表示を制限
            value: "SAMEORIGIN",
          },
          {
            key: "X-Content-Type-Options", // MIMEタイプのスニッフィングを防止
            value: "nosniff",
          },
          {
            key: "Strict-Transport-Security", // HTTPSを強制
            value: process.env.NODE_ENV === 'production' 
              ? "max-age=31536000; includeSubDomains; preload"
              : "",
          },
          {
            key: "Referrer-Policy", // リファラーポリシーを設定
            value: "strict-origin-when-cross-origin",
          },
          {
            key: "Permissions-Policy", // 特定の機能の使用を制限
            value: "geolocation=(), camera=()",
          },
        ],
      },
    ];
  },
};

export default nextConfig;

