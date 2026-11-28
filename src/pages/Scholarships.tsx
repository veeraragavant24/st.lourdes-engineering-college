import React, { useEffect, useRef } from "react";
import type { CSSProperties } from "react";
import {
  Home,
  ChevronRight,
  Landmark,
  Users,
  GraduationCap,
  Handshake,
  Layers,
  Award,
  Info,
  ArrowRight,
} from "lucide-react";
import { Link } from "react-router-dom";

/* sets the stagger delay for a reveal element */
const delay = (ms: number) => ({ "--reveal-delay": `${ms}ms` }) as CSSProperties;

const Scholarships: React.FC = () => {
  const pageRef = useRef<HTMLDivElement>(null);

  // Scroll reveal: add "is-visible" when an element enters the screen and
  // remove it when it leaves, so the animation replays on the next scroll.
  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>("[data-reveal]");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("is-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
          } else {
            entry.target.classList.remove("is-visible");
          }
        });
      },
      { threshold: 0.15, rootMargin: "0px 0px -40px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  return (
    <div className="scholarships-page" ref={pageRef}>

      {/* ================= HERO SECTION ================= */}

      <section className="scholarship-hero">
        <div className="scholarship-hero-pattern"></div>

        <div className="scholarship-hero-inner">

          <div className="scholarship-breadcrumb">
            <Link to="/">
              <Home size={14} />
              <span>Home</span>
            </Link>

            <ChevronRight size={14} />

            <Link to="/admission">Admission</Link>
            <ChevronRight size={14} />

            <span className="breadcrumb-active">Scholarships</span>
          </div>

          <div className="scholarship-hero-content">

            <div className="scholarship-hero-text">
              <div className="scholarship-eyebrow">
                ST. LOURDES ENGINEERING COLLEGE
              </div>

              <h1>
                Scholarships
                <span className="scholarship-title-line"></span>
              </h1>

              <p>
                Financial support that helps every student pursue excellence.
              </p>
            </div>

            <div className="ripple-medal" aria-hidden="true">
              <span className="ripple-ring" />
              <span className="ripple-ring" style={{ animationDelay: "1s" }} />
              <span className="ripple-ring" style={{ animationDelay: "2s" }} />
              <span className="ripple-core">
                <Award size={30} strokeWidth={1.8} />
              </span>
            </div>

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="scholarship-main">

        {/* GOVERNMENT SCHOLARSHIPS: slides in from the left */}

        <div className="scholarship-reveal-box government-wrap" data-reveal="left">
          <section className="scholarship-card">

            <div className="scholarship-card-heading">

              <div className="scholarship-heading-icon">
                <Landmark size={39} strokeWidth={1.8} />
              </div>

              <h2>Government Scholarships</h2>

            </div>

            <div className="scholarship-list">

              <div data-reveal="up" style={delay(150)}>
                <div className="scholarship-list-item">

                  <div className="scholarship-item-icon">
                    <Users size={30} strokeWidth={1.7} />
                  </div>

                  <div className="scholarship-item-divider"></div>

                  <div className="scholarship-item-content">
                    <h3>Educational Scholarship</h3>

                    <p>
                      Adi Dravida, Tribal, Most Backward Denotified Communities,
                      Backward Communities Welfare Scholarship
                    </p>
                  </div>

                </div>
              </div>

              <div data-reveal="up" style={delay(250)}>
                <div className="scholarship-list-item">

                  <div className="scholarship-item-icon">
                    <GraduationCap size={34} strokeWidth={1.7} />
                  </div>

                  <div className="scholarship-item-divider"></div>

                  <div className="scholarship-item-content">
                    <h3>
                      First Graduate Education Scholarship for Professional Courses
                    </h3>

                    <p>Engineering</p>
                  </div>

                </div>
              </div>

              <div data-reveal="up" style={delay(350)}>
                <div className="scholarship-information">

                  <div className="scholarship-item-icon">
                    <Info size={29} />
                  </div>

                  <div className="scholarship-item-divider"></div>

                  <p>
                    For eligibility, application process and further guidance,
                    please contact the College Office.
                  </p>

                </div>
              </div>

            </div>
          </section>
        </div>

        {/* LOWER SCHOLARSHIP CARDS */}

        <div className="scholarship-bottom-grid">

          {/* NON GOVERNMENT: slides in from the left */}

          <div className="scholarship-reveal-box" data-reveal="left">
            <section className="scholarship-card small-scholarship-card">

              <div className="scholarship-card-heading">

                <div className="scholarship-heading-icon">
                  <Handshake size={39} strokeWidth={1.8} />
                </div>

                <h2>Non-Government Scholarships</h2>

              </div>

              <div className="scholarship-list">

                <div data-reveal="up" style={delay(150)}>
                  <div className="scholarship-list-item">

                    <div className="scholarship-item-icon">
                      <Users size={30} strokeWidth={1.7} />
                    </div>

                    <div className="scholarship-item-divider"></div>

                    <div className="scholarship-item-content">
                      <h3>Scholarship from Various NGOs</h3>
                    </div>

                  </div>
                </div>

              </div>
            </section>
          </div>

          {/* MANAGEMENT: slides in from the right */}

          <div className="scholarship-reveal-box" data-reveal="right" style={delay(120)}>
            <section className="scholarship-card small-scholarship-card">

              <div className="scholarship-card-heading">

                <div className="scholarship-heading-icon">
                  <GraduationCap size={41} strokeWidth={1.7} />
                </div>

                <h2>Management Scholarships</h2>

              </div>

              <div className="scholarship-list">

                <div data-reveal="up" style={delay(150)}>
                  <div className="scholarship-list-item management-item">

                    <div className="scholarship-item-icon">
                      <Layers size={29} strokeWidth={1.8} />
                    </div>

                    <div className="scholarship-item-divider"></div>

                    <div className="scholarship-item-content">
                      <h3>Management Scholarship</h3>
                    </div>

                  </div>
                </div>

                <div data-reveal="up" style={delay(250)}>
                  <div className="scholarship-list-item management-item">

                    <div className="scholarship-item-icon">
                      <Award size={30} strokeWidth={1.7} />
                    </div>

                    <div className="scholarship-item-divider"></div>

                    <div className="scholarship-item-content">
                      <h3>Management Scholarship for Merit Students</h3>
                    </div>

                  </div>
                </div>

              </div>
            </section>
          </div>

        </div>

        {/* ================= CONTACT BANNER: content fades up ================= */}

        <div className="scholarship-reveal-box" data-reveal="up">
          <section className="scholarship-contact-banner">

            <div className="scholarship-contact-decoration"></div>

            <div className="scholarship-contact-icon">
              <GraduationCap size={65} strokeWidth={1.3} />
            </div>

            <div className="scholarship-contact-divider"></div>

            <div className="scholarship-contact-content">
              <h2>
                Need help choosing the right scholarship?
              </h2>

              <p>
                Our admission team is here to guide you with eligibility,
                application and scholarship support.
              </p>
            </div>

            <Link
              to="/contact#contact-section"
              className="scholarship-contact-button"
            >
              Contact Admissions
              <ArrowRight size={21} />
            </Link>

          </section>
        </div>

      </main>

      {/* ================= INTERNAL CSS ================= */}

      <style>{`

        /* =========================================
           SCHOLARSHIPS PAGE
           ST. LOURDES ENGINEERING COLLEGE
           MAROON + GOLD PREMIUM THEME
        ========================================= */

        .scholarships-page {
          --sch-maroon: #74152f;
          --sch-dark-maroon: #4a1026;
          --sch-gold: #d9b052;
          --sch-gold-light: #f9e8bd;
          --sch-cream: #fcf9f4;
          --sch-text: #4b343b;

          width: 100%;
          min-height: 100vh;
          padding-top: 0;
          background: var(--sch-cream);
          color: var(--sch-text);
          font-family: inherit;
          overflow: hidden;
        }

        .scholarships-page * {
          box-sizing: border-box;
        }

        /* =========================================
           SCROLL REVEAL (replays on every scroll)
           left  : slides in from the left, then settles
           right : slides in from the right, then settles
           up    : content fades up
        ========================================= */

        .scholarships-page [data-reveal] {
          opacity: 0;
          will-change: opacity, transform;
          transition:
            opacity .8s ease,
            transform .9s cubic-bezier(.2, .7, .2, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .scholarships-page [data-reveal="left"]  { transform: translateX(-80px); }
        .scholarships-page [data-reveal="right"] { transform: translateX(80px); }
        .scholarships-page [data-reveal="up"]    { transform: translateY(34px); }

        .scholarships-page [data-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* wrapper keeps the slide-in separate from the card's hover lift */
        .scholarship-reveal-box {
          height: 100%;
        }

        .government-wrap {
          margin-bottom: 25px;
        }

        /* HERO */

        .scholarship-hero {
          position: relative;
          width: 100%;
          min-height: 180px;
          padding: 130px 7% 26px;
          background:
            radial-gradient(
              ellipse at 75% 50%,
              rgba(171, 61, 87, 0.35),
              transparent 45%
            ),
            linear-gradient(
              110deg,
              #4c1026 0%,
              #74152f 55%,
              #851b3b 100%
            );
          overflow: hidden;
        }

        .scholarship-hero::before {
          content: "";
          position: absolute;
          width: 440px;
          height: 440px;
          border: 1px solid rgba(255,255,255,0.08);
          border-radius: 50%;
          top: -300px;
          left: -100px;
        }

        .scholarship-hero::after {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          border: 1px solid rgba(220,180,90,0.12);
          border-radius: 50%;
          bottom: -340px;
          right: 15%;
        }

        .scholarship-hero-pattern {
          position: absolute;
          inset: 0;
          opacity: 0.15;
          background-image:
            linear-gradient(
              135deg,
              transparent 48%,
              rgba(255,255,255,0.15) 49%,
              transparent 50%
            );
          background-size: 85px 85px;
          pointer-events: none;
        }

        .scholarship-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1400px;
          margin: 0 auto;
        }

        .scholarship-breadcrumb {
          display: flex;
          align-items: center;
          gap: 12px;
          margin-bottom: 15px;
          color: rgba(255,255,255,0.8);
          font-size: 13px;
        }

        .scholarship-breadcrumb a {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #fff;
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .scholarship-breadcrumb a:hover {
          color: var(--sch-gold);
        }

        .breadcrumb-active {
          color: #f3d276;
          font-weight: 700;
        }

        .scholarship-hero-content {
          display: flex;
          align-items: center;
          justify-content: flex-start;
          width: 100%;
        }

        .scholarship-eyebrow {
          margin-bottom: 5px;
          color: #e4c16e;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2.5px;
        }

        .scholarship-hero h1 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 24px;
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(28px, 4.0vw, 42px);
          font-weight: 700;
          line-height: 1.1;
        }

        .scholarship-title-line {
          display: inline-block;
          width: 80px;
          height: 3px;
          border-radius: 5px;
          background: var(--sch-gold);
        }

        .scholarship-hero-text > p {
          margin: 10px 0 0;
          color: rgba(255,255,255,0.95);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          font-style: italic;
          line-height: 1.5;
        }

        /* MAIN CONTENT */

        .scholarship-main {
          width: 100%;
          max-width: 1420px;
          margin: 0 auto;
          padding: 26px 35px 55px;
        }

        /* CARDS */

        .scholarship-card {
          position: relative;
          height: 100%;
          overflow: hidden;
          padding: 13px 28px 16px;
          border: 1px solid #e7c98e;
          border-radius: 17px;
          background: linear-gradient(
            135deg,
            #fffefa 0%,
            #fff 100%
          );
          box-shadow: 0 6px 18px rgba(91,53,24,0.06);
          transition:
            transform .35s cubic-bezier(.2, .7, .2, 1),
            box-shadow .35s ease,
            border-color .35s ease;
        }

        /* gold line that grows along the bottom edge on hover */
        .scholarship-card::after {
          content: "";
          position: absolute;
          left: 0;
          bottom: 0;
          width: 100%;
          height: 3px;
          background: linear-gradient(90deg, #d9b052, #f3d98b, #d9b052);
          transform: scaleX(0);
          transform-origin: left;
          transition: transform .45s ease;
        }

        .scholarship-card:hover {
          border-color: #d8af60;
          box-shadow: 0 18px 36px rgba(91,53,24,0.15);
          transform: translateY(-8px);
        }

        .scholarship-card:hover::after {
          transform: scaleX(1);
        }

        .scholarship-card-heading {
          display: flex;
          align-items: center;
          gap: 22px;
          min-height: 58px;
          margin-bottom: 8px;
        }

        .scholarship-heading-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 75px;
          height: 52px;
          flex-shrink: 0;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #fbe4a8,
            #e6bd62
          );
          color: #74152f;
          box-shadow: 0 3px 8px rgba(128,84,25,0.10);
          transition: transform .4s ease, background .3s ease, color .3s ease, box-shadow .3s ease;
        }

        .scholarship-card:hover .scholarship-heading-icon {
          transform: rotate(-8deg) scale(1.08);
          background: #74152f;
          color: #f5d58b;
          box-shadow: 0 8px 18px rgba(116,21,47,0.25);
        }

        .scholarship-card-heading h2 {
          margin: 0;
          color: #76152f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          font-weight: 700;
          line-height: 1.25;
        }

        /* SCHOLARSHIP ITEMS */

        .scholarship-list {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .scholarship-list-item {
          display: flex;
          align-items: center;
          min-height: 59px;
          padding: 7px 17px;
          border-radius: 12px;
          background: linear-gradient(
            100deg,
            #f8f0e6,
            #fbf6f0
          );
          transition: all 0.3s ease;
        }

        .scholarship-list-item:hover {
          background: #f7e9d4;
          transform: translateX(6px);
          box-shadow: 0 6px 14px rgba(91,53,24,0.08);
        }

        .scholarship-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 85px;
          min-width: 85px;
          color: #821d38;
        }

        .scholarship-item-icon svg {
          transition: transform .35s ease;
        }

        .scholarship-list-item:hover .scholarship-item-icon svg,
        .scholarship-information:hover .scholarship-item-icon svg {
          transform: scale(1.15) rotate(-6deg);
        }

        .scholarship-item-divider {
          width: 3px;
          min-width: 3px;
          height: 41px;
          margin: 0 27px 0 15px;
          border-radius: 5px;
          background: linear-gradient(
            to bottom,
            #d8a944,
            #f1d68c
          );
        }

        .scholarship-item-content {
          flex: 1;
          min-width: 0;
        }

        .scholarship-item-content h3 {
          margin: 0;
          color: #821b39;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-weight: 700;
          line-height: 1.35;
        }

        .scholarship-item-content p {
          margin: 2px 0 0;
          color: #000000;
          font-size: 12px;
          line-height: 1.55;
        }

        /* INFORMATION ROW */

        .scholarship-information {
          display: flex;
          align-items: center;
          min-height: 48px;
          padding: 5px 17px;
          border-radius: 11px;
          background: linear-gradient(
            100deg,
            #fff0cc,
            #fff8e9
          );
          transition: all 0.3s ease;
        }

        .scholarship-information:hover {
          transform: translateX(6px);
          box-shadow: 0 6px 14px rgba(91,53,24,0.08);
        }

        .scholarship-information .scholarship-item-icon {
          color: #821b39;
        }

        .scholarship-information .scholarship-item-divider {
          height: 31px;
        }

        .scholarship-information p {
          margin: 0;
          color: #000000;
          font-size: 13px;
          font-style: italic;
          line-height: 1.6;
        }

        /* BOTTOM GRID */

        .scholarship-bottom-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 25px;
          margin-bottom: 25px;
        }

        .small-scholarship-card {
          min-width: 0;
        }

        .small-scholarship-card .scholarship-card-heading {
          margin-bottom: 9px;
        }

        .small-scholarship-card .scholarship-card-heading h2 {
          font-size: 24px;
        }

        .small-scholarship-card .scholarship-list-item {
          min-height: 57px;
        }

        .management-item {
          min-height: 48px !important;
          padding-top: 5px;
          padding-bottom: 5px;
        }

        .management-item .scholarship-item-divider {
          height: 32px;
        }

        .management-item .scholarship-item-content h3 {
          font-size: 16px;
        }

        /* CONTACT BANNER */

        .scholarship-contact-banner {
          position: relative;
          display: flex;
          align-items: center;
          gap: 25px;
          min-height: 105px;
          padding: 20px 42px;
          border: 1px solid rgba(225,183,89,0.35);
          border-radius: 17px;
          background:
            radial-gradient(
              ellipse at 80% 100%,
              rgba(183,88,111,0.25),
              transparent 45%
            ),
            linear-gradient(
              110deg,
              #70152f,
              #831a3a
            );
          color: #fff;
          overflow: hidden;
          transition:
            transform .35s cubic-bezier(.2, .7, .2, 1),
            box-shadow .35s ease,
            border-color .35s ease;
        }

        .scholarship-contact-banner:hover {
          transform: translateY(-6px);
          border-color: rgba(245,209,123,0.8);
          box-shadow: 0 18px 36px rgba(74,16,38,0.28);
        }

        .scholarship-contact-decoration {
          position: absolute;
          width: 280px;
          height: 280px;
          right: 25%;
          bottom: -230px;
          border: 1px solid rgba(255,255,255,0.1);
          border-radius: 50%;
          pointer-events: none;
        }

        .scholarship-contact-icon {
          position: relative;
          z-index: 1;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 95px;
          min-width: 95px;
          color: white;
        }

        .scholarship-contact-icon svg {
          transition: transform .4s ease;
        }

        .scholarship-contact-banner:hover .scholarship-contact-icon svg {
          transform: translateY(-4px) rotate(-6deg);
        }

        .scholarship-contact-divider {
          position: relative;
          z-index: 1;
          width: 3px;
          min-width: 3px;
          height: 60px;
          border-radius: 4px;
          background: #e8c46c;
        }

        .scholarship-contact-content {
          position: relative;
          z-index: 1;
          flex: 1;
        }

        .scholarship-contact-content h2 {
          margin: 0 0 5px;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 20px;
          font-style: italic;
          line-height: 1.3;
        }

        .scholarship-contact-content p {
          margin: 0;
          color: rgba(255,255,255,0.88);
          font-size: 13px;
          line-height: 1.6;
        }

        .scholarship-contact-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 17px;
          min-width: 225px;
          padding: 15px 21px;
          border: 1px solid #f5d17b;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #fbe5a7,
            #e7bd5e
          );
          color: #571125;
          font-size: 15px;
          font-weight: 800;
          text-decoration: none;
          transition: all 0.3s ease;
        }

        .scholarship-contact-button:hover {
          background: #fff1cb;
          box-shadow: 0 7px 20px rgba(0,0,0,0.15);
          transform: translateY(-3px);
        }

        .scholarship-contact-button svg {
          transition: transform 0.3s ease;
        }

        .scholarship-contact-button:hover svg {
          transform: translateX(5px);
        }

        /* =========================================
           TABLET RESPONSIVE
        ========================================= */

        @media (max-width: 1000px) {

          .scholarship-main {
            padding-left: 25px;
            padding-right: 25px;
          }

          .scholarship-card-heading h2 {
            font-size: 25px;
          }

          .small-scholarship-card .scholarship-card-heading h2 {
            font-size: 22px;
          }

          .scholarship-contact-banner {
            padding: 20px 25px;
            gap: 17px;
          }

          .scholarship-contact-button {
            min-width: 190px;
            font-size: 13px;
          }

        }

        /* =========================================
           MOBILE RESPONSIVE
        ========================================= */

        @media (max-width: 650px) {

          .scholarships-page [data-reveal="left"]  { transform: translateX(-35px); }
          .scholarships-page [data-reveal="right"] { transform: translateX(35px); }
          .scholarships-page [data-reveal="up"]    { transform: translateY(24px); }

          .scholarship-hero {
            min-height: auto;
            padding: 100px 20px 35px;
          }

          .scholarship-breadcrumb {
            gap: 7px;
            margin-bottom: 20px;
            font-size: 11px;
          }

          .scholarship-hero-content {
            align-items: center;
          }

          .scholarship-eyebrow {
            font-size: 8px;
            letter-spacing: 1.5px;
          }

          .scholarship-hero h1 {
            gap: 10px;
            font-size: 36px;
          }

          .scholarship-title-line {
            width: 35px;
          }

          .scholarship-hero-text > p {
            max-width: 290px;
            font-size: 14px;
          }

          .scholarship-main {
            padding: 22px 15px 40px;
          }

          .scholarship-card {
            padding: 15px;
            border-radius: 13px;
          }

          .government-wrap {
            margin-bottom: 18px;
          }

          .scholarship-card-heading {
            gap: 13px;
            min-height: 50px;
            margin-bottom: 12px;
          }

          .scholarship-heading-icon {
            width: 53px;
            height: 45px;
            border-radius: 9px;
          }

          .scholarship-heading-icon svg {
            width: 29px;
            height: 29px;
          }

          .scholarship-card-heading h2 {
            font-size: 20px;
          }

          .scholarship-list {
            gap: 8px;
          }

          .scholarship-list-item {
            align-items: flex-start;
            min-height: 65px;
            padding: 11px 8px;
          }

          .scholarship-item-icon {
            width: 43px;
            min-width: 43px;
            padding-top: 3px;
          }

          .scholarship-item-icon svg {
            width: 23px;
            height: 23px;
          }

          .scholarship-item-divider {
            height: 42px;
            margin: 0 11px;
          }

          .scholarship-item-content h3 {
            font-size: 15px;
            line-height: 1.45;
          }

          .scholarship-item-content p {
            font-size: 12px;
            line-height: 1.55;
          }

          .scholarship-information {
            align-items: flex-start;
            padding: 10px 8px;
          }

          .scholarship-information .scholarship-item-icon {
            width: 43px;
            min-width: 43px;
          }

          .scholarship-information .scholarship-item-divider {
            height: 42px;
            margin: 0 11px;
          }

          .scholarship-information p {
            font-size: 12px;
            line-height: 1.6;
          }

          .scholarship-bottom-grid {
            grid-template-columns: 1fr;
            gap: 18px;
            margin-bottom: 20px;
          }

          .small-scholarship-card .scholarship-card-heading h2 {
            font-size: 20px;
          }

          .small-scholarship-card .scholarship-list-item {
            min-height: 55px;
          }

          .management-item {
            min-height: 55px !important;
          }

          .management-item .scholarship-item-content h3 {
            font-size: 14px;
          }

          .scholarship-contact-banner {
            flex-wrap: wrap;
            gap: 13px;
            padding: 20px;
            border-radius: 13px;
          }

          .scholarship-contact-icon {
            width: 48px;
            min-width: 48px;
          }

          .scholarship-contact-icon svg {
            width: 43px;
            height: 43px;
          }

          .scholarship-contact-divider {
            height: 48px;
          }

          .scholarship-contact-content {
            flex: 1;
            min-width: 160px;
          }

          .scholarship-contact-content h2 {
            font-size: 17px;
          }

          .scholarship-contact-content p {
            font-size: 11px;
            line-height: 1.5;
          }

          .scholarship-contact-button {
            width: 100%;
            min-width: 100%;
            margin-top: 7px;
            padding: 13px 15px;
            font-size: 13px;
          }

        }

        /* SMALL MOBILE */

        @media (max-width: 380px) {

          .scholarship-hero h1 {
            font-size: 33px;
          }

          .scholarship-card-heading h2 {
            font-size: 18px;
          }

          .small-scholarship-card .scholarship-card-heading h2 {
            font-size: 18px;
          }

          .scholarship-item-divider {
            margin-left: 7px;
            margin-right: 8px;
          }

        }

        /* =========================================
           RIPPLE MEDAL ANIMATION
        ========================================= */

        .ripple-medal {
          position: relative;
          width: 76px;
          height: 76px;
          flex-shrink: 0;
          margin-top: -40px;
          margin-left: auto;
          margin-right: 6%;
          pointer-events: none;
        }

        .ripple-ring {
          position: absolute;
          inset: 0;
          border: 2px solid #f1cf62;
          border-radius: 50%;
          opacity: 0;
          animation: ripple-out 3s ease-out infinite;
        }

        @keyframes ripple-out {
          0%   { transform: scale(.6); opacity: .9; }
          100% { transform: scale(2.6); opacity: 0; }
        }

        .ripple-core {
          position: absolute;
          inset: 8px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 2px solid #f1cf62;
          border-radius: 50%;
          background: #d9b052;
          color: #5a1226;
          animation: ripple-pulse 3s ease-in-out infinite;
        }

        @keyframes ripple-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.1); }
        }

        @media (max-width: 650px) {
          .ripple-medal {
            width: 52px;
            height: 52px;
            margin-right: 4%;
          }
          .ripple-core { inset: 6px; }
          .ripple-core svg { width: 22px; height: 22px; }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .scholarships-page [data-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .scholarship-card,
          .scholarship-card::after,
          .scholarship-heading-icon,
          .scholarship-list-item,
          .scholarship-information,
          .scholarship-contact-banner,
          .scholarship-contact-button,
          .scholarship-contact-button svg {
            transition: none;
          }

          .ripple-ring { animation: none; opacity: 0; }
          .ripple-core { animation: none; }
        }

      `}</style>

    </div>
  );
};

export default Scholarships;