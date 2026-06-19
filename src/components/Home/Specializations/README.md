# MediCare Connect – Medical Specializations Section

## Folder Structure

```
components/
  home/
    SpecializationsSection.jsx   ← Server Component — all 10 cards, static
    FadeIn.jsx                    ← "use client" — ONLY client file, generic motion wrapper

app/
  page.example.jsx                ← shows how to add it to the homepage
```

**Only 1 file uses `"use client"`.** The section itself, all 10 cards,
icons, links, and hover states are fully server-rendered.

## Install

```bash
npm install framer-motion
```

(Skip if already installed from the About page work.)

## Responsive grid

```
grid-cols-2        → mobile
sm:grid-cols-3      → tablet
lg:grid-cols-5      → desktop (5 columns × 2 rows = clean 10-card layout)
```

If you'd prefer 4 or 6 columns on desktop instead of 5, just change
`lg:grid-cols-5` to `lg:grid-cols-4` or `lg:grid-cols-6` in
`SpecializationsSection.jsx`.

## Specializations included

Cardiology, Neurology, Orthopedics, Pediatrics, Dermatology, Gynecology,
Ophthalmology, Dentistry, Psychiatry, General Medicine — each with a
custom inline SVG icon (no icon library dependency), name, and one-line
description.

## Why only FadeIn is a Client Component

Framer Motion's `whileInView` requires browser APIs (IntersectionObserver
under the hood), so it can't run in a Server Component. The trick: `FadeIn`
wraps server-rendered `children` — the cards' markup, icons, and text are
still static HTML sent from the server. Only the tiny wrapper's animation
logic ships as client JS.

```jsx
// SpecializationsSection.jsx — Server Component
<FadeIn direction="up" delay={0.1}>
  <ul className="grid ...">
    {SPECIALIZATIONS.map(spec => <li key={spec.name}>...</li>)}
  </ul>
</FadeIn>
```

The whole grid fades/slides in together once, when scrolled into view —
matching your "simple section entrance animation only" requirement. No
language-icon-by-icon stagger, no per-card client components.

## Hover effects (pure CSS, no JS)

- Card: border color shift, shadow, lift (`-translate-y-1`)
- Icon badge: background flips from light blue to solid blue, icon turns white
- Focus: visible ring (`focus-visible:ring-2`) for keyboard navigation

## Accessibility

- Section wrapped in `<section aria-labelledby="specializations-heading">`
- Heading has matching `id` for the label reference
- Cards are real `<Link>` elements inside a semantic `<ul role="list">` —
  screen readers announce them as a list of navigable items
- Icons are `aria-hidden="true"` since the text label already conveys meaning
- Focus states visible for keyboard-only navigation

## Linking to doctor search

Each card links to `/doctors?specialization=<slug>` — update the query
param structure in the `SPECIALIZATIONS` array if your `/doctors` page
uses a different filter scheme (e.g. `/doctors/cardiology` as a path
segment instead).
