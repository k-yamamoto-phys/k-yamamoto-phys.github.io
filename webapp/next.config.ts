import type { NextConfig } from "next";

const nextConfig: NextConfig = {
  output: "export",

  // ★ Webpack を明示的に有効化する
  webpack: (config) => {
    // YAMLロード対応
    config.module.rules.push({
      test: /\.(ya?ml)$/,
      use: "yaml-loader",
      type: "json"
    });

    // Markdown を raw text として読み込む
    config.module.rules.push({
      test: /\.md$/,
      use: "raw-loader",
      type: "asset/source"
    });

    return config;
  },
};

export default nextConfig;
