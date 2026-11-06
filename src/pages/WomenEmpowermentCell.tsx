
import React, { useEffect, useRef } from "react";
import {
  Users,
  GraduationCap,
  ShieldCheck,
  Sprout,
  HeartHandshake,
  ArrowUpRight,
} from "lucide-react";

type CommitteeMember = {
  id: number;
  name: string;
  designation: string;
  department: string;
  position: string;
};

const committeeMembers: CommitteeMember[] = [
  {
    id: 1,
    name: "Mrs. Suvarna Vani.V",
    designation: "Asst. Professor",
    department: "ECE",
    position: "Chair Person",
  },
  {
    id: 2,
    name: "Mrs. G.Geetha",
    designation: "Asst. Professor",
    department: "IT",
    position: "Member",
  },
  {
    id: 3,
    name: "Mrs. Shanthi C",
    designation: "Asst. Professor",
    department: "MECH",
    position: "Member",
  },
  {
    id: 4,
    name: "Mrs. Jenit Chinna Rani J",
    designation: "Asst. Professor",
    department: "S&H",
    position: "Member",
  },
  {
    id: 5,
    name: "Mrs. Lavanya M",
    designation: "Asst. Professor",
    department: "ECE",
    position: "Member",
  },
  {
    id: 6,
    name: "Mrs. M.Meena",
    designation: "Asst. Professor",
    department: "MBA",
    position: "Member",
  },
  {
    id: 7,
    name: "Mrs. Sathya. M",
    designation: "Office Staff",
    department: "Office",
    position: "Member",
  },
];

const objectives = [
  {
    icon: Users,
    title: "Gender Equality",
    description:
      "To promote a culture of equality, dignity and respect.",
  },
  {
    icon: GraduationCap,
    title: "Skill & Leadership",
    description:
      "To encourage leadership, confidence and skill development among women.",
  },
  {
    icon: ShieldCheck,
    title: "Safety & Support",
    description:
      "To ensure a safe, secure and supportive campus environment.",
  },
  {
    icon: Sprout,
    title: "Awareness",
    description:
      "To conduct awareness programmes on women's rights, health and well-being.",
  },
];

export default function WomenEmpowermentCell() {
  const pageRef = useRef<HTMLElement | null>(null);

useEffect(() => {
  const page = pageRef.current;
  if (!page) return;

  const revealElements = page.querySelectorAll<HTMLElement>(
    ".wec-hero-content, .wec-hero-symbol, .wec-about-image, .wec-about-content, .wec-heading-center, .wec-objective-card, .wec-table-wrapper, .wec-member-note, .wec-quote-inner"
  );

  revealElements.forEach((element, index) => {
    if (element.classList.contains("wec-about-image")) {
      element.classList.add("wec-reveal-left");
    } else if (element.classList.contains("wec-about-content")) {
      element.classList.add("wec-reveal-right");
    } else if (element.classList.contains("wec-objective-card")) {
      element.classList.add(
        index % 2 === 0 ? "wec-reveal-left" : "wec-reveal-right"
      );

      element.style.setProperty(
        "--wec-reveal-delay",
        `${(index % 4) * 100}ms`
      );
    } else if (element.classList.contains("wec-hero-symbol")) {
      element.classList.add("wec-reveal-right");
    } else {
      element.classList.add("wec-reveal-up");
    }
  });

  const observer = new IntersectionObserver(
    (entries) => {
      entries.forEach((entry) => {
        const element = entry.target as HTMLElement;

        if (entry.isIntersecting) {
          element.classList.add("wec-reveal-visible");
        } else {
          element.classList.remove("wec-reveal-visible");
        }
      });
    },
    {
      threshold: 0.15,
      rootMargin: "0px 0px -35px 0px",
    }
  );

  revealElements.forEach((element) => observer.observe(element));

  return () => observer.disconnect();
}, []);
  return (
<main className="wec-page" ref={pageRef}>

      {/* HERO SECTION */}
      <section className="wec-hero">
        <div className="wec-hero-overlay" />

        <div className="wec-hero-content">
          <div className="wec-college-label">
            <span className="wec-label-star">✦</span>
            ST. LOURDES ENGINEERING COLLEGE
            <span className="wec-label-line" />
          </div>

          <h1>
            WOMEN
            <br />
            EMPOWERMENT CELL
          </h1>

          <p>
            Promoting equality, confidence, leadership and
            <br className="wec-desktop-break" />
            opportunities for women.
          </p>

          <div className="wec-hero-tagline">
            <span>Empower</span>
            <i>•</i>
            <span>Encourage</span>
            <i>•</i>
            <span>Elevate</span>
          </div>
        </div>

        <div className="wec-hero-symbol">
          <HeartHandshake strokeWidth={1.1} />
        </div>

        <div className="wec-hero-bottom" />
      </section>

      {/* ABOUT SECTION */}
      <section className="wec-about wec-container">
        <div className="wec-about-image">
          <img
            src="/images/women-empowerment.jpg"
            alt="Women students collaborating at college"
          />
          <div className="wec-image-decoration" />
        </div>

        <div className="wec-about-content">
          <div className="wec-section-label">
            ABOUT THE CELL
          </div>

          <h2>About Women Empowerment Cell</h2>

          <p>
            The Women Empowerment Cell (WEC) is constituted to
            create a supportive and inclusive environment for
            women in the campus, to safeguard their rights,
            address their concerns and to promote their overall
            development, well-being and leadership.
          </p>

          <div className="wec-about-highlight">
            <span className="wec-highlight-icon">
              <HeartHandshake size={23} />
            </span>
            <div>
              <strong>Empowering Every Woman</strong>
              <span>
                Building confidence, opportunity and equality.
              </span>
            </div>
          </div>
        </div>
      </section>

      {/* OBJECTIVES SECTION */}
      <section className="wec-objectives wec-container">
        <div className="wec-heading-center">
          <div className="wec-heading-overline">
            <span />
            OUR OBJECTIVES
            <span />
          </div>

          <h2>Objectives of the Cell</h2>

          <p>
            Creating opportunities for growth, awareness and
            empowerment.
          </p>
        </div>

        <div className="wec-objective-grid">
          {objectives.map((item, index) => {
            const Icon = item.icon;

            return (
              <article
                className="wec-objective-card"
                key={item.title}
                style={{ animationDelay: `${index * 100}ms` }}
              >
                <div className="wec-objective-icon">
                  <Icon size={34} strokeWidth={1.7} />
                </div>

                <h3>{item.title}</h3>

                <p>{item.description}</p>

                <div className="wec-card-bottom-line" />
              </article>
            );
          })}
        </div>
      </section>

      {/* COMMITTEE MEMBERS SECTION */}
      <section className="wec-committee">
        <div className="wec-container">
          <div className="wec-heading-center">
            <div className="wec-heading-overline">
              <span />
              COMMITTEE DETAILS
              <span />
            </div>

            <h2>Committee Members</h2>

            <p>
              Meet the members of the Women Empowerment Cell
              at St. Lourdes Engineering College.
            </p>
          </div>

          <div className="wec-table-wrapper">
            <table className="wec-table">
              <thead>
                <tr>
                  <th>S.No</th>
                  <th>Name</th>
                  <th>Designation</th>
                  <th>Department</th>
                  <th>Position</th>
                </tr>
              </thead>

              <tbody>
                {committeeMembers.map((member) => (
                  <tr key={member.id}>
                    <td className="wec-serial">
                      {String(member.id).padStart(2, "0")}
                    </td>

                    <td className="wec-member-name">
                      {member.name}
                    </td>

                    <td>{member.designation}</td>

                    <td>{member.department}</td>

                    <td>
                      <span
                        className={
                          member.position === "Chair Person"
                            ? "wec-position wec-chair"
                            : "wec-position"
                        }
                      >
                        {member.position}
                      </span>
                    </td>
                  </tr>
                ))}
              </tbody>
            </table>
          </div>

          <div className="wec-member-note">
            <ShieldCheck size={19} />
            <span>
              The committee works towards promoting women's
              welfare and a supportive campus environment.
            </span>
          </div>
        </div>
      </section>

      {/* CLOSING BANNER */}
      <section className="wec-quote">
        <div className="wec-quote-inner">
          <div className="wec-quote-icon">
            <Users size={75} strokeWidth={1.1} />
          </div>

          <div className="wec-quote-divider" />

          <div className="wec-quote-content">
            <p>
              “Empowered Women
              <br />
              Build Empowered Communities”
            </p>

            <span className="wec-quote-line" />
          </div>
        </div>
      </section>

      {/* PAGE STYLES */}
      <style>{`
      .wec-page {
  padding-top: 75px;

  --wec-maroon: #690d22;
          --wec-dark: #350b19;
          --wec-gold: #d6ad53;
          --wec-gold-light: #f3d47e;
          --wec-cream: #fcf8f2;
          --wec-text: #302027;

          width: 100%;
          overflow: hidden;
          background: var(--wec-cream);
          color: var(--wec-text);
          font-family: 'Montserrat', sans-serif;
        }

        .wec-page * {
          box-sizing: border-box;
        }

        .wec-container {
          width: min(1200px, 90%);
          margin: 0 auto;
        }

        /* HERO */

        .wec-hero {
          position: relative;
          min-height: 350px;
          display: flex;
          align-items: center;
          padding: 65px 7% 75px;
          isolation: isolate;
          color: #fff;
          background:
            url('/images/college-campus.jpg')
            center 42% / cover no-repeat;
        }

        .wec-hero-overlay {
          position: absolute;
          inset: 0;
          z-index: -1;
          background:
            linear-gradient(
              90deg,
              rgba(49, 5, 20, .97) 0%,
              rgba(87, 8, 29, .88) 48%,
              rgba(75, 8, 27, .56) 100%
            );
        }

        .wec-hero-content {
          position: relative;
          z-index: 2;
          max-width: 750px;
        }

        .wec-college-label {
          display: flex;
          align-items: center;
          gap: 12px;
          color: var(--wec-gold-light);
          font-size: 13px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 18px;
        }

        .wec-label-star {
          font-size: 18px;
        }

        .wec-label-line {
          width: 75px;
          height: 1px;
          background: var(--wec-gold);
        }

        .wec-hero h1 {
          margin: 0;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(38px, 5.2vw, 65px);
          font-weight: 700;
          line-height: 1.02;
          letter-spacing: -1px;
          color: #fff6e9;
        }

        .wec-hero-content > p {
          margin: 17px 0 20px;
          color: #f7e9e9;
          font-size: 17px;
          line-height: 1.7;
          font-weight: 400;
        }

        .wec-hero-tagline {
          display: inline-flex;
          align-items: center;
          gap: 15px;
          padding: 10px 25px;
          border-radius: 40px;
          background: linear-gradient(
            110deg,
            #e4b74f,
            #f6d77e
          );
          color: #4a1420;
          font-family: 'Playfair Display', Georgia, serif;
          font-weight: 700;
          font-size: 15px;
        }

        .wec-hero-tagline i {
          font-style: normal;
        }

        .wec-hero-symbol {
          position: absolute;
          right: 9%;
          top: 50%;
          transform: translateY(-50%);
          color: var(--wec-gold-light);
          opacity: .9;
        }

        .wec-hero-symbol svg {
          width: clamp(95px, 16vw, 175px);
          height: auto;
        }

        .wec-hero-bottom {
          position: absolute;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 22px;
          background: var(--wec-gold);
          clip-path: polygon(
            0 0, 12% 75%, 28% 100%, 52% 40%,
            75% 0, 91% 35%, 100% 0, 100% 100%, 0 100%
          );
        }

        /* ABOUT */

        .wec-about {
          display: grid;
          grid-template-columns: .85fr 1.15fr;
          align-items: center;
          gap: 55px;
          padding-top: 65px;
          padding-bottom: 50px;
        }

        .wec-about-image {
          position: relative;
          min-width: 0;
        }

        .wec-about-image img {
          position: relative;
          z-index: 1;
          display: block;
          width: 100%;
          height: 260px;
          object-fit: cover;
          border-radius: 17px;
          box-shadow: 0 12px 30px rgba(65, 20, 30, .14);
        }

        .wec-image-decoration {
          position: absolute;
          width: 75px;
          height: 75px;
          right: -12px;
          bottom: -12px;
          border-right: 4px solid var(--wec-gold);
          border-bottom: 4px solid var(--wec-gold);
          border-radius: 0 0 17px 0;
        }

        .wec-about-content {
          padding-left: 20px;
          border-left: 4px solid var(--wec-gold);
        }

        .wec-section-label {
          margin-bottom: 10px;
          color: var(--wec-maroon);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .wec-about-content h2 {
          margin: 0 0 16px;
          color: var(--wec-maroon);
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(26px, 3vw, 36px);
          line-height: 1.25;
        }

        .wec-about-content > p {
          margin: 0;
          font-size: 15px;
          line-height: 1.9;
          color: #51434a;
        }

        .wec-about-highlight {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-top: 22px;
        }

        .wec-highlight-icon {
          width: 43px;
          height: 43px;
          display: grid;
          place-items: center;
          flex-shrink: 0;
          color: var(--wec-maroon);
          background: #f2e5dc;
          border-radius: 50%;
        }

        .wec-about-highlight strong,
        .wec-about-highlight span:not(.wec-highlight-icon) {
          display: block;
        }

        .wec-about-highlight strong {
          color: var(--wec-maroon);
          font-size: 14px;
          margin-bottom: 4px;
        }

        .wec-about-highlight div span {
          color: #75646a;
          font-size: 12px;
        }

        /* SECTION HEADINGS */

        .wec-heading-center {
          text-align: center;
          margin-bottom: 35px;
        }

        .wec-heading-overline {
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 22px;
          color: var(--wec-maroon);
          font-size: 13px;
          font-weight: 800;
          letter-spacing: 4px;
          margin-bottom: 12px;
        }

        .wec-heading-overline span {
          width: 75px;
          height: 1px;
          background: var(--wec-gold);
        }

        .wec-heading-center h2 {
          margin: 0;
          color: var(--wec-maroon);
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(27px, 3vw, 36px);
        }

        .wec-heading-center > p {
          margin: 10px auto 0;
          color: #78686c;
          font-size: 13px;
          line-height: 1.7;
        }

        /* OBJECTIVES */

        .wec-objectives {
          padding-top: 20px;
          padding-bottom: 65px;
        }

        .wec-objective-grid {
          display: grid;
          grid-template-columns: repeat(4, 1fr);
          gap: 18px;
        }

        .wec-objective-card {
          position: relative;
          min-height: 190px;
          padding: 24px 15px 27px;
          text-align: center;
          background: linear-gradient(
            145deg,
            #f8eee3,
            #fffaf5
          );
          border: 1px solid #f0e1d1;
          border-radius: 14px;
          transition: transform .3s ease,
                      box-shadow .3s ease;
          overflow: hidden;
        }

        .wec-objective-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 15px 28px rgba(83, 19, 37, .12);
        }

        .wec-objective-icon {
          display: grid;
          place-items: center;
          width: 67px;
          height: 67px;
          margin: -35px auto 14px;
          color: #fff4dc;
          background: linear-gradient(
            145deg,
            #a31b3c,
            #630d27
          );
          border: 4px solid var(--wec-cream);
          border-radius: 50%;
          box-shadow: 0 5px 12px rgba(90, 13, 34, .15);
        }

        .wec-objective-card h3 {
          margin: 0 0 8px;
          color: var(--wec-dark);
          font-family: 'Playfair Display', Georgia, serif;
          font-size: 18px;
        }

        .wec-objective-card p {
          margin: 0;
          color: #51444a;
          font-size: 13px;
          line-height: 1.7;
        }

        .wec-card-bottom-line {
          position: absolute;
          bottom: 0;
          left: 25%;
          width: 50%;
          height: 3px;
          background: var(--wec-gold);
          transform: scaleX(0);
          transition: transform .3s ease;
        }

        .wec-objective-card:hover .wec-card-bottom-line {
          transform: scaleX(1);
        }

        /* COMMITTEE */

        .wec-committee {
          padding: 55px 0 65px;
          background: linear-gradient(
            180deg,
            #f8eee9,
            #fcf8f2
          );
        }

        .wec-table-wrapper {
          overflow-x: auto;
          background: #fff;
          border: 1px solid #e6cbb5;
          border-radius: 14px;
          box-shadow: 0 7px 22px rgba(70, 20, 32, .07);
        }

        .wec-table {
          width: 100%;
          min-width: 690px;
          border-collapse: collapse;
          text-align: left;
          font-size: 14px;
        }

        .wec-table thead {
          color: #fff;
          background: linear-gradient(
            100deg,
            #8d1733,
            #5b0b25
          );
        }

        .wec-table th {
          padding: 16px 18px;
          font-weight: 700;
          border-right: 1px solid rgba(255,255,255,.2);
        }

        .wec-table td {
          padding: 13px 18px;
          color: #34242b;
          border-right: 1px solid #eedbd0;
          border-bottom: 1px solid #eedbd0;
        }

        .wec-table th:last-child,
        .wec-table td:last-child {
          border-right: none;
        }

        .wec-table tbody tr:last-child td {
          border-bottom: none;
        }

        .wec-table tbody tr {
          transition: background .25s ease;
        }

        .wec-table tbody tr:nth-child(even) {
          background: #fbf2eb;
        }

        .wec-table tbody tr:hover {
          background: #f5e4d6;
        }

        .wec-serial {
          font-weight: 700;
          color: var(--wec-maroon) !important;
        }

        .wec-member-name {
          font-weight: 600;
        }

        .wec-position {
          display: inline-block;
          min-width: 95px;
          padding: 6px 14px;
          text-align: center;
          border-radius: 25px;
          color: #6e2333;
          background: #f4dddd;
          font-size: 12px;
          font-weight: 700;
        }

        .wec-chair {
          color: #48240b;
          background: linear-gradient(
            100deg,
            #e5b449,
            #f2d17c
          );
        }

        .wec-member-note {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-top: 23px;
          color: #795a4d;
          font-size: 12px;
          line-height: 1.6;
          text-align: center;
        }

        .wec-member-note svg {
          flex-shrink: 0;
          color: #9b6e2b;
        }

        /* QUOTE BANNER */

        .wec-quote {
          position: relative;
          padding: 35px 7%;
          color: #fff;
          background:
            linear-gradient(
              100deg,
              rgba(65, 5, 22, .97),
              rgba(111, 10, 38, .94)
            ),
            url('/images/college-campus.jpg')
            center / cover;
          border-bottom: 8px solid var(--wec-gold);
        }

        .wec-quote-inner {
          width: min(900px, 100%);
          margin: 0 auto;
          display: flex;
          justify-content: center;
          align-items: center;
          gap: 30px;
        }

        .wec-quote-icon {
          color: var(--wec-gold-light);
          flex-shrink: 0;
        }

        .wec-quote-divider {
          width: 2px;
          height: 95px;
          background: var(--wec-gold);
        }

        .wec-quote-content p {
          margin: 0;
          color: #fff5e8;
          font-family: 'Playfair Display', Georgia, serif;
          font-size: clamp(24px, 3.2vw, 38px);
          font-style: italic;
          line-height: 1.35;
        }

        .wec-quote-line {
          display: block;
          width: 150px;
          height: 3px;
          margin-top: 15px;
          background: var(--wec-gold);
          transform: skewX(-45deg);
        }

        /* TABLET */

        @media (max-width: 900px) {
          .wec-hero {
            min-height: 330px;
          }

          .wec-hero-symbol {
            right: 5%;
          }

          .wec-about {
            gap: 30px;
          }

          .wec-objective-grid {
            grid-template-columns: repeat(2, 1fr);
            row-gap: 42px;
          }

          .wec-objective-card {
            min-height: 175px;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .wec-container {
            width: 90%;
          }

          .wec-hero {
            min-height: 315px;
            padding: 60px 6% 65px;
            background-position: center;
          }

          .wec-hero-overlay {
            background: linear-gradient(
              90deg,
              rgba(49, 5, 20, .96),
              rgba(87, 8, 29, .84)
            );
          }

          .wec-college-label {
            gap: 7px;
            font-size: 9px;
            letter-spacing: 1.5px;
          }

          .wec-label-line {
            width: 28px;
          }

          .wec-hero h1 {
            font-size: clamp(34px, 9vw, 47px);
            line-height: 1.08;
          }

          .wec-hero-content > p {
            max-width: 310px;
            font-size: 13px;
            line-height: 1.7;
          }

          .wec-desktop-break {
            display: none;
          }

          .wec-hero-tagline {
            gap: 9px;
            padding: 9px 15px;
            font-size: 12px;
          }

          .wec-hero-symbol {
            display: none;
          }

          .wec-about {
            grid-template-columns: 1fr;
            gap: 28px;
            padding-top: 42px;
            padding-bottom: 40px;
          }

          .wec-about-image img {
            height: 230px;
          }

          .wec-about-content {
            padding-left: 15px;
          }

          .wec-about-content h2 {
            font-size: 27px;
          }

          .wec-about-content > p {
            font-size: 13px;
          }

          .wec-heading-center {
            margin-bottom: 28px;
          }

          .wec-heading-overline {
            gap: 10px;
            font-size: 10px;
            letter-spacing: 2px;
          }

          .wec-heading-overline span {
            width: 35px;
          }

          .wec-heading-center h2 {
            font-size: 27px;
          }

          .wec-heading-center > p {
            font-size: 12px;
          }

          .wec-objectives {
            padding-top: 15px;
            padding-bottom: 45px;
          }

          .wec-objective-grid {
            grid-template-columns: 1fr 1fr;
            gap: 35px 12px;
          }

          .wec-objective-card {
            min-height: 190px;
            padding: 22px 10px;
          }

          .wec-objective-icon {
            width: 59px;
            height: 59px;
            margin-top: -33px;
          }

          .wec-objective-icon svg {
            width: 27px;
          }

          .wec-objective-card h3 {
            font-size: 15px;
          }

          .wec-objective-card p {
            font-size: 11px;
            line-height: 1.65;
          }

          .wec-committee {
            padding: 42px 0;
          }

          .wec-table {
            min-width: 680px;
            font-size: 12px;
          }

          .wec-table th,
          .wec-table td {
            padding: 12px 13px;
          }

          .wec-member-note {
            font-size: 11px;
            align-items: flex-start;
          }

          .wec-quote {
            padding: 30px 6%;
          }

          .wec-quote-inner {
            gap: 17px;
          }

          .wec-quote-icon svg {
            width: 45px;
          }

          .wec-quote-divider {
            height: 75px;
          }

          .wec-quote-content p {
            font-size: clamp(18px, 5vw, 25px);
          }

          .wec-quote-line {
            width: 90px;
          }
        }

        @media (max-width: 360px) {
          .wec-objective-grid {
            grid-template-columns: 1fr;
            row-gap: 35px;
          }

          .wec-objective-card {
            min-height: 155px;
          }

          .wec-hero h1 {
            font-size: 32px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .wec-page *,
          .wec-page *::before,
          .wec-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            transition-duration: .01ms !important;
          }
        }
          /* =========================================
   SCROLL REVEAL ANIMATIONS
========================================= */

.wec-page .wec-reveal-left,
.wec-page .wec-reveal-right,
.wec-page .wec-reveal-up {
  opacity: 0;
  will-change: opacity, transform;
  transition:
    opacity .8s ease,
    transform .8s cubic-bezier(.2,.7,.2,1);
  transition-delay: var(--wec-reveal-delay, 0ms);
}

.wec-page .wec-reveal-left {
  transform: translateX(-65px);
}

.wec-page .wec-reveal-right {
  transform: translateX(65px);
}

.wec-page .wec-reveal-up {
  transform: translateY(38px);
}

.wec-page .wec-reveal-visible {
  opacity: 1;
  transform: translate3d(0,0,0);
}

/* =========================================
   ABOUT IMAGE HOVER
========================================= */

.wec-page .wec-about-image img {
  transition: transform .55s ease, box-shadow .4s ease;
}

.wec-page .wec-about-image:hover img {
  transform: scale(1.035);
  box-shadow: 0 20px 38px rgba(65, 20, 30, .2);
}

/* =========================================
   ABOUT HIGHLIGHT HOVER
========================================= */

.wec-page .wec-about-highlight {
  transition: transform .3s ease;
}

.wec-page .wec-about-highlight:hover {
  transform: translateX(7px);
}

/* =========================================
   OBJECTIVE CARDS HOVER
========================================= */

.wec-page .wec-objective-card {
  cursor: default;
  transition:
    transform .35s cubic-bezier(.2,.7,.2,1),
    box-shadow .35s ease,
    border-color .35s ease;
}

.wec-page .wec-objective-card:hover {
  transform: translateY(-9px) scale(1.015);
  border-color: rgba(214,173,83,.75);
  box-shadow: 0 18px 34px rgba(83, 19, 37, .15);
}

.wec-page .wec-objective-icon {
  transition: transform .35s ease, box-shadow .35s ease;
}

.wec-page .wec-objective-card:hover .wec-objective-icon {
  transform: rotate(-8deg) scale(1.08);
  box-shadow: 0 9px 20px rgba(90, 13, 34, .22);
}

/* =========================================
   COMMITTEE TABLE HOVER
========================================= */

.wec-page .wec-table tbody tr {
  transition: background .25s ease, transform .25s ease;
}

.wec-page .wec-table tbody tr:hover {
  transform: translateX(4px);
}

.wec-page .wec-position {
  transition: transform .25s ease, box-shadow .25s ease;
}

.wec-page .wec-table tbody tr:hover .wec-position {
  transform: scale(1.06);
  box-shadow: 0 4px 12px rgba(83, 19, 37, .12);
}

/* =========================================
   CLOSING BANNER HOVER
========================================= */

.wec-page .wec-quote-icon {
  transition: transform .45s ease;
}

.wec-page .wec-quote-inner:hover .wec-quote-icon {
  transform: translateY(-5px) rotate(-5deg);
}

/* =========================================
   MOBILE ANIMATION
========================================= */

@media (max-width: 600px) {
  .wec-page .wec-reveal-left {
    transform: translateX(-28px);
  }

  .wec-page .wec-reveal-right {
    transform: translateX(28px);
  }

  .wec-page .wec-reveal-up {
    transform: translateY(24px);
  }
}

/* ACCESSIBILITY */

@media (prefers-reduced-motion: reduce) {
  .wec-page .wec-reveal-left,
  .wec-page .wec-reveal-right,
  .wec-page .wec-reveal-up {
    opacity: 1;
    transform: none;
    transition: none;
  }
}
      `}</style>
    </main>
  );
}
