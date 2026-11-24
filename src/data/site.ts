export const site = {
  name: "Blumark Industries",
  tagline: "Engineered for excellence · Built to last",
  phone: "+91 7304935736",
  phoneHref: "tel:+917304935736",
  email: "sales@blumarkindustries.in",
  emailHref: "mailto:sales@blumarkindustries.in",
  whatsapp: "https://wa.me/917304935736",
  hours: "Mon–Sat: 9am–6pm",
  serving: "Based in India | Serving PAN India",
  address: {
    line1: "1st Floor, D-104, Vrindavan CHS",
    line2: "Saibaba Nagar, Kandivli (W)",
    city: "Mumbai - 400101",
  },
  mapQuery: "Vrindavan CHS, Saibaba Nagar, Kandivli West, Mumbai 400101",
};

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/about", label: "About Us" },
  { href: "/services", label: "Products & Services" },
  { href: "/catalogue", label: "Catalogue" },
  { href: "/contact", label: "Contact" },
];

export function whatsappLink(text: string) {
  return `${site.whatsapp}?text=${encodeURIComponent(text)}`;
}
