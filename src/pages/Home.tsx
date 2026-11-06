
import { useEffect, useRef } from 'react';
import HeroSlider from '@/components/HeroSlider';
import NewsEventsSection from '@/components/NewsEventsSection';
import CampusHighlights from '@/components/CampusHighlights';
import PlacementSection from '@/components/PlacementSection';
import RecruitersSection from '@/components/RecruitersSection';
import AboutSection from '@/components/AboutSection';
import { Link } from 'react-router-dom';

export default function Home() {
  const homeRef = useRef<HTMLDivElement | null>(null);

  // SCROLL REVEAL AND CARD ANIMATIONS
  useEffect(() => {
    const home = homeRef.current;
    if (!home) return;

    // Select cards and boxes from the Home page sections.
    const cards = home.querySelectorAll<HTMLElement>(
      'article, [class*="card"], [class*="Card"]'
    );

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
    const contentElements = home.querySelectorAll<HTMLElement>(
      'h1, h2, h3, p'
    );

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
    const cardElements = Array.from(cards);

    cardElements.forEach((element, index) => {
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

      <NewsEventsSection />

      <CampusHighlights />

      <PlacementSection />

      <RecruitersSection />

      <AboutSection />

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

          {/* UNDERGRADUATE CARD */}
          <div className="home-academics-card">

            <div className="home-academics-card-inner">

              {/* FRONT SIDE */}
              <div className="home-academics-card-face home-academics-front">

                <span className="home-card-number">01</span>

                <h3>Undergraduate Programmes</h3>

                <p>
                  B.E. Computer Science and Engineering, B.Tech. Information
                  Technology, B.Tech. Artificial Intelligence and Data Science,
                  and B.E. Electronics and Communication Engineering.
                </p>

                <span className="home-flip-hint">
                  Hover to explore <span>↻</span>
                </span>

              </div>

              {/* BACK SIDE */}
              <div className="home-academics-card-face home-academics-back">

                <span className="home-card-number">01</span>

                <h3>Shape Your Future</h3>

                <p>
                  Explore our undergraduate programmes and discover
                  opportunities to build your technical knowledge,
                  practical skills and professional career.
                </p>

                <Link
                  to="/academics"
                  className="home-academics-card-link"
                >
                  View UG Courses <span>→</span>
                </Link>

              </div>

            </div>

          </div>

          {/* POSTGRADUATE CARD */}
          <div className="home-academics-card">

            <div className="home-academics-card-inner">

              {/* FRONT SIDE */}
              <div className="home-academics-card-face home-academics-front">

                <span className="home-card-number">02</span>

                <h3>Postgraduate Programmes</h3>

                <p>
                  Master of Business Administration (MBA) and M.E.
                  Computer Science and Engineering.
                </p>

                <span className="home-flip-hint">
                  Hover to explore <span>↻</span>
                </span>

              </div>

              {/* BACK SIDE */}
              <div className="home-academics-card-face home-academics-back">

                <span className="home-card-number">02</span>

                <h3>Advance Your Knowledge</h3>

                <p>
                  Discover postgraduate programmes designed to strengthen
                  advanced knowledge, leadership abilities and
                  professional expertise.
                </p>

                <Link
                  to="/academics"
                  className="home-academics-card-link"
                >
                  View PG Courses <span>→</span>
                </Link>

              </div>

            </div>

          </div>

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
        ========================================= */

        .home-page-animations article,
        .home-page-animations [class*="card"],
        .home-page-animations [class*="Card"] {
          transition:
            box-shadow .35s ease,
            border-color .35s ease;
        }

        /* Academic flip card is controlled separately. */

        .home-academics-card {
          perspective: 1200px;
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
          color: #6b6263;
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
          perspective: 1200px;
        }

        /* =========================================
           3D FLIP CARD
        ========================================= */

        .home-academics-card {
          position: relative;
          min-height: 270px;
          padding: 0;
          background: transparent;
          border: none;
          border-radius: 10px;
          perspective: 1200px;
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

        .home-academics-card:hover .home-academics-card-inner {
          transform: rotateY(180deg);
        }

        .home-academics-card-face {
          grid-area: 1 / 1;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          justify-content: center;
          padding: 30px;
          border: 1px solid #ead9b7;
          border-bottom: 4px solid #d8ad45;
          border-radius: 10px;
          background: #fff;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
          box-shadow: 0 5px 18px rgba(94, 20, 38, .05);
        }

        .home-academics-front {
          transform: rotateY(0deg);
        }

        .home-academics-back {
          transform: rotateY(180deg);
          background: linear-gradient(145deg, #74182b, #4e1020);
          border-color: #d8ad45;
          color: #fff;
        }

        .home-academics-card:hover .home-academics-card-face {
          box-shadow: 0 15px 35px rgba(94, 20, 38, .15);
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

        .home-academics-back .home-card-number {
          background: rgba(255,255,255,.13);
          color: #e7c46e;
        }

        .home-academics-card h3 {
          margin: 0 0 12px;
          color: #74182b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          line-height: 1.4;
        }

        .home-academics-back h3 {
          color: #e6c36c;
        }

        .home-academics-card p {
          margin: 0 0 20px;
          color: #6b6263;
          font-size: 14px;
          line-height: 1.9;
        }

        .home-academics-back p {
          color: rgba(255,255,255,.86);
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

        /* =========================================
           ACADEMIC CARD LINKS
        ========================================= */

        .home-academics-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          margin-top: 5px;
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
            gap: 18px;
          }

          .home-academics-card {
            min-height: 260px;
          }

          .home-academics-card-inner {
            min-height: 260px;
          }

          .home-academics-card-face {
            padding: 23px;
          }

          .home-academics-card h3 {
            font-size: 19px;
          }

          .home-academics-card p {
            font-size: 13px;
          }

          /* Disable hover flip on touch devices. */
          .home-academics-card:hover .home-academics-card-inner {
            transform: none;
          }

          .home-academics-back {
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

          .home-academics-card-inner {
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
