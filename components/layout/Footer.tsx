import Link from 'next/link';
import { navItems } from '@/data/nav';
import { shop } from '@/data/shop';

export default function Footer() {
  const year = 2026;

  return (
    <footer className="bg-sumi text-kinari">
      <div className="mx-auto max-w-[92rem] px-5 py-16 md:px-10 md:py-24">
        <div className="grid gap-14 md:grid-cols-[1.1fr_1fr] md:gap-20">
          {/* 店舗情報（NAP） */}
          <div>
            <p className="display text-2xl tracking-[0.3em] md:text-3xl">トリハル</p>
            <p className="mt-2 text-[0.62rem] tracking-[0.4em] opacity-50">TORIHARU</p>

            <address className="mt-8 space-y-4 not-italic text-sm leading-relaxed opacity-85">
              <p>{shop.legalName}</p>
              <p>
                {shop.address.full}
                <br />
                <span className="opacity-70">（{shop.landmark}）</span>
              </p>
              <p>
                <a href={shop.telHref} className="rule-link tabular-nums">
                  TEL {shop.tel}
                </a>
              </p>
              <p>
                営業時間 {shop.hours.label}
                <br />
                定休日 {shop.hours.closedLabel}
              </p>
            </address>

            <div className="mt-8 flex flex-wrap items-center gap-6 text-sm">
              <a
                href={shop.instagram}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link"
                aria-label={`Instagram ${shop.instagramHandle} を開く（外部サイト）`}
              >
                Instagram {shop.instagramHandle}
              </a>
              <a
                href={shop.mapLink}
                target="_blank"
                rel="noopener noreferrer"
                className="rule-link"
                aria-label="Googleマップで場所を見る（外部サイト）"
              >
                Googleマップ
              </a>
            </div>
          </div>

          {/* ナビゲーション */}
          <nav aria-label="フッターメニュー">
            <ul className="grid grid-cols-2 gap-x-6 border-t border-kinari/15">
              {navItems.map((item) => (
                <li key={item.href} className="border-b border-kinari/15">
                  <Link href={item.href} className="flex items-baseline justify-between py-4 text-sm">
                    <span>{item.label}</span>
                    <span className="eyebrow opacity-62">{item.en}</span>
                  </Link>
                </li>
              ))}
            </ul>
            <p className="mt-8 text-[0.72rem] leading-relaxed opacity-72">
              トリハルは持ち帰り専門の店です。店内に客席はございません。
              <br />
              {shop.hours.closedNote}
            </p>
          </nav>
        </div>

        <p className="mt-16 border-t border-kinari/12 pt-8 text-[0.68rem] tracking-[0.12em] opacity-62">
          © {year} {shop.legalName}
        </p>
      </div>
    </footer>
  );
}
