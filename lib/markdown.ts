/**
 * 記事本文用の軽量な Markdown → HTML 変換。
 * 生成される記事は書式が限られているため、外部ライブラリを足さずに済ませています。
 * 入力は必ずエスケープしてから組み立てるので、生のHTMLは通しません。
 */

const escapeHtml = (s: string) =>
  s
    .replace(/&/g, '&amp;')
    .replace(/</g, '&lt;')
    .replace(/>/g, '&gt;')
    .replace(/"/g, '&quot;');

function inline(src: string): string {
  let out = escapeHtml(src);
  // [text](href)
  out = out.replace(/\[([^\]]+)\]\(([^)\s]+)\)/g, (_m, text: string, href: string) => {
    const safe = /^(https?:\/\/|\/|tel:|mailto:)/.test(href) ? href : '#';
    const external = safe.startsWith('http');
    const attrs = external ? ' target="_blank" rel="noopener noreferrer"' : '';
    return `<a href="${safe}"${attrs}>${text}</a>`;
  });
  out = out.replace(/\*\*([^*]+)\*\*/g, '<strong>$1</strong>');
  return out;
}

/** 見出しからページ内目次を作るためのID */
export function slugifyHeading(text: string, index: number): string {
  const base = text
    .replace(/[^\p{L}\p{N}]+/gu, '-')
    .replace(/^-+|-+$/g, '')
    .toLowerCase();
  return base ? `h-${index}-${base}`.slice(0, 64) : `h-${index}`;
}

export type Heading = { id: string; text: string; level: 2 | 3 };

export function renderMarkdown(md: string): { html: string; headings: Heading[] } {
  const lines = md.replace(/\r\n/g, '\n').split('\n');
  const html: string[] = [];
  const headings: Heading[] = [];
  let para: string[] = [];
  let list: string[] | null = null;
  let quote: string[] | null = null;
  let hIndex = 0;

  const flushPara = () => {
    if (para.length) {
      html.push(`<p>${inline(para.join(' '))}</p>`);
      para = [];
    }
  };
  const flushList = () => {
    if (list && list.length) {
      html.push(`<ul>${list.map((i) => `<li>${inline(i)}</li>`).join('')}</ul>`);
    }
    list = null;
  };
  const flushQuote = () => {
    if (quote && quote.length) {
      html.push(`<blockquote><p>${inline(quote.join(' '))}</p></blockquote>`);
    }
    quote = null;
  };
  const flushAll = () => {
    flushPara();
    flushList();
    flushQuote();
  };

  for (const rawLine of lines) {
    const line = rawLine.trimEnd();

    if (!line.trim()) {
      flushAll();
      continue;
    }

    const heading = /^(#{2,3})\s+(.*)$/.exec(line);
    if (heading) {
      flushAll();
      hIndex += 1;
      const level = heading[1].length === 2 ? 2 : 3;
      const text = heading[2].trim();
      const id = slugifyHeading(text, hIndex);
      headings.push({ id, text, level: level as 2 | 3 });
      html.push(`<h${level} id="${id}">${inline(text)}</h${level}>`);
      continue;
    }

    if (/^#\s+/.test(line)) {
      // 記事内の h1 は frontmatter の title に任せるので h2 に落とす
      flushAll();
      hIndex += 1;
      const text = line.replace(/^#\s+/, '').trim();
      const id = slugifyHeading(text, hIndex);
      headings.push({ id, text, level: 2 });
      html.push(`<h2 id="${id}">${inline(text)}</h2>`);
      continue;
    }

    if (/^(-{3,}|\*{3,})$/.test(line.trim())) {
      flushAll();
      html.push('<hr />');
      continue;
    }

    const li = /^\s*[-*]\s+(.*)$/.exec(line);
    if (li) {
      flushPara();
      flushQuote();
      list ??= [];
      list.push(li[1]);
      continue;
    }

    const bq = /^\s*>\s?(.*)$/.exec(line);
    if (bq) {
      flushPara();
      flushList();
      quote ??= [];
      quote.push(bq[1]);
      continue;
    }

    flushList();
    flushQuote();
    para.push(line.trim());
  }

  flushAll();
  return { html: html.join('\n'), headings };
}

/** 一覧の抜粋用にプレーンテキスト化 */
export function toPlainText(md: string, max = 120): string {
  const text = md
    .replace(/```[\s\S]*?```/g, '')
    .replace(/^#{1,6}\s+/gm, '')
    .replace(/\[([^\]]+)\]\([^)]+\)/g, '$1')
    .replace(/[*>_`-]/g, '')
    .replace(/\s+/g, ' ')
    .trim();
  return text.length > max ? `${text.slice(0, max)}…` : text;
}
