export type NavItem = {
  href: string;
  label: string;
  en: string;
  /** ヘッダー・フッターに出すか */
  primary?: boolean;
};

export const navItems: NavItem[] = [
  { href: '/unagi', label: '鰻', en: 'UNAGI', primary: true },
  { href: '/yakitori', label: '焼き鳥', en: 'YAKITORI', primary: true },
  { href: '/menu', label: '商品一覧', en: 'MENU', primary: true },
  { href: '/seasonal', label: '季節の一品', en: 'SEASONAL' },
  { href: '/takeout', label: '持ち帰り・発送', en: 'TAKEOUT', primary: true },
  { href: '/about', label: 'トリハルについて', en: 'ABOUT', primary: true },
  { href: '/blog', label: '読みもの', en: 'JOURNAL' },
  { href: '/faq', label: 'よくあるご質問', en: 'FAQ' },
  { href: '/access', label: '店舗・アクセス', en: 'ACCESS', primary: true },
];

export const pageTitles: Record<string, string> = Object.fromEntries(
  navItems.map((n) => [n.href, n.label]),
);
