# MediCare Connect – Hero Banner Section

## Folder Structure

```
components/
  home/
    HeroSection.jsx        ← Server Component — composes everything, animate.css classes
    HeroIllustration.jsx   ← Server Component — custom SVG (doctor + patient)
    TrustFeatures.jsx      ← Server Component — verified doctors / secure payments / digital Rx
    HeroCTAButtons.jsx     ← "use client" — ONLY client component (uses useRouter)

app/
  layout.example.jsx       ← shows where to import "animate.css"
  page.example.jsx         ← shows how to use HeroSection on the homepage
```

**Only 1 of 4 files is a Client Component.** Headline, description, badges,
and the illustration are all server-rendered static HTML — animate.css
classes work directly on them with zero JS.

## Install

```bash
npm install animate.css
```

Import once, globally, in your root layout:

```jsx
// app/layout.jsx
import "animate.css";
```

## Why only CTAButtons is a Client Component

`HeroCTAButtons.jsx` uses `useRouter()` from `next/navigation` for
programmatic navigation on click — that hook only works in the browser,
so it requires `"use client"`. Everything else (headline, illustration,
trust badges) is static markup with CSS animation classes — no
interactivity, no client JS needed.

If you'd rather use plain `<Link>` tags instead of `router.push()`, the
buttons could become Server Components too — happy to swap if you don't
need the click handler logic.

## Animate.css usage

Applied directly as Tailwind-style classes on server-rendered elements:

```jsx
// Trust badge — fades in from top
<span className="animate__animated animate__fadeInDown">...</span>

// Headline — fades in from bottom, after badge
<h1 className="animate__animated animate__fadeInUp animate__delay-1s">...</h1>

// Illustration — simple fade in, slightly delayed
<div className="animate__animated animate__fadeIn animate__delay-1s">...</div>

// Floating stat chip — fades up last
<div className="animate__animated animate__fadeInUp animate__delay-2s">...</div>
```

Per your requirement, animation is scoped to exactly:
- **Headline** (`fadeInUp`)
- **CTA buttons** (`fadeInUp`, inside the client component)
- **Illustration** (`fadeIn`)

The trust badge and floating stat chip use animate.css too for visual
polish, but feel free to remove those classes if you want animation
limited strictly to the three required elements.

## Layout behavior

- **Desktop (`lg:` and up)**: 2-column grid — content left, illustration right
- **Mobile**: single column, illustration shown first (`order-1`), content below (`order-2`) — so the visual hook appears before the text on small screens
- Trust features wrap responsively (`flex-wrap`)

## Customizing the illustration

`HeroIllustration.jsx` is hand-built SVG (no external image, no stock
photo). To adjust colors, edit the `<linearGradient>` stops at the top of
the file — they already use your palette (`#0EA5E9`, `#10B981`, `#1E293B`).

## SEO notes

- Headline is a real `<h1>`, server-rendered — fully crawlable
- Illustration SVG has `role="img"` + descriptive `aria-label`
- No client-side rendering delay for any visible text content
- `metadata` export in `layout.example.jsx` for page-level SEO tags
