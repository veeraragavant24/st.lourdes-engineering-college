import { Link } from 'react-router-dom';
import {
  MapPin,
  Mail,
  Phone,
  Facebook,
  Instagram,
  Linkedin,
  Youtube,
  Twitter,
  ArrowRight,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import type { CSSProperties } from 'react';
const quickLinks = [
  { label: 'Home', to: '/' },
  { label: 'About ST. Lourdes', to: '/about' },
  { label: 'Madha Groups', to: '/about#madha' },
  { label: 'Management Team', to: '/about#administration' },
  { label: 'Placement', to: '/placement' },
  { label: 'Admission', to: '/admission' },
  { label: 'Facilities', to: '/gallery#facilities' },
  { label: 'Contact Us', to: '/contact' },
];

// Slugs must match the `slug` values added to the departments array on the Departments page.
const departmentLinks = [
  { label: 'B.E. CSE', slug: 'be-cse' },
  { label: 'B.E. CSE (Cyber Security)', slug: 'be-cse-cyber-security' },
  { label: 'B.Tech. AI & DS', slug: 'btech-aids' },
  { label: 'B.Tech. IT', slug: 'btech-it' },
  { label: 'B.E. ECE', slug: 'be-ece' },
  { label: 'MBA', slug: 'mba' },
  { label: 'M.E. CSE', slug: 'me-cse' },
];

const socialIcons = [
  { name: 'Facebook', icon: Facebook, url: siteConfig.social.facebook, color: '#3b5998', dark: '#365492', light: '#4a69ad' },
  { name: 'Instagram', icon: Instagram, url: siteConfig.social.instagram, color: '#e4405f', dark: '#d81c3f', light: '#e46880' },
  { name: 'LinkedIn', icon: Linkedin, url: siteConfig.social.linkedin, color: '#0077b5', dark: '#005a8c', light: '#3399cc' },
  { name: 'YouTube', icon: Youtube, url: siteConfig.social.youtube, color: '#ff0000', dark: '#cc0000', light: '#ff4d4d' },
  { name: 'Twitter', icon: Twitter, url: siteConfig.social.twitter, color: '#00aced', dark: '#097aa5', light: '#53b9e0' },
];
const socialCss = `
  .ft-social-list {
    display: flex;
    flex-wrap: wrap;
    gap: 14px;
    margin: 0;
    padding: 0;
    list-style: none;
  }

  .ft-tile {
    display: flex;
    align-items: center;
    justify-content: center;
    width: 42px;
    height: 42px;
    border-radius: 50%;
    background: #fff8ee;
    color: #5a0f20;
    text-decoration: none;
    /* gold edge (3D side) + soft shadow */
    box-shadow: -3px 3px 0 #b8923a, -6px 8px 10px rgba(0, 0, 0, 0.35);
    transition: transform 0.35s ease, background 0.35s ease,
                color 0.35s ease, box-shadow 0.35s ease;
  }

  .ft-tile-icon {
    width: 18px;
    height: 18px;
  }

  /* hover / keyboard focus: lift and turn into the brand colour */
  .ft-tile:hover,
  .ft-tile:focus-visible {
    background: var(--c);
    color: #ffffff;
    transform: translate(4px, -4px);
    box-shadow: -5px 5px 0 var(--cd), -10px 14px 16px rgba(0, 0, 0, 0.45);
    outline: none;
  }

  /* link not configured */
  .ft-tile--off {
    opacity: 0.35;
    pointer-events: none;
  }

  @media (prefers-reduced-motion: reduce) {
    .ft-tile { transition: none; }
  }
`;

export default function Footer() {
  return (
       <footer className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900">
      <style>{socialCss}</style>

      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold-100 to-gold" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gold/5" />
      <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-gold/5" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
        <div className="grid gap-10 md:grid-cols-2 lg:grid-cols-4">
          {/* About */}
          <div>
            <div className="flex items-center gap-4">
              <img
                src="/logos/logo.png"
                alt="St. Lourdes Engineering College Logo"
                className="h-20 w-20 shrink-0 object-contain"
              />

              <div className="flex flex-col">
                <p className="font-serif text-xl font-bold text-ivory">ST. Lourdes</p>

                <p className="font-sans text-xs font-semibold uppercase tracking-[0.15em] text-gold-100">
                  Engineering College
                </p>
              </div>
            </div>
            <p className="mt-4 text-sm leading-relaxed text-ivory/60">
              A pioneering engineering institution in Chennai, committed to quality education,
              innovation, and industry-relevant skills since {siteConfig.established}.
            </p>
            <Link
              to="/about"
              className="mt-4 inline-flex items-center gap-1.5 text-sm font-medium text-gold-100 transition-colors hover:text-gold"
            >
              Read More <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Quick Links */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-100">Quick Links</h3>
            <div className="mt-4 h-px w-12 bg-gold/40" />
            <ul className="mt-4 space-y-2.5">
              {quickLinks.map((link) => (
                <li key={link.label}>
                  <Link
                    to={link.to}
                    className="text-sm text-ivory/60 transition-colors hover:text-gold-100 hover:pl-1"
                  >
                    {link.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Departments */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-100">Departments</h3>
            <div className="mt-4 h-px w-12 bg-gold/40" />
            <ul className="mt-4 space-y-2.5">
              {departmentLinks.map((d) => (
                <li key={d.slug}>
                  <Link
                    // Opens the Departments page with this department pre-selected
                    to={`/departments?dept=${d.slug}`}
                    className="text-sm text-ivory/60 transition-colors hover:text-gold-100 hover:pl-1"
                  >
                    {d.label}
                  </Link>
                </li>
              ))}
            </ul>
          </div>

          {/* Contact */}
          <div>
            <h3 className="font-serif text-lg font-semibold text-gold-100">Contact Information</h3>
            <div className="mt-4 h-px w-12 bg-gold/40" />
            <div className="mt-4 space-y-4">
              <div className="flex gap-3">
                <MapPin className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <p className="text-sm leading-relaxed text-ivory/60">
                  {siteConfig.address.line1}
                  <br />
                  {siteConfig.address.line2}
                  <br />
                  {siteConfig.address.line3}
                  <br />
                  {siteConfig.address.line4}
                </p>
              </div>
              <div className="flex gap-3">
                <Mail className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <a
                  href={`mailto:${siteConfig.emails[0]}`}
                  className="text-sm text-ivory/60 transition-colors hover:text-gold-100"
                >
                  {siteConfig.emails[0]}
                </a>
              </div>
              <div className="flex gap-3">
                <Phone className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                <div className="space-y-1">
                  {siteConfig.phones.map((phone) => (
                    <a
                      key={phone}
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="block text-sm text-ivory/60 transition-colors hover:text-gold-100"
                    >
                      {phone}
                    </a>
                  ))}
                </div>
              </div>
            </div>
          </div>
        </div>

                      {/* Social icons */}
        <div className="mt-10 flex flex-wrap items-center gap-6 border-t border-gold/10 py-6">
          <span className="text-xs uppercase tracking-widest text-ivory/40">Follow Us</span>

          <ul className="ft-social-list">
            {socialIcons.map(({ name, icon: Icon, url, color, dark }) => {
              const vars = { '--c': color, '--cd': dark } as CSSProperties;
              return (
                <li key={name} style={vars}>
                  {url ? (
                    <a
                      href={url}
                      target="_blank"
                      rel="noopener noreferrer"
                      aria-label={name}
                      className="ft-tile"
                    >
                      <Icon className="ft-tile-icon" strokeWidth={1.5} />
                    </a>
                  ) : (
                    <span aria-label={`${name} (link not configured)`} className="ft-tile ft-tile--off">
                      <Icon className="ft-tile-icon" strokeWidth={1.5} />
                    </span>
                  )}
                </li>
              );
            })}
          </ul>
        </div>

        {/* Copyright */}
        <div className="mt-8 border-t border-gold/10 pt-6 text-center">
          <p className="text-sm text-ivory/50">
            &copy; {siteConfig.year} {siteConfig.name}. All Rights Reserved.
          </p>
        </div>
      </div>
    </footer>
  );
}