import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Reveal from '@/components/ui/Reveal';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import Photo from '@/components/ui/Photo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { photos } from '@/data/photos';
import { availabilityLabel, menuGroups, priceNotice } from '@/data/menu';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '商品一覧・価格｜和歌山市の焼き鳥と鰻のテイクアウト',
  description:
    'トリハル（和歌山市南大工町）の商品一覧です。焼き鳥は1本194円（税込）から、鰻は上焼き鰻・白焼き・う肝串・骨せんべい。店頭掲示にもとづく価格と、予約・少量販売のご案内を掲載しています。',
  path: '/menu',
  ogImage: '/photos/showcase-menu.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '商品一覧', href: '/menu' },
];

export default function MenuPage() {
  return (
    <>
      <PageHero
        en="MENU"
        title="商品一覧"
        lead="店頭に掲示している品書きをもとにまとめています。焼き鳥は1本から、鰻は一尾から。仕入れやその日の焼き上がりによってご用意できる品は変わりますので、確実にお求めになりたい場合はお電話でご相談ください。"
        photo={photos.showcaseMenu}
        crumbs={crumbs}
        position="center 40%"
      />

      <section className="bg-kinari px-5 py-20 md:px-10 md:py-32">
        <div className="mx-auto max-w-[92rem] space-y-24 md:space-y-36">
          {menuGroups.map((group, gi) => (
            <div key={group.id} id={group.id} className="scroll-mt-24">
              <div className="grid gap-10 lg:grid-cols-[0.8fr_1.2fr] lg:gap-20">
                <Reveal>
                  <p className="eyebrow text-tan tabular-nums">
                    {String(gi + 1).padStart(2, '0')} — {group.id.toUpperCase()}
                  </p>
                  <h2 className="display mt-6 text-[clamp(1.8rem,6.5vw,2.8rem)] leading-[1.45] tracking-[0.08em]">
                    {group.title}
                  </h2>
                  <p className="mt-6 max-w-[30rem] text-[0.92rem] leading-[2.05] opacity-85">{group.lead}</p>

                  {group.notes && (
                    <ul className="mt-8 space-y-2 border-t border-sumi/15 pt-6 text-[0.82rem] leading-[1.95] opacity-70">
                      {group.notes.map((n) => (
                        <li key={n}>{n}</li>
                      ))}
                    </ul>
                  )}
                </Reveal>

                <Reveal delay={100}>
                  <ul className="border-t border-sumi/20">
                    {group.items.map((item) => (
                      <li key={item.slug} className="border-b border-sumi/12 py-6">
                        <div className="flex flex-wrap items-baseline justify-between gap-x-8 gap-y-1">
                          <h3 className="display text-[1.08rem] tracking-[0.05em]">
                            {item.name}
                            {item.en && (
                              <span className="ml-3 text-[0.68rem] tracking-[0.12em] opacity-70">{item.en}</span>
                            )}
                          </h3>
                          <p className="shrink-0 text-[0.95rem] tabular-nums">
                            {item.price !== null ? (
                              <>
                                {item.price.toLocaleString()}
                                <span className="ml-0.5">円</span>
                                <span className="ml-1.5 text-[0.7rem] opacity-60">
                                  税込{item.unit ? `／${item.unit}` : ''}
                                </span>
                              </>
                            ) : (
                              <span className="text-[0.78rem] opacity-72">店頭にてご確認ください</span>
                            )}
                          </p>
                        </div>
                        <p className="mt-2 flex flex-wrap items-baseline gap-x-4 text-[0.84rem] leading-[1.95]">
                          <span className="shrink-0 text-[0.68rem] tracking-[0.16em] text-tan">
                            {availabilityLabel[item.availability]}
                          </span>
                          {item.note && <span className="max-w-[34rem] opacity-72">{item.note}</span>}
                        </p>
                      </li>
                    ))}
                  </ul>
                </Reveal>
              </div>
            </div>
          ))}

          <Reveal className="grid gap-10 border-t border-sumi/20 pt-12 lg:grid-cols-[1fr_1fr] lg:gap-20">
            <div>
              <h2 className="display text-xl tracking-[0.06em]">価格について</h2>
              <p className="mt-5 max-w-[34rem] text-[0.88rem] leading-[2.05] opacity-78">{priceNotice}</p>
              <p className="mt-4 max-w-[34rem] text-[0.88rem] leading-[2.05] opacity-78">
                お支払いは現金のほか、クレジットカード（VISA・Mastercard）もご利用いただけます。
              </p>
              <div className="mt-8 flex flex-wrap gap-x-10 gap-y-4">
                <Link href="/unagi" className="rule-link text-tan">
                  鰻について
                </Link>
                <Link href="/yakitori" className="rule-link text-tan">
                  焼き鳥について
                </Link>
                <a href={shop.telHref} className="rule-link text-tan tabular-nums">
                  {shop.tel}
                </a>
              </div>
            </div>
            <Photo
              photo={photos.showcaseMenu}
              sizes="(max-width: 1023px) 92vw, 44vw"
              className="h-auto w-full"
            />
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="店舗のご案内" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
