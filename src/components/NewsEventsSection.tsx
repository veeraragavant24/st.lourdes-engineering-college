
import { Newspaper, CalendarDays } from 'lucide-react';
import CarouselPanel from './CarouselPanel';
import { newsItems } from '@/data/news';
import { eventItems } from '@/data/events';

export default function NewsEventsSection() {
  return (
    <section className="relative overflow-hidden bg-[#2B0915] py-16 sm:py-20 lg:py-24">

      {/* Elegant gold decorative background */}
      <div className="pointer-events-none absolute inset-0 opacity-20">
        <div className="absolute -top-32 -right-32 h-96 w-96 rounded-full bg-[#C9A45C] blur-[120px]" />
        <div className="absolute -bottom-32 -left-32 h-96 w-96 rounded-full bg-[#7B263D] blur-[120px]" />
      </div>

      {/* Section divider */}
      <div className="relative mx-auto mb-12 max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="flex items-center gap-4">
          <div className="h-px flex-1 bg-gradient-to-r from-transparent to-[#C9A45C]" />

          <p className="text-xs font-bold uppercase tracking-[0.3em] text-[#D8B875]">
            Latest Updates
          </p>

          <div className="h-px flex-1 bg-gradient-to-l from-transparent to-[#C9A45C]" />
        </div>

        <h2 className="mt-5 text-center text-3xl font-bold tracking-tight text-[#F8EDDA] sm:text-4xl">
          News & <span className="text-[#D8B875]">Events</span>
        </h2>

        <p className="mt-3 text-center text-sm text-[#D7C2B9]">
          Stay connected with the latest stories and upcoming events.
        </p>
      </div>

      {/* News and Events panels */}
      <div className="relative mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
        <div className="grid gap-8 lg:grid-cols-2 lg:gap-7">

          {/* Vertical News Panel */}
          <div className="rounded-2xl border border-[#A47A43]/50 bg-[#401222]/95 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition duration-300 hover:border-[#D8B875]/80 sm:p-7">

            <CarouselPanel
              title="Latest News"
              icon={Newspaper}
              items={newsItems}
              accent="maroon"
              viewAllLink="/about#news"
              direction="vertical"
            />

          </div>

          {/* Horizontal Events Panel */}
          <div className="rounded-2xl border border-[#A47A43]/50 bg-[#401222]/95 p-6 shadow-[0_15px_45px_rgba(0,0,0,0.25)] transition duration-300 hover:border-[#D8B875]/80 sm:p-7">

            <CarouselPanel
              title="Upcoming Events"
              icon={CalendarDays}
              items={eventItems}
              accent="gold"
              viewAllLink="/about#events"
              direction="horizontal"
            />

            <p className="mt-5 rounded-lg border border-[#A47A43]/30 bg-[#2B0915]/70 px-4 py-3 text-center text-xs text-[#D8B875]">
              Upcoming events are editable placeholders — confirm details before publishing.
            </p>

          </div>

        </div>
      </div>
    </section>
  );
}
