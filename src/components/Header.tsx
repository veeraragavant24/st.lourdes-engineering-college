
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
            to: '/grievance-committee',
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
        to: '/mandatory-disclosure',
      },
      {
        label: 'AICTE Documents',
        to: '/aicte-documents',
      },
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
  const [openDesktopSubmenu, setOpenDesktopSubmenu] = useState<string | null>(null);
  const [openMobileSubmenu, setOpenMobileSubmenu] = useState<string | null>(null);
  const [searchOpen, setSearchOpen] = useState(false);

  const location = useLocation();
  const closeTimeout = useRef<ReturnType<typeof setTimeout> | null>(null);

  // Detect the actual background behind the fixed header,
  // including solid colours and CSS gradients.
  useEffect(() => {
    let frame = 0;

    const getLuminance = (color: string): number | null => {
      let r = 0;
      let g = 0;
      let b = 0;
      let alpha = 1;

      const hex = color.match(/^#([0-9a-f]{3,8})$/i);

      if (hex) {
        let value = hex[1];

        if (value.length === 3 || value.length === 4) {
          value = value
            .split('')
            .map((char) => char + char)
            .join('');
        }

        if (value.length === 8) {
          alpha = parseInt(value.slice(6, 8), 16) / 255;
        }

        if (value.length !== 6 && value.length !== 8) return null;

        r = parseInt(value.slice(0, 2), 16);
        g = parseInt(value.slice(2, 4), 16);
        b = parseInt(value.slice(4, 6), 16);
      } else {
        const rgb = color.match(/rgba?\(([^)]+)\)/i);

        if (!rgb) return null;

        const values = rgb[1].split(',').map((v) => {
          const cleaned = v.trim();
          return cleaned.endsWith('%')
            ? (parseFloat(cleaned) / 100) * 255
            : parseFloat(cleaned);
        });

        if (values.length < 3 || !values.slice(0, 3).every(Number.isFinite)) {
          return null;
        }

        [r, g, b] = values;

        if (values.length >= 4) {
          alpha = values[3];
        }
      }

      if (alpha <= 0.05) return null;

      const channels = [r, g, b].map((value) => {
        const normalized = value / 255;

        return normalized <= 0.04045
          ? normalized / 12.92
          : ((normalized + 0.055) / 1.055) ** 2.4;
      });

      return (
        0.2126 * channels[0] +
        0.7152 * channels[1] +
        0.0722 * channels[2]
      );
    };

    const detectBackground = () => {
      const header = document.querySelector<HTMLElement>('[data-site-header]');
      if (!header) return;

      const rect = header.getBoundingClientRect();

      // Sample the visible area directly behind the fixed header.
      const y = Math.max(1, Math.min(rect.bottom - 3, window.innerHeight - 1));

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
        let detectedLuminance: number | null = null;

        while (current && current !== document.documentElement) {
          // Explicit page-section theme takes priority.
          const theme = current.getAttribute('data-header-theme');

          if (theme === 'dark') {
            detectedLuminance = 0.1;
            break;
          }

          if (theme === 'light') {
            detectedLuminance = 0.9;
            break;
          }

          const style = window.getComputedStyle(current);

          // Detect CSS gradient colours.
          if (style.backgroundImage && style.backgroundImage !== 'none') {
            const colorMatches =
              style.backgroundImage.match(
                /#[0-9a-f]{3,8}\b|rgba?\([^)]+\)/gi
              ) || [];

            const gradientLuminances = colorMatches
              .map(getLuminance)
              .filter((value): value is number => value !== null);

            if (gradientLuminances.length > 0) {
              detectedLuminance =
                gradientLuminances.reduce((sum, value) => sum + value, 0) /
                gradientLuminances.length;
              break;
            }
          }

          // Detect normal solid backgrounds.
          const solidLuminance = getLuminance(style.backgroundColor);

          if (solidLuminance !== null) {
            detectedLuminance = solidLuminance;
            break;
          }

          current = current.parentElement;
        }

        if (detectedLuminance !== null) {
          luminances.push(detectedLuminance);
        }
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
    window.addEventListener('load', scheduleDetection);

    return () => {
      window.removeEventListener('scroll', scheduleDetection);
      window.removeEventListener('resize', scheduleDetection);
      window.removeEventListener('load', scheduleDetection);

      if (frame) cancelAnimationFrame(frame);
    };
  }, [location.pathname]);

  // Close menus when the route changes.
  useEffect(() => {
    setMobileOpen(false);
    setOpenDropdown(null);
    setOpenDesktopSubmenu(null);
    setOpenMobileSubmenu(null);
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
      setOpenDesktopSubmenu(null);
    }, 150);
  };

  // Header text follows the actual background behind the header.
  const isDarkHeader = isDarkBackground;

  const headerTextColor = isDarkHeader
    ? 'text-white'
    : 'text-[#3B101B]';

  const navTextColor = isDarkHeader
    ? 'text-white/95 hover:text-[#F5D77A]'
    : 'text-[#3B101B] hover:text-[#9B6D24]';

  const iconTextColor = isDarkHeader
    ? 'text-white'
    : 'text-[#3B101B]';

  const subtitleColor = isDarkHeader
    ? 'text-[#F5D77A]'
    : 'text-[#7A263A]';

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
        className="fixed inset-x-0 top-0 z-50 bg-transparent transition-all duration-300"
      >
        <div
          className={`mx-auto flex w-full max-w-7xl items-center justify-between gap-2
            px-3 py-3
            sm:gap-3 sm:px-5 sm:py-3.5
            lg:px-8 xl:px-10
            max-xl:backdrop-blur-xl
            max-xl:border-b
            ${
              isDarkBackground
                ? 'max-xl:border-white/10 max-xl:bg-[#3B0712]/65'
                : 'max-xl:border-[#650d18]/10 max-xl:bg-white/80'
            }`}
        >
          {/* College logo and name */}
          <Link
            to="/"
            className="group flex min-w-0 shrink-0 items-center gap-2 sm:gap-3"
            aria-label={siteConfig.name}
          >
            <div className="relative flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#D8B45A]/80 bg-[#650D18] shadow-[0_0_18px_rgba(216,180,90,0.16)] transition-transform duration-300 group-hover:scale-105 sm:h-11 sm:w-11 lg:h-12 lg:w-12">
              <div className="absolute inset-[3px] rounded-full border border-[#D8B45A]/30" />
              <GraduationCap
                className="relative h-5 w-5 text-[#D8B45A] sm:h-6 sm:w-6"
                strokeWidth={1.6}
              />
            </div>

            <div className="flex min-w-0 flex-col">
              <span
                className={`whitespace-nowrap font-serif text-[13px] font-bold leading-tight tracking-wide transition-colors duration-300 sm:text-base lg:text-lg ${headerTextColor}`}
              >
                ST. Lourdes
              </span>

              <span
                className={`whitespace-nowrap font-sans text-[8px] font-medium uppercase tracking-[0.1em] transition-colors duration-300 sm:text-[10px] sm:tracking-[0.16em] lg:tracking-[0.2em] ${subtitleColor}`}
              >
                Engineering College
              </span>
            </div>
          </Link>

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
                {item.children ? (
                  <button
                    type="button"
                    onClick={() => {
                      setOpenDropdown(
                        openDropdown === item.label ? null : item.label
                      );
                      setOpenDesktopSubmenu(null);
                    }}
                    aria-expanded={openDropdown === item.label}
                    className={`group relative flex items-center whitespace-nowrap rounded px-1 py-2 text-[10px] font-medium transition-colors duration-300 xl:px-1.5 xl:text-[11px] 2xl:gap-1.5 2xl:px-2 2xl:text-[12px] ${
                      isItemActive(item)
                        ? 'text-gold'
                        : navTextColor
                    }`}
                  >
                    {item.label}

                    <ChevronDown className="ml-1 h-3 w-3" />

                    <span
                      aria-hidden="true"
                      className={`absolute bottom-0 left-1.5 right-1.5 h-0.5 rounded-full bg-gold transition-transform duration-300 ${
                        isItemActive(item)
                          ? 'scale-x-100'
                          : 'scale-x-0 group-hover:scale-x-100'
                      }`}
                    />
                  </button>
                ) : (
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
                )}

                {/* Desktop dropdown */}
                {item.children && openDropdown === item.label && (
                  <div className="absolute left-0 top-full z-50 w-72 pt-2">
                    <div className="overflow-visible rounded-xl border border-gold/20 bg-white shadow-2xl shadow-maroon-900/20">
                      <div className="h-1 rounded-t-xl bg-gradient-to-r from-gold via-gold-100 to-gold" />

                      <ul className="py-2">
                        {item.children.map((child) => {
                          const submenuKey = `${item.label}:${child.label}`;
                          const submenuOpen =
                            openDesktopSubmenu === submenuKey;

                          return (
                            <li
                              key={child.label}
                              className="relative"
                              onMouseEnter={() => {
                                if (child.children) {
                                  if (closeTimeout.current) {
                                    clearTimeout(closeTimeout.current);
                                  }
                                  setOpenDesktopSubmenu(submenuKey);
                                }
                              }}
                              onMouseLeave={() => {
                                if (child.children) {
                                  setOpenDesktopSubmenu(null);
                                }
                              }}
                            >
                              {child.children ? (
                                <button
                                  type="button"
                                  onClick={() => {
                                    setOpenDesktopSubmenu(
                                      submenuOpen ? null : submenuKey
                                    );
                                  }}
                                  aria-expanded={submenuOpen}
                                  className={`flex w-full items-center justify-between px-4 py-2.5 text-left text-sm transition-colors ${
                                    submenuOpen
                                      ? 'bg-maroon-50 text-maroon-700'
                                      : 'text-charcoal hover:bg-maroon-50 hover:text-maroon-600'
                                  }`}
                                >
                                  {child.label}
                                  <ChevronDown
                                    className={`mr-1 h-4 w-4 -rotate-90 transition-transform ${
                                      submenuOpen ? 'rotate-0' : ''
                                    }`}
                                  />
                                </button>
                              ) : (
                                <Link
                                  to={child.to}
                                  onClick={() => {
                                    setOpenDropdown(null);
                                    setOpenDesktopSubmenu(null);
                                  }}
                                  className="block px-4 py-2.5 text-sm text-charcoal transition-colors hover:bg-maroon-50 hover:text-maroon-600"
                                >
                                  {child.label}
                                </Link>
                              )}

                              {child.children && submenuOpen && (
                                <div className="absolute left-full top-0 z-[60] w-72 pl-2">
                                  <div className="overflow-hidden rounded-xl border border-gold/20 bg-white shadow-2xl shadow-maroon-900/20">
                                    <ul className="py-2">
                                      {child.children.map((nested) => (
                                        <li key={nested.label}>
                                          <Link
                                            to={nested.to}
                                            onClick={() => {
                                              setOpenDropdown(null);
                                              setOpenDesktopSubmenu(null);
                                            }}
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
                          );
                        })}
                      </ul>
                    </div>
                  </div>
                )}
              </div>
            ))}
          </nav>

          {/* Search and mobile menu buttons */}
          <div className="ml-auto flex shrink-0 items-center gap-1.5 sm:gap-2 xl:ml-3 2xl:ml-4">
            <button
              type="button"
              onClick={() => setSearchOpen((open) => !open)}
              className={`flex h-10 w-10 items-center justify-center bg-transparent p-0 transition-colors duration-200 hover:text-gold-100 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:h-11 sm:w-11 ${iconTextColor}`}
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

          {/* Mobile menu */}
          <div className="fixed inset-y-0 right-0 flex h-dvh w-[min(88vw,390px)] flex-col overflow-x-hidden overflow-y-auto overscroll-contain border-l border-[#D8B45A]/40 bg-gradient-to-b from-[#4A0B18] via-[#3B0712] to-[#26050C] pb-[env(safe-area-inset-bottom)] shadow-[-20px_0_60px_rgba(0,0,0,0.28)]">
            <div className="sticky top-0 z-10 flex w-full min-w-0 shrink-0 items-center justify-between gap-3 border-b border-[#D8B45A]/25 bg-[#4A0B18]/95 px-4 py-4 backdrop-blur-xl">
              <Link
                to="/"
                onClick={() => setMobileOpen(false)}
                className="flex min-w-0 flex-1 items-center gap-2 overflow-hidden"
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
              className="flex-1 px-3 py-5 sm:px-4"
              aria-label="Mobile navigation"
            >
              <ul className="space-y-2">
                {navItems.map((item) => {
                  const isActive = isItemActive(item);
                  const isExpanded = openDropdown === item.label;

                  return (
                    <li key={item.label}>
                      <div
                        className={`group flex items-center overflow-hidden rounded-xl border-l-[3px] transition-all duration-300 ${
                          isActive
                            ? 'border-[#D8B45A] bg-gradient-to-r from-[#D8B45A]/15 to-transparent shadow-[inset_0_0_18px_rgba(216,180,90,0.05)]'
                            : 'border-transparent hover:border-[#D8B45A] hover:bg-gradient-to-r hover:from-[#D8B45A]/15 hover:to-[#D8B45A]/[0.03] hover:shadow-[0_4px_18px_rgba(216,180,90,0.08)]'
                        }`}
                      >
                        {item.children ? (
                          <button
                            type="button"
                            onClick={() => {
                              setOpenDropdown(
                                isExpanded ? null : item.label
                              );
                              setOpenMobileSubmenu(null);
                            }}
                            className={`flex min-h-12 flex-1 items-center justify-between px-4 py-3 text-left text-[14px] font-medium tracking-wide transition-all duration-300 ${
                              isActive
                                ? 'text-[#E8C66F]'
                                : 'text-white/85 hover:text-[#F0D48A]'
                            }`}
                            aria-expanded={isExpanded}
                          >
                            {item.label}
                            <ChevronDown
                              className={`h-4 w-4 transition-transform duration-200 ${
                                isExpanded ? 'rotate-180' : ''
                              }`}
                            />
                          </button>
                        ) : (
                          <Link
                            to={item.to}
                            onClick={() => {
                              setMobileOpen(false);
                              setOpenDropdown(null);
                              setOpenMobileSubmenu(null);
                            }}
                            className={`flex min-h-12 flex-1 items-center px-4 py-3 text-[14px] font-medium tracking-wide transition-all duration-300 ${
                              isActive
                                ? 'text-[#E8C66F]'
                                : 'text-white/85 hover:pl-5 hover:text-[#F0D48A]'
                            }`}
                          >
                            {item.label}
                          </Link>
                        )}
                      </div>

                      {/* First-level submenu */}
                      {item.children && isExpanded && (
                        <ul className="ml-5 mt-1 space-y-1 border-l border-[#D8B45A]/40 py-1 pl-3">
                          {item.children.map((child) => {
                            const childSubmenuKey = `${item.label}:${child.label}`;
                            const childSubmenuOpen =
                              openMobileSubmenu === childSubmenuKey;

                            return (
                              <li key={child.label}>
                                <div className="flex items-center">
                                  {child.children ? (
                                    <button
                                      type="button"
                                      onClick={() => {
                                        setOpenMobileSubmenu(
                                          childSubmenuOpen
                                            ? null
                                            : childSubmenuKey
                                        );
                                      }}
                                      className={`flex min-h-11 flex-1 items-center justify-between rounded-lg px-3 py-2.5 text-left text-sm transition-all duration-300 ${
                                        childSubmenuOpen
                                          ? 'bg-[#D8B45A]/10 text-[#E8C66F]'
                                          : 'text-white/80 hover:bg-[#D8B45A]/10 hover:text-[#F0D48A]'
                                      }`}
                                      aria-label={`Toggle ${child.label} submenu`}
                                      aria-expanded={childSubmenuOpen}
                                    >
                                      {child.label}
                                      <ChevronDown
                                        className={`h-4 w-4 transition-transform duration-200 ${
                                          childSubmenuOpen ? 'rotate-180' : ''
                                        }`}
                                      />
                                    </button>
                                  ) : (
                                    <Link
                                      to={child.to}
                                      onClick={() => {
                                        setMobileOpen(false);
                                        setOpenDropdown(null);
                                        setOpenMobileSubmenu(null);
                                      }}
                                      className={`flex min-h-11 flex-1 items-center rounded-lg px-3 py-2.5 text-sm transition-all duration-300 ${
                                        location.pathname === child.to.split('#')[0]
                                          ? 'bg-[#D8B45A]/10 text-[#E8C66F]'
                                          : 'text-white/80 hover:bg-[#D8B45A]/10 hover:pl-4 hover:text-[#F0D48A]'
                                      }`}
                                    >
                                      {child.label}
                                    </Link>
                                  )}
                                </div>

                                {/* Nested submenu */}
                                {child.children && childSubmenuOpen && (
                                  <ul className="ml-4 mt-1 space-y-1 border-l border-[#D8B45A]/30 py-1 pl-3">
                                    {child.children.map((nested) => (
                                      <li key={nested.label}>
                                        <Link
                                          to={nested.to}
                                          onClick={() => {
                                            setMobileOpen(false);
                                            setOpenDropdown(null);
                                            setOpenMobileSubmenu(null);
                                          }}
                                          className="block rounded-lg px-3 py-2.5 text-xs leading-relaxed text-white/65 transition-all duration-300 hover:bg-[#D8B45A]/10 hover:pl-4 hover:text-[#F0D48A] hover:shadow-[0_3px_12px_rgba(216,180,90,0.06)]"
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
                className="mt-6 flex min-h-12 w-full items-center justify-center gap-3 rounded-xl border border-[#F3D98B]/70 bg-gradient-to-r from-[#D8B45A] via-[#F0D48A] to-[#C79A38] px-5 py-3.5 text-sm font-bold tracking-wide text-[#3B0712] shadow-[0_8px_25px_rgba(216,180,90,0.18)] transition-all duration-300 hover:brightness-105 active:scale-[0.98] focus:outline-none focus-visible:ring-2 focus-visible:ring-white"
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
