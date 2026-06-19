# MediCare Connect – Navbar System

## Folder Structure

```
components/
  Shared/
    Logo.jsx           ← reusable logo (Navbar + Footer)
    NavLinks.jsx        ← reusable links list + NAV_LINKS config (Navbar + Footer)
  Navbar/
    Navbar.jsx           ← Server Component — fetches session, entry point
    NavbarShell.jsx     ← "use client" — sticky/scroll, layout, logged-in/out states
    UserMenu.jsx        ← "use client" — desktop avatar dropdown
    MobileMenu.jsx      ← "use client" — hamburger + slide-in panel
  Footer.jsx             ← reuses Logo + NavLinks
```

## How it connects

```
Navbar.jsx (server)
  → getUserSession()
  → passes `user` prop down
  → NavbarShell.jsx (client)
      → Logo
      → NavLinks (desktop, row)
      → UserMenu (if logged in)
      → MobileMenu (always, hidden on lg:)
          → Logo
          → NavLinks (mobile, col)
```

## Usage

In your root layout:

```jsx
import Navbar from "@/components/Navbar/Navbar";
import Footer from "@/components/Footer";

export default function RootLayout({ children }) {
  return (
    <html lang="en">
      <body>
        <Navbar />
        {children}
        <Footer />
      </body>
    </html>
  );
}
```

## Editing nav links

Only edit `components/Shared/NavLinks.jsx` → `NAV_LINKS` array.
Both Navbar and Footer pick it up automatically.

```js
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];
```

## Active link highlighting

`NavLinks` accepts an `activeHref` prop. To highlight the current page, pass the pathname:

```jsx
"use client";
import { usePathname } from "next/navigation";
import NavLinks from "@/components/Shared/NavLinks";

const pathname = usePathname();
<NavLinks activeHref={pathname} />
```

(Not wired in by default since `Navbar.jsx` is a Server Component — add a small client wrapper if you want this.)

## getUserSession() expected shape

```js
{
  name: "Sarah Johnson",
  email: "sarah@hospital.com",
  photoUrl: "https://i.ibb.co/xxxxx/photo.jpg", // optional
}
```
Return `null` when not logged in.

## Notes
- No TypeScript, no Zod — plain JS/JSX only
- HeroUI not used here (plain Tailwind) since this is structural/behavioral, not a form — swap in HeroUI's `Avatar`/`Dropdown` in `UserMenu.jsx` if you prefer
- Logo SVG colors match the brand palette (`#0EA5E9`, `#0284C7`, `#1E293B`)
