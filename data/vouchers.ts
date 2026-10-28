/**
 * 期間限定で使える商品券（和歌山市のプレミアム付商品券など）。
 *
 * ── 更新のしかた ──────────────────────────────
 * 下の `vouchers` に追記するだけで、利用期間のあいだだけ次の場所に表示されます。
 *
 *  - トップページのお知らせ（ヒーローのすぐ下）
 *  - 店舗情報・持ち帰り・商品一覧の「お支払い」
 *  - よくあるご質問（FAQPage の構造化データにも同じ内容）
 *  - 構造化データの paymentAccepted
 *
 * 期間は日本時間で、startsOn〜endsOn の両日を含みます。
 * 期間が過ぎると自動で画面から消えます（ページは app/layout.tsx の revalidate で
 * 1時間ごとに作り直しています）。終わったあとに消し忘れても大丈夫です。
 *
 * 期間の決まった情報なので、data/verified-facts.json の facts には入れません。
 * ブログ記事に書かれると、期間が終わったあとも記事に残ってしまうためです。
 * ───────────────────────────────────────────
 */

export type Voucher = {
  /** 発行元（見出しの改行位置にも使う） */
  issuer: string;
  /** 商品券の名前（発行元を除く） */
  name: string;
  /** 同じ名前の商品券が毎年出るので、年度で区別する */
  edition: string;
  /** 利用開始日（日本時間・YYYY-MM-DD） */
  startsOn: string;
  /** 利用終了日（日本時間・YYYY-MM-DD。この日を含む） */
  endsOn: string;
  /** ご利用にあたっての注意。公式の案内に書かれていることだけ */
  note: string;
  /** 取扱店舗向けに配られた告知画像。無ければ null */
  image: { src: string; alt: string; width: number; height: number } | null;
};

export const vouchers: Voucher[] = [
  /* 2026年10月に店舗から提供された、取扱店舗向けの告知画像による */
  {
    issuer: '和歌山市',
    name: 'プレミアム付商品券',
    edition: '令和8年度',
    startsOn: '2026-10-20',
    endsOn: '2026-12-31',
    note: 'おつりは出ませんので、端数は現金などと併せてお支払いください。',
    image: {
      src: '/photos/wakayama-premium-voucher-2026.jpg',
      alt: '令和8年度 和歌山市プレミアム付商品券「取扱店舗」のポスター',
      width: 1254,
      height: 1254,
    },
  },
];

const DAY = 24 * 60 * 60 * 1000;
const WEEKDAYS = ['日', '月', '火', '水', '木', '金', '土'];

/** 'YYYY-MM-DD' を、日本時間のその日の 0:00 として扱う */
function jstStartOf(ymd: string) {
  return new Date(`${ymd}T00:00:00+09:00`).getTime();
}

/** '2026-10-20' → '令和8年10月20日（火）'。year: false で年を省く */
function jpDate(ymd: string, { year = true } = {}) {
  const [y, m, d] = ymd.split('-').map(Number);
  const w = WEEKDAYS[new Date(Date.UTC(y, m - 1, d)).getUTCDay()];
  return `${year ? `令和${y - 2018}年` : ''}${m}月${d}日（${w}）`;
}

/**
 * いま使える商品券と、画面に出すための文言。期間外なら null。
 * 静的に書き出したページでも期間どおりに切り替わるよう、必ず描画のたびに呼ぶこと
 * （モジュールの最上位で結果を持っておかない）。
 */
export function currentVoucher(now: Date = new Date()) {
  const t = now.getTime();
  const v = vouchers.find((x) => t >= jstStartOf(x.startsOn) && t < jstStartOf(x.endsOn) + DAY);
  if (!v) return null;

  const fullName = `${v.issuer}${v.name}`;
  const until = `${jpDate(v.endsOn)}まで`;
  const sameYear = v.startsOn.slice(0, 4) === v.endsOn.slice(0, 4);

  return {
    ...v,
    /** 和歌山市プレミアム付商品券 */
    fullName,
    /** 令和8年10月20日（火） */
    start: jpDate(v.startsOn),
    /** 12月31日（木）（開始と同じ年なら年を省く） */
    end: jpDate(v.endsOn, { year: !sameYear }),
    /** 令和8年12月31日（木）まで */
    until,
    /** お支払いの案内に続けて出す文 */
    paymentNote: `${until}は、${fullName}もご利用いただけます。${v.note}`,
  };
}
