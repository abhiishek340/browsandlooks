'use client';

import { useEffect, useState } from 'react';
import styles from '@/app/services/services.module.css';

type Item = { slug: string; number: string; name: string };

/** Sticky category index for the menu. Highlights the section being read (observer-driven,
 *  so it updates only when the section changes — never per scroll frame). */
export function CategoryJumpNav({ items }: { items: Item[] }) {
  const [current, setCurrent] = useState<string | null>(null);

  useEffect(() => {
    const sections = items.map((i) => document.getElementById(i.slug)).filter(Boolean) as HTMLElement[];
    const io = new IntersectionObserver(
      (entries) => {
        const visible = entries.filter((e) => e.isIntersecting).sort((a, b) => a.boundingClientRect.top - b.boundingClientRect.top);
        if (visible[0]) setCurrent(visible[0].target.id);
      },
      { rootMargin: '-35% 0px -55% 0px' },
    );
    sections.forEach((s) => io.observe(s));
    return () => io.disconnect();
  }, [items]);

  return (
    <nav aria-label="Treatment categories" className={styles.jump}>
      <div className="container">
        <ul role="list" className={styles.jumpList}>
          {items.map((c) => (
            <li key={c.slug}>
              <a href={`#${c.slug}`} aria-current={current === c.slug ? 'location' : undefined}>
                <span>{c.number}</span>
                {c.name}
              </a>
            </li>
          ))}
        </ul>
      </div>
    </nav>
  );
}
