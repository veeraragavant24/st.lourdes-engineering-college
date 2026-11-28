import { Link } from 'react-router-dom';
import { ArrowRight, Eye, Target } from 'lucide-react';

const vision =
  'To be a vibrant and model Institution of Excellence in imparting quality education in the areas of Science, Engineering, Technology and Management and also to orient the aspiring students and scholars towards imbibing the virtues for an overall development to enable them to meet the ever-growing challenges of the Global society.';

const mission =
  'We, at ST. Lourdes Engineering College embody the values of compassion & excellence which is reflected in empathy, care, social outreach, passion & quality. Our mission is to weave together from the diverse fabric of the society, an ensemble of Graduates and post graduates whose qualities of integrity and leadership propel them to selflessly administer the highest quality of Engineering Skills, so as to put back the brightest of smiles on the populace!';

export default function AboutSection() {
  return (
<section className="section-pad bg-ivory">
  <div className="mx-auto max-w-7xl px-5 sm:px-8">
    <div className="mb-12 lg:mb-16">
      <p className="eyebrow text-center">
        Approvals &amp; Affiliation
      </p>

      

      <div className="mt-5 grid max-w-2xl grid-cols-1 gap-4 sm:grid-cols-2 mx-auto">
        {/* Anna University */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <img
            src="/about/anna-university-logo.png"
            alt="Anna University"
            className="h-14 w-auto object-contain"
            loading="lazy"
          />

          <p className="mt-2 font-serif text-xs font-semibold uppercase tracking-wider text-maroon-700">
            Anna University
          </p>
        </div>

        {/* AICTE */}
        <div className="flex flex-col items-center justify-center rounded-xl border border-gold/30 bg-white p-3 text-center shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
          <img
            src="/about/aicte-logo.png"
            alt="AICTE"
            className="h-14 w-auto object-contain"
            loading="lazy"
          />

          <p className="mt-2 font-serif text-xs font-semibold uppercase tracking-wider text-maroon-700">
            All India Council For Technical Education (AICTE)
          </p>
        </div>
      </div>
    </div>
        {/* WELCOME: image left, content right */}
        <div className="grid items-center gap-12 lg:grid-cols-2 lg:gap-16">
          {/* LEFT: Image */}
          <div className="relative pb-5 pr-5">
            <div
              className="pointer-events-none absolute bottom-0 right-0 h-[86%] w-[86%] rounded-3xl border-2 border-gold"
              aria-hidden="true"
            />
            <img
              src="/about/frontview.png"
              alt="ST. Lourdes Engineering College campus"
              className="relative h-80 w-full rounded-3xl object-cover shadow-xl sm:h-[440px]"
              loading="lazy"
            />
          </div>
          

          {/* RIGHT: Content */}
          <div>
            <p className="eyebrow">GREETINGS</p>

            <h2 className="mt-3 font-serif text-4xl font-bold text-maroon-700 sm:text-5xl">
              Welcome to SLEC
            </h2>

            <div className="mt-5 h-[3px] w-16 bg-gradient-to-r from-gold to-transparent" />

<p className="mt-6 text-base leading-8 text-black">
             ST. Lourdes Engineering College is a pioneering institution in Chennai. ST. Lourdes Engineering College founded by Ln. Dr. S. Peter, which is one of the reputed Engineering Colleges started under self-financing scheme in the year 2009. ST. Lourdes Engineering College is one among the best Christian Minority Institutions in Chennai and this institution is established under Loordhu Ammal Educational Trust. ST. Lourdes Engineering College is located in NH45, at the best and peaceful place in Chennai city.
            </p>

            <Link
              to="/about"
              className="mt-8 inline-flex items-center gap-2.5 rounded-full bg-gradient-to-r from-gold-100 to-gold px-7 py-3.5 text-sm font-semibold text-maroon-800 transition-all duration-300 hover:-translate-y-1 hover:shadow-lg"
            >
              Know More About Us
              <ArrowRight className="h-[18px] w-[18px]" />
            </Link>
          </div>
        </div>

        </div>
    </section>
  );
}
