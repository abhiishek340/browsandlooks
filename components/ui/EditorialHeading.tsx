import type { ElementType, ReactNode } from 'react';

/** Renders *asterisk* segments as italics — one per headline is the house style. */
export function emphasise(text: string): ReactNode[] {
  return text.split(/(\*[^*]+\*)/g).map((part, i) =>
    part.startsWith('*') && part.endsWith('*') ? <em key={i}>{part.slice(1, -1)}</em> : part,
  );
}

export function EditorialHeading({
  as: Tag = 'h2',
  text,
  className,
  id,
}: {
  as?: ElementType;
  text: string;
  className?: string;
  id?: string;
}) {
  return (
    <Tag id={id} className={['display', className].filter(Boolean).join(' ')}>
      {emphasise(text)}
    </Tag>
  );
}
