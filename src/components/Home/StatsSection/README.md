# MediCare Connect – Platform Statistics Section

## Folder Structure

```
components/
  home/
    StatsSection.jsx     ← async Server Component — fetches data, renders cards
    FadeIn.jsx           ← "use client" — generic motion wrapper (section + card reveal)
    StatCounter.jsx       ← "use client" — react-countup number (tiny client island)

lib/
  getPlatformStats.js    ← mock data fetcher — swap for real DB query later

app/
  page.example.jsx        ← shows how to add it to the homepage
```

**Only 2 of 4 files use `"use client"`** — and both are small, generic,
reusable wrappers. `StatsSection.jsx` itself is a Server Component (in
fact an **async** Server Component, since it fetches data).

## Install

```bash
npm install framer-motion react-countup
```

## Data fetching — currently mocked, ready for real DB later

```js
// lib/getPlatformStats.js
export async function getPlatformStats() {
  await new Promise((r) => setTimeout(r, 50)); // simulated latency
  return {
    totalDoctors: 2400,
    totalPatients: 50000,
    totalAppointments: 120000,
    totalReviews: 18500,
  };
}
```

Called directly inside the Server Component:

```jsx
// StatsSection.jsx
export default async function StatsSection() {
  const stats = await getPlatformStats(); // runs on the server, no client fetch
  // ...
}
```

When you're ready to connect a real database, just replace the body of
`getPlatformStats()` — the shape `{ totalDoctors, totalPatients, totalAppointments, totalReviews }`
should stay the same so `StatsSection.jsx` needs zero changes. Example with Prisma:

```js
import { db } from "@/lib/db";

export async function getPlatformStats() {
  const [totalDoctors, totalPatients, totalAppointments, totalReviews] = await Promise.all([
    db.user.count({ where: { role: "doctor" } }),
    db.user.count({ where: { role: "patient" } }),
    db.appointment.count(),
    db.review.count(),
  ]);
  return { totalDoctors, totalPatients, totalAppointments, totalReviews };
}
```

## Why only 2 client files

| Need | Why it requires the browser | Solution |
|---|---|---|
| Section/card entrance animation | `whileInView` needs IntersectionObserver | `FadeIn.jsx` — generic wrapper, reused 5× in this section alone |
| Count-up number animation | `react-countup` needs `requestAnimationFrame` | `StatCounter.jsx` — tiny wrapper, renders just the number |

Everything else — card layout, icons, labels, hover states, the async
data fetch itself — runs on the server with zero client JS.

```jsx
// StatsSection.jsx — Server Component, async
<FadeIn direction="up" delay={i * 0.1}>
  <div className="bg-white ...">          {/* server-rendered card shell */}
    <StatCounter value={card.value} suffix={card.suffix} />  {/* client island */}
    <p>{card.label}</p>                    {/* server-rendered text */}
  </div>
</FadeIn>
```

## Responsive grid

```
grid-cols-2     → mobile (2 columns)
lg:grid-cols-4  → desktop (4 columns)
```

## Animation behavior

- **Heading**: fades up once, on scroll into view
- **Cards**: each fades up with a staggered delay (`i * 0.1`s) — first card animates immediately, each next one slightly after
- **Counter**: `enableScrollSpy` + `scrollSpyOnce` means the number counts up only once, exactly when it scrolls into view (no replay on re-scroll)

## Hover effects (pure CSS)

- Card lifts (`-translate-y-1`), border turns blue-tinted, soft shadow appears
- No JS needed for hover — handled by Tailwind `hover:` classes

## Accessibility

- `<section aria-labelledby="stats-heading">` + matching heading `id`
- Cards in a semantic `<ul role="list">`
- Icons marked `aria-hidden="true"` (decorative; label text carries meaning)
- Color contrast follows the design system (`#1E293B` text on white cards)
- Animations are subtle entrance-only; no flashing or auto-looping motion
