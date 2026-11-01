# Content checklist — before launch

Everything below is a **development placeholder**. The site renders gracefully
when a fact is removed, so it is always safe to delete a placeholder rather than
leave it in. Run `npm run check:content` for the live list; `LAUNCH=1 npm run build`
refuses to build until every item is verified.

## Business facts — `content/business.ts`

| Fact | Current placeholder | Needed |
|---|---|---|
| Street address | "Studio address to be confirmed", Salt Lake City, UT | Full street address + ZIP |
| Opening hours | Mon–Wed 10–7, Thu–Fri 10–8, Sat 9–6, Sun 11–5 | Real hours, holiday closures |
| Telephone | ✓ Confirmed: (385) 313-7676 | — |
| Email | hello@browandlooks.com | Real inbox |
| Booking | ✓ By phone: every Book button calls (385) 313-7676 | Optional: an online booking provider URL switches every Book button to it |
| Directions | Google Maps search for "Salt Lake City" | Maps link to the studio |
| Domain | https://browandlooks.com | Confirmed domain (canonical URLs, sitemap, OG) |
| Social | Instagram, TikTok and Facebook icons link to each platform's homepage | The studio's profile URLs (hidden in launch builds until verified) |
| Testimonials | none — section hidden | Exact quotes with permission + source (e.g. Google review link) |

## Services — `content/services.ts`

- All prices and durations are typical Salt Lake City ranges used for layout only.
- Confirm the full service list. "Other" treatments (facials, henna, tinting, etc.) need adding.
- Preparation, aftercare and FAQ copy is general guidance and should be checked by the
  salon before publishing.
- Studio copy on `/the-studio` and the homepage (approach, "unhurried" appointments)
  describes an intended experience — confirm it matches how the salon actually works.

## Photography — `content/media.ts`

Every image is Unsplash-licensed stock, self-hosted and colour-graded warm
(`kind: 'placeholder'`, source recorded per image). **None shows Browandlooks
work or the real studio.** In a launch build the Our Work gallery shows only
`kind: 'authentic'` images, and the section hides itself if there are none.

### Shot list for the studio's own photography

Keep one look throughout: warm daylight or soft key light, ivory/parchment
backgrounds, natural skin texture (no heavy retouching), deep red/oxblood accents.

| Use | Ratio | Notes |
|---|---|---|
| Hero portrait | 2:3 portrait, ≥2400px wide | Close beauty crop, brows in the upper third, plain backdrop on the left of the frame — the thread is registered to the top edge and fades into the left brow |
| Hero nails | ~7:8 | Deep-red almond nails with gold jewellery on a warm, plain backdrop |
| Threading in progress | 2:3 portrait | Thread visible between fingers |
| Brows / Lashes / Nails / Waxing | 2:3 portrait each | One per category, consistent light |
| Studio wide | 3:2 landscape, ≥2400px | Treatment chair/bed, window light |
| Studio details ×3 | 3:4 | Shelving, products, mirror, candle |
| Portfolio | mix of 3:4, 1:1, 3:2 | At least 4 per category to enable filters; client consent recorded |

When replacing the hero portrait, re-check the thread: its coordinates in
`components/home/HeroEditorial.tsx` are in the portrait's pixel space.

## Fonts

Cormorant Garamond and Manrope (SIL Open Font License) are self-hosted via
`next/font`. If PP Editorial New is licensed, swap the display face in
`app/layout.tsx`.

## Legal

`/privacy` describes the site as built: no analytics, cookies or forms. Update
it if analytics, a booking embed or a contact form are added, and have it
reviewed before launch.
