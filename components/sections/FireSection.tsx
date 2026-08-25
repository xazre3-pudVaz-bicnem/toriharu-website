import Photo, { ImageNote } from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';

export default function FireSection() {
  return (
    <section className="relative bg-sumi text-kinari">
      {/* 全幅の炭火 */}
      <Reveal slow>
        <figure className="relative h-[52svh] w-full md:h-[72svh]">
          <Photo photo={photos.imgCharcoalUnagi} fill sizes="100vw" position="center 55%" />
          <div aria-hidden className="absolute inset-0 bg-gradient-to-t from-sumi via-sumi/20 to-sumi/40" />
          <figcaption className="absolute bottom-6 right-5 md:bottom-10 md:right-10">
            <ImageNote photo={photos.imgCharcoalUnagi} className="text-kinari" />
          </figcaption>
        </figure>
      </Reveal>

      <div className="mx-auto max-w-[92rem] px-5 pb-24 md:px-10 md:pb-36">
        <div className="grid gap-16 lg:grid-cols-[1.05fr_0.95fr] lg:items-center lg:gap-24">
          <div className="order-2 grid grid-cols-12 gap-4 md:gap-6 lg:order-1">
            <Reveal className="col-span-6" slow>
              <Photo photo={photos.shirayaki02} sizes="(max-width: 1024px) 46vw, 24vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-6 mt-16" delay={120} slow>
              <Photo photo={photos.yakitoriSmoke} sizes="(max-width: 1024px) 46vw, 24vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-12 mt-2" delay={200} slow>
              <figure>
                <Photo photo={photos.imgCraftHands} sizes="(max-width: 1024px) 92vw, 44vw" className="h-auto w-full" />
                <figcaption className="mt-3 flex items-center gap-3 text-[0.72rem] text-kinari/55">
                  <span>炭の上では、目と耳と鼻がすべて。</span>
                  <ImageNote photo={photos.imgCraftHands} />
                </figcaption>
              </figure>
            </Reveal>
          </div>

          <Reveal className="order-1 lg:order-2">
            <SectionLabel index="03" en="BINCHOTAN" className="text-honoo" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              火を読む。
            </h2>

            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] text-kinari/85 md:text-base">
              <p>
                使うのは紀州備長炭、そして備長炭です。和歌山が古くから生んできた白炭で、火力が高く、長く安定して燃える。ガスや電気の熱とは、身への入り方がまるで違います。
              </p>
              <p>
                とはいえ、炭は勝手にちょうどよく焼いてはくれません。炭の減り方、脂が落ちて立つ煙、身の縮み方、匂いの変わり目。それを見ながら串を返し、位置を替え、火を休ませる。
              </p>
              <p>
                レシピに書けるのはタレまでで、その先は毎日の火との相談です。百年やってきて、いまだに毎日違う。だから毎日、焼き場に立ちます。
              </p>
            </div>

            <dl className="mt-12 grid max-w-lg gap-y-5 border-t border-kinari/15 pt-8 text-sm">
              {[
                ['炭', '紀州備長炭・備長炭'],
                ['鰻', '国産の活鰻／毎朝、店舗で捌く'],
                ['鶏', '国産の鶏のみ'],
                ['タレ', '創業以来、継ぎ足してきた自家製'],
              ].map(([k, v]) => (
                <div key={k} className="grid grid-cols-[4.5rem_1fr] items-baseline gap-4 border-b border-kinari/10 pb-4">
                  <dt className="eyebrow opacity-55">{k}</dt>
                  <dd className="leading-relaxed text-kinari/90">{v}</dd>
                </div>
              ))}
            </dl>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
