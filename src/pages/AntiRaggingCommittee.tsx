
import React from "react";
import {
  ShieldCheck,
  Scale,
  Headset,
  Megaphone,
  HeartHandshake,
  ChevronRight,
  GraduationCap,
  ShieldAlert,
  Users,
} from "lucide-react";

type CommitteeMember = {
  sno: number;
  name: string;
  designation: string;
  position: string;
  type?: "convenor" | "student" | "member";
};

const members: CommitteeMember[] = [
  {
    sno: 1,
    name: "Dr.K.Balakannan",
    designation: "Head of the Institution",
    position: "Convenor",
    type: "convenor",
  },
  {
    sno: 2,
    name: "Inspector Of Police – Kundrathur Police station",
    designation: "Inspector of Police.",
    position: "Member",
  },
  {
    sno: 3,
    name: "Mr.Joseph Emmanuel S",
    designation: "NGO",
    position: "Member",
  },
  {
    sno: 4,
    name: "Mr. A. Mosses",
    designation: "Senior Faculty",
    position: "Member",
  },
  {
    sno: 5,
    name: "Mr. J.Sivamurugan",
    designation: "Senior Faculty",
    position: "Member",
  },
  {
    sno: 6,
    name: "Mrs. V.Suvarnavani",
    designation: "Senior Faculty",
    position: "Member",
  },
  {
    sno: 7,
    name: "Mr.K. Dasaradhan",
    designation: "Faculty",
    position: "Member",
  },
  {
    sno: 8,
    name: "Mr. R. Kumaresh",
    designation: "III year",
    position: "Student Representative",
    type: "student",
  },
  {
    sno: 9,
    name: "Ms. R. Bagavathy sen",
    designation: "III year",
    position: "Student Representative",
    type: "student",
  },
  {
    sno: 10,
    name: "Mr. Rajendran",
    designation: "Non Teaching",
    position: "Member",
  },
];

export default function AntiRaggingCommittee() {
  return (
<div className="anti-ragging-page" data-header-theme="dark">
      {/* HERO SECTION */}

      <section className="ar-hero">
        <div className="ar-hero-overlay" />

        <div className="ar-hero-content">

          <div className="ar-hero-icon">
            <ShieldCheck size={82} strokeWidth={1.4} />
          </div>

          <div className="ar-hero-text">
            <span className="ar-eyebrow">
              STUDENT SAFETY & WELL-BEING
            </span>

            <h1>
              ANTI-RAGGING
              <span>COMMITTEE</span>
            </h1>

            <div className="ar-gold-line" />

            <p>
              Creating a safe, respectful and ragging-free
              campus for every student.
            </p>

            <div className="ar-policy-badge">
              <ShieldCheck size={21} />
              ZERO TOLERANCE POLICY
            </div>
          </div>

        </div>

        <div className="ar-hero-bottom-line" />
      </section>

      {/* ABOUT SECTION */}

      <section className="ar-about">
        <div className="ar-about-inner">

          <div className="ar-about-content">
            <div className="ar-section-heading">
              <span className="ar-heading-line" />

              <div>
                <span className="ar-section-label">
                  OUR COMMITMENT
                </span>
                <h2>About the Committee</h2>
              </div>
            </div>

            <p>
              The Anti-Ragging Committee is constituted to prevent,
              prohibit and eliminate the menace of ragging in the
              campus and to ensure a safe, secure and welcoming
              environment for all students.
            </p>
          </div>

          <div className="ar-feature-grid">

            <div className="ar-feature-card">
              <div className="ar-feature-icon">
                <ShieldCheck />
              </div>
              <h3>Student Safety</h3>
              <p>
                Ensuring a secure and friendly campus.
              </p>
            </div>

            <div className="ar-feature-card">
              <div className="ar-feature-icon">
                <Scale />
              </div>
              <h3>Discipline</h3>
              <p>
                Strict action against ragging.
              </p>
            </div>

            <div className="ar-feature-card">
              <div className="ar-feature-icon">
                <Headset />
              </div>
              <h3>Complaint Support</h3>
              <p>
                Confidential and prompt redressal.
              </p>
            </div>

          </div>
        </div>
      </section>

      {/* COMMITTEE MEMBERS */}

      <section className="ar-members">

        <div className="ar-section-heading">
          <span className="ar-heading-line" />

          <div>
            <span className="ar-section-label">
              OFFICIAL REPRESENTATIVES
            </span>

            <h2>Committee Members</h2>

            <p className="ar-heading-description">
              Official Members of the Anti-Ragging Committee
            </p>
          </div>
        </div>

        <div className="ar-table-container">
          <table className="ar-table">

            <thead>
              <tr>
                <th>S.No</th>
                <th>Name (mixed gender)</th>
                <th>Designation</th>
                <th>Position</th>
              </tr>
            </thead>

            <tbody>
              {members.map((member) => (
                <tr key={member.sno}>
                  <td className="ar-serial">
                    {String(member.sno).padStart(2, "0")}
                  </td>

                  <td className="ar-member-name">
                    {member.name}
                  </td>

                  <td>{member.designation}</td>

                  <td>
                    <span
                      className={`ar-position ${member.type || "member"}`}
                    >
                      {member.position}
                    </span>
                  </td>
                </tr>
              ))}
            </tbody>

          </table>
        </div>

      </section>

      {/* REPORTING PROCEDURE */}

      <section className="ar-report">

        <div className="ar-report-inner">

          <div className="ar-report-left">

            <div className="ar-report-title">
              <Megaphone size={37} />
              <h2>How to Report Ragging?</h2>
            </div>

            <div className="ar-steps">

              <div className="ar-step">
                <span className="ar-step-number">01</span>
                <p>
                  Report the incident to the committee.
                </p>
              </div>

              <ChevronRight className="ar-step-arrow" />

              <div className="ar-step">
                <span className="ar-step-number">02</span>
                <p>
                  Provide relevant details of the incident.
                </p>
              </div>

              <ChevronRight className="ar-step-arrow" />

              <div className="ar-step">
                <span className="ar-step-number">03</span>
                <p>
                  The committee reviews and takes appropriate action.
                </p>
              </div>

            </div>
          </div>

          <div className="ar-report-divider" />

          <div className="ar-safety-message">

            <HeartHandshake size={64} />

            <div>
              <h2>Your Safety Matters</h2>

              <p>
                Every student deserves a safe, respectful
                and supportive learning environment.
              </p>

              <div className="ar-free-badge">
                <GraduationCap size={22} />
                RAGGING-FREE CAMPUS
              </div>
            </div>

          </div>

        </div>
      </section>

      {/* FOOTER */}

      <footer className="ar-footer">
        <p>
          © {new Date().getFullYear()} ST. Lourdes Engineering College.
          All Rights Reserved.
        </p>

        <span>
          Committed to a Safe and Ragging-Free Campus
        </span>
      </footer>

      {/* ALL CSS INCLUDED HERE */}

      <style>{`

        @import url('https://fonts.googleapis.com/css2?family=DM+Sans:wght@400;500;600;700;800&family=Playfair+Display:wght@500;600;700;800&display=swap');

        .anti-ragging-page {
          --ar-maroon: #650b19;
          --ar-deep: #400610;
          --ar-dark: #30040b;
          --ar-gold: #d5a83f;
          --ar-light-gold: #f4d58b;

          width: 100%;
          overflow: hidden;
          background: #fff;
          color: #29202a;
          font-family: 'DM Sans', sans-serif;
        }

        .anti-ragging-page * {
          box-sizing: border-box;
        }

        /* HERO */

        .ar-hero {
          position: relative;
          min-height: 540px;
          display: flex;
          align-items: center;
          padding: 130px 6% 85px;

          background:
            linear-gradient(
              90deg,
              rgba(48,4,11,.98) 0%,
              rgba(85,7,23,.92) 42%,
              rgba(65,5,17,.35) 100%
            ),
            url('/images/college-campus.jpg')
            center 43% / cover no-repeat;

          color: #fff;
          isolation: isolate;
        }

        .ar-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            radial-gradient(
              circle at 25% 45%,
              rgba(157,25,45,.23),
              transparent 45%
            );
        }

        .ar-hero-content {
          position: relative;
          z-index: 2;
          display: flex;
          align-items: center;
          gap: 30px;
          max-width: 1250px;
          width: 100%;
          margin: auto;
        }

        .ar-hero-icon {
          flex-shrink: 0;
          color: var(--ar-light-gold);
          filter: drop-shadow(
            0 0 12px rgba(213,168,63,.2)
          );
        }

        .ar-eyebrow {
          color: var(--ar-light-gold);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 3px;
        }

        .ar-hero-text h1 {
          font-family: 'Playfair Display', serif;
          font-size: clamp(38px, 5vw, 66px);
          font-weight: 700;
          line-height: 1.08;
          letter-spacing: 1px;
          margin: 12px 0;
        }

        .ar-hero-text h1 span {
          display: block;
          color: var(--ar-light-gold);
        }

        .ar-gold-line {
          width: 105px;
          height: 4px;
          border-radius: 5px;
          background: linear-gradient(
            90deg,
            var(--ar-gold),
            var(--ar-light-gold)
          );
          margin: 22px 0 14px;
        }

        .ar-hero-text > p {
          max-width: 530px;
          font-size: 17px;
          line-height: 1.7;
          color: #f8eaf0;
          margin-bottom: 22px;
        }

        .ar-policy-badge {
          display: inline-flex;
          align-items: center;
          gap: 10px;
          padding: 13px 24px;
          border-radius: 40px;
          background: linear-gradient(
            120deg,
            #e4b84f,
            #ffe5a0,
            #d8a52d
          );
          color: #4a0711;
          font-size: 14px;
          font-weight: 800;
          box-shadow: 0 5px 18px rgba(0,0,0,.18);
        }

        .ar-hero-bottom-line {
          position: absolute;
          bottom: 0;
          left: 0;
          width: 100%;
          height: 6px;
          background: linear-gradient(
            90deg,
            #a56a14,
            #ffe3a0,
            #bc831f
          );
        }

        /* COMMON HEADINGS */

        .ar-section-heading {
          display: flex;
          align-items: flex-start;
          gap: 16px;
          margin-bottom: 25px;
        }

        .ar-heading-line {
          width: 7px;
          min-height: 48px;
          border-radius: 5px;
          flex-shrink: 0;
          background: linear-gradient(
            180deg,
            #f1c85c,
            #a75a12
          );
        }

        .ar-section-label {
          color: #a77b2a;
          font-size: 10px;
          font-weight: 800;
          letter-spacing: 2px;
        }

        .ar-section-heading h2 {
          margin: 4px 0 0;
          color: var(--ar-maroon);
          font-family: 'Playfair Display', serif;
          font-size: 30px;
          font-weight: 700;
        }

        /* ABOUT */

        .ar-about {
          padding: 75px 5% 50px;
          background: #fff;
        }

        .ar-about-inner {
          max-width: 1400px;
          margin: auto;
          display: grid;
          grid-template-columns: 1fr 1.35fr;
          align-items: center;
          gap: 45px;
        }

        .ar-about-content > p {
          font-size: 15px;
          line-height: 1.85;
          color: #51454a;
          margin: 0;
        }

        .ar-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, 1fr);
          gap: 16px;
        }

        .ar-feature-card {
          padding: 24px 13px;
          text-align: center;
          border: 1px solid #e5c27c;
          border-radius: 15px;
          background: linear-gradient(
            145deg,
            #fff,
            #fff9ef
          );
          box-shadow: 0 5px 18px rgba(77,10,25,.045);
          transition: transform .35s ease,
                      box-shadow .35s ease;
        }

        .ar-feature-card:hover {
          transform: translateY(-7px);
          box-shadow: 0 12px 30px rgba(77,10,25,.12);
        }

        .ar-feature-icon {
          width: 64px;
          height: 64px;
          display: grid;
          place-items: center;
          margin: 0 auto 12px;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #fff0c8,
            #e9c46f
          );
          color: var(--ar-maroon);
        }

        .ar-feature-icon svg {
          width: 33px;
          height: 33px;
          stroke-width: 1.7;
        }

        .ar-feature-card h3 {
          color: var(--ar-maroon);
          font-family: 'Playfair Display', serif;
          font-size: 16px;
          margin: 0 0 8px;
        }

        .ar-feature-card p {
          font-size: 13px;
          line-height: 1.6;
          margin: 0;
          color: #5b5050;
        }

        /* MEMBERS */

        .ar-members {
          max-width: 1500px;
          margin: auto;
          padding: 35px 5% 70px;
          background: #fff;
        }

        .ar-heading-description {
          color: #715d60;
          font-size: 14px;
          margin: 5px 0 0;
        }

        .ar-table-container {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #ddc7bd;
          border-radius: 13px;
          box-shadow: 0 7px 25px rgba(66,6,16,.055);
        }

        .ar-table {
          width: 100%;
          min-width: 700px;
          border-collapse: collapse;
          text-align: left;
        }

        .ar-table th {
          padding: 17px 20px;
          background: linear-gradient(
            100deg,
            #570817,
            #830e27
          );
          color: #fff;
          font-size: 14px;
          font-weight: 700;
          border-right: 1px solid rgba(255,255,255,.2);
        }

        .ar-table th:first-child {
          text-align: center;
          width: 9%;
        }

        .ar-table th:nth-child(2) {
          width: 42%;
        }

        .ar-table th:nth-child(3) {
          width: 28%;
        }

        .ar-table td {
          padding: 12px 20px;
          font-size: 14px;
          border-right: 1px solid #eadbd5;
          border-bottom: 1px solid #eadbd5;
          color: #30282a;
        }

        .ar-table tbody tr:nth-child(even) {
          background: #f8eee6;
        }

        .ar-table tbody tr:nth-child(odd) {
          background: #fff;
        }

        .ar-table tbody tr {
          transition: background .2s ease;
        }

        .ar-table tbody tr:hover {
          background: #f5e1bd;
        }

        .ar-table tbody tr:last-child td {
          border-bottom: none;
        }

        .ar-serial {
          text-align: center;
          font-weight: 700;
          color: var(--ar-maroon) !important;
        }

        .ar-member-name {
          font-weight: 600;
        }

        .ar-position {
          display: inline-block;
          padding: 5px 15px;
          border-radius: 30px;
          text-align: center;
          white-space: nowrap;
          font-size: 12px;
          font-weight: 700;
        }

        .ar-position.convenor {
          color: #4c3000;
          background: linear-gradient(
            90deg,
            #e7b63f,
            #ffe5a0
          );
        }

        .ar-position.member {
          color: #651322;
          background: #f0d9d8;
        }

        .ar-position.student {
          color: #553300;
          background: linear-gradient(
            90deg,
            #f6d78a,
            #ffe9b2
          );
        }

        /* REPORTING */

        .ar-report {
          position: relative;
          padding: 60px 5%;
          background:
            linear-gradient(
              rgba(68,4,16,.95),
              rgba(48,4,11,.97)
            ),
            url('/images/college-campus.jpg')
            center / cover;
          color: #fff;
        }

        .ar-report-inner {
          max-width: 1400px;
          margin: auto;
          display: grid;
          grid-template-columns: 1.2fr 1px 1fr;
          align-items: center;
          gap: 45px;
        }

        .ar-report-title {
          display: flex;
          align-items: center;
          gap: 15px;
          color: var(--ar-light-gold);
          margin-bottom: 30px;
        }

        .ar-report-title h2,
        .ar-safety-message h2 {
          font-family: 'Playfair Display', serif;
          color: #fff;
          font-size: 26px;
          margin: 0;
        }

        .ar-steps {
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 18px 12px;
          border: 1px solid rgba(255,225,160,.75);
          border-radius: 17px;
          gap: 8px;
        }

        .ar-step {
          flex: 1;
          text-align: center;
          display: flex;
          flex-direction: column;
          align-items: center;
        }

        .ar-step-number {
          width: 42px;
          height: 42px;
          display: grid;
          place-items: center;
          border-radius: 50%;
          background: linear-gradient(
            145deg,
            #ffe5a0,
            #d9a32d
          );
          color: #4a0711;
          font-size: 17px;
          font-weight: 800;
          margin-bottom: 12px;
        }

        .ar-step p {
          max-width: 140px;
          font-size: 13px;
          line-height: 1.55;
          margin: 0;
          color: #fff4e9;
        }

        .ar-step-arrow {
          color: var(--ar-light-gold);
          flex-shrink: 0;
        }

        .ar-report-divider {
          height: 150px;
          width: 2px;
          background: linear-gradient(
            180deg,
            transparent,
            var(--ar-gold),
            transparent
          );
        }

        .ar-safety-message {
          display: flex;
          align-items: flex-start;
          gap: 20px;
          color: var(--ar-light-gold);
        }

        .ar-safety-message > svg {
          flex-shrink: 0;
        }

        .ar-safety-message h2 {
          margin-bottom: 12px;
        }

        .ar-safety-message p {
          color: #f5e8e8;
          line-height: 1.7;
          font-size: 14px;
          margin: 0 0 22px;
        }

        .ar-free-badge {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 13px 24px;
          border-radius: 40px;
          background: linear-gradient(
            120deg,
            #d6a43a,
            #ffe7a6,
            #d5a02d
          );
          color: #510a17;
          font-weight: 800;
          font-size: 13px;
          box-shadow: 0 5px 20px rgba(0,0,0,.2);
        }

        /* FOOTER */

        .ar-footer {
          background: #30040b;
          padding: 22px 5%;
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          color: #f5e8d5;
          font-size: 12px;
          border-top: 1px solid rgba(213,168,63,.35);
        }

        .ar-footer p {
          margin: 0;
        }

        .ar-footer span {
          color: var(--ar-light-gold);
        }

        /* TABLET */

        @media(max-width: 1050px) {
          .ar-about-inner {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .ar-report-inner {
            gap: 25px;
          }
        }

        /* MOBILE */

        @media(max-width: 768px) {
          .ar-hero {
            min-height: 520px;
            padding: 135px 6% 75px;
            background-position: 62% center;
          }

          .ar-hero-content {
            gap: 12px;
            align-items: flex-start;
          }

          .ar-hero-icon svg {
            width: 48px;
            height: 48px;
          }

          .ar-hero-text h1 {
            font-size: clamp(30px, 8vw, 43px);
          }

          .ar-eyebrow {
            font-size: 9px;
            letter-spacing: 1.5px;
          }

          .ar-hero-text > p {
            font-size: 14px;
          }

          .ar-policy-badge {
            font-size: 11px;
            padding: 11px 15px;
          }

          .ar-about {
            padding: 45px 5% 30px;
          }

          .ar-section-heading h2 {
            font-size: 24px;
          }

          .ar-feature-grid {
            grid-template-columns: 1fr;
            gap: 13px;
          }

          .ar-feature-card {
            display: grid;
            grid-template-columns: 60px 1fr;
            align-items: center;
            text-align: left;
            gap: 0 14px;
            padding: 15px;
          }

          .ar-feature-icon {
            grid-row: span 2;
            width: 52px;
            height: 52px;
            margin: 0;
          }

          .ar-feature-icon svg {
            width: 27px;
            height: 27px;
          }

          .ar-feature-card h3 {
            margin-bottom: 3px;
          }

          .ar-members {
            padding: 25px 5% 45px;
          }

          .ar-table {
            min-width: 760px;
          }

          .ar-table th,
          .ar-table td {
            padding: 12px 14px;
            font-size: 12px;
          }

          .ar-report-inner {
            grid-template-columns: 1fr;
            gap: 30px;
          }

          .ar-report-divider {
            width: 100%;
            height: 1px;
          }

          .ar-report-title h2,
          .ar-safety-message h2 {
            font-size: 22px;
          }

          .ar-steps {
            gap: 5px;
            padding: 15px 8px;
          }

          .ar-step-number {
            width: 35px;
            height: 35px;
            font-size: 15px;
          }

          .ar-step p {
            font-size: 11px;
          }

          .ar-step-arrow {
            width: 17px;
          }

          .ar-safety-message {
            gap: 13px;
          }

          .ar-safety-message > svg {
            width: 42px;
            height: 42px;
          }

          .ar-footer {
            flex-direction: column;
            text-align: center;
            font-size: 11px;
          }
        }

        @media(max-width: 380px) {
          .ar-hero-content {
            gap: 7px;
          }

          .ar-hero-icon svg {
            width: 38px;
            height: 38px;
          }

          .ar-hero-text h1 {
            font-size: 29px;
          }

          .ar-steps {
            gap: 2px;
          }

          .ar-step p {
            font-size: 10px;
          }

          .ar-step-arrow {
            width: 13px;
          }
        }

        /* REDUCED MOTION */

        @media(prefers-reduced-motion: reduce) {
          .anti-ragging-page *,
          .anti-ragging-page *::before,
          .anti-ragging-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }

      `}</style>
    </div>
  );
}
