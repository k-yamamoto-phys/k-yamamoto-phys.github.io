# ディレクトリの設計

- .github/workflows: github actionsを記述（githubにpushした際に実行されるコマンド）
- site_data: 個人サイトと研究室の両方の具体的な情報を集約
    - personal: 個人サイトに必要な情報をまとめる。
    - group: グループサイトに必要な情報をまとめる。
- personal_website: 個人サイト(GitHub pagesでデプロイ)
    - favicon.ico: ページのタブなどにつくアイコンを制御
    - public: 画像などのstatic assetの置き場所
    - app: websiteの本体
        - (pages): ページのデザイン
            - (en): 英語サイト（デフォルトとして利用する）
            - ja: 日本語サイトは<ドメイン>/ja/を利用
        - lib: markdownのコンパイラーなど（グループのものと共通する可能性があるので、将来的にtop directoryに移動予定）
        - ui: サイト共通コンポーネント
- group_website: 研究室のホームページ(大学の所定の場所にデプロイ)
    - app: websiteの本体
        - (pages):
            - (en): 英語サイト
                - (toppage)
                - members
                - publications: 別の先生と一緒で共同になる可能性を踏まえて、執筆者に山本先生が入らないような、論文が出てきてもおかしくないため、分けておく。
                - presentations: 別の先生と一緒で共同になる可能性を踏まえて、執筆者に山本先生が入らないような、論文が出てきてもおかしくないため、分けておく。
                - activities: 学生の活動などの山本先生個人の活動と関係ない項目が追加できるようにしておく。
                - [other_pages] : markdownを適当に登録すると自動的に作成されるようにする
                    - research
                    - contact_access
                    - recruiting
            - ja: 日本語サイト
                - (toppage)
                - members
                - publications
                - seminar
                - news
                - [other_pages] : 英語ページと同様にmarkdownを作成することで自動作成するページ
                    - research
                    - contact_access
                    - recruiting



## サイトの設計に関するメモ

- 基本的に英語をドメインのメインとして作成する。日本語ページを/jaに配置


## 開発ログ

### 2026/02/10

webapp下に、山本先生の個人ページが形成されている。
今後、研究室のホームページをresearch_group/に作成する。
その際に、読み込むデータlayerが現在は、webappの中にあるが、今後はresearch_groupからも、同様の情報を読み込ませたい関係から、site_dataという新たなディレクトリを作り、すべてのデータをそこから読み取るように変更することを考える。そのようにすることでアイテムおよび、情報を一元的に管理するようにする。

### 2026/02/13

- footerを作る
    - 大学のロゴ
    - 学部・学科名
    - 研究室名
    - 所在地
- 最近の活動は研究室と個人ページでわけるのか？
- 項目が増えてもいいように、Headerを2段にして、研究室名と被らないようにする。またスマホのしっかりとしたハンバーガーメニューを作る
- publicationのデザインをもうすこしがんばる。さすがに項目ごとの間隔の設定がでたらめすぎる
- タイポグラフィをもっとしっかり整える。今のままはひどすぎる
- markdownから完全に生成されるページについて、frontmatterをうまく設定するようにして、情報を加える。