import Link from 'next/link';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { blogCategories, formatDate, getAllPosts } from '@/lib/blog';

export default function BlogTeaser({ limit = 4 }: { limit?: number }) {
  const posts = getAllPosts().slice(0, limit);
  if (posts.length === 0) return null;

  return (
    <section className="relative bg-kinari px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[92rem]">
        <Reveal className="flex flex-wrap items-end justify-between gap-6">
          <div>
            <SectionLabel index="11" en="JOURNAL" className="text-tan" />
            <h2 className="display mt-7 text-[clamp(1.7rem,6vw,2.8rem)] leading-[1.45] tracking-[0.08em]">
              読みもの
            </h2>
          </div>
          <Link href="/blog" className="rule-link text-tan">
            すべて見る
          </Link>
        </Reveal>

        <ul className="mt-12 border-t border-sumi/15">
          {posts.map((post, i) => (
            <Reveal as="li" key={post.slug} delay={i * 80}>
              <Link
                href={`/blog/${post.slug}`}
                className="group grid gap-2 border-b border-sumi/12 py-7 sm:grid-cols-[7rem_1fr] sm:gap-8 md:grid-cols-[7rem_9rem_1fr]"
              >
                <time dateTime={post.publishedAt} className="text-[0.74rem] tracking-[0.1em] tabular-nums opacity-72">
                  {formatDate(post.publishedAt)}
                </time>
                <span className="text-[0.72rem] tracking-[0.16em] text-tan">
                  {blogCategories[post.category].label}
                </span>
                <h3 className="display text-[1.05rem] leading-[1.75] tracking-[0.04em] underline-offset-[6px] group-hover:underline md:text-[1.15rem]">
                  {post.title}
                </h3>
              </Link>
            </Reveal>
          ))}
        </ul>
      </div>
    </section>
  );
}
