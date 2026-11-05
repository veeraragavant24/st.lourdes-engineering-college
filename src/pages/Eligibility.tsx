
import React from "react";
import {
  BookOpen,
  Settings,
  GraduationCap,
  CheckCircle2,
  ChevronRight,
  ArrowRight,
  Award,
} from "lucide-react";

const academicEligibility = [
  { number: "01", community: "General Category", percentage: "45.00 %" },
  { number: "02", community: "BC & BCM", percentage: "40.00 %" },
  { number: "03", community: "MBC & DNC", percentage: "40.00 %" },
  { number: "04", community: "SC/SCA/ST", percentage: "40.00 %" },
];

const vocationalEligibility = [
  { number: "01", community: "General Category", percentage: "45.00 %" },
  { number: "02", community: "BC & BCM", percentage: "40.00 %" },
  { number: "03", community: "MBC & DNC", percentage: "40.00 %" },
  { number: "04", community: "SC/SCA/ST", percentage: "40.00 %" },
];

function EligibilityTable({
  data,
  heading,
}: {
  data: { number: string; community: string; percentage: string }[];
  heading: string;
}) {
  return (
    <div className="eligibility-table-wrapper">
      <table className="eligibility-table">
        <thead>
          <tr>
            <th className="serial-column">S. No.</th>
            <th className="community-column">Community</th>
            <th>{heading}</th>
          </tr>
        </thead>

        <tbody>
          {data.map((item) => (
            <tr key={item.number}>
              <td className="serial-cell">{item.number}</td>
              <td className="community-cell">{item.community}</td>
              <td className="percentage-cell">
                <span className="eligibility-percentage">
                  {item.percentage}
                </span>
              </td>
            </tr>
          ))}
        </tbody>
      </table>
    </div>
  );
}

export default function Eligibility() {
  return (
    <div className="eligibility-page">

      {/* HERO SECTION */}
      <section className="eligibility-hero">
        <div className="eligibility-hero-overlay"></div>

        <div className="eligibility-hero-inner">
          <div className="eligibility-breadcrumb">
            <a href="/">Home</a>
            <ChevronRight size={14} />
            <a href="/academics">Academics</a>
            <ChevronRight size={14} />
            <span>Eligibility</span>
          </div>

          <div className="eligibility-hero-content">
            <div>
              <div className="eligibility-eyebrow">
                ST. LOURDES ENGINEERING COLLEGE
              </div>

              <h1>
                Eligibility
                <span className="eligibility-title-line"></span>
              </h1>

              <p>
                Admission eligibility criteria for B.E. / B.Tech programmes
                as per Anna University norms.
              </p>

              <div className="eligibility-hero-tag">
                <Award size={17} />
                <span>Admission Requirements</span>
              </div>
            </div>

            <div className="eligibility-hero-icon">
              <GraduationCap size={112} strokeWidth={1} />
              <span className="hero-icon-check">
                <CheckCircle2 size={35} />
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* MAIN CONTENT */}
      <main className="eligibility-main">

        {/* ACADEMIC ELIGIBILITY */}
        <section className="eligibility-section">

          <div className="eligibility-section-heading">
            <div className="eligibility-section-icon">
              <BookOpen size={43} strokeWidth={1.7} />
            </div>

            <div className="eligibility-section-description">
              <span className="eligibility-section-label">
                HSC QUALIFICATION
              </span>

              <h2>HSC (Academic) Eligibility</h2>

              <p>
                A pass in the HSC (Academic: both +1 and +2) or its equivalent
                with a minimum average percentage in Mathematics, Physics and
                Chemistry put together as given below.
              </p>
            </div>
          </div>

          <EligibilityTable
            data={academicEligibility}
            heading="Minimum average marks in Mathematics, Physics and Chemistry put together"
          />
        </section>

        {/* VOCATIONAL ELIGIBILITY */}
        <section className="eligibility-section">

          <div className="eligibility-section-heading">
            <div className="eligibility-section-icon">
              <Settings size={43} strokeWidth={1.7} />
            </div>

            <div className="eligibility-section-description">
              <span className="eligibility-section-label">
                VOCATIONAL QUALIFICATION
              </span>

              <h2>HSC (Vocational Subject) Eligibility</h2>

              <p>
                A pass in any one of the HSC (Vocational Subject: both +1 and
                +2) as given below with any one of the Engineering related
                subjects namely Mathematics, Physics or Chemistry with a
                minimum average percentage put together as given below.
              </p>
            </div>
          </div>

          <EligibilityTable
            data={vocationalEligibility}
            heading="Minimum average marks in Related Subjects, Vocational Theory and Practical altogether"
          />
        </section>

        {/* LATERAL ENTRY SCHEME */}
        <section className="lateral-entry-section">

          <div className="lateral-entry-heading">
            <div className="lateral-entry-icon">
              <GraduationCap size={48} strokeWidth={1.6} />
            </div>

            <div className="lateral-entry-title">
              <span>LATERAL ADMISSION</span>
              <h2>
                Lateral Entry
                <br />
                Scheme
              </h2>
            </div>
          </div>

          <div className="lateral-entry-content">

            <div className="lateral-entry-item">
              <CheckCircle2 size={24} />

              <p>
                A pass with minimum eligible marks in the Diploma Course of
                the State Board of Technical Education and Training, Tamil
                Nadu / equivalent course prescribed for the Degree course.
              </p>
            </div>

            <div className="lateral-entry-item">
              <CheckCircle2 size={24} />

              <p>
                For the purpose of calculation of marks in respect of
                sandwich diploma passed candidates, marks secured in the
                last two semesters shall be considered. If the Industrial
                training intervenes in any one of the last two semesters,
                then the marks of the previous semester in which there is
                no industrial training shall be considered for the purpose
                of calculating the marks.
              </p>
            </div>

          </div>
        </section>

        {/* BOTTOM INFORMATION */}
        <div className="eligibility-bottom-note">
          <div className="eligibility-bottom-icon">
            <BookOpen size={23} />
          </div>

          <div>
            <h3>Plan Your Admission Journey</h3>
            <p>
              Candidates are advised to ensure that they meet the prescribed
              eligibility requirements before applying for admission.
            </p>
          </div>

          <a href="/admission" className="eligibility-admission-link">
            Admission Details
            <ArrowRight size={17} />
          </a>
        </div>

      </main>

      <style>{`
        /* =========================================
           ELIGIBILITY PAGE - ST. LOURDES
           MAROON & GOLD DESIGN
        ========================================= */

  .eligibility-page {
  --eligibility-maroon: #70152f;
  --eligibility-dark: #4b1025;
  --eligibility-gold: #d6ad55;
  --eligibility-light-gold: #f9e8bd;
  --eligibility-cream: #fcfaf6;
  --eligibility-text: #51454a;

  width: 100%;
  min-height: 100vh;
  padding-top: 100px;
  background: var(--eligibility-cream);
  color: var(--eligibility-text);
  font-family: inherit;
  overflow: hidden;
}

        .eligibility-page * {
          box-sizing: border-box;
        }

        /* HERO */

        .eligibility-hero {
          position: relative;
          width: 100%;
          min-height: 285px;
          padding: 35px 6% 40px;
          background:
            radial-gradient(
              circle at 85% 15%,
              rgba(214,173,85,0.13),
              transparent 30%
            ),
            linear-gradient(
              115deg,
              #481025 0%,
              #70152f 55%,
              #861c3c 100%
            );
          color: #fff;
          overflow: hidden;
        }

        .eligibility-hero::before {
          content: "";
          position: absolute;
          width: 400px;
          height: 400px;
          border: 1px solid rgba(255,255,255,0.07);
          border-radius: 50%;
          right: -100px;
          top: -210px;
        }

        .eligibility-hero::after {
          content: "";
          position: absolute;
          width: 300px;
          height: 300px;
          border: 1px solid rgba(214,173,85,0.12);
          border-radius: 50%;
          right: 40px;
          bottom: -220px;
        }

        .eligibility-hero-inner {
          position: relative;
          z-index: 2;
          max-width: 1450px;
          margin: auto;
        }

        .eligibility-breadcrumb {
          display: flex;
          align-items: center;
          gap: 11px;
          margin-bottom: 27px;
          font-size: 13px;
          color: rgba(255,255,255,0.72);
        }

        .eligibility-breadcrumb a {
          color: rgba(255,255,255,0.85);
          text-decoration: none;
          transition: color 0.3s ease;
        }

        .eligibility-breadcrumb a:hover {
          color: var(--eligibility-gold);
        }

        .eligibility-breadcrumb span {
          color: var(--eligibility-gold);
          font-weight: 600;
        }

        .eligibility-hero-content {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 30px;
        }

        .eligibility-eyebrow {
          color: var(--eligibility-gold);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
          margin-bottom: 10px;
        }

        .eligibility-hero h1 {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 22px;
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(38px, 5vw, 55px);
          line-height: 1.1;
          font-weight: 700;
        }

        .eligibility-title-line {
          display: inline-block;
          width: 65px;
          height: 3px;
          background: var(--eligibility-gold);
        }

        .eligibility-hero-content p {
          max-width: 650px;
          margin: 17px 0 0;
          color: rgba(255,255,255,0.86);
          font-size: 15px;
          line-height: 1.8;
        }

        .eligibility-hero-tag {
          display: inline-flex;
          align-items: center;
          gap: 9px;
          margin-top: 20px;
          padding: 9px 15px;
          border: 1px solid rgba(214,173,85,0.45);
          border-radius: 30px;
          color: #f5dfac;
          background: rgba(255,255,255,0.06);
          font-size: 12px;
          font-weight: 600;
        }

        .eligibility-hero-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 150px;
          height: 150px;
          flex-shrink: 0;
          color: rgba(245,222,172,0.55);
        }

        .hero-icon-check {
          position: absolute;
          right: 3px;
          bottom: 12px;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 42px;
          height: 42px;
          border: 2px solid rgba(214,173,85,0.65);
          border-radius: 50%;
          background: #70152f;
          color: var(--eligibility-gold);
        }

        /* MAIN */

        .eligibility-main {
          width: 100%;
          max-width: 1350px;
          margin: auto;
          padding: 48px 35px 75px;
        }

        .eligibility-section {
          margin-bottom: 45px;
        }

        /* SECTION HEADING */

        .eligibility-section-heading {
          display: flex;
          align-items: stretch;
          min-height: 115px;
          margin-bottom: 22px;
          border: 1px solid #eadcc5;
          border-radius: 17px;
          background: #fff;
          box-shadow: 0 5px 20px rgba(67,35,26,0.045);
          overflow: hidden;
        }

        .eligibility-section-icon {
          position: relative;
          display: flex;
          align-items: center;
          justify-content: center;
          width: 165px;
          min-width: 165px;
          color: #fff;
          background: linear-gradient(
            135deg,
            #76152f,
            #4d1027
          );
          border-radius: 0 55px 55px 0;
        }

        .eligibility-section-icon::after {
          content: "";
          position: absolute;
          right: -13px;
          top: 0;
          width: 28px;
          height: 100%;
          background: #76152f;
          transform: skewX(-10deg);
        }

        .eligibility-section-description {
          flex: 1;
          padding: 21px 28px;
        }

        .eligibility-section-label {
          display: block;
          margin-bottom: 5px;
          color: #b18a43;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .eligibility-section-description h2 {
          margin: 0 0 7px;
          color: var(--eligibility-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
          line-height: 1.3;
          font-weight: 700;
        }

        .eligibility-section-description p {
          max-width: 950px;
          margin: 0;
          color: #62565b;
          font-size: 14px;
          line-height: 1.75;
        }

        /* TABLE */

        .eligibility-table-wrapper {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #e8d9c0;
          border-radius: 13px;
          background: #fff;
          box-shadow: 0 5px 17px rgba(67,35,26,0.055);
        }

        .eligibility-table {
          width: 100%;
          min-width: 650px;
          border-collapse: separate;
          border-spacing: 0;
          text-align: left;
        }

        .eligibility-table thead {
          background: linear-gradient(
            110deg,
            #70152f,
            #8b1e41
          );
          color: white;
        }

        .eligibility-table th {
          padding: 17px 18px;
          border-right: 1px solid rgba(255,255,255,0.25);
          font-size: 13px;
          line-height: 1.5;
          font-weight: 700;
          text-align: center;
        }

        .eligibility-table th:last-child {
          border-right: none;
        }

        .eligibility-table .serial-column {
          width: 85px;
        }

        .eligibility-table .community-column {
          width: 240px;
          text-align: left;
        }

        .eligibility-table td {
          padding: 13px 18px;
          border-right: 1px solid #eee4d6;
          border-bottom: 1px solid #eee4d6;
          color: #42383b;
          font-size: 14px;
          transition: background 0.25s ease;
        }

        .eligibility-table tbody tr:nth-child(even) {
          background: #faf6ef;
        }

        .eligibility-table tbody tr:nth-child(odd) {
          background: #fff;
        }

        .eligibility-table tbody tr:hover {
          background: #f8edda;
        }

        .eligibility-table tbody tr:last-child td {
          border-bottom: none;
        }

        .eligibility-table td:last-child {
          border-right: none;
        }

        .serial-cell {
          text-align: center;
          color: #92703c !important;
          font-weight: 700;
        }

        .community-cell {
          font-weight: 600;
        }

        .percentage-cell {
          text-align: center;
        }

        .eligibility-percentage {
          display: inline-block;
          min-width: 95px;
          padding: 6px 16px;
          border-radius: 25px;
          background: linear-gradient(
            135deg,
            #fff0c8,
            #f8dfaa
          );
          color: #74152f;
          font-size: 14px;
          font-weight: 800;
          letter-spacing: 0.3px;
        }

        /* LATERAL ENTRY */

        .lateral-entry-section {
          display: grid;
          grid-template-columns: 340px 1fr;
          align-items: center;
          gap: 35px;
          padding: 34px;
          margin-top: 55px;
          border: 1.5px solid #e6c27e;
          border-radius: 17px;
          background:
            linear-gradient(
              120deg,
              #fffdf8,
              #fffaf0
            );
          box-shadow: 0 8px 24px rgba(97,61,17,0.07);
        }

        .lateral-entry-heading {
          display: flex;
          align-items: center;
          gap: 22px;
          height: 100%;
          padding-right: 25px;
          border-right: 1px solid #ead7b2;
        }

        .lateral-entry-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 75px;
          height: 75px;
          flex-shrink: 0;
          border-radius: 15px;
          background: #ffedc5;
          color: #75152e;
        }

        .lateral-entry-title span {
          display: block;
          margin-bottom: 7px;
          color: #b18a43;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 1.5px;
        }

        .lateral-entry-title h2 {
          margin: 0;
          color: #70152f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
          line-height: 1.35;
        }

        .lateral-entry-content {
          display: flex;
          flex-direction: column;
          gap: 20px;
        }

        .lateral-entry-item {
          display: flex;
          align-items: flex-start;
          gap: 13px;
        }

        .lateral-entry-item svg {
          flex-shrink: 0;
          margin-top: 2px;
          color: #c69a43;
        }

        .lateral-entry-item p {
          margin: 0;
          color: #51464a;
          font-size: 14px;
          line-height: 1.85;
        }

        /* BOTTOM NOTE */

        .eligibility-bottom-note {
          display: flex;
          align-items: center;
          gap: 18px;
          margin-top: 42px;
          padding: 22px 25px;
          border: 1px solid #eadcc5;
          border-radius: 13px;
          background: #fff;
        }

        .eligibility-bottom-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 48px;
          height: 48px;
          flex-shrink: 0;
          border-radius: 12px;
          background: #f8ebd0;
          color: #74152f;
        }

        .eligibility-bottom-note h3 {
          margin: 0 0 5px;
          color: #70152f;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
        }

        .eligibility-bottom-note p {
          margin: 0;
          color: #71666a;
          font-size: 13px;
          line-height: 1.6;
        }

        .eligibility-admission-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          flex-shrink: 0;
          margin-left: auto;
          padding: 12px 19px;
          border-radius: 6px;
          background: #70152f;
          color: white;
          text-decoration: none;
          font-size: 12px;
          font-weight: 700;
          transition: all 0.3s ease;
        }

        .eligibility-admission-link:hover {
          background: #a07a35;
          transform: translateY(-2px);
        }

        /* ANIMATION */

        @keyframes eligibilityFadeUp {
          from {
            opacity: 0;
            transform: translateY(20px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .eligibility-section,
        .lateral-entry-section,
        .eligibility-bottom-note {
          animation: eligibilityFadeUp 0.7s ease both;
        }

        .eligibility-section:nth-of-type(2) {
          animation-delay: 0.12s;
        }

        .lateral-entry-section {
          animation-delay: 0.2s;
        }

        /* TABLET */

        @media (max-width: 900px) {
          .eligibility-main {
            padding: 35px 25px 55px;
          }

          .eligibility-section-icon {
            width: 125px;
            min-width: 125px;
          }

          .lateral-entry-section {
            grid-template-columns: 260px 1fr;
            gap: 25px;
            padding: 25px;
          }

          .lateral-entry-heading {
            gap: 15px;
          }

          .lateral-entry-icon {
            width: 60px;
            height: 60px;
          }

          .lateral-entry-title h2 {
            font-size: 22px;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .eligibility-hero {
            min-height: auto;
            padding: 28px 20px 35px;
          }
 
.eligibility-page {
  padding-top: 75px;
}

          .eligibility-breadcrumb {
            gap: 7px;
            margin-bottom: 25px;
            font-size: 11px;
          }

          .eligibility-hero-content {
            align-items: flex-start;
          }

          .eligibility-eyebrow {
            font-size: 9px;
            letter-spacing: 1.8px;
          }

          .eligibility-hero h1 {
            gap: 12px;
            font-size: 38px;
          }

          .eligibility-title-line {
            width: 35px;
          }

          .eligibility-hero-content p {
            font-size: 13px;
            line-height: 1.7;
          }

          .eligibility-hero-icon {
            width: 65px;
            height: 75px;
          }

          .eligibility-hero-icon > svg {
            width: 65px;
            height: 65px;
          }

          .hero-icon-check {
            width: 26px;
            height: 26px;
            right: -3px;
            bottom: 0;
          }

          .hero-icon-check svg {
            width: 20px;
            height: 20px;
          }

          .eligibility-main {
            padding: 28px 15px 45px;
          }

          .eligibility-section {
            margin-bottom: 35px;
          }

          .eligibility-section-heading {
            flex-direction: column;
            margin-bottom: 15px;
            border-radius: 12px;
          }

          .eligibility-section-icon {
            width: 100%;
            min-width: 100%;
            height: 65px;
            border-radius: 0;
          }

          .eligibility-section-icon::after {
            display: none;
          }

          .eligibility-section-icon svg {
            width: 32px;
            height: 32px;
          }

          .eligibility-section-description {
            padding: 18px;
          }

          .eligibility-section-description h2 {
            font-size: 21px;
          }

          .eligibility-section-description p {
            font-size: 13px;
          }

          .eligibility-table {
            min-width: 570px;
          }

          .eligibility-table th {
            padding: 13px 12px;
            font-size: 11px;
          }

          .eligibility-table td {
            padding: 12px;
            font-size: 12px;
          }

          .eligibility-percentage {
            min-width: 80px;
            padding: 5px 11px;
            font-size: 12px;
          }

          .lateral-entry-section {
            grid-template-columns: 1fr;
            gap: 22px;
            padding: 20px;
            margin-top: 35px;
          }

          .lateral-entry-heading {
            padding: 0 0 18px;
            border-right: none;
            border-bottom: 1px solid #ead7b2;
          }

          .lateral-entry-title h2 {
            font-size: 23px;
          }

          .lateral-entry-item {
            gap: 10px;
          }

          .lateral-entry-item p {
            font-size: 13px;
            line-height: 1.75;
          }

          .eligibility-bottom-note {
            align-items: flex-start;
            flex-wrap: wrap;
            padding: 18px;
          }

          .eligibility-bottom-note > div:nth-child(2) {
            flex: 1;
            min-width: 180px;
          }

          .eligibility-bottom-note h3 {
            font-size: 16px;
          }

          .eligibility-bottom-note p {
            font-size: 12px;
          }

          .eligibility-admission-link {
            width: 100%;
            margin-left: 0;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .eligibility-section,
          .lateral-entry-section,
          .eligibility-bottom-note {
            animation: none;
          }
        }
      `}</style>
    </div>
  );
}
