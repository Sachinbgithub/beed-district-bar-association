export const siteConfig = {
  name: "Beed District Bar Association",
  shortName: "BDBA",
  tagline: "Upholding the dignity of the legal profession",
  description:
    "The representative body of advocates practising at the District Court, Beed — working for member welfare, professional standards and access to justice.",
  established: 1952,
  locale: "en-IN",
  address: {
    line1: "Bar Association Building, District Court Campus",
    line2: "Beed, Maharashtra 431122",
    state: "Maharashtra",
    country: "India",
  },
  phone: "02422 000 000",
  phoneAlt: "+91 98765 43122",
  email: "office@bdba.in",
  officeHours: [
    { days: "Court working days", hours: "10:30 AM – 5:30 PM" },
    { days: "Saturday", hours: "10:30 AM – 1:30 PM" },
    { days: "Sunday & Court Holidays", hours: "Closed" },
  ],
  usefulLinks: [
    { label: "Supreme Court of India", href: "https://www.sci.gov.in/" },
    { label: "Bombay High Court", href: "https://bombayhighcourt.nic.in/" },
    { label: "eCourts Services", href: "https://ecourts.gov.in/" },
    { label: "Bar Council of India", href: "https://www.barcouncilofindia.org/" },
  ],
} as const;
