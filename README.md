# 山本和樹のWEBページ

山本和樹（Kazuki Yamamoto）の個人Webサイト。日本語・英語の両対応で、研究紹介、CV、出版物、発表、最近の活動などを掲載しています。  
公開先: [https://k-yamamoto-phys.github.io](https://k-yamamoto-phys.github.io)

## リポジトリ構成

- `webapp/`: Next.js（App Router）で構築された本体
- `webapp/app/`: ルーティング・レイアウト・ページ
- `webapp/app/(overview)/`: 主要ページ群

主要ページ:
- `/`: 言語判定で `/ja` or `/en` にリダイレクト
- `/ja`・`/en`: トップ、研究、CV、ニュース
- `/publications`: 論文一覧
- `/presentations`: 発表一覧（Upcoming含む）
- `/ja/amuse`: 日本語のみの「徒然なるままに」
- `webapp/app/site_data/`: 文章・データのソース
  - `research_ja.md` / `research_en.md`
  - `cv_ja.md` / `cv_en.md`
  - `activity.yml`: 最近の活動（ニュース）
  - `paper_regular.yml` / `paper_conference.yml`
  - `presentation.yml`
  - `_metadata.js`: サイト全体のメタ情報・ナビ・外部リンク
- `webapp/app/lib/`: Markdown変換・メタデータ生成・ユーティリティ
- `webapp/app/ui/`: UIコンポーネント（`client` / `server` 分離）
- `webapp/public/`: 画像や静的ファイル

## コンテンツの仕組み

- Markdown/ YAML をソースにしてページを生成
- 数式は KaTeX 対応
- 外部リンクは自動で新しいタブで開く設定
- 画像の `alt` からキャプションを生成
- `presentation.yml` は `sort_presentation.py` で日付降順に整形可能（`requirements.txt` に PyYAML）

## 開発

```
cd webapp
npm install
npm run dev
```

# ビルド/静的生成:

```
npm run build
```

Lint:

```
npm run lint
```
