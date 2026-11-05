
import React from "react";
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
  Mail,
  Phone,
  BookOpen,
} from "lucide-react";

const Scholarships: React.FC = () => {
  return (
    <div className="scholarships-page">

      {/* ================= HERO SECTION ================= */}

      <section className="scholarship-hero">
        <div className="scholarship-hero-pattern"></div>

        <div className="scholarship-hero-inner">

          <div className="scholarship-breadcrumb">
            <a href="/">
              <Home size={14} />
              <span>Home</span>
            </a>

            <ChevronRight size={14} />

            <a href="/admission">Admission</a>

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

          

          </div>
        </div>
      </section>

      {/* ================= MAIN CONTENT ================= */}

      <main className="scholarship-main">

        {/* GOVERNMENT SCHOLARSHIPS */}

        <section className="scholarship-card government-card">

          <div className="scholarship-card-heading">

            <div className="scholarship-heading-icon">
              <Landmark size={39} strokeWidth={1.8} />
            </div>

            <h2>Government Scholarships</h2>

          </div>

          <div className="scholarship-list">

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
        </section>

        {/* LOWER SCHOLARSHIP CARDS */}

        <div className="scholarship-bottom-grid">

          {/* NON GOVERNMENT */}

          <section className="scholarship-card small-scholarship-card">

            <div className="scholarship-card-heading">

              <div className="scholarship-heading-icon">
                <Handshake size={39} strokeWidth={1.8} />
              </div>

              <h2>Non-Government Scholarships</h2>

            </div>

            <div className="scholarship-list">

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
          </section>

          {/* MANAGEMENT */}

          <section className="scholarship-card small-scholarship-card">

            <div className="scholarship-card-heading">

              <div className="scholarship-heading-icon">
                <GraduationCap size={41} strokeWidth={1.7} />
              </div>

              <h2>Management Scholarships</h2>

            </div>

            <div className="scholarship-list">

              <div className="scholarship-list-item management-item">

                <div className="scholarship-item-icon">
                  <Layers size={29} strokeWidth={1.8} />
                </div>

                <div className="scholarship-item-divider"></div>

                <div className="scholarship-item-content">
                  <h3>Management Scholarship</h3>
                </div>

              </div>

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
          </section>

        </div>

        {/* ================= CONTACT BANNER ================= */}

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

          <a
            href="/contact"
            className="scholarship-contact-button"
          >
            Contact Admissions
            <ArrowRight size={21} />
          </a>

        </section>

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

  /* Space for the existing fixed college navbar */
  padding-top: 100px;

  background: var(--sch-cream);
  color: var(--sch-text);
  font-family: inherit;
  overflow: hidden;
}

        .scholarships-page * {
          box-sizing: border-box;
        }

        /* HERO */

        .scholarship-hero {
          position: relative;
          width: 100%;
          min-height: 180px;
          padding: 24px 7% 26px;
          color: #fff;

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
          font-size: clamp(38px, 4.5vw, 56px);
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
          font-size: 19px;
          font-style: italic;
          line-height: 1.5;
        }

        /* HERO ART */

        .scholarship-hero-art {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 260px;
          height: 130px;
          margin-right: 15px;
          color: #e7c568;
        }

        .scholarship-cap-icon {
          width: 125px;
          height: 105px;
          color: #e9c765;
          filter: drop-shadow(0 5px 8px rgba(0,0,0,0.15));
        }

        .scholarship-medal {
          position: absolute;
          bottom: -4px;
          left: 50%;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 58px;
          height: 58px;
          border: 2px solid #e9c765;
          border-radius: 50%;
          background: #74152f;
          color: #e9c765;
          transform: translateX(-50%);
        }

        .scholarship-laurel {
          position: absolute;
          top: 5px;
          color: #e8c465;
          font-size: 95px;
          line-height: 1;
          opacity: 0.9;
        }

        .scholarship-laurel-left {
          left: 2px;
          transform: rotate(-40deg);
        }

        .scholarship-laurel-right {
          right: 2px;
          transform: scaleX(-1) rotate(-40deg);
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
            transform 0.3s ease,
            box-shadow 0.3s ease,
            border-color 0.3s ease;
        }

        .scholarship-card:hover {
          border-color: #d8af60;
          box-shadow: 0 12px 26px rgba(91,53,24,0.10);
          transform: translateY(-3px);
        }

        .government-card {
          margin-bottom: 25px;
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
        }

        .scholarship-card-heading h2 {
          margin: 0;
          color: #76152f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 29px;
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
          transform: translateX(4px);
        }

        .scholarship-item-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 85px;
          min-width: 85px;
          color: #821d38;
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
          font-size: 19px;
          font-weight: 700;
          line-height: 1.35;
        }

        .scholarship-item-content p {
          margin: 2px 0 0;
          color: #44363a;
          font-size: 14px;
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
        }

        .scholarship-information .scholarship-item-icon {
          color: #821b39;
        }

        .scholarship-information .scholarship-item-divider {
          height: 31px;
        }

        .scholarship-information p {
          margin: 0;
          color: #54443b;
          font-size: 14px;
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
          font-size: 26px;
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
          font-size: 17px;
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
          font-size: 24px;
          font-style: italic;
          line-height: 1.3;
        }

        .scholarship-contact-content p {
          margin: 0;
          color: rgba(255,255,255,0.88);
          font-size: 14px;
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

          .scholarship-hero {
            min-height: 175px;
            padding: 22px 20px 25px;
          }

.scholarships-page {
  padding-top: 75px;
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

          .scholarship-hero-art {
            width: 80px;
            height: 80px;
            margin-right: 0;
          }

          .scholarship-cap-icon {
            width: 65px;
            height: 65px;
          }

          .scholarship-medal {
            bottom: -8px;
            width: 35px;
            height: 35px;
          }

          .scholarship-medal svg {
            width: 27px;
            height: 27px;
          }

          .scholarship-laurel {
            font-size: 50px;
          }

          .scholarship-main {
            padding: 22px 15px 40px;
          }

          .scholarship-card {
            padding: 15px;
            border-radius: 13px;
          }

          .government-card {
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

          .scholarship-hero-art {
            display: none;
          }

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

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .scholarship-card,
          .scholarship-list-item,
          .scholarship-contact-button,
          .scholarship-contact-button svg {
            transition: none;
          }
        }

      `}</style>

    </div>
  );
};

export default Scholarships;
