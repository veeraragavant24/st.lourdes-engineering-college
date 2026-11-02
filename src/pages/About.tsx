import { Link } from 'react-router-dom';
import {
  Target,
  Eye,
  Lightbulb,
  Award,
  Users,
  BookOpen,
  ArrowRight,
  Building,
  Heart,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/data/siteConfig';
import { newsItems } from '@/data/news';

const values = [
  {
    icon: Target,
    title: 'Our Mission',
    text: 'To provide quality technical education that empowers students with the knowledge, skills, and values needed to excel in a dynamic global environment.',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To be a center of excellence in engineering and management education, recognized for innovation, integrity, and impactful contributions to society.',
  },
  {
    icon: Lightbulb,
    title: 'Our Values',
    text: 'Integrity, innovation, inclusivity, and a commitment to lifelong learning guide everything we do as an academic community.',
  },
];

const administration = [
  { role: 'Founder', name: 'Ln. Dr. S. Peter', detail: 'Founder & Correspondent' },
  { role: 'Management', name: 'Loordhu Ammal Educational Trust', detail: 'Managing Trust' },
  { role: 'Principal', name: 'To be updated', detail: 'Academic Head' },
];

export default function About() {
  return (
    <>
      <PageHero
        eyebrow="About Our Institution"
        title="About ST. Lourdes"
        description="A pioneering engineering institution committed to academic excellence since 2009."
        image="https://images.pexels.com/photos/11932106/pexels-photo-11932106.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="About Us"
      />

      {/* About content */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-12 lg:grid-cols-2 lg:items-center">
            <div>
              <p className="eyebrow">Our Story</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
                ST. Lourdes Engineering College
              </h2>
              <div className="mt-4 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-6 text-base leading-relaxed text-charcoal/70">
                ST. Lourdes Engineering College is a pioneering institution in Chennai, founded by{' '}
                {siteConfig.founder}. The college was established in {siteConfig.established} under
                the self-financing scheme and is managed by {siteConfig.trust}. It is a Christian
                Minority Institution located on NH45 at Erandam Kattalai, Tharapakkam, near
                Anagaputhur, Chennai – 600128.
              </p>
              <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                The college is committed to providing quality technical education that combines
                academic rigor with practical, industry-relevant skills. Our experienced faculty,
                modern infrastructure, and student-centric approach create an environment where
                future engineers and leaders can thrive.
              </p>
              <div className="mt-8 grid grid-cols-3 gap-4">
                <div className="rounded-xl border border-gold/15 bg-ivory p-4 text-center">
                  <p className="font-serif text-3xl font-bold text-maroon-600">{siteConfig.established}</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/50">Established</p>
                </div>
                <div className="rounded-xl border border-gold/15 bg-ivory p-4 text-center">
                  <p className="font-serif text-3xl font-bold text-maroon-600">7</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/50">Programs</p>
                </div>
                <div className="rounded-xl border border-gold/15 bg-ivory p-4 text-center">
                  <p className="font-serif text-3xl font-bold text-maroon-600">15+</p>
                  <p className="mt-1 text-xs uppercase tracking-wider text-charcoal/50">Years</p>
                </div>
              </div>
            </div>

            <div className="relative">
              <div className="overflow-hidden rounded-2xl shadow-xl">
                <img
                  src="https://images.pexels.com/photos/39658034/pexels-photo-39658034.jpeg?auto=compress&cs=tinysrgb&w=800&h=600&fit=crop"
                  alt="Campus building"
                  className="w-full object-cover"
                  loading="lazy"
                />
              </div>
              <div className="pointer-events-none absolute -inset-3 -z-10 rounded-2xl border border-gold/15" />
              <div className="absolute -bottom-6 -left-6 flex items-center gap-3 rounded-xl bg-maroon-700 px-5 py-4 shadow-xl">
                <Building className="h-8 w-8 text-gold" strokeWidth={1.5} />
                <div>
                  <p className="font-serif text-lg font-bold text-ivory">Christian Minority</p>
                  <p className="text-xs text-ivory/60">Institution</p>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section id="vision" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Guiding Principles</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Mission, Vision &amp; Values
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {values.map((v) => {
              const Icon = v.icon;
              return (
                <div
                  key={v.title}
                  className="group rounded-2xl border border-gold/10 bg-white p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-50 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-serif text-xl font-bold text-maroon-700">{v.title}</h3>
                  <p className="mt-3 text-sm leading-relaxed text-charcoal/60">{v.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Founder */}
      <section id="founder" className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-10 lg:grid-cols-3 lg:items-center">
            <div className="lg:col-span-1">
              <div className="relative mx-auto max-w-xs">
                <div className="overflow-hidden rounded-2xl border-2 border-gold/30 shadow-xl">
                  <img
                    src="https://images.pexels.com/photos/7972324/pexels-photo-7972324.jpeg?auto=compress&cs=tinysrgb&w=400&h=500&fit=crop"
                    alt="Founder"
                    className="w-full object-cover"
                    loading="lazy"
                  />
                </div>
                <div className="absolute -bottom-4 left-1/2 -translate-x-1/2 rounded-full bg-gold px-5 py-2 shadow-lg">
                  <span className="font-serif text-sm font-bold text-maroon-700">Founder</span>
                </div>
              </div>
            </div>
            <div className="lg:col-span-2">
              <p className="eyebrow">Our Founder</p>
              <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
                Ln. Dr. S. Peter
              </h2>
              <div className="mt-4 h-px w-20 bg-gradient-to-r from-gold to-transparent" />
              <p className="mt-6 text-base leading-relaxed text-charcoal/70">
                Ln. Dr. S. Peter founded ST. Lourdes Engineering College with a vision to make
                quality technical education accessible to students from all backgrounds. Under the
                Loordhu Ammal Educational Trust, the college has grown into a respected institution
                serving the engineering education needs of Tamil Nadu and beyond.
              </p>
              <div className="mt-6 flex flex-wrap gap-3">
                <div className="flex items-center gap-2 rounded-lg bg-ivory px-4 py-2.5">
                  <Award className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-maroon-700">Lion, Doctorate</span>
                </div>
                <div className="flex items-center gap-2 rounded-lg bg-ivory px-4 py-2.5">
                  <Heart className="h-5 w-5 text-gold" strokeWidth={1.5} />
                  <span className="text-sm font-medium text-maroon-700">Educationist & Philanthropist</span>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>

      {/* Administration */}
      <section id="administration" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="mb-12 text-center">
            <p className="eyebrow">Leadership</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Administration
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <div className="grid gap-6 md:grid-cols-3">
            {administration.map((admin) => (
              <div
                key={admin.role}
                className="rounded-2xl border border-gold/10 bg-white p-6 text-center shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-maroon-50">
                  <Users className="h-8 w-8 text-maroon-600" strokeWidth={1.5} />
                </div>
                <p className="mt-4 text-xs uppercase tracking-wider text-gold-500">{admin.role}</p>
                <h3 className="mt-2 font-serif text-lg font-bold text-maroon-700">{admin.name}</h3>
                <p className="mt-1 text-sm text-charcoal/50">{admin.detail}</p>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* News summary */}
      <section id="news" className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-10 text-center">
            <p className="eyebrow">Stay Updated</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Latest News &amp; Events
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {newsItems.map((news) => (
              <article
                key={news.id}
                className="group flex flex-col overflow-hidden rounded-xl border border-gold/10 bg-ivory shadow-sm transition-all duration-300 hover:shadow-lg"
              >
                <div className="relative h-40 overflow-hidden">
                  <img
                    src={news.image}
                    alt=""
                    className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
                    loading="lazy"
                  />
                  <div className="absolute left-2 top-2 rounded-lg bg-maroon-700/95 px-2.5 py-1 text-[10px] font-bold text-gold-100">
                    {news.dateLabel}
                  </div>
                </div>
                <div className="flex flex-1 flex-col p-4">
                  <p className="text-[10px] uppercase tracking-wider text-gold-500">{news.department}</p>
                  <h3 className="mt-1.5 font-serif text-sm font-bold text-maroon-700 line-clamp-2">
                    {news.title}
                  </h3>
                  <p className="mt-2 flex-1 text-xs leading-relaxed text-charcoal/55 line-clamp-3">
                    {news.description}
                  </p>
                </div>
              </article>
            ))}
          </div>
        </div>
      </section>

      {/* CTA */}
      <section className="bg-gradient-to-br from-maroon-600 to-maroon-800 py-16">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <BookOpen className="mx-auto h-10 w-10 text-gold" strokeWidth={1.5} />
          <h2 className="mt-4 font-serif text-2xl font-bold text-ivory sm:text-3xl">
            Ready to join our academic community?
          </h2>
          <Link to="/admission" className="btn-gold mt-6">
            Apply for Admission
            <ArrowRight className="h-4 w-4" />
          </Link>
        </div>
      </section>
    </>
  );
}
