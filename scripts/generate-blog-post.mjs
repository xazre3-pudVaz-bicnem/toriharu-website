#!/usr/bin/env node
/**
 * トリハル｜ブログ記事の自動生成（1日1本）
 *
 * 実行は GitHub Actions からのみ。Vercel のビルド時・リクエスト時には走りません。
 * APIキーは環境変数 ANTHROPIC_API_KEY から読み込みます（ソースには絶対に書かない）。
 *
 *   ANTHROPIC_API_KEY … 必須
 *   ANTHROPIC_MODEL   … 既定 claude-haiku-4-5（コストを抑えるため Haiku）
 *   DRY_RUN=1         … ファイルを書かずに標準出力へ
 *
 * 生成された記事は content/blog/YYYY-MM-DD-slug.md に保存されます。
 */

import fs from 'node:fs';
import path from 'node:path';
import { fileURLToPath } from 'node:url';
import Anthropic from '@anthropic-ai/sdk';

import { topics, categoryLinks } from './topics.mjs';

const ROOT = path.resolve(path.dirname(fileURLToPath(import.meta.url)), '..');
const BLOG_DIR = path.join(ROOT, 'content', 'blog');
const FACTS = JSON.parse(fs.readFileSync(path.join(ROOT, 'data', 'verified-facts.json'), 'utf8'));

const MODEL = process.env.ANTHROPIC_MODEL?.trim() || 'claude-haiku-4-5';
const DRY_RUN = process.env.DRY_RUN === '1';

/* ───────────── ユーティリティ ───────────── */

/** 日本時間の今日（Actions は UTC で動くため必ず JST に直す） */
function todayJst() {
  const now = new Date(Date.now() + 9 * 60 * 60 * 1000);
  return now.toISOString().slice(0, 10);
}

function readExistingPosts() {
  if (!fs.existsSync(BLOG_DIR)) return [];
  return fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md'))
    .map((f) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, f), 'utf8');
      const fm = /^---\n([\s\S]*?)\n---/.exec(raw);
      const get = (key) => {
        const m = fm ? new RegExp(`^${key}:\\s*(.*)$`, 'm').exec(fm[1]) : null;
        return m ? m[1].trim().replace(/^["']|["']$/g, '') : '';
      };
      return { file: f, slug: get('slug'), title: get('title'), intent: get('intent') };
    });
}

/** バイグラムの Dice 係数。既存記事と似すぎたタイトルを弾く。 */
function similarity(a, b) {
  const grams = (s) => {
    const t = s.replace(/[\s　「」『』（）()・、。]/g, '');
    const out = new Set();
    for (let i = 0; i < t.length - 1; i += 1) out.add(t.slice(i, i + 2));
    return out;
  };
  const A = grams(a);
  const B = grams(b);
  if (A.size === 0 || B.size === 0) return 0;
  let hit = 0;
  for (const g of A) if (B.has(g)) hit += 1;
  return (2 * hit) / (A.size + B.size);
}

/** まだ書いていないトピックを選ぶ。全部書き終えたら、いちばん古いものを更新候補に回す。 */
function pickTopic(existing) {
  const usedIntents = new Set(existing.map((p) => p.intent).filter(Boolean));
  const unused = topics.filter((t) => !usedIntents.has(t.intent));

  if (unused.length > 0) {
    // カテゴリが連続しないよう、直近の記事と別カテゴリを優先する
    const recentCategories = existing.slice(-3).map((p) => p.file);
    const preferred = unused.filter(
      (t) => !recentCategories.some((f) => f.includes(`-${t.category}-`)),
    );
    const pool = preferred.length > 0 ? preferred : unused;
    // 日付で決定的に選ぶ（同じ日に二重実行しても同じ記事になる）
    const seed = Number(todayJst().replace(/-/g, ''));
    return pool[seed % pool.length];
  }

  return null;
}

function slugify(intent, category) {
  const romaji = intent
    .replace(/[^\p{L}\p{N}\s]/gu, ' ')
    .trim()
    .split(/\s+/)
    .join('-');
  // 日本語はそのままだと長いので、カテゴリ＋ハッシュで安定した slug にする
  let h = 0;
  for (let i = 0; i < romaji.length; i += 1) h = (h * 31 + romaji.charCodeAt(i)) >>> 0;
  return `${category}-${h.toString(36)}`;
}

function escapeYaml(s) {
  return String(s).replace(/"/g, '\\"');
}

/* ───────────── プロンプト ───────────── */

function buildSystemPrompt() {
  return `あなたは、和歌山市南大工町にある焼き鳥・鰻の持ち帰り専門店「トリハル」の公式サイトで、読みものを書く書き手です。

## 店について（この一覧にあることだけを事実として書いてよい）
${FACTS.facts.map((f) => `- ${f}`).join('\n')}

店舗情報:
- 店名: ${FACTS.shop.name}（${FACTS.shop.legalName}）
- 住所: ${FACTS.shop.address}（${FACTS.shop.landmark}）
- 電話: ${FACTS.shop.tel}
- 営業時間: ${FACTS.shop.hours}／定休日: ${FACTS.shop.closedDays}

## 絶対に書いてはいけないこと
${FACTS.forbidden.map((f) => `- ${f}`).join('\n')}

上のどれかに当てはまりそうな内容は、書かずに省いてください。「わからないことは書かない」が最優先のルールです。
一般的な料理の知識（鰻の焼き方、部位の特徴、行事の由来など）は書いてかまいませんが、断定を避けるべきところは「〜と言われています」「地域によって異なります」といった書き方にしてください。健康効果・効能は書かないでください。

## 文章のトーン
- 老舗だからこそ出せる、静かな自信。淡々と、しかし具体的に。
- 大げさな広告コピーは使わない。「究極」「絶品」「感動の」のような表現は禁止。
- 一文は短く。60文字を目安に。
- 敬体（です・ます）で統一する。
- 職人が書いているというより、店のことをよく知っている書き手が落ち着いて説明している調子。

## 書き方の決まり
- 見出しは ## と ### のみを使う（# は使わない）。
- 冒頭に見出しは置かず、200〜300字ほどの導入から始める。
- ## 見出しは4〜6本。それぞれの下に2〜4段落。
- 箇条書きは使いすぎない（多くても2か所まで）。
- 本文中に、指定された内部リンクを自然な文脈で必ず入れる。Markdownのリンク記法 [表示テキスト](/パス) を使う。
- 記事末尾に「## トリハルのご案内」といった見出しは作らない（サイト側で自動的に付きます）。
- 全体で1,600〜2,600字程度。文字数を稼ぐための繰り返しはしない。`;
}

function buildUserPrompt(topic, existingTitles) {
  const links = categoryLinks[topic.category] ?? ['/menu', '/access'];
  return `次の記事を書いてください。

- テーマ: ${topic.title}
- 想定している検索: 「${topic.intent}」
- 切り口: ${topic.angle}
- 本文に必ず入れる内部リンク（2〜3本）: ${links.join(' , ')}

すでに公開している記事のタイトル（内容が重ならないようにしてください）:
${existingTitles.length ? existingTitles.map((t) => `- ${t}`).join('\n') : '（まだありません）'}

次の形式のJSONだけを返してください。前後に説明文やコードフェンスを付けないでください。

{
  "title": "32文字以内。検索意図に沿い、具体的であること。「トリハル」を無理に入れない",
  "description": "80〜120文字。この記事で何がわかるかを説明する",
  "tags": ["3〜5個", "日本語の短い語"],
  "body": "Markdown本文。## と ### の見出しを使う"
}`;
}

/* ───────────── 生成 ───────────── */

function extractJson(text) {
  const trimmed = text.trim().replace(/^```(?:json)?\n?/, '').replace(/\n?```$/, '');
  const start = trimmed.indexOf('{');
  const end = trimmed.lastIndexOf('}');
  if (start === -1 || end === -1) throw new Error('JSONが見つかりませんでした');
  return JSON.parse(trimmed.slice(start, end + 1));
}

function validate(article, existing) {
  const errors = [];
  if (!article.title || typeof article.title !== 'string') errors.push('title がありません');
  if (!article.description || String(article.description).length < 40)
    errors.push('description が短すぎます');
  if (!article.body || String(article.body).length < 900) errors.push('body が短すぎます');
  if (!Array.isArray(article.tags) || article.tags.length === 0) errors.push('tags がありません');

  if (article.title) {
    for (const p of existing) {
      if (p.title && similarity(article.title, p.title) > 0.62) {
        errors.push(`既存記事「${p.title}」とタイトルが似すぎています`);
        break;
      }
    }
  }

  const body = String(article.body ?? '');
  if (/^#\s/m.test(body)) errors.push('本文に h1（#）が含まれています');
  if (!/\]\(\/(unagi|yakitori|menu|takeout|about|access|seasonal)/.test(body))
    errors.push('内部リンクが本文にありません');

  // 事実の取り違えを機械的に拾える範囲でチェック
  const banned = [
    { re: /店内でお召し上が|イートイン|客席をご用意|店内飲食|お席/, msg: '店内飲食に触れています' },
    { re: /オンラインショップ|通販サイト|カートに入れ|ネット注文|オンラインで注文/, msg: '通販サイトに触れています' },
    {
      re: /疲労回復|夏バテに効|滋養強壮|健康に良いことが証明|栄養価が高|栄養があ|栄養のあ|体にいい|体に良い/,
      msg: '健康・栄養の効能に踏み込んでいます',
    },
    { re: /究極|絶品|最高品質|感動の|至高|極上/, msg: '大げさな広告表現があります' },
    { re: /\d{4}年\d{1,2}月\d{1,2}日|今年の土用の丑の日は\d/, msg: '年によって変わる日付を書いています' },
    { re: /創業\s*\d{4}\s*年|明治\d+年に創業/, msg: '未確認の創業年を書いています' },
    { re: /[0-9０-９]\s*代目/, msg: '「〇代目」という未確認の表現があります' },

    /* ── 鰻・焼き鳥の工程の取り違え ── */
    {
      re: /骨ごと|骨まで軟らか|骨まで柔らか|骨も食べ/,
      msg: '骨の扱いが事実と違います（中骨は外して骨せんべいにしています）',
    },
    {
      re: /タレに漬け込|タレにつけ込|一晩漬け|マリネ/,
      msg: 'タレの工程が事実と違います（漬け込むのではなく、くぐらせて焼くのを繰り返します）',
    },
    { re: /蒸してから焼|一度蒸し/, msg: 'トリハルが蒸すとは確認できていません' },
    { re: /冷凍で(お|ご)?届け|冷凍便|真空パック/, msg: '確認できていない配送・包装の形態です' },

    /* ── 店の実績・人気の創作 ── */
    {
      re: /問い合わせが増え|注文が増え|ご予約が殺到|人気(です|があります|の商品)|よく売れ|リピーター|常連(の方|さん)/,
      msg: '店の実績や人気を創作しています',
    },
    { re: /評判|口コミ|お客様の声|喜ばれています|好評/, msg: '口コミ・評価に触れています' },

    /* ── 分量の断定 ── */
    {
      re: /[0-9０-９一二三四五六七八九十]\s*人前|[0-9０-９]\s*人分|夫婦(ふたり|二人)で分け|に適した量|ちょうどよい量/,
      msg: '確認できていない分量を断定しています',
    },

    /* ── data/menu.ts にない価格 ── */
    {
      /* data/menu.ts にある額のみ許可（焼き鳥194/216/238、う肝324、鰻3,800〜） */
      re: /(?<![0-9,])(?!194|216|238|324|3,800|3800)[0-9][0-9,]{2,}\s*円/,
      msg: 'data/menu.ts にない価格を書いています',
    },
  ];
  for (const b of banned) {
    if (b.re.test(body) || b.re.test(String(article.title))) errors.push(b.msg);
  }

  /*
   * 「刷毛」「串打ち」は否定形なら正しい（刷毛では塗らない／串は打たない）。
   * 肯定形で書かれている文だけを弾く。
   */
  for (const sentence of body.split(/[。\n]/)) {
    if (!/刷毛|串を打|串打ち/.test(sentence)) continue;
    const negated = /ではなく|ではありません|ません|しない|使わ(ず|ない)|なく、/.test(sentence);
    if (!negated) {
      errors.push(`「${sentence.trim().slice(0, 34)}」— 刷毛塗り・串打ちは当店の焼き方ではありません`);
      break;
    }
  }

  /*
   * あたため直しに酒や水を加えない（味が変わるため、店頭でもそう伝えている）。
   * 「お酒は加えない」のような否定形は通す。
   */
  for (const sentence of body.split(/[。\n]/)) {
    if (!/(酒|みりん|水)[^。]{0,8}(ふり|振り|かけ|加え|そそ|注)/.test(sentence)) continue;
    const negated = /ません|ではなく|しない|加えない|かけない|不要|避け/.test(sentence);
    if (!negated) {
      errors.push(`「${sentence.trim().slice(0, 34)}」— あたため直しに酒や水は加えません（そのまま温めます）`);
      break;
    }
  }

  /* 単独の「ダレ」は誤り。複合語（秘伝ダレ・自家製ダレ）だけ許す */
  {
    const wrong = [...body.matchAll(/.{0,4}ダレ/g)]
      .map((m) => m[0])
      .filter((s) => !/(秘伝|自家製|継ぎ足し)ダレ/.test(s));
    if (wrong.length) {
      errors.push(`「${wrong[0]}」— 単独では「タレ」と書いてください`);
    }
  }

  /* タレを熟成させているとは確認していない */
  if (/タレ[^。]{0,10}熟成|熟成[^。]{0,6}タレ|熟成ダレ|熟成具合/.test(body)) {
    errors.push('タレを熟成させているとは確認できていません');
  }

  /*
   * 内部リンクの文言が遷移先の内容と合っているか。
   * 「季節ごとの食べ方」で /seasonal に飛ばすような食い違いを防ぐ。
   */
  const linkRules = {
    '/unagi': /鰻|うなぎ|蒲焼|白焼き|備長炭|炭火|捌/,
    '/yakitori': /焼き鳥|やきとり|串|備長炭|炭火|鶏/,
    '/menu': /商品|品書き|メニュー|価格|値段|一覧|骨せんべい|う肝|品/,
    '/takeout': /持ち帰|テイクアウト|発送|温め|お渡し|包/,
    '/about': /トリハル|店|老舗|仕事|歴史|創業/,
    '/access': /店舗|アクセス|場所|地図|南大工町|営業時間|行き方/,
    // /seasonal は季節「限定商品」のページ。「季節ごとの食べ方」のような一般論に使わせない
    '/seasonal': /季節の(一品|商品|限定)|季節限定|土用|お盆|年末年始|旬の/,
  };
  for (const m of body.matchAll(/\[([^\]]+)\]\((\/[a-z-]+)\)/g)) {
    const [, text, href] = m;
    const rule = linkRules[href];
    if (rule && !rule.test(text)) {
      errors.push(`リンクの文言「${text}」が遷移先 ${href} の内容と合っていません`);
      break;
    }
  }

  return errors;
}

async function generate(client, topic, existing, attempt, feedback) {
  const messages = [{ role: 'user', content: buildUserPrompt(topic, existing.map((p) => p.title)) }];
  if (feedback) {
    messages.push({
      role: 'user',
      content: `前回の記事には次の問題がありました。修正して、同じJSON形式で書き直してください。\n${feedback.map((f) => `- ${f}`).join('\n')}`,
    });
  }

  const res = await client.messages.create({
    model: MODEL,
    max_tokens: 6000,
    temperature: attempt === 0 ? 0.85 : 0.7,
    system: buildSystemPrompt(),
    messages,
  });

  const text = res.content
    .filter((b) => b.type === 'text')
    .map((b) => b.text)
    .join('');
  return extractJson(text);
}

/* ───────────── main ───────────── */

async function main() {
  const apiKey = process.env.ANTHROPIC_API_KEY;
  if (!apiKey) {
    console.error('ANTHROPIC_API_KEY が設定されていません。');
    process.exit(1);
  }

  const date = todayJst();
  const existing = readExistingPosts();

  if (existing.some((p) => p.file.startsWith(date))) {
    console.log(`${date} の記事はすでにあります。何もしません。`);
    return;
  }

  const topic = pickTopic(existing);
  if (!topic) {
    console.log('すべてのトピックを書き終えています。scripts/topics.mjs に追加してください。');
    return;
  }

  console.log(`テーマ: ${topic.title}（${topic.category}／${topic.intent}）`);
  console.log(`モデル: ${MODEL}`);

  const client = new Anthropic({ apiKey });

  let article = null;
  let feedback = null;
  for (let attempt = 0; attempt < 3; attempt += 1) {
    try {
      const candidate = await generate(client, topic, existing, attempt, feedback);
      const errors = validate(candidate, existing);
      if (errors.length === 0) {
        article = candidate;
        break;
      }
      console.warn(`検証に通りませんでした（${attempt + 1}回目）: ${errors.join(' / ')}`);
      feedback = errors;
    } catch (err) {
      console.warn(`生成に失敗しました（${attempt + 1}回目）: ${err.message}`);
      feedback = ['出力がJSONとして読み取れませんでした。JSONだけを返してください。'];
    }
  }

  if (!article) {
    console.error('3回試しましたが、公開できる記事になりませんでした。今日は投稿しません。');
    process.exit(1);
  }

  const slug = slugify(topic.intent, topic.category);
  const filename = `${date}-${slug}.md`;
  const tags = article.tags.slice(0, 5).map((t) => `"${escapeYaml(t)}"`).join(', ');

  const frontmatter = [
    '---',
    `title: "${escapeYaml(article.title)}"`,
    `slug: "${slug}"`,
    `description: "${escapeYaml(article.description)}"`,
    `publishedAt: "${date}"`,
    `updatedAt: "${date}"`,
    `category: "${topic.category}"`,
    `intent: "${escapeYaml(topic.intent)}"`,
    `tags: [${tags}]`,
    '---',
    '',
  ].join('\n');

  const content = `${frontmatter}${String(article.body).trim()}\n`;

  if (DRY_RUN) {
    console.log('--- DRY RUN ---');
    console.log(filename);
    console.log(content);
    return;
  }

  fs.mkdirSync(BLOG_DIR, { recursive: true });
  fs.writeFileSync(path.join(BLOG_DIR, filename), content, 'utf8');
  console.log(`書き出しました: content/blog/${filename}`);
  console.log(`タイトル: ${article.title}`);
}

main().catch((err) => {
  console.error(err);
  process.exit(1);
});
