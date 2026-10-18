// Single source of truth for site-wide info used in the header, footer, meta
// tags, and JSON-LD. Fields marked TODO are placeholders until confirmed.

export const site = {
  name: "Daily Present Living",
  tagline: "Sharing encouragement, empowerment, and expectance through faith in God.",
  description:
    "A Christian blog of faith, story, and everyday grace — reflections on living present with God each day.",

  domain: "dailypresentliving.com",
  url: "https://dailypresentliving.com",

  // TODO: author's name as she'd like it shown on the site
  authorName: "TODO Author Name",
} as const;

export const navLinks = [
  { href: "/", label: "Home" },
  { href: "/blog", label: "Blog" },
  { href: "/about", label: "My Story" },
  { href: "/contact", label: "Contact" },
] as const;
