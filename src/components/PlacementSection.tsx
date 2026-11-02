import { Link } from 'react-router-dom';
import { ArrowRight, Briefcase, Users, GraduationCap, Handshake } from 'lucide-react';

const features = [
  {
    icon: Briefcase,
    title: 'Placement Support',
    description: 'Dedicated placement cell with experienced coordinators guiding students through every step.',
  },
  {
    icon: Users,
    title: 'Recruiting Companies',
    description: 'A growing network of national and multinational organizations visiting our campus.',
  },
  {
    icon: GraduationCap,
    title: 'Career Guidance',
    description: 'Mentorship, resume workshops, mock interviews, and soft-skills training programs.',
  },
  {
    icon: Handshake,
    title: 'Industry Collaboration',
    description: 'Internships, industrial visits, and guest lectures bridging academia and industry.',
  },
];

export default function PlacementSection() {
  return (
    <section
      data-header-theme="dark" 
    className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 py-20 lg:py-28">
      {/* Decorative elements */}
      <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold/10" />
      <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full border border-gold/5" />
      <div className="pointer-events-none absolute right-1/3 top-1/2 h-40 w-40 rounded-full bg-gold/5" />

      {/* Gold border accents */}
      <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
      <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid items-center gap-12 lg:grid-cols-2">
          {/* Left: content */}
          <div>
            <p className="eyebrow text-gold-100">Your Career. Our Commitment.</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-ivory sm:text-4xl lg:text-5xl">
              Career &amp; Placement Assistance Services
            </h2>
            <div className="mt-4 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
            <p className="mt-6 max-w-xl text-base leading-relaxed text-ivory/70">
              With an experienced team and extensive industry connections, we help you find the right
              opportunities to take your career to the next level.
            </p>

            {/* Feature cards */}
            <div className="mt-8 grid gap-4 sm:grid-cols-2">
              {features.map((f) => {
                const Icon = f.icon;
                return (
                  <div
                    key={f.title}
                    className="group rounded-xl border border-gold/15 bg-maroon-900/40 p-5 backdrop-blur-sm transition-all duration-300 hover:border-gold/30 hover:bg-maroon-900/60"
                  >
                    <div className="flex h-10 w-10 items-center justify-center rounded-lg bg-gold/15 text-gold transition-colors duration-300 group-hover:bg-gold group-hover:text-maroon-700">
                      <Icon className="h-5 w-5" strokeWidth={1.5} />
                    </div>
                    <h3 className="mt-3 font-serif text-base font-semibold text-ivory">{f.title}</h3>
                    <p className="mt-1.5 text-sm leading-relaxed text-ivory/55">{f.description}</p>
                  </div>
                );
              })}
            </div>

            <Link to="/placement" className="btn-gold mt-8">
              Explore Placement
              <ArrowRight className="h-4 w-4" />
            </Link>
          </div>

          {/* Right: image */}
          <div className="relative">
            <div className="relative overflow-hidden rounded-2xl border border-gold/20 shadow-2xl shadow-maroon-900/50">
              <img
                src="https://images.pexels.com/photos/39192317/pexels-photo-39192317.jpeg?auto=compress&cs=tinysrgb&w=900&h=700&fit=crop"
                alt="Students participating in placement preparation"
                className="w-full object-cover"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/50 to-transparent" />
            </div>
            {/* Decorative frame */}
            <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl border border-gold/15" />
            <div className="pointer-events-none absolute -bottom-4 -right-4 h-24 w-24 rounded-full border-2 border-gold/30" />
          </div>
        </div>
      </div>
    </section>
  );
}
