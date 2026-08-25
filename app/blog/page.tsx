import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { blogCategories, formatDate, getAllPosts, type BlogCategory } from '@/lib/blog';
import { photos } from '@/data/photos';

export const metadata: Metadata = buildMetadata({
  title: '読みもの｜鰻と焼き鳥、和歌山の食のはなし',
  description:
    '和歌山市の老舗トリハルが綴る読みもの。国産鰻と蒲焼・白焼き、紀州備長炭の焼き鳥、土用の丑の日、和歌山市のテイクアウトなど、店の仕事と地元の食にまつわる記事を掲載しています。',
  path: '/blog',
  ogImage: '/photos/img-charcoal-unagi.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '読みもの', href: '/blog' },
];

export default function BlogIndexPage() {
  const posts = getAllPosts();
  const categoryKeys = Object.keys(blogCategories) as BlogCategory[];
  const counts = Object.fromEntries(
    categoryKeys.map((k) => [k, posts.filter((p) => p.category === k).length]),
  ) as Record<BlogCategory, number>;

  return (
    <>
      <PageHero
        en="JOURNAL"
        title="読みもの"
        lead="鰻のこと、焼き鳥のこと、炭のこと、和歌山のこと。店の仕事にまつわる話を、少しずつ書きためています。"
        photo={photos.imgCharcoalUnagi}
        crumbs={crumbs}
        position="center 55%"
      />

      <section className="bg-kinari px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[92rem]">
          {/*
            カテゴリの案内（リンクはページ内アンカー）。
            記事が0件のカテゴリは下のセクション自体を描画しないため、
            リンクにすると飛べない。件数のある分だけを出す。
          */}
          <Reveal>
            <ul className="flex flex-wrap gap-x-8 gap-y-3 border-b border-sumi/15 pb-6 text-[0.82rem]">
              {categoryKeys
                .filter((key) => counts[key] > 0)
                .map((key) => (
                  <li key={key}>
                    <a
                      href={`#${key}`}
                      className="inline-block py-1.5 tracking-[0.1em] underline-offset-[6px] hover:underline"
                    >
                      {blogCategories[key].label}
                      <span className="ml-2 text-[0.7rem] tabular-nums opacity-72">{counts[key]}</span>
                    </a>
                  </li>
                ))}
            </ul>
          </Reveal>

          {posts.length === 0 ? (
            <Reveal className="py-20">
              <p className="display text-lg leading-[2]">
                記事はまもなく公開されます。しばらくお待ちください。
              </p>
              <Link href="/" className="rule-link mt-8 inline-flex text-tan">
                トップへ戻る
              </Link>
            </Reveal>
          ) : (
            <>
              {/* 新着 */}
              <div className="mt-16">
                <h2 className="eyebrow text-tan">LATEST</h2>
                <ul className="mt-8 border-t border-sumi/20">
                  {posts.slice(0, 12).map((post, i) => (
                    <Reveal as="li" key={post.slug} delay={(i % 6) * 60}>
                      <Link
                        href={`/blog/${post.slug}`}
                        className="group grid gap-2 border-b border-sumi/12 py-8 md:grid-cols-[7rem_9rem_1fr] md:gap-8"
                      >
                        <time
                          dateTime={post.publishedAt}
                          className="text-[0.74rem] tracking-[0.1em] tabular-nums opacity-72"
                        >
                          {formatDate(post.publishedAt)}
                        </time>
                        <span className="text-[0.72rem] tracking-[0.16em] text-tan">
                          {blogCategories[post.category].label}
                        </span>
                        <div>
                          <h3 className="display text-[1.08rem] leading-[1.75] tracking-[0.04em] underline-offset-[6px] group-hover:underline md:text-[1.2rem]">
                            {post.title}
                          </h3>
                          {post.description && (
                            <p className="mt-2 max-w-[44rem] text-[0.86rem] leading-[1.95] opacity-78">
                              {post.description}
                            </p>
                          )}
                        </div>
                      </Link>
                    </Reveal>
                  ))}
                </ul>
              </div>

              {/* カテゴリ別 */}
              <div className="mt-24 space-y-20 md:mt-36 md:space-y-28">
                {categoryKeys.map((key) => {
                  const list = posts.filter((p) => p.category === key);
                  if (list.length === 0) return null;
                  return (
                    <div key={key} id={key} className="scroll-mt-24">
                      <Reveal>
                        <h2 className="display text-[clamp(1.4rem,5vw,2.1rem)] tracking-[0.08em]">
                          {blogCategories[key].label}
                        </h2>
                        <p className="mt-3 text-[0.86rem] opacity-70">{blogCategories[key].description}</p>
                      </Reveal>
                      <ul className="mt-8 border-t border-sumi/15">
                        {list.map((post, i) => (
                          <Reveal as="li" key={post.slug} delay={(i % 6) * 50}>
                            <Link
                              href={`/blog/${post.slug}`}
                              className="group flex flex-wrap items-baseline gap-x-8 gap-y-1 border-b border-sumi/10 py-5"
                            >
                              <time
                                dateTime={post.publishedAt}
                                className="w-28 shrink-0 text-[0.72rem] tabular-nums opacity-72"
                              >
                                {formatDate(post.publishedAt)}
                              </time>
                              <span className="text-[0.95rem] leading-[1.9] underline-offset-[6px] group-hover:underline">
                                {post.title}
                              </span>
                            </Link>
                          </Reveal>
                        ))}
                      </ul>
                    </div>
                  );
                })}
              </div>
            </>
          )}
        </div>
      </section>

      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
