import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  /* config options here */
  output: "export",
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