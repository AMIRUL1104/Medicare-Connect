# MediCare Connect – Featured Doctors Section

## Folder Structure

```
components/
  home/
    FeaturedDoctorsSection.jsx   ← async Server Component — fetches + filters + renders grid
    DoctorCard.jsx                ← Server Component — static card markup
    getLimitedDoctors.js          ← mock data fetcher (swap for real DB query later)
    FadeIn.jsx                    ← "use client" — ONLY client file, generic motion wrapper

app/
  page.example.jsx                ← shows how to add it to the homepage
```

**Only 1 of 4 files uses `"use client"`.** The data fetch, filtering,
and all card markup run on the server.

## Install

```bash
npm install framer-motion
```

## Data flow

```js
// getLimitedDoctors.js — mock for now
export async function getLimitedDoctors() {
  await new Promise((r) => setTimeout(r, 30)); // simulated latency
  return [ /* doctor objects with verificationStatus field */ ];
}
```

```jsx
// FeaturedDoctorsSection.jsx — async Server Component
export default async function FeaturedDoctorsSection() {
  const doctors = await getLimitedDoctors();
  const verifiedDoctors = doctors
    .filter((doc) => doc.verificationStatus === "verified")
    .slice(0, 6);
  // ...
}
```

When you connect the real database, swap the body of `getLimitedDoctors()`
— keep the field names below the same and `FeaturedDoctorsSection.jsx`
and `DoctorCard.jsx` need zero changes:

```js
{
  id, doctorName, specialization, qualifications,
  experience, consultationFee, hospitalName,
  profileImage, availableDays, verificationStatus
}
```

## Why filtering happens in the section, not the query

The spec's example `getLimitedDoctors()` returns "6 doctors" generically —
in case the real implementation doesn't pre-filter by verification status,
`FeaturedDoctorsSection.jsx` filters defensively on the server:

```js
const verifiedDoctors = doctors
  .filter((doc) => doc.verificationStatus === "verified")
  .slice(0, 6);
```

If your real `getLimitedDoctors()` query already filters by
`verificationStatus: "verified"` at the DB level, this `.filter()` is a
no-op safety net — harmless to keep, or remove it if you'd rather trust
the query alone.

## Why only FadeIn is a Client Component

`whileInView` needs IntersectionObserver (browser-only), so `FadeIn` must
be a Client Component. But it just wraps `children` — the actual card
markup (image, name, specialization, fee, button) is server-rendered
JSX passed in as children:

```jsx
<FadeIn direction="up" delay={i * 0.08}>
  <DoctorCard doctor={doctor} />  {/* fully server-rendered */}
</FadeIn>
```

## Responsive grid

```
grid-cols-1        → mobile
sm:grid-cols-2      → tablet
lg:grid-cols-3      → desktop
```

## Animation

- Heading fades up once on scroll into view
- Each card fades up with a staggered delay (`i * 0.08`s)
- "View All Doctors" button fades up last

## Hover effects (pure CSS)

- Card: border tint, shadow, lift (`-translate-y-1`)
- Profile image: subtle zoom (`scale-105`) on hover
- CTA button: shadow + lift on hover, visible focus ring

## Accessibility

- `<section aria-labelledby="featured-doctors-heading">`
- Cards in semantic `<ul role="list">`
- Decorative icons marked `aria-hidden="true"`
- "View Profile" and "View All Doctors" are real `<Link>` elements —
  fully keyboard-navigable with visible focus rings
- Empty state handled gracefully if no verified doctors are returned
