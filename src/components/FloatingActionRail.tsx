
import { useEffect, useState } from 'react';
import {
  Phone,
  Mail,
  MapPin,
  MessageCircle,
  ArrowUp,
  ChevronRight,
} from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

interface RailItem {
  icon: typeof Phone;
  label: string;
  href?: string;
  onClick?: () => void;
  external?: boolean;
}

export default function FloatingActionRail() {
  const [showTop, setShowTop] = useState(false);
  const { openModal } = useAdmissionModal();

  useEffect(() => {
    const onScroll = () => setShowTop(window.scrollY > 400);
    window.addEventListener('scroll', onScroll, { passive: true });
    return () => window.removeEventListener('scroll', onScroll);
  }, []);

  const items: RailItem[] = [
    {
      icon: MessageCircle,
      label: 'WhatsApp',
      href: siteConfig.whatsapp || undefined,
      external: true,
    },
    {
      icon: Phone,
      label: 'Call Us',
      href: `tel:${siteConfig.phones[0].replace(/\s/g, '')}`,
    },
    {
      icon: Mail,
      label: 'Email Us',
      href: `mailto:${siteConfig.emails[0]}`,
    },
    {
      icon: MapPin,
      label: 'Location',
      href: siteConfig.mapUrl,
      external: true,
    },
  ];

  return (
    <>
      {/* Animated Gold Border Styles */}
      <style>{`
        @property --rail-shine-angle {
          syntax: '<angle>';
          initial-value: 0deg;
          inherits: false;
        }

        @keyframes railGoldShine {
          to {
            --rail-shine-angle: 360deg;
          }
        }

        .rail-gold-shine {
          position: relative;
          isolation: isolate;
        }

        .rail-gold-shine::before {
          content: '';
          position: absolute;
          inset: 0;
padding: 3px;
          border-radius: inherit;
          background: conic-gradient(
            from var(--rail-shine-angle),
            transparent 0deg,
            transparent 285deg,
            #9b702c 310deg,
            #d6ad52 325deg,
            #fff3b0 338deg,
            #d6ad52 350deg,
            transparent 360deg
          );

          -webkit-mask:
            linear-gradient(#fff 0 0) content-box,
            linear-gradient(#fff 0 0);
          -webkit-mask-composite: xor;
          mask-composite: exclude;

          pointer-events: none;
          z-index: 3;
          animation: railGoldShine 4s linear infinite;
filter:
  drop-shadow(0 0 4px rgba(224, 180, 83, 0.85))
  drop-shadow(0 0 8px rgba(255, 193, 75, 0.45));        }

        .rail-gold-shine > * {
          position: relative;
          z-index: 2;
        }

        @media (prefers-reduced-motion: reduce) {
          .rail-gold-shine::before {
            animation: none;
            --rail-shine-angle: 0deg;
          }
        }
      `}</style>

      <div className="fixed right-0 top-1/2 z-40 hidden -translate-y-1/2 lg:flex flex-col items-center gap-0">

        {/* Apply Now vertical button */}
        <button
          onClick={openModal}
className="rail-gold-shine group flex flex-col items-center gap-1 rounded-tl-2xl rounded-bl-2xl border-y border-l border-gold/40 bg-maroon-700 px-3 py-5 text-gold-100 transition-all duration-300 hover:bg-gold hover:text-maroon-900 hover:border-gold hover:pl-4"          aria-label="Apply Now"
        >
          <ChevronRight className="h-5 w-5 rotate-90" />

          <span
            className="font-sans text-xs font-semibold uppercase tracking-widest"
            style={{
              writingMode: 'vertical-rl',
              transform: 'rotate(180deg)',
            }}
          >
            Apply Now
          </span>
        </button>

        {/* Circular contact icons */}
        <div className="rail-gold-shine flex flex-col items-center gap-3 border-l border-gold/40 bg-maroon-800/90 py-4 backdrop-blur-md">

          {items.map((item) => {
            const Icon = item.icon;

            const content = (
              <span className="group relative flex items-center justify-center">

                <span className="flex h-11 w-11 items-center justify-center rounded-full border border-gold/30 bg-maroon-700 text-gold-100 transition-all duration-300 group-hover:scale-110 group-hover:border-gold group-hover:bg-gold group-hover:text-maroon-700">
                  <Icon className="h-5 w-5" strokeWidth={1.5} />
                </span>

                <span className="pointer-events-none absolute right-full mr-3 whitespace-nowrap rounded-lg bg-maroon-900 px-3 py-1.5 text-xs font-medium text-ivory opacity-0 shadow-lg transition-opacity duration-200 group-hover:opacity-100">
                  {item.label}
                </span>

              </span>
            );

            if (item.href) {
              return item.external ? (
                <a
                  key={item.label}
                  href={item.href}
                  target="_blank"
                  rel="noopener noreferrer"
                  aria-label={item.label}
                >
                  {content}
                </a>
              ) : (
                <a
                  key={item.label}
                  href={item.href}
                  aria-label={item.label}
                >
                  {content}
                </a>
              );
            }

            return (
              <button
                key={item.label}
                onClick={item.onClick}
                aria-label={item.label}
              >
                {content}
              </button>
            );
          })}

        </div>

        {/* Back to top */}
        {showTop && (
          <button
            onClick={() =>
              window.scrollTo({ top: 0, behavior: 'smooth' })
            }
            className="flex flex-col items-center rounded-bl-2xl border-b border-l border-gold/40 bg-maroon-700 px-3 py-3 text-gold-100 transition-all duration-300 hover:bg-maroon-600"
            aria-label="Back to top"
          >
            <ArrowUp className="h-5 w-5" strokeWidth={1.5} />
          </button>
        )}

      </div>
    </>
  );
}
