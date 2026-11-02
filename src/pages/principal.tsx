
import React, { useEffect } from "react";

const principal = {
  name: "Mr. D. Madhan",
  role: "Principal",
  college: "ST. Lourdes Engineering College",
  image: "/managementand faculty/Dr D. Mythili.png",
};

const academicDetails = [
  {
    icon: "🎓",
    title: "Qualifications",
    items: [
      "Relevant Undergraduate Degree",
      "Postgraduate Qualification",
      "Doctoral / Research Qualification",
    ],
  },
  {
    icon: "▣",
    title: "Professional Experience",
    items: [
      "Academic Leadership",
      "Engineering Education",
      "Research and Innovation",
    ],
  },
  {
    icon: "▤",
    title: "Areas of Interest",
    items: [
      "Engineering Education",
      "Research and Innovation",
      "Student Development",
      "Industry Collaboration",
    ],
  },
];

const focusDetails = [
  {
    icon: "◎",
    title: "Vision",
    description:
      "To be a centre of excellence in engineering education, research, innovation and community engagement.",
  },
  {
    icon: "◉",
    title: "Mission",
    description:
      "To develop competent, innovative and ethical engineers through quality education, practical learning, research and industry exposure.",
  },
  {
    icon: "♟",
    title: "Commitment",
    description:
      "Empowering students to solve real-world challenges through engineering, technology and responsible innovation.",
  },
];

export default function Principal() {
  useEffect(() => {
    const elements = document.querySelectorAll<HTMLElement>(
      ".principal-page .principal-reveal"
    );

    if (typeof IntersectionObserver === "undefined") {
      elements.forEach((element) =>
        element.classList.add("is-visible")
      );
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("is-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -45px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <main className="principal-page">
      <style>{`
        .principal-page {
          --maroon: #641426;
          --maroon-dark: #2b0710;
          --maroon-light: #7b2036;
          --gold: #d4af5a;
          --gold-light: #ffe8a3;
          --cream: #fbf7f2;
          --text: #2b1820;

          width: 100%;
          overflow: hidden;
          color: var(--text);
          background: var(--cream);
          font-family: Arial, Helvetica, sans-serif;
        }

        .principal-page *,
        .principal-page *::before,
        .principal-page *::after {
          box-sizing: border-box;
        }

        /* HERO SECTION */

        .principal-hero {
          position: relative;
          isolation: isolate;
          display: grid;
          grid-template-columns: 300px minmax(0, 1fr);
          align-items: center;
          gap: 45px;
          min-height: 440px;
          padding: 45px 7%;
          color: #fff;
          background:
            radial-gradient(
              ellipse at 80% 30%,
              rgba(123, 32, 54, 0.35),
              transparent 50%
            ),
            linear-gradient(
              110deg,
              var(--maroon-dark),
              var(--maroon) 65%,
              #4a0d1c
            );
        }

        .principal-hero::before {
          content: "";
          position: absolute;
          z-index: -1;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            90deg,
            rgba(43, 7, 16, 0.12),
            transparent 70%
          );
        }

        /* PRINCIPAL PHOTO */

        .principal-photo-frame {
          width: 100%;
          max-width: 290px;
          justify-self: center;
          overflow: hidden;
          border: 2px solid var(--gold);
          border-radius: 16px;
          background: var(--cream);
          box-shadow: 0 0 16px rgba(212, 175, 90, 0.17);
          transition:
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        .principal-photo-frame:hover {
          border-color: var(--gold-light);
          box-shadow:
            0 0 12px rgba(255, 232, 163, 0.55),
            0 0 25px rgba(212, 175, 90, 0.18);
        }

        .principal-photo {
          display: block;
          width: 100%;
          height: 285px;
          object-fit: cover;
          object-position: center top;
        }

        .principal-photo-caption {
          padding: 13px 10px 15px;
          text-align: center;
          color: var(--maroon-dark);
          background: linear-gradient(
            115deg,
            #c59a3c,
            #ffe5a0,
            #b68a36
          );
        }

        .principal-photo-caption h2 {
          margin: 0 0 4px;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          line-height: 1.3;
          font-weight: 700;
        }

        .principal-photo-caption p {
          margin: 0;
          font-size: 13px;
          line-height: 1.5;
        }

        /* PRINCIPAL INTRODUCTION */

        .principal-intro {
          min-width: 0;
          padding: 8px 0 8px 38px;
          border-left: 2px solid var(--gold);
        }

        .principal-eyebrow {
          margin: 0 0 18px;
          color: var(--gold-light);
          font-size: 12px;
          letter-spacing: 0.3em;
          text-transform: uppercase;
        }

        .principal-title {
          margin: 0;
          color: #fff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(36px, 4vw, 54px);
          line-height: 1.12;
          font-weight: 700;
        }

        .principal-title span {
          color: var(--gold-light);
        }

        .principal-qualifications {
          margin: 12px 0;
          color: #ffffff;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 16px;
          line-height: 1.7;
          font-weight: 400;
        }

        .principal-role {
          margin: 8px 0 4px;
          color: var(--gold-light);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 23px;
          font-weight: 600;
        }

        .principal-college {
          margin: 0;
          color: #f0e5e5;
          font-size: 16px;
          line-height: 1.7;
        }

        .principal-quote {
          position: relative;
          max-width: 570px;
          margin: 27px 0 0;
          padding: 0 0 0 19px;
          border-left: 2px solid var(--gold);
          color: #f2ead7;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 17px;
          font-style: italic;
          line-height: 1.65;
        }

        /* MAIN CONTENT */

        .principal-content {
          padding: 48px 6% 55px;
          background:
            radial-gradient(
              ellipse at top right,
              rgba(212, 175, 90, 0.08),
              transparent 55%
            ),
            var(--cream);
        }

        .principal-section {
          max-width: 1350px;
          margin: 0 auto 45px;
        }

        .principal-section:last-child {
          margin-bottom: 0;
        }

        .principal-section-heading {
          margin: 0;
          color: var(--maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(23px, 2.6vw, 30px);
          line-height: 1.35;
          font-weight: 700;
        }

        .principal-heading-underline {
          width: 70px;
          height: 3px;
          margin: 11px 0 20px;
          background: linear-gradient(
            90deg,
            var(--gold),
            #f4df9f
          );
        }

        .principal-message p {
          margin: 0 0 17px;
          color: #382b2f;
          font-size: 16px;
          line-height: 1.9;
        }

        /* INFORMATION CARDS */

        .principal-card-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 20px;
        }

        .principal-info-card {
          min-width: 0;
          padding: 25px 21px;
          border: 1px solid rgba(212, 175, 90, 0.8);
          border-radius: 12px;
          background: linear-gradient(
            145deg,
            #fffdf8,
            #f8f0e3
          );
          box-shadow: 0 5px 18px rgba(43, 7, 16, 0.04);
          transition:
            transform 0.4s ease,
            box-shadow 0.4s ease,
            border-color 0.4s ease;
        }

        .principal-info-card:hover {
          transform: translateY(-6px);
          border-color: var(--gold);
          box-shadow: 0 12px 28px rgba(92, 28, 43, 0.12);
        }

        .principal-card-heading {
          display: flex;
          align-items: center;
          gap: 13px;
          margin-bottom: 17px;
        }

        .principal-card-icon {
          display: flex;
          flex: 0 0 54px;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--maroon);
          background: linear-gradient(
            145deg,
            #fff0be,
            #d4af5a
          );
          font-size: 25px;
          font-weight: 700;
        }

        .principal-card-heading h3 {
          margin: 0;
          color: var(--maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.4;
        }

        .principal-card-rule {
          width: 38px;
          height: 2px;
          margin-top: 8px;
          background: var(--gold);
        }

        .principal-info-card ul {
          margin: 0;
          padding-left: 24px;
        }

        .principal-info-card li {
          margin: 7px 0;
          padding-left: 1px;
          color: #382b2f;
          font-size: 14px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .principal-info-card li::marker {
          color: #a47b2e;
        }

        .principal-focus-card p {
          margin: 0;
          padding-left: 67px;
          color: #382b2f;
          font-size: 14px;
          line-height: 1.85;
        }

        /* SCROLL ANIMATIONS */

        .principal-reveal {
          opacity: 0;
          transform: translate3d(0, 35px, 0);
          transition:
            opacity 950ms ease,
            transform 1100ms cubic-bezier(0.22, 1, 0.36, 1);
          will-change: opacity, transform;
        }

        /* Move from left to right */

        .principal-reveal.from-left {
          transform: translate3d(-65px, 20px, 0);
        }

        /* Move from right to left */

        .principal-reveal.from-right {
          transform: translate3d(65px, 20px, 0);
        }

        /* Slowly rise from below */

        .principal-reveal.rise-up {
          transform: translate3d(0, 42px, 0);
        }

        .principal-reveal.is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        .principal-reveal.delay-1 {
          transition-delay: 100ms;
        }

        .principal-reveal.delay-2 {
          transition-delay: 220ms;
        }

        .principal-reveal.delay-3 {
          transition-delay: 340ms;
        }

        /* LARGE SCREENS */

        @media (min-width: 1500px) {
          .principal-hero {
            padding-right: max(7%, calc((100% - 1250px) / 2));
            padding-left: max(7%, calc((100% - 1250px) / 2));
          }
        }

        /* TABLET */

        @media (max-width: 900px) {
          .principal-hero {
            grid-template-columns: 250px minmax(0, 1fr);
            gap: 28px;
            padding: 38px 5%;
          }

          .principal-photo-frame {
            max-width: 245px;
          }

          .principal-photo {
            height: 245px;
          }

          .principal-intro {
            padding-left: 25px;
          }

          .principal-title {
            font-size: 39px;
          }

          .principal-quote {
            font-size: 15px;
          }

          .principal-card-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .principal-hero {
            grid-template-columns: 1fr;
            gap: 25px;
            padding: 32px 20px;
          }

          .principal-photo-frame {
            width: 220px;
            max-width: 100%;
          }

          .principal-photo {
            height: 220px;
          }

          .principal-photo-caption h2 {
            font-size: 21px;
          }

          .principal-intro {
            padding: 0 0 0 18px;
          }

          .principal-eyebrow {
            font-size: 10px;
            letter-spacing: 0.23em;
          }

          .principal-title {
            font-size: 34px;
          }

          .principal-qualifications {
            font-size: 14px;
          }

          .principal-role {
            font-size: 21px;
          }

          .principal-college {
            font-size: 14px;
          }

          .principal-quote {
            margin-top: 20px;
            font-size: 15px;
          }

          .principal-content {
            padding: 32px 18px 38px;
          }

          .principal-section {
            margin-bottom: 35px;
          }

          .principal-section-heading {
            font-size: 24px;
          }

          .principal-message p {
            font-size: 14px;
            line-height: 1.85;
          }

          .principal-card-grid {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .principal-info-card {
            padding: 20px 17px;
          }

          .principal-card-heading h3 {
            font-size: 18px;
          }

          .principal-focus-card p {
            padding-left: 0;
          }

          .principal-reveal.from-left {
            transform: translate3d(-28px, 20px, 0);
          }

          .principal-reveal.from-right {
            transform: translate3d(28px, 20px, 0);
          }

          .principal-reveal.rise-up {
            transform: translate3d(0, 28px, 0);
          }

          .principal-reveal.is-visible {
            transform: translate3d(0, 0, 0);
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .principal-reveal,
          .principal-photo-frame,
          .principal-info-card {
            transition: none !important;
            opacity: 1 !important;
            transform: none !important;
            will-change: auto;
          }

          .principal-info-card:hover {
            transform: none;
          }
        }
          /* Keep the Principal hero below the fixed header */
.principal-page-content {
  margin-top: 90px;
  position: relative;
  z-index: 1;
}

/* Responsive spacing */
@media (max-width: 768px) {
  .principal-page-content {
    margin-top: 75px;
  }
}
      `}</style>

      {/* PRINCIPAL HERO */}

<section className="principal-hero principal-page-content" data-header-theme="dark">
          <div className="principal-photo-frame principal-reveal from-left">
          <img
            className="principal-photo"
            src={principal.image}
            alt={principal.name}
          />

          <div className="principal-photo-caption">
            <h2>{principal.name}</h2>
            <p>{principal.role}</p>
            <p>{principal.college}</p>
          </div>
        </div>

        <div className="principal-intro principal-reveal from-right">
          <p className="principal-eyebrow">
            OUR PRINCIPAL
          </p>

          <h1 className="principal-title">
            Mr. D. <span>Madhan</span>
          </h1>

          <p className="principal-qualifications">
            Academic Leadership · Research · Innovation
          </p>

          <p className="principal-role">
            {principal.role}
          </p>

          <p className="principal-college">
            {principal.college}
          </p>

          <blockquote className="principal-quote">
            “Education is not just about knowledge, but about
            shaping responsible professionals who make a
            meaningful difference in society.”
          </blockquote>
        </div>
      </section>

      {/* PRINCIPAL MESSAGE */}

      <div className="principal-content">
        <section className="principal-section principal-message principal-reveal rise-up">
          <h2 className="principal-section-heading">
            A Message from the Principal
          </h2>

          <div className="principal-heading-underline" />

          <p>
            At ST. Lourdes Engineering College, we are committed
            to nurturing skilled, innovative and ethical engineers
            who can contribute meaningfully to society and the
            rapidly evolving world of technology.
          </p>

          <p>
            Our focus is on academic excellence, practical
            learning, research and the holistic development of
            our students. We aim to create an environment where
            learning goes beyond the classroom, shaping
            confident professionals who are ready to meet
            industry and societal challenges.
          </p>
        </section>

        {/* ACADEMIC PROFILE */}

        <section className="principal-section principal-reveal from-left">
          <h2 className="principal-section-heading">
            Academic Profile &amp; Expertise
          </h2>

          <div className="principal-heading-underline" />

          <div className="principal-card-grid">
            {academicDetails.map((card, index) => (
              <article
                className={`principal-info-card principal-reveal rise-up delay-${(index % 3) + 1}`}
                key={card.title}
              >
                <div className="principal-card-heading">
                  <div
                    className="principal-card-icon"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>

                  <div>
                    <h3>{card.title}</h3>
                    <div className="principal-card-rule" />
                  </div>
                </div>

                <ul>
                  {card.items.map((item) => (
                    <li key={item}>{item}</li>
                  ))}
                </ul>
              </article>
            ))}
          </div>
        </section>

        {/* VISION, MISSION AND COMMITMENT */}

        <section className="principal-section principal-reveal from-right">
          <h2 className="principal-section-heading">
            Our Focus
          </h2>

          <div className="principal-heading-underline" />

          <div className="principal-card-grid">
            {focusDetails.map((card, index) => (
              <article
                className={`principal-info-card principal-focus-card principal-reveal rise-up delay-${(index % 3) + 1}`}
                key={card.title}
              >
                <div className="principal-card-heading">
                  <div
                    className="principal-card-icon"
                    aria-hidden="true"
                  >
                    {card.icon}
                  </div>

                  <div>
                    <h3>{card.title}</h3>
                    <div className="principal-card-rule" />
                  </div>
                </div>

                <p>{card.description}</p>
              </article>
            ))}
          </div>
        </section>
      </div>
    </main>
  );
}
