import Link from 'next/link';
import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { photos } from '@/data/photos';
import { yakitoriItems } from '@/data/menu';

export default function YakitoriSection() {
  return (
    <section className="relative bg-kinari px-5 py-24 md:px-10 md:py-40">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-16 lg:grid-cols-[1.15fr_0.85fr] lg:gap-24">
          <div className="grid grid-cols-12 gap-4 md:gap-6">
            <Reveal className="col-span-12" slow>
              <Photo
                photo={photos.yakitoriKawa}
                sizes="(max-width: 1023px) 92vw, 52vw"
                className="h-auto w-full"
              />
            </Reveal>
            <Reveal className="col-span-6 -mt-16 sm:-mt-24" delay={130} slow>
              <Photo photo={photos.yakitoriNegimaGrill} sizes="(max-width: 1023px) 46vw, 26vw" className="h-auto w-full" />
            </Reveal>
            <Reveal className="col-span-6 mt-4" delay={210} slow>
              <Photo photo={photos.yakitoriTray} sizes="(max-width: 1023px) 46vw, 26vw" className="h-auto w-full" />
            </Reveal>
          </div>

          <Reveal className="lg:sticky lg:top-28 lg:self-start">
            <SectionLabel index="05" en="YAKITORI" className="text-tan" />
            <h2 className="display mt-8 text-[clamp(1.9rem,7vw,3.4rem)] leading-[1.45] tracking-[0.08em]">
              いつもの食卓に、
              <br />
              炭火の一本。
            </h2>

            <div className="mt-10 max-w-[34rem] space-y-6 text-[0.94rem] leading-[2.1] md:text-base">
              <p>
                焼き鳥に使うのは、国産の鶏だけです。串は手で刺します。もも、むね、ねぎ串、皮、肝、砂ずり、なんこつ。部位によって脂の量も繊維の向きも違うので、刺し方も焼き方も変えます。
              </p>
              <p>
タレは刷毛で塗らず、鍋のタレに直接くぐらせて、また火に戻します。それを何度か繰り返して仕上げます。
              </p>
              <p>
                ももやきとりは毎日焼いていますが、それ以外の串は日に数本だけ。焼けたぶんが売り切れたら、その日はおしまいです。前もってご相談いただければ、当日の朝までのご予約でご用意できることもあります。
              </p>
            </div>

            <ul className="mt-12 flex flex-wrap gap-x-5 gap-y-3 text-[0.82rem] leading-none">
              {yakitoriItems.map((item) => (
                <li key={item.slug} className="border-b border-sumi/20 pb-2">
                  {item.name.replace('やきとり', '')}
                </li>
              ))}
            </ul>

            <div className="mt-12 flex flex-wrap gap-x-10 gap-y-4">
              <Link href="/yakitori" className="rule-link text-tan">
                焼き鳥について
              </Link>
              <Link href="/menu" className="rule-link text-tan">
                価格を見る
              </Link>
            </div>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
