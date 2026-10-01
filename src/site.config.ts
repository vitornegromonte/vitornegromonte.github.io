// Site identity lives in src/content/site.json (editable in the local admin
// panel). Header, Footer, the homepage and SEO defaults all read SITE from
// here; NAV_LINKS stays in code (add Blog here when the first post lands).
import siteData from './content/site.json';

export const SITE = siteData as {
  name: string;
  role: string;
  email: string;
  tagline: string;
  description: string;
  status: string;
  locale: 'en';
  social: { label: string; href: string }[];
};

const FALLBACK_NAV = [
  { label: 'About', href: '/about' },
  { label: 'Projects', href: '/projects' },
  { label: 'Publications', href: '/publications' },
  { label: 'Field Notes', href: '/notes' },
] as const;

export const NAV_LINKS: { label: string; href: string }[] =
  Array.isArray(siteData.nav) && siteData.nav.length > 0 ? siteData.nav : [...FALLBACK_NAV];
