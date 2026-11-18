import { useEffect, useRef, useState } from 'react';
import type { CSSProperties } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import { Calendar, ArrowRight } from 'lucide-react';

import type { NewsItem } from '@/data/news';
import type { EventItem } from '@/data/events';

type ItemType = NewsItem | EventItem;
type ScrollDirection = 'vertical' | 'horizontal';

interface CarouselPanelProps {
  title: string;
  icon: typeof Calendar;
  items: ItemType[];
  accent?: 'maroon' | 'gold';
  viewAllLink: string;
  itemLink?: string;
  emptyText?: string;
  direction?: ScrollDirection;
}

function isNews(item: ItemType): item is NewsItem {
  return 'department' in item;
}

function isEvent(item: ItemType): item is EventItem {
  return 'venue' in item;
}

// Scroll speed in pixels per second
const SPEED = 28;
// Space between cards in px (must match the CSS below)
const GAP = 14;

// --------------------------------------------------
// CARD COMPONENT
// --------------------------------------------------

function Card({
  item,
  direction,
  to,
  isClone = false,
}: {
  item: ItemType;
  direction: ScrollDirection;
  to: string;
  isClone?: boolean;
}) {
  const news = isNews(item);
  const navigate = useNavigate();
  const [day = '', month = ''] = (item.dateLabel ?? '').split(' ');

  return (
    <article
      onClick={() => navigate(to)}
      className="
        news-event-card group
        flex h-full flex-col overflow-hidden
        rounded-xl border border-[#E9DCC9]
        bg-white shadow-sm
        transition-all duration-300
        hover:-translate-y-1
        hover:shadow-xl hover:shadow-black/15
      "
    >
      {/* IMAGE */}
      <div
        className={`relative overflow-hidden ${
          direction === 'horizontal' ? 'h-36' : 'h-32'
        }`}
      >
        <img
          src={item.image}
          alt={isClone ? '' : item.title}
          loading="lazy"
          className="h-full w-full object-cover transition-transform duration-500 group-hover:scale-105"
        />

        {/* DATE BADGE */}
        <div className="absolute left-3 top-3 flex flex-col items-center rounded-lg bg-[#64182C]/95 px-3 py-1.5 shadow-lg backdrop-blur-sm">
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F8E6BC]">
            {month}
          </span>
          <span className="font-serif text-lg font-bold leading-none text-white">
            {day}
          </span>
        </div>

        {/* PLACEHOLDER BADGE */}
        {isEvent(item) && item.isPlaceholder && (
          <div className="absolute right-3 top-3 rounded-full bg-[#D6AD55] px-2.5 py-1 text-[9px] font-bold uppercase tracking-wider text-[#421321]">
            Placeholder
          </div>
        )}
      </div>

      {/* CARD CONTENT */}
      <div className="flex flex-1 flex-col p-4">
        <p className="text-[11px] font-bold uppercase tracking-wider text-[#A77E36]">
          {news ? item.department : isEvent(item) ? item.venue : ''}
        </p>

        <h3 className="mt-2 line-clamp-2 font-serif text-base font-bold leading-snug text-[#64182C]">
          {item.title}
        </h3>

        <p className="mt-2 line-clamp-3 flex-1 text-sm leading-relaxed text-gray-500">
          {item.description}
        </p>

        <Link
          to={to}
          tabIndex={isClone ? -1 : undefined}
          onClick={(e) => e.stopPropagation()}
          className="mt-3 inline-flex items-center gap-1.5 text-xs font-bold uppercase tracking-wider text-[#801E37] transition-colors hover:text-[#B58A3A]"
        >
          {news ? 'Read More' : 'View Details'}
          <ArrowRight className="h-3.5 w-3.5 transition-transform duration-200 group-hover:translate-x-1" />
        </Link>
      </div>
    </article>
  );
}

// --------------------------------------------------
// MAIN CAROUSEL PANEL
// --------------------------------------------------

export default function CarouselPanel({
  title,
  icon: Icon,
  items,
  viewAllLink,
  itemLink = '/news-events',
  emptyText = 'No updates available at the moment.',
  direction,
}: CarouselPanelProps) {
  const viewportRef = useRef<HTMLDivElement>(null);
  const firstSetRef = useRef<HTMLDivElement>(null);

  // Size (px) of ONE full set of cards, including the trailing gap.
  // The track slides by exactly this much, then restarts = seamless loop.
  const [loopDistance, setLoopDistance] = useState(0);
  const [shouldLoop, setShouldLoop] = useState(false);

  const scrollDirection: ScrollDirection =
    direction ??
    (items.length > 0
      ? isNews(items[0])
        ? 'vertical'
        : 'horizontal'
      : title.toLowerCase().includes('news')
        ? 'vertical'
        : 'horizontal');

  const isVertical = scrollDirection === 'vertical';

  useEffect(() => {
    const viewport = viewportRef.current;
    const firstSet = firstSetRef.current;

    if (!viewport || !firstSet) {
      setLoopDistance(0);
      setShouldLoop(false);
      return;
    }

    const measure = () => {
      const setSize = isVertical ? firstSet.offsetHeight : firstSet.offsetWidth;
      const viewSize = isVertical ? viewport.clientHeight : viewport.clientWidth;

      setLoopDistance(setSize);
      // Loop only when the cards (without trailing gap) don't fit in the box
      setShouldLoop(setSize - GAP > viewSize + 4);
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(firstSet);

    return () => observer.disconnect();
  }, [items, isVertical]);

  const duration = Math.max(10, Math.round(loopDistance / SPEED));

  const trackStyle: CSSProperties | undefined = shouldLoop
    ? ({
        '--loop-distance': `${loopDistance}px`,
        animationDuration: `${duration}s`,
      } as CSSProperties)
    : undefined;

  const renderSet = (isClone: boolean) =>
    items.map((item) => (
      <div
        key={`${isClone ? 'clone-' : ''}${item.id}`}
        className="news-event-item"
      >
        <Card
          item={item}
          direction={scrollDirection}
          to={itemLink}
          isClone={isClone}
        />
      </div>
    ));

  return (
    <div className="news-event-panel flex h-full min-w-0 flex-col rounded-2xl border border-[#80503E] bg-[#421321] p-4 shadow-md sm:p-5">
      {/* HEADER */}
      <div className="mb-4 flex items-center justify-between gap-2">
        <div className="flex min-w-0 items-center gap-3">
          <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-[#B58A3A]/50 bg-[#B58A3A]/10">
            <Icon className="h-5 w-5 text-[#D6AD55]" strokeWidth={1.8} />
          </div>

          <h2 className="font-serif text-xl font-extrabold tracking-wide text-[#D6AD55] sm:text-2xl">
            {title}
          </h2>
        </div>

        <Link
          to={viewAllLink}
          className="shrink-0 text-xs font-bold uppercase tracking-wider text-[#D6AD55] transition-colors hover:text-white"
        >
          View All
        </Link>
      </div>

      {/* EMPTY STATE */}
      {items.length === 0 ? (
        <div className="flex min-h-[240px] items-center justify-center text-center text-sm text-[#E6D6BB]/70">
          {emptyText}
        </div>
      ) : (
        <div
          ref={viewportRef}
          className={`news-event-viewport ${
            isVertical ? 'is-vertical' : 'is-horizontal'
          }`}
        >
          <div
            style={trackStyle}
            className={`news-event-track ${
              isVertical ? 'is-vertical' : 'is-horizontal'
            } ${shouldLoop ? 'is-animated' : ''}`}
          >
            {/* Original set (measured) */}
            <div ref={firstSetRef} className="news-event-set">
              {renderSet(false)}
            </div>

            {/* Duplicate set for the seamless loop */}
            {shouldLoop && (
              <div className="news-event-set" aria-hidden="true">
                {renderSet(true)}
              </div>
            )}
          </div>
        </div>
      )}

      <style>{`
        .news-event-viewport {
          position: relative;
          width: 100%;
          height: 330px;
          overflow: hidden;
        }

        .news-event-track {
          display: flex;
          padding: 6px;               /* room for hover lift + shadow */
          will-change: transform;
        }

        .news-event-set {
          display: flex;
          gap: ${GAP}px;
        }

        /* ---------- NEWS: vertical, moves UP ---------- */
        .news-event-track.is-vertical {
          flex-direction: column;
          width: 100%;
        }
        .news-event-track.is-vertical .news-event-set {
          flex-direction: column;
          padding-bottom: ${GAP}px;   /* trailing gap => exact loop size */
        }
        .news-event-track.is-vertical .news-event-item {
          width: 100%;
          flex: 0 0 auto;
        }

        /* ---------- EVENTS: horizontal, moves LEFT ---------- */
        .news-event-track.is-horizontal {
          flex-direction: row;
          width: max-content;
        }
        .news-event-track.is-horizontal .news-event-set {
          flex-direction: row;
          align-items: stretch;
          padding-right: ${GAP}px;    /* trailing gap => exact loop size */
        }
        .news-event-track.is-horizontal .news-event-item {
          flex: 0 0 210px;
          width: 210px;
        }

        /* ---------- Continuous, one-direction animation ---------- */
        .news-event-track.is-vertical.is-animated {
          animation: newsScrollUp linear infinite;
        }
        .news-event-track.is-horizontal.is-animated {
          animation: eventsScrollLeft linear infinite;
        }

        @keyframes newsScrollUp {
          from { transform: translateY(0); }
          to   { transform: translateY(calc(var(--loop-distance) * -1)); }
        }

        @keyframes eventsScrollLeft {
          from { transform: translateX(0); }
          to   { transform: translateX(calc(var(--loop-distance) * -1)); }
        }

        /* Pause while hovering or when a link inside has keyboard focus */
        .news-event-viewport:hover .news-event-track,
        .news-event-viewport:focus-within .news-event-track {
          animation-play-state: paused;
        }

        .news-event-card {
          cursor: pointer;
        }

        /* Respect reduced-motion: no animation, allow manual scrolling */
        @media (prefers-reduced-motion: reduce) {
          .news-event-track.is-animated {
            animation: none;
          }
          .news-event-viewport {
            overflow: auto;
          }
        }
      `}</style>
    </div>
  );
}