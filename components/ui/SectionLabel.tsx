import styles from './SectionLabel.module.css';

export function SectionLabel({ children, className }: { children: React.ReactNode; className?: string }) {
  return <p className={['label', styles.label, className].filter(Boolean).join(' ')}>{children}</p>;
}
