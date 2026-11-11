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
  accent: 'maroon' | 'gold';
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

// --------------------------------------------------
// CARD COMPONENT
// --------------------------------------------------

function Card({
  item,
  direction,
  to,
}: {
  item: ItemType;
  direction: ScrollDirection;
  to: string;
}) {
  const news = isNews(item);
  const navigate = useNavigate();

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
        className={`
          relative overflow-hidden
          ${direction === 'horizontal' ? 'h-36' : 'h-32'}
        `}
      >
        <img
          src={item.image}
          alt={item.title}
          loading="lazy"
          className="
            h-full w-full object-cover
            transition-transform duration-500
            group-hover:scale-105
          "
        />

        {/* DATE BADGE */}
        <div
          className="
            absolute left-3 top-3
            flex flex-col items-center
            rounded-lg bg-[#64182C]/95
            px-3 py-1.5 shadow-lg
            backdrop-blur-sm
          "
        >
          <span className="text-[10px] font-semibold uppercase tracking-wider text-[#F8E6BC]">
            {item.dateLabel.split(' ')[1]}
          </span>

          <span className="font-serif text-lg font-bold leading-none text-white">
            {item.dateLabel.split(' ')[0]}
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
          onClick={(e) => e.stopPropagation()}
          className="
            mt-3 inline-flex items-center
            gap-1.5 text-xs font-bold
            uppercase tracking-wider
            text-[#801E37]
            transition-colors hover:text-[#B58A3A]
          "
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
  const trackRef = useRef<HTMLDivElement>(null);

  // How far (px) the track has to travel to show every card
  const [distance, setDistance] = useState(0);

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

  // Measure how much the content overflows the box
  useEffect(() => {
    const viewport = viewportRef.current;
    const track = trackRef.current;

    if (!viewport || !track) {
      setDistance(0);
      return;
    }

    const measure = () => {
      const overflow = isVertical
        ? track.offsetHeight - viewport.clientHeight
        : track.offsetWidth - viewport.clientWidth;

      setDistance(Math.max(0, Math.round(overflow)));
    };

    measure();

    const observer = new ResizeObserver(measure);
    observer.observe(viewport);
    observer.observe(track);

    return () => observer.disconnect();
  }, [items, isVertical]);

  // Animate only when the cards do not fit in the box
  const shouldAnimate = distance > 8;
  const duration = Math.max(10, Math.round(distance / SPEED));

  const trackStyle: CSSProperties | undefined = shouldAnimate
    ? ({
        '--scroll-distance': `${distance}px`,
        animationDuration: `${duration}s`,
      } as CSSProperties)
    : undefined;

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
            isVertical
              ? 'news-event-vertical-viewport'
              : 'news-event-horizontal-viewport'
          }`}
        >
          <div
            ref={trackRef}
            style={trackStyle}
            className={`news-event-track ${
              isVertical
                ? 'news-event-vertical-track'
                : 'news-event-horizontal-track'
            } ${shouldAnimate ? 'is-animated' : ''}`}
          >
            {items.map((item) => (
              <div
                key={item.id}
                className="news-event-item"
                style={!isVertical ? { width: '210px' } : undefined}
              >
                <Card item={item} direction={scrollDirection} to={itemLink} />
              </div>
            ))}
          </div>
        </div>
      )}

      <style>{`
        .news-event-viewport {
          position: relative;
          width: 100%;
          height: 300px;
          overflow: hidden;
        }

        .news-event-track {
          display: flex;
          gap: 14px;
          padding: 4px 2px;
          will-change: transform;
        }

        /* Events: cards in a row */
        .news-event-horizontal-track {
          width: max-content;
          flex-direction: row;
          align-items: stretch;
        }

        .news-event-horizontal-track .news-event-item {
          flex: 0 0 210px;
        }

        /* News: cards in a column */
        .news-event-vertical-track {
          width: 100%;
          flex-direction: column;
        }

        .news-event-vertical-track .news-event-item {
          width: 100%;
          flex: 0 0 auto;
        }

        /* Scroll to the end, pause, then scroll back. No cloned cards. */
        .news-event-horizontal-track.is-animated {
          animation: newsEventHorizontal 30s linear infinite alternate;
        }

        .news-event-vertical-track.is-animated {
          animation: newsEventVertical 30s linear infinite alternate;
        }

        @keyframes newsEventHorizontal {
          0%, 6%    { transform: translateX(0); }
          94%, 100% { transform: translateX(calc(var(--scroll-distance) * -1)); }
        }

        @keyframes newsEventVertical {
          0%, 6%    { transform: translateY(0); }
          94%, 100% { transform: translateY(calc(var(--scroll-distance) * -1)); }
        }

        /* Pause while the mouse is over the list */
        .news-event-viewport:hover .news-event-track {
          animation-play-state: paused;
        }

        .news-event-card {
          cursor: pointer;
        }
      `}</style>
    </div>
  );
}