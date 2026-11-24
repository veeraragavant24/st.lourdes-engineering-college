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

/* ---------- internal CSS ---------- */

const styles = `
.ne-section {
  position: relative;
  overflow: hidden;
  border-top: 1px solid rgba(216, 181, 76, 0.6);
  border-bottom: 1px solid rgba(216, 181, 76, 0.6);
  background-color: #F2E6CC;
  padding: 4rem 0;
}

/* Decorative glows */
.ne-glows {
  pointer-events: none;
  position: absolute;
  inset: 0;
}
.ne-glow {
  position: absolute;
  height: 24rem;
  width: 24rem;
  border-radius: 9999px;
  filter: blur(120px);
}
.ne-glow-gold {
  top: -8rem;
  right: -8rem;
  background-color: rgba(216, 181, 76, 0.3);
}
.ne-glow-maroon {
  bottom: -8rem;
  left: -8rem;
  background-color: rgba(110, 24, 50, 0.15);
}

/* Shared container padding */
.ne-heading,
.ne-body {
  position: relative;
  margin-left: auto;
  margin-right: auto;
  max-width: 80rem;
  padding-left: 1.25rem;
  padding-right: 1.25rem;
}
.ne-heading {
  margin-bottom: 3rem;
}

/* Section heading */
.ne-heading-row {
  display: flex;
  align-items: center;
  gap: 1rem;
}
.ne-line {
  height: 1px;
  flex: 1 1 0%;
}
.ne-line-left {
  background-image: linear-gradient(to right, transparent, #A06F10);
}
.ne-line-right {
  background-image: linear-gradient(to left, transparent, #A06F10);
}
.ne-eyebrow {
  margin: 0;
  font-size: 0.75rem;
  line-height: 1rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: 0.3em;
  color: #7A5410;
}
.ne-title {
  margin: 1.25rem 0 0;
  text-align: center;
  font-family: ui-serif, Georgia, Cambria, "Times New Roman", Times, serif;
  font-size: 1.875rem;
  line-height: 2.25rem;
  font-weight: 700;
  letter-spacing: -0.025em;
  color: #3A0C1A;
}
.ne-title-accent {
  color: #9A6A0C;
}
.ne-subtitle {
  margin: 0.75rem 0 0;
  text-align: center;
  font-size: 0.875rem;
  line-height: 1.25rem;
  font-weight: 500;
  color: #4A3F44;
}

/* News and Events panels */
.ne-grid {
  display: grid;
  gap: 2rem;
}
.ne-panel {
  border-radius: 1rem;
  border: 1px solid rgba(164, 122, 67, 0.5);
  background-color: #401222;
  padding: 1.5rem;
  box-shadow: 0 18px 45px rgba(58, 12, 26, 0.28);
  transition: border-color 0.3s ease;
}
.ne-panel:hover {
  border-color: rgba(216, 184, 117, 0.8);
}

/* >= 640px */
@media (min-width: 640px) {
  .ne-section {
    padding: 5rem 0;
  }
  .ne-heading,
  .ne-body {
    padding-left: 2rem;
    padding-right: 2rem;
  }
  .ne-title {
    font-size: 2.25rem;
    line-height: 2.5rem;
  }
  .ne-panel {
    padding: 1.75rem;
  }
}

/* >= 1024px */
@media (min-width: 1024px) {
  .ne-section {
    padding: 6rem 0;
  }
  .ne-heading,
  .ne-body {
    padding-left: 3rem;
    padding-right: 3rem;
  }
  .ne-grid {
    grid-template-columns: repeat(2, minmax(0, 1fr));
    gap: 1.75rem;
  }
}
`;

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
  .filter((i) => i.type?.trim().toLowerCase() === 'news')
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
    <section className="ne-section">
      <style>{styles}</style>

      {/* Decorative glows */}
      <div className="ne-glows">
        <div className="ne-glow ne-glow-gold" />
        <div className="ne-glow ne-glow-maroon" />
      </div>

      {/* Section heading */}
      <div className="ne-heading">
        <div className="ne-heading-row">
          <div className="ne-line ne-line-left" />
          <p className="ne-eyebrow">Latest Updates</p>
          <div className="ne-line ne-line-right" />
        </div>

        <h2 className="ne-title">
          News &amp; <span className="ne-title-accent">Events</span>
        </h2>

        <p className="ne-subtitle">
          Stay connected with the latest stories and upcoming events.
        </p>
      </div>

      {/* News and Events panels */}
      <div className="ne-body">
        <div className="ne-grid">
          <div className="ne-panel">
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

          <div className="ne-panel">
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