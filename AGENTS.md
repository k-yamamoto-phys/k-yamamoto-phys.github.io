# AGENTS.md

`npm run build`等のビルドコマンドを絶対に実行してはいけない。

You **must not** run `npm run build`

Use Japanese for all human-facing reports and notes.

Write the following files in Japanese by default:

- `WORK_REPORT_<date>.md`
- research notes written by agents
- Codex final summaries
- progress reports and handoff notes

Keep raw technical outputs in their original language:

- command output
- compiler errors
- JS/CSS/Python exception messages
- package manager logs
- raw numerical output
- copied error messages

## 日本語版・英語版の同時更新

- サイトの文章・案内・情報を追加、変更、削除する際は、対応する日本語版と英語版を必ず同じ作業で更新する。研究室サイトと個人サイトの両方に適用する。
- 片方の言語だけの依頼でも、対応するもう一方の言語を確認し、同じ内容になるよう自然な表現で反映する。ユーザーが明示的に片方のみの変更を指定した場合は、その指示を優先する。
- 共通メタデータのお知らせや言語別ページも確認し、両言語で変更内容・掲載位置・表示の有無が意図どおりであることを確認してからコミット・push する。
- 対応する言語版が存在しない場合は、その旨を最終報告に記載する。

## k-yamamoto-phys による校正に基づく表記規則（厳守）

yamamotolabchatgpt-art が追加・編集した内容に対する k-yamamoto-phys の修正を、今後の文章作成・更新の基準とする。対象は研究室サイト・個人サイトの活動記事、発表一覧、セミナー、共通メタデータ。以下は 2026年11月17日までの修正差分から抽出した規則であり、単なる推奨ではない。

- 作業前に対象項目の履歴と現在の本文を確認し、k-yamamoto-phys による最新の校正を優先する。エージェントの過去の原稿や一般的な文章整形で、校正前の表記へ戻してはいけない。ユーザーの新たな明示指示がある場合はそちらを優先する。
- 表記の修正と、日付・職位・開催状況・掲載対象などの事実修正を区別する。一つの修正例を根拠に、別人の敬称、別イベントの日付、サイト全体の句読点まで機械的に変更しない。

### 発表一覧：会議名・会場・年月を簡潔に記す

- `presentation.yml` の `detail` は原則として `[会議名](URL) @ 会場, 年月` とする。日本語は `2026年11月`、英語は `November 2026` のように年月までとし、開催日・日付範囲を付け足さない。セミナーページの開催日・曜日にはこの省略を適用しない。
- 修正済みの具体的表記を維持する。例：`[非平衡固体物性の最前線2026](https://sites.google.com/view/frontiers-of-nonequilibrium26) @ 大阪大学, 2026年11月`。NQS2027 の会場・年月は `Yukawa Institute for Theoretical Physics, Kyoto, March, 2027` とし、削除された `Kyoto University`、`Japan`、会期全体の日付範囲を戻さない。この既存表記の `March, 2027` も勝手に整形しない。
- 表示用の `detail` とデータの `date` を混同しない。`date` は確認済み・指定済みの日付を保持する。Tsunoda 氏の NQS2027 の `date` は `2027-03-01` に修正されているため、会期全体の初日 `2027-02-08` へ戻さない。月だけの表示から発表日を推測しない。
- 要旨 ID、発表日未確定の `note`、日付の採用理由を説明するコメントなど、校正で削除された補足を再追加しない。今後も依頼・掲載上の必要性のない作業上の注記を追加しない。日付の根拠が必要なら作業報告で説明し、公開本文に自動挿入しない。

### 人名・敬称・所属・職位

- 英語本文の人名は確認済みのローマ字表記を使う。榊朋央氏は `Mr. Tomohisa Sakaki` とし、英語の講演者欄・活動記事に `榊 朋央` を残さない。他の氏名の読みを推測しない。
- 活動記事・講演者紹介では、その人物・文脈で確認された敬称を付ける。研究協力者の列挙では `Mr. Toranosuke Matsubara, Mr. Soma Takemori, and Mr. Juntaro Fujii` のように各人に付ける。論文著者・発表一覧の `presenter` へはこの敬称規則を拡張しない。未知の人物の性別や学位から敬称を推測しない。
- セミナーの学年は日英とも `M2` のような略記を使い、修正済みの `M2` を `修士課程2年` / `Second-year master's student` へ戻さない。
- 京都大学の山本和輝氏のセミナー講演者欄は `Dr. Kazuki Yamamoto (Project-specific Assistant Professor, Condensed Matter Theory Group, Graduate School of Science, Kyoto University)` を維持する。`Assistant Professor` への短縮や、研究室主宰者の山本和樹氏との混同をしない。活動記事では `Prof. Kazuki Yamamoto` が残っているため、同じローマ字名を一括置換せず掲載箇所ごとの校正を参照する。
- 榊氏の英文所属は校正後の `University of Osaka` を使い、`The University of Osaka` に戻さない。別機関・別文脈へ機械的に適用しない。

### 活動記事・お知らせ：短く、開催状況に合わせる

- セミナー開催報告は `…氏を講演者に迎え，[非平衡量子研理論セミナー](/ja/seminars)を開催しました`、英語は `We have held [Nonequilibrium Quantum Theory Seminar](/seminars) by … from …` を基準とする。この日本語の読点は全角 `，` とし、この短い開催報告の末尾に `。` / `.` を追加しない。受賞記事の `。おめでとうございます！` / `. Congratulations!` など、別形式の句読点は保持する。
- 開催済みと確認された記事は `開催します` / `We will host` のままにしない。未来の予定は未来の表現を保ち、日付だけで開催済みと断定しない。終了した告知を `SiteMessage` に残さず、他の有効な告知がなければ日英の `text` を空にする。
- 賞名や紹介の重複説明を増やさない。松原氏の受賞記事のリンク文字列は `第81回年次大会日本物理学会学生優秀発表賞` / `Student Presentation Award of the Physical Society of Japan at the 81st Annual Meeting` とし、削除された `（2026年）` / `(2026)` を戻さない。英語の紹介は `Our collaborator, Mr. Toranosuke Matsubara, has received …` を維持し、削除された `and research assistant` を再追加しない。日本語に残る `（リサーチアシスタント）` まで削除する根拠にはしない。
- 複数人なら `Our research collaborators` とする。訪問は `visited our laboratory` とし、修正前の `visited in our laboratory` を使わない。
- 発表一覧への追加を理由に、活動記事や個人サイトへ自動転載しない。重冨氏の「非平衡固体物性の最前線2026」の発表は、研究室の活動記事と個人サイトの活動・発表一覧から削除され、研究室の発表一覧には残されている。この掲載範囲を維持する。日英の同時更新義務は、研究室・個人サイトへの同時掲載義務ではない。

### セミナー名・参考文献・Markdown

- セミナーの英語名は `Nonequilibrium Quantum Theory Seminar`、英語ページの `description` は `Nonequilibrium Quantum Theory Seminar announcements` とする。`Nonequilibrium Quantum Theory Group seminar announcements` へ戻さない。
- 参考文献は `[1] …`、`[2] …` を連続した行に置き、文献間に空行を挿入しない。次の文献がある行の末尾に半角スペース2個を置き、Markdown の明示的改行を保つ。自動整形でこのスペースを削除しない。
- セミナー参考文献の arXiv 表記は修正済みの `arXiv: 2609.29082.` などを維持し、削除された `(2026)` を再追加しない。雑誌論文の出版年、巻数の太字、別文献の既存の空白まで一律に削除・変更しない。

### 根拠と完了前の照合

| 校正コミット | 主な確認事項 |
| --- | --- |
| [4cb91ff](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/4cb91ffeac1728eefcb23abad2d6958268de1682)、[6e3751d](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/6e3751dcef794135493edd76194792789c7849d2) | 発表の年月表記、会場の簡潔化、不要な注記の削除、NQS2027 の日付修正 |
| [9ff3b5b](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/9ff3b5b77c2ce334d8e9437918ac52a024a80e71) | 英語氏名・敬称・職位、M2、受賞記事、開催報告、arXiv 表記 |
| [e4bfda3](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/e4bfda328b7394207a080181ff6f84a6894e3fc7)、[59b9ee2](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/59b9ee27e96733c2336899639551ed5990661f28) | セミナーの英語 description、参考文献の明示的改行 |
| [cf1a85c](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/cf1a85cd0469374556cd59996cd7ca22e26e86fd)、[75bf1a9](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/75bf1a911c69e78235ea0664fc51e720a095c06f) | 告知の終了、開催報告への変更、研究室の活動記事の削除 |
| [4d32a28](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/4d32a2892eae438ca47291ef7aadba645ca1e9c8)、[dde2c2a](https://github.com/yamamotolabchatgpt-art/k-yamamoto-phys.github.io/commit/dde2c2ac2c8ef25af96ebaf95544360a0ad1aa2f) | 個人サイトからの活動記事・発表項目の削除 |

コミット前に、変更対象について次を必ず照合する。

- 最新の本人校正と比較し、削除済みの注記・詳細・掲載項目を復活させていないこと。
- 発表の表示年月と `date`、人名・敬称・職位、開催状況、掲載先がそれぞれ正しいこと。
- 日英の対応、リンク先、句読点、参考文献の行末スペースが維持されていること。
- 校正例に混在する表記を根拠なく全体統一していないこと。事実関係が不明な箇所は推測で書き換えず、未確認事項として報告すること。

## 時系列データの追加順とフォーマット

- `site_data/group/` と `site_data/personal/` の `presentation.yml`、`activity.yml`、`press_releases.yml`（存在するもの）は、`date` の降順（新しい日付が上）を維持する。追加位置は登録した順ではなく日付で決め、未来の予定も同じ基準で並べる。
- `date` が期間の配列の場合は先頭の開始日を基準とし、同日の項目は既存の相対順序を維持する。日付未定（`TBA` または `null`）は末尾に置く。発表日未確定時に指定済みの会議開始日や、掲載日と受賞日の区別は変更しない。
- 論文一覧（`paper_regular.yml`）は `year` の降順を維持し、同年内の既存順序とプレプリント・出版済みの区分を保つ。会議録（`paper_conference.yml`）は明記された出版年・会議年の新しいものを上に置く。arXiv 番号を出版日とみなして並べ替えたり、未記載の月日を推測したりしない。
- CV、セミナーなど Markdown の時系列一覧も、各セクション内で新しい年月日を上に置き、対応する日本語版・英語版の順序を揃える。分類やセクションをまたいで混在させない。同年など、記載された精度で同順位の項目は元の順序を保つ。
- ソート時は項目全体を移動し、項目に付随するコメント、キー順、インデント、引用符、空行、`>` / `|` のブロック形式、日英の文章・リンクを維持する。YAML 全体を `yaml.dump` 等で再出力して書式を変更しない。
- リポジトリルートで `python site_data/_misc/sort_presentation.py` を実行すると、両サイトの発表・活動・プレスリリースを元の書式を保ってソートできる。ファイルパスを渡して対象を限定することもできる。`python site_data/_misc/sort_presentation.py --check` は書き換えずに順序を確認し、未整列なら終了コード 1 を返す。論文・Markdown はこのスクリプトの対象外なので別途確認する。
- 完了前に構文、項目数・内容の不変、降順、同日項目の順序を確認する。両言語で共通の YAML は一度の更新で双方に反映されるため、重複した言語別データを新設しない。

## 作業完了時のコミットと push

- 作業開始時に fork 元 `https://github.com/k-yamamoto-phys/k-yamamoto-phys.github.io.git` の `main` と fork の `origin/main` を取得し、それぞれの更新を確認する。fork 元の変更を取り込み、fork の `main` を同期してから作業する。履歴が分岐している場合は双方の変更を保って統合する。
- 必ず `main` を直接更新し、`work` などの作業用ブランチを新たに作成しない。既存の作業用ブランチに未統合の変更がある場合も、変更を確認して `main` に統合する。変更の実装と必要な確認を終えたら、コミットして fork の `origin/main` に push するところまで必ず実施する。
- fork 側の push と fork 元の公開サイトへの反映は別である。fork 元への反映や公開状態を確認し、未反映の場合は最終報告で明記する。
- ユーザーが明示的にコミットや push を不要と指定した場合は、その指示を優先する。それ以外は毎回の追加確認を求めずに実施する。
- 依頼対象外の既存の変更を無断でコミットに含めない。履歴を書き換える force push は行わない。
- 最終報告には push 先のブランチとコミットを記載する。push に失敗した場合は未完了であることと原因を明記する。

### 毎回実施する手順

1. `git status --short` と `git branch --show-current` で、既存の変更と現在のブランチを確認する。初期ブランチが `work` などであっても、そのまま作業せず、既存の変更を失わない方法で `main` に切り替える。ローカルに `main` がなければ `origin/main` を追跡する `main` を作成する。
2. fork 元の `main` と `origin/main` を取得し、`main` に双方の更新を統合する。既存の作業用ブランチに今回の依頼に関係する未反映コミットがあれば、それも確認して統合する。依頼対象外の変更は勝手に含めない。
3. `main` 上で依頼された変更と必要な確認を完了する。差分を確認して対象ファイルだけをステージし、コミットする。ビルド禁止など、このファイルの他の制約も守る。
4. push 直前に現在のブランチが `main` であることを再確認し、必ず `git push origin main` を実行する。追跡先設定に依存する引数なしの `git push` や、`work` などへの push で済ませない。通常の作業では push のための追加承認やPR作成を待たない。
5. リモート側に新しいコミットがあり push が拒否された場合は、再取得して双方の変更を保って統合し、影響する確認を行ってから再度 push する。force push は使わない。認証・接続・権限などの問題が残る場合は、push 未完了と原因を明記する。
6. push 成功後、`git ls-remote origin refs/heads/main` と `git rev-parse HEAD` のコミットが一致することを確認し、作業ツリーに今回の未コミット変更が残っていないことも確認する。実装やローカルのコミットだけでは完了とせず、`origin/main` への反映を確認してから完了を報告する。

## Project overview

This repository contains two websites. One is the personal website for Prof. Kazuki yamamoto, and the other is the group website of which Prof. yamamoto organizes. 

The goal is to create the readable code of websites by using the Next.js and several web technologies. 


Important notes:

- ファイルを変更した作業は、変更内容を確認し、必要なチェックを行ったうえで、必ず `main` にコミットして `origin/main` へ push すること。ユーザーから明示的にコミット・push 不要の指示がある場合を除き、ローカルの変更だけで作業完了としない。push に失敗した場合は、未完了であることと失敗理由を報告すること。
- Do not stop, restart, or replace the user-managed `localhost:3000` server unless the user explicitly asks.
- If `localhost:3000` is unreachable, report that first instead of starting a new server.
- Do not run `npm run build` command. Prefer using the existing user-managed dev server for visual checks, and avoid starting another server.
- This site uses the `/group` base path. Always include `/group` in verification URLs. For example, use `/group/ja/members`, not `/ja/members`.
