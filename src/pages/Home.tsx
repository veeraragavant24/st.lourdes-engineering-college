import { useEffect, useRef } from 'react';
import HeroSlider from '@/components/HeroSlider';
import AboutSection from '@/components/AboutSection';
import NewsEventsSection from '@/components/NewsEventsSection';
import CampusHighlights from '@/components/CampusHighlights';


import { Link } from 'react-router-dom';

/* --------------------------------------------------
   ACADEMIC FLIP CARDS
   Front = content, Back = image.
   Save the images in:  public/images/
   -------------------------------------------------- */

const programmes = [
  {
    number: '01',
    title: 'Undergraduate Programmes',
    text: 'B.E. Computer Science and Engineering,B.E. Computer Science and Engineering(Cyber),B.Tech. Information Technology, B.Tech. Artificial Intelligence and Data Science, and B.E. Electronics and Communication Engineering.',
    image: '/images/ug-programmes.jpg',
    linkLabel: 'View UG Courses',
  },
  {
    number: '02',
    title: 'Postgraduate Programmes',
    text: 'Master of Business Administration (MBA) and M.E. Computer Science and Engineering.',
    image: '/images/pg-programmes.jpg',
    linkLabel: 'View PG Courses',
  },
];

function FlipCard({
  number,
  title,
  text,
  image,
  linkLabel,
}: (typeof programmes)[number]) {
  return (
    <div
      className="home-academics-card"
      // Tap to flip on touch devices (hover does not exist there).
      onClick={(e) => e.currentTarget.classList.toggle('is-flipped')}
    >
      <div className="home-academics-card-inner">
        {/* FRONT SIDE: CONTENT */}
        <div className="home-academics-card-face home-academics-front">
          <span className="home-card-number">{number}</span>

          <h3>{title}</h3>

          <p>{text}</p>

          <span className="home-flip-hint">
            Hover to explore <span>↻</span>
          </span>
        </div>

        {/* BACK SIDE: IMAGE */}
        <div className="home-academics-card-face home-academics-back">
          <img
            src="/recuiters/undergraduate.png"
            alt=""
            className="home-academics-back-img"
            loading="lazy"
            draggable={false}
          />

          <div className="home-academics-back-shade" aria-hidden="true" />

          <div className="home-academics-back-caption">
            <span className="home-academics-back-title">{title}</span>

            <Link to="/academics" className="home-academics-card-link">
              {linkLabel} <span>→</span>
            </Link>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function Home() {
  const homeRef = useRef<HTMLDivElement | null>(null);

  // SCROLL REVEAL AND CARD ANIMATIONS
  useEffect(() => {
    const home = homeRef.current;
    if (!home) return;

    // Anything inside a flip card (except the card itself) must NOT get
    // reveal classes, otherwise they override the 3D flip transforms.
    const insideFlipCard = (element: Element) =>
      !!element.closest('.home-academics-card') &&
      !element.classList.contains('home-academics-card');

    // Select cards and boxes from the Home page sections.
    const cards = Array.from(
      home.querySelectorAll<HTMLElement>(
        'article, [class*="card"], [class*="Card"]'
      )
    ).filter((element) => !insideFlipCard(element));

    // Select the main sections.
    const mainSections = home.querySelectorAll<HTMLElement>(
      ':scope > section:not(.home-academics-section), ' +
      ':scope > div:not(.home-academics-section)'
    );

    // Select academic content.
    const academicElements = home.querySelectorAll<HTMLElement>(
      '.home-academics-heading, ' +
      '.home-academics-card, ' +
      '.home-academics-button'
    );

    const allElements = new Set<HTMLElement>();

    cards.forEach((card) => allElements.add(card));
    mainSections.forEach((section) => allElements.add(section));
    academicElements.forEach((element) => allElements.add(element));

    // Add fade-in animation to text inside cards and sections.
    const contentElements = Array.from(
      home.querySelectorAll<HTMLElement>('h1, h2, h3, p')
    ).filter((element) => !insideFlipCard(element));

    contentElements.forEach((element) => {
      element.classList.add('home-content-fade');
      allElements.add(element);
    });

    if (!('IntersectionObserver' in window)) {
      allElements.forEach((element) => {
        element.classList.add('home-reveal-visible');
      });
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add('home-reveal-visible');
          } else {
            entry.target.classList.remove('home-reveal-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    // Alternate cards from left and right.
    cards.forEach((element, index) => {
      if (element.classList.contains('home-academics-card')) {
        element.classList.add('home-reveal-up');
      } else {
        element.classList.add(
          index % 2 === 0
            ? 'home-reveal-left'
            : 'home-reveal-right'
        );
      }

      element.style.transitionDelay = `${(index % 4) * 100}ms`;
      observer.observe(element);
    });

    // Fade in other content.
    Array.from(allElements).forEach((element) => {
      if (
        !element.classList.contains('home-reveal-left') &&
        !element.classList.contains('home-reveal-right') &&
        !element.classList.contains('home-reveal-up')
      ) {
        element.classList.add('home-reveal-up');
      }

      observer.observe(element);
    });

    return () => observer.disconnect();
  }, []);

  return (
    <div className="home-page-animations" ref={homeRef}>

      <HeroSlider />

 <AboutSection />

      <NewsEventsSection />

      <CampusHighlights />

    

     

      {/* ACADEMIC PROGRAMMES SECTION */}
      <section className="home-academics-section">

        <div className="home-academics-heading">

          <span className="home-academics-eyebrow">
            ACADEMIC EXCELLENCE
          </span>

          <h2>
            Discover Our <span>Courses</span>
          </h2>

          <p>
            Explore undergraduate and postgraduate programmes designed
            to develop knowledge, practical skills and successful careers.
          </p>

        </div>

        <div className="home-academics-preview">
          {programmes.map((programme) => (
            <FlipCard key={programme.number} {...programme} />
          ))}
        </div>

        <Link
          to="/academics"
          className="home-academics-button"
        >
          Explore All Courses
          <span aria-hidden="true">→</span>
        </Link>

      </section>

      <style>{`

        /* =========================================
           HOME PAGE SCROLL ANIMATIONS
        ========================================= */

        .home-page-animations {
          width: 100%;
          overflow-x: clip;
        }

        .home-page-animations .home-reveal-left,
        .home-page-animations .home-reveal-right,
        .home-page-animations .home-reveal-up {
          opacity: 0;
          transition:
            opacity .9s ease,
            transform .9s cubic-bezier(.2, .75, .25, 1);
          will-change: opacity, transform;
        }

        /* LEFT TO RIGHT */

        .home-page-animations .home-reveal-left {
          transform: translateX(-75px);
        }

        /* RIGHT TO LEFT */

        .home-page-animations .home-reveal-right {
          transform: translateX(75px);
        }

        /* CONTENT FADE IN */

        .home-page-animations .home-reveal-up {
          transform: translateY(35px);
        }

        /* FINAL POSITION */

        .home-page-animations .home-reveal-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        /* TEXT FADE IN */

        .home-page-animations .home-content-fade {
          opacity: 0;
          transform: translateY(22px);
          transition:
            opacity .9s ease,
            transform .9s ease;
        }

        .home-page-animations .home-content-fade.home-reveal-visible {
          opacity: 1;
          transform: translateY(0);
        }

        /* =========================================
           GENERAL CARD HOVER EFFECT
           (flip card parts are excluded so this rule
            cannot cancel the flip transition)
        ========================================= */

        .home-page-animations article,
        .home-page-animations [class*="card"]:not([class*="home-academics"]):not([class*="home-card"]),
        .home-page-animations [class*="Card"] {
          transition:
            box-shadow .35s ease,
            border-color .35s ease;
        }

        /* =========================================
           ACADEMIC SECTION
        ========================================= */

        .home-academics-section {
          padding: 75px 24px;
          background: #fbf9f5;
          text-align: center;
        }

        .home-academics-heading {
          max-width: 720px;
          margin: 0 auto 35px;
        }

        .home-academics-eyebrow {
          color: #b68a2e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .home-academics-heading h2 {
          margin: 14px 0;
          color: #74182b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 4vw, 44px);
          line-height: 1.2;
        }

        .home-academics-heading h2 span {
          color: #d8ad45;
        }

      .home-academics-heading p {
  color: #000000;
  font-size: 15px;
  line-height: 1.9;
}

        /* =========================================
           ACADEMIC CARD GRID
        ========================================= */

        .home-academics-preview {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          max-width: 1050px;
          margin: 0 auto 30px;
          text-align: left;
        }

        /* =========================================
           3D FLIP CARD
           front = content, back = image
        ========================================= */

        .home-academics-card {
          position: relative;
          min-height: 270px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 10px;
          perspective: 1200px;
          cursor: pointer;
        }

        .home-academics-card-inner {
          position: relative;
          display: grid;
          width: 100%;
          min-height: 270px;
          height: 100%;
          transform-style: preserve-3d;
          transition: transform .85s cubic-bezier(.2, .75, .25, 1);
        }

        /* Flip: mouse hover (desktop), keyboard focus, or tap (touch) */

        @media (hover: hover) and (pointer: fine) {
          .home-academics-card:hover .home-academics-card-inner {
            transform: rotateY(180deg);
          }
        }

        .home-academics-card:focus-within .home-academics-card-inner,
        .home-academics-card.is-flipped .home-academics-card-inner {
          transform: rotateY(180deg);
        }

        .home-academics-card-face {
          position: relative;
          grid-area: 1 / 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 30px;
          border: 1px solid #ead9b7;
          border-bottom: 4px solid #d8ad45;
          border-radius: 10px;
          background: #580202;  
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 0 5px 18px rgba(94, 20, 38, .05);
        }

        .home-academics-card:hover .home-academics-card-face {
          box-shadow: 0 15px 35px rgba(94, 20, 38, .15);
        }

        /* FRONT: content */

        .home-academics-front {
          transform: rotateY(0deg);
        }

        .home-card-number {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          width: 38px;
          height: 38px;
          margin-bottom: 17px;
          border-radius: 50%;
          background: #f7f0e4;
          color: #a77a22;
          font-size: 13px;
          font-weight: 800;
        }

        .home-academics-card h3 {
          margin: 0 0 12px;
          color: #ecbe68;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          line-height: 1.4;
        }

        .home-academics-card p {
          margin: 0 0 20px;
          color: #f7edee;
          font-size: 14px;
          line-height: 1.9;
        }

        .home-flip-hint {
          margin-top: auto;
          color: #a77a22;
          font-size: 11px;
          font-weight: 700;
          letter-spacing: .5px;
        }

        .home-flip-hint span {
          display: inline-block;
          margin-left: 5px;
          font-size: 17px;
        }

        /* BACK: image */

        .home-academics-back {
          transform: rotateY(180deg);
          align-items: stretch;
          justify-content: flex-end;
          padding: 0;
          overflow: hidden;
          border-color: #d8ad45;
          /* shown only if the image file is missing */
          background: linear-gradient(145deg, #74182b, #4e1020);
        }

        .home-academics-back-img {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          object-fit: cover;
          transition: transform .8s ease;
        }

        .home-academics-card:hover .home-academics-back-img {
          transform: scale(1.06);
        }

        .home-academics-back-shade {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to top,
            rgba(76, 16, 38, .9) 0%,
            rgba(76, 16, 38, .35) 38%,
            rgba(76, 16, 38, 0) 65%
          );
        }

        .home-academics-back-caption {
          position: relative;
          z-index: 2;
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          justify-content: space-between;
          gap: 8px 16px;
          padding: 20px 24px;
        }

        .home-academics-back-title {
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 700;
        }

        /* =========================================
           ACADEMIC CARD LINKS
        ========================================= */

        .home-academics-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #f1d17d;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition: color .25s ease;
        }

        .home-academics-card-link:hover {
          color: #fff;
        }

        .home-academics-card-link span {
          font-size: 19px;
          transition: transform .25s ease;
        }

        .home-academics-card-link:hover span {
          transform: translateX(6px);
        }

        /* =========================================
           EXPLORE BUTTON
        ========================================= */

        .home-academics-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 13px 22px;
          border: 1px solid #74182b;
          border-radius: 5px;
          background: #74182b;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition:
            background .3s ease,
            color .3s ease,
            border-color .3s ease,
            transform .3s ease,
            box-shadow .3s ease;
        }

        .home-academics-button:hover {
          background: #d8ad45;
          border-color: #d8ad45;
          color: #591322;
          transform: translateY(-4px);
          box-shadow: 0 8px 20px rgba(94, 20, 38, .15);
        }

        .home-academics-button span {
          font-size: 19px;
          transition: transform .25s ease;
        }

        .home-academics-button:hover span {
          transform: translateX(5px);
        }

        /* =========================================
           RESPONSIVE
        ========================================= */

       @media (max-width: 640px) {

  .home-academics-section {
    padding: 50px 18px;
  }

  .home-academics-preview {
    grid-template-columns: 1fr;
    grid-auto-rows: 1fr;      /* NEW: all cards take the height of the tallest one */
    gap: 18px;
  }

  .home-academics-card,
  .home-academics-card-inner {
    min-height: 300px;        /* a bit taller so the long UG text fits comfortably */
  }

  .home-academics-card-face {
    padding: 23px;
  }
          .home-academics-back {
            padding: 0;
          }

          .home-academics-card h3 {
            font-size: 19px;
          }

          .home-academics-card p {
            font-size: 13px;
          }

          .home-flip-hint {
            font-size: 0;
          }

          .home-flip-hint::before {
            content: "Tap to explore ↻";
            font-size: 11px;
          }

          .home-flip-hint span {
            display: none;
          }
        }

        /* =========================================
           REDUCED MOTION
        ========================================= */

        @media (prefers-reduced-motion: reduce) {

          .home-page-animations .home-reveal-left,
          .home-page-animations .home-reveal-right,
          .home-page-animations .home-reveal-up,
          .home-page-animations .home-reveal-visible,
          .home-page-animations .home-content-fade {
            opacity: 1 !important;
            transform: none !important;
            transition: none !important;
          }

          .home-academics-card-inner,
          .home-academics-back-img {
            transition: none !important;
          }

          .home-page-animations *,
          .home-page-animations *::before,
          .home-page-animations *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
          }
        }

      `}</style>

    </div>
  );
}