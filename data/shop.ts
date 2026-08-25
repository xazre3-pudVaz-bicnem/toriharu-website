import verified from './verified-facts.json';

/**
 * トリハル 店舗情報の Single Source of Truth。
 *
 * ここに書かれているのは、店舗提供の写真・店頭掲示・現行の案内から
 * 事実として確認できた情報のみです。
 * 未確認の情報は追加せず、`verified: false` か null で管理してください。
 * （ブログ自動生成もこのファイルの内容だけを店舗固有情報として参照します）
 */

export const shop = {
  /** 表示名 */
  name: 'トリハル',
  /** 会社名（法人格つき） */
  legalName: '有限会社 トリハル',
  /** 英字表記（ロゴ・パンくず補助用） */
  nameEn: 'TORIHARU',
  /** 業態の一言説明 */
  tagline: '和歌山市の老舗 焼き鳥・国産鰻の持ち帰り専門店',
  /** ブランドテーマ */
  concept: '受け継ぐ火、受け継ぐ味。',

  address: {
    postalCode: '640-8032',
    prefecture: '和歌山県',
    city: '和歌山市',
    street: '南大工町20',
    /** 表示用のフル住所（NAP統一のため必ずここを参照） */
    full: '〒640-8032 和歌山県和歌山市南大工町20',
    /** 構造化データ用（郵便番号を除いた住所行） */
    line: '南大工町20',
    country: 'JP',
  },

  tel: '073-422-4088',
  /** tel: リンク用 */
  telHref: 'tel:0734224088',

  hours: {
    /** 表示用 */
    label: '8:30〜17:00',
    open: '08:30',
    close: '17:00',
    /**
     * 定休日：商品の包装紙に「毎週火曜日定休日です」と明記されているため、
     * 火曜日のみを確定情報として扱う。
     * 臨時休業・不定休は店舗にご確認いただく案内とする。
     */
    closedDays: ['火曜日'],
    closedNote: '臨時休業をいただく場合があります。お出かけ前にお電話でご確認ください。',
  },

  /** 店舗は南大工町の1店舗のみ */
  singleStore: true,
  /** 目印 */
  landmark: 'フォルテワジマの西隣',

  instagram: 'https://www.instagram.com/toriharu_unagi/',
  instagramHandle: '@toriharu_unagi',

  /** Googleマップ検索用クエリ（座標が確認できていないため geo は出力しない） */
  mapQuery: '有限会社トリハル 和歌山県和歌山市南大工町20',
  mapEmbedSrc:
    'https://www.google.com/maps?q=' +
    encodeURIComponent('和歌山県和歌山市南大工町20 トリハル') +
    '&output=embed',
  mapLink:
    'https://www.google.com/maps/search/?api=1&query=' +
    encodeURIComponent('和歌山県和歌山市南大工町20 トリハル'),

  /**
   * 座標は一次情報で確認できていないため null。
   * 確認できた時点でここに入れれば LocalBusiness の geo が自動で出力されます。
   */
  geo: null as { lat: number; lng: number } | null,

  /** 創業：既存サイト・店舗案内より「明治創業」。具体的な年は未確認のため書かない。 */
  founded: {
    era: '明治',
    /** 具体的な創業年は未確認。判明したら西暦を入れる。 */
    year: null as number | null,
    /** 「120年以上」は店舗案内に基づく表現 */
    yearsLabel: '120年以上',
  },
} as const;


/**
 * ブログ自動生成・本文で使ってよい「確定した事実」だけをまとめたもの。
 * 実体は data/verified-facts.json にあり、記事生成スクリプトも同じファイルを読みます。
 * （店舗固有の情報を1か所で管理するため）
 */
export const verifiedFacts: readonly string[] = verified.facts;

/** 逆に、絶対に書いてはいけないこと（生成AI向けのガード） */
export const forbiddenClaims: readonly string[] = verified.forbidden;
