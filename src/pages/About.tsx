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
    text: 'We, at ST. Lourdes Engineering College embody the values of compassion & excellence which is reflected in empathy, care, social outreach, passion & quality. Our mission is to weave together from the diverse fabric of the society, an ensemble of Graduates and post graduates whose qualities of integrity and leadership propel them to selflessly administer the highest quality of Engineering Skills, so as to put back the brightest of smiles on the populace!',
  },
  {
    icon: Eye,
    title: 'Our Vision',
    text: 'To be a vibrant and model Institution of Excellence in imparting quality education in the areas of Science, Engineering, Technology and Management and also to orient the aspiring students and scholars towards imbibing the virtues for an overall development to enable them to meet the ever-growing challenges of the Global society.',
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
        image="/about/campus2.png"
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
                <p className="mt-4 text-base leading-relaxed text-charcoal/70">
                Strategically located on NH45, St. Lourdes Engineering College offers a serene and conducive learning environment within Chennai city. The campus provides a peaceful atmosphere that supports academic excellence, innovation, and holistic student development.
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
                  src="/about/campus3.png"
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
            className="group rounded-2xl border border-gold/30 bg-maroon-700 p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl hover:shadow-black/20"
          >
            {/* Icon: golden on a soft gold-tinted circle */}
            <div className="flex h-14 w-14 items-center justify-center rounded-full border border-gold/40 bg-gold/10 text-gold transition-all duration-300 group-hover:bg-gold group-hover:text-maroon-700">
              <Icon className="h-7 w-7" strokeWidth={1.5} />
            </div>

            {/* Title: white */}
            <h3 className="mt-5 font-serif text-xl font-bold text-white">
              {v.title}
            </h3>

            {/* Text: white */}
            <p className="mt-3 text-sm leading-relaxed text-white">
              {v.text}
            </p>
          </div>
        );
      })}
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
