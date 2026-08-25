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
          <Reveal>
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
              <ul className="divide-y divide-sumi/12 border-y border-sumi/15">
                {items.map((item) => (
                  <li key={item.slug} className="grid gap-6 py-8 sm:grid-cols-[10rem_1fr] sm:gap-10">
                    {item.image ? (
                      <Image
                        src={item.image}
                        alt={item.imageAlt ?? item.name}
                        width={640}
                        height={800}
                        sizes="(max-width: 640px) 92vw, 10rem"
                        className="h-auto w-full"
                      />
                    ) : (
                      <span aria-hidden className="hidden sm:block" />
                    )}
                    <div>
                      <div className="flex flex-wrap items-baseline gap-x-4 gap-y-1">
                        <h3 className="display text-xl tracking-[0.06em]">{item.name}</h3>
                        <span
                          className={`text-[0.68rem] tracking-[0.2em] ${
                            item.status === 'ended' ? 'opacity-45' : 'text-tan'
                          }`}
                        >
                          {statusLabel[item.status]}
                        </span>
                      </div>
                      <p className="mt-3 text-[0.9rem] leading-[2]">{item.summary}</p>
                      {item.body && (
                        <div className="mt-3 space-y-2 text-[0.86rem] leading-[2] opacity-80">
                          {item.body.split('\n').filter(Boolean).map((p) => (
                            <p key={p}>{p}</p>
                          ))}
                        </div>
                      )}
                      <dl className="mt-4 flex flex-wrap gap-x-8 gap-y-1 text-[0.8rem] opacity-70">
                        {item.period && (
                          <div className="flex gap-2">
                            <dt>販売時期</dt>
                            <dd>{item.period}</dd>
                          </div>
                        )}
                        {item.price !== null && (
                          <div className="flex gap-2">
                            <dt>価格</dt>
                            <dd className="tabular-nums">{item.price.toLocaleString()}円（税込）</dd>
                          </div>
                        )}
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
