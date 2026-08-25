'use client';

import { useEffect, useRef, type ReactNode } from 'react';

type Props = {
  children: ReactNode;
  className?: string;
  /** ミリ秒 */
  delay?: number;
  slow?: boolean;
  as?: 'div' | 'section' | 'figure' | 'article' | 'li' | 'header';
};

/**
 * スクロールで一度だけゆっくり現れる。
 *
 * 表示状態は data-visible 属性を直接書き換えて切り替えます。
 * React の state を経由しないので、要素が画面に入るたびに
 * 再レンダリングが走ることがありません。
 * prefers-reduced-motion は globals.css 側で無効化しています。
 */
export default function Reveal({ children, className = '', delay = 0, slow = false, as = 'div' }: Props) {
  const ref = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    if (typeof IntersectionObserver === 'undefined') {
      el.dataset.visible = 'true';
      return;
    }

    const io = new IntersectionObserver(
      (entries) => {
        for (const entry of entries) {
          if (entry.isIntersecting) {
            (entry.target as HTMLElement).dataset.visible = 'true';
            io.unobserve(entry.target);
          }
        }
      },
      { rootMargin: '0px 0px -12% 0px', threshold: 0.08 },
    );

    io.observe(el);
    return () => io.disconnect();
  }, []);

  const Tag = as as 'div';

  return (
    <Tag
      ref={ref}
      className={`reveal ${slow ? 'reveal-slow' : ''} ${className}`}
      data-visible="false"
      style={delay ? { transitionDelay: `${delay}ms` } : undefined}
    >
      {children}
    </Tag>
  );
}
