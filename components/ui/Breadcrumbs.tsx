import Link from 'next/link';
import type { Crumb } from '@/lib/jsonld';

export default function Breadcrumbs({ crumbs, tone = 'light' }: { crumbs: Crumb[]; tone?: 'light' | 'dark' }) {
  const color = tone === 'dark' ? 'text-kinari/60' : 'text-sumi/55';
  return (
    <nav aria-label="パンくずリスト" className={`text-[0.7rem] tracking-[0.14em] ${color}`}>
      <ol className="flex flex-wrap items-center gap-x-2 gap-y-1">
        {crumbs.map((c, i) => {
          const last = i === crumbs.length - 1;
          return (
            <li key={c.href} className="flex items-center gap-2">
              {last ? (
                <span aria-current="page" className="inline-block py-1.5">
                  {c.name}
                </span>
              ) : (
                <>
                  <Link href={c.href} className="inline-block py-1.5 underline-offset-4 hover:underline">
                    {c.name}
                  </Link>
                  <span aria-hidden>/</span>
                </>
              )}
            </li>
          );
        })}
      </ol>
    </nav>
  );
}
