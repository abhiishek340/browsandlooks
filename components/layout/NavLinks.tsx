'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { primaryNav } from '@/content/navigation';
import styles from './SiteHeader.module.css';

export function NavLinks() {
  const pathname = usePathname();
  return (
    <ul role="list" className={styles.navList}>
      {primaryNav.map((item) => {
        const current = pathname === item.href || pathname.startsWith(`${item.href}/`);
        return (
          <li key={item.href}>
            <Link href={item.href} className={styles.navLink} aria-current={current ? 'page' : undefined}>
              {item.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
