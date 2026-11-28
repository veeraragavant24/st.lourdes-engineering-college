
import { useCallback, useEffect, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides, siteConfig } from '@/data/siteConfig';

const AUTO_PLAY_MS = 6000;

/* =========================================================
   STYLES
   ========================================================= */

function HeroStyles() {
  return (
    <style>{`
      .hero-slider {
        --hero-maroon-900: 74, 16, 34;
        --hero-maroon-900-hex: #4A1022;
        --hero-maroon-700: #6E1832;
        --hero-gold: #D8B54C;
        --hero-gold-rgb: 216, 181, 76;
        --hero-gold-100: #F7EBC6;
        --hero-ivory: #FBF9F5;

        position: relative;
        width: 100%;
        height: 100svh;
        min-height: 600px;
        overflow: hidden;
      }

      .hero-slider *,
      .hero-slider *::before,
      .hero-slider *::after {
        box-sizing: border-box;
      }

      /* ================= SLIDES ================= */

      .hero-slide {
        position: absolute;
        inset: 0;
        opacity: 0;
        transition: opacity 1000ms ease-in-out;
      }

      .hero-slide.is-active {
        opacity: 1;
      }

      .hero-slide img {
        display: block;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hero-overlay-side {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          rgba(var(--hero-maroon-900), .9),
          rgba(var(--hero-maroon-900), .5),
          transparent
        );
      }

      .hero-overlay-bottom {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(var(--hero-maroon-900), .7),
          transparent,
          rgba(var(--hero-maroon-900), .2)
        );
      }
        .hero-slide video {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
}

      /* ================= DECORATIVE ACCENT ================= */

      .hero-accent {
        display: none;
        position: absolute;
        left: 0;
        top: 50%;
        width: 96px;
        height: 4px;
        transform: translateY(-50%);
        background: var(--hero-gold);
        pointer-events: none;
      }

      /* ================= CONTENT ================= */

      .hero-content {
        position: relative;
        z-index: 10;
        display: flex;
        align-items: center;
        height: 130%;
      }

      .hero-content-inner {
        width: 100%;
        max-width: 80rem;
        margin-inline: auto;
        padding-inline: 20px;
      }

      .hero-text {
        max-width: 42rem;
      }

      .hero-text-slide {
        display: none;
      }

      .hero-text-slide.is-active {
        display: block;
      }

      .hero-eyebrow {
        margin: 0;
        color: var(--hero-gold-100);
        font-family: Arial, sans-serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .25em;
        text-transform: uppercase;
      }

      .hero-title {
        margin: 16px 0 0;
        color: var(--hero-ivory);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1.25;
        text-wrap: balance;
      }

      .hero-description {
        max-width: 36rem;
        margin: 20px 0 0;
        color: rgba(251, 249, 245, .8);
        font-size: 16px;
        line-height: 1.625;
      }

      .hero-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        gap: 16px;
        margin-top: 32px;
      }

      /* ================= BUTTONS ================= */

      .hero-btn-gold,
      .hero-btn-outline {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 12px 24px;
        border-radius: 6px;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        transition: all 250ms ease;
      }

      .hero-btn-gold {
        border: 1px solid var(--hero-gold);
        background: var(--hero-gold);
        color: #4A1022;
      }

      .hero-btn-gold:hover {
        border-color: #fff;
        background: #fff;
      }

      .hero-btn-outline {
        border: 1px solid var(--hero-gold);
        background: transparent;
        color: var(--hero-gold);
      }

      .hero-btn-outline:hover {
        background: var(--hero-gold);
        color: #4A1022;
      }

      .hero-btn-gold svg {
        width: 16px;
        height: 16px;
      }

      /* ================= TNEA BADGE ================= */

      .hero-badge-wrap {
        display: none;
        position: absolute;
        right: 400px;
        bottom: 412px;
        z-index: 10;
        cursor: pointer;
        transition: transform 350ms ease;
      }

      .hero-badge-wrap:hover {
        transform: translateY(-4px) scale(1.03);
      }

      @property --hero-badge-angle {
        syntax: '<angle>';
        initial-value: 0deg;
        inherits: false;
      }

      @keyframes heroBadgeEntrance {
        from {
          opacity: 0;
          transform: translateY(12px) scale(.98);
          filter: blur(5px);
        }

        to {
          opacity: 1;
          transform: translateY(0) scale(1);
          filter: blur(0);
        }
      }

      @keyframes heroBadgeGlow {
        0%, 100% {
          box-shadow:
            0 4px 18px rgba(0, 0, 0, .15),
            0 0 5px rgba(216, 181, 76, .12);
        }

        50% {
          box-shadow:
            0 5px 20px rgba(0, 0, 0, .18),
            0 0 13px rgba(216, 181, 76, .28);
        }
      }

      @keyframes heroBadgeShine {
        to {
          --hero-badge-angle: 360deg;
        }
      }

      .hero-badge {
        position: relative;
        isolation: isolate;
        overflow: hidden;
        padding: 16px 24px;
        border: 1px solid rgba(var(--hero-gold-rgb), .4);
        border-radius: 16px;
        background-color: rgba(var(--hero-maroon-900), .8);
        backdrop-filter: blur(12px);
        -webkit-backdrop-filter: blur(12px);
        transition:
          background-color 400ms ease,
          border-color 400ms ease;
        animation:
          heroBadgeEntrance 900ms ease-out both,
          heroBadgeGlow 4s ease-in-out 900ms infinite;
      }

      .hero-badge-wrap:hover .hero-badge {
        background-color: var(--hero-gold);
        border-color: var(--hero-gold);
      }

      .hero-badge::before {
        content: '';
        position: absolute;
        inset: 0;
        padding: 2px;
        border-radius: inherit;
        background: conic-gradient(
          from var(--hero-badge-angle),
          transparent 0deg,
          transparent 285deg,
          #A77B32 310deg,
          #D8B54C 325deg,
          #FFF1B5 340deg,
          #D8B54C 350deg,
          transparent 360deg
        );
        -webkit-mask:
          linear-gradient(#fff 0 0) content-box,
          linear-gradient(#fff 0 0);
        -webkit-mask-composite: xor;
        mask-composite: exclude;
        pointer-events: none;
        z-index: 3;
        animation: heroBadgeShine 5s linear infinite;
        filter: drop-shadow(
          0 0 3px rgba(216, 181, 76, .5)
        );
      }

      .hero-badge > * {
        position: relative;
        z-index: 1;
      }

      @keyframes heroBadgeHeadingReveal {
        from {
          opacity: 0;
          transform: translateY(8px);
          filter: blur(3px);
        }

        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      .hero-badge-label {
        margin: 0;
        color: rgba(247, 235, 198, .7);
        font-family: Arial, sans-serif;
        font-size: 10px;
        letter-spacing: .2em;
        text-transform: uppercase;
        opacity: 0;
        transition: color 400ms ease;
        animation: heroBadgeHeadingReveal 700ms ease-out 900ms forwards;
      }

      .hero-badge-wrap:hover .hero-badge-label {
        color: var(--hero-maroon-900-hex);
      }

      @keyframes heroDigitRevealUp {
        from {
          opacity: 0;
          transform: translateY(7px);
          filter: blur(2px);
        }

        70% {
          opacity: 1;
          transform: translateY(-1px);
          filter: blur(0);
        }

        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes heroDigitRevealDown {
        from {
          opacity: 0;
          transform: translateY(-7px);
          filter: blur(2px);
        }

        70% {
          opacity: 1;
          transform: translateY(1px);
          filter: blur(0);
        }

        to {
          opacity: 1;
          transform: translateY(0);
          filter: blur(0);
        }
      }

      @keyframes heroNumberGlow {
        0%, 100% {
          text-shadow: 0 0 2px rgba(255, 210, 100, .15);
        }

        50% {
          text-shadow: 0 0 7px rgba(255, 210, 100, .4);
        }
      }

      .hero-badge-code {
        display: flex;
        justify-content: center;
        align-items: center;
        width: 100%;
        gap: 3px;
        margin: 4px 0 0;
        color: var(--hero-gold);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 30px;
        font-weight: 700;
        line-height: 1.2;
        transition: color 400ms ease;
        animation: heroNumberGlow 3s ease-in-out 3.5s infinite;
      }

      .hero-badge-wrap:hover .hero-badge-code {
        color: var(--hero-maroon-900-hex);
      }

      .hero-badge-code span {
        display: inline-block;
        opacity: 0;
      }

      .hero-badge-code span:nth-child(odd) {
        animation: heroDigitRevealUp 650ms ease-out both;
      }

      .hero-badge-code span:nth-child(even) {
        animation: heroDigitRevealDown 650ms ease-out both;
      }

      /* ================= ARROWS ================= */

      .hero-arrow {
        position: absolute;
        top: 50%;
        z-index: 20;
        display: flex;
        align-items: center;
        justify-content: center;
        width: 44px;
        height: 44px;
        transform: translateY(-50%);
        border: 1px solid rgba(var(--hero-gold-rgb), .3);
        border-radius: 50%;
        background: rgba(var(--hero-maroon-900), .4);
        color: var(--hero-ivory);
        cursor: pointer;
        backdrop-filter: blur(4px);
        -webkit-backdrop-filter: blur(4px);
        transition: all 300ms ease;
      }

      .hero-arrow svg {
        width: 24px;
        height: 24px;
      }

      .hero-arrow:hover {
        border-color: var(--hero-gold);
        background: var(--hero-gold);
        color: var(--hero-maroon-700);
      }

      .hero-arrow:focus-visible,
      .hero-dot:focus-visible {
        outline: 2px solid var(--hero-gold);
        outline-offset: 2px;
      }

      .hero-arrow-prev { left: 16px; }
      .hero-arrow-next { right: 16px; }

      /* ================= PAGINATION DOTS ================= */

      .hero-dots {
        position: absolute;
        bottom: 32px;
        left: 50%;
        z-index: 20;
        display: flex;
        align-items: center;
        gap: 10px;
        transform: translateX(-50%);
      }

      .hero-dot {
        width: 8px;
        height: 8px;
        padding: 0;
        border: none;
        border-radius: 999px;
        background: rgba(251, 249, 245, .4);
        cursor: pointer;
        transition: all 300ms ease;
      }

      .hero-dot:hover {
        background: rgba(251, 249, 245, .7);
      }

      .hero-dot.is-active {
        width: 32px;
        background: var(--hero-gold);
      }

      /* ================= ENTRY ANIMATION ================= */

      .hero-animate {
        animation: heroFadeInUp 700ms ease-out both;
      }

      .hero-delay-1 { animation-delay: .1s; }
      .hero-delay-2 { animation-delay: .2s; }
      .hero-delay-3 { animation-delay: .3s; }

      @keyframes heroFadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 24px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      /* ================= RESPONSIVE ================= */

      @media (min-width: 640px) {
        .hero-content-inner { padding-inline: 32px; }
        .hero-title { font-size: 48px; line-height: 1.15; }
        .hero-description { font-size: 18px; }
      }

      @media (min-width: 768px) {
        .hero-badge-wrap { display: block; }
        .hero-dots {
          left: 48px;
          transform: none;
        }
      }

      @media (min-width: 1024px) {
        .hero-accent { display: block; }
        .hero-content-inner { padding-inline: 48px; }
        .hero-title { font-size: 60px; line-height: 1.1; }
      }


/* ================= MOBILE: SMALLER SLIDER CONTROLS ================= */

@media (max-width: 767px) {
  /* pagination dots */
  .hero-dots {
    bottom: 16px;
    gap: 6px;
  }

  .hero-dot {
    width: 6px;
    height: 6px;
    min-width: 0;      /* stops global button styles from enlarging them */
    min-height: 0;
  }

  .hero-dot.is-active {
    width: 18px;
  }

  /* prev / next arrows */
  .hero-arrow {
    width: 32px;
    height: 32px;
  }

  .hero-arrow svg {
    width: 18px;
    height: 18px;
  }

  .hero-arrow-prev { left: 8px; }
  .hero-arrow-next { right: 8px; }
}

      /* ================= ACCESSIBILITY ================= */

      @media (prefers-reduced-motion: reduce) {
        .hero-slide {
          transition: none;
        }

        .hero-badge-wrap {
          transition: none;
        }

        .hero-animate,
        .hero-badge,
        .hero-badge::before,
        .hero-badge-label,
        .hero-badge-code,
        .hero-badge-code span {
          animation: none !important;
          opacity: 1;
          transform: none;
          filter: none;
        }
      }
    `}</style>
  );
}

/* =========================================================
   HERO SLIDER
   ========================================================= */

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);

  const slideCount = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }, [slideCount]);

  // Auto-play: restarts every time the slide changes
 useEffect(() => {
  if (isPaused || slideCount < 2) return;

  // Video slides advance when the video finishes.
  if (heroSlides[current].type === 'video') return;

  const timer = window.setTimeout(next, AUTO_PLAY_MS);

  return () => window.clearTimeout(timer);
}, [current, isPaused, next, slideCount]);
  // Pause when browser tab is hidden
  useEffect(() => {
    const onVisibility = () => setIsPaused(document.hidden);

    document.addEventListener('visibilitychange', onVisibility);

    return () => {
      document.removeEventListener('visibilitychange', onVisibility);
    };
  }, []);

  if (slideCount === 0) return null;

  // Dynamic TNEA code: works with any configured code length
  const tneaDigits = String(siteConfig.tneaCode ?? '').split('');

  return (
    <section
      data-header-theme="dark"
      className="hero-slider"
      aria-roledescription="carousel"
      aria-label="Campus highlights"
    >
      <HeroStyles />

    {/* Slides */}
{heroSlides.map((slide, idx) => (
  <div
    key={idx}
    className={`hero-slide ${idx === current ? 'is-active' : ''}`}
    aria-hidden={idx !== current}
  >
    {slide.type === 'video' ? (
      <video
        ref={(el) => {
          if (el) {
            if (idx === current) {
              el.play().catch(() => {});
            } else {
              el.pause();
              el.currentTime = 0;
            }
          }
        }}
        src={slide.video}
        autoPlay
        muted
        playsInline
        preload="auto"
        onEnded={() => {
          if (idx === current) next();
        }}
      />
    ) : (
      <img src={slide.image} alt="" loading="eager" />
    )}

    <div className="hero-overlay-side" />
    <div className="hero-overlay-bottom" />
  </div>
))}

      {/* Content */}
      <div className="hero-content">
        <div className="hero-content-inner">
          <div className="hero-text">
            {heroSlides.map((slide, idx) => {
              const active = idx === current;

              return (
                <div
                  key={idx}
                  className={`hero-text-slide ${active ? 'is-active' : ''}`}
                >
                  <p className={`hero-eyebrow ${active ? 'hero-animate' : ''}`}>
                    {slide.eyebrow}
                  </p>

                  <h1
                    className={`hero-title ${
                      active ? 'hero-animate hero-delay-1' : ''
                    }`}
                  >
                    {slide.title}
                  </h1>

                  <p
                    className={`hero-description ${
                      active ? 'hero-animate hero-delay-2' : ''
                    }`}
                  >
                    {slide.description}
                  </p>

                  <div
                    className={`hero-actions ${
                      active ? 'hero-animate hero-delay-3' : ''
                    }`}
                  >
                    {/* Explore Program(s) always opens Academics */}
                    <Link
                      to={
                        ['explore program', 'explore programs'].includes(
                          slide.primaryCta.label.trim().toLowerCase()
                        )
                          ? '/academics'
                          : slide.primaryCta.to
                      }
                      className="hero-btn-gold"
                    >
                      {slide.primaryCta.label}
                      <ArrowRight aria-hidden="true" />
                    </Link>

                    <Link
                      to={slide.secondaryCta.to}
                      className="hero-btn-outline"
                    >
                      {slide.secondaryCta.label}
                    </Link>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </div>

      {/* TNEA Badge */}
      <div className="hero-badge-wrap">
        <div className="hero-badge">
          <p className="hero-badge-label">
            TNEA Counselling Code
          </p>

          <p
            className="hero-badge-code"
            aria-label={`TNEA Counselling Code ${siteConfig.tneaCode}`}
          >
            {tneaDigits.map((digit, idx) => (
              <span
                key={`${idx}-${digit}`}
                aria-hidden="true"
                style={{
                  animationDelay: `${1.6 + idx * 0.4}s`,
                }}
              >
                {digit}
              </span>
            ))}
          </p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        type="button"
        onClick={prev}
        className="hero-arrow hero-arrow-prev"
        aria-label="Previous slide"
      >
        <ChevronLeft aria-hidden="true" />
      </button>

    

      {/* Pagination dots */}
      <div className="hero-dots">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            type="button"
            onClick={() => setCurrent(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`hero-dot ${idx === current ? 'is-active' : ''}`}
          />
        ))}
      </div>
    </section>
  );
}
