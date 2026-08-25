/**
 * 写真の一元管理。
 * alt は「画像に写っているもの」を正確に書く（キーワード詰め込みはしない）。
 *
 * kind:
 *   'shop'  … トリハルの実写（店舗提供）
 *   'image' … イメージ写真（店舗の実写ではない）。差し替え対象を見分けるための内部管理用
 */

export type Photo = {
  src: string;
  alt: string;
  width: number;
  height: number;
  kind: 'shop' | 'image';
};

const shopPortrait = { width: 1108, height: 1477 } as const;
const shopLandscape = { width: 1477, height: 1108 } as const;

export const photos = {
  /* ── 鰻 ─────────────────────────────── */
  tareDip: {
    src: '/photos/tare-dip.jpg',
    alt: '焼き上げた鰻を、トリハルの焼き場で秘伝のタレにくぐらせているところ',
    ...shopPortrait,
    kind: 'shop',
  },
  liveEels: {
    src: '/photos/live-eels.jpg',
    alt: 'トリハルの店内で、桶のなかで泳いでいる国産の活鰻',
    ...shopLandscape,
    kind: 'shop',
  },
  sabaki01: {
    src: '/photos/sabaki-01.jpg',
    alt: '目打ちをした鰻を、まな板の上で背開きにしていく職人の手元',
    ...shopPortrait,
    kind: 'shop',
  },
  sabaki02: {
    src: '/photos/sabaki-02.jpg',
    alt: '朝、店の作業台で鰻を一尾ずつ捌いているところ',
    ...shopPortrait,
    kind: 'shop',
  },
  unagiOnGrill01: {
    src: '/photos/unagi-on-grill-01.jpg',
    alt: '捌いたばかりの鰻を炭火の網に並べたところ。奥にはタレの入った鍋が置かれている',
    ...shopPortrait,
    kind: 'shop',
  },
  unagiOnGrill02: {
    src: '/photos/unagi-on-grill-02.jpg',
    alt: '身側から炭火にかけられ、少しずつ白く火が入っていく鰻',
    ...shopPortrait,
    kind: 'shop',
  },
  shirayaki01: {
    src: '/photos/shirayaki-grill-01.jpg',
    alt: '皮目を下にして炭火で焼かれ、焼き目のついた鰻の白焼き',
    ...shopPortrait,
    kind: 'shop',
  },
  shirayaki02: {
    src: '/photos/shirayaki-grill-02.jpg',
    alt: '網の上に並んだ鰻の白焼き。皮に細かな焼き目が入っている',
    ...shopPortrait,
    kind: 'shop',
  },
  shirayaki03: {
    src: '/photos/shirayaki-grill-03.jpg',
    alt: 'トリハルの焼き場で、五尾の鰻を白焼きにしているところ',
    ...shopPortrait,
    kind: 'shop',
  },
  kabayakiTray: {
    src: '/photos/kabayaki-tray.jpg',
    alt: 'タレを重ねて焼き上げ、バットに並べた鰻の蒲焼',
    ...shopPortrait,
    kind: 'shop',
  },
  kabayakiShowcase: {
    src: '/photos/kabayaki-showcase.jpg',
    alt: '店頭のショーケースに並ぶ、焼き上がったばかりの鰻の蒲焼',
    ...shopPortrait,
    kind: 'shop',
  },
  kabayakiWrapped01: {
    src: '/photos/kabayaki-wrapped-01.jpg',
    alt: '竹皮に載せ、トリハルの包装紙で包む前の鰻の蒲焼一尾',
    ...shopPortrait,
    kind: 'shop',
  },
  kabayakiWrapped02: {
    src: '/photos/kabayaki-wrapped-02.jpg',
    alt: '有限会社トリハルの包装紙の上に置かれた、竹皮入りの鰻の蒲焼',
    ...shopPortrait,
    kind: 'shop',
  },
  honesenbei: {
    src: '/photos/honesenbei.jpg',
    alt: 'その日に捌いた鰻の中骨を、香ばしく揚げた鰻の骨せんべい',
    ...shopPortrait,
    kind: 'shop',
  },

  /* ── 焼き鳥 ─────────────────────────── */
  yakitoriTray: {
    src: '/photos/yakitori-tray.jpg',
    alt: '焼き上がった、もも・ねぎ串などの焼き鳥をバットに並べたところ',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriMomoGrill: {
    src: '/photos/yakitori-momo-grill.jpg',
    alt: '炭火の上で焼き色がついていく、もものやきとり',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriNegimaGrill: {
    src: '/photos/yakitori-negima-grill.jpg',
    alt: '炭火で焼かれ、ねぎに焦げ目がついたねぎ串',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriSmoke: {
    src: '/photos/yakitori-smoke.jpg',
    alt: '煙を上げながら炭火で焼かれている焼き鳥の列',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriKawa: {
    src: '/photos/yakitori-kawa.jpg',
    alt: '焼き場にずらりと並べられた、鶏皮の串',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriLineup: {
    src: '/photos/yakitori-lineup.jpg',
    alt: '焼き場に並ぶ、皮・ねぎ串・とり肝などの串。奥から順に火を入れていく',
    ...shopPortrait,
    kind: 'shop',
  },
  yakitoriKimo: {
    src: '/photos/yakitori-kimo.jpg',
    alt: '一本ずつ手で刺した、とり肝の串',
    ...shopPortrait,
    kind: 'shop',
  },

  /* ── 店・道具 ───────────────────────── */
  storefront: {
    src: '/photos/storefront.jpg',
    alt: '和歌山市南大工町にあるトリハルの店構え。赤い庇と「トリハル」の看板、店頭のショーケース',
    ...shopPortrait,
    kind: 'shop',
  },
  showcaseMenu: {
    src: '/photos/showcase-menu.jpg',
    alt: 'トリハル店頭のショーケース。上に鰻と焼き鳥のメニュー表と価格の掲示が貼られている',
    ...shopLandscape,
    kind: 'shop',
  },
  scale: {
    src: '/photos/scale.jpg',
    alt: '店で長く使われてきた、分銅式の古い上皿さおばかり',
    ...shopLandscape,
    kind: 'shop',
  },
  tareBottles: {
    src: '/photos/tare-bottles.jpg',
    alt: '古い秤の手前に置かれた、赤いキャップのタレの小瓶',
    ...shopPortrait,
    kind: 'shop',
  },
  sansho: {
    src: '/photos/sansho.jpg',
    alt: '鰻に添える「紀州 香山椒」の小袋',
    ...shopPortrait,
    kind: 'shop',
  },

  /* ── イメージ写真（店舗の実写ではありません／差し替え候補）─────── */
  heroYakitoriTare: {
    src: '/photos/hero-yakitori-tare.jpg',
    alt: '炭火の上でタレを刷毛で塗り重ねられていく、もも串とねぎ串',
    width: 1536,
    height: 1024,
    kind: 'image',
  },
  imgCharcoalUnagi: {
    src: '/photos/img-charcoal-unagi.jpg',
    alt: '炭火の上でタレをまとった鰻が焼かれ、白い煙が立ちのぼる様子',
    width: 1672,
    height: 941,
    kind: 'image',
  },
  imgYakitoriPlate: {
    src: '/photos/img-yakitori-plate.jpg',
    alt: '陶器の皿に並べられた、もも・ねぎま・皮・肝などの焼き鳥',
    width: 1448,
    height: 1086,
    kind: 'image',
  },
  imgCraftHands: {
    src: '/photos/img-craft-hands.jpg',
    alt: '炭火の焼き台に向かい、串を手に鰻を焼く職人の手元',
    width: 1536,
    height: 1024,
    kind: 'image',
  },
  imgTareBrush: {
    src: '/photos/img-tare-brush.jpg',
    alt: '刷毛でタレを塗り重ねながら、炭火で焼き上げていく串',
    width: 1536,
    height: 1024,
    kind: 'image',
  },
  imgTakeout: {
    src: '/photos/img-takeout.jpg',
    alt: '折箱に詰めた鰻と、経木の箱に並べた焼き鳥、紙袋や風呂敷などの持ち帰りの支度',
    width: 1536,
    height: 1024,
    kind: 'image',
  },
  imgUnaju: {
    src: '/photos/img-unaju.jpg',
    alt: '重箱のごはんの上に蒲焼をのせ、山椒の葉を添えた食卓の一皿',
    width: 1122,
    height: 1402,
    kind: 'image',
  },
  imgHonesenbei: {
    src: '/photos/img-honesenbei.jpg',
    alt: '器に盛りつけた鰻の骨せんべいと、袋に詰めたところ',
    width: 1254,
    height: 1254,
    kind: 'image',
  },
} as const satisfies Record<string, Photo>;

export type PhotoKey = keyof typeof photos;
