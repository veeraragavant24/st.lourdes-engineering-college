import { Link } from 'react-router-dom';
import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import {
  Target,
  Eye,
  Lightbulb,
  BookOpen,
  ArrowRight,
  Building,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/data/siteConfig';

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

/* sets the stagger delay for a reveal element */
const delay = (ms: number) => ({ '--reveal-delay': `${ms}ms` }) as CSSProperties;

function CountUp({
  end,
  suffix = '',
  duration = 2000,
}: {
  end: number;
  suffix?: string;
  duration?: number;
}) {
  const ref = useRef<HTMLParagraphElement>(null);
  const [value, setValue] = useState(0);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    let raf = 0;
    const reduceMotion = window.matchMedia('(prefers-reduced-motion: reduce)').matches;

    const start = () => {
      if (reduceMotion) {
        setValue(end);
        return;
      }
      const t0 = performance.now();
      const tick = (now: number) => {
        const progress = Math.min((now - t0) / duration, 1);
        const eased = 1 - Math.pow(1 - progress, 3);
        setValue(Math.round(end * eased));
        if (progress < 1) raf = requestAnimationFrame(tick);
      };
      raf = requestAnimationFrame(tick);
    };

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          start();
          observer.disconnect();
        }
      },
      { threshold: 0.4 }
    );
    observer.observe(el);

    return () => {
      observer.disconnect();
      cancelAnimationFrame(raf);
    };
  }, [end, duration]);

  return (
    <p ref={ref} className="ab-stat-num">
      {value}
      {suffix}
    </p>
  );
}

/* ---------------- INTERNAL CSS ---------------- */
const aboutCss = `
  /* Theme colours – replace with the exact values from your tailwind.config */
  .ab-section,
  .ab-cta {
    --maroon-600: #6d1426;
    --maroon-700: #5a0f20;
    --maroon-800: #470a18;
    --gold: #c9a24a;
    --gold-rgb: 201, 162, 74;
    --ivory: #fff8ee;
    --ivory-rgb: 255, 248, 238;
    --charcoal-rgb: 38, 38, 38;
    --font-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;
  }

  /* stops the slide-in from creating a sideways scrollbar */
  .ab-page { overflow-x: clip; }

  /* ---------- Scroll reveal (replays on every scroll) ----------
     left  : slides in from the left, then settles
     right : slides in from the right, then settles
     up    : content fades up
  ---------------------------------------------------------------- */
  .ab-page [data-reveal] {
    opacity: 0;
    will-change: opacity, transform;
    transition:
      opacity .8s ease,
      transform .9s cubic-bezier(.2, .7, .2, 1);
    transition-delay: var(--reveal-delay, 0ms);
  }
  .ab-page [data-reveal="left"]  { transform: translateX(-80px); }
  .ab-page [data-reveal="right"] { transform: translateX(80px); }
  .ab-page [data-reveal="up"]    { transform: translateY(38px); }
  .ab-page [data-reveal].is-visible {
    opacity: 1;
    transform: translate3d(0, 0, 0);
  }

  /* wrapper keeps the slide-in separate from the card's hover lift */
  .ab-reveal-box { height: 100%; }

  /* ---------- Sections ---------- */
  .ab-bg-white { background-color: #ffffff; }
  .ab-bg-ivory { background-color: var(--ivory); }

  .ab-container {
    margin-left: auto;
    margin-right: auto;
    max-width: 80rem;
  }

  /* ---------- Our Story ---------- */
  .ab-story-grid {
    display: grid;
    gap: 3rem;
  }
  @media (min-width: 1024px) {
    .ab-story-grid {
      grid-template-columns: repeat(2, minmax(0, 1fr));
      align-items: center;
    }
  }

  .ab-title {
    margin-top: 0.75rem;
    font-family: var(--font-serif);
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: var(--maroon-700);
  }
  @media (min-width: 640px) {
    .ab-title {
      font-size: 2.25rem;
      line-height: 2.5rem;
    }
  }

  .ab-divider-left {
    margin-top: 1rem;
    height: 1px;
    width: 5rem;
    background-image: linear-gradient(to right, var(--gold), transparent);
  }

  .ab-divider-center {
    margin: 1rem auto 0;
    height: 1px;
    width: 5rem;
    background-image: linear-gradient(to right, transparent, var(--gold), transparent);
  }

  .ab-text {
    margin-top: 1.5rem;
    font-size: 1rem;
    line-height: 1.625;
    color: #000000;
  }
  .ab-text-tight { margin-top: 1rem; }

  /* Stats */
  .ab-stats {
    margin-top: 2rem;
    display: grid;
    grid-template-columns: repeat(3, minmax(0, 1fr));
    gap: 1rem;
  }
  .ab-stat {
    border-radius: 0.75rem;
    border: 1px solid rgba(var(--gold-rgb), 0.15);
    background-color: #ecb84f;
    padding: 1rem;
    text-align: center;
    transition:
      transform 350ms cubic-bezier(.2, .7, .2, 1),
      box-shadow 350ms ease,
      border-color 350ms ease;
  }
  .ab-stat:hover {
    transform: translateY(-6px) scale(1.04);
    border-color: rgba(var(--gold-rgb), 0.8);
    box-shadow: 0 14px 26px rgba(90, 15, 32, 0.22);
  }
  .ab-stat-num {
    font-family: var(--font-serif);
    font-size: 1.875rem;
    line-height: 2.25rem;
    font-weight: 700;
    color: var(--maroon-600);
    font-variant-numeric: tabular-nums;
  }
  .ab-stat-label {
    margin-top: 0.25rem;
    font-size: 0.75rem;
    line-height: 1rem;
    text-transform: uppercase;
    letter-spacing: 0.05em;
    color: #000000;
  }

  /* Image + badge */
  .ab-image-wrap { position: relative; }
  .ab-image-frame {
    overflow: hidden;
    border-radius: 1rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    transition: box-shadow 400ms ease;
  }
  .ab-image {
    display: block;
    width: 100%;
    object-fit: cover;
    transition: transform 650ms ease;
  }
  .ab-image-wrap:hover .ab-image {
    transform: scale(1.05);
  }
  .ab-image-wrap:hover .ab-image-frame {
    box-shadow: 0 28px 40px -8px rgba(90, 15, 32, 0.28);
  }
  .ab-image-border {
    pointer-events: none;
    position: absolute;
    inset: -0.75rem;
    z-index: -10;
    border-radius: 1rem;
    border: 1px solid rgba(var(--gold-rgb), 0.15);
    transition: inset 400ms ease, border-color 400ms ease;
  }
  .ab-image-wrap:hover .ab-image-border {
    inset: -1rem;
    border-color: rgba(var(--gold-rgb), 0.6);
  }
  .ab-badge {
    position: absolute;
    bottom: -1.5rem;
    left: -1.5rem;
    display: flex;
    align-items: center;
    gap: 0.75rem;
    border-radius: 0.75rem;
    background-color: var(--maroon-700);
    padding: 1rem 1.25rem;
    box-shadow: 0 20px 25px -5px rgba(0, 0, 0, 0.1), 0 8px 10px -6px rgba(0, 0, 0, 0.1);
    transition: transform 400ms cubic-bezier(.2, .7, .2, 1);
  }
  .ab-image-wrap:hover .ab-badge {
    transform: translateY(-6px);
  }
  .ab-badge-icon {
    width: 2rem;
    height: 2rem;
    color: var(--gold);
    transition: transform 400ms ease;
  }
  .ab-image-wrap:hover .ab-badge-icon {
    transform: rotate(-8deg) scale(1.12);
  }
  .ab-badge-title {
    font-family: var(--font-serif);
    font-size: 1.125rem;
    line-height: 1.75rem;
    font-weight: 700;
    color: var(--ivory);
  }
  .ab-badge-sub {
    font-size: 0.75rem;
    line-height: 1rem;
    color: rgba(var(--ivory-rgb), 0.6);
  }

  /* ---------- Mission / Vision / Values ---------- */
  .ab-values-head {
    margin-bottom: 3rem;
    text-align: center;
  }
  .ab-values-grid {
    display: grid;
    gap: 1.5rem;
  }
  @media (min-width: 768px) {
    .ab-values-grid { grid-template-columns: repeat(3, minmax(0, 1fr)); }
  }

  .ab-value-card {
    position: relative;
    height: 100%;
    overflow: hidden;
    border-radius: 1rem;
    border: 1px solid rgba(var(--gold-rgb), 0.3);
    background-color: var(--maroon-700);
    padding: 1.75rem;
    box-shadow: 0 1px 2px 0 rgba(0, 0, 0, 0.05);
    transition:
      transform 350ms cubic-bezier(.2, .7, .2, 1),
      box-shadow 350ms ease,
      border-color 350ms ease;
  }

  /* gold line that grows along the bottom edge on hover */
  .ab-value-card::after {
    content: "";
    position: absolute;
    left: 0;
    bottom: 0;
    width: 100%;
    height: 3px;
    background: linear-gradient(90deg, var(--gold), #f3d98b, var(--gold));
    transform: scaleX(0);
    transform-origin: left;
    transition: transform 450ms ease;
  }

  .ab-value-card:hover {
    transform: translateY(-10px);
    border-color: rgba(var(--gold-rgb), 0.8);
    box-shadow: 0 24px 36px -8px rgba(0, 0, 0, 0.35), 0 8px 12px -6px rgba(0, 0, 0, 0.25);
  }
  .ab-value-card:hover::after {
    transform: scaleX(1);
  }

  .ab-value-icon {
    display: flex;
    height: 3.5rem;
    width: 3.5rem;
    align-items: center;
    justify-content: center;
    border-radius: 9999px;
    border: 1px solid rgba(var(--gold-rgb), 0.4);
    background-color: rgba(var(--gold-rgb), 0.1);
    color: var(--gold);
    transition:
      transform 400ms ease,
      background-color 300ms ease,
      color 300ms ease,
      box-shadow 300ms ease;
  }
  .ab-value-card:hover .ab-value-icon {
    background-color: var(--gold);
    color: var(--maroon-700);
    transform: rotate(-10deg) scale(1.12);
    box-shadow: 0 8px 18px rgba(0, 0, 0, 0.3);
  }
  .ab-value-icon svg {
    height: 1.75rem;
    width: 1.75rem;
  }

  .ab-value-title {
    margin-top: 1.25rem;
    font-family: var(--font-serif);
    font-size: 1.25rem;
    line-height: 1.75rem;
    font-weight: 700;
    color: #ffffff;
  }
  .ab-value-text {
    margin-top: 0.75rem;
    font-size: 0.875rem;
    line-height: 1.625;
    color: #ffffff;
  }

  /* ---------- CTA ---------- */
  .ab-cta {
    background-image: linear-gradient(to bottom right, var(--maroon-600), var(--maroon-800));
    padding-top: 4rem;
    padding-bottom: 4rem;
  }
  .ab-cta-inner {
    margin: 0 auto;
    max-width: 56rem;
    padding: 0 1.25rem;
    text-align: center;
  }
  @media (min-width: 640px) {
    .ab-cta-inner { padding: 0 2rem; }
  }
  .ab-cta-icon {
    display: block;
    margin: 0 auto;
    height: 2.5rem;
    width: 2.5rem;
    color: var(--gold);
    transition: transform 400ms ease;
  }
  .ab-cta-inner:hover .ab-cta-icon {
    transform: translateY(-5px) rotate(-8deg);
  }
  .ab-cta-title {
    margin-top: 1rem;
    font-family: var(--font-serif);
    font-size: 1.5rem;
    line-height: 2rem;
    font-weight: 700;
    color: var(--ivory);
  }
  @media (min-width: 640px) {
    .ab-cta-title {
      font-size: 1.875rem;
      line-height: 2.25rem;
    }
  }
  .ab-cta-btn {
    margin-top: 1.5rem;
    transition: transform 300ms ease, box-shadow 300ms ease;
  }
  .ab-cta-btn:hover {
    transform: translateY(-3px);
    box-shadow: 0 10px 22px rgba(0, 0, 0, 0.25);
  }
  .ab-cta-arrow {
    height: 1rem;
    width: 1rem;
    transition: transform 300ms ease;
  }
  .ab-cta-btn:hover .ab-cta-arrow {
    transform: translateX(5px);
  }

  /* ---------- Mobile: shorter slide distance ---------- */
  @media (max-width: 640px) {
    .ab-page [data-reveal="left"]  { transform: translateX(-35px); }
    .ab-page [data-reveal="right"] { transform: translateX(35px); }
    .ab-page [data-reveal="up"]    { transform: translateY(26px); }
  }

  /* ---------- Reduced motion ---------- */
  @media (prefers-reduced-motion: reduce) {
    .ab-page [data-reveal] {
      opacity: 1;
      transform: none;
      transition: none;
    }

    .ab-stat,
    .ab-image,
    .ab-image-frame,
    .ab-image-border,
    .ab-badge,
    .ab-badge-icon,
    .ab-value-card,
    .ab-value-card::after,
    .ab-value-icon,
    .ab-cta-icon,
    .ab-cta-btn,
    .ab-cta-arrow {
      transition: none;
    }
  }
`;

export default function About() {
  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll reveal: add "is-visible" when an element enters the screen and
  // remove it when it leaves, so the animation replays on the next scroll.
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

  return (
    <div className="ab-page" ref={pageRef}>
      <style>{aboutCss}</style>

      <PageHero
        eyebrow="About Our Institution"
        title="About ST. Lourdes"
        description="A pioneering engineering institution committed to academic excellence since 2009."
        image="/about/campus2.png"
        breadcrumb="About Us"
      />

      {/* About content */}
      <section className="section-pad ab-section ab-bg-white">
        <div className="ab-container">
          <div className="ab-story-grid">

            {/* Story text: slides in from the left */}
            <div data-reveal="left">
              <p className="eyebrow">Our Story</p>
              <h2 className="ab-title">ST. Lourdes Engineering College</h2>
              <div className="ab-divider-left" />
              <p className="ab-text">
                ST. Lourdes Engineering College is a pioneering institution in Chennai, founded by{' '}
                {siteConfig.founder}. The college was established in {siteConfig.established} under
                the self-financing scheme and is managed by {siteConfig.trust}. It is a Christian
                Minority Institution located on NH45 at Erandam Kattalai, Tharapakkam, near
                Anagaputhur, Chennai – 600128.
              </p>
              <p className="ab-text ab-text-tight">
                The college is committed to providing quality technical education that combines
                academic rigor with practical, industry-relevant skills. Our experienced faculty,
                modern infrastructure, and student-centric approach create an environment where
                future engineers and leaders can thrive.
              </p>
              <p className="ab-text ab-text-tight">
                Strategically located on NH45, St. Lourdes Engineering College offers a serene and
                conducive learning environment within Chennai city. The campus provides a peaceful
                atmosphere that supports academic excellence, innovation, and holistic student
                development.
              </p>

              {/* Stats: fade up */}
              <div className="ab-stats" data-reveal="up" style={delay(200)}>
                <div className="ab-stat">
                  <CountUp end={Number(siteConfig.established)} duration={2200} />
                  <p className="ab-stat-label">Established</p>
                </div>
                <div className="ab-stat">
                  <CountUp end={7} />
                  <p className="ab-stat-label">Programs</p>
                </div>
                <div className="ab-stat">
                  <CountUp end={15} suffix="+" />
                  <p className="ab-stat-label">Years</p>
                </div>
              </div>
            </div>

            {/* Campus image: slides in from the right */}
            <div data-reveal="right" style={delay(120)}>
              <div className="ab-image-wrap">
                <div className="ab-image-frame">
                  <img
                    src="/about/campus3.png"
                    alt="Campus building"
                    className="ab-image"
                    loading="lazy"
                  />
                </div>
                <div className="ab-image-border" />
                <div className="ab-badge">
                  <Building className="ab-badge-icon" strokeWidth={1.5} />
                  <div>
                    <p className="ab-badge-title">Christian Minority</p>
                    <p className="ab-badge-sub">Institution</p>
                  </div>
                </div>
              </div>
            </div>

          </div>
        </div>
      </section>

      {/* Mission / Vision / Values */}
      <section id="vision" className="section-pad ab-section ab-bg-ivory">
        <div className="ab-container">
          <div className="ab-values-head" data-reveal="up">
            <p className="eyebrow">Guiding Principles</p>
            <h2 className="ab-title">Mission, Vision &amp; Values</h2>
            <div className="ab-divider-center" />
          </div>

          <div className="ab-values-grid">
            {values.map((v, i) => {
              const Icon = v.icon;
              // 1st card from the left, 2nd fades up, 3rd from the right
              const direction = i === 0 ? 'left' : i === 1 ? 'up' : 'right';
              return (
                // outer box slides in, inner card handles the hover
                <div
                  key={v.title}
                  className="ab-reveal-box"
                  data-reveal={direction}
                  style={delay(i * 120)}
                >
                  <div className="ab-value-card">
                    {/* Icon: golden on a soft gold-tinted circle */}
                    <div className="ab-value-icon">
                      <Icon strokeWidth={1.5} />
                    </div>

                    <h3 className="ab-value-title">{v.title}</h3>
                    <p className="ab-value-text">{v.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* CTA: content fades up piece by piece */}
      <section className="ab-cta">
        <div className="ab-cta-inner">
          <div data-reveal="up">
            <BookOpen className="ab-cta-icon" strokeWidth={1.5} />
          </div>
          <h2 className="ab-cta-title" data-reveal="up" style={delay(120)}>
            Ready to join our academic community?
          </h2>
          <div data-reveal="up" style={delay(240)}>
            <Link to="/admission" className="btn-gold ab-cta-btn">
              Apply for Admission
              <ArrowRight className="ab-cta-arrow" />
            </Link>
          </div>
        </div>
      </section>
    </div>
  );
}