import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, ArrowRight } from 'lucide-react';
import { heroSlides, siteConfig } from '@/data/siteConfig';

const AUTO_PLAY_MS = 6000;

export default function HeroSlider() {
  const [current, setCurrent] = useState(0);
  const [isPaused, setIsPaused] = useState(false);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const slideCount = heroSlides.length;

  const next = useCallback(() => {
    setCurrent((c) => (c + 1) % slideCount);
  }, [slideCount]);

  const prev = useCallback(() => {
    setCurrent((c) => (c - 1 + slideCount) % slideCount);
  }, [slideCount]);

  const goTo = (idx: number) => setCurrent(idx);

  useEffect(() => {
    if (isPaused) return;
    timerRef.current = setTimeout(next, AUTO_PLAY_MS);
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, next]);

  return (
   <section
  data-header-theme="dark"
  className="relative h-[100svh] min-h-[600px] w-full overflow-hidden"
  onMouseEnter={() => setIsPaused(true)}
  onMouseLeave={() => setIsPaused(false)}
  aria-roledescription="carousel"
  aria-label="Campus highlights"
>
      {/* Slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current ? 'opacity-100' : 'opacity-0'
          }`}
          aria-hidden={idx !== current}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover"
            loading={idx === 0 ? 'eager' : 'lazy'}
          />
          {/* Gradient overlay for text readability */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/90 via-maroon-900/50 to-transparent" />
          <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/70 via-transparent to-maroon-900/20" />
        </div>
      ))}

      {/* Decorative gold accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-1 w-24 -translate-y-1/2 bg-gold lg:block" />

      {/* Content */}
      <div className="relative z-10 flex h-full items-center">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="max-w-2xl">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={`${idx === current ? 'block' : 'hidden'}`}
              >
                <p
                  className={`eyebrow text-gold-100 ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                >
                  {slide.eyebrow}
                </p>
                <h1
                  className={`mt-4 font-serif text-4xl font-bold leading-tight text-ivory text-balance sm:text-5xl lg:text-6xl ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: idx === current ? '0.1s' : '0s', animationFillMode: 'both' }}
                >
                  {slide.title}
                </h1>
                <p
                  className={`mt-5 max-w-xl text-base leading-relaxed text-ivory/80 sm:text-lg ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: idx === current ? '0.2s' : '0s', animationFillMode: 'both' }}
                >
                  {slide.description}
                </p>
                <div
                  className={`mt-8 flex flex-wrap items-center gap-4 ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{ animationDelay: idx === current ? '0.3s' : '0s', animationFillMode: 'both' }}
                >
                  <Link to={slide.primaryCta.to} className="btn-gold">
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4" />
                  </Link>
                  <Link to={slide.secondaryCta.to} className="btn-outline-gold">
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TNEA Badge */}
      <div className="absolute bottom-8 right-8 z-10 hidden md:block">
        <div className="rounded-2xl border border-gold/40 bg-maroon-900/80 px-6 py-4 backdrop-blur-md">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-100/70">
            TNEA Counselling Code
          </p>
          <p className="mt-1 font-serif text-3xl font-bold text-gold">{siteConfig.tneaCode}</p>
        </div>
      </div>

      {/* Navigation arrows */}
      <button
        onClick={prev}
        className="absolute left-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-maroon-900/40 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Previous slide"
      >
        <ChevronLeft className="h-6 w-6" />
      </button>
      <button
        onClick={next}
        className="absolute right-4 top-1/2 z-20 flex h-11 w-11 -translate-y-1/2 items-center justify-center rounded-full border border-gold/30 bg-maroon-900/40 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
        aria-label="Next slide"
      >
        <ChevronRight className="h-6 w-6" />
      </button>

      {/* Pagination dots */}
      <div className="absolute bottom-8 left-1/2 z-20 flex -translate-x-1/2 items-center gap-2.5 md:left-12 md:translate-x-0">
        {heroSlides.map((_, idx) => (
          <button
            key={idx}
            onClick={() => goTo(idx)}
            aria-label={`Go to slide ${idx + 1}`}
            className={`h-2 rounded-full transition-all duration-300 ${
              idx === current
                ? 'w-8 bg-gold'
                : 'w-2 bg-ivory/40 hover:bg-ivory/70'
            }`}
          />
        ))}
      </div>
    </section>
  );
}
