import type { OpeningHours } from '@/content/types';

export function formatTime(t: string) {
  const [hStr, m] = t.split(':');
  const h = Number(hStr);
  const suffix = h >= 12 ? 'pm' : 'am';
  const h12 = h % 12 === 0 ? 12 : h % 12;
  return m === '00' ? `${h12}${suffix}` : `${h12}:${m}${suffix}`;
}

export function formatRange(h: OpeningHours) {
  if (!h.opens || !h.closes) return 'Closed';
  return `${formatTime(h.opens)} – ${formatTime(h.closes)}`;
}

/** Collapse consecutive days with identical hours: "Mon – Wed  10am – 7pm" */
export function groupHours(hours: OpeningHours[]) {
  const groups: { days: string; range: string }[] = [];
  let start = 0;
  for (let i = 1; i <= hours.length; i++) {
    const prev = hours[i - 1]!;
    const cur = hours[i];
    if (!cur || formatRange(cur) !== formatRange(prev)) {
      const first = hours[start]!.day.slice(0, 3);
      const last = prev.day.slice(0, 3);
      groups.push({ days: start === i - 1 ? first : `${first} – ${last}`, range: formatRange(prev) });
      start = i;
    }
  }
  return groups;
}
