import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  breadcrumb: string;
}

export default function PageHero({ eyebrow, title, description, image, breadcrumb }: PageHeroProps) {
  return (
    <section className="relative flex min-h-[50vh] items-end overflow-hidden pt-20">
      <img src={image} alt="" className="absolute inset-0 h-full w-full object-cover" />
      <div className="absolute inset-0 bg-gradient-to-r from-maroon-900/90 via-maroon-900/60 to-maroon-900/30" />
      <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent" />

      <div className="relative z-10 mx-auto w-full max-w-7xl px-5 py-16 sm:px-8 lg:px-12 lg:py-20">
        <p className="eyebrow text-gold-100 animate-fade-in-up">{eyebrow}</p>
        <h1 className="mt-3 font-serif text-4xl font-bold text-ivory animate-fade-in-up sm:text-5xl lg:text-6xl">
          {title}
        </h1>
        {description && (
          <p className="mt-4 max-w-2xl text-base leading-relaxed text-ivory/70 animate-fade-in-up">
            {description}
          </p>
        )}
        {/* Breadcrumb */}
        <nav className="mt-6 flex items-center gap-2 text-sm text-ivory/50">
          <Link to="/" className="transition-colors hover:text-gold-100">
            Home
          </Link>
          <ChevronRight className="h-4 w-4" />
          <span className="text-gold-100">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}
