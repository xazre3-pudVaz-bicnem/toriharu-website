import 'server-only';
import fs from 'node:fs';
import path from 'node:path';
import matter from 'gray-matter';

export const BLOG_DIR = path.join(process.cwd(), 'content', 'blog');

export const blogCategories = {
  unagi: { label: '鰻のはなし', description: '国産鰻、蒲焼と白焼き、炭火の焼き方について。' },
  yakitori: { label: '焼き鳥のはなし', description: '部位ごとの味わいと、紀州備長炭の焼きについて。' },
  wakayama: { label: '和歌山のこと', description: '南大工町、和歌山市のテイクアウト、紀州の食文化。' },
  shokunin: { label: '店と仕事', description: '毎朝の仕込み、秘伝のタレ、老舗の仕事について。' },
  season: { label: '季節と行事', description: '土用の丑の日、お盆、年末年始、贈りもののこと。' },
} as const;

export type BlogCategory = keyof typeof blogCategories;

export type BlogPost = {
  slug: string;
  title: string;
  description: string;
  publishedAt: string;
  updatedAt: string;
  category: BlogCategory;
  tags: string[];
  /** 本文（Markdown） */
  content: string;
  /** 想定検索クエリ（カニバリ防止のため1記事1クエリで管理） */
  intent?: string;
};

function isCategory(v: unknown): v is BlogCategory {
  return typeof v === 'string' && v in blogCategories;
}

function toDateString(v: unknown, fallback: string): string {
  if (v instanceof Date) return v.toISOString().slice(0, 10);
  if (typeof v === 'string' && /^\d{4}-\d{2}-\d{2}/.test(v)) return v.slice(0, 10);
  return fallback;
}

let cache: BlogPost[] | null = null;

export function getAllPosts(): BlogPost[] {
  if (cache) return cache;
  if (!fs.existsSync(BLOG_DIR)) {
    cache = [];
    return cache;
  }

  const posts = fs
    .readdirSync(BLOG_DIR)
    .filter((f) => f.endsWith('.md') || f.endsWith('.mdx'))
    .map((file) => {
      const raw = fs.readFileSync(path.join(BLOG_DIR, file), 'utf8');
      const { data, content } = matter(raw);
      const slug = String(data.slug ?? file.replace(/\.mdx?$/, '')).trim();
      const published = toDateString(data.publishedAt, '1970-01-01');

      const post: BlogPost = {
        slug,
        title: String(data.title ?? slug),
        description: String(data.description ?? ''),
        publishedAt: published,
        updatedAt: toDateString(data.updatedAt, published),
        category: isCategory(data.category) ? data.category : 'shokunin',
        tags: Array.isArray(data.tags) ? data.tags.map(String) : [],
        intent: typeof data.intent === 'string' ? data.intent : undefined,
        content,
      };
      return post;
    })
    .filter((p) => p.title && p.publishedAt !== '1970-01-01')
    .sort((a, b) => (a.publishedAt < b.publishedAt ? 1 : a.publishedAt > b.publishedAt ? -1 : a.slug < b.slug ? 1 : -1));

  cache = posts;
  return posts;
}

export function getPost(slug: string): BlogPost | undefined {
  return getAllPosts().find((p) => p.slug === slug);
}

/** 同カテゴリを優先しつつ、足りなければ新着で埋める */
export function getRelatedPosts(post: BlogPost, limit = 3): BlogPost[] {
  const all = getAllPosts().filter((p) => p.slug !== post.slug);
  const sameCategory = all.filter((p) => p.category === post.category);
  const sharedTag = all.filter(
    (p) => p.category !== post.category && p.tags.some((t) => post.tags.includes(t)),
  );
  const rest = all.filter((p) => !sameCategory.includes(p) && !sharedTag.includes(p));
  return [...sameCategory, ...sharedTag, ...rest].slice(0, limit);
}

export function getPostsByCategory(category: BlogCategory): BlogPost[] {
  return getAllPosts().filter((p) => p.category === category);
}

export function formatDate(iso: string): string {
  const [y, m, d] = iso.split('-');
  return `${y}年${Number(m)}月${Number(d)}日`;
}
