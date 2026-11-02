import { useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';
import { recruiters } from '@/data/recruiters';

export default function RecruitersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const [canScrollLeft, setCanScrollLeft] = useState(false);
  const [canScrollRight, setCanScrollRight] = useState(true);

  const updateScrollState = () => {
    const el = scrollRef.current;
    if (!el) return;
    setCanScrollLeft(el.scrollLeft > 5);
    setCanScrollRight(el.scrollLeft < el.scrollWidth - el.clientWidth - 5);
  };

  const scroll = (dir: 'left' | 'right') => {
    const el = scrollRef.current;
    if (!el) return;
    const amount = el.clientWidth * 0.8;
    el.scrollBy({ left: dir === 'left' ? -amount : amount, behavior: 'smooth' });
  };

  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        {/* Header */}
        <div className="mb-12 text-center">
          <p className="eyebrow">Our Hiring Partners</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
            Top Recruiters
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-4 max-w-xl text-sm text-charcoal/50">
            Supplied recruiter-logo content pending verification. Official logo files to be provided.
          </p>
        </div>

        {/* Carousel controls */}
        <div className="relative">
          <button
            onClick={() => scroll('left')}
            disabled={!canScrollLeft}
            className="absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-maroon-200 bg-white text-maroon-600 shadow-md transition-all duration-200 hover:border-maroon-400 hover:bg-maroon-50 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:-left-5"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>
          <button
            onClick={() => scroll('right')}
            disabled={!canScrollRight}
            className="absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full border border-maroon-200 bg-white text-maroon-600 shadow-md transition-all duration-200 hover:border-maroon-400 hover:bg-maroon-50 disabled:opacity-30 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold sm:-right-5"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          {/* Logo grid/carousel */}
          <div
            ref={scrollRef}
            onScroll={updateScrollState}
            className="no-scrollbar flex snap-x snap-mandatory gap-4 overflow-x-auto scroll-smooth pb-2"
          >
            {recruiters.map((rec) => (
              <div
                key={rec.id}
                className="flex shrink-0 snap-start items-center justify-center rounded-xl border border-maroon-100 bg-white p-6 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md"
                style={{ width: '160px', height: '100px' }}
              >
                {rec.logoUrl ? (
                  <img
                    src={rec.logoUrl}
                    alt={rec.name}
                    className="max-h-full max-w-full object-contain"
                    loading="lazy"
                  />
                ) : (
                  <span className="text-center font-serif text-sm font-semibold text-maroon-600">
                    {rec.name}
                  </span>
                )}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}
