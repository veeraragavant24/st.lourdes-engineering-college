import { useCallback, useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { ChevronLeft, ChevronRight, Calendar, ArrowRight } from 'lucide-react';
import type { NewsItem } from '@/data/news';
import type { EventItem } from '@/data/events';

type ItemType = NewsItem | EventItem;

interface CarouselPanelProps {
  title: string;
  icon: typeof Calendar;
  items: ItemType[];
  accent: 'maroon' | 'gold';
  viewAllLink: string;
  emptyText?: string;
}

function isNews(item: ItemType): item is NewsItem {
  return 'department' in item;
}

function isEvent(item: ItemType): item is EventItem {
  return 'venue' in item;
}

function Card({ item }: { item: ItemType }) {
  return (
    <article className="group flex h-full flex-col overflow-hidden rounded-xl border border-gold/10 bg-white shadow-sm transition-all duration-300 hover:shadow-xl hover:shadow-maroon-900/10">
      <div className="relative h-44 overflow-hidden">
        <img
          src={item.image}
          alt=""
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
          loading="lazy"
        />
        <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-maroon-700/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <span className="font-sans text-[10px] font-semibold uppercase tracking-wider text-gold-100">
            {item.dateLabel.split(' ')[1]}
          </span>
          <span className="font-serif text-lg font-bold leading-none text-ivory">
            {item.dateLabel.split(' ')[0]}
          </span>
        </div>
        {isEvent(item) && item.isPlaceholder && (
          <div className="absolute right-3 top-3 rounded-full bg-gold/90 px-2.5 py-1 text-[9px] font-semibold uppercase tracking-wider text-maroon-700">
            Placeholder
          </div>
        )}
      </div>
      <div className="flex flex-1 flex-col p-5">
        <p className="text-xs font-medium uppercase tracking-wider text-gold-500">
          {isNews(item) ? item.department : isEvent(item) ? item.venue : ''}
        </p>
        <h3 className="mt-2 font-serif text-base font-bold leading-snug text-maroon-700 line-clamp-2">
          {item.title}
        </h3>
        <p className="mt-2 flex-1 text-sm leading-relaxed text-charcoal/60 line-clamp-3">
          {item.description}
        </p>
        <Link
          to={isNews(item) ? '/about#news' : '/about#events'}
          className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-600 transition-colors hover:text-gold"
        >
          {isNews(item) ? 'Read More' : 'View Details'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

export default function CarouselPanel({
  title,
  icon: Icon,
  items,
  accent,
  viewAllLink,
}: CarouselPanelProps) {
  const [index, setIndex] = useState(0);
  const [visibleCount, setVisibleCount] = useState(3);
  const containerRef = useRef<HTMLDivElement>(null);

  const updateVisible = useCallback(() => {
    if (!containerRef.current) return;
    const width = containerRef.current.offsetWidth;
    if (width < 500) setVisibleCount(1);
    else if (width < 800) setVisibleCount(2);
    else setVisibleCount(3);
  }, []);

  useEffect(() => {
    updateVisible();
    window.addEventListener('resize', updateVisible);
    return () => window.removeEventListener('resize', updateVisible);
  }, [updateVisible]);

  const maxIndex = Math.max(0, items.length - visibleCount);

  useEffect(() => {
    if (index > maxIndex) setIndex(maxIndex);
  }, [maxIndex, index]);

  const next = () => setIndex((i) => Math.min(i + 1, maxIndex));
  const prev = () => setIndex((i) => Math.max(i - 1, 0));

  const cardWidth = 100 / visibleCount;

  const headingColor = accent === 'maroon' ? 'text-maroon-700' : 'text-gold-600';
  const iconColor = accent === 'maroon' ? 'text-maroon-600' : 'text-gold';

  return (
    <div className="flex flex-col">
      {/* Header */}
      <div className="mb-5 flex items-center justify-between">
        <div className="flex items-center gap-3">
          <div className="flex h-10 w-10 items-center justify-center rounded-full border border-gold/30 bg-gold/10">
            <Icon className={`h-5 w-5 ${iconColor}`} strokeWidth={1.5} />
          </div>
          <h2 className={`font-serif text-xl font-bold ${headingColor} sm:text-2xl`}>{title}</h2>
        </div>
        <div className="flex items-center gap-3">
          <Link
            to={viewAllLink}
            className="hidden text-xs font-semibold uppercase tracking-wider text-gold-500 transition-colors hover:text-gold sm:inline"
          >
            View All
          </Link>
          <div className="flex gap-1.5">
            <button
              onClick={prev}
              disabled={index === 0}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-maroon-200 text-maroon-600 transition-all duration-200 hover:border-maroon-400 hover:bg-maroon-50 disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Previous"
            >
              <ChevronLeft className="h-4 w-4" />
            </button>
            <button
              onClick={next}
              disabled={index >= maxIndex}
              className="flex h-8 w-8 items-center justify-center rounded-full border border-maroon-200 text-maroon-600 transition-all duration-200 hover:border-maroon-400 hover:bg-maroon-50 disabled:opacity-30 disabled:hover:bg-transparent focus:outline-none focus-visible:ring-2 focus-visible:ring-gold"
              aria-label="Next"
            >
              <ChevronRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </div>

      {/* Carousel */}
      <div ref={containerRef} className="overflow-hidden">
        <div
          className="flex transition-transform duration-500 ease-out"
          style={{ transform: `translateX(-${index * cardWidth}%)` }}
        >
          {items.map((item) => (
            <div
              key={item.id}
              className="shrink-0 px-2"
              style={{ width: `${cardWidth}%` }}
            >
              <Card item={item} />
            </div>
          ))}
        </div>
      </div>

      {/* Pagination */}
      <div className="mt-5 flex items-center justify-center gap-1.5">
        {Array.from({ length: maxIndex + 1 }).map((_, i) => (
          <button
            key={i}
            onClick={() => setIndex(i)}
            aria-label={`Page ${i + 1}`}
            className={`h-1.5 rounded-full transition-all duration-300 ${
              i === index ? 'w-6 bg-gold' : 'w-1.5 bg-maroon-200 hover:bg-maroon-300'
            }`}
          />
        ))}
      </div>
    </div>
  );
}
