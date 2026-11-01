import Image from 'next/image';
import type { Media } from '@/content/types';
import styles from './ResponsiveMedia.module.css';

type Props = {
  media: Media;
  sizes: string;
  priority?: boolean;
  className?: string;
  /** Fill the parent box (parent controls aspect ratio) */
  fill?: boolean;
  ratio?: string;
  quality?: 70 | 80 | 90;
  decorative?: boolean;
  /** Curtain reveal on scroll (handled by RevealController) */
  reveal?: boolean;
  /** Slow scroll drift of the image inside its frame (desktop only) */
  parallax?: boolean;
  /** Part of an inner-page entrance */
  intro?: boolean;
};

export function ResponsiveMedia({ media, sizes, priority, className, fill = true, ratio, quality = 80, decorative, reveal, parallax, intro }: Props) {
  const style = {
    '--focal-desktop': media.focal.desktop,
    '--focal-mobile': media.focal.mobile,
    ...(ratio ? { aspectRatio: ratio } : {}),
  } as React.CSSProperties;

  return (
    <div className={[styles.frame, className].filter(Boolean).join(' ')} style={style}
      data-image-reveal={reveal || undefined}
      data-parallax={parallax || undefined}
      data-intro-media={intro || undefined}
    >
      {fill ? (
        <Image
          src={media.src}
          alt={decorative ? '' : media.alt}
          fill
          sizes={sizes}
          priority={priority}
          quality={quality}
          className={styles.img}
        />
      ) : (
        <Image src={media.src} alt={decorative ? '' : media.alt} width={media.width} height={media.height} sizes={sizes} priority={priority} quality={quality} className={styles.natural} />
      )}
    </div>
  );
}
