import { useCallback, useEffect, useMemo, useState } from 'react';
import { Newspaper, CalendarDays } from 'lucide-react';
import CarouselPanel from './CarouselPanel';
import { getNewsEvents, type NewsEventItem } from '@/services/newsEventsApi';
import type { NewsItem } from '@/data/news';
import type { EventItem } from '@/data/events';

/* Change this if your News & Events page uses a different route */
const NEWS_EVENTS_PATH = '/news-events';

const MAX_ITEMS = 8;

type Raw = NewsEventItem & {
  imageUrl?: string | null;
  imageURL?: string | null;
  ImageUrl?: string | null;
  imagePath?: string | null;
  image?: string | null;
  venue?: string | null;
  location?: string | null;
  department?: string | null;
  organizer?: string | null;
  content?: string | null;
  excerpt?: string | null;
};

/* ---------- helpers (same rules as the News & Events page) ---------- */

const getIndiaDateKey = (value: string | Date): string | null => {
  if (!value) return null;
  const text = String(value).trim();
  if (/^\d{4}-\d{2}-\d{2}$/.test(text)) return text;

  const parsed = new Date(value);
  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat('en-CA', {
    timeZone: 'Asia/Kolkata',
    year: 'numeric',
    month: '2-digit',
    day: '2-digit',
  }).format(parsed);
};

// "15 Aug" -> the card shows "AUG" above "15"
const toDateLabel = (date: string) => {
  const parsed = new Date(date);
  if (Number.isNaN(parsed.getTime())) return '-- TBA';

  const day = parsed.toLocaleDateString('en-IN', {
    day: '2-digit',
    timeZone: 'Asia/Kolkata',
  });
  const month = parsed.toLocaleDateString('en-IN', {
    month: 'short',
    timeZone: 'Asia/Kolkata',
  });

  return `${day} ${month}`;
};

const getImage = (r: Raw) =>
  r.imageUrl || r.imageURL || r.ImageUrl || r.imagePath || r.image || '';

const getText = (r: Raw) =>
  r.excerpt || r.content || 'Discover the latest activities at our college.';

/* ---------- convert live data into the shape CarouselPanel uses ---------- */

const toNewsItem = (item: NewsEventItem): NewsItem => {
  const r = item as Raw;
  return {
    id: item.id ?? `${item.title}-${item.date}`,
    title: item.title,
    description: getText(r),
    image: getImage(r),
    dateLabel: toDateLabel(item.date),
    department: r.department || r.organizer || 'ST. Lourdes Engineering College',
  } as unknown as NewsItem;
};

const toEventItem = (item: NewsEventItem): EventItem => {
  const r = item as Raw;
  return {
    id: item.id ?? `${item.title}-${item.date}`,
    title: item.title,
    description: getText(r),
    image: getImage(r),
    dateLabel: toDateLabel(item.date),
    venue: r.venue || r.location || 'ST. Lourdes Engineering College',
    isPlaceholder: false,
  } as unknown as EventItem;
};

/* ---------- section ---------- */

export default function NewsEventsSection() {
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState('');

  const load = useCallback(async () => {
    try {
      setLoading(true);
      setError('');
      const result = await getNewsEvents();
      setItems(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(err instanceof Error ? err.message : 'Unable to load updates.');
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void load();
  }, [load]);

  const { newsItems, eventItems } = useMemo(() => {
    const today = getIndiaDateKey(new Date())!;

    const unique = Array.from(
      new Map(
        items.map((item) => [
          item.id != null ? String(item.id) : `${item.type}-${item.title}-${item.date}`,
          item,
        ])
      ).values()
    );

    const isVisible = (item: NewsEventItem) => {
      const key = getIndiaDateKey(item.date);
      return key ? key >= today : false;
    };

    const news = unique
      .filter((i) => i.type?.trim().toLowerCase() === 'news' && isVisible(i))
      .sort((a, b) => new Date(b.date).getTime() - new Date(a.date).getTime())
      .slice(0, MAX_ITEMS)
      .map(toNewsItem);

    const events = unique
      .filter((i) => i.type?.trim().toLowerCase() === 'event' && isVisible(i))
      .sort((a, b) => new Date(a.date).getTime() - new Date(b.date).getTime())
      .slice(0, MAX_ITEMS)
      .map(toEventItem);

    return { newsItems: news, eventItems: events };
  }, [items]);

  const emptyNews = loading
    ? 'Loading updates...'
    : error
      ? 'Unable to load updates right now.'
      : 'No news updates available at the moment.';

  const emptyEvents = loading
    ? 'Loading updates...'
    : error
      ? 'Unable to load updates right now.'
      : 'No events available at the moment.';

  return (
    <section className="relative overflow-hidden border-y border-[#D8B54C]/60 bg-[#F2E6CC] py-16 sm:py-20 lg:py-24">

      {/* Decorative glows */}
      <div className="pointer-events-none absolute inset-0">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#D8B54C]/30 blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#6E1832]/15 blur-[120px]" />
      </div>

      {/* Section heading */}
      <div className="relative mx-auto mb-12 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#A06F10]" />
          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#7A5410]">
            Latest Updates
          </p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#A06F10]" />
        </div>

        <h2 className="mt-5 text-center font-serif text-3xl font-bold tracking-tight text-[#3A0C1A] sm:text-4xl">
          News &amp; <span className="text-[#9A6A0C]">Events</span>
        </h2>

        <p className="mt-3 text-center text-sm font-medium text-[#4A3F44]">
          Stay connected with the latest stories and upcoming events.
        </p>
      </div>

      {/* News and Events panels */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-7">

          <div className="rounded-2xl border border-[#A47A43]/50 bg-[#401222] p-6 shadow-[0_18px_45px_rgba(58,12,26,0.28)] transition duration-300 hover:border-[#D8B875]/80 sm:p-7">
            <CarouselPanel
              title="Latest News"
              icon={Newspaper}
              items={newsItems}
              accent="maroon"
              viewAllLink={NEWS_EVENTS_PATH}
              itemLink={NEWS_EVENTS_PATH}
              emptyText={emptyNews}
              direction="vertical"
            />
          </div>

          <div className="rounded-2xl border border-[#A47A43]/50 bg-[#401222] p-6 shadow-[0_18px_45px_rgba(58,12,26,0.28)] transition duration-300 hover:border-[#D8B875]/80 sm:p-7">
            <CarouselPanel
              title="Upcoming Events"
              icon={CalendarDays}
              items={eventItems}
              accent="gold"
              viewAllLink={NEWS_EVENTS_PATH}
              itemLink={NEWS_EVENTS_PATH}
              emptyText={emptyEvents}
              direction="horizontal"
            />
          </div>

        </div>
      </div>
    </section>
  );
}