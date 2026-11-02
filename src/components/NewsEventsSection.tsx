import { Newspaper, CalendarDays } from 'lucide-react';
import CarouselPanel from './CarouselPanel';
import { newsItems } from '@/data/news';
import { eventItems } from '@/data/events';

export default function NewsEventsSection() {
  return (
    <section className="relative bg-gradient-to-b from-ivory to-white py-16 sm:py-20 lg:py-24">
      {/* Subtle gold divider */}
      <div className="mx-auto mb-10 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-gold/30" />
          <p className="eyebrow">Latest Updates</p>
          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-gold/30" />
        </div>
      </div>

      <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-6">
          {/* News panel */}
          <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm sm:p-7">
            <CarouselPanel
              title="Latest News"
              icon={Newspaper}
              items={newsItems}
              accent="maroon"
              viewAllLink="/about#news"
            />
          </div>

          {/* Events panel */}
          <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm sm:p-7">
            <CarouselPanel
              title="Upcoming Events"
              icon={CalendarDays}
              items={eventItems}
              accent="gold"
              viewAllLink="/about#events"
            />
            <p className="mt-4 rounded-lg bg-gold-50 px-4 py-2 text-center text-xs text-gold-600">
              Upcoming events are editable placeholders — confirm details before publishing.
            </p>
          </div>
        </div>
      </div>
    </section>
  );
}
