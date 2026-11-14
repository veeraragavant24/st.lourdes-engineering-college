import { useEffect, useRef, useState } from 'react';
import { ChevronLeft, ChevronRight } from 'lucide-react';

type Recruiter = {
  id: number;
  name: string;
  logo: string;
};

// Folder name must match the folder inside /public exactly (it is spelled "recuiters" here)
const recruiters: Recruiter[] = [
  { id: 1, name: 'Google', logo: '/recuiters/google.png' },
  { id: 2, name: 'Accenture', logo: '/recuiters/accenture.png' },
  { id: 3, name: 'Cognizant', logo: '/recuiters/cognizant.png' },
  { id: 4, name: 'HCL Tech', logo: '/recuiters/hcl.jpg' },
  { id: 5, name: 'Flipkart', logo: '/recuiters/flipkart.png' },
  { id: 6, name: 'Amazon', logo: '/recuiters/amazon.png' },
  { id: 7, name: 'Mahindra', logo: '/recuiters/mahindra.jpg' },
  { id: 8, name: 'Infosys', logo: '/recuiters/infosys.png' },
  { id: 9, name: 'IBM', logo: '/recuiters/IBM.png' },
  { id: 10, name: 'Hexaware', logo: '/recuiters/hexaware.jpg' },
  { id: 11, name: 'L&T Infotech', logo: '/recuiters/l&tinfotech.png' },
  { id: 12, name: 'L & T', logo: '/recuiters/l&t.png' },
  { id: 13, name: 'Polaris', logo: '/recuiters/polaris.jpg' },
  { id: 14, name: 'QSpiders', logo: '/recuiters/Qspider.png' },
  { id: 15, name: 'Sutherland', logo: '/recuiters/sutherland.jpg' },
  { id: 16, name: 'TCS', logo: '/recuiters/tcs.jpg' },
  { id: 17, name: 'Vertafore', logo: '/recuiters/vertafare.jpg' },
  { id: 18, name: 'Why Global Service', logo: '/recuiters/why-global.png' },
  { id: 19, name: 'Wipro', logo: '/recuiters/wipro.png' },
  { id: 20, name: 'Zoho', logo: '/recuiters/zoho.png' },
];

/* Shows the logo, or the company name if the image is missing */
function RecruiterCard({
  rec,
  duplicate,
  onPause,
  onResume,
}: {
  rec: Recruiter;
  duplicate: boolean;
  onPause: () => void;
  onResume: () => void;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div
      className="recruiter-card"
      data-company={rec.name.toLowerCase()}
      onMouseEnter={!duplicate ? onPause : undefined}
      onMouseLeave={!duplicate ? onResume : undefined}
      onFocus={!duplicate ? onPause : undefined}
      onBlur={!duplicate ? onResume : undefined}
      tabIndex={duplicate ? -1 : 0}
    >
      {rec.logo && !failed ? (
        <img
          src={rec.logo}
          alt={duplicate ? '' : rec.name}
          className="recruiter-logo"
          loading="eager"
          decoding="async"
          draggable={false}
          onError={() => setFailed(true)}
        />
      ) : (
        <span className="recruiter-name">{rec.name}</span>
      )}
    </div>
  );
}

export default function RecruitersSection() {
  const scrollRef = useRef<HTMLDivElement>(null);
  const isPaused = useRef(false);

  // AUTOMATIC INFINITE CAROUSEL
  useEffect(() => {
    const container = scrollRef.current;
    if (!container) return;

    let animationFrame = 0;
    let previousTime = 0;
    let position = container.scrollLeft; // keeps decimals, scrollLeft alone can round them away

    const speed = 35;

    const animate = (time: number) => {
      if (!previousTime) previousTime = time;

      const delta = Math.min((time - previousTime) / 1000, 0.05);
      previousTime = time;

      const halfWidth = container.scrollWidth / 2;

      if (isPaused.current) {
        // follow manual scrolling while paused
        position = container.scrollLeft;
      } else if (halfWidth > 0) {
        position += speed * delta;

        if (position >= halfWidth) position -= halfWidth;

        container.scrollLeft = position;
      }

      animationFrame = requestAnimationFrame(animate);
    };

    animationFrame = requestAnimationFrame(animate);

    return () => cancelAnimationFrame(animationFrame);
  }, []);

  // MANUAL NAVIGATION
  const scroll = (direction: 'left' | 'right') => {
    const container = scrollRef.current;
    if (!container) return;

    container.scrollBy({
      left:
        direction === 'left'
          ? -container.clientWidth * 0.65
          : container.clientWidth * 0.65,
      behavior: 'smooth',
    });
  };

  const pauseMovement = () => {
    isPaused.current = true;
  };

  const resumeMovement = () => {
    isPaused.current = false;
  };

  return (
    <section className="recruiters-section section-pad">
      <div className="mx-auto max-w-7xl">
        {/* HEADER */}
        <div className="mb-12 text-center">
          <p className="recruiters-eyebrow">Our Hiring Partners</p>

          <h2 className="recruiters-heading mt-3 font-serif text-3xl font-bold sm:text-4xl lg:text-5xl">
            Top Recruiters
          </h2>

          <div className="recruiters-divider mx-auto mt-4 h-px w-20" />

          <p className="recruiters-description mx-auto mt-4 max-w-xl text-sm">
            Leading companies that recruit our students every year.
          </p>
        </div>

        {/* CAROUSEL */}
        <div className="relative recruiters-carousel">
          <button
            type="button"
            onClick={() => scroll('left')}
            onMouseEnter={pauseMovement}
            onMouseLeave={resumeMovement}
            className="recruiters-control absolute -left-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-300 sm:-left-5"
            aria-label="Scroll left"
          >
            <ChevronLeft className="h-5 w-5" />
          </button>

          <button
            type="button"
            onClick={() => scroll('right')}
            onMouseEnter={pauseMovement}
            onMouseLeave={resumeMovement}
            className="recruiters-control absolute -right-3 top-1/2 z-10 flex h-10 w-10 -translate-y-1/2 items-center justify-center rounded-full shadow-md transition-all duration-300 sm:-right-5"
            aria-label="Scroll right"
          >
            <ChevronRight className="h-5 w-5" />
          </button>

          <div ref={scrollRef} className="recruiters-viewport no-scrollbar">
            <div className="recruiters-track">
              {/* ORIGINAL CARDS */}
              <div className="recruiters-group">
                {recruiters.map((rec) => (
                  <RecruiterCard
                    key={`original-${rec.id}`}
                    rec={rec}
                    duplicate={false}
                    onPause={pauseMovement}
                    onResume={resumeMovement}
                  />
                ))}
              </div>

              {/* DUPLICATE CARDS FOR THE INFINITE LOOP */}
              <div className="recruiters-group" aria-hidden="true">
                {recruiters.map((rec) => (
                  <RecruiterCard
                    key={`duplicate-${rec.id}`}
                    rec={rec}
                    duplicate
                    onPause={pauseMovement}
                    onResume={resumeMovement}
                  />
                ))}
              </div>
            </div>
          </div>
        </div>

        <p className="recruiters-hint">
          Hover over the company cards to pause the carousel
        </p>
      </div>

      {/* STYLES */}
      <style>{`
        .recruiters-section {
          position: relative;
          width: 100%;
          overflow: hidden;
          background: #fde9d5;
          padding-top: 85px;
          padding-bottom: 85px;
        }

        .recruiters-eyebrow {
          color: #74182b;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          text-transform: uppercase;
        }

        .recruiters-heading {
          color: #74182b;
        }

        .recruiters-divider {
          background: linear-gradient(to right, transparent, #d8ad45, transparent);
        }

        .recruiters-description {
          color: #827779;
          line-height: 1.8;
        }

        .recruiters-carousel {
          width: 100%;
          padding: 10px 0;
        }

        .recruiters-viewport {
          width: 100%;
          overflow-x: auto;
          overflow-y: hidden;
          scrollbar-width: none;
          -ms-overflow-style: none;
          scroll-behavior: auto;
        }

        .recruiters-viewport::-webkit-scrollbar {
          display: none;
        }

        .recruiters-track {
          display: flex;
          width: max-content;
          align-items: stretch;
        }

        .recruiters-group {
          display: flex;
          flex-shrink: 0;
          align-items: stretch;
          gap: 16px;
          padding-right: 16px;
        }

        .recruiter-card {
          display: flex;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          width: 170px;
          height: 112px;
          padding: 20px;
          background: #ffffff;
          border: 1px solid #eeeeee;
          border-radius: 16px;
          box-shadow: 0 5px 18px rgba(0, 0, 0, .07);
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease,
            background .35s ease;
        }

        .recruiter-card:hover,
        .recruiter-card:focus-visible {
          transform: translateY(-7px) scale(1.035);
          border-color: #d8ad45;
          box-shadow: 0 14px 28px rgba(0, 0, 0, .13);
          outline: none;
        }

        .recruiter-logo {
          display: block;
          max-width: 100%;
          max-height: 65px;
          object-fit: contain;
          transition: transform .35s ease;
        }

        .recruiter-card:hover .recruiter-logo {
          transform: scale(1.07);
        }

        .recruiter-name {
          color: #1769aa;
          text-align: center;
          font-family: Arial, sans-serif;
          font-size: 17px;
          font-weight: 800;
          line-height: 1.4;
        }

        .recruiter-card[data-company*="infosys"] .recruiter-name { color: #0875bd; }
        .recruiter-card[data-company*="wipro"] .recruiter-name { color: #4338ca; }
        .recruiter-card[data-company*="accenture"] .recruiter-name { color: #7626a8; }
        .recruiter-card[data-company*="cognizant"] .recruiter-name { color: #194da8; }
        .recruiter-card[data-company*="amazon"] .recruiter-name { color: #172033; }
        .recruiter-card[data-company*="hcl"] .recruiter-name { color: #087db8; }
        .recruiter-card[data-company*="ibm"] .recruiter-name { color: #1769aa; }
        .recruiter-card[data-company*="hexaware"] .recruiter-name { color: #008b95; }
        .recruiter-card[data-company*="mahindra"] .recruiter-name { color: #e8493b; }
        .recruiter-card[data-company*="tcs"] .recruiter-name { color: #2864cf; }

        .recruiter-card[data-company*="flipkart"] {
          background: #ffdf00;
          border-color: #f1d000;
        }

        .recruiter-card[data-company*="flipkart"] .recruiter-name {
          color: #2874f0;
          font-style: italic;
        }

        .recruiter-card[data-company*="flipkart"]:hover {
          background: #ffe94d;
        }

        .recruiters-control {
          background: #ffffff;
          color: #74182b;
          border: 1px solid #d8ad45;
          cursor: pointer;
        }

        .recruiters-control:hover {
          background: #74182b;
          color: #e7c46e;
          transform: translateY(-50%) scale(1.1);
          box-shadow: 0 8px 18px rgba(0, 0, 0, .12);
        }

        .recruiters-hint {
          margin-top: 28px;
          color: #8b7d7e;
          font-size: 13px;
          text-align: center;
        }

        @media (max-width: 640px) {
          .recruiters-section {
            padding-top: 55px;
            padding-bottom: 55px;
          }

          .recruiters-group {
            gap: 12px;
            padding-right: 12px;
          }

          .recruiter-card {
            width: 140px;
            height: 95px;
            padding: 15px;
          }

          .recruiter-logo {
            max-height: 55px;
          }

          .recruiter-name {
            font-size: 14px;
          }

          .recruiters-control {
            width: 34px;
            height: 34px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .recruiter-card,
          .recruiter-logo,
          .recruiters-control {
            transition: none !important;
          }
        }
      `}</style>
    </section>
  );
}
