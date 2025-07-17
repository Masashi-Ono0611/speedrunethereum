import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  reactStrictMode: true,
  devIndicators: false,
  typescript: {
    ignoreBuildErrors: true,
  },
  eslint: {
    ignoreDuringBuilds: true,
  },
  webpack: config => {
    config.resolve.fallback = { fs: false, net: false, tls: false };
    config.externals.push("pino-pretty", "lokijs", "encoding");
    return config;
  },
  serverExternalPackages: ["ipfs-utils"],
};

// 常に静的エクスポートを有効にする
nextConfig.output = "export";
nextConfig.trailingSlash = true;
nextConfig.images = {
  unoptimized: true,
};

// ベースパスを設定
nextConfig.basePath = process.env.NEXT_PUBLIC_BASE_PATH || "";
nextConfig.assetPrefix = process.env.NEXT_PUBLIC_BASE_PATH || "";

module.exports = nextConfig;
