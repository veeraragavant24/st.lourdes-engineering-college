import { useEffect, useRef, useState } from 'react';
import { Link, NavLink, useLocation } from 'react-router-dom';
import { Menu, X, Search, GraduationCap } from 'lucide-react';
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
    {
      label: 'About the College',
      to: '/about',
    },
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
    {
      label: 'AICTE',
      to: '/about#aicte',
    },
  ],
},





{
  label: 'Administration',
  to: '/about#administration',
  children: [
    {
      label: 'Management',
      to: '/management',
    },
    {
      label: 'Principal',
      to: '/principal',
    },
    {
      label: 'Faculty',
      to: '/faculty',
    },
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
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect the background behind the transparent header.
 

  // Detect the visible background behind the transparent header.
  
useEffect(() => {
  let frame = 0;

  const detectBackground = () => {
    const header = document.querySelector<HTMLElement>(
      '[data-site-header]'
    );

    if (!header) return;

    const rect = header.getBoundingClientRect();

    // Sample the content directly behind the transparent header.
    const sampleY = Math.max(
      1,
      Math.min(rect.bottom - 2, window.innerHeight - 1)
    );

    const sampleXs = [
      window.innerWidth * 0.2,
      window.innerWidth * 0.5,
      window.innerWidth * 0.8,
    ];

    const results: number[] = [];

    for (const x of sampleXs) {
      const elements = document.elementsFromPoint(
        Math.max(1, Math.min(x, window.innerWidth - 1)),
        sampleY
      );

      const target = elements.find(
        (element) =>
          !header.contains(element) &&
          !element.closest('[data-site-header]')
      );

      if (!target) continue;

      let current: Element | null = target;
      let luminance: number | null = null;

      // 1. Respect an explicitly declared section theme.
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

      // 2. Check gradient overlays BEFORE parent background colors.
      if (luminance === null) {
        current = target;

        while (current && current !== document.documentElement) {
          const style = window.getComputedStyle(current);
          const classes =
            typeof current.className === 'string'
              ? current.className
              : '';

          const hasDarkMaroonGradient =
            /(?:from|via|to)-maroon-(?:800|900)(?:\/\d+)?/.test(
              classes
            );

          const hasDarkGradient =
            /(?:from|via|to)-(?:black|gray-900|slate-900)(?:\/\d+)?/.test(
              classes
            );

          if (
            style.backgroundImage !== 'none' &&
            (hasDarkMaroonGradient || hasDarkGradient)
          ) {
            luminance = 0.15;
            break;
          }

          current = current.parentElement;
        }
      }

      // 3. Fall back to the first visible, non-transparent background.
      if (luminance === null) {
        current = target;

        while (current && current !== document.documentElement) {
          const style = window.getComputedStyle(current);
          const match = style.backgroundColor.match(
            /rgba?\(([^)]+)\)/i
          );

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

      if (luminance !== null) {
        results.push(luminance);
      }
    }

    if (results.length > 0) {
      const average =
        results.reduce((sum, value) => sum + value, 0) /
        results.length;

      setIsDarkBackground(average < 0.45);
    }
  };

  const update = () => {
    if (frame) cancelAnimationFrame(frame);
    frame = requestAnimationFrame(detectBackground);
  };

  update();

  window.addEventListener('scroll', update, { passive: true });
  window.addEventListener('resize', update);

  return () => {
    window.removeEventListener('scroll', update);
    window.removeEventListener('resize', update);

    if (frame) cancelAnimationFrame(frame);
  };
}, [location.pathname]);



  // Close mobile navigation when the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
  }, [location.pathname]);

  // Prevent background scrolling while the mobile menu is open.
  useEffect(() => {
    if (mobileOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
    }

    return () => {
      document.body.style.overflow = '';
    };
  }, [mobileOpen]);

  // Clean up a pending dropdown timer.
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

  // The header stays transparent in every section.
const headerBg = 'bg-transparent';

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

  return (
    <>
      {/* Main transparent header */}
      <header
  data-site-header
  className={`fixed inset-x-0 top-0 z-50 transition-colors duration-300 ${headerBg}`}
>
<div className="mx-auto flex w-full max-w-7xl items-center justify-between gap-2 px-3 py-3 sm:gap-4 sm:px-6 sm:py-3.5 lg:px-10 xl:px-12">          {/* Logo */}
          <Link
            to="/"
            className="group flex items-center gap-3"
            aria-label={siteConfig.name}
          >
<div className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-maroon-600 transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11">            
    <GraduationCap
  className="h-5 w-5 text-gold sm:h-6 sm:w-6"
  strokeWidth={1.5}
/>
            </div>

            <div className="hidden flex-col sm:flex">
              <span
                className={`font-serif text-base font-bold leading-tight transition-colors duration-300 ${headerTextColor}`}
              >
                ST. Lourdes
              </span>

              <span
                className={`font-sans text-[10px] uppercase tracking-[0.2em] transition-colors duration-300 ${subtitleColor}`}
              >
                Engineering College
              </span>
            </div>
          </Link>

          {/* Desktop navigation */}
         

<nav
  className="hidden xl:flex items-center gap-1 2xl:gap-2"
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
  end
  
className={({ isActive }) =>
  `group relative flex items-center gap-1 whitespace-nowrap rounded px-1.5 py-2 text-[11px] font-medium transition-colors duration-300 2xl:gap-1.5 2xl:px-2 2xl:text-[12px] ${
    isActive ? 'text-gold' : navTextColor
  }`
}

>

  {item.label}

 

  

<span
  aria-hidden="true"
  className={`absolute bottom-0 left-1.5 right-1.5 h-0.5 rounded-full bg-gold transition-transform duration-300 ${
    (
      item.label === 'Home' && location.pathname === '/' ||
      item.label === 'About Us' && location.pathname === '/about' ||
      item.label === 'Administration' &&
        location.pathname === '/about' &&
        location.hash === '#administration' ||
      item.label === 'Academics' &&
        location.pathname === '/programs' &&
        location.hash === '' ||
      item.label === 'Programs Offered' &&
        location.pathname === '/programs' &&
        location.hash.startsWith('#be-' ) ||
      item.label === 'Admission' && location.pathname === '/admission' ||
      item.label === 'Campus Life' && location.pathname === '/gallery' ||
      item.label === 'Placement' && location.pathname === '/placement' ||
      item.label === 'Gallery' &&
        location.pathname === '/gallery' &&
        location.hash === '#gallery' ||
      item.label === 'Contact Us' && location.pathname === '/contact'
    )
      ? 'scale-x-100'
      : 'scale-x-0 group-hover:scale-x-100'
  }`}
/>


</NavLink>

                {/* Desktop dropdown menu, including nested submenus */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-72 pt-2 animate-fade-in">
                    <div className="overflow-visible rounded-xl border border-gold/20 bg-white shadow-2xl shadow-maroon-900/20">
                      <div className="h-1 rounded-t-xl bg-gradient-to-r from-gold via-gold-100 to-gold" />
                      <ul className="py-2">
                        {item.children.map((child) => (
                          <li key={child.label} className="group/sub relative">
                            <div className="flex items-center">
                              <Link
                                to={child.to}
                                className="block min-w-0 flex-1 px-4 py-2.5 text-sm text-charcoal transition-colors duration-150 hover:bg-maroon-50 hover:text-maroon-600"
                              >
                                {child.label}
                              </Link>
                              {child.children && (
                                <span className="px-3 text-xs text-maroon-700" aria-hidden="true">›</span>
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
                                          className="block px-4 py-2.5 text-sm text-charcoal transition-colors duration-150 hover:bg-maroon-50 hover:text-maroon-600"
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
<div className="ml-auto flex shrink-0 items-center gap-1 sm:gap-2">            <button
              onClick={() => setSearchOpen((open) => !open)}
              className={`rounded-full p-2 ${iconTextColor} transition-colors duration-200 hover:bg-white/10 hover:text-gold-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
              aria-label="Search"
              aria-expanded={searchOpen}
            >
              <Search className="h-5 w-5" />
            </button>

            <button
              onClick={() => setMobileOpen(true)}
              className={`rounded-full p-2.5 ${iconTextColor} transition-colors duration-200 hover:bg-white/10 hover:text-gold-100 xl:hidden focus:outline-none focus-visible:ring-2 focus-visible:ring-gold`}
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
        <div className="fixed inset-0 z-[60] xl:hidden">
          <div
            className="absolute inset-0 bg-maroon-900/60 backdrop-blur-sm animate-fade-in"
            onClick={() => setMobileOpen(false)}
          />

<div className="absolute right-0 top-0 flex h-full w-[min(20rem,90vw)] flex-col overflow-y-auto overscroll-contain bg-maroon-800 pb-[env(safe-area-inset-bottom)] shadow-2xl animate-slide-in-right">            <div className="flex items-center justify-between border-b border-gold/20 px-5 py-4">
              <span className="font-serif text-lg font-bold text-ivory">
                Menu
              </span>

              <button
                onClick={() => setMobileOpen(false)}
                className="rounded-full p-2 text-ivory hover:bg-white/10 hover:text-gold-100"
                aria-label="Close menu"
              >
                <X className="h-6 w-6" />
              </button>
            </div>

            <nav className="px-3 py-3">
              {navItems.map((item) => (
                <div
                  key={item.label}
                  className="border-b border-white/5 py-1"
                >
                  <Link
                    to={item.to}
                    className="block rounded-lg px-3 py-2.5 text-sm font-medium text-ivory/90 hover:bg-white/5 hover:text-gold-100"
                  >
                    {item.label}
                  </Link>

                  {item.children && (
                    <ul className="ml-3 border-l border-gold/20 pl-3">
                      {item.children.map((child) => (
                        <li key={child.label} className="py-0.5">
                          <Link
                            to={child.to}
                            className="block rounded-lg px-3 py-2 text-xs text-ivory/70 hover:bg-white/5 hover:text-gold-100"
                          >
                            {child.label}
                          </Link>
                          {child.children && (
                            <ul className="ml-3 border-l border-gold/10 pl-2">
                              {child.children.map((nested) => (
                                <li key={nested.label}>
                                  <Link
                                    to={nested.to}
                                    className="block rounded-lg px-3 py-2 text-xs text-ivory/55 hover:bg-white/5 hover:text-gold-100"
                                  >
                                    {nested.label}
                                  </Link>
                                </li>
                              ))}
                            </ul>
                          )}
                        </li>
                      ))}
                    </ul>
                  )}
                </div>
              ))}

              <button
                onClick={() => {
                  setMobileOpen(false);
                  onApplyClick();
                }}
                className="btn-gold mt-4 w-full"
              >
                Apply Now
              </button>
            </nav>
          </div>
        </div>
      )}
    </>
  );
}