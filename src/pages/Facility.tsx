import { useEffect, useState } from 'react';
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
        // 👉 Put your photos in the "public/facilities" folder
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

export default function Facility() {
  const [active, setActive] = useState<FacilityItem | null>(null);
  const [tab, setTab] = useState(0);

  const openPopup = (item: FacilityItem) => {
    setTab(0); // always start on the first tab
    setActive(item);
  };

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
    'mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon-700 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-maroon-800 hover:text-gold';

  const sections = active?.sections ?? [];
  const current = sections[tab] ?? sections[0];

  return (
    <>
      <PageHero
        eyebrow="World-Class Infrastructure"
        title="Facilities"
        description="Explore the facilities and infrastructure available at ST. Lourdes Engineering College."
        image="/hero/campus4.png"
        breadcrumb="Facilities"
      />

      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">World-Class Infrastructure</p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Our Campus Facilities
            </h2>

            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-3">
            {facilities.map((f) => {
              const Icon = f.icon;

              return (
                <div
                  key={f.title}
                  className="group flex flex-col items-start rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex items-start gap-4">
                    <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                      <Icon className="h-6 w-6" strokeWidth={1.5} />
                    </div>

                    <div>
                      <h3 className="font-serif text-lg font-bold text-maroon-700">
                        {f.title}
                      </h3>

                      <p className="mt-1.5 text-sm leading-relaxed text-charcoal/60">
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
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </button>
                  ) : (
                    <Link to={f.link} className={buttonClass}>
                      Explore More
                      <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
                    </Link>
                  )}
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* POPUP DETAIL CARD — image on the left, details on the right */}
      {active && current && (
        <div
          className="fixed inset-0 z-[100] flex items-center justify-center overflow-y-auto bg-black/60 p-4 backdrop-blur-sm"
          onClick={() => setActive(null)}
          role="dialog"
          aria-modal="true"
          aria-label={active.title}
        >
          <div
            className="relative my-auto w-full max-w-5xl overflow-hidden rounded-2xl border border-gold/30 bg-ivory shadow-2xl"
            onClick={(e) => e.stopPropagation()}
          >
            {/* Close button */}
            <button
              type="button"
              onClick={() => setActive(null)}
              aria-label="Close"
              className="absolute right-3 top-3 z-20 flex h-9 w-9 items-center justify-center rounded-full bg-maroon-700 text-white transition-colors hover:bg-maroon-800 hover:text-gold"
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

            <div className="grid md:grid-cols-2">
              {/* LEFT — image */}
              <div className="relative h-60 md:h-full md:min-h-[420px]">
                <img
                  key={current.image}
                  src={current.image}
                  alt={current.tabLabel}
                  className="absolute inset-0 h-full w-full object-cover"
                />
                <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/60 via-transparent to-transparent" />
              </div>

              {/* RIGHT — explanation */}
              <div className="p-6 sm:p-8 lg:p-10">
                <p className="eyebrow">{active.title}</p>

                <h3 className="mt-2 font-serif text-2xl font-bold text-maroon-700 sm:text-3xl">
                  {current.heading}
                </h3>

                <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

                <div className="mt-4 space-y-3">
                  {current.paragraphs.map((p) => (
                    <p
                      key={p}
                      className="text-sm leading-relaxed text-charcoal/70"
                    >
                      {p}
                    </p>
                  ))}
                </div>

                <ul className="mt-5 space-y-2.5">
                  {current.highlights.map((h) => (
                    <li
                      key={h}
                      className="flex items-start gap-2.5 text-sm text-charcoal/80"
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
                  className="mt-6 inline-flex items-center gap-2 rounded-lg border border-maroon-700 px-5 py-2.5 text-sm font-semibold text-maroon-700 transition-all duration-300 hover:bg-maroon-700 hover:text-gold"
                >
                  Close
                </button>
              </div>
            </div>
          </div>
        </div>
      )}
    </>
  );
}