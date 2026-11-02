import { Link } from 'react-router-dom';
import {
  ArrowRight,
  FileText,
  Download,
  Calendar,
  CheckCircle2,
  ShieldCheck,
  Newspaper,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { newsItems } from '@/data/news';
import { documents, approvals } from '@/data/documents';

export default function AboutSection() {
  return (
    <section className="section-pad bg-white">
      <div className="mx-auto max-w-7xl">
        <div className="grid gap-8 lg:grid-cols-12">
          {/* LEFT: About the College */}
          <div className="lg:col-span-5">
            <div className="relative overflow-hidden rounded-2xl shadow-xl">
              <img
                src="https://images.pexels.com/photos/11932106/pexels-photo-11932106.jpeg?auto=compress&cs=tinysrgb&w=700&h=500&fit=crop"
                alt="ST. Lourdes Engineering College campus"
                className="h-64 w-full object-cover sm:h-72"
                loading="lazy"
              />
              <div className="absolute inset-0 bg-gradient-to-t from-maroon-900/80 to-transparent" />

              {/* Maroon content panel overlapping bottom */}
              <div className="relative bg-gradient-to-br from-maroon-600 to-maroon-800 p-6 sm:p-8">
                <div className="absolute right-0 top-0 h-20 w-20 -translate-y-8 translate-x-8 rounded-full bg-gold/10" />
                <p className="eyebrow text-gold-100">About the College</p>
                <h2 className="mt-2 font-serif text-xl font-bold uppercase text-ivory sm:text-2xl">
                  ST. Lourdes Engineering College
                </h2>
                <div className="mt-3 h-px w-12 bg-gold/50" />
                <p className="mt-4 text-sm leading-relaxed text-ivory/70">
                  ST. Lourdes Engineering College is a pioneering institution in Chennai, founded by{' '}
                  {siteConfig.founder}. The college was established in {siteConfig.established} under
                  the self-financing scheme and is managed by {siteConfig.trust}. It is a Christian
                  Minority Institution located on NH45 at Erandam Kattalai, Tharapakkam, near
                  Anagaputhur, Chennai – 600128.
                </p>
                <Link
                  to="/about"
                  className="mt-5 inline-flex items-center gap-1.5 text-sm font-semibold text-gold-100 transition-colors hover:text-gold"
                >
                  Read More <ArrowRight className="h-4 w-4" />
                </Link>
              </div>
            </div>
          </div>

          {/* TOP-MIDDLE: Accreditation & Approvals */}
          <div className="lg:col-span-3">
            <div className="flex h-full flex-col rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm">
              <div className="flex items-center gap-3">
                <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                  <ShieldCheck className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <h3 className="font-serif text-lg font-bold text-maroon-700">
                  Accreditation &amp; Approvals
                </h3>
              </div>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <div className="mt-5 flex flex-1 flex-col gap-4">
                {approvals.map((apr) => (
                  <div
                    key={apr.id}
                    className="flex items-center gap-4 rounded-xl border border-gold/10 bg-white p-4 transition-shadow duration-300 hover:shadow-md"
                  >
                    <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-lg border border-gold/20 bg-gradient-to-br from-maroon-50 to-ivory">
                      {apr.logoUrl ? (
                        <img src={apr.logoUrl} alt={apr.name} className="max-h-full max-w-full p-1 object-contain" />
                      ) : (
                        <CheckCircle2 className="h-7 w-7 text-gold" strokeWidth={1.5} />
                      )}
                    </div>
                    <div>
                      <p className="font-serif text-sm font-bold text-maroon-700">{apr.name}</p>
                      <p className="mt-0.5 text-xs leading-snug text-charcoal/55">{apr.description}</p>
                    </div>
                  </div>
                ))}
              </div>
              <p className="mt-4 text-xs text-charcoal/40">
                Only verified approval claims are listed. Additional accreditations pending official confirmation.
              </p>
            </div>
          </div>

          {/* MIDDLE: Latest News & Events summary */}
          <div className="lg:col-span-4">
            <div className="flex h-full flex-col rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm">
              <div className="flex items-center justify-between">
                <div className="flex items-center gap-3">
                  <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                    <Newspaper className="h-5 w-5" strokeWidth={1.5} />
                  </div>
                  <h3 className="font-serif text-lg font-bold text-maroon-700">
                    Latest News &amp; Events
                  </h3>
                </div>
                <Link
                  to="/about#news"
                  className="text-xs font-semibold uppercase tracking-wider text-gold-500 hover:text-gold"
                >
                  View All
                </Link>
              </div>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <ul className="mt-4 flex-1 space-y-3">
                {newsItems.slice(0, 4).map((news) => (
                  <li key={news.id}>
                    <Link
                      to="/about#news"
                      className="group flex gap-3 rounded-lg p-2 transition-colors hover:bg-white"
                    >
                      <div className="flex flex-col items-center justify-center rounded-lg bg-maroon-600 px-2.5 py-1.5 text-center shrink-0">
                        <Calendar className="h-3 w-3 text-gold" />
                        <span className="mt-1 text-[10px] font-bold leading-none text-ivory">
                          {news.dateLabel.split(' ')[0]}
                        </span>
                        <span className="text-[8px] uppercase leading-none text-gold-100">
                          {news.dateLabel.split(' ')[1]}
                        </span>
                      </div>
                      <div className="min-w-0">
                        <p className="text-sm font-medium text-maroon-700 line-clamp-2 group-hover:text-gold">
                          {news.title}
                        </p>
                        <p className="mt-0.5 text-xs text-charcoal/50 line-clamp-1">
                          {news.department}
                        </p>
                      </div>
                    </Link>
                  </li>
                ))}
              </ul>
            </div>
          </div>
        </div>

        {/* RIGHT: Accreditation & Activities Documents — full width row */}
        <div className="mt-8 rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm sm:p-8">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
              <FileText className="h-5 w-5" strokeWidth={1.5} />
            </div>
            <div>
              <h3 className="font-serif text-lg font-bold text-maroon-700">
                Accreditation &amp; Activities
              </h3>
              <p className="text-xs text-charcoal/50">Official documents and reports</p>
            </div>
          </div>
          <div className="mt-4 h-px w-12 bg-gold/30" />

          <div className="mt-5 grid gap-3 sm:grid-cols-2 lg:grid-cols-3">
            {documents.map((doc) => (
              <div
                key={doc.id}
                className="group flex items-center gap-3 rounded-xl border border-gold/10 bg-white p-4 transition-all duration-300 hover:border-gold/30 hover:shadow-md"
              >
                <div className="flex h-10 w-10 shrink-0 items-center justify-center rounded-lg bg-maroon-50 text-maroon-600 transition-colors duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                  <FileText className="h-5 w-5" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="text-sm font-medium text-charcoal line-clamp-2">{doc.title}</p>
                  <p className="text-[10px] uppercase tracking-wider text-gold-500">{doc.category}</p>
                </div>
                {doc.filePath ? (
                  <a
                    href={doc.filePath}
                    download
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-gold/30 text-gold transition-all duration-300 hover:bg-gold hover:text-maroon-700"
                    aria-label={`Download ${doc.title}`}
                  >
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                  </a>
                ) : (
                  <span
                    className="flex h-9 w-9 shrink-0 items-center justify-center rounded-full border border-charcoal/10 text-charcoal/30"
                    title="File unavailable"
                    aria-label="File unavailable"
                  >
                    <Download className="h-4 w-4" strokeWidth={1.5} />
                  </span>
                )}
              </div>
            ))}
          </div>
          <p className="mt-4 text-xs text-charcoal/40">
            Documents will be available for download once official files are supplied. Unavailable
            files show a disabled download icon.
          </p>
        </div>
      </div>
    </section>
  );
}
