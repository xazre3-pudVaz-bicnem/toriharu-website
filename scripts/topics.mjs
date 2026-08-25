/**
 * ブログのトピッククラスタ。
 * 1記事 = 1クエリ で設計し、記事同士のカニバリを防ぐ。
 *
 * intent … その記事が狙う検索意図（他の記事と重複させない）
 * category … lib/blog.ts の blogCategories のキー
 */

export const topics = [
  /* ───────── 鰻 ───────── */
  { category: 'unagi', title: '国産うなぎとは', intent: '国産うなぎ とは 違い', angle: '国産鰻と輸入鰻はどこが違うのか。活鰻を仕入れて店で捌く場合に何が変わるのかを、売る側の目線で説明する。' },
  { category: 'unagi', title: '蒲焼とは何か', intent: 'うなぎ 蒲焼 とは', angle: '蒲焼という呼び名の由来と、素焼き→タレ→焼きを繰り返す工程。関東と関西の違いにも触れる。' },
  { category: 'unagi', title: '白焼きの食べ方', intent: 'うなぎ 白焼き 食べ方', angle: '白焼きとは何か、蒲焼との違い、わさび醤油・塩・酒との合わせ方。' },
  { category: 'unagi', title: 'うなぎを炭火で焼く理由', intent: 'うなぎ 炭火 焼き 理由', angle: '遠赤外線と直火の違い、脂の落ち方、皮の仕上がり。備長炭でなければならない理由。' },
  { category: 'unagi', title: '関西風のうなぎの焼き方', intent: 'うなぎ 関西風 関東風 違い', angle: '腹開き・背開き、蒸すか蒸さないか、地域による仕上がりの違い。断定を避けて一般的な傾向として書く。' },
  { category: 'unagi', title: 'うなぎのおいしい温め方', intent: 'うなぎ 温め方 家', angle: '買って帰った蒲焼を家でおいしく食べるための温め方。酒をふって蒸す、温めすぎない。' },
  { category: 'unagi', title: 'うなぎの保存方法', intent: 'うなぎ 蒲焼 保存方法', angle: '当日中に食べるのが基本。冷蔵・冷凍する場合の考え方と、風味の落ち方。' },
  { category: 'unagi', title: 'うなぎと山椒の相性', intent: 'うなぎ 山椒 なぜ', angle: '山椒の香りが脂とどう働くか。紀州の山椒に触れる。' },
  { category: 'unagi', title: '紀州のぶどう山椒', intent: '紀州 ぶどう山椒 とは', angle: '和歌山で作られてきた山椒。粒の付き方と香り、鰻との合わせ方。' },
  { category: 'unagi', title: 'うなぎの骨せんべい', intent: 'うなぎ 骨せんべい とは', angle: '中骨を揚げた一品。捌く店でしか出ない理由、食感、食べ方。' },
  { category: 'unagi', title: 'う肝とは', intent: 'うなぎ う肝 とは', angle: '鰻の肝の串。数がとれない理由と味わい。' },
  { category: 'unagi', title: 'うなぎを持ち帰るとき', intent: 'うなぎ 持ち帰り コツ', angle: '持ち帰り前提で焼くとはどういうことか。持ち帰り時間と食べ頃。' },

  /* ───────── 焼き鳥 ───────── */
  { category: 'yakitori', title: '紀州備長炭で焼く焼き鳥', intent: '紀州備長炭 焼き鳥 違い', angle: '白炭の特徴、火持ち、遠赤外線。ガス火との仕上がりの差。' },
  { category: 'yakitori', title: '焼き鳥のもも肉', intent: '焼き鳥 もも 特徴', angle: 'ももの脂とうまみ、焼き方、いちばん出る理由。' },
  { category: 'yakitori', title: '焼き鳥のむね肉', intent: '焼き鳥 むね 特徴', angle: '脂が少ない部位の焼き方。パサつかせないための火加減。' },
  { category: 'yakitori', title: 'せせりという部位', intent: '焼き鳥 せせり とは', angle: '首まわりの身。一羽からとれる量が少ない理由と味。' },
  { category: 'yakitori', title: '砂ずり（砂肝）の食感', intent: '焼き鳥 砂肝 砂ずり 違い', angle: '呼び名の違い、下処理、こりこりした食感の理由。' },
  { category: 'yakitori', title: 'とり肝の焼き加減', intent: '焼き鳥 レバー 焼き加減', angle: '肝の火の入れ方とタレとの相性。生焼けにしない前提で書く。' },
  { category: 'yakitori', title: '鶏皮を香ばしく焼く', intent: '焼き鳥 皮 焼き方', angle: '脂を落としきる焼き方。時間がかかる理由。' },
  { category: 'yakitori', title: 'ささみの焼き方', intent: '焼き鳥 ささみ 焼き方', angle: '淡白な部位の火入れ。焼きすぎない。' },
  { category: 'yakitori', title: 'なんこつの種類', intent: '焼き鳥 なんこつ 種類', angle: 'ももなんこつ（膝）とヤゲンなんこつ（胸）の違い。' },
  { category: 'yakitori', title: '焼き鳥のタレと塩', intent: '焼き鳥 タレ 塩 違い', angle: '部位によってどちらが向くか。継ぎ足しダレの働き。' },
  { category: 'yakitori', title: '焼き鳥を持ち帰る', intent: '焼き鳥 持ち帰り 温め方', angle: '持ち帰り後の温め直し、串のまま焼き直す方法。' },
  { category: 'yakitori', title: '国産鶏を使うということ', intent: '焼き鳥 国産鶏 違い', angle: '国産鶏だけを使う理由。仕入れと鮮度の話。産地の断定はしない。' },

  /* ───────── 和歌山 ───────── */
  { category: 'wakayama', title: '和歌山市でテイクアウトするなら', intent: '和歌山市 テイクアウト', angle: '和歌山市でテイクアウトを探す人に向けて、持ち帰り専門店という業態の話。' },
  { category: 'wakayama', title: '和歌山市で焼き鳥を持ち帰る', intent: '和歌山市 焼き鳥 持ち帰り', angle: '焼き鳥を持ち帰るときの選び方、本数、時間帯。' },
  { category: 'wakayama', title: '和歌山市でうなぎを買う', intent: '和歌山市 うなぎ 買う', angle: '鰻を買って帰るという選択肢。店で捌く店の見分け方。' },
  { category: 'wakayama', title: '南大工町という町', intent: '和歌山市 南大工町', angle: '和歌山城の西、市堀川沿いの町。職人町としての地名の由来に触れつつ、断定は避ける。' },
  { category: 'wakayama', title: '南海和歌山市駅の周辺', intent: '和歌山市駅 周辺 食べ物', angle: '駅から歩ける範囲の食の店。持ち帰りという使い方。' },
  { category: 'wakayama', title: '和歌山と紀州備長炭', intent: '紀州備長炭 和歌山 産地', angle: '和歌山で作られてきた白炭。備長炭が食に使われてきた背景。' },
  { category: 'wakayama', title: '和歌山の食文化', intent: '和歌山 食文化 特徴', angle: '海と山の両方がある土地。鰻、山椒、炭。' },
  { category: 'wakayama', title: '和歌山市の手土産', intent: '和歌山市 手土産 食べ物', angle: '持っていきやすい食べ物という視点。竹皮包みの収まりのよさ。' },

  /* ───────── 店と仕事 ───────── */
  { category: 'shokunin', title: '毎朝うなぎを捌く理由', intent: 'うなぎ 店で捌く 理由', angle: 'なぜ朝に捌くのか。鮮度と身の締まり。手間をかける意味。' },
  { category: 'shokunin', title: '継ぎ足しのタレとは', intent: '継ぎ足し タレ とは', angle: '継ぎ足しのタレがどう変わっていくか。中身は書かない。' },
  { category: 'shokunin', title: '焼き場という場所', intent: '焼き場 仕事', angle: '焼き台の前で何を見ているか。煙、音、匂い。' },
  { category: 'shokunin', title: '老舗の味を守るということ', intent: '老舗 味 守る', angle: '変えないことの難しさ。同じものを毎日つくる仕事。' },
  { category: 'shokunin', title: '持ち帰り専門店という商い', intent: '持ち帰り専門店 とは', angle: '客席を持たない店の考え方。焼き方がどう変わるか。' },
  { category: 'shokunin', title: '串を手で刺すということ', intent: '焼き鳥 串打ち 手作業', angle: '串打ちの意味。均一に刺すと火の通りが揃う。' },

  /* ───────── 季節と行事 ───────── */
  { category: 'season', title: '土用の丑の日とうなぎ', intent: '土用の丑の日 うなぎ 由来', angle: '土用の丑の日の由来と、なぜ鰻を食べるようになったか。日付は年によって変わると明記し、具体的な日付は書かない。' },
  { category: 'season', title: '夏にうなぎを食べる', intent: '夏 うなぎ 理由', angle: '夏の風物としての鰻。健康効果は断定しない。' },
  { category: 'season', title: 'お盆の食卓とうなぎ', intent: 'お盆 うなぎ', angle: '人が集まる日の献立。数の用意について。' },
  { category: 'season', title: '年末年始のごちそう', intent: '年末年始 うなぎ 焼き鳥', angle: '年またぎの食卓。予約の考え方。' },
  { category: 'season', title: '父の日の贈りもの', intent: '父の日 うなぎ 贈り物', angle: '贈答としての鰻。発送という選択肢。' },
  { category: 'season', title: '敬老の日に贈る', intent: '敬老の日 うなぎ 贈り物', angle: '柔らかく食べやすいものという視点。' },
  { category: 'season', title: 'お祝いの日の献立', intent: 'お祝い 献立 うなぎ', angle: '記念日に鰻を選ぶという文化。' },
  { category: 'season', title: '家族が集まる日に', intent: '家族 集まる 食事 テイクアウト', angle: '大人数のときのテイクアウトの組み立て方。' },
];

/** カテゴリごとの内部リンク先（記事から必ず1〜2本は張る） */
export const categoryLinks = {
  unagi: ['/unagi', '/menu', '/takeout'],
  yakitori: ['/yakitori', '/menu', '/takeout'],
  wakayama: ['/access', '/about', '/menu'],
  shokunin: ['/about', '/unagi', '/yakitori'],
  season: ['/seasonal', '/takeout', '/unagi'],
};
