import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, GraduationCap, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';

interface NavItem {
  label: string;
  to: string;
  children?: NavItem[];
}

const navItems: NavItem[] = [
  { label: 'Home', to: '/' },
  {
    label: 'About Us',
    to: '/about',
    children: [
      { label: 'About the College', to: '/about' },
      {
        label: 'Committees',
        to: '/about#committees',
        children: [
          {
            label: 'Grievance Redressal Committee',
            to: '/committees/grievance-redressal',
          },
          {
            label: 'Sexual Harassment Redressal Committee',
            to: '/committees/sexual-harassment',
          },
          {
            label: 'Anti Ragging Committee',
            to: '/committees/anti-ragging',
          },
          {
            label: 'Women Empowerment Cell',
            to: '/committees/women-empowerment',
          },
        ],
      },
      {
        label: 'Mandatory Disclosure',
        to: '/about#mandatory-disclosure',
      },
      { label: 'AICTE', to: '/about#aicte' },
    ],
  },
  {
    label: 'Administration',
    to: '/about#administration',
    children: [
      { label: 'Management', to: '/management' },
      { label: 'Principal', to: '/principal' },
      { label: 'Faculty', to: '/faculty' },
    ],
  },
  {
    label: 'Admission',
    to: '/admission',
    children: [
      { label: 'Admission Process', to: '/admission' },
      { label: 'Eligibility Criteria', to: '/admission#eligibility' },
      { label: 'TNEA Counselling', to: '/admission#tnea' },
      { label: 'Enquiry Form', to: '/admission#enquiry' },
    ],
  },
  { label: 'Academics', to: '/academics' },
  { label: 'Departments', to: '/departments' },
  {
    label: 'Campus Life',
    to: '/gallery',
    children: [
      { label: 'Gallery', to: '/gallery' },
      { label: 'Library', to: '/gallery#library' },
      { label: 'Hostel', to: '/gallery#hostel' },
      { label: 'Facilities', to: '/gallery#facilities' },
    ],
  },
  { label: 'Placement', to: '/placement' },
  { label: 'Contact Us', to: '/contact' },
];

export default function Header({
  onApplyClick,
}: {
  onApplyClick: () => void;
}) {
 
const [isDarkBackground, setIsDarkBackground] = useState(true);
const [mobileOpen, setMobileOpen] = useState(false);
const [openDropdown, setOpenDropdown] = useState<string | null>(null);
const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
const [searchOpen, setSearchOpen] = useState(false);


  const location = useLocation();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect whether the page background behind the transparent header is dark.
  useEffect(() => {
    let frame = 0;

    const detectBackground = () => {
      const header = document.querySelector<HTMLElement>(
        '[data-site-header]'
      );

      if (!header) return;

      const rect = header.getBoundingClientRect();
      const y = Math.max(1, Math.min(rect.bottom - 2, window.innerHeight - 1));

      const samplePoints = [
        window.innerWidth * 0.2,
        window.innerWidth * 0.5,
        window.innerWidth * 0.8,
      ];

      const luminances: number[] = [];

      for (const x of samplePoints) {
        const elements = document.elementsFromPoint(
          Math.max(1, Math.min(x, window.innerWidth - 1)),
          y
        );

        const target = elements.find(
          (element) =>
            !header.contains(element) &&
            !element.closest('[data-site-header]')
        );

        if (!target) continue;

        let current: Element | null = target;
        let luminance: number | null = null;

        while (current && current !== document.documentElement) {
          const theme = current.getAttribute('data-header-theme');

          if (theme === 'dark') {
            luminance = 0.1;
            break;
          }

          if (theme === 'light') {
            luminance = 0.9;
            break;
          }

          current = current.parentElement;
        }

        if (luminance === null) {
          current = target;

          while (current && current !== document.documentElement) {
            const style = window.getComputedStyle(current);
            const match = style.backgroundColor.match(/rgba?\(([^)]+)\)/i);

            if (match) {
              const values = match[1]
                .split(',')
                .map((value) => Number.parseFloat(value.trim()));

              if (
                values.length >= 3 &&
                values.slice(0, 3).every(Number.isFinite)
              ) {
                const alpha = values.length >= 4 ? values[3] : 1;

                if (alpha > 0.05) {
                  const [r, g, b] = values
                    .slice(0, 3)
                    .map((value) => value / 255)
                    .map((value) =>
                      value <= 0.04045
                        ? value / 12.92
                        : ((value + 0.055) / 1.055) ** 2.4
                    );

                  luminance =
                    0.2126 * r + 0.7152 * g + 0.0722 * b;

                  break;
                }
              }
            }

            current = current.parentElement;
          }
        }

        if (luminance !== null) luminances.push(luminance);
      }

      if (luminances.length > 0) {
        const average =
          luminances.reduce((sum, value) => sum + value, 0) /
          luminances.length;

        setIsDarkBackground(average < 0.45);
      }
    };

    const scheduleDetection = () => {
      if (frame) cancelAnimationFrame(frame);
      frame = requestAnimationFrame(detectBackground);
    };

    scheduleDetection();

    window.addEventListener('scroll', scheduleDetection, { passive: true });
    window.addEventListener('resize', scheduleDetection);

    return () => {
      window.removeEventListener('scroll', scheduleDetection);
      window.removeEventListener('resize', scheduleDetection);

      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  // Close the mobile drawer when the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Prevent background scrolling while the mobile drawer is open.
  useEffect(() => {
    document.body.style.overflow = mobileOpen ? 'hidden' : '';

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Clean up the dropdown timer.
  useEffect(() => {
    return () => {
      if (closeTimeout.current) {
        clearTimeout(closeTimeout.current);
      }
    };
  }, []);

  const handleDropdownEnter = (label: string) => {
    if (closeTimeout.current) {
      clearTimeout(closeTimeout.current);
    }

    setOpenDropdown(label);
  };

  const handleDropdownLeave = () => {
    closeTimeout.current = setTimeout(() => {
      setOpenDropdown(null);
    }, 150);
  };

  const headerTextColor = isDarkBackground
    ? 'text-white'
    : 'text-maroon-900';

  const navTextColor = isDarkBackground
    ? 'text-white/90 hover:text-gold-100'
    : 'text-maroon-900/90 hover:text-maroon-700';

  const iconTextColor = isDarkBackground
    ? 'text-white'
    : 'text-maroon-900';

  const subtitleColor = isDarkBackground
    ? 'text-gold-100'
    : 'text-maroon-700';

  const isItemActive = (item: NavItem) => {
    if (item.to === '/') {
      return location.pathname === '/';
    }

    if (item.label === 'Administration') {
      return (
        location.pathname === '/management' ||
        location.pathname === '/principal' ||
        location.pathname === '/faculty' ||
        (location.pathname === '/about' &&
          location.hash === '#administration')
      );
    }

    if (item.label === 'Academics') {
      return (
        location.pathname === '/academics' ||
        location.pathname === '/programs'
      );
    }

    return (
      location.pathname === item.to ||
      location.pathname.startsWith(`${item.to}/`)
    );
  };

  return (
    <>
      {/* Main transparent header */}
      <header
        data-site-header
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-colors duration-300"
      >
<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-3 sm:px-5 sm:py-3.5 lg:px-8 xl:px-10">
            {/* College logo and name */}
          <Link
            to="/"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label={siteConfig.name}
          >
            <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-maroon-600 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <GraduationCap
                className="h-5 w-5 text-gold sm:h-6 sm:w-6"
                strokeWidth={1.5}
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className={`whitespace-nowrap font-serif text-xs font-bold leading-tight transition-colors duration-300 sm:text-base lg:text-lg ${headerTextColor}`}
              >
                ST. Lourdes
              </span>

              <span
                className={`whitespace-nowrap font-sans text-[8px] uppercase tracking-[0.08em] transition-colors duration-300 sm:text-[10px] sm:tracking-[0.16em] lg:tracking-[0.2em] ${subtitleColor}`}
              >
                Engineering College
              </span>
            </div>
          </Link>
<button
  type="button"
  onClick={() => setMobileOpen((prev) => !prev)}
  className={`inline-flex h-10 w-10 shrink-0 items-center justify-center rounded-lg p-2 text-[#D4AF37] transition-colors hover:bg-white/10 focus:outline-none focus-visible:ring-2 focus-visible:ring-[#D4AF37] xl:hidden`}
  aria-label={mobileOpen ? "Close menu" : "Open menu"}
  aria-expanded={mobileOpen}
>
  {mobileOpen ? (
    <X className="h-6 w-6" />
  ) : (
    <Menu className="h-6 w-6" />
  )}
</button>
          {/* Desktop and laptop navigation */}
          <nav
            className="hidden xl:flex flex-1 items-center justify-center gap-1 xl:gap-1.5 2xl:gap-2 ml-4 2xl:ml-6"
            aria-label="Main navigation"
          >
            {navItems.map((item) => (
              <div
                key={item.label}
                className="relative"
                onMouseEnter={() => handleDropdownEnter(item.label)}
                onMouseLeave={handleDropdownLeave}
              >
                <NavLink
                  to={item.to}
                  end={item.to === '/'}
                  className={({ isActive }) =>
                    `group relative flex items-center whitespace-nowrap rounded px-1 py-2 text-[10px] font-medium transition-colors duration-300 xl:px-1.5 xl:text-[11px] 2xl:gap-1.5 2xl:px-2 2xl:text-[12px] ${
                      isActive || isItemActive(item)
                        ? 'text-gold'
                        : navTextColor
                    }`
                  }
                >
                  {item.label}

                  <span
                    aria-hidden="true"
                    className={`absolute bottom-0 left-1.5 right-1.5 h-0.5 rounded-full bg-gold transition-transform duration-300 ${
                      isItemActive(item)
                        ? 'scale-x-100'
                        : 'scale-x-0 group-hover:scale-x-100'
                    }`}
                  />
                </NavLink>

                {/* Desktop dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-72 pt-2">
                    <div className="overflow-visible rounded-xl border border-gold/20 bg-white shadow-2xl shadow-maroon-900/20">
                      <div className="h-1 rounded-t-xl bg-gradient-to-r from-gold via-gold-100 to-gold" />

                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li
                            key={child.label}
                            className="group/sub relative"
                          >
                            <div className="flex items-center">
                              <Link
                                to={child.to}
                                className="block min-w-0 flex-1 px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-maroon-50 hover:text-maroon-600"
                              >
                                {child.label}
                              </Link>

                              {child.children && (
                                <ChevronDown className="mr-3 h-4 w-4 -rotate-90 text-maroon-700" />
                              )}
                            </div>

                            {child.children && (
                              <div className="absolute left-full top-0 z-50 hidden w-72 pl-2 group-hover/sub:block group-focus-within/sub:block">
                                <div className="overflow-hidden rounded-xl border border-gold/20 bg-white shadow-2xl shadow-maroon-900/20">
                                  <ul className="py-2">
                                    {child.children.map((nested) => (
                                      <li key={nested.label}>
                                        <Link
                                          to={nested.to}
                                          className="block px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-maroon-50 hover:text-maroon-600"
                                        >
                                          {nested.label}
                                        </Link>
                                      </li>
                                    ))}
                                  </ul>
                                </div>
                              </div>
                            )}
                          </li>
                        ))}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and mobile menu buttons */}
<div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2 xl:ml-3 2xl:ml-4">
              <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={`rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-gold-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-2.5 ${iconTextColor}`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              type="button"
              onClick={() => setMobileOpen(true)}
              className={`rounded-full p-2 transition-colors duration-200 hover:bg-white/10 hover:text-gold-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:p-2.5 xl:hidden ${iconTextColor}`}
              aria-label="Open menu"
              aria-expanded={mobileOpen}
            >
              <Menu className="h-6 w-6" />
            </button>
          </div>
        </div>

        {/* Search bar */}
        {searchOpen && (
          <div className="border-t border-gold/20 bg-maroon-800/95 px-5 py-4 backdrop-blur-md sm:px-8 lg:px-12">
            <div className="mx-auto flex max-w-7xl items-center gap-3">
              <Search className="h-5 w-5 text-gold/70" />

              <input
                type="text"
                placeholder="Search programs, events, departments..."
                className="flex-1 bg-transparent text-ivory placeholder:text-ivory/40 focus:outline-none"
                autoFocus
              />

              <button
                type="button"
                onClick={() => setSearchOpen(false)}
                className="text-ivory/60 hover:text-gold-100"
                aria-label="Close search"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>
        )}
      </header>

      {/* Mobile navigation drawer */}
      {mobileOpen && (
        <div
          className="fixed inset-0 z-[60] xl:hidden"
          role="dialog"
          aria-modal="true"
          aria-label="Mobile navigation"
        >
          {/* Background overlay */}
          <button
            type="button"
className="absolute inset-0 h-full w-full bg-[#24060c]/70 backdrop-blur-sm"
            onClick={() => setMobileOpen(false)}
            aria-label="Close navigation menu"
          />

          {/* Forest-green mobile menu */}
<div className="absolute right-0 top-0 flex h-full w-[88%] max-w-[420px] flex-col overflow-y-auto border-l border-[#D4AF37]/40 bg-[#3B0712] shadow-2xl sm:w-[80%]">            {/* Mobile menu header */}
<div className="sticky top-0 z-10 flex items-center justify-between border-b border-[#D4AF37]/30 bg-[#4A0B18]/95 px-5 py-4 backdrop-blur-md">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex items-center gap-3"
              >
                <div className="flex h-10 w-10 items-center justify-center rounded-full border-2 border-gold bg-maroon-700">
                  <GraduationCap className="h-5 w-5 text-gold" />
                </div>

                <div className="flex flex-col">
                  <span className="font-serif text-base font-bold text-white">
                    ST. Lourdes
                  </span>
                  <span className="text-[9px] uppercase tracking-[0.16em] text-gold">
                    Engineering College
                  </span>
                </div>
              </Link>

              <button
                type="button"
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-white transition-colors hover:bg-white/10 hover:text-gold focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

           
{/* Mobile navigation links */}
<nav
  className="flex-1 px-4 py-4"
  aria-label="Mobile navigation"
>
  <ul className="space-y-1.5">
    {navItems.map((item) => {
      const isActive = isItemActive(item);
      const isExpanded = openDropdown === item.label;

      return (
        <li key={item.label}>
          <div
            className={`flex items-center overflow-hidden rounded-lg border-l-4 transition-all duration-200 ${
              isActive
? 'border-[#D4AF37] bg-[#641426]'
                : 'border-transparent hover:border-gold/50 hover:bg-white/5'
            }`}
          >
            <Link
              to={item.to}
              onClick={() => {
                if (!item.children) {
                  setMobileOpen(false);
                  setOpenDropdown(null);
                  setOpenMobileSubmenu(null);
                }
              }}
              className={`flex-1 px-4 py-3 text-sm font-semibold transition-colors ${
                isActive
                  ? 'text-gold'
                  : 'text-white/85 hover:text-white'
              }`}
            >
              {item.label}
            </Link>

            {item.children && (
              <button
                type="button"
                onClick={() => {
                  setOpenDropdown(isExpanded ? null : item.label);
                  setOpenMobileSubmenu(null);
                }}
                className="px-4 py-3 text-white/70 transition-colors hover:text-gold"
                aria-label={`Toggle ${item.label} submenu`}
                aria-expanded={isExpanded}
              >
                <ChevronDown
                  className={`h-4 w-4 transition-transform duration-200 ${
                    isExpanded ? 'rotate-180' : ''
                  }`}
                />
              </button>
            )}
          </div>

          {/* First-level submenu */}
          {item.children && isExpanded && (
<ul className="ml-5 mt-1 space-y-1 border-l border-[#D4AF37]/40 py-1 pl-3">
              {item.children.map((child) => {
                const childSubmenuKey = `${item.label}:${child.label}`;
                const childSubmenuOpen =
                  openMobileSubmenu === childSubmenuKey;

                return (
                  <li key={child.label}>
                    <div className="flex items-center">
                      <Link
                        to={child.to}
                        onClick={() => {
                          if (!child.children) {
                            setMobileOpen(false);
                            setOpenDropdown(null);
                            setOpenMobileSubmenu(null);
                          }
                        }}
                        className="flex-1 rounded-md px-3 py-2.5 text-sm text-white/80 transition-colors hover:bg-white/5 hover:text-gold"
                      >
                        {child.label}
                      </Link>

                      {child.children && (
                        <button
                          type="button"
                          onClick={() =>
                            setOpenMobileSubmenu(
                              childSubmenuOpen
                                ? null
                                : childSubmenuKey
                            )
                          }
                          className="px-3 py-2.5 text-gold/80 hover:text-gold"
                          aria-label={`Toggle ${child.label} submenu`}
                          aria-expanded={childSubmenuOpen}
                        >
                          <ChevronDown
                            className={`h-4 w-4 transition-transform duration-200 ${
                              childSubmenuOpen ? 'rotate-180' : ''
                            }`}
                          />
                        </button>
                      )}
                    </div>

                    {/* Nested submenu: opens when Committees is clicked */}
                    {child.children && childSubmenuOpen && (
                      <ul className="ml-3 mt-1 space-y-1 border-l border-white/10 py-1 pl-3">
                        {child.children.map((nested) => (
                          <li key={nested.label}>
                            <Link
                              to={nested.to}
                              onClick={() => {
                                setMobileOpen(false);
                                setOpenDropdown(null);
                                setOpenMobileSubmenu(null);
                              }}
                              className="block rounded-md px-3 py-2 text-xs leading-relaxed text-white/65 transition-colors hover:bg-white/5 hover:text-gold"
                            >
                              {nested.label}
                            </Link>
                          </li>
                        ))}
                      </ul>
                    )}
                  </li>
                );
              })}
            </ul>
          )}
        </li>
      );
    })}
  </ul>

  {/* Apply Now button */}
  <button
    type="button"
    onClick={() => {
      setMobileOpen(false);
      setOpenDropdown(null);
      setOpenMobileSubmenu(null);
      onApplyClick();
    }}
    className="mt-5 flex w-full items-center justify-center gap-2 rounded-xl bg-gold px-5 py-3.5 text-sm font-bold text-maroon-900 shadow-lg transition-all duration-200 hover:bg-gold-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
  >
    Apply Now
    <span aria-hidden="true">→</span>
  </button>
</nav>


            {/* Bottom branding */}
            <div className="border-t border-gold/20 px-5 py-4 text-center">
              <p className="text-[10px] uppercase tracking-[0.18em] text-white/40">
                ST. Lourdes Engineering College
              </p>
            </div>
          </div>
        </div>
      )}
    </>
  );
}