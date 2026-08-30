import Photo from '@/components/ui/Photo';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

/**
 * ファーストビュー。CTAボタンは置かない。
 * 店の主役は鰻なので、焼き上がった蒲焼を全面に。
 */
export default function Hero() {
  return (
    <section className="relative min-h-[88svh] w-full overflow-hidden bg-sumi md:min-h-[100svh]">
      <div className="absolute inset-0">
        {/*
          横長の写真なので、縦長のスマホでは背景の壁ばかりになってしまう。
          少し寄せたうえで画角を蒲焼に合わせる。PCは引きのまま。
        */}
        <Photo
          photo={photos.heroUnagiGrill}
          fill
          priority
          quality={84}
          sizes="100vw"
          className="scale-125 object-[72%_64%] md:scale-100 md:object-[56%_58%]"
        />
      </div>

      {/* 文字を読ませるための、炭色のグラデーション */}
      <div
        aria-hidden
        className="absolute inset-0 bg-gradient-to-b from-sumi/70 via-sumi/25 to-sumi/85"
      />
      <div aria-hidden className="absolute inset-0 bg-gradient-to-r from-sumi/60 to-transparent md:w-2/3" />

      <div className="relative flex min-h-[88svh] flex-col justify-end px-5 pb-14 pt-28 text-kinari md:min-h-[100svh] md:px-10 md:pb-20">
        <div className="mx-auto w-full max-w-[92rem]">
          <div className="flex items-end justify-between gap-8">
            <div>
              <p className="eyebrow opacity-70">SINCE THE MEIJI ERA · WAKAYAMA</p>

              <h1 className="mt-6 flex flex-col gap-1">
                <span className="display block text-[clamp(2.6rem,11vw,5.5rem)] leading-[0.98] tracking-[0.14em]">
                  トリハル
                </span>
                <span className="mt-4 block text-[0.78rem] tracking-[0.3em] opacity-85 md:text-sm">
                  {shop.founded.era}創業
                </span>
              </h1>

              <p className="display mt-7 text-[clamp(1.15rem,4.4vw,1.9rem)] leading-[1.7] tracking-[0.12em]">
                受け継ぐ火、
                <br className="sm:hidden" />
                受け継ぐ味。
              </p>

              <p className="mt-7 max-w-md text-[0.82rem] leading-[2] opacity-80 md:text-sm">
                国産鰻と焼き鳥
                <span aria-hidden className="mx-3 opacity-60">
                  ／
                </span>
                和歌山市南大工町
              </p>
            </div>

            {/* PCのみ：縦書きの一行 */}
            <p className="vertical-label display hidden text-sm leading-none opacity-70 lg:block">
              朝、鰻を捌くところから。
            </p>
          </div>
        </div>
      </div>

      <div
        aria-hidden
        className="absolute inset-x-0 bottom-0 h-24 bg-gradient-to-b from-transparent to-kinari"
      />
    </section>
  );
}
