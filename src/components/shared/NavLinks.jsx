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
 * @param {boolean} isDashboardMode - optional, dynamically sets base color for dark/light themes
 * @param {function} onLinkClick - optional, e.g. close mobile menu on click
 * @param {string} linkClassName - override default link styling
 */
export default function NavLinks({
  activeHref = "/",
  direction = "row",
  isDashboardMode = false, // থিম ডিটেকশনের জন্য নতুন প্রপ
  onLinkClick,
  linkClassName = "",
}) {
  return (
    <ul
      className={
        direction === "row" ? "flex items-center gap-7" : "flex flex-col gap-1"
      }
    >
      {NAV_LINKS.map((link) => {
        const isActive = activeHref === link.href;
        const baseColor = isDashboardMode ? "text-gray-400" : "text-[#1E293B]";

        return (
          <li key={link.href} className="w-full">
            <Link
              href={link.href}
              onClick={onLinkClick}
              className={`text-sm font-medium transition-colors duration-200 whitespace-nowrap ${
                direction === "col" ? "block py-3 px-2 rounded-md" : ""
              } ${
                isActive
                  ? "text-[#0EA5E9] font-semibold bg-[#0EA5E9]/10"
                  : `${baseColor} hover:text-[#0EA5E9] hover:bg-gray-50/10`
              } ${linkClassName}`}
            >
              {link.label}
            </Link>
          </li>
        );
      })}
    </ul>
  );
}
