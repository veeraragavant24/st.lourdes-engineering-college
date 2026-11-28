import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import type { LucideIcon } from 'lucide-react';
import {
  BookOpen,
  Building2,
  Cpu,
  FlaskConical,
  Trophy,
  Wifi,
  ArrowRight,
  X,
  CheckCircle2,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';

// One block of popup content: image on the left, text on the right
interface DetailSection {
  tabLabel: string; // shown on the tab button (only when there are 2+ sections)
  image: string;
  heading: string;
  paragraphs: string[];
  highlights: string[];
}

interface FacilityItem {
  icon: LucideIcon;
  title: string;
  text: string;
  link: string;
  // If "sections" is present, Explore More opens the popup card.
  // 1 section  -> single card
  // 2+ sections -> tabs inside the card (e.g. Chemistry Lab / Physics Lab)
  // If it is missing, Explore More goes to the page in "link".
  sections?: DetailSection[];
}

const facilities: FacilityItem[] = [
  {
    icon: BookOpen,
    title: 'Central Library',
    text: 'Extensive collection of books, e-resources, and digital journals.',
    link: '/library',
  },
  {
    icon: Building2,
    title: 'Hostel Facilities',
    text: 'Separate, safe, and comfortable hostels for boys and girls.',
    link: '/hostel',
  },
  {
    icon: Cpu,
    title: 'Computer Labs',
    text: 'Modern computing labs with high-speed internet and latest software.',
    link: '/computer-labs',
    sections: [
      {
        tabLabel: 'Computer Lab',
        // Put your photos in the "public/facilites" folder
        image: '/facilites/computerlab.png',
        heading: 'Modern Computing Labs for Hands-On Learning',
        paragraphs: [
          'Our computer laboratories are designed to give every student practical, hands-on experience. The labs are equipped with modern systems, high-speed internet and the latest software needed for the curriculum.',
          'Students can practise programming, design, simulation and project work under the guidance of experienced faculty and lab technicians.',
        ],
        highlights: [
          'Modern desktop systems',
          'High-speed internet connectivity',
          'Latest software and development tools',
          'Guided practical sessions by faculty',
          'Comfortable and well-ventilated lab space',
        ],
      },
    ],
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    text: 'Well-equipped labs for electronics, physics, and chemistry.',
    link: '/laboratories',
    sections: [
      {
        tabLabel: 'Chemistry Lab',
        image: '/facilites/chemistrylab.png',
        heading: 'Chemistry Laboratory',
        paragraphs: [
          'The Chemistry Laboratory gives first-year engineering students practical exposure to the principles they study in class. Experiments are carried out in a safe, well-organised environment under faculty supervision.',
          'Students learn accurate measurement, observation and analysis through experiments that support the Anna University curriculum.',
        ],
        highlights: [
          'Well-arranged working benches with water and drainage facilities',
          'Glassware, chemicals and analytical instruments for all prescribed experiments',
          'Fume hood and ventilation for safe handling of chemicals',
          'Safety equipment such as first-aid kit and fire extinguisher',
          'Experiments in volumetric analysis, water quality and instrumental methods',
          'Regular supervision by qualified faculty and lab assistants',
        ],
      },
      {
        tabLabel: 'Physics Lab',
        image: '/facilites/physicslab.png',
        heading: 'Physics Laboratory',
        paragraphs: [
          'The Physics Laboratory helps students verify and understand fundamental concepts such as optics, properties of matter, electricity and thermal physics through hands-on experiments.',
          'Each experiment is set up so that students can take readings, analyse results and write clear lab records on their own, guided by faculty.',
        ],
        highlights: [
          'Spacious lab with individual experiment stations',
          'Instruments for optics, mechanics, electricity and thermal experiments',
          'Spectrometer, travelling microscope, laser and meter-bridge setups',
          'Calibrated measuring instruments for accurate readings',
          'Experiments aligned with the university syllabus',
          'Faculty guidance and lab support during every session',
        ],
      },
    ],
  },
  {
    icon: Wifi,
    title: 'Campus Wi-Fi',
    text: 'High-speed wireless connectivity across the campus.',
    link: '/campus-wifi',
  },
  {
    icon: Trophy,
    title: 'Sports & Recreation',
    text: 'Sports grounds and recreation facilities for student well-being.',
    link: '/sports',
  },
];

/* =========================================================
   STYLES (internal CSS)
   - data-reveal="left"  : slides in from the left, then settles
   - data-reveal="right" : slides in from the right, then settles
   - data-reveal="up"    : content fades up
   - .facility-card      : hover animation
   ========================================================= */

const facilityCss = `
  /* ---------- Scroll reveal (repeats every time you scroll) ---------- */

  .facility-page [data-reveal] {
    opacity: 0;
    will-change: opacity, transform;
    transition:
      opacity .8s ease,
      transform .9s cubic-bezier(.2, .7, .2, 1);
    transition-delay: var(--reveal-delay, 0ms);
  }

  .facility-page [data-reveal="left"]  { transform: translateX(-80px); }
  .facility-page [data-reveal="right"] { transform: translateX(80px); }
  .facility-page [data-reveal="up"]    { transform: translateY(38px); }

  .facility-page [data-reveal].is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  /* ---------- Card hover animation ---------- */

  .facility-card {
    position: relative;
    display: flex;
    flex-direction: column;
    align-items: flex-start;
    height: 100%;
    overflow: hidden;
    padding: 24px;
    border: 1px solid rgba(184, 137, 55, .22);
    border-radius: 16px;
    background: linear-gradient(145deg, #fffdf9, #fbf6ec);
    box-shadow: 0 2px 8px rgba(73, 15, 35, .05);
    transition:
      transform .35s cubic-bezier(.2, .7, .2, 1),
      box-shadow .35s ease,
      border-color .35s ease;
  }

  /* gold line that grows along the bottom edge on hover */
  .facility-card::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, #d8b54c, #f3d98b, #d8b54c);
    transform: scaleX(0);
    transform-origin: left;
    transition: transform .4s ease;
  }

  .facility-card:hover {
    transform: translateY(-8px);
    border-color: rgba(184, 137, 55, .7);
    box-shadow: 0 18px 38px rgba(73, 15, 35, .14);
  }

  .facility-card:hover::after {
    transform: scaleX(1);
  }

  .facility-icon {
    transition:
      transform .4s ease,
      background-color .3s ease,
      color .3s ease,
      box-shadow .3s ease;
  }

  .facility-card:hover .facility-icon {
    transform: rotate(-8deg) scale(1.1);
    box-shadow: 0 8px 18px rgba(110, 24, 50, .22);
  }

  .facility-card-title {
    transition: color .3s ease;
  }

  .facility-card:hover .facility-card-title {
    color: #4a1022;
  }

  .facility-arrow {
    transition: transform .3s ease;
  }

  .facility-card:hover .facility-arrow {
    transform: translateX(5px);
  }

  .facility-button {
    transition:
      transform .3s ease,
      background-color .3s ease,
      color .3s ease,
      box-shadow .3s ease;
  }

  .facility-button:hover {
    transform: translateY(-2px);
    box-shadow: 0 8px 18px rgba(110, 24, 50, .25);
  }

  /* ---------- Popup animation ---------- */

  @keyframes facility-backdrop-in {
    from { opacity: 0; }
    to   { opacity: 1; }
  }

  @keyframes facility-popup-in {
    from { opacity: 0; transform: translateY(40px) scale(.97); }
    to   { opacity: 1; transform: translateY(0) scale(1); }
  }

  @keyframes facility-fade-up {
    from { opacity: 0; transform: translateY(22px); }
    to   { opacity: 1; transform: translateY(0); }
  }

  @keyframes facility-slide-left {
    from { opacity: 0; transform: translateX(-45px); }
    to   { opacity: 1; transform: translateX(0); }
  }

  .facility-backdrop {
    animation: facility-backdrop-in .3s ease both;
  }

  .facility-popup {
    animation: facility-popup-in .5s cubic-bezier(.2, .7, .2, 1) both;
  }

  /* image slides in from the left, text fades up one piece at a time */
  .facility-popup-image {
    animation: facility-slide-left .7s cubic-bezier(.2, .7, .2, 1) .1s both;
  }

  .facility-popup-text > * {
    animation: facility-fade-up .7s cubic-bezier(.2, .7, .2, 1) both;
  }

  .facility-popup-text > *:nth-child(1) { animation-delay: .15s; }
  .facility-popup-text > *:nth-child(2) { animation-delay: .22s; }
  .facility-popup-text > *:nth-child(3) { animation-delay: .29s; }
  .facility-popup-text > *:nth-child(4) { animation-delay: .36s; }
  .facility-popup-text > *:nth-child(5) { animation-delay: .43s; }
  .facility-popup-text > *:nth-child(6) { animation-delay: .5s; }

  .facility-highlight {
    animation: facility-fade-up .6s cubic-bezier(.2, .7, .2, 1) both;
  }

  .facility-popup-close {
    transition: transform .3s ease, background-color .3s ease, color .3s ease;
  }

  .facility-popup-close:hover {
    transform: rotate(90deg);
  }

  /* ---------- Mobile: shorter slide distance ---------- */

  @media (max-width: 640px) {
    .facility-page [data-reveal="left"]  { transform: translateX(-35px); }
    .facility-page [data-reveal="right"] { transform: translateX(35px); }
    .facility-page [data-reveal="up"]    { transform: translateY(26px); }
  }

  /* ---------- Reduced motion ---------- */

  @media (prefers-reduced-motion: reduce) {
    .facility-page [data-reveal] {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .facility-card,
    .facility-card::after,
    .facility-icon,
    .facility-arrow,
    .facility-button,
    .facility-popup-close {
      transition: none;
    }

    .facility-backdrop,
    .facility-popup,
    .facility-popup-image,
    .facility-popup-text > *,
    .facility-highlight {
      animation: none;
    }
  }
`;

export default function Facility() {
  const [active, setActive] = useState<FacilityItem | null>(null);
  const [tab, setTab] = useState(0);
  const pageRef = useRef<HTMLDivElement>(null);

  const openPopup = (item: FacilityItem) => {
    setTab(0); // always start on the first tab
    setActive(item);
  };

  // Scroll reveal: add "is-visible" when an element enters the screen,
  // remove it when it leaves so the animation replays on the next scroll.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');

    if (!('IntersectionObserver' in window)) {
      elements.forEach((el) => el.classList.add('is-visible'));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('is-visible');
          } else {
            entry.target.classList.remove('is-visible');
          }
        });
      },
      { threshold: 0.15, rootMargin: '0px 0px -40px 0px' }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  // Close popup with the Escape key and stop the page behind from scrolling
  useEffect(() => {
    if (!active) return;

    const onKey = (e: KeyboardEvent) => {
      if (e.key === 'Escape') setActive(null);
    };

    document.addEventListener('keydown', onKey);
    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = 'hidden';

    return () => {
      document.removeEventListener('keydown', onKey);
      document.body.style.overflow = previousOverflow;
    };
  }, [active]);

  const buttonClass =
    'facility-button mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon-700 px-5 py-2.5 text-sm font-semibold text-white hover:bg-maroon-800 hover:text-gold';

  const sections = active?.sections ?? [];
  const current = sections[tab] ?? sections[0];

  return (
    <div className="facility-page" ref={pageRef}>
      <style>{facilityCss}</style>

      <PageHero
        eyebrow="World-Class Infrastructure"
        title="Facilities"
        description="Explore the facilities and infrastructure available at ST. Lourdes Engineering College."
        image="/hero/campus4.png"
        breadcrumb="Facilities"
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          {/* Heading: content fades up */}
          <div className="mb-14 text-center" data-reveal="up">
            <p className="eyebrow"></p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Our Campus Facilities
            </h2>

            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f, index) => {
              const Icon = f.icon;

              // Cards slide in from the left and right in turn, then settle.
              const direction = index % 2 === 0 ? 'left' : 'right';

              return (
                // The outer box does the slide-in animation.
                // The inner card does the hover animation, so they never clash.
                <div
                  key={f.title}
                  data-reveal={direction}
                  style={
                    { '--reveal-delay': `${(index % 3) * 100}ms` } as CSSProperties
                  }
                >
                  <div className="facility-card">
                    <div className="flex items-start gap-4">
                      <div className="facility-icon flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600">
                        <Icon className="h-6 w-6" strokeWidth={1.5} />
                      </div>

                      <div>
                        <h3 className="facility-card-title font-serif text-lg font-bold text-maroon-700">
                          {f.title}
                        </h3>

                        <p className="mt-1.5 text-sm leading-relaxed text-black">
                          {f.text}
                        </p>
                      </div>
                    </div>

                    {f.sections ? (
                      <button
                        type="button"
                        onClick={() => openPopup(f)}
                        className={buttonClass}
                      >
                        Explore More
                        <ArrowRight className="facility-arrow h-4 w-4" />
                      </button>
                    ) : (
                      <Link to={f.link} className={buttonClass}>
                        Explore More
                        <ArrowRight className="facility-arrow h-4 w-4" />
                      </Link>
                    )}
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPUP DETAIL CARD — image on the left, details on the right */}
      {active && current && (
        <div
          className="facility-backdrop fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="facility-popup relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gold/30 bg-ivory shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="facility-popup-close absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-maroon-700 text-white hover:bg-maroon-800 hover:text-gold"
            >
              <X className="h-5 w-5" />
            </button>

            {/* TABS — only shown when the facility has 2 or more labs */}
            {sections.length > 1 && (
              <div className="flex gap-2 border-b border-gold/20 bg-white px-4 pb-0 pr-16 pt-4 sm:px-8">
                {sections.map((s, i) => (
                  <button
                    key={s.tabLabel}
                    type="button"
                    onClick={() => setTab(i)}
                    className={`rounded-t-lg px-4 py-2.5 text-sm font-semibold transition-all duration-300 sm:px-6 ${
                      i === tab
                        ? 'bg-maroon-700 text-gold'
                        : 'bg-maroon-50 text-maroon-700 hover:bg-maroon-100'
                    }`}
                  >
                    {s.tabLabel}
                  </button>
                ))}
              </div>
            )}

            {/* key={tab} replays the animation each time a tab is clicked */}
            <div className="grid md:grid-cols-2" key={`${active.title}-${tab}`}>
              {/* LEFT — image slides in from the left */}
              <div className="facility-popup-image relative h-60 md:h-full md:min-h-[420px]">
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.tabLabel}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent" />
              </div>

              {/* RIGHT — explanation fades up piece by piece */}
              <div className="p-6 sm:p-8 lg:p-10">
                <div className="facility-popup-text">
                  <p className="eyebrow">{active.title}</p>

                  <h3 className="mt-2 font-serif text-2xl font-bold text-maroon-700 sm:text-3xl">
                    {current.heading}
                  </h3>

                  <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

                  <div className="mt-4 space-y-3">
                    {current.paragraphs.map((p) => (
                      <p key={p} className="text-sm leading-relaxed text-black">
                        {p}
                      </p>
                    ))}
                  </div>

                  <ul className="mt-5 space-y-2.5">
                    {current.highlights.map((h, i) => (
                      <li
                        key={h}
                        className="facility-highlight flex items-start gap-2.5 text-sm text-black"
                        style={{ animationDelay: `${0.5 + i * 0.07}s` }}
                      >
                        <CheckCircle2
                          className="mt-0.5 h-4 w-4 shrink-0 text-gold"
                          strokeWidth={2}
                        />
                        {h}
                      </li>
                    ))}
                  </ul>

                  <button
                    type="button"
                    onClick={() => setActive(null)}
                    className="facility-button mt-6 inline-flex items-center gap-2 rounded-lg border border-maroon-700 px-5 py-2.5 text-sm font-semibold text-maroon-700 hover:bg-maroon-700 hover:text-gold"
                  >
                    Close
                  </button>
                </div>
              </div>
            </div>
          </div>
        </div>
      )}
    </div>
  );
}