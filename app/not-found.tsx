import Link from 'next/link';
import type { Metadata } from 'next';

import Photo from '@/components/ui/Photo';
import { navItems } from '@/data/nav';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export const metadata: Metadata = {
  title: 'ページが見つかりません',
  robots: { index: false, follow: false },
};

export default function NotFound() {
  return (
    <section className="relative min-h-[92svh] bg-sumi text-kinari">
      <div className="absolute inset-0">
        <Photo photo={photos.yakitoriSmoke} fill sizes="100vw" position="center 40%" />
        <div aria-hidden className="absolute inset-0 bg-sumi/80" />
      </div>

      <div className="relative mx-auto flex min-h-[92svh] max-w-[92rem] flex-col justify-center px-5 py-32 md:px-10">
        <p className="eyebrow text-honoo">404 — NOT FOUND</p>
        <h1 className="display mt-8 max-w-3xl text-[clamp(1.8rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
          お探しのページは、
          <br />
          まだ焼き上がっていないようです。
        </h1>
        <p className="mt-8 max-w-lg text-[0.92rem] leading-[2.05] text-kinari/80">
          URLが変わったか、なくなってしまったのかもしれません。お手数ですが、下のいずれかからお探しください。
        </p>

        <ul className="mt-12 grid max-w-3xl gap-x-12 border-t border-kinari/15 sm:grid-cols-2">
          {navItems.map((item) => (
            <li key={item.href} className="border-b border-kinari/12">
              <Link href={item.href} className="flex items-baseline justify-between py-4 text-[0.92rem]">
                <span>{item.label}</span>
                <span className="eyebrow opacity-62">{item.en}</span>
              </Link>
            </li>
          ))}
        </ul>

        <div className="mt-12 flex flex-wrap items-baseline gap-x-10 gap-y-4">
          <Link href="/" className="rule-link text-honoo">
            トップへ戻る
          </Link>
          <a href={shop.telHref} className="rule-link text-honoo tabular-nums">
            {shop.tel}
          </a>
        </div>
      </div>
    </section>
  );
}
