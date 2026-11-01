'use client';

import Link from 'next/link';
import { usePathname } from 'next/navigation';
import { useEffect, useRef } from 'react';
import { business } from '@/content/business';
import { primaryNav } from '@/content/navigation';
import { BookButton } from '@/components/ui/BookButton';
import { SocialLinks } from '@/components/ui/SocialLinks';
import { telLink } from '@/lib/booking';
import styles from './MobileNavigation.module.css';

export function MobileNavigation({ socials }: { socials: { platform: string; url: string }[] }) {
  const dialogRef = useRef<HTMLDialogElement>(null);
  const triggerRef = useRef<HTMLButtonElement>(null);
  const pathname = usePathname();

  const close = () => dialogRef.current?.close();

  // Close when the route changes (link inside the dialog was followed)
  useEffect(() => {
    close();
  }, [pathname]);

  useEffect(() => {
    const dialog = dialogRef.current;
    if (!dialog) return;
    const onClose = () => {
      document.documentElement.classList.remove('overlay-open');
      triggerRef.current?.focus();
    };
    dialog.addEventListener('close', onClose);
    return () => dialog.removeEventListener('close', onClose);
  }, []);

  const open = () => {
    dialogRef.current?.showModal();
    document.documentElement.classList.add('overlay-open');
  };

  return (
    <>
      <button ref={triggerRef} type="button" className={styles.trigger} onClick={open} aria-haspopup="dialog">
        <span className={styles.triggerLabel}>Menu</span>
        <span className={styles.bars} aria-hidden="true" />
      </button>

      <dialog ref={dialogRef} className={styles.dialog} aria-label="Site menu">
        <div className={styles.top}>
          <span className={styles.brand}>browandlooks</span>
          <button type="button" className={styles.close} onClick={close} autoFocus>
            Close
          </button>
        </div>
        <nav aria-label="Mobile" className={styles.nav}>
          <ol role="list" className={styles.list}>
            {primaryNav.map((item, i) => (
              <li key={item.href} style={{ '--i': i } as React.CSSProperties}>
                <Link href={item.href} className={styles.link} aria-current={pathname.startsWith(item.href) ? 'page' : undefined} onClick={close}>
                  <span className={styles.num}>0{i + 1}</span>
                  {item.label}
                </Link>
              </li>
            ))}
          </ol>
        </nav>
        <div className={styles.foot}>
          <BookButton className={styles.book} arrow />
          {business.phone && (
            <a href={telLink(business.phone.value)} className={styles.contact}>
              {business.phone.value}
            </a>
          )}
          <p className={styles.place}>Salt Lake City, Utah</p>
          <SocialLinks links={socials} />
        </div>
      </dialog>
    </>
  );
}
