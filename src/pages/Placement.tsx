
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import { useAdmissionModal } from '@/components/AdmissionModalContext';
import {
  BriefcaseBusiness,
  Users,
  GraduationCap,
  Handshake,
  ArrowRight,
  TrendingUp,
  Target,
  Award,
  CalendarDays,
  Building2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
} from 'lucide-react';
import PageHero from '@/components/PageHero';

const features = [
  {
    icon: BriefcaseBusiness,
    number: '01',
    title: 'Placement Support',
    text: 'A dedicated placement cell coordinates campus recruitment drives, pre-placement training, and interview preparation for every eligible student.',
  },
  {
    icon: Users,
    number: '02',
    title: 'Recruiting Companies',
    text: 'National and multinational organizations across IT, core engineering, and consulting visit our campus for recruitment.',
  },
  {
    icon: GraduationCap,
    number: '03',
    title: 'Career Guidance',
    text: 'Mentorship programmes, resume workshops, mock interviews, and soft-skills training prepare students for professional success.',
  },
  {
    icon: Handshake,
    number: '04',
    title: 'Industry Collaboration',
    text: 'Internships, industrial visits, and guest lectures by industry leaders bridge the gap between academic learning and industry expectations.',
  },
];

const process = [
  {
    icon: Target,
    number: '01',
    title: 'Training & Preparation',
    text: 'Aptitude training, technical workshops, and communication-skills sessions prepare students for recruitment.',
  },
  {
    icon: CalendarDays,
    number: '02',
    title: 'Campus Recruitment Drives',
    text: 'Companies conduct recruitment drives involving written tests, group discussions, and interviews.',
  },
  {
    icon: Building2,
    number: '03',
    title: 'Industry Internships',
    text: 'Students gain real-world exposure through internships and industry-based learning opportunities.',
  },
  {
    icon: Award,
    number: '04',
    title: 'Alumni Network',
    text: 'Our alumni community provides mentorship, professional guidance, and valuable industry connections.',
  },
];

const recruiters = [
  { name: 'TCS', sub: 'TATA CONSULTANCY SERVICES', color: '#2563eb', style: 'tcs' },
  { name: 'Infosys', sub: 'Navigate Your Next', color: '#0874c9', style: 'infosys' },
  { name: 'Wipro', sub: 'Spirit of Wipro', color: '#4338ca', style: 'wipro' },
  { name: 'Accenture', sub: 'Let there be change', color: '#6b21a8', style: 'accenture' },
  { name: 'Cognizant', sub: 'Engineering the Modern Business', color: '#1747a6', style: 'cognizant' },
  { name: 'Capgemini', sub: 'Get the Future You Want', color: '#1677c8', style: 'capgemini' },
  { name: 'Flipkart', sub: 'The Big Billion Days', color: '#2874f0', style: 'flipkart' },
  { name: 'Amazon', sub: 'Work hard. Have fun.', color: '#111827', style: 'amazon' },
  { name: 'HCLTech', sub: 'Supercharging Progress', color: '#0876b9', style: 'hcl' },
  { name: 'IBM', sub: 'Technology & Innovation', color: '#1766a6', style: 'ibm' },
  { name: 'Hexaware', sub: 'Automate Everything', color: '#087f8c', style: 'hexaware' },
  { name: 'Tech Mahindra', sub: 'Scale at Speed', color: '#e34235', style: 'techmahindra' },
];

/* --------------------------------------------------
   REPEATING SCROLL REVEAL
   -------------------------------------------------- */

function useScrollReveal() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('is-visible');
          } else {
            // Remove the class when the element leaves the viewport.
            // This allows the animation to replay on the next scroll.
            element.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -45px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return pageRef;
}

/* --------------------------------------------------
   TOP RECRUITERS
   -------------------------------------------------- */

function RecruitersSection() {
  const repeatedRecruiters = [...recruiters, ...recruiters];

  return (
    <section className="placement-recruiters relative overflow-hidden">
      <div className="placement-recruiters-decoration placement-decoration-one" />
      <div className="placement-recruiters-decoration placement-decoration-two" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center" data-reveal="fade">
          <span className="placement-gold-label">
            <Sparkles size={15} />
            OUR HIRING PARTNERS
          </span>

          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Top Recruiters
          </h2>

          <div className="placement-heading-line" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            We aim to connect our students with leading organisations and
            create opportunities for a successful professional future.
          </p>
        </div>

        <div className="recruiter-marquee" aria-label="Recruiting company names">
          <div className="recruiter-track">
            {repeatedRecruiters.map((company, index) => (
              <div
                key={`${company.style}-${index}`}
                className={`recruiter-card recruiter-${company.style}`}
                aria-hidden={index >= recruiters.length}
              >
                <div
                  className="recruiter-brand-name"
                  style={{ color: company.color }}
                >
                  {company.name}
                </div>

                <span className="recruiter-brand-sub">
                  {company.sub}
                </span>
              </div>
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs tracking-wide text-white/50">
          Hover over the company cards to pause the carousel
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   MAIN PLACEMENT PAGE
   -------------------------------------------------- */

export default function Placement() {
  const { openModal } = useAdmissionModal();
  const pageRef = useScrollReveal();

  return (
    <div ref={pageRef} className="placement-page">
      <style>{`
        /* Scroll reveal base */
        [data-reveal] {
          opacity: 0;
          will-change: opacity, transform;
          transition:
            opacity .85s ease,
            transform .85s cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        [data-reveal="left"] {
          transform: translateX(-75px);
        }

        [data-reveal="right"] {
          transform: translateX(75px);
        }

        [data-reveal="up"] {
          transform: translateY(45px);
        }

        [data-reveal="fade"] {
          transform: translateY(20px);
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .placement-features {
          background: #fffdf9;
        }

        .placement-feature-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(184,137,55,.19);
          background: linear-gradient(145deg,#fff,#fffaf3);
          border-radius: 20px;
          padding: 30px;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }

        .placement-feature-card:hover {
          transform: translateY(-7px);
          border-color: rgba(184,137,55,.65);
          box-shadow: 0 18px 40px rgba(73,15,35,.10);
        }

        .placement-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 16px;
          color: #801b3a;
          background: linear-gradient(145deg,#fff0ce,#f7d783);
          transition: all .35s ease;
        }

        .placement-feature-card:hover .placement-icon {
          background: #741632;
          color: #f5ce75;
          transform: rotate(-5deg);
        }

        .placement-process {
          background:
            radial-gradient(circle at 10% 20%,rgba(220,181,94,.09),transparent 25%),
            linear-gradient(135deg,#fffaf5,#f8f0ed);
        }

        .placement-step-card {
          position: relative;
          min-height: 220px;
          padding: 28px 23px;
          border-radius: 19px;
          background: linear-gradient(145deg,#791936,#4c1026);
          color: white;
          box-shadow: 0 12px 28px rgba(74,13,35,.12);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .placement-step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 35px rgba(74,13,35,.22);
        }

        .placement-step-number {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: 30px;
          color: #541326;
          background: linear-gradient(120deg,#f8dc9a,#e6b950);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .placement-step-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          color: #f3ca72;
          background: rgba(255,255,255,.09);
          border: 1px solid rgba(245,205,119,.2);
        }

        .placement-recruiters {
          padding: 90px 0 85px;
          background: linear-gradient(115deg,#4d1026,#791936 55%,#4c1026);
        }

        .placement-recruiters-decoration {
          position: absolute;
          width: 370px;
          height: 370px;
          border: 1px solid rgba(244,204,120,.12);
          border-radius: 50%;
          pointer-events: none;
        }

        .placement-decoration-one {
          top: -230px;
          left: -100px;
        }

        .placement-decoration-two {
          bottom: -260px;
          right: -90px;
        }

        .placement-gold-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #f4ce7c;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .placement-heading-line {
          width: 75px;
          height: 2px;
          margin: 20px auto 0;
          background: linear-gradient(90deg,transparent,#e9bd65,transparent);
        }

        .recruiter-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 14px 0 20px;
          -webkit-mask-image: linear-gradient(to right,transparent,black 5%,black 95%,transparent);
          mask-image: linear-gradient(to right,transparent,black 5%,black 95%,transparent);
        }

        .recruiter-track {
          display: flex;
          width: max-content;
          gap: 22px;
          animation: recruiter-scroll 36s linear infinite;
          will-change: transform;
        }

        .recruiter-marquee:hover .recruiter-track,
        .recruiter-marquee:focus-within .recruiter-track {
          animation-play-state: paused;
        }

        .recruiter-card {
          width: 185px;
          height: 112px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 9px;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.75);
          background: #fff;
          box-shadow: 0 8px 22px rgba(0,0,0,.14);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .recruiter-card:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 15px 30px rgba(0,0,0,.22);
        }

        .recruiter-brand-name {
          font-size: 24px;
          font-weight: 800;
          letter-spacing: -.8px;
          text-align: center;
        }

        .recruiter-brand-sub {
          max-width: 90%;
          color: #747474;
          font-size: 8px;
          font-weight: 700;
          letter-spacing: .7px;
          text-align: center;
          text-transform: uppercase;
        }

        .recruiter-flipkart {
          background: #ffe500;
          border-color: #fff3a1;
        }

        .recruiter-flipkart .recruiter-brand-name {
          font-style: italic;
          font-weight: 900;
        }

        .recruiter-accenture .recruiter-brand-name::before {
          content: '>';
          color: #a100ff;
          margin-right: 2px;
        }

        .placement-cta {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg,rgba(71,12,34,.97),rgba(120,24,54,.92));
        }

        .placement-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 27px;
          border-radius: 50px;
          background: linear-gradient(120deg,#f7dc9c,#e6b953);
          color: #591329;
          font-size: 14px;
          font-weight: 800;
          transition: all .3s ease;
        }

        .placement-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(230,185,83,.25);
        }

        .placement-outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 27px;
          border: 1px solid rgba(255,255,255,.65);
          border-radius: 50px;
          color: white;
          font-size: 14px;
          font-weight: 700;
          transition: all .3s ease;
        }

        .placement-outline-button:hover {
          color: #f5d58b;
          border-color: #f5d58b;
          background: rgba(255,255,255,.07);
        }

        @keyframes recruiter-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media(max-width:768px) {
          .placement-recruiters {
            padding: 65px 0;
          }

          .recruiter-card {
            width: 150px;
            height: 96px;
          }

          .recruiter-brand-name {
            font-size: 20px;
          }

          .recruiter-track {
            gap: 14px;
            animation-duration: 28s;
          }

          .placement-step-card {
            min-height: auto;
          }

          [data-reveal="left"] {
            transform: translateX(-35px);
          }

          [data-reveal="right"] {
            transform: translateX(35px);
          }
        }

        @media(prefers-reduced-motion:reduce) {
          [data-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .recruiter-track {
            animation: none;
          }
        }
      `}</style>

      {/* HERO */}
      <PageHero
        eyebrow="YOUR CAREER. OUR COMMITMENT."
        title="Career & Placement Assistance"
        description="With an experienced team and extensive industry connections, we help you find the right opportunities to take your career to the next level."
        image="https://images.pexels.com/photos/39192317/pexels-photo-39192317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="Placement"
      />

      {/* PLACEMENT SUPPORT */}
      <section className="placement-features section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 text-center" data-reveal="fade">
            <p className="eyebrow">COMPREHENSIVE SUPPORT</p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              How We Support Your Career
            </h2>

            <div className="placement-heading-line" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-charcoal/65 sm:text-base">
              Our placement cell works throughout the year to connect students
              with opportunities that match their skills, interests and aspirations.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2">
            {features.map((feature, index) => {
              const Icon = feature.icon;

              return (
                <div
                  key={feature.number}
                  data-reveal={index % 2 === 0 ? 'left' : 'right'}
                  style={{ '--reveal-delay': `${index % 2 === 0 ? 0 : 140}ms` } as React.CSSProperties}
                  className="placement-feature-card group"
                >
                  <div className="flex items-start gap-5">
                    <div className="placement-icon">
                      <Icon size={28} strokeWidth={1.7} />
                    </div>

                    <div className="min-w-0 flex-1">
                      <span className="text-xs font-bold tracking-widest text-gold-700">
                        {feature.number} / PLACEMENT
                      </span>

                      <h3 className="mt-2 font-serif text-xl font-bold text-maroon-700 sm:text-2xl">
                        {feature.title}
                      </h3>

                      <p className="mt-3 text-sm leading-7 text-charcoal/65">
                        {feature.text}
                      </p>
                    </div>

                    <ArrowRight
                      size={20}
                      className="mt-1 shrink-0 text-gold opacity-0 transition-all duration-300 group-hover:translate-x-1 group-hover:opacity-100"
                    />
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* PLACEMENT PROCESS */}
      <section className="placement-process section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 text-center" data-reveal="fade">
            <p className="eyebrow">THE JOURNEY</p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Placement Process
            </h2>

            <div className="placement-heading-line" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-charcoal/65">
              A structured journey that helps students build confidence,
              develop professional skills and prepare for recruitment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  data-reveal={index % 2 === 0 ? 'right' : 'left'}
                  style={{ '--reveal-delay': `${index * 110}ms` } as React.CSSProperties}
                  className="placement-step-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="placement-step-number">
                      STEP {step.number}
                    </span>

                    <div className="placement-step-icon">
                      <Icon size={27} strokeWidth={1.7} />
                    </div>
                  </div>

                  <h3 className="mt-7 font-serif text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/75">
                    {step.text}
                  </p>

                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* TOP RECRUITERS */}
      <RecruitersSection />

      {/* CTA */}
      <section className="placement-cta py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full border border-gold/20" />
        <div className="pointer-events-none absolute -left-36 bottom-0 h-96 w-96 rounded-full border border-gold/10" />

        <div
          className="relative mx-auto max-w-5xl px-5 text-center sm:px-8"
          data-reveal="up"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-white/10 text-gold">
            <TrendingUp size={34} strokeWidth={1.5} />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[3px] text-gold">
            YOUR FUTURE STARTS HERE
          </p>

          <h2 className="mt-4 font-serif text-3xl font-bold text-ivory sm:text-4xl lg:text-5xl">
            Ready to Launch Your Career?
          </h2>

          <div className="placement-heading-line" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ivory/75 sm:text-base">
            Join a community of learners and achievers. Apply today and take
            the first step toward a rewarding engineering career.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openModal}
              className="placement-cta-button"
            >
              Apply for Admission
              <ArrowRight size={18} />
            </button>

            <Link to="/programs" className="placement-outline-button">
              Explore Programs
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/65">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Career Guidance
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Industry Exposure
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Professional Development
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}
