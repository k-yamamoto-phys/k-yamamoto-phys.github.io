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

devcontainer を利用する場合は、ホストに Git が必要です。初回起動時に
`~/.gitconfig` の `user.name` と `user.email` を確認します。未設定の場合は、
ホストのターミナルで次を実行すると、その場で設定できます。

```sh
sh .devcontainer/initialize-gitconfig.sh
```

非対話で設定する場合は、次のように値を渡してください。

```sh
DEVCONTAINER_GIT_USER_NAME="Your Name" \
DEVCONTAINER_GIT_USER_EMAIL="you@example.com" \
sh .devcontainer/initialize-gitconfig.sh
```

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

## 公開用画像の最適化

元画像は各サイトの `public/` に保存してください。公開用のビルドでは、生成された出力ディレクトリ内の JPEG、PNG、WebP、GIF、AVIF を自動的に最適化します。PNG は可逆圧縮し、JPEG・WebP・AVIF は高画質設定で再圧縮した結果が小さい場合のみ採用します。GIF は画素が変わらない場合だけ採用します。アニメーション画像、高ビット深度の画像、SVG はそのまま保持します。リポジトリ内の元画像は変更しません。

研究室サイトのトップ画像と `public/images/members/all/` にある集合写真は、元画像から表示用 WebP も自動生成します。集合写真の変更時は `site_data/group/_metadata.js` の `all_member_img` に元画像のパスを指定してください。表示用画像は開発開始時と公開ビルド時に生成され、Git には保存しません。

Markdown には従来どおり `![説明](/images/example.png)` のように元画像を指定してください。各サイトの `public/` にある JPEG・PNG から、開発開始時と公開ビルド時に表示用 WebP を生成します。PNG は可逆変換、JPEG は高画質で変換し、元画像より小さくなる場合にのみ使用します。外部画像、動画形式やアニメーション、変換できない画像は元の指定のまま表示します。生成画像は Git に保存しません。
