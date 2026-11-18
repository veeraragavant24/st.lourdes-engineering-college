
import React, { useCallback, useEffect, useState } from "react";
import {
  CalendarDays,
  MapPin,
  ArrowRight,
  X,
  ChevronLeft,
  ChevronRight,
  Newspaper,
  Clock,
  Building2,
  Image as ImageIcon,
} from "lucide-react";

import {
  getNewsEvents,
  type NewsEventItem,
} from "@/services/newsEventsApi";

type ExtendedNewsItem = NewsEventItem & {
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
  expiryDate?: string;
expiresAt?: string;
endDate?: string;
};




const getIndiaDateKey = (value: string | Date): string | null => {
  if (!value) return null;

  const dateString = String(value).trim();

  if (/^\d{4}-\d{2}-\d{2}$/.test(dateString)) {
    return dateString;
  }

  const parsed = new Date(value);

  if (Number.isNaN(parsed.getTime())) return null;

  return new Intl.DateTimeFormat("en-CA", {
    timeZone: "Asia/Kolkata",
    year: "numeric",
    month: "2-digit",
    day: "2-digit",
  }).format(parsed);
};


export default function NewsEvents() {
  const [items, setItems] = useState<NewsEventItem[]>([]);
  const [selected, setSelected] = useState<NewsEventItem | null>(null);
  const [loading, setLoading] = useState(true);
  const [error, setError] = useState("");

  const loadNewsEvents = useCallback(async () => {
    try {
      setLoading(true);
      setError("");

      const result = await getNewsEvents();
      setItems(Array.isArray(result) ? result : []);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : "Unable to load news and events."
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    void loadNewsEvents();
  }, [loadNewsEvents]);

  // Reveal sections when they enter the viewport.
  useEffect(() => {
    const elements = document.querySelectorAll(".ne-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("ne-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12 }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [loading, items.length]);

  const getRecord = (item: NewsEventItem): ExtendedNewsItem =>
    item as ExtendedNewsItem;

  const getImage = (item: NewsEventItem) => {
    const record = getRecord(item);

    return (
      record.imageUrl ||
      record.imageURL ||
      record.ImageUrl ||
      record.imagePath ||
      record.image ||
      ""
    );
  };

  const getVenue = (item: NewsEventItem) => {
    const record = getRecord(item);
    return record.venue || record.location || "ST. Lourdes Engineering College";
  };

  const getDepartment = (item: NewsEventItem) => {
    const record = getRecord(item);
    return record.department || record.organizer || "ST. Lourdes Engineering College";
  };

  const formatDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return "Date to be announced";
    }

    return parsed.toLocaleDateString("en-IN", {
      day: "numeric",
      month: "long",
      year: "numeric",
    });
  };

  const formatShortDate = (date: string) => {
    const parsed = new Date(date);

    if (Number.isNaN(parsed.getTime())) {
      return { day: "--", month: "TBA", year: "" };
    }

    return {
      day: parsed.toLocaleDateString("en-IN", { day: "2-digit" }),
      month: parsed.toLocaleDateString("en-IN", { month: "short" }),
      year: parsed.toLocaleDateString("en-IN", { year: "numeric" }),
    };
  };



  // Today's date in Indian Standard Time
  const today = getIndiaDateKey(new Date())!;

  // Remove duplicate records using their ID.
  // If an ID is missing, use title, type and date.
  const uniqueItems = Array.from(
    new Map(
      items.map((item) => {
        const key =
          item.id != null
            ? String(item.id)
            : `${item.type}-${item.title}-${item.date}`;

        return [key, item];
      })
    ).values()
  );

  // Show records dated today or in the future.
  // Hide records dated before today.
  const isVisible = (item: NewsEventItem): boolean => {
    const itemDate = getIndiaDateKey(item.date);

    if (!itemDate) return false;

    return itemDate >= today;
  };

  // News never expires automatically.
  // It stays visible until the admin removes it.
  const newsItems = uniqueItems
    .filter((item) => item.type?.trim().toLowerCase() === "news")
    .sort((a, b) => {
      const timeA = new Date(a.date).getTime();
      const timeB = new Date(b.date).getTime();

      // Records with an invalid date go to the end
      if (Number.isNaN(timeA)) return 1;
      if (Number.isNaN(timeB)) return -1;

      // Newest news first
      return timeB - timeA;
    });

  // EVENTS
  const upcomingEvents = uniqueItems
    .filter(
      (item) =>
        item.type?.trim().toLowerCase() === "event" &&
        isVisible(item)
    )
    .sort(
      (a, b) =>
        new Date(a.date).getTime() -
        new Date(b.date).getTime()
    );

  const renderCardImage = (item: NewsEventItem) => {
    const image = getImage(item);

    return image ? (
      <img
        src={image}
        alt={item.title}
        loading="lazy"
        onError={(event) => {
          event.currentTarget.style.display = "none";
        }}
      />
    ) : (
      <div className="ne-image-placeholder">
        <ImageIcon size={35} />
        <span>ST. Lourdes Engineering College</span>
      </div>
    );
  };

  const renderCarousel = (
    data: NewsEventItem[],
    direction: "left" | "right",
    type: "news" | "event"
  ) => {
    if (!data.length) {
      return (
        <div className="ne-empty">
          <CalendarDays size={25} />
          <p>
            {type === "news"
              ? "No news updates available at the moment."
              : "No events available at the moment."}
          </p>
        </div>
      );
    }

    // Duplicate cards to create a seamless continuous loop.
// Display each card only once.
const repeatedItems = data;

    return (
      <div className={`ne-marquee ne-${direction}`}>
        <div className="ne-marquee-track">
          {repeatedItems.map((item, index) => (
            <article
              className="ne-card"
key={item.id ?? `${item.type}-${item.title}-${item.date}`}
              onClick={() => setSelected(item)}
              onKeyDown={(event) => {
                if (event.key === "Enter" || event.key === " ") {
                  setSelected(item);
                }
              }}
              role="button"
              tabIndex={0}
            >
              <div className="ne-card-image">
                {renderCardImage(item)}
                <span className="ne-date-badge">
                  <CalendarDays size={14} />
                  {formatDate(item.date)}
                </span>
              </div>

              <div className="ne-card-body">
                <span className="ne-card-label">
                  {type === "news" ? "College News" : "College Even"}
                </span>

                <h3>{item.title}</h3>

                <p>{item.excerpt || "Discover the latest activities at our college."}</p>

                <button
                  type="button"
                  className="ne-read-more"
                  onClick={(event) => {
                    event.stopPropagation();
                    setSelected(item);
                  }}
                >
                  {type === "news" ? "Read More" : "Know More"}
                  <ArrowRight size={16} />
                </button>
              </div>
            </article>
          ))}
        </div>
      </div>
    );
  };

  return (
    <div className="ne-page">
      <style>{`
        .ne-page {
          --ne-maroon: #70152f;
          --ne-dark: #4b1025;
          --ne-gold: #d8b45c;
          --ne-cream: #fcf9f4;
          --ne-text: #43363a;
          width: 100%;
          min-height: 100vh;
          overflow: hidden;
          background: var(--ne-cream);
          color: var(--ne-text);
        }

        .ne-page * {
          box-sizing: border-box;
        }

        /* HERO */

        .ne-hero {
          position: relative;
          min-height: 310px;
          display: flex;
          align-items: center;
          padding: 115px 6% 55px;
          overflow: hidden;
          color: white;
          background:
            linear-gradient(
              90deg,
              rgba(70, 12, 32, .98) 0%,
              rgba(112, 21, 47, .94) 43%,
              rgba(112, 21, 47, .25) 100%
            ),
            url("/hero/newseventshero.png")
            center 48% / cover no-repeat;
        }

        .ne-hero::after {
          content: "";
          position: absolute;
          width: 430px;
          height: 430px;
          right: -120px;
          bottom: -320px;
          border: 1px solid rgba(255,255,255,.15);
          border-radius: 50%;
        }

        .ne-hero-inner {
          position: relative;
          z-index: 2;
          width: 100%;
          max-width: 1400px;
          margin: auto;
        }

        .ne-breadcrumb {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 28px;
          font-size: 13px;
          color: rgba(255,255,255,.8);
        }

        .ne-breadcrumb span:last-child {
          color: #f0cf79;
        }

        .ne-eyebrow {
          margin-bottom: 10px;
          color: #edc968;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .ne-hero h1 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 22px;
          margin: 0;
          color: white;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(42px, 5vw, 64px);
          line-height: 1.1;
        }

        .ne-title-line {
          width: 65px;
          height: 3px;
          background: var(--ne-gold);
        }

        .ne-hero-description {
          max-width: 580px;
          margin: 16px 0 0;
          color: rgba(255,255,255,.9);
          font-size: 16px;
          line-height: 1.8;
        }

        /* MAIN CONTENT */

        .ne-content {
          width: min(1450px, 92%);
          margin: auto;
          padding: 38px 0 75px;
        }

        .ne-section {
          margin-bottom: 62px;
        }

        .ne-section-heading {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-bottom: 24px;
        }

        .ne-heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 12px;
          background: var(--ne-maroon);
          color: var(--ne-gold);
          box-shadow: 0 5px 15px rgba(112,21,47,.16);
        }

        .ne-section-heading h2 {
          margin: 0;
          color: var(--ne-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.2;
        }

        .ne-heading-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, var(--ne-gold), transparent);
        }

        /* CONTINUOUS CAROUSEL */

        .ne-marquee {
          width: 100%;
          overflow: hidden;
          padding: 5px 2px 18px;
        }

        .ne-marquee-track {
  display: flex;
  width: max-content;
  gap: 22px;
  animation: ne-move-left 10s linear infinite;
  will-change: transform;
}

        .ne-right .ne-marquee-track {
          animation-name: ne-move-right;
        }

        .ne-marquee:hover .ne-marquee-track,
        .ne-marquee:focus-within .ne-marquee-track {
          animation-play-state: paused;
        }

        @keyframes ne-move-left {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @keyframes ne-move-right {
          from { transform: translateX(-50%); }
          to { transform: translateX(0); }
        }

        /* CARDS */

        .ne-card {
          display: flex;
          flex-direction: column;
          width: 320px;
          min-height: 370px;
          overflow: hidden;
          border: 1px solid #eadcc9;
          border-radius: 17px;
          background: white;
          box-shadow: 0 7px 20px rgba(64,32,24,.07);
          cursor: pointer;
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease;
        }

        .ne-card:hover {
          transform: translateY(-7px);
          border-color: var(--ne-gold);
          box-shadow: 0 14px 30px rgba(112,21,47,.15);
        }

        .ne-card-image {
          position: relative;
          height: 190px;
          flex-shrink: 0;
          overflow: hidden;
          background: #eee5d9;
        }

        .ne-card-image img {
          width: 100%;
          height: 100%;
          display: block;
          object-fit: cover;
          transition: transform .6s ease;
        }

        .ne-card:hover .ne-card-image img {
          transform: scale(1.07);
        }

        .ne-date-badge {
          position: absolute;
          left: 13px;
          bottom: 12px;
          display: flex;
          align-items: center;
          gap: 7px;
          padding: 8px 11px;
          border-radius: 7px;
          background: #ffe5a7;
          color: #64132c;
          font-size: 11px;
          font-weight: 800;
          box-shadow: 0 3px 10px rgba(0,0,0,.12);
        }

        .ne-image-placeholder {
          width: 100%;
          height: 100%;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          gap: 8px;
          background: linear-gradient(135deg,#f7ead5,#eee1d4);
          color: var(--ne-maroon);
          font-size: 11px;
          font-weight: 700;
        }

        .ne-card-body {
          display: flex;
          flex: 1;
          flex-direction: column;
          align-items: flex-start;
          padding: 17px;
        }

        .ne-card-label {
          display: inline-block;
          margin-bottom: 9px;
          padding: 5px 10px;
          border-radius: 20px;
          background: #f8e9d1;
          color: var(--ne-maroon);
          font-size: 10px;
          font-weight: 800;
          letter-spacing: .4px;
        }

        .ne-card-body h3 {
          margin: 0 0 9px;
          color: var(--ne-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          line-height: 1.35;
        }

        .ne-card-body p {
          display: -webkit-box;
          margin: 0 0 16px;
          overflow: hidden;
          color: #74676a;
          font-size: 13px;
          line-height: 1.65;
          -webkit-box-orient: vertical;
          -webkit-line-clamp: 2;
        }

        .ne-read-more {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: auto;
          padding: 9px 15px;
          border: 0;
          border-radius: 25px;
          background: var(--ne-maroon);
          color: white;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: background .25s ease, transform .25s ease;
        }

        .ne-read-more:hover {
          background: #9b2447;
          transform: translateX(3px);
        }

        /* EMPTY AND LOADING */

        .ne-empty {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          min-height: 130px;
          padding: 25px;
          border: 1px dashed #d8bd8d;
          border-radius: 14px;
          color: #806b61;
          text-align: center;
        }

        .ne-empty svg {
          color: var(--ne-maroon);
        }

        /* MODAL */

        .ne-modal-overlay {
          position: fixed;
          z-index: 99999;
          inset: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: rgba(30,10,18,.78);
          backdrop-filter: blur(7px);
          animation: ne-fade-in .25s ease both;
        }

        .ne-modal {
          position: relative;
          display: grid;
          grid-template-columns: 1fr 1fr;
          width: min(1000px, 100%);
          max-height: 88vh;
          overflow: hidden;
          border: 1px solid #e4c477;
          border-radius: 20px;
          background: #fffdf9;
          box-shadow: 0 25px 80px rgba(0,0,0,.3);
          animation: ne-modal-in .3s ease both;
        }

        .ne-modal-image {
          min-height: 480px;
          background: #eee3d5;
        }

        .ne-modal-image img {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 480px;
          object-fit: cover;
        }

        .ne-modal-image .ne-image-placeholder {
          min-height: 480px;
        }

        .ne-modal-content {
          position: relative;
          overflow-y: auto;
          padding: 45px 35px 35px;
        }

        .ne-modal-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 3;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 39px;
          height: 39px;
          border: 1px solid #ead9c2;
          border-radius: 50%;
          background: white;
          color: var(--ne-maroon);
          cursor: pointer;
        }

        .ne-modal-label {
          display: inline-block;
          margin-bottom: 13px;
          padding: 6px 12px;
          border-radius: 20px;
          background: #f9e9c8;
          color: var(--ne-maroon);
          font-size: 11px;
          font-weight: 800;
        }

        .ne-modal-content h2 {
          margin: 0 30px 18px 0;
          color: var(--ne-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 29px;
          line-height: 1.3;
        }

        .ne-modal-meta {
          display: flex;
          flex-wrap: wrap;
          gap: 14px 20px;
          padding-bottom: 20px;
          border-bottom: 1px solid #eadcc9;
        }

        .ne-modal-meta span {
          display: flex;
          align-items: center;
          gap: 7px;
          color: #66585b;
          font-size: 12px;
        }

        .ne-modal-meta svg {
          color: var(--ne-maroon);
          flex-shrink: 0;
        }

        .ne-modal-content h3 {
          margin: 23px 0 9px;
          color: var(--ne-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
        }

        .ne-modal-description {
          margin: 0;
          color: #65585a;
          font-size: 14px;
          line-height: 1.9;
          white-space: pre-wrap;
        }

        .ne-modal-department {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-top: 22px;
          padding: 13px;
          border-radius: 10px;
          background: #f8f0e5;
          color: var(--ne-maroon);
          font-size: 13px;
          font-weight: 700;
        }

        /* SCROLL REVEAL */

        .ne-reveal {
          opacity: 0;
          transform: translateY(35px);
          transition: opacity .75s ease, transform .75s ease;
        }

        .ne-reveal.ne-visible {
          opacity: 1;
          transform: translateY(0);
        }

        @keyframes ne-fade-in {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes ne-modal-in {
          from { opacity: 0; transform: translateY(20px) scale(.98); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        /* TABLET */

        @media (max-width: 850px) {
          .ne-modal {
            grid-template-columns: 1fr;
            max-width: 620px;
            overflow-y: auto;
          }

          .ne-modal-image,
          .ne-modal-image img {
            min-height: 270px;
            height: 270px;
          }

          .ne-modal-content {
            overflow: visible;
            padding: 28px;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .ne-hero {
            min-height: 290px;
            padding: 105px 22px 42px;
            background-position: 60% center;
          }

          .ne-breadcrumb {
            margin-bottom: 22px;
            font-size: 11px;
          }

          .ne-eyebrow {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .ne-hero h1 {
            gap: 12px;
            font-size: 39px;
          }

          .ne-title-line {
            width: 35px;
          }

          .ne-hero-description {
            font-size: 13px;
          }

          .ne-content {
            width: 92%;
            padding-top: 30px;
          }

          .ne-section {
            margin-bottom: 42px;
          }

          .ne-section-heading {
            gap: 11px;
            margin-bottom: 17px;
          }

          .ne-heading-icon {
            width: 40px;
            height: 40px;
          }

          .ne-section-heading h2 {
            font-size: 24px;
          }

          .ne-heading-line {
            display: none;
          }

          .ne-card {
            width: 275px;
            min-height: 355px;
          }

          .ne-card-image {
            height: 170px;
          }

          .ne-card-body h3 {
            font-size: 18px;
          }

          .ne-modal-overlay {
            padding: 12px;
          }

          .ne-modal {
            max-height: 94vh;
            border-radius: 14px;
          }

          .ne-modal-image,
          .ne-modal-image img {
            min-height: 210px;
            height: 210px;
          }

          .ne-modal-content {
            padding: 24px 20px;
          }

          .ne-modal-content h2 {
            font-size: 23px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .ne-marquee-track {
            animation: none !important;
          }

          .ne-reveal {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .ne-card,
          .ne-card-image img {
            transition: none;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="ne-hero" data-header-theme="dark">
        <div className="ne-hero-inner">
          <div className="ne-breadcrumb">
            <span>Home</span>
            <ChevronRight size={14} />
            <span>News & Events</span>
          </div>

          <p className="ne-eyebrow">
            ST. LOURDES ENGINEERING COLLEGE
          </p>

          <h1>
            News &amp; Events
            <span className="ne-title-line" />
          </h1>

          <p className="ne-hero-description">
            Stay updated with the latest announcements, achievements,
            programmes and happenings at our campus.
          </p>
        </div>
      </section>

      {/* NEWS AND EVENTS */}
      <main className="ne-content">
        {loading ? (
          <div className="ne-empty">
            <Clock size={24} />
            Loading college news and events...
          </div>
        ) : error ? (
          <div className="ne-empty">
            <p>{error}</p>
            <button className="ne-read-more" onClick={() => void loadNewsEvents()}>
              Try Again
            </button>
          </div>
        ) : (
          <>
            {/* LATEST NEWS */}
            <section className="ne-section ne-reveal">
              <div className="ne-section-heading">
                <div className="ne-heading-icon">
                  <Newspaper size={25} />
                </div>
                <h2>Latest News</h2>
                <div className="ne-heading-line" />
              </div>

              {renderCarousel(newsItems, "left", "news")}
            </section>

            {/* UPCOMING EVENTS */}
            <section className="ne-section ne-reveal">
              <div className="ne-section-heading">
                <div className="ne-heading-icon">
                  <CalendarDays size={25} />
                </div>
                <h2>Upcoming Events</h2>
                <div className="ne-heading-line" />
              </div>

              {renderCarousel(upcomingEvents, "right", "event")}
            </section>
          </>
        )}
      </main>

      {/* DETAILS POPUP */}
      {selected && (
        <div
          className="ne-modal-overlay"
          onClick={() => setSelected(null)}
        >
          <section
            className="ne-modal"
            role="dialog"
            aria-modal="true"
            aria-labelledby="ne-modal-title"
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="ne-modal-close"
              aria-label="Close details"
              onClick={() => setSelected(null)}
            >
              <X size={22} />
            </button>

            <div className="ne-modal-image">
              {renderCardImage(selected)}
            </div>

            <div className="ne-modal-content">
              <span className="ne-modal-label">
                {selected.type?.toLowerCase() === "event"
                  ? "College Event"
                  : "College News"}
              </span>

              <h2 id="ne-modal-title">{selected.title}</h2>

              <div className="ne-modal-meta">
                <span>
                  <CalendarDays size={16} />
                  {formatDate(selected.date)}
                </span>

                <span>
                  <MapPin size={16} />
                  {getVenue(selected)}
                </span>
              </div>

              <h3>Description</h3>

              <p className="ne-modal-description">
                {getRecord(selected).content ||
                  selected.excerpt ||
                  "More information about this college update will be available soon."}
              </p>

              <div className="ne-modal-department">
                <Building2 size={19} />
                {getDepartment(selected)}
              </div>
            </div>
          </section>
        </div>
      )}
    </div>
  );
}
