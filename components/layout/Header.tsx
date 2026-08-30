'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useState } from 'react';
import { navItems } from '@/data/nav';
import { shop } from '@/data/shop';

export default function Header() {
  const pathname = usePathname();
  /**
   * メニューを開いたときのパスを持っておく。
   * ページが変わればパスも変わるので、遷移すると自動的に閉じます。
   */
  const [openFor, setOpenFor] = useState<string | null>(null);
  const open = openFor === pathname;
  const [scrolled, setScrolled] = useState(false);

  useEffect(() => {
    const onScroll = () => setScrolled(window.scrollY > 24);
    onScroll();
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  useEffect(() => {
    document.body.style.overflow = open ? 'hidden' : '';
    return () => {
      document.body.style.overflow = '';
    };
  }, [open]);

  /* どのページも最上部は暗い写真か炭色なので、スクロール前は白抜きで重ねる */
  const transparent = !scrolled && !open;

  return (
    <header
      className={[
        'fixed inset-x-0 top-0 z-50 transition-colors duration-500',
        transparent ? 'text-kinari' : 'text-sumi',
        scrolled || open ? 'bg-kinari/95 shadow-[0_1px_0_0_rgba(24,20,17,0.08)]' : 'bg-transparent',
      ].join(' ')}
    >
      <div className="mx-auto flex h-16 max-w-[92rem] items-center justify-between px-5 md:h-20 md:px-10">
        <Link
          href="/"
          className="display flex items-baseline gap-3 text-lg tracking-[0.28em] md:text-xl"
          aria-label={`${shop.name} トップページへ`}
        >
          <span>トリハル</span>
          <span className="hidden text-[0.55rem] tracking-[0.34em] opacity-60 sm:inline">TORIHARU</span>
        </Link>

        <nav aria-label="メインメニュー" className="hidden items-center gap-8 lg:flex">
          {navItems
            .filter((n) => n.primary)
            .map((item) => {
              const active = pathname === item.href || pathname.startsWith(`${item.href}/`);
              return (
                <Link
                  key={item.href}
                  href={item.href}
                  className={`text-[0.8rem] tracking-[0.16em] transition-opacity hover:opacity-60 ${
                    active ? 'opacity-100' : 'opacity-80'
                  }`}
                  aria-current={active ? 'page' : undefined}
                >
                  {item.label}
                </Link>
              );
            })}
          <a
            href={shop.telHref}
            className={`rule-link ${transparent ? 'text-kinari' : 'text-tan'}`}
            aria-label={`電話をかける ${shop.tel}`}
          >
            <span className="tabular-nums">{shop.tel}</span>
          </a>
        </nav>

        <button
          type="button"
          onClick={() => setOpenFor(open ? null : pathname)}
          className="relative z-50 -mr-2 flex h-11 w-11 flex-col items-center justify-center gap-[6px] lg:hidden"
          aria-expanded={open}
          aria-controls="mobile-menu"
          aria-label={open ? 'メニューを閉じる' : 'メニューを開く'}
        >
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? 'translate-y-[3.5px] rotate-45' : ''}`}
          />
          <span
            className={`block h-px w-6 bg-current transition-transform duration-300 ${open ? '-translate-y-[3.5px] -rotate-45' : ''}`}
          />
        </button>
      </div>

      {/* モバイルメニュー：backdrop-blur を持つ親の内側で fixed を使わない */}
      <div
        id="mobile-menu"
        hidden={!open}
        className="absolute inset-x-0 top-full max-h-[calc(100dvh-4rem)] overflow-y-auto bg-kinari text-sumi lg:hidden"
      >
        <nav aria-label="メニュー" className="px-5 pb-10 pt-4">
          <ul className="divide-y divide-sumi/10 border-y border-sumi/10">
            {navItems.map((item) => (
              <li key={item.href}>
                <Link
                  href={item.href}
                  onClick={() => setOpenFor(null)}
                  className="flex items-baseline justify-between py-4"
                >
                  <span className="display text-lg">{item.label}</span>
                  <span className="eyebrow opacity-62">{item.en}</span>
                </Link>
              </li>
            ))}
          </ul>

          <div className="mt-8 space-y-3 text-sm">
            <a href={shop.telHref} className="display block text-2xl tracking-[0.08em] text-tan tabular-nums">
              {shop.tel}
            </a>
            <p className="text-[0.78rem] leading-relaxed opacity-70">
              {shop.hours.label}／定休日 {shop.hours.closedLabel}
              <br />
              {shop.address.full}
            </p>
            <a
              href={shop.instagram}
              target="_blank"
              rel="noopener noreferrer"
              className="rule-link text-tan"
            >
              Instagram
            </a>
          </div>
        </nav>
      </div>
    </header>
  );
}
