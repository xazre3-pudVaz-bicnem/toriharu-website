/**
 * 季節限定販売品。
 *
 * ── 更新のしかた ──────────────────────────────
 * 下の `seasonalItems` に追記するだけで、トップページの「季節の一品」と
 * /seasonal ページ、sitemap に自動で反映されます。
 *
 *  status: 'onsale'   … 販売中として表示
 *          'upcoming' … 「まもなく」として表示
 *          'ended'    … 販売終了。過去の品として控えめに表示
 *          'draft'    … 画面には一切出さない（下書き）
 *
 *  写真は public/photos/ に置いて、image に '/photos/ファイル名' を書きます。
 *  写真が無い場合は image: null。レイアウトは崩れません。
 *
 *  価格が確定していない場合は price: null にしてください。
 *  （確認できていない価格は表示しない方針です）
 *
 * 季節商品がひとつも無い期間でも、ページは「今は季節商品の販売はありません」と
 * 表示されるだけでデザインは崩れません。
 * ───────────────────────────────────────────
 */

export type SeasonalStatus = 'onsale' | 'upcoming' | 'ended' | 'draft';

export type SeasonalItem = {
  slug: string;
  /** 商品名 */
  name: string;
  /** 一行の説明 */
  summary: string;
  /** 詳しい説明（任意・改行で段落） */
  body?: string;
  /** 販売期間の表示用テキスト（例: '7月中旬〜8月上旬'）*/
  period: string | null;
  /** 税込価格。未確定は null */
  price: number | null;
  /** '/photos/xxx.jpg' 形式。無ければ null */
  image: string | null;
  /** 画像の説明（alt）。image がある場合は必ず書く */
  imageAlt?: string;
  status: SeasonalStatus;
};

export const seasonalItems: SeasonalItem[] = [
  {
    slug: 'christmas-chicken',
    name: 'クリスマスチキン',
    summary:
      '骨付きの鶏もも肉を、紀州備長炭で生から焼き上げます。味付けは塩胡椒のみ。毎年この時期だけのご用意です。',
    body: `下焼きをせず、生の状態から炭火にかけます。時間はかかりますが、そのぶん皮は香ばしく、骨のまわりまで火が通ります。
味は塩胡椒だけ。鶏の味がそのまま出るので、素材と焼き加減だけで決まります。
ご予約はまもなく承ります。価格は仕入れが決まり次第、こちらでお知らせいたします。数に限りがございますので、お早めにご相談ください。`,
    period: '12月（ご予約はまもなく開始）',
    price: null,
    image: '/photos/christmas-chicken.jpg',
    imageAlt: '塩胡椒をふった骨付きの鶏もも肉を、紀州備長炭の炭火で焼き上げているところ',
    status: 'upcoming',
  },
];

export const visibleSeasonalItems = seasonalItems.filter((i) => i.status !== 'draft');
export const onSaleSeasonalItems = seasonalItems.filter((i) => i.status === 'onsale');

export const seasonalIntro =
  'トリハルでは、季節ごとに扱う品が少しずつ変わります。土用の丑の日の前後は鰻の仕込みが増え、寒くなれば焼き鳥の売れ方も変わる。仕入れと、その日の火の入り具合と相談しながら、店頭に並ぶものを決めています。';

export const seasonalEmptyMessage =
  '現在、季節限定商品の販売はありません。時期のご相談は、お電話または店頭でお気軽にお尋ねください。';
