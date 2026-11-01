'use client';

import { useEffect, useState } from 'react';
import type { OpeningHours } from '@/content/types';
import { formatRange } from '@/lib/hours';

/** Server-rendered table; after hydration, today's row (in the studio's timezone) is marked. */
export function HoursTable({ hours, timezone, className }: { hours: OpeningHours[]; timezone: string; className?: string }) {
  const [today, setToday] = useState<string | null>(null);

  useEffect(() => {
    setToday(new Intl.DateTimeFormat('en-US', { weekday: 'long', timeZone: timezone }).format(new Date()));
  }, [timezone]);

  return (
    <table className={className}>
      <caption className="visually-hidden">Opening hours</caption>
      <tbody>
        {hours.map((h) => (
          <tr key={h.day} aria-current={today === h.day ? 'date' : undefined}>
            <th scope="row">
              {h.day}
              {today === h.day && <span className="label"> · Today</span>}
            </th>
            <td>{formatRange(h)}</td>
          </tr>
        ))}
      </tbody>
    </table>
  );
}
