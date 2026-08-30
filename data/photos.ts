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

/** 店舗提供写真の実寸（撮影時の向きに合わせて回転済み） */
const shopLandscape = { width: 1477, height: 1108 } as const;
const shopPortrait = { width: 1108, height: 1477 } as const;

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
  kabayakiTray: {
    src: '/photos/kabayaki-tray.jpg',
    alt: 'タレを重ねて焼き上げ、バットに並べた鰻の蒲焼',
    ...shopLandscape,
    kind: 'shop',
  },
  kabayakiShowcase: {
    src: '/photos/kabayaki-showcase.jpg',
    alt: '店頭のショーケースに並ぶ、焼き上がったばかりの鰻の蒲焼',
    ...shopLandscape,
    kind: 'shop',
  },
  /* 包装紙の2枚は縦向きが正しい（竹皮の鰻を縦位置で撮影） */
  kabayakiWrapped01: {
    src: '/photos/kabayaki-wrapped-01.jpg',
    alt: '竹皮に載せ、トリハルの包装紙の上に置かれた鰻の蒲焼一尾',
    ...shopPortrait,
    kind: 'shop',
  },
  kabayakiWrapped02: {
    src: '/photos/kabayaki-wrapped-02.jpg',
    alt: '有限会社トリハルの包装紙の上で、竹皮に載せられた鰻の蒲焼',
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
    alt: '焼き上がった、もも・ねぎ串・とり肝などの焼き鳥をバットに並べたところ',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriMomoGrill: {
    src: '/photos/yakitori-momo-grill.jpg',
    alt: '炭火の上で焼き色がついていく、もものやきとり',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriNegimaGrill: {
    src: '/photos/yakitori-negima-grill.jpg',
    alt: '炭火で焼かれ、ねぎに焦げ目がついたねぎ串',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriSmoke: {
    src: '/photos/yakitori-smoke.jpg',
    alt: '煙を上げながら炭火で焼かれている焼き鳥の列',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriKawa: {
    src: '/photos/yakitori-kawa.jpg',
    alt: '焼き場にずらりと並べられた、鶏皮の串',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriLineup: {
    src: '/photos/yakitori-lineup.jpg',
    alt: '焼き場に並ぶ、皮・ねぎ串・とり肝などの串。奥から順に火を入れていく',
    ...shopLandscape,
    kind: 'shop',
  },
  yakitoriKimo: {
    src: '/photos/yakitori-kimo.jpg',
    alt: '一本ずつ手で刺した、とり肝の串',
    ...shopLandscape,
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
    alt: '古い秤の横に置かれた、赤いキャップのタレの小瓶',
    ...shopLandscape,
    kind: 'shop',
  },
  sansho: {
    src: '/photos/sansho.jpg',
    alt: '鰻に添える「紀州 香山椒」の小袋',
    ...shopPortrait,
    kind: 'shop',
  },

  /* ── イメージ写真（店舗の実写ではありません／差し替え候補）─────── */
  heroUnagiGrill: {
    src: '/photos/hero-unagi-grill.jpg',
    alt: '炭火の網の上で、タレをまとった鰻の蒲焼が焼かれ、白い煙が立ちのぼる様子',
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
