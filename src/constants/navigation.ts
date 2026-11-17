export const primaryNav = [
  { href: "/about", labelKey: "about" as const },
  { href: "/members", labelKey: "members" as const },
  { href: "/notices", labelKey: "notices" as const },
  { href: "/events", labelKey: "events" as const },
  { href: "/gallery", labelKey: "gallery" as const },
  { href: "/blog", labelKey: "blog" as const },
] as const;

export const moreNav = [
  { href: "/contact", labelKey: "contact" as const },
  { href: "/register", labelKey: "membership" as const },
  { href: "/dashboard", labelKey: "dashboard" as const },
  { href: "/about", labelKey: "officeBearers" as const },
] as const;

/** Used in footer quick links */
export const publicNav = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/members", label: "Members" },
  { href: "/notices", label: "Notices" },
  { href: "/events", label: "Events" },
  { href: "/gallery", label: "Gallery" },
  { href: "/blog", label: "Blog" },
  { href: "/contact", label: "Contact" },
] as const;
