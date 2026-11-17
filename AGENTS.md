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
