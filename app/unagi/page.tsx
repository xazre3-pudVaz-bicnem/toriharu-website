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
import { unagiItems } from '@/data/menu';
import { shop } from '@/data/shop';

export const metadata: Metadata = buildMetadata({
  title: '国産鰻の蒲焼・白焼き｜和歌山市で毎朝捌く鰻',
  description:
    '和歌山市南大工町のトリハルは、国産の活鰻を毎朝店舗で捌き、紀州備長炭と秘伝のタレで焼き上げる持ち帰り専門店です。鰻の蒲焼・白焼き・う肝串・骨せんべいを販売、全国発送も承ります。',
  path: '/unagi',
  ogImage: '/photos/kabayaki-tray.jpg',
});

const crumbs = [
  { name: 'ホーム', href: '/' },
  { name: '鰻', href: '/unagi' },
];

const steps = [
  {
    n: '01',
    title: '仕入れる',
    body: '国産の活鰻を、生きたまま仕入れます。店の桶で泳がせておき、その日に使うぶんだけを取り上げます。',
    photo: photos.liveEels,
  },
  {
    n: '02',
    title: '捌く',
    body: '毎朝、店の作業台で一尾ずつ捌きます。目打ちを打ち、背から開き、中骨を外す。骨は捨てずに骨せんべいへ。',
    photo: photos.sabaki01,
  },
  {
    n: '03',
    title: '素焼きにする',
    body: '炭火にかけ、まずはタレを使わずに焼きます。余分な脂を落とし、身を立たせる工程です。ここで仕上げたものが白焼き。',
    photo: photos.shirayaki01,
  },
  {
    n: '04',
    title: 'タレをくぐらせる',
    body: '創業以来つぎ足してきた秘伝のタレへ。くぐらせては焼き、くぐらせては焼き、を何度か繰り返します。',
    photo: photos.tareDip,
  },
  {
    n: '05',
    title: '包む',
    body: '焼き上がりを竹皮に載せ、包んでお渡しします。ショーケースに並んでいるぶんは、そのままお持ち帰りいただけます。',
    photo: photos.kabayakiWrapped01,
  },
];

export default function UnagiPage() {
  return (
    <>
      <PageHero
        en="UNAGI"
        title="国産鰻"
        lead="トリハルの鰻は、国産の活鰻です。毎朝この店で捌き、紀州備長炭の火と、創業から継ぎ足してきた秘伝のタレで焼き上げます。蒲焼と白焼き、う肝串、鰻の骨せんべい。和歌山市南大工町の店頭でお渡しするほか、全国への発送も承っています。"
        photo={photos.kabayakiTray}
        crumbs={crumbs}
        position="center 45%"
      />

      {/* 要約（AI検索・音声検索が引用しやすい形） */}
      <section className="washi-grain bg-washi px-5 py-16 md:px-10 md:py-24">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="SUMMARY" className="text-tan" />
            <dl className="mt-8 grid gap-x-12 gap-y-6 border-t border-sumi/15 pt-8 md:grid-cols-2">
              {[
                ['誰が', `${shop.legalName}（${shop.name}）。${shop.founded.era}創業、${shop.founded.yearsLabel}続く持ち帰り専門店。`],
                ['どこで', `${shop.address.full}。${shop.landmark}。南大工町の1店舗のみ。`],
                ['何を', '国産鰻の蒲焼、鰻の白焼き、う肝串、鰻の骨せんべい。'],
                ['どう作る', '毎朝、店舗で活鰻を捌き、紀州備長炭で素焼きにしてから、自家製の秘伝ダレを重ねて焼く。'],
                ['どう買う', '営業時間8:30〜17:00に店頭でお買い求めいただけます（定休日：火曜）。数や白焼きのご希望はお電話でご相談ください。'],
                ['送れるか', '上焼き鰻・鰻の白焼きは全国発送に対応。宅急便コレクト（代金引換）も利用できます。'],
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

      {/* 工程 */}
      <section className="bg-sumi text-kinari">
        <div className="mx-auto max-w-[92rem] px-5 py-24 md:px-10 md:py-36">
          <Reveal>
            <SectionLabel en="PROCESS" className="text-honoo" />
            <h2 className="display mt-8 max-w-3xl text-[clamp(1.8rem,6.5vw,3.2rem)] leading-[1.45] tracking-[0.08em]">
              桶から、竹皮まで。
            </h2>
          </Reveal>

          <ol className="mt-16 space-y-24 md:space-y-36">
            {steps.map((step, i) => (
              <li key={step.n}>
                <div
                  className={`grid items-center gap-10 md:gap-16 lg:grid-cols-2 ${
                    i % 2 === 1 ? 'lg:[&>figure]:order-2' : ''
                  }`}
                >
                  <Reveal as="figure" slow className="relative">
                    <Photo photo={step.photo} sizes="(max-width: 1024px) 92vw, 46vw" className="h-auto w-full" />
                  </Reveal>
                  <Reveal delay={100}>
                    <p className="eyebrow text-honoo tabular-nums">{step.n}</p>
                    <h3 className="display mt-6 text-[clamp(1.5rem,5vw,2.3rem)] leading-[1.5] tracking-[0.08em]">
                      {step.title}
                    </h3>
                    <p className="mt-6 max-w-[32rem] text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
                      {step.body}
                    </p>
                  </Reveal>
                </div>
              </li>
            ))}
          </ol>
        </div>
      </section>

      {/* 蒲焼と白焼き */}
      <section className="bg-kinari px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto max-w-[92rem]">
          <Reveal>
            <SectionLabel en="KABAYAKI / SHIRAYAKI" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              蒲焼と、白焼き。
            </h2>
          </Reveal>

          <div className="mt-14 grid gap-14 lg:grid-cols-2 lg:gap-20">
            <Reveal slow>
              <Photo photo={photos.kabayakiShowcase} sizes="(max-width: 1024px) 92vw, 46vw" className="h-auto w-full" />
              <h3 className="display mt-8 text-2xl tracking-[0.06em]">上焼き鰻（蒲焼）</h3>
              <div className="mt-5 space-y-4 text-[0.92rem] leading-[2.05]">
                <p>
                  素焼きにした鰻を、秘伝のタレに何度もくぐらせながら焼き上げたもの。表面はタレが焦げて香ばしく、中はふっくら。トリハルでいちばん多く出る品です。
                </p>
                <p>
                  店頭表示は一尾およそ4,000円〜5,000円（税込・秘伝ダレ込み）。鰻の大きさと仕入れによって変わります。
                </p>
                <p className="text-[0.86rem] opacity-75">
                  お召し上がりの際は、紀州の山椒（香山椒）の小袋もご一緒にどうぞ。
                </p>
              </div>
            </Reveal>

            <Reveal slow delay={120}>
              <Photo photo={photos.shirayaki03} sizes="(max-width: 1024px) 92vw, 46vw" className="h-auto w-full" />
              <h3 className="display mt-8 text-2xl tracking-[0.06em]">鰻の白焼き</h3>
              <div className="mt-5 space-y-4 text-[0.92rem] leading-[2.05]">
                <p>
                  タレを使わず、炭火だけで焼き上げたもの。鰻そのものの脂と香りが出るので、わさび醤油や塩で召し上がる方が多い品です。
                </p>
                <p>
                  ご要望を承っております。ただし時期や仕入れの状況によっては、お断りさせていただく場合があります。ご希望の日が決まっていましたら、
                  <a href={shop.telHref} className="text-tan underline underline-offset-4">
                    お電話（{shop.tel}）
                  </a>
                  でお早めにご相談ください。
                </p>
              </div>
            </Reveal>
          </div>
        </div>
      </section>

      {/* 商品と発送 */}
      <section className="washi-grain bg-washi px-5 py-24 md:px-10 md:py-36">
        <div className="mx-auto grid max-w-[92rem] gap-14 lg:grid-cols-[1.05fr_0.95fr] lg:gap-20">
          <Reveal>
            <SectionLabel en="ITEMS" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.7rem,6vw,2.7rem)] leading-[1.45] tracking-[0.08em]">
              鰻の品書き
            </h2>
            <ul className="mt-10 border-t border-sumi/15">
              {unagiItems.map((item) => (
                <li key={item.slug} className="border-b border-sumi/12 py-6">
                  <div className="flex flex-wrap items-baseline justify-between gap-x-6 gap-y-1">
                    <h3 className="display text-lg tracking-[0.05em]">{item.name}</h3>
                    <p className="text-[0.9rem] tabular-nums">
                      {item.price !== null ? (
                        <>
                          {item.price.toLocaleString()}円
                          <span className="ml-1 text-[0.72rem] opacity-60">
                            （税込{item.unit ? `／${item.unit}` : ''}）
                          </span>
                        </>
                      ) : (
                        <span className="text-[0.78rem] opacity-60">店頭にてご確認ください</span>
                      )}
                    </p>
                  </div>
                  {item.note && <p className="mt-2 text-[0.86rem] leading-[1.95] opacity-75">{item.note}</p>}
                </li>
              ))}
            </ul>
            <Link href="/menu" className="rule-link mt-10 inline-flex text-tan">
              焼き鳥もあわせて見る
            </Link>
          </Reveal>

          <Reveal delay={120}>
            <figure>
              <Photo photo={photos.imgUnaju} sizes="(max-width: 1024px) 92vw, 42vw" className="h-auto w-full" />
              <figcaption className="mt-3 flex items-center gap-3 text-[0.74rem] opacity-60">
                <span>ご家庭で、あたたかいごはんの上に。</span>
                <ImageNote photo={photos.imgUnaju} />
              </figcaption>
            </figure>

            <div className="mt-12 border-t border-sumi/15 pt-8">
              <h3 className="display text-xl tracking-[0.06em]">全国発送について</h3>
              <p className="mt-4 text-[0.92rem] leading-[2.05]">
                上焼き鰻・鰻の白焼きは、全国発送を承っています。ご進物用・ご自宅用ともに、宅急便コレクト（代金引換）もご利用いただけます。本数やお届け日のご相談は、お電話でお願いいたします。
              </p>
              <a href={shop.telHref} className="display mt-6 inline-flex text-2xl tracking-[0.06em] text-tan tabular-nums">
                {shop.tel}
              </a>
              <p className="mt-2 text-[0.8rem] opacity-65">
                受付時間 {shop.hours.label}／定休日 {shop.hours.closedDays.join('・')}
              </p>
              <Link href="/takeout" className="rule-link mt-8 inline-flex text-tan">
                持ち帰り・発送のご案内
              </Link>
            </div>
          </Reveal>
        </div>
      </section>

      <ShopInfo heading="お求めは、南大工町の店頭で" />
      <JsonLd data={breadcrumbJsonLd(crumbs)} />
    </>
  );
}
