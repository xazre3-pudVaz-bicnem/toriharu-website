/**
 * 商品データ。
 *
 * 価格は「店頭のメニュー表・掲示（2026年8月時点の店舗提供写真）」で
 * 確認できたもののみ掲載しています。確認できない商品は price: null とし、
 * 画面には価格を出しません。
 */

export type Availability =
  | 'regular' // 通常販売
  | 'limited' // 1日数本などの少量販売
  | 'reserve' // 予約推奨
  | 'seasonal'; // 時期による

export type MenuItem = {
  slug: string;
  name: string;
  reading?: string;
  en?: string;
  /** 税込価格（円）。確認できないものは null */
  price: number | null;
  unit?: string;
  note?: string;
  availability: Availability;
};

export type MenuGroup = {
  id: string;
  title: string;
  lead: string;
  items: MenuItem[];
  /** グループ全体への注記 */
  notes?: string[];
};

/** 店頭掲示より：ももやきとり以外は少量販売という共通注記 */
const YAKITORI_NOTES = [
  'ももやきとり以外は日に0〜数本のみの店頭販売となります。',
  '当日9時頃までのご予約で、5本以上からご用意できる場合があります（う肝を除く）。',
  '仕入れの状況により、ご用意できない品もございます。',
];

export const unagiItems: MenuItem[] = [
  {
    slug: 'kabayaki',
    name: '上焼き鰻（蒲焼）',
    en: 'Unagi Kabayaki',
    price: null,
    unit: '一尾',
    note: '店頭表示は一尾およそ4,000円〜5,000円（税込・秘伝ダレ込み）。鰻の大きさや仕入れにより変わります。',
    availability: 'regular',
  },
  {
    slug: 'shirayaki',
    name: '鰻の白焼き',
    en: 'Unagi Shirayaki',
    price: null,
    unit: '一尾',
    note: 'タレを使わず、素焼きで仕上げた白焼き。ご要望を承ります（時期によりお断りする場合があります）。',
    availability: 'reserve',
  },
  {
    slug: 'ukimo',
    name: 'う肝串',
    en: 'Grilled eel liver',
    price: 324,
    unit: '1本',
    note: '鰻の肝の串。数量限定で、ご予約は承っておりません。',
    availability: 'limited',
  },
  {
    slug: 'honesenbei',
    name: '鰻の骨せんべい',
    price: null,
    note: '鰻を捌いたその日の中骨を、香ばしく揚げた一品。',
    availability: 'limited',
  },
];

export const yakitoriItems: MenuItem[] = [
  { slug: 'momo', name: 'ももやきとり', en: 'Momo (Thigh)', price: 194, unit: '1本', note: '定番。毎日焼いています。', availability: 'regular' },
  { slug: 'mune', name: 'むねやきとり', en: 'Mune (Breast)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'negima', name: 'ねぎ串（ねぎま）', en: 'Negima', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'kawa', name: '皮', en: 'Kawa (Skin)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'kimo', name: 'とり肝', en: 'Kimo (Liver)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'sasami', name: 'ささみ', en: 'Sasami (Tenderloin)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'sunazuri', name: '砂ずり', en: 'Sunagimo (Gizzard)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'tebasaki', name: '手羽先', en: 'Tebasaki (Wing)', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'momonankotsu', name: 'ももなんこつ', en: 'Knee cartilage', price: 194, unit: '1本', availability: 'limited' },
  { slug: 'yagen', name: 'ヤゲンなんこつ', en: 'Bevel cartilage', price: 216, unit: '1本', availability: 'limited' },
  { slug: 'hatsu', name: 'ハツ（心臓）', en: 'Kokoro (Heart)', price: 216, unit: '1本', availability: 'limited' },
  { slug: 'seseri', name: 'せせり', en: 'Seseri (Neck)', price: 238, unit: '1本', availability: 'limited' },
];

export const otherItems: MenuItem[] = [
  {
    slug: 'namaniku',
    name: '生肉',
    price: null,
    note: 'もも・むね・もも骨付き・鶏肝・手羽先など。仕入れの状況によりご用意できない場合があります。',
    availability: 'seasonal',
  },
  {
    slug: 'sansho',
    name: '紀州の山椒（香山椒）小袋',
    price: null,
    note: '鰻に添えて。紀州ならではの香りをどうぞ。',
    availability: 'regular',
  },
  {
    slug: 'shioyakitori',
    name: '塩やきとり',
    price: null,
    note: 'ご要望を承ります（時期等によりお断りさせていただく場合があります）。',
    availability: 'reserve',
  },
];

export const menuGroups: MenuGroup[] = [
  {
    id: 'unagi',
    title: '鰻',
    lead: '国産の活鰻を、毎朝この店で捌きます。紀州備長炭と、受け継いできた秘伝のタレで焼き上げた一尾です。',
    items: unagiItems,
    notes: [
      '鰻の価格は大きさ・仕入れによって変わります。詳しくは店頭またはお電話でお尋ねください。',
      '上焼き鰻・鰻の白焼きは全国発送を承ります（宅急便コレクト＝代金引換もご利用いただけます）。',
    ],
  },
  {
    id: 'yakitori',
    title: '焼き鳥',
    lead: '国産の鶏だけを使い、紀州備長炭で焼きます。串は1本から、その日焼いたぶんだけの販売です。',
    items: yakitoriItems,
    notes: YAKITORI_NOTES,
  },
  {
    id: 'other',
    title: 'そのほか',
    lead: '焼いたものだけでなく、生肉や、鰻に添える山椒もご用意しています。',
    items: otherItems,
  },
];

export const availabilityLabel: Record<Availability, string> = {
  regular: '通常販売',
  limited: '少量販売',
  reserve: 'ご要望承ります',
  seasonal: '入荷次第',
};

export const priceNotice =
  '価格はすべて税込です。店頭掲示（2026年8月時点）をもとにしています。仕入れの状況により変更となる場合がありますので、最新の価格は店頭またはお電話でご確認ください。';
