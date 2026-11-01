import Link from 'next/link';
import { Arrow } from './Arrow';
import styles from './Button.module.css';

type Props = {
  href: string;
  children: React.ReactNode;
  variant?: 'solid' | 'outline' | 'ivory' | 'ghost-ivory';
  size?: 'regular' | 'compact';
  arrow?: boolean;
  external?: boolean;
  className?: string;
  'aria-label'?: string;
  'aria-describedby'?: string;
};

export function Button({ href, children, variant = 'solid', size = 'regular', arrow, external, className, ...aria }: Props) {
  const cls = [styles.button, styles[variant], styles[size], className].filter(Boolean).join(' ');
  const inner = (
    <>
      <span>{children}</span>
      {arrow && <Arrow className={styles.arrow} />}
    </>
  );
  const isPlain = external || /^(tel:|mailto:|https?:)/.test(href);
  if (isPlain) {
    return (
      <a href={href} className={cls} {...(external ? { target: '_blank', rel: 'noopener' } : {})} {...aria}>
        {inner}
      </a>
    );
  }
  return (
    <Link href={href} className={cls} {...aria}>
      {inner}
    </Link>
  );
}
