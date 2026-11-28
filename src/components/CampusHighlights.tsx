import { Link } from 'react-router-dom';
import { BookOpen, Building2, Briefcase, ArrowRight } from 'lucide-react';

interface Highlight {
  id: string;
  title: string;
  description: string;
  features: string[];
  buttonLabel: string;
  buttonLink: string;
  image: string;
  icon: typeof BookOpen;
}

const highlights: Highlight[] = [
  {
    id: 'library',
    title: 'Library',
    description:
      'The Central Library at our college is a state-of-the-art facility that serves as the intellectual hub for our academic community.',
    features: [
      'Extensive collection of books and e-resources',
      'Digital library and online journals',
      'Spacious reading halls and group study rooms',
    ],
    buttonLabel: 'Explore Library',
    buttonLink: '/facilities',
    image:
      '/facilites/liberary (1).png',
    icon: BookOpen,
  },
  {
    id: 'hostel',
    title: 'Hostel',
    description:
      'Our college facilitates students with excellent hostel facilities, offering a comfortable home away from home.',
    features: [
      'Separate hostels for boys and girls',
      'Safe and comfortable accommodation',
      'Nutritious food and hygiene facilities',
      'Recreational and study facilities',
    ],
    buttonLabel: 'Explore Hostel',
    buttonLink: '/facilities',
    image:
      '/facilites/hostel.png',
    icon: Building2,
  },
  {
    id: 'placement',
    title: 'Placement',
    description:
      'The Placement Office facilitates campus recruitment for multinational and national organizations.',
    features: [
      'Career guidance and training programs',
      'Industry interactions and internships',
      'Campus recruitment drives',
      'Strong alumni network support',
    ],
    buttonLabel: 'Placement Overview',
    buttonLink: '/placement',
    image:
      '/facilites/placement.png',
    icon: Briefcase,
  },
];

export default function CampusHighlights() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-14 text-center">
          <p className="eyebrow">Experience Our Campus</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
            Campus Highlights
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-black">
            Discover the facilities, learning resources, and student support that enrich campus life.
          </p>
        </div>

{/* Cards */}
<div className="grid gap-8 md:grid-cols-2 lg:grid-cols-3 lg:gap-6">
  {highlights.map((h) => {
    const Icon = h.icon;
    return (
      <article
        key={h.id}
        className="group flex flex-col overflow-hidden rounded-2xl border border-gold/10 bg-ivory shadow-sm transition-all duration-500 hover:-translate-y-2 hover:shadow-2xl hover:shadow-maroon-900/15"
      >
        {/* Image + icon wrapper (NO overflow-hidden here) */}
        <div className="relative z-10 h-56">
          {/* Inner wrapper clips only the image */}
          <div className="absolute inset-0 overflow-hidden">
            <img
              src={h.image}
              alt=""
              className="h-full w-full object-cover transition-transform duration-700 group-hover:scale-110"
              loading="lazy"
            />
            <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/30 to-transparent" />
          </div>

          {/* Overlapping circular icon (now free to overflow) */}
          <div className="absolute -bottom-7 left-6 z-20 flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-white shadow-lg transition-transform duration-300 group-hover:scale-110">
            <Icon className="h-7 w-7 text-maroon-600" strokeWidth={1.5} />
          </div>
        </div>

        {/* Content */}
        <div className="relative z-0 flex flex-1 flex-col p-6 pt-10">
          <h3 className="font-serif text-xl font-bold text-maroon-700">{h.title}</h3>
          <p className="mt-3 text-sm leading-relaxed text-black">{h.description}</p>
          <ul className="mt-4 space-y-2">
            {h.features.map((f) => (
              <li key={f} className="flex items-start gap-2 text-sm text-black">
                <span className="mt-1.5 h-1.5 w-1.5 shrink-0 rounded-full bg-gold" />
                {f}
              </li>
            ))}
          </ul>
          <Link to={h.buttonLink} className="btn-maroon mt-6 self-start">
            {h.buttonLabel}
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </article>
    );
  })}
</div>
      </div>
    </section>
  );
}
