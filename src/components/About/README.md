# MediCare Connect – About Page (Server Component Refactor)

## What changed

| Before | After |
|---|---|
| 7 sections, all `"use client"` | Only 2 client files in the whole tree: `FadeIn.jsx` and `Counter.jsx` |
| Every section shipped Framer Motion JS | Only Hero, Stats, and CTA use `FadeIn` |
| Animations baked into each section | `FadeIn` is a generic wrapper, reused 3 places |

## Folder Structure

```
app/
  about/
    page.jsx                    ← Server Component (no "use client")

components/
  about/
    FadeIn.jsx                  ← "use client" — generic Framer Motion wrapper
    Counter.jsx                 ← "use client" — count-up number (used only in StatsSection)
    HeroSection.jsx             ← Server Component, wraps text in <FadeIn>
    MissionSection.jsx          ← Server Component, NO animation
    HowItWorksSection.jsx       ← Server Component, NO animation
    StatsSection.jsx            ← Server Component, wraps cards in <FadeIn>, numbers in <Counter>
    WhyChooseUsSection.jsx      ← Server Component, NO animation
    ValuesSection.jsx           ← Server Component, NO animation
    CTASection.jsx              ← Server Component, wraps banner in <FadeIn>
```

**Only 2 of 9 files in `components/about/` have `"use client"`.**
The other 7 are pure Server Components — zero JS shipped for their markup.

## Why this works

Server Components can render Client Components as children. The trick used here:

```jsx
// HeroSection.jsx — Server Component
import FadeIn from "@/components/about/FadeIn";

export default function HeroSection() {
  return (
    <FadeIn direction="up" viewport={false}>
      <h1>Transforming Healthcare Through Technology</h1>
    </FadeIn>
  );
}
```

`<h1>` and its text are rendered on the server and sent as static HTML inside
`children`. The client bundle for `FadeIn` only contains the wrapper's own
logic (`motion.div` + transition config) — not the page content.

## FadeIn.jsx — the reusable wrapper

```jsx
"use client";
import { motion } from "framer-motion";

export default function FadeIn({
  children,
  direction = "up",
  delay = 0,
  duration = 0.5,
  once = true,
  viewport = true,
  className = "",
}) {
  const offset = 16;
  const initialOffset = {
    up: { y: offset }, down: { y: -offset },
    left: { x: offset }, right: { x: -offset }, none: {},
  }[direction];

  const initial = { opacity: 0, ...initialOffset };
  const animateTarget = { opacity: 1, x: 0, y: 0 };

  const motionProps = viewport
    ? { initial, whileInView: animateTarget, viewport: { once, margin: "-60px" } }
    : { initial, animate: animateTarget }; // for hero: animate immediately on mount

  return (
    <motion.div {...motionProps} transition={{ duration, delay, ease: "easeOut" }} className={className}>
      {children}
    </motion.div>
  );
}
```

**Usage modes:**
- `viewport={false}` → animates immediately on mount (Hero — visible on load, no scroll needed)
- `viewport={true}` (default) → animates when scrolled into view (Stats, CTA — below the fold)

## Where animation is used (and where it isn't)

| Section | Animated? | How |
|---|---|---|
| HeroSection | ✅ Yes | `<FadeIn viewport={false}>` around badge/heading/text/buttons, staggered with `delay` |
| MissionSection | ❌ No | Plain Server Component |
| HowItWorksSection | ❌ No | Plain Server Component |
| StatsSection | ✅ Yes | `<FadeIn>` around heading + each stat card, `<Counter>` for count-up numbers |
| WhyChooseUsSection | ❌ No | Plain Server Component |
| ValuesSection | ❌ No | Plain Server Component |
| CTASection | ✅ Yes | `<FadeIn>` around the whole banner |

Hover/focus states everywhere else are handled with plain Tailwind
(`hover:`, `focus-visible:`) — zero JS required.

## Counter.jsx — isolated client island

Count-up numbers need `requestAnimationFrame`-driven state, which requires
the browser — there's no way to server-render this. So it's split into its
own tiny client file, imported only by `StatsSection.jsx`:

```jsx
"use client";
import { useInView, useMotionValue, useSpring } from "framer-motion";
// ...
```

This keeps the "client surface area" to exactly what's needed — one number
component — instead of making the whole `StatsSection` a client component.

## Install

```bash
npm install framer-motion
```

No Zod, no TypeScript — plain `.jsx` throughout, matching your existing stack.

## HeroUI note

The sections here use plain Tailwind cards/buttons rather than HeroUI
components, since none of the interactions (hover/focus on a static card)
require HeroUI's behavior layer (focus trapping, ARIA roles for compound
widgets, etc.) — adding HeroUI here would mean importing component logic
for something a `<div>` + Tailwind class already does, working against the
"minimize client JS" goal. If you'd like, the CTA buttons can be swapped for
HeroUI's `Button` component with no architectural changes — they're already
isolated and would still render fine inside a Server Component since HeroUI
buttons don't require client-side state for a static link/button.
