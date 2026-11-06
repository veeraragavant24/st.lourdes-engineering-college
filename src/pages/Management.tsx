import { useEffect, useState } from "react";

type ManagementMember = {
  name: string;
  role: string;
  image: string;
  qualification?: string[];
  experience: string;
  vision: string;
  bio: string;
  focus: string[];
};

const managementTeam: ManagementMember[] = [
  {
    name: "Dr.Ln.S.Peter",
    role: "Chancellor",
    image: "/management/image2.png",
    qualification: [""],
    experience: "Institutional Leadership",
    vision:
      "A pioneer in education and institutional development in Tamil Nadu",
    bio:
      "Dr. Ln. S. Peter is one of the early pioneers in the field of education in Tamil Nadu. He began his journey in his hometown of Thirumaiyam, Pudukkottai District.His journey in education began in 1995 with the establishment of the Engineering College under the Soosaiya Peter Educational Trust. Since then, he has established several educational institutions across Medicine, Dentistry, Physiotherapy, Nursing, Management, Arts and Sciences, along with CBSE and Matriculation schools across Chennai.",
    focus: [
      "Educational Institution Development",
      "Multidisciplinary Education",
      "Educational Leadership",
      "Expansion of Educational Institutions",
    ],
  },
  {
    name: "Ms. Mercy Florence Peter,",
    role: "Vice Chancellor",
    image: "/management/image3.png",
    qualification:[
      "Bachelor’s Degree in Electronics and Communication Engineering",
      "Master of Science (M.S.) in Management Information Systems",
      " New Jersey Institute of Technology, USA",
    ],
    experience: "Academic Administration & Strategic Management",
    vision:
      "Empowering students to become skilled, compassionate and future-ready healthcare professionals.",
    bio:
      "An accomplished professional with expertise combining technology, innovation and strategic management, bringing a global perspective to academic administration.",
    focus: [
      "Academic Excellence",
      "Technology and Innovation",
      "Strategic Academic Management",
      "Quality Education",
      "Student Empowerment and Holistic Development",
    ],
  },
  
{
  name: "Mr. Ajay Ravindra Kumar",
  role: "Managing Director",
  image: "/management/image 1.png",

  experience: "Corporate Experience – Tesla, Inc., California, USA",

  vision:
    "Bringing global corporate experience, engineering innovation and multidisciplinary expertise to institutional development.",

  bio:
    "Mr. Ajay Ravindra Kumar was one of the early employees of Tesla, Inc., in California, USA, and worked with the company during its startup days. He brings corporate experience from Tesla, where he worked with the Engineering Team in the development of the Roadster, Model S and Model X vehicle programmes.",

qualification: [
  "Undergraduate Degree in Electronics and Communication Engineering",
  "Master of Science (MS) in Information Technology Management – University of Texas at Dallas, USA",
  "Bachelor of Laws (LLB) – The Tamil Nadu Dr. Ambedkar Law University",
],

  focus: [
    "Engineering Innovation",
    "Automotive Technology",
    "Information Technology Management",
    "Corporate Leadership",
    "Legal and Multidisciplinary Knowledge",
  ],
},

];

export default function Management() {
  const [selected, setSelected] =
    useState<ManagementMember | null>(null);

  useEffect(() => {
    if (!selected) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") {
        setSelected(null);
      }
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selected]);

  return (
    <main className="lourdes-management">
      <style>{`
        .lourdes-management {
          --maroon: #641426;
          --dark-maroon: #2b0710;
          --gold: #d4af5a;
          --light-gold: #ffe8a3;
          --cream: #fbf7f2;

          min-height: 100vh;
          padding: 65px 5% 85px;
          color: var(--maroon);
          background:
            radial-gradient(
              ellipse at top,
              #ffffff 0%,
              transparent 65%
            ),
            var(--cream);
          font-family: Arial, sans-serif;
        }

        .lourdes-management *,
        .lourdes-management *::before,
        .lourdes-management *::after {
          box-sizing: border-box;
        }

        .lm-heading {
          max-width: 850px;
          margin: 0 auto 50px;
          text-align: center;
        }

        .lm-eyebrow {
          color: #94702e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .lm-heading h1 {
          margin: 14px 0;
          color: var(--maroon);
          font-family: Georgia, serif;
          font-size: clamp(38px, 5vw, 62px);
          font-weight: 500;
        }

        .lm-heading p {
          color: #6d5a58;
          font-size: 12px;
          line-height: 2;
          letter-spacing: 2px;
        }

        .lm-divider {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 15px;
          margin-top: 22px;
          color: var(--gold);
          font-size: 24px;
        }

        .lm-divider span {
          width: 65px;
          height: 1px;
          background: linear-gradient(
            90deg,
            transparent,
            var(--gold)
          );
        }

        .lm-divider span:last-child {
          transform: rotate(180deg);
        }

        .lm-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 28px;
          max-width: 1200px;
          margin: 0 auto;
        }

        .lm-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid var(--gold);
          border-radius: 18px;
          color: white;
          background: linear-gradient(
            145deg,
            #751a30,
            var(--dark-maroon)
          );
          box-shadow: 0 12px 35px #42101a18;
          animation: lm-enter 0.7s ease both;
          transition:
            transform 0.3s ease,
            box-shadow 0.3s ease;
        }

        .lm-card:hover {
          transform: translateY(-7px);
          box-shadow:
            0 15px 35px #64142625,
            0 0 20px #d4af5a35;
        }

        /* 3D FLIP CONTAINER */

        .lm-flip-container {
          position: relative;
          height: 370px;
          perspective: 1200px;
          -webkit-perspective: 1200px;
          background: linear-gradient(
            145deg,
            #751a30,
            #2b0710
          );
        }

        .lm-flip-inner {
          position: relative;
          width: 100%;
          height: 100%;
          transform-style: preserve-3d;
          -webkit-transform-style: preserve-3d;
          transition:
            transform 800ms cubic-bezier(0.2, 0.75, 0.25, 1);
        }

        /* Flip the upper profile section on hover or keyboard focus */

        .lm-flip-container:hover .lm-flip-inner,
        .lm-flip-container:focus-within .lm-flip-inner {
          transform: rotateY(180deg);
        }

        /* FRONT AND BACK SIDES */

        .lm-flip-front,
        .lm-flip-back {
          position: absolute;
          inset: 0;
          width: 100%;
          height: 100%;
          overflow: hidden;
          border-radius: 17px 17px 0 0;
          backface-visibility: hidden;
          -webkit-backface-visibility: hidden;
        }

        .lm-flip-front {
          transform: rotateY(0deg);
        }

        /* BACK SIDE: FULL PORTRAIT IMAGE */

        .lm-flip-back {
          transform: rotateY(180deg);
          padding: 0;
          background: #2b0710;
        }

        .lm-flip-back img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          border-radius: 17px 17px 0 0;
        }

        .lm-flip-back::after {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;
          background: linear-gradient(
            to top,
            rgba(43, 7, 16, 0.35),
            transparent 35%
          );
        }

        /* FRONT PROFILE CONTENT */

        .lm-card-top {
          min-height: 370px;
          padding: 28px 18px;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
          background:
            radial-gradient(
              circle at top,
              #d4af5a22,
              transparent 60%
            ),
            linear-gradient(
              145deg,
              #751a30,
              #2b0710
            );
        }

        .lm-photo-ring {
          position: relative;
          width: 175px;
          height: 175px;
          padding: 5px;
          margin-bottom: 20px;
          border: 2px solid var(--gold);
          border-radius: 50%;
          background: linear-gradient(
            135deg,
            #fff0b0,
            #b68a36,
            #ffe8a3
          );
          box-shadow: 0 0 24px #d4af5a35;
        }

        .lm-photo-ring::before {
          content: "";
          position: absolute;
          inset: -6px;
          border: 2px dashed var(--gold);
          border-radius: 50%;
          animation: lm-rotate 12s linear infinite;
          pointer-events: none;
        }

        .lm-photo-ring img {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          border: 3px solid var(--dark-maroon);
          border-radius: 50%;
          background: var(--cream);
        }

        .lm-card h2 {
          margin: 5px 0 10px;
          color: var(--light-gold);
          font-family: Georgia, serif;
          font-size: 23px;
          overflow-wrap: anywhere;
        }

        .lm-role {
          margin: 0 0 12px;
          color: #fff1ce;
          font-size: 14px;
          font-weight: 700;
          letter-spacing: 1px;
        }

        .lm-experience {
          margin: 0;
          color: #eadbdc;
          font-size: 12px;
          line-height: 1.8;
        }

        /* FIXED FOOTER: DOES NOT FLIP */

        .lm-card-footer {
          position: relative;
          z-index: 2;
          flex-shrink: 0;
          display: flex;
          justify-content: center;
          padding: 20px;
          border-top: 1px solid #d4af5a70;
          background: linear-gradient(
            145deg,
            #751a30,
            #2b0710
          );
        }

        .lm-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          padding: 12px 27px;
          border: 1px solid var(--gold);
          border-radius: 30px;
          color: #3b0a14;
          background: linear-gradient(
            110deg,
            #c59a3c,
            #ffe8a3,
            #c5a34d
          );
          font-size: 13px;
          font-weight: 800;
          cursor: pointer;
          transition:
            transform 0.25s,
            box-shadow 0.25s;
        }

        .lm-button:hover {
          transform: translateY(-2px);
          box-shadow: 0 0 18px #d4af5a60;
        }

        .lm-button:focus-visible,
        .lm-close:focus-visible {
          outline: 2px solid var(--light-gold);
          outline-offset: 4px;
        }

        /* PROFILE MODAL */

        .lm-backdrop {
          position: fixed;
          inset: 0;
          z-index: 9999;
          display: grid;
          place-items: center;
          padding: 20px;
          background: #1b050de8;
          backdrop-filter: blur(10px);
          -webkit-backdrop-filter: blur(10px);
        }

      

/* ===== MANAGEMENT POPUP — COMPACT DESIGN ===== */
.lm-modal {
  position: relative;
  display: grid;
  grid-template-columns: 360px minmax(0, 1fr);
  align-items: start;
  gap: 26px;

  width: 92vw;
  max-width: 980px;
  max-height: 85vh;
  min-height: 0;

  overflow-y: auto;
  padding: 25px;

  border: 1.5px solid var(--gold);
  border-radius: 20px;
  color: white;

  background: linear-gradient(
    135deg,
    #681629,
    #2b0710
  );

  box-shadow: 0 0 35px #d4af5a35;
  animation: lm-enter 0.3s ease both;
}

/* Profile image on the left */
.lm-modal-photo {
  width: 100%;
  height: 480px;
  overflow: hidden;

  border: 1.5px solid var(--gold);
  border-radius: 12px;
  background: var(--dark-maroon);
}

.lm-modal-photo img {
  display: block;
  width: 100%;
  height: 100%;
  object-fit: cover;
  object-position: center top;
}

/* Profile details on the right */
.lm-modal-content {
  min-width: 0;
  padding: 8px 15px 8px 0;
}

.lm-modal-label {
  color: var(--gold);
  font-size: 10px;
  font-weight: 800;
  letter-spacing: 2.5px;
}

.lm-modal-content h2 {
  margin: 12px 0 8px;
  color: var(--light-gold);
  font-family: Georgia, serif;
  font-size: 30px;
  line-height: 1.3;
  overflow-wrap: anywhere;
}

.lm-modal-content h3 {
  margin: 0 0 8px;
  color: #fff3d9;
  font-size: 15px;
}

/* Close button */
.lm-close {
  position: absolute;
  top: 12px;
  right: 12px;
  z-index: 5;

  display: grid;
  place-items: center;

  width: 36px;
  height: 36px;

  border: 1px solid var(--gold);
  border-radius: 50%;
  color: var(--light-gold);
  background: var(--dark-maroon);

  font-size: 24px;
  cursor: pointer;
}

.lm-close:hover {
  color: var(--dark-maroon);
  background: var(--light-gold);
}

/* Tablet and mobile */
@media (max-width: 768px) {
  .lm-modal {
    grid-template-columns: minmax(0, 1fr);
    gap: 18px;

    width: 92vw;
    max-width: 520px;
    max-height: 88vh;

    padding: 22px;
  }

  .lm-modal-photo {
    width: 100%;
    max-width: 300px;
    height: 300px;
    margin: 0 auto;
  }

  .lm-modal-content {
    padding: 0;
  }

  .lm-modal-content h2 {
    padding-right: 25px;
    font-size: 27px;
  }
}


        .lm-vision {
          color: #ffe8b5;
          font-size: 13px;
          font-style: italic;
          line-height: 1.8;
        }

        .lm-bio {
          color: #f0e5e5;
          font-size: 13px;
          line-height: 1.9;
        }

        .lm-modal-content h4 {
          margin: 22px 0 8px;
          color: var(--light-gold);
          font-size: 14px;
        }

    .lm-modal-content p,
.lm-modal-content li {
  overflow-wrap: anywhere;
}

.lm-modal-content ul {
  padding-left: 20px;
  color: #f0e5e5;
  font-size: 11px;
  line-height: 1.7;
}

        .lm-modal-content li::marker {
          color: var(--gold);
        }

        /* ANIMATIONS */

        @keyframes lm-rotate {
          to {
            transform: rotate(360deg);
          }
        }

        @keyframes lm-enter {
          from {
            opacity: 0;
            transform: translateY(20px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* TABLET */

        @media (max-width: 950px) {
          .lm-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            max-width: 750px;
          }

          .lm-modal {
            grid-template-columns: 180px minmax(0, 1fr);
            gap: 22px;
            padding: 28px;
          }

          .lm-modal-photo {
            height: 240px;
          }
        }

        /* MOBILE */

        @media (max-width: 600px) {
          .lourdes-management {
            padding: 38px 18px 55px;
          }

          .lm-heading {
            margin-bottom: 35px;
          }

          .lm-eyebrow {
            font-size: 9px;
            letter-spacing: 2px;
          }

          .lm-heading p {
            font-size: 10px;
            letter-spacing: 1px;
          }

          .lm-grid {
            grid-template-columns: minmax(0, 1fr);
            max-width: 380px;
            gap: 22px;
          }

          .lm-flip-container {
            height: 345px;
          }

          .lm-card-top {
            min-height: 345px;
          }

          .lm-photo-ring {
            width: 160px;
            height: 160px;
          }

          .lm-backdrop {
            padding: 10px;
          }

          .lm-modal {
            display: flex;
            flex-direction: column;
            gap: 15px;
            max-width: 420px;
            max-height: 92dvh;
            padding: 22px 18px;
          }

          .lm-close {
            position: sticky;
            top: 0;
            align-self: flex-end;
            flex-shrink: 0;
            margin-bottom: -5px;
          }

          .lm-modal-photo {
            width: min(70%, 220px);
            height: 175px;
            flex-shrink: 0;
            margin: 0 auto;
          }

          .lm-modal-content {
            padding-top: 0;
          }

          .lm-modal-content h2 {
            font-size: 25px;
          }

          .lm-modal-content h4 {
            margin-top: 17px;
          }
        }

        /* ACCESSIBILITY */

        @media (prefers-reduced-motion: reduce) {
          .lm-flip-inner {
            transition: none !important;
          }

          .lourdes-management *,
          .lourdes-management *::before,
          .lourdes-management *::after {
            animation-duration: 0.01ms !important;
            animation-iteration-count: 1 !important;
            scroll-behavior: auto !important;
            transition-duration: 0.01ms !important;
          }
        }
/* QUALIFICATIONS - SMALLER FONT */

.lm-modal-content .lm-qualification-section h4 {
  margin: 18px 0 6px;
  font-size: 12px;
}

.lm-modal-content .lm-qualification-list {
  padding-left: 18px;
  margin: 0;
  color: #f0e5e5;
  font-size: 10px !important;
  line-height: 1.5;
}

.lm-modal-content .lm-qualification-list li {
  font-size: 12px !important;
  line-height: 1.5;
  margin-bottom: 3px;
}
      `}</style>

      {/* PAGE HEADING */}

      <header className="lm-heading">
        <span className="lm-eyebrow">
          ST. LOURDES ENGINEERING COLLEGE
        </span>

        <h1>Our Management</h1>

        <p>
          LEADERSHIP, VISION AND COMMITMENT TO EXCELLENCE
          <br />
          SHAPING INNOVATORS AND FUTURE ENGINEERS
        </p>

        <div className="lm-divider" aria-hidden="true">
          <span />
          <i>✦</i>
          <span />
        </div>
      </header>

      {/* MANAGEMENT CARDS */}

      <section
        className="lm-grid"
        aria-label="College management team"
      >
        {managementTeam.map((person, index) => (
          <article
            className="lm-card"
            key={person.role}
            style={{
              animationDelay: `${index * 150}ms`,
            }}
          >
            {/* ONLY THIS TOP SECTION FLIPS */}

            <div className="lm-flip-container">
              <div className="lm-flip-inner">

                {/* FRONT SIDE */}

                <div className="lm-card-top lm-flip-front">
                  <div className="lm-photo-ring">
                    <img
                      src={person.image}
                      alt={person.name}
                      loading="lazy"
                      onError={(event) => {
                        event.currentTarget.style.visibility =
                          "hidden";
                      }}
                    />
                  </div>

                  <h2>{person.name}</h2>

                  <p className="lm-role">
                    {person.role}
                  </p>

                  <p className="lm-experience">
                    {person.experience}
                  </p>
                </div>

                {/* BACK SIDE: FULL PORTRAIT */}

                <div className="lm-flip-back">
                  <img
                    src={person.image}
                    alt={`${person.name} — ${person.role}`}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility =
                        "hidden";
                    }}
                  />
                </div>

              </div>
            </div>

            {/* KNOW MORE BUTTON STAYS FIXED */}

            <div className="lm-card-footer">
              <button
                type="button"
                className="lm-button"
                onClick={() => setSelected(person)}
              >
                Know More <span aria-hidden="true">→</span>
              </button>
            </div>
          </article>
        ))}
      </section>

      {/* KNOW MORE MODAL */}

      {selected && (
        <div
          className="lm-backdrop"
          onMouseDown={(event) => {
            if (event.target === event.currentTarget) {
              setSelected(null);
            }
          }}
        >
          <section
            className="lm-modal"
            role="dialog"
            aria-modal="true"
            aria-label={`${selected.role} profile`}
          >
            <button
              type="button"
              className="lm-close"
              aria-label="Close profile"
              onClick={() => setSelected(null)}
            >
              ×
            </button>

            <div className="lm-modal-photo">
              <img
                src={selected.image}
                alt={selected.name}
              />
            </div>

            <div className="lm-modal-content">
  <span className="lm-modal-label">
    LEADERSHIP PROFILE
  </span>

  <h2>{selected.name}</h2>

  <h3>{selected.role}</h3>

  <p className="lm-vision">
    {selected.vision}
  </p>

  <p className="lm-bio">
    {selected.bio}
  </p>

  {/* QUALIFICATIONS */}
  {(selected.qualification ?? []).filter(item => item.trim() !== "").length > 0 && (
    <div className="lm-qualification-section">
      <h4>Qualifications</h4>

      <ul className="lm-qualification-list">
        {(selected.qualification ?? [])
          .filter(item => item.trim() !== "")
          .map((item, index) => (
            <li key={index}>{item}</li>
          ))}
      </ul>
    </div>
  )}

  {/* AREAS OF FOCUS */}
  <h4>Areas of Focus</h4>

  <ul>
    {selected.focus.map((item) => (
      <li key={item}>{item}</li>
    ))}
  </ul>

</div>
          </section>
        </div>
      )}
    </main>
  );
}