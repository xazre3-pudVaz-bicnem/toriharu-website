import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { photos } from '@/data/photos';

const strip = [
  { photo: photos.kabayakiShowcase, caption: '店頭のショーケースへ' },
  { photo: photos.yakitoriMomoGrill, caption: 'ももやきとり' },
  { photo: photos.kabayakiWrapped01, caption: '竹皮に載せて' },
  { photo: photos.yakitoriKimo, caption: 'とり肝' },
  { photo: photos.liveEels, caption: '朝の桶' },
  { photo: photos.yakitoriLineup, caption: '焼き場の朝' },
];

/**
 * 商品を大きく連続して見せる帯。
 * PCは横スクロールの一列、スマホは縦に大きく。
 */
export default function ProductVisual() {
  return (
    <section aria-label="商品の写真" className="bg-sumi py-16 md:py-24">
      <div className="mx-auto mb-10 max-w-[92rem] px-5 md:mb-14 md:px-10">
        <p className="eyebrow text-honoo">06 — PRODUCTS</p>
        <p className="display mt-6 max-w-2xl text-[clamp(1.25rem,4vw,1.9rem)] leading-[1.7] text-kinari">
          焼き上がるまでの、ひとつずつ。
        </p>
      </div>

      {/* PC: 横スクロール */}
      <Reveal className="hidden md:block" slow>
        <ul className="flex snap-x snap-mandatory gap-6 overflow-x-auto px-10 pb-4">
          {strip.map(({ photo, caption }) => (
            <li key={photo.src} className="w-[clamp(18rem,26vw,25rem)] shrink-0 snap-start">
              <figure>
                <Photo photo={photo} sizes="26vw" className="h-auto w-full" />
                <figcaption className="mt-4 text-[0.74rem] tracking-[0.14em] text-kinari/60">
                  {caption}
                </figcaption>
              </figure>
            </li>
          ))}
        </ul>
      </Reveal>

      {/* スマホ: 縦に大きく */}
      <ul className="space-y-10 px-5 md:hidden">
        {strip.map(({ photo, caption }, i) => (
          <li key={photo.src}>
            <Reveal slow delay={i % 2 ? 80 : 0}>
              <figure>
                <Photo photo={photo} sizes="92vw" className="h-auto w-full" />
                <figcaption className="mt-3 text-[0.74rem] tracking-[0.14em] text-kinari/60">
                  {caption}
                </figcaption>
              </figure>
            </Reveal>
          </li>
        ))}
      </ul>
    </section>
  );
}
