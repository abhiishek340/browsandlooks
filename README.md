# Browandlooks

Website for **Browandlooks**, a beauty studio in Salt Lake City offering threading, brows, lashes, nails and waxing.

Built with Next.js (App Router), TypeScript, CSS Modules and GSAP.

> **Preview:** business details, prices and photography are placeholders until confirmed.
> See [CONTENT-CHECKLIST.md](CONTENT-CHECKLIST.md). Preview builds are not indexed by search engines.

## Getting started

Requires Node.js 22 or later.

```bash
npm install
npm run dev
```

Open [http://localhost:3000](http://localhost:3000).

## Scripts

| Command | Description |
|---|---|
| `npm run dev` | Start the development server |
| `npm run build` | Production build (runs the content check first) |
| `npm start` | Serve the production build |
| `npm run typecheck` | TypeScript check |
| `npm run check:content` | List placeholder facts and images still to replace |
| `npm run test:e2e` | Playwright end-to-end tests (run `npm run build` first) |

Before the first test run, install the browser with `npx playwright install chromium`.

### Launch build

```bash
LAUNCH=1 npm run build
```

A launch build fails while any placeholder content remains. It also enables search indexing and hides the preview notice.

## Pages

| Route | Content |
|---|---|
| `/` | Homepage |
| `/services` | Full treatment menu with prices |
| `/services/[slug]` | Threading, brows, lashes, nails and waxing |
| `/our-work` | Portfolio with filters and image viewer |
| `/the-studio` | The space and approach |
| `/visit` | Address, hours and contact |
| `/privacy` | Privacy information |

## Project structure

```
app/          Routes, metadata, sitemap and robots
components/   layout, home, services, gallery, visit, ui, motion
content/      Business details, services, media manifest and gallery
lib/          Booking links, opening hours, metadata, structured data
styles/       Design tokens and global styles
public/       Images
scripts/      Content check and screenshot capture
tests/        Playwright tests
```

## Editing content

All business content lives in `content/`. No component changes are needed to update it.

- **Business details** (`content/business.ts`): address, hours, phone, email and social links.
- **Services and prices** (`content/services.ts`).
- **Images** (`content/media.ts`): each entry records its source, alt text and crop.
- **Online booking:** set `bookingUrl` in `content/business.ts` and every Book button uses it. Until then, booking falls back to the phone number.

Each fact is marked `verified` or `placeholder`, so `npm run check:content` always shows what still needs confirming.

## Accessibility and motion

- Motion uses GSAP with native scrolling.
- With reduced motion enabled, the full site displays without animation, and every page also works without JavaScript.
- The end-to-end suite checks for:
  - console errors and broken images
  - horizontal overflow at six widths
  - keyboard access to the menu and image viewer
  - content left hidden after an animation
  - an automated accessibility scan
