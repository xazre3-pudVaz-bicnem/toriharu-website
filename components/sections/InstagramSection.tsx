import Photo from '@/components/ui/Photo';
import Reveal from '@/components/ui/Reveal';
import { photos } from '@/data/photos';
import { shop } from '@/data/shop';

export default function InstagramSection() {
  return (
    <section className="relative overflow-hidden bg-tare text-kinari">
      <div className="mx-auto grid max-w-[92rem] gap-12 px-5 py-20 md:grid-cols-[1fr_auto] md:items-center md:px-10 md:py-28">
        <Reveal>
          <p className="eyebrow text-honoo">12 — INSTAGRAM</p>
          <h2 className="display mt-7 text-[clamp(1.6rem,5.5vw,2.6rem)] leading-[1.5] tracking-[0.08em]">
            今日の焼き場を、
            <br />
            のぞいてみてください。
          </h2>
          <p className="mt-7 max-w-lg text-[0.9rem] leading-[2] text-kinari/80">
            その日に捌いた鰻や、焼き上がった串の写真を載せています。店の様子は、こちらがいちばん早いかもしれません。
          </p>
          <a
            href={shop.instagram}
            target="_blank"
            rel="noopener noreferrer"
            className="rule-link mt-9 inline-flex text-honoo"
            aria-label={`Instagram ${shop.instagramHandle} を開く（外部サイト）`}
          >
            Instagram {shop.instagramHandle}
          </a>
        </Reveal>

        <Reveal delay={120} className="w-full max-w-sm justify-self-end md:w-64 lg:w-80">
          <Photo photo={photos.kabayakiWrapped02} sizes="(max-width: 767px) 92vw, 20rem" className="h-auto w-full" />
        </Reveal>
      </div>
    </section>
  );
}
