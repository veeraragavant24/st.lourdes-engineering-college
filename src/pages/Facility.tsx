
import {
  BookOpen,
  Building2,
  Cpu,
  FlaskConical,
  Trophy,
  Wifi,
  ArrowRight,
} from 'lucide-react';

import { Link } from 'react-router-dom';
import PageHero from '@/components/PageHero';

const facilities = [
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
  },
  {
    icon: FlaskConical,
    title: 'Science Laboratories',
    text: 'Well-equipped labs for electronics, physics, and chemistry.',
    link: '/laboratories',
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
  return (
    <>
      <PageHero
        eyebrow="World-Class Infrastructure"
        title="Facilities"
        description="Explore the facilities and infrastructure available at ST. Lourdes Engineering College."
        image="https://images.pexels.com/photos/8199762/pexels-photo-8199762.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
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
<Link
  to={f.link}
  className="mt-5 inline-flex items-center gap-2 rounded-lg bg-maroon-700 px-5 py-2.5 text-sm font-semibold text-white transition-all duration-300 hover:bg-maroon-800 hover:text-gold"
>
  Explore More
  <ArrowRight className="h-4 w-4 transition-transform duration-300 group-hover:translate-x-1" />
</Link>
                </div>
              );
            })}
          </div>
        </div>
      </section>
    </>
  );
}
