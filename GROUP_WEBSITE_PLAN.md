# group_website 完成計画

作成日: 2026-06-17

## 1. 目的と前提

- `personal_website` を参考にしながら、`group_website` を研究室サイトとして公開可能な状態まで仕上げる。
- 当面の公開先は `https://kazuki-yamamoto.github.io/group/` のような GitHub Pages 配下を想定する。
- 将来、大学ドメインで公開できる可能性があるため、`personal_website` と `group_website` は独立した Next.js アプリとして維持する。
- GitHub Pages では公開 artifact だけを合成し、`personal_website/out` をルート、`group_website/out` を `group/` 配下へ配置する。
- 最初の優先順位は「公開可能な土台」。見た目や本文の完成より先に、metadata、basePath、lint/build/CI、言語切替、公開パス対応を固める。
- `members` は本番の実名・写真を入れ切るのではなく、まず schema と表示仕様を固める。

## 2. 現在のディレクトリ構成確認

```text
/workspaces/yamamoto_web
├── personal_website/        # 個人サイト。GitHub Pages ルート公開中の Next.js アプリ
│   ├── app/                 # App Router、ページ、UI、lib
│   ├── public/              # 個人サイト用 static assets
│   └── next-sitemap.config.js
├── group_website/           # 研究室サイト。今後 /group 配下へ静的公開する Next.js アプリ
│   ├── app/
│   │   ├── (pages)/(en)/    # 英語ページ。ルート言語として利用
│   │   ├── (pages)/ja/      # 日本語ページ
│   │   ├── lib/             # markdown、metadata、OGP など
│   │   └── ui/              # client/server UI
│   ├── public/              # group 用画像、OGP、OMU.svg
│   └── utils/watcher.mjs    # markdown_pages の dev hot reload 補助
├── site_data/
│   ├── personal/            # 個人サイト用 Markdown/YAML/metadata
│   └── group/               # group 用 Markdown/YAML/metadata
│       ├── markdown_pages/  # research/contact/project などの自動生成ページ
│       ├── activity.yml
│       ├── members.yml
│       ├── paper_regular.yml
│       ├── paper_conference.yml
│       ├── presentation.yml
│       └── _metadata.js
├── .github/workflows/
│   └── personal_website.yml # 現状は personal のみビルド・デプロイ
├── DESIGN.md                # 現在の二サイト構成に近い設計メモ
└── README.md                # 古い webapp 表記が残っている
```

確認済みコマンド:

- `group_website`: `npm run test -- --run` は成功、`npm run build` は成功。
- `personal_website`: `npm run test -- --run` は成功、`npm run build` は成功。
- 両サイトとも `npm run lint` は失敗。理由は ESLint v9/v10 が要求する `eslint.config.*` が存在しないため。
- `git status --short` では作業開始時から `AGENT.md` が untracked。

## 3. 現状の主要な未完成点

### 公開パス・metadata

- `group_website` は現在 `/images/...` や `/members` のようなルート相対パスを多用している。`/group` 配下公開ではそのままだと asset や内部リンクが壊れる可能性が高い。
- `group_website/app/layout.tsx` が `@/personal/_metadata` を import している。
- `group_website/app/ui/client/langBotton.tsx` も `@/personal/_metadata` を import しており、group の `noEnglish` 設定を参照していない。
- `site_data/group/_metadata.js` の `publicURL` は大学ドメイン想定の `https://www.omu.ac.jp/sci/phys/yamamoto` のまま。
- `group_website` には sitemap/robots 生成設定がない。

### content と表示

- トップページに「適当に変える」という仮文が残っている。
- `site_data/group/markdown_pages/ja/contact.md` に `test` / `hello` の仮文が残っている。
- `site_data/group/markdown_pages/en/project.md` と `ja/project.md` に frontmatter がない。
- `site_data/group/members.yml` は同一人物のダミーが複数あり、外部デモ画像 `img.daisyui.com` を参照している。
- activities/publications/presentations の文言に「山本個人サイト」寄りの表現が残っている箇所がある。
- build log に `console.log` が出る。特に `[other_pages]` と `LangSetting` は本番ビルド時にも表示される。

### 開発・CI

- ESLint 設定がなく、`npm run lint` が現状失敗する。
- `.github/workflows/personal_website.yml` は personal だけを GitHub Pages に deploy する。
- GitHub Pages で `_next` を配信するため、最終 artifact には `.nojekyll` を置く。
- group のリンクチェック、`/group` 配下の静的 server 検証、basePath 漏れ検出が未整備。

## 4. 実装方針

### A. path と metadata の基盤を先に固める

- `site_data/group/_metadata.js` に `basePath` と GitHub Pages 用 `publicURL` を追加する。
  - 既定値: `basePath: "/group"`、`publicURL: "https://kazuki-yamamoto.github.io/group"`。
  - 将来の大学ドメインでは build 時環境変数で `basePath: ""`、`publicURL: "https://大学ドメイン/..."` に切り替えられるようにする。
- `group_website/next.config.ts` に `basePath` を設定する。
- `app/lib/site-paths.ts` のような小さな helper を追加し、以下を一元化する。
  - `withBasePath(path)`: `/images/top.jpg` を `/group/images/top.jpg` に変換する。外部 URL、`mailto:`, `tel:`, `#anchor` は変更しない。
  - `siteUrl(path)`: canonical/OGP 用の絶対 URL を生成する。
- group 内で raw `<img src="/...">`、Hero の background image、markdown 由来の `<img src="/...">`、markdown 由来の内部 `<a href="/...">` に helper を適用する。
- `@/personal/_metadata` が `group_website/app` から消えることを受け入れ条件にする。

### B. 言語切替と routing を group 用に整える

- `LangButton` と `LangSetting` は `@/group/_metadata` を参照する。
- `/group` basePath を Next.js に任せつつ、アプリ内部の logical path は `/`, `/ja`, `/members`, `/ja/members` として扱う。
- `noEnglish` は group のページだけを対象にし、存在しない言語切替リンクを出さない。
- `activities` 英語ページの戻り先 `/en` は `/` に直す。

### C. members schema を先に安定させる

- `members.yml` は次の schema に統一する。
  - `id`: 安定した識別子。
  - `type`: `leader | staff | student | alumni | collaborator`。
  - `order`: 表示順。
  - `name.ja/en`, `position.ja/en`, `message.ja/en`。
  - 任意: `photo`, `email`, `room.ja/en`, `links[]`。
- `photo` がない場合は外部 demo 画像ではなく、イニシャルまたはローカル fallback 表示にする。
- 現在の重複ダミーは撤去し、schema 例として最小限のデータだけ残す。
- 本番の学生・卒業生・共同研究者データは別セッションで入力する。

### D. Markdown 自動ページの contract を明確にする

- `site_data/group/markdown_pages/{en,ja}/*.md` は全て frontmatter を必須にする。
  - `title`
  - `description`
- `list_markdown_items.ts` は frontmatter が不足した場合に build 時に明確なエラーを出す。
- contact/project/research は両言語で slug を揃える。
- 仮文、test 文、説明用メモは公開ページから取り除く。

### E. CI と公開 artifact を合成する

- 既存の personal GitHub Pages workflow を「personal と group を両方 build して 1 つの Pages artifact にまとめる」形へ更新する。
- 手順:
  1. `personal_website` で `npm ci`, `npm run test -- --run`, `npm run build`。
  2. `group_website` で `npm ci`, `npm run test -- --run`, `npm run build`。
  3. staging directory を作り、`personal_website/out/*` を root へ copy。
  4. `group_website/out/*` を `staging/group/` へ copy。
  5. `staging/.nojekyll` を作成。
  6. `serve staging` で起動し、`/`, `/ja`, `/group/`, `/group/ja`, `/group/members`, `/group/ja/members` を smoke test。
  7. `linkinator` で internal link を検査する。
  8. staging を GitHub Pages artifact として upload/deploy。
- group sitemap は `group_website/next-sitemap.config.js` を追加して `https://kazuki-yamamoto.github.io/group/sitemap.xml` を生成する。
- root `robots.txt` は personal sitemap と group sitemap の両方を参照する方針にする。

### F. docs と運用手順を更新する

- `README.md` の古い `webapp/` 表記を、現行の `personal_website` / `group_website` / `site_data` 構成へ更新する。
- `DESIGN.md` には `/group` 配下公開と将来の大学ドメイン移行方針を追記する。
- 各セッション終了時に `WORK_REPORT/WORK_REPORT_<date>_<time>.md` を作る。

## 5. 複数セッションの進め方

### Session 1: 公開パスと metadata の土台

目的:

- `/group` 配下で壊れない基盤を作る。

作業:

- `group_website/next.config.ts` に `basePath` を導入する。
- `site_data/group/_metadata.js` を GitHub Pages 用 default に更新し、将来ドメイン用の環境変数 override を設計する。
- path helper を追加し、group の raw asset path と metadata URL を通す。
- `group_website/app/layout.tsx` と `langBotton.tsx` の personal metadata import を group に修正する。
- build log に出る不要な `console.log` を削除する。

受け入れ条件:

- `rg '@/personal' group_website/app` が 0 件。
- `npm run test -- --run` と `npm run build` が group で成功。
- `out` 内の主要 HTML に `/images/` や `href="/members"` のような unprefixed group 内部 URL が残らない。

### Session 2: lint と開発品質

目的:

- lint を復旧し、以降の修正で regressions を拾えるようにする。

作業:

- ESLint flat config を両サイトに追加するか、root 共有 config を追加する。
- `npm run lint` を両サイトで成功させる。
- 未使用 import、型の緩い箇所、不要な client import を最低限整理する。
- `members`, `activity`, `paper`, `presentation`, `markdown frontmatter` の型を zod か TypeScript 型で検査しやすくする。

受け入れ条件:

- `personal_website` と `group_website` の `npm run lint` が成功。
- `npm run test -- --run` と `npm run build` が両サイトで成功。

### Session 3: content contract と仮文撤去

目的:

- 公開ページに仮文・ダミーデータが出ない状態にする。

作業:

- top page の日英説明文を研究室サイト向けに置換する。
- `contact.md` の test/hello を撤去し、最低限の所在地・連絡先・アクセス案内にする。
- `project.md` 日英に frontmatter を追加する。
- members schema を更新し、重複ダミーと外部 demo 画像を撤去する。
- members ページは `type` ごとの見出しや並び順を扱えるようにする。

受け入れ条件:

- `rg '適当に|test|hello|dummy|demo|yellingwoman' group_website site_data/group` が公開対象では 0 件。
- members は photo なしでも崩れず表示される。
- `npm run build` が group で成功。

### Session 4: UI とページ導線の仕上げ

目的:

- 研究室サイトとして自然に見える情報設計と responsive 表示にする。

作業:

- header/footer を group 用に仕上げる。footer には OMU、研究室名、所属、所在地、copyright を出す。
- top page は研究テーマ、recent activities、members/contact への導線を整理する。
- publications/presentations は個人サイト由来の表現を group 研究成果として調整する。
- mobile header と language switch の表示を確認する。
- 必要に応じて members/publications/presentations の重複 UI を小さな component に分離する。

受け入れ条件:

- desktop/mobile で主要ページに横 overflow や文字の重なりがない。
- `/group/`, `/group/ja`, `/group/research`, `/group/ja/contact`, `/group/members` の導線が自然に辿れる。

### Session 5: GitHub Pages 合成 deploy と公開前検証

目的:

- personal ルートと group サブディレクトリを同じ GitHub Pages artifact で公開できるようにする。

作業:

- `.github/workflows/personal_website.yml` を combined deployment に更新する。
- group sitemap 生成を追加する。
- staging artifact 作成スクリプトを workflow 内に入れる。
- `.nojekyll` を staging root に作る。
- `serve staging` と linkinator で `/` と `/group/` の両方を検査する。

受け入れ条件:

- GitHub Actions 上で personal/group 両方の build と test が成功。
- Pages artifact に `index.html` と `group/index.html` が両方存在する。
- `https://kazuki-yamamoto.github.io/` と `https://kazuki-yamamoto.github.io/group/` が両方開ける。

### Session 6: 最終レビューと大学ドメイン移行メモ

目的:

- 将来の大学ドメイン移行時に迷わない状態にする。

作業:

- `basePath=""`、`publicURL=大学ドメイン` で build できるか確認する。
- README/DESIGN に公開先切替手順を書く。
- content 入力者向けに `site_data/group` の更新方法を書く。
- 最終 WORK_REPORT に残タスクと移行手順をまとめる。

受け入れ条件:

- GitHub Pages 用と大学ドメイン用の build-time 設定差分が README から再現できる。
- 次の担当者が `site_data/group` を編集してページ更新できる。

## 6. テスト計画

各実装セッションで最低限実行する:

```bash
cd group_website
npm run test -- --run
npm run build
```

lint 復旧後に追加する:

```bash
cd group_website
npm run lint

cd ../personal_website
npm run lint
npm run test -- --run
npm run build
```

公開 artifact 検証:

```bash
rm -rf /tmp/yamamoto-pages-staging
mkdir -p /tmp/yamamoto-pages-staging/group
cp -R personal_website/out/. /tmp/yamamoto-pages-staging/
cp -R group_website/out/. /tmp/yamamoto-pages-staging/group/
touch /tmp/yamamoto-pages-staging/.nojekyll
npx serve /tmp/yamamoto-pages-staging -l 3000
npx linkinator http://localhost:3000 --recurse --timeout 15000 --verbosity error
```

追加の漏れ検査:

```bash
rg '@/personal' group_website/app
rg '適当に|test|hello|dummy|demo|yellingwoman' group_website site_data/group
rg 'href="/(members|activities|research|publications|presentations|contact|project)|src="/images|url\\(/images' group_website/out
```

## 7. 明示的な前提

- group の GitHub Pages 公開 path は当面 `/group`。
- group の独立性を保つため、personal の Next.js app 内に group page を混ぜない。
- GitHub Pages では workflow の staging artifact だけを合成する。
- members の本番データ入力は後続タスク。今回の計画では schema と崩れない表示を先に作る。
- `site_data/group` が group site の唯一の content source になるように保つ。
- `README.md` と `DESIGN.md` はコード変更後に更新し、実際の構成とずれないようにする。
