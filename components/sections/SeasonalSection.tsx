import Link from 'next/link';
import Image from 'next/image';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { seasonalEmptyMessage, seasonalIntro, visibleSeasonalItems, type SeasonalItem } from '@/data/seasonal';

const statusLabel: Record<SeasonalItem['status'], string> = {
  onsale: '販売中',
  upcoming: 'まもなく',
  ended: '販売終了',
  draft: '',
};

export default function SeasonalSection({ compact = false }: { compact?: boolean }) {
  const items = visibleSeasonalItems;

  return (
    <section className="washi-grain relative bg-washi px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-12 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            {!compact && <SectionLabel index="08" en="SEASONAL" className="text-tan" />}
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              季節の一品。
            </h2>
            <p className="mt-8 max-w-[32rem] text-[0.92rem] leading-[2.1] md:text-base">{seasonalIntro}</p>
            {!compact && (
              <Link href="/seasonal" className="rule-link mt-10 inline-flex text-tan">
                季節の商品を見る
              </Link>
            )}
          </Reveal>

          <Reveal delay={120}>
            {items.length === 0 ? (
              <div className="border-t border-sumi/15 pt-10">
                <p className="display text-[1.05rem] leading-[2] tracking-[0.04em] text-tare">
                  {seasonalEmptyMessage}
                </p>
                <p className="mt-6 text-[0.86rem] leading-[2] opacity-70">
                  土用の丑の日やお盆、年末年始など、鰻のご入り用が重なる時期は数に限りがございます。日にちが決まっていましたら、お早めにお電話でご相談ください。
                </p>
              </div>
            ) : (
              /*
                季節商品はその時期の主役なので写真を大きく見せる。
                縦位置の写真でも高くなりすぎないよう、本文と横に並べる。
              */
              <ul className="space-y-16 border-t border-sumi/15 pt-10 md:space-y-24">
                {items.map((item) => (
                  <li
                    key={item.slug}
                    className={item.image ? 'grid gap-8 md:grid-cols-[minmax(0,0.85fr)_1fr] md:gap-12' : ''}
                  >
                    {item.image && (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        width={1108}
                        height={1477}
                        sizes="(max-width: 767px) 92vw, 24vw"
                        className="h-auto w-full"
                      />
                    )}
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-5 gap-y-1">
                        <h3 className="display text-[clamp(1.4rem,5vw,2rem)] tracking-[0.06em]">
                          {item.name}
                        </h3>
                        <span
                          className={`text-[0.7rem] tracking-[0.2em] ${
                            item.status === 'ended' ? 'opacity-45' : 'text-tan'
                          }`}
                        >
                          {statusLabel[item.status]}
                        </span>
                      </div>
                      <p className="mt-5 max-w-[38rem] text-[0.95rem] leading-[2.05]">{item.summary}</p>
                      {item.body && (
                        <div className="mt-5 max-w-[38rem] space-y-4 text-[0.89rem] leading-[2.05] opacity-80">
                          {item.body.split('\n').filter(Boolean).map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                        </div>
                      )}
                      <dl className="mt-7 flex flex-wrap gap-x-10 gap-y-2 border-t border-sumi/12 pt-5 text-[0.82rem]">
                        {item.period && (
                          <div className="flex gap-3">
                            <dt className="opacity-60">販売時期</dt>
                            <dd>{item.period}</dd>
                          </div>
                        )}
                        <div className="flex gap-3">
                          <dt className="opacity-60">価格</dt>
                          <dd className={item.price !== null ? 'tabular-nums' : ''}>
                            {item.price !== null
                              ? `${item.price.toLocaleString()}円（税込）`
                              : '決まり次第お知らせします'}
                          </dd>
                        </div>
                      </dl>
                    </div>
                  </li>
                ))}
              </ul>
            )}
          </Reveal>
        </div>
      </div>
    </section>
  );
}
