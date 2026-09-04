# トリハル 公式サイト

和歌山市南大工町の焼き鳥・鰻の持ち帰り専門店「有限会社 トリハル」の公式サイトです。

- Next.js 16（App Router）／ TypeScript ／ Tailwind CSS v4
- ページはすべて静的生成（Server Components 中心。本文はJavaScriptなしで読めます）
- ブログは Markdown ＋ GitHub Actions による1日1本の自動投稿

---

## 開発

```bash
npm install
npm run dev          # http://localhost:3000

npm run build        # 本番ビルド
npm run typecheck    # 型チェック
npm run lint         # ESLint
```

### 環境変数

`.env.example` をコピーして `.env.local` を作ってください。

| 変数 | 用途 |
| --- | --- |
| `NEXT_PUBLIC_SITE_URL` | 本番の絶対URL（例 `https://toriharu.jp`）。**未設定の場合、canonical・OG・sitemap を出力せず、robots.txt が全面 Disallow になります。**プレビューURLが誤ってインデックスされるのを防ぐための仕組みです。本番デプロイ時は必ず設定してください。 |
| `ANTHROPIC_API_KEY` | ブログ自動生成用。GitHub の Secrets に設定します（ソースには書かない） |
| `ANTHROPIC_MODEL` | 省略可。既定は `claude-haiku-4-5` |

---

## 店舗情報の直し方

**住所・電話・営業時間は [`data/shop.ts`](data/shop.ts) の1か所だけ**にあります。
ヘッダー・フッター・各ページ・構造化データ（JSON-LD）はすべてここを参照しているので、
ここを直せば全ページの表記が同時に変わります。個別のページに直接書かないでください。

```text
data/
  shop.ts             店舗情報（NAPの唯一の正）
  verified-facts.json 「事実として書いてよいこと」「絶対に書いてはいけないこと」
                      ※ ブログ自動生成スクリプトも同じファイルを読みます
  menu.ts             商品と価格
  seasonal.ts         季節限定商品
  photos.ts           写真とalt
  faq.ts              よくあるご質問（画面表示とFAQPage構造化データの両方）
  nav.ts              ナビゲーション
```

### 価格を変えるとき

`data/menu.ts` を編集します。**確認できていない価格は `price: null`** にしてください。
`null` の商品は画面に「店頭にてご確認ください」と表示され、価格を出しません。

現在掲載している価格は、2026年8月時点の店頭掲示（ショーケースの品書き）と店舗確認にもとづいています。
鰻は一尾3,800円〜（税込・秘伝ダレ込み）です。

### 季節限定商品を出す・引っ込める

`data/seasonal.ts` の `seasonalItems` に追記するだけです。トップページの「季節の一品」と
`/seasonal` に自動で反映されます。

- `status: 'onsale'` … 販売中
- `status: 'upcoming'` … まもなく
- `status: 'ended'` … 販売終了（控えめに表示）
- `status: 'draft'` … 画面に出さない

**季節商品がひとつも無い期間でもレイアウトは崩れません。**「現在、季節限定商品の販売は
ありません」という案内に切り替わります。

### 写真を差し替える・追加する

1. 画像を `public/photos/` に置く
2. `data/photos.ts` に `src` / `alt` / `width` / `height` / `kind` を追記
3. 使いたい場所で `photos.〇〇` を参照

`kind` は2種類あります（内部管理用で、画面には表示されません）。

- `'shop'` … トリハルの実写
- `'image'` … イメージ写真（店舗の実写ではない）

> 現在は `img-` で始まる4点だけがイメージ写真です（トップのヒーローを含め、
> ほかはすべて店舗の実写です）。実写が用意できたら `data/photos.ts` の該当箇所を
> 差し替えてください。`kind: 'image'` で検索すれば対象がすべて見つかります。

#### 写真を追加・差し替えするときの注意

- 提供写真は撮影時の向き情報（EXIF）が失われていることがあります。縦横が違って見える
  場合は90度回転で直ることが多いので、置く前に必ず目視で確認してください
- **鰻は頭が右を向く向きで揃えています。** 秤は立った状態が正しい向きです
- 何が写っているかを必ず確認してください。過去に秋刀魚の炭火焼きを「鰻の白焼き」として
  掲載していた誤りがありました
- 鰻を捌いている写真は掲載しない方針です（店舗の意向）
- **写真を差し替えたら `.next/cache/images` を消してから再ビルドしてください。**
  ファイル名が同じだと、最適化済みの古い画像がキャッシュから返り続けます

---

## ブログの自動投稿

`.github/workflows/daily-blog.yml` が **日本時間で毎朝9:20** に動きます。

1. `scripts/topics.mjs` から、まだ書いていないテーマを1つ選ぶ
2. Claude（既定は Haiku）で記事を生成
3. 検証（文字数・内部リンク・重複タイトル・禁止表現）を通ったものだけ採用
4. `content/blog/YYYY-MM-DD-スラッグ.md` に保存し、ビルドが通ることを確認してから push

### 準備

GitHub リポジトリの設定で以下を登録してください。

- **Secrets** → `ANTHROPIC_API_KEY`
- **Variables**（任意）→ `ANTHROPIC_MODEL` / `NEXT_PUBLIC_SITE_URL`

### 手元で内容だけ確認する

```bash
ANTHROPIC_API_KEY=xxx DRY_RUN=1 npm run blog:generate
```

ファイルを書かず、生成された記事を標準出力に表示します。

### 記事が創作しないための仕組み

生成AIには `data/verified-facts.json` の内容だけを「店の事実」として渡しています。
さらに、生成後に次のようなものを機械的に弾いています。

- 店内飲食・通販サイトの記述
- 健康効果の断定
- 「究極」「絶品」などの誇大表現
- 未確認の創業年、「〇代目」
- 年によって変わる具体的な日付

**店の情報が変わったら `data/verified-facts.json` も更新してください。**
ここを直さないと、AIは古い情報のまま書き続けます。

### テーマを増やす

`scripts/topics.mjs` に追記します。現在46テーマあり、1日1本で約1か月半ぶんです。
書き切ると「すべてのトピックを書き終えています」と表示して何もしません。

---

## SEO まわり

- 各ページの `title` / `description` / OG / canonical は `lib/seo.ts` の `buildMetadata()` 経由
- 構造化データは `lib/jsonld.ts`
  - 全ページ … `Store` + `FoodEstablishment`（持ち帰り専門なので `takeoutAvailable: true`）、`WebSite`
  - 下層ページ … `BreadcrumbList`
  - `/faq` … `FAQPage`（**画面に出しているFAQと完全に同じ内容だけ**）
  - 記事 … `BlogPosting`
- `sitemap.xml` はブログ記事が増えると自動で反映されます
- `geo`（緯度経度）は一次情報で確認できていないため出力していません。確認できたら
  `data/shop.ts` の `geo` に入れれば自動で構造化データに載ります

---

## 注意していること

- **店内飲食の店だと誤解させない。** 「持ち帰り専門店」「店内に客席はありません」を
  複数箇所で明記しています。文言を減らすときは注意してください
- **確認できていないことは書かない。** 創業年（明治とだけ）、座標、駐車場の有無、
  仕入れ先などは、確認できるまで書かない方針です
- 写真の `alt` は「写っているもの」を書きます。キーワードを詰め込まない
