import type { Metadata } from 'next';
import Link from 'next/link';

import PageHero from '@/components/layout/PageHero';
import Photo, { ImageNote } from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import JsonLd from '@/components/ui/JsonLd';
import ShopInfo from '@/components/sections/ShopInfo';
import { buildMetadata } from '@/lib/seo';
import { breadcrumbJsonLd } from '@/lib/jsonld';
import { photos } from '@/data/photos';
import { yakitoriItems, priceNotice } from '@/data/menu';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '紀州備長炭の焼き鳥｜和歌山市で焼き鳥を持ち帰るなら',
  description:
    '和歌山市南大工町のトリハルは、国産の鶏だけを使い紀州備長炭で焼き上げる焼き鳥の持ち帰り専門店です。もも・むね・ねぎ串・皮・とり肝・砂ずり・なんこつなど、1本194円（税込）から。',
  path: '/yakitori',
  ogImage: '/photos/yakitori-tray.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '焼き鳥', href: '/yakitori' },
];

/** 部位ごとの説明。味の話にとどめ、産地や仕入れ先は書かない。 */
const parts = [
  { name: 'もも', body: '毎日焼いている定番。脂とうまみのバランスがよく、いちばん出る串です。' },
  { name: 'むね', body: '脂が少なく、あっさり。焼きすぎないよう火加減を見ます。' },
  { name: 'ねぎ串', body: '鶏とねぎを交互に。ねぎに焦げ目が入ると香りが立ちます。' },
  { name: '皮', body: '脂が落ちきるまで、じっくり。香ばしさが身上です。' },
  { name: 'とり肝', body: 'ねっとりと濃い。タレとの相性がいい部位。' },
  { name: 'ささみ', body: '淡白でやわらかい。火の入れ方でまったく変わります。' },
  { name: '砂ずり', body: 'こりこりとした歯ざわり。噛むほどに味が出ます。' },
  { name: '手羽先', body: '皮と身と骨まわり。手で持って食べるのがいちばん。' },
  { name: 'ももなんこつ', body: 'やわらかい軟骨。ももの身と一緒に刺します。' },
  { name: 'ヤゲンなんこつ', body: '胸の中央の軟骨。かりっと軽い食感。' },
  { name: 'ハツ（心臓）', body: '締まった歯ごたえ。少量しかとれない部位です。' },
  { name: 'せせり', body: '首まわりの身。よく動くところなので、味が濃い。' },
];

export default function YakitoriPage() {
  return (
    <>
      <PageHero
        en="YAKITORI"
        title="焼き鳥"
        lead="使うのは国産の鶏だけ。串は手で刺し、紀州備長炭の火で焼きます。もも、むね、ねぎ串、皮、肝、砂ずり、なんこつ。1本から包んでお渡しする、和歌山市南大工町の持ち帰り専門店です。"
        photo={photos.yakitoriTray}
        crumbs={crumbs}
        position="center 40%"
      />

      {/* 要約 */}
      <section className="washi-grain bg-washi px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="SUMMARY" className="text-tan" />
            <dl className="mt-8 grid gap-x-12 gap-y-6 border-t border-sumi/15 pt-8 md:grid-cols-2">
              {[
                ['誰が', `${shop.legalName}（${shop.name}）。${shop.founded.era}創業の持ち帰り専門店。`],
                ['どこで', `${shop.address.full}。${shop.landmark}。`],
                ['何を', 'もも・むね・ねぎ串・皮・とり肝・ささみ・砂ずり・手羽先・ももなんこつ・ヤゲンなんこつ・ハツ・せせりの焼き鳥。'],
                ['どう作る', '国産の鶏のみを手で串に刺し、紀州備長炭で焼き上げる。'],
                ['いくらか', '1本194円（税込）から。ヤゲンなんこつ・ハツは216円、せせりは238円、う肝串は324円。'],
                ['買い方', 'ももやきとり以外は1日に数本のみの店頭販売。当日9時頃までのご予約で、5本以上からご用意できる場合があります（う肝を除く）。'],
              ].map(([k, v]) => (
                <div key={k} className="border-b border-sumi/12 pb-6">
                  <dt className="text-[0.72rem] tracking-[0.2em] text-tan">{k}</dt>
                  <dd className="mt-3 text-[0.92rem] leading-[2]">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </section>

      {/* 大きな写真＋読みもの */}
      <section className="bg-sumi text-kinari">
        <Reveal slow>
          <figure className="relative h-[56svh] w-full md:h-[76svh]">
            <Photo photo={photos.imgYakitoriPlate} fill sizes="100vw" position="center 55%" />
            <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sumi via-transparent to-sumi/40" />
            <figcaption className="absolute bottom-5 right-5 md:bottom-8 md:right-10">
              <ImageNote photo={photos.imgYakitoriPlate} className="text-kinari" />
            </figcaption>
          </figure>
        </Reveal>

        <div className="mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-36">
          <div className="grid gap-14 lg:grid-cols-[1fr_1fr] lg:gap-24">
            <Reveal>
              <SectionLabel en="HOW WE GRILL" className="text-honoo" />
              <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
                串は、手で刺す。
              </h2>
              <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
                <p>
                  部位によって、繊維の向きも脂の量も違います。だから刺し方が変わります。同じ大きさに揃えて刺せば、火の通り方が揃う。焼く前の仕事のほうが、じつは長い。
                </p>
                <p>
                  焼くのは紀州備長炭。遠赤外線でじわりと入る火なので、表面が締まって中の水分が残ります。脂が落ちれば煙が上がり、その煙がまた串に香りをつける。串を返す間合いは、その音と匂いで決めます。
                </p>
                <p>
                  タレは鰻と同じ、代々つぎ足してきたもの。塩焼きをご希望の場合も、ご相談いただければお受けできることがあります（時期によりお断りする場合があります）。
                </p>
              </div>
            </Reveal>

            <div className="grid grid-cols-12 gap-4 md:gap-6">
              <Reveal className="col-span-7" slow>
                <Photo photo={photos.yakitoriLineup} sizes="(max-width: 1024px) 55vw, 27vw" className="h-auto w-full" />
              </Reveal>
              <Reveal className="col-span-5 mt-16" delay={120} slow>
                <Photo photo={photos.yakitoriKimo} sizes="(max-width: 1024px) 40vw, 20vw" className="h-auto w-full" />
              </Reveal>
              <Reveal className="col-span-10 col-start-3" delay={200} slow>
                <Photo photo={photos.yakitoriMomoGrill} sizes="(max-width: 1024px) 76vw, 36vw" className="h-auto w-full" />
                <p className="mt-4 text-[0.74rem] leading-relaxed text-kinari/55">
                  炭の上で、色が変わっていくのを見ながら。
                </p>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* 部位 */}
      <section className="bg-kinari px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="PARTS & PRICE" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              部位ごとの、味。
            </h2>
          </Reveal>

          <ul className="mt-14 border-t border-sumi/15 md:grid md:grid-cols-2 md:gap-x-16">
            {parts.map((part, i) => {
              const item = yakitoriItems.find((y) => y.name.replace('やきとり', '') === part.name);
              return (
                <Reveal as="li" key={part.name} delay={(i % 4) * 60} className="border-b border-sumi/12 py-7">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="display text-lg tracking-[0.05em]">{part.name}</h3>
                    {item?.price != null && (
                      <p className="text-[0.9rem] tabular-nums">
                        {item.price.toLocaleString()}円
                        <span className="ml-1 text-[0.7rem] opacity-60">（税込／1本）</span>
                      </p>
                    )}
                  </div>
                  <p className="mt-2 max-w-[30rem] text-[0.87rem] leading-[1.95] opacity-78">{part.body}</p>
                </Reveal>
              );
            })}
          </ul>

          <Reveal className="mt-12 max-w-[46rem] space-y-3 text-[0.84rem] leading-[1.95] opacity-70">
            <p>ももやきとり以外は日に0〜数本のみの店頭販売となります。</p>
            <p>当日9時頃までのご予約で、5本以上からご用意できる場合があります（う肝を除く）。</p>
            <p>{priceNotice}</p>
          </Reveal>

          <Reveal className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
            <Link href="/menu" className="rule-link text-tan">
              商品一覧を見る
            </Link>
            <a href={shop.telHref} className="rule-link text-tan tabular-nums">
              ご予約・お問い合わせ {shop.tel}
            </a>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="お求めは、南大工町の店頭で" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
