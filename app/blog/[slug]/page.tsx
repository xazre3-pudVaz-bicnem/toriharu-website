import type { Metadata } from 'next';
import Link from 'next/link';
import { notFound } from 'next/navigation';

import Breadcrumbs from '@/components/ui/Breadcrumbs';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { blogPostingJsonLd, breadcrumbJsonLd } from '@/lib/jsonld';
import { blogCategories, formatDate, getAllPosts, getPost, getRelatedPosts } from '@/lib/blog';
import { renderMarkdown } from '@/lib/markdown';
import { shop } from '@/data/shop';

type Params = { slug: string };

export function generateStaticParams(): Params[] {
  return getAllPosts().map((p) => ({ slug: p.slug }));
}

export const dynamicParams = false;

export async function generateMetadata({ params }: { params: Promise<Params> }): Promise<Metadata> {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) return { title: '記事が見つかりません' };

  return buildMetadata({
    title: post.title,
    description: post.description,
    path: `/blog/${post.slug}`,
    ogType: 'article',
    publishedTime: post.publishedAt,
    modifiedTime: post.updatedAt,
  });
}

/** 記事の下に必ず出す、店の導線 */
const internalLinks = [
  { href: '/unagi', label: '国産鰻の蒲焼・白焼き' },
  { href: '/yakitori', label: '紀州備長炭の焼き鳥' },
  { href: '/menu', label: '商品一覧と価格' },
  { href: '/takeout', label: '持ち帰り・全国発送' },
  { href: '/about', label: 'トリハルについて' },
  { href: '/access', label: '店舗・アクセス' },
];

export default async function BlogPostPage({ params }: { params: Promise<Params> }) {
  const { slug } = await params;
  const post = getPost(slug);
  if (!post) notFound();

  const { html, headings } = renderMarkdown(post.content);
  const related = getRelatedPosts(post, 3);
  const category = blogCategories[post.category];

  const crumbs = [
    { name: 'ホーム', href: '/' },
    { name: '読みもの', href: '/blog' },
    { name: post.title, href: `/blog/${post.slug}` },
  ];

  return (
    <>
      <article>
        {/* 見出し */}
        <header className="bg-sumi px-5 pb-16 pt-28 text-kinari md:px-10 md:pb-24 md:pt-40">
          <div className="mx-auto max-w-[62rem]">
            <Breadcrumbs crumbs={crumbs} tone="dark" />

            <p className="eyebrow mt-10 text-honoo">{category.label}</p>
            <h1 className="display mt-6 text-[clamp(1.7rem,6.5vw,3rem)] leading-[1.5] tracking-[0.06em]">
              {post.title}
            </h1>

            {post.description && (
              <p className="mt-8 max-w-[44rem] text-[0.95rem] leading-[2.1] text-kinari/80">
                {post.description}
              </p>
            )}

            <dl className="mt-10 flex flex-wrap gap-x-10 gap-y-2 border-t border-kinari/15 pt-6 text-[0.74rem] tracking-[0.1em] text-kinari/60">
              <div className="flex gap-2">
                <dt>公開</dt>
                <dd>
                  <time dateTime={post.publishedAt} className="tabular-nums">
                    {formatDate(post.publishedAt)}
                  </time>
                </dd>
              </div>
              {post.updatedAt !== post.publishedAt && (
                <div className="flex gap-2">
                  <dt>更新</dt>
                  <dd>
                    <time dateTime={post.updatedAt} className="tabular-nums">
                      {formatDate(post.updatedAt)}
                    </time>
                  </dd>
                </div>
              )}
              <div className="flex gap-2">
                <dt>執筆</dt>
                <dd>{shop.legalName}</dd>
              </div>
            </dl>
          </div>
        </header>

        {/* 本文 */}
        <div className="bg-kinari px-5 py-16 md:px-10 md:py-24">
          <div className="mx-auto grid max-w-[76rem] gap-14 lg:grid-cols-[1fr_15rem] lg:gap-16">
            <div className="min-w-0">
              <div className="prose-toriharu" dangerouslySetInnerHTML={{ __html: html }} />

              {post.tags.length > 0 && (
                <ul className="mt-14 flex flex-wrap gap-x-4 gap-y-2 border-t border-sumi/15 pt-8 text-[0.76rem] opacity-65">
                  {post.tags.map((tag) => (
                    <li key={tag}>#{tag}</li>
                  ))}
                </ul>
              )}

              {/* 店の導線 */}
              <aside className="mt-16 border-t border-sumi/20 pt-10">
                <h2 className="display text-lg tracking-[0.06em]">トリハルのご案内</h2>
                <p className="mt-4 max-w-[34rem] text-[0.88rem] leading-[2]">
                  {shop.legalName}は、{shop.address.full}にある焼き鳥と鰻の持ち帰り専門店です。営業時間は
                  {shop.hours.label}、定休日は{shop.hours.closedDays.join('・')}。
                  ご予約・ご相談は<a href={shop.telHref} className="text-tan underline underline-offset-4">{shop.tel}</a>
                  まで。
                </p>
                <ul className="mt-8 grid gap-x-10 sm:grid-cols-2">
                  {internalLinks.map((l) => (
                    <li key={l.href} className="border-b border-sumi/12">
                      <Link href={l.href} className="block py-3 text-[0.88rem] underline-offset-[6px] hover:underline">
                        {l.label}
                      </Link>
                    </li>
                  ))}
                </ul>
              </aside>
            </div>

            {/* 目次 */}
            {headings.length > 1 && (
              <aside className="lg:sticky lg:top-28 lg:self-start">
                <nav aria-label="この記事の目次">
                  <p className="eyebrow text-tan">CONTENTS</p>
                  <ul className="mt-6 space-y-1 border-l border-sumi/15 pl-4 text-[0.8rem] leading-[1.7]">
                    {headings.map((h) => (
                      <li key={h.id} className={h.level === 3 ? 'pl-3 opacity-70' : ''}>
                        <a href={`#${h.id}`} className="block py-1 underline-offset-4 hover:underline">
                          {h.text}
                        </a>
                      </li>
                    ))}
                  </ul>
                </nav>
              </aside>
            )}
          </div>
        </div>

        {/* 関連記事 */}
        {related.length > 0 && (
          <section className="washi-grain bg-washi px-5 py-20 md:px-10 md:py-28">
            <div className="mx-auto max-w-[76rem]">
              <Reveal>
                <p className="eyebrow text-tan">RELATED</p>
                <h2 className="display mt-6 text-[clamp(1.4rem,5vw,2rem)] tracking-[0.08em]">
                  あわせて読みたい
                </h2>
              </Reveal>
              <ul className="mt-10 border-t border-sumi/15">
                {related.map((r, i) => (
                  <Reveal as="li" key={r.slug} delay={i * 70}>
                    <Link
                      href={`/blog/${r.slug}`}
                      className="group grid gap-1 border-b border-sumi/12 py-6 md:grid-cols-[9rem_1fr] md:gap-8"
                    >
                      <span className="text-[0.72rem] tracking-[0.16em] text-tan">
                        {blogCategories[r.category].label}
                      </span>
                      <span className="text-[0.98rem] leading-[1.9] underline-offset-[6px] group-hover:underline">
                        {r.title}
                      </span>
                    </Link>
                  </Reveal>
                ))}
              </ul>
              <Link href="/blog" className="rule-link mt-10 inline-flex text-tan">
                読みもの一覧へ
              </Link>
            </div>
          </section>
        )}
      </article>

      <ShopInfo heading="店舗のご案内" />

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
      <JsonLd
        data={blogPostingJsonLd({
          title: post.title,
          description: post.description,
          slug: post.slug,
          publishedAt: post.publishedAt,
          updatedAt: post.updatedAt,
        })}
      />
    </>
  );
}
