import { Link } from 'react-router-dom';
import {
  GraduationCap,
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
import { programs } from '@/data/programs';

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

const socialIcons = [
  { name: 'Facebook', icon: Facebook, url: siteConfig.social.facebook },
  { name: 'Instagram', icon: Instagram, url: siteConfig.social.instagram },
  { name: 'LinkedIn', icon: Linkedin, url: siteConfig.social.linkedin },
  { name: 'YouTube', icon: Youtube, url: siteConfig.social.youtube },
  { name: 'Twitter', icon: Twitter, url: siteConfig.social.twitter },
];

export default function Footer() {
  return (
    <footer className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900">
      {/* Decorative top border */}
      <div className="h-1 bg-gradient-to-r from-gold via-gold-100 to-gold" />

      {/* Decorative circles */}
      <div className="pointer-events-none absolute -left-20 -bottom-20 h-64 w-64 rounded-full bg-gold/5" />
      <div className="pointer-events-none absolute right-10 top-10 h-40 w-40 rounded-full bg-gold/5" />

      <div className="relative mx-auto max-w-7xl px-5 py-16 sm:px-8 lg:px-12">
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
    <p className="font-serif text-xl font-bold text-ivory">
      ST. Lourdes
    </p>

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
              {programs.map((p) => (
                <li key={p.id}>
                  <Link
                    to={`/programs#${p.slug}`}
                    className="text-sm text-ivory/60 transition-colors hover:text-gold-100 hover:pl-1"
                  >
                    {p.shortName}
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
                  {siteConfig.address.line1}<br />
                  {siteConfig.address.line2}<br />
                  {siteConfig.address.line3}<br />
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
        <div className="mt-10 flex items-center gap-3 border-t border-gold/10 pt-6">
          <span className="text-xs uppercase tracking-widest text-ivory/40">Follow Us</span>
          <div className="flex gap-2">
            {socialIcons.map(({ name, icon: Icon, url }) =>
              url ? (
                <a
                  key={name}
                  href={url}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={name}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-gold/30 text-gold/70 transition-all duration-300 hover:border-gold hover:bg-gold hover:text-maroon-700"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </a>
              ) : (
                <span
                  key={name}
                  aria-label={`${name} (link not configured)`}
                  className="flex h-9 w-9 items-center justify-center rounded-full border border-ivory/10 text-ivory/20"
                  title="Link not configured"
                >
                  <Icon className="h-4 w-4" strokeWidth={1.5} />
                </span>
              )
            )}
          </div>
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
