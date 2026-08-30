import Reveal from '@/components/ui/Reveal';
import SectionLabel from '@/components/ui/SectionLabel';
import { shop } from '@/data/shop';

type Props = {
  /** 章番号を出すか（下層ページでは省略） */
  index?: string;
  heading?: string;
  /** 地図の高さクラス */
  mapClassName?: string;
};

export default function ShopInfo({ index, heading = '店舗情報', mapClassName = 'h-[58svh] md:h-[70svh]' }: Props) {
  return (
    <section className="washi-grain relative bg-washi px-5 py-24 md:px-10 md:py-36">
      <div className="mx-auto max-w-[92rem]">
        <div className="grid gap-14 lg:grid-cols-[0.85fr_1.15fr] lg:gap-20">
          <Reveal>
            {index ? (
              <SectionLabel index={index} en="SHOP INFO" className="text-tan" />
            ) : (
              <SectionLabel en="SHOP INFO" className="text-tan" />
            )}
            <h2 className="display mt-8 text-[clamp(1.8rem,6.5vw,3rem)] leading-[1.45] tracking-[0.08em]">
              {heading}
            </h2>

            <dl className="mt-10 border-t border-sumi/15 text-[0.92rem]">
              {[
                { k: '店名', v: <>{shop.name}（{shop.legalName}）</> },
                {
                  k: '住所',
                  v: (
                    <>
                      {shop.address.full}
                      <br />
                      <span className="opacity-70">{shop.landmark}</span>
                    </>
                  ),
                },
                {
                  k: '電話',
                  v: (
                    <a href={shop.telHref} className="rule-link text-tan tabular-nums">
                      {shop.tel}
                    </a>
                  ),
                },
                { k: '営業時間', v: shop.hours.label },
                {
                  k: '定休日',
                  v: (
                    <>
                      {shop.hours.closedLabel}
                      <br />
                      <span className="text-[0.82rem] opacity-70">{shop.hours.closedNote}</span>
                    </>
                  ),
                },
                { k: '業態', v: '焼き鳥・鰻の持ち帰り専門店（店内に客席はありません）' },
                { k: 'お支払い', v: '現金／クレジットカード（VISA・Mastercard）' },
                {
                  k: 'Instagram',
                  v: (
                    <a
                      href={shop.instagram}
                      target="_blank"
                      rel="noopener noreferrer"
                      className="rule-link text-tan"
                    >
                      {shop.instagramHandle}
                    </a>
                  ),
                },
              ].map((row) => (
                <div
                  key={row.k}
                  className="grid grid-cols-[5rem_1fr] items-baseline gap-4 border-b border-sumi/12 py-5 sm:grid-cols-[7rem_1fr] sm:gap-8"
                >
                  <dt className="text-[0.74rem] tracking-[0.16em] opacity-75">{row.k}</dt>
                  <dd className="leading-[1.9]">{row.v}</dd>
                </div>
              ))}
            </dl>

            <a
              href={shop.mapLink}
              target="_blank"
              rel="noopener noreferrer"
              className="rule-link mt-10 inline-flex text-tan"
            >
              Googleマップで開く
            </a>
          </Reveal>

          <Reveal delay={100} className="lg:sticky lg:top-28 lg:self-start">
            <div className={`map-frame w-full overflow-hidden bg-sumi/5 ${mapClassName}`}>
              {/*
                * 埋め込み地図の中にはキーボードで操作できる要素がないため、
                * タブ順に入れると「入っても何もできない行き止まり」になる。
                * tabIndex={-1} で外し、下の「Googleマップで開く」リンクを到達手段にする。
                */}
              <iframe
                src={shop.mapEmbedSrc}
                title={`${shop.name}の地図（${shop.address.full}）`}
                loading="lazy"
                referrerPolicy="no-referrer-when-downgrade"
                className="h-full w-full border-0"
                tabIndex={-1}
                allowFullScreen
              />
            </div>
            <p className="mt-4 text-[0.8rem] leading-[1.9] opacity-70">
              南海和歌山市駅から東へ、フォルテワジマの西隣です。お車でお越しの際は、周辺の駐車場をご利用ください。
            </p>
          </Reveal>
        </div>
      </div>
    </section>
  );
}
