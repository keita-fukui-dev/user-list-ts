# ユーザー一覧アプリ（React + TypeScript）

生徒とメンターのユーザー一覧をテーブルで表示する学習用アプリです。
React に TypeScript を導入し、型定義で誤りを防ぐ書き方を学ぶことを目的にしています。

公開 URL：https://keita-fukui-dev.github.io/user-list-ts/

![PC：全員タブ](https://github.com/keita-fukui-dev/user-list-ts/blob/screenshots/pc-all.png?raw=true)

## 機能
| 機能 | 内容 |
| --- | --- |
| 一覧表示 | 初期表示は生徒とメンターを混在して表示します。そのロールにない列は空欄です |
| タブ切替 | 「全員」「生徒のみ」「メンターのみ」で表示を切り替えます |
| ソート | 生徒は勉強時間・ハピネススコア、メンターは実務経験月数で、昇順・降順に並べ替えます |
| 対応可能な相手 | 生徒の課題番号が、メンターの担当範囲（初め〜終わり、両端を含む）に入っていれば、互いの名前を表示します |
| 新規登録 | 生徒・メンターを登録できます。各ロールの項目はすべて必須です。リロードすると登録したユーザーは消えます |
| filter | 趣味と言語（勉強中の言語・現場で使っている言語）で絞り込みます。両方を選ぶと AND 条件になります |

### 表示の換算
| 項目 | 元データ | 表示 |
| --- | --- | --- |
| 勉強時間 | `studyMinutes`（分） | 60で割って四捨五入した時間（47800分 → 797時間） |
| 実務経験月数 | `experienceDays`（日） | 30日＝1ヶ月として切り捨てた月数（1850日 → 61ヶ月） |

ソートは換算前の値で比べるので、丸めの誤差は並び順に影響しません。

### 登録フォームの入力チェック
- すべての項目が必須です
- 数値項目は0以上の整数です（年齢は150以下、ハピネススコアは100以下）
- 担当できる課題番号は「初め ≤ 終わり」である必要があります
- メールアドレス・URL（http/https）・郵便番号（`123-4567`）・電話番号（0から始まる10〜11桁）の形式を確認します
- 登録済みのメールアドレスは使えません（大文字小文字は区別しません）
- 数値・郵便番号・電話番号は、全角の数字やハイフンを半角に変換してから確認します
- 趣味・言語はカンマ区切りで入力します（`,` `，` `、` を使えます）

## 技術スタック
| 種類 | 使っているもの |
| --- | --- |
| 言語 | TypeScript 6.0 |
| UI | React 19 |
| ビルド | Vite 8 |
| 静的解析 | oxlint |
| 公開 | GitHub Pages（gh-pages） |

## 使い方
```bash
npm install
npm run dev      # 開発サーバーを起動
npm run build    # 型チェック（tsc -b）とビルド
npm run lint     # 静的解析（oxlint）
npm run preview  # ビルド結果を確認
npm run deploy   # ビルドして gh-pages ブランチへ公開
```

## ディレクトリ構成
```
src/
├── App.tsx          # 一覧・タブ・filter・登録の状態を持つ
├── components/      # テーブル、列、タブ、ソートボタン、filter、登録フォーム
├── data/users.ts    # 課題で与えられたユーザー一覧（USER_LIST）
├── types/user.ts    # ユーザー・フォーム・ソート・filter の型
└── utils/           # 並べ替え、絞り込み、マッチング、換算、入力チェックなどの関数
```

## 型の設計
- `User = Student | Mentor` は、`role` をタグにした判別可能な Union 型です。`role` を確かめると、その型だけにある項目を安全に使えます
- `isStudent` / `isMentor` は型ガードです。`users.filter(isStudent)` の戻り値は `Student[]` になります
- `sortUsers` は、値が number の項目だけをキーとして受け付けます。生徒のテーブルで `experienceDays` を指定すると、コンパイルエラーになります
- 登録前のユーザーは `NewStudent | NewMentor` です。`Omit<User, 'id'>` と書くと Union の区別が消えるので、ロールごとに `Omit` をかけています
- `any`、`as` による型の握りつぶし、`@ts-ignore` は使っていません

## スクリーンショット
| PC | スマホ |
| --- | --- |
| ![生徒のみ・勉強時間で降順](https://github.com/keita-fukui-dev/user-list-ts/blob/screenshots/pc-student-sorted.png?raw=true) | ![全員タブ（横スクロール）](https://github.com/keita-fukui-dev/user-list-ts/blob/screenshots/mobile-all.png?raw=true) |
| ![言語 filter](https://github.com/keita-fukui-dev/user-list-ts/blob/screenshots/pc-filter.png?raw=true) | ![新規登録フォーム](https://github.com/keita-fukui-dev/user-list-ts/blob/screenshots/mobile-form.png?raw=true) |
