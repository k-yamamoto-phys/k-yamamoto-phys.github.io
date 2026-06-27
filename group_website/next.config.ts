import type { NextConfig } from "next";

function normalizeBasePath(value: string | undefined) {
  const trimmed = (value ?? "").trim();
  if (!trimmed || trimmed === "/") return "";
  const prefix = trimmed.replace(/^\/+|\/+$/g, "");
  return prefix ? `/${prefix}` : "";
}

const basePath = normalizeBasePath(process.env.NEXT_PUBLIC_GROUP_BASE_PATH);

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
  ...(basePath ? { basePath, assetPrefix: basePath } : {}),
  // Turbopackの設定を削除し、webpackの設定を追加
  webpack: (config) => {
    config.module.rules.push({
      test: /\.ya?ml$/,
      use: 'yaml-loader',
    });

    config.module.rules.push({
      test: /\.md$/,
      use: 'text-loader',
    });

    return config;
  },
};

export default nextConfig;
