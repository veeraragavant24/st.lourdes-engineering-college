
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
    if (slideCount > 1) {
      setCurrent((c) => (c + 1) % slideCount);
    }
  }, [slideCount]);

  const prev = useCallback(() => {
    if (slideCount > 1) {
      setCurrent((c) => (c - 1 + slideCount) % slideCount);
    }
  }, [slideCount]);

  const goTo = (idx: number) => setCurrent(idx);

  useEffect(() => {
    if (isPaused || slideCount <= 1) return;

    timerRef.current = setTimeout(next, AUTO_PLAY_MS);

    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, [current, isPaused, next, slideCount]);

  if (slideCount === 0) return null;

  return (
    <section
      data-header-theme="dark"
      className="relative h-[88svh] min-h-[560px] w-full overflow-hidden sm:h-[90svh] sm:min-h-[620px] lg:h-[100svh] lg:min-h-[680px]"
      onMouseEnter={() => setIsPaused(true)}
      onMouseLeave={() => setIsPaused(false)}
      onFocusCapture={() => setIsPaused(true)}
      onBlurCapture={(event) => {
        if (!event.currentTarget.contains(event.relatedTarget as Node | null)) {
          setIsPaused(false);
        }
      }}
      aria-roledescription="carousel"
      aria-label="Campus highlights"
    >
      {/* Background slides */}
      {heroSlides.map((slide, idx) => (
        <div
          key={idx}
          className={`absolute inset-0 transition-opacity duration-1000 ease-in-out ${
            idx === current
              ? 'opacity-100'
              : 'pointer-events-none opacity-0'
          }`}
          aria-hidden={idx !== current}
        >
          <img
            src={slide.image}
            alt=""
            className="h-full w-full object-cover object-center"
            loading={idx === 0 ? 'eager' : 'lazy'}
            fetchPriority={idx === 0 ? 'high' : 'auto'}
          />

          {/* Readability overlays */}
          <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/90 via-maroon-900/60 to-maroon-900/20 sm:via-maroon-900/50 sm:to-transparent" />

          <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 via-transparent to-maroon-900/30" />
        </div>
      ))}

      {/* Decorative gold accent */}
      <div className="pointer-events-none absolute left-0 top-1/2 hidden h-1 w-24 -translate-y-1/2 bg-gold lg:block" />

      {/* Responsive slide content */}
      <div className="relative z-10 flex h-full items-center pb-20 pt-24 sm:pb-16 sm:pt-28 lg:pb-12 lg:pt-24">
        <div className="mx-auto w-full max-w-7xl px-5 sm:px-10 lg:px-16">
          <div className="max-w-2xl">
            {heroSlides.map((slide, idx) => (
              <div
                key={idx}
                className={idx === current ? 'block' : 'hidden'}
              >
                <p
                  className={`eyebrow text-sm text-gold-100 sm:text-base ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                >
                  {slide.eyebrow}
                </p>

                <h1
                  className={`mt-3 max-w-2xl font-serif text-3xl font-bold leading-tight text-ivory text-balance min-[400px]:text-4xl sm:mt-4 sm:text-5xl lg:text-6xl xl:text-7xl ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{
                    animationDelay: '0.1s',
                    animationFillMode: 'both',
                  }}
                >
                  {slide.title}
                </h1>

                <p
                  className={`mt-4 max-w-xl text-sm leading-6 text-ivory/90 sm:mt-5 sm:text-base sm:leading-relaxed lg:text-lg ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{
                    animationDelay: '0.2s',
                    animationFillMode: 'both',
                  }}
                >
                  {slide.description}
                </p>

                {/* Buttons stack on mobile */}
                <div
                  className={`mt-6 flex flex-col items-stretch gap-3 min-[420px]:flex-row min-[420px]:flex-wrap min-[420px]:items-center sm:mt-8 sm:gap-4 ${
                    idx === current ? 'animate-fade-in-up' : ''
                  }`}
                  style={{
                    animationDelay: '0.3s',
                    animationFillMode: 'both',
                  }}
                >
                  <Link
                    to={slide.primaryCta.to}
                    className="btn-gold inline-flex w-full items-center justify-center gap-2 text-sm sm:w-auto sm:text-base"
                  >
                    {slide.primaryCta.label}
                    <ArrowRight className="h-4 w-4 shrink-0" />
                  </Link>

                  <Link
                    to={slide.secondaryCta.to}
                    className="btn-outline-gold inline-flex w-full items-center justify-center text-sm sm:w-auto sm:text-base"
                  >
                    {slide.secondaryCta.label}
                  </Link>
                </div>
              </div>
            ))}
          </div>
        </div>
      </div>

      {/* TNEA badge: tablet and desktop */}
      <div className="absolute bottom-16 right-8 z-10 hidden lg:block xl:bottom-10 xl:right-12">
        <div className="rounded-2xl border border-gold/40 bg-maroon-900/80 px-5 py-3 backdrop-blur-md xl:px-6 xl:py-4">
          <p className="font-sans text-[10px] uppercase tracking-[0.2em] text-gold-100/70">
            TNEA Counselling Code
          </p>
          <p className="mt-1 font-serif text-2xl font-bold text-gold xl:text-3xl">
            {siteConfig.tneaCode}
          </p>
        </div>
      </div>

      {/* Previous slide */}
      {slideCount > 1 && (
        <button
          type="button"
          onClick={prev}
          className="absolute left-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-maroon-900/60 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:left-4 sm:h-11 sm:w-11"
          aria-label="Previous slide"
        >
          <ChevronLeft className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Next slide */}
      {slideCount > 1 && (
        <button
          type="button"
          onClick={next}
          className="absolute right-2 top-1/2 z-20 flex h-9 w-9 -translate-y-1/2 items-center justify-center rounded-full border border-gold/40 bg-maroon-900/60 text-ivory backdrop-blur-sm transition-all duration-300 hover:border-gold hover:bg-gold hover:text-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:right-4 sm:h-11 sm:w-11"
          aria-label="Next slide"
        >
          <ChevronRight className="h-5 w-5 sm:h-6 sm:w-6" />
        </button>
      )}

      {/* Pagination dots */}
      {slideCount > 1 && (
        <div className="absolute bottom-5 left-1/2 z-20 flex -translate-x-1/2 items-center justify-center gap-2.5 sm:bottom-7 lg:left-12 lg:translate-x-0">
          {heroSlides.map((_, idx) => (
            <button
              key={idx}
              type="button"
              onClick={() => goTo(idx)}
              aria-label={`Go to slide ${idx + 1}`}
              aria-current={idx === current ? 'true' : undefined}
              className={`min-h-3 rounded-full transition-all duration-300 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 focus-visible:ring-offset-maroon-900 ${
                idx === current
                  ? 'w-8 bg-gold'
                  : 'w-3 bg-ivory/60 hover:bg-ivory'
              }`}
            />
          ))}
        </div>
      )}
    </section>
  );
}
