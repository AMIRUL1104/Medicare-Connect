import Link from "next/link";

/**
 * Single source of truth for nav links.
 * Used by Navbar (desktop + mobile) and Footer.
 */
export const NAV_LINKS = [
  { label: "Home", href: "/" },
  { label: "Find Doctors", href: "/doctors" },
  { label: "About", href: "/about" },
  { label: "Contact", href: "/contact" },
];

/**
 * Reusable links list.
 *
 * @param {string} activeHref - current pathname, to highlight active link
 * @param {string} direction - "row" | "col"
 * @param {function} onLinkClick - optional, e.g. close mobile menu on click
 * @param {string} linkClassName - override default link styling
 */
export default function NavLinks({
  activeHref = "",
  direction = "row",
  onLinkClick,
  linkClassName,
}) {
  return (
    <ul
      className={
        direction === "row"
          ? "flex items-center gap-7"
          : "flex flex-col gap-1"
      }
    >
      {NAV_LINKS.map((link) => {
        const isActive = activeHref === link.href;
        return (
          <li key={link.href}>
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={
                linkClassName ||
                [
                  "text-sm font-medium transition-colors duration-200",
                  direction === "col" ? "block py-2.5 px-1" : "",
                  isActive
                    ? "text-[#0EA5E9]"
                    : "text-[#1E293B] hover:text-[#0EA5E9]",
                ].join(" ")
              }
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
