export const primaryNav = [
  { href: "/about", label: "About Us" },
  { href: "/members", label: "Members" },
  { href: "/notices", label: "Notices" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
] as const;

export const moreNav = [
  { href: "/contact", label: "Contact" },
  { href: "/register", label: "Membership" },
  { href: "/dashboard", label: "Dashboard" },
  { href: "/about", label: "Office Bearers" },
] as const;

/** Used in footer quick links */
export const publicNav = [
  { href: "/", label: "Home" },
  ...primaryNav,
  { href: "/contact", label: "Contact" },
] as const;
