import type { Metadata, Viewport } from 'next';
import { Cormorant_Garamond, Manrope } from 'next/font/google';
import { MobileBookingBar } from '@/components/layout/MobileBookingBar';
import { PreviewNotice } from '@/components/layout/PreviewNotice';
import { SiteFooter } from '@/components/layout/SiteFooter';
import { SiteHeader } from '@/components/layout/SiteHeader';
import { MotionBoot } from '@/components/motion/MotionBoot';
import { RevealController } from '@/components/motion/RevealController';
import { business, isLaunchBuild } from '@/content/business';
import { siteUrl } from '@/lib/metadata';
import { beautySalonJsonLd } from '@/lib/structured-data';
import '@/styles/globals.css';

const display = Cormorant_Garamond({
  subsets: ['latin'],
  weight: ['400', '500'],
  style: ['normal', 'italic'],
  variable: '--font-display',
  display: 'swap',
});

const sans = Manrope({
  subsets: ['latin'],
  weight: ['400', '500', '600'],
  variable: '--font-sans',
  display: 'swap',
});

export const metadata: Metadata = {
  metadataBase: new URL(siteUrl),
  title: {
    default: `${business.name} · Threading, Brows, Lashes & Nails in Salt Lake City`,
    template: `%s · ${business.name}`,
  },
  description:
    'Browandlooks is a beauty studio in Salt Lake City for eyebrow threading, brow shaping, lashes, nails and waxing.',
  robots: isLaunchBuild ? undefined : { index: false, follow: false },
};

export const viewport: Viewport = {
  themeColor: '#f7f2ea',
};

export default function RootLayout({ children }: { children: React.ReactNode }) {
  return (
    <html lang="en-US" className={`${display.variable} ${sans.variable}`} data-scroll-behavior="smooth" suppressHydrationWarning>
      <head>
        <MotionBoot />
      </head>
      <body>
        <a className="skip-link" href="#main">
          Skip to content
        </a>
        <SiteHeader />
        <main id="main" tabIndex={-1}>
          {children}
        </main>
        <SiteFooter />
        <MobileBookingBar />
        <PreviewNotice />
        <RevealController />
        <script
          type="application/ld+json"
          dangerouslySetInnerHTML={{ __html: JSON.stringify(beautySalonJsonLd()) }}
        />
      </body>
    </html>
  );
}
