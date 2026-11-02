
import React, { useEffect, useMemo, useState } from "react";

type FacultyMember = {
  id: number;
  name: string;
  designation: string;
  department: string;
  image: string;
  qualifications: string[];
  experience: string;
  specialization: string[];
  biography: string;
  research: string;
};

const facultyMembers: FacultyMember[] = [
  {
    id: 1,
    name: "Faculty Member 1",
    designation: "Professor & Head",
    department: "Computer Science and Engineering",
    image: "/managementand faculty/faculty1.png",
    qualifications: ["B.E.", "M.E.", "Ph.D."],
    experience: "Academic teaching, research and professional mentoring",
    specialization: [
      "Computer Science",
      "Software Engineering",
      "Emerging Technologies",
    ],
    biography:
      "Dedicated to academic excellence, innovative teaching, research and the professional development of engineering students.",
    research:
      "Software engineering, computing technologies and engineering education.",
  },
  {
    id: 2,
    name: "Faculty Member 2",
    designation: "Associate Professor",
    department: "Electronics and Communication Engineering",
    image: "/managementand faculty/faculty2.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Teaching, academic mentoring and technical training",
    specialization: [
      "Communication Systems",
      "Embedded Systems",
      "Electronics",
    ],
    biography:
      "Committed to developing students' technical knowledge, practical skills and problem-solving abilities.",
    research:
      "Electronics, communication systems and embedded technologies.",
  },
  {
    id: 3,
    name: "Faculty Member 3",
    designation: "Assistant Professor",
    department: "Electrical and Electronics Engineering",
    image: "/managementand faculty/faculty3.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Engineering education and practical laboratory training",
    specialization: [
      "Electrical Systems",
      "Power Electronics",
      "Control Systems",
    ],
    biography:
      "Supports students through practical learning, technical guidance and a strong foundation in electrical engineering.",
    research:
      "Electrical systems, power electronics and energy technologies.",
  },
  {
    id: 4,
    name: "Faculty Member 4",
    designation: "Assistant Professor",
    department: "Mechanical Engineering",
    image: "/managementand faculty/faculty4.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Teaching, laboratory instruction and project supervision",
    specialization: [
      "Thermal Engineering",
      "Manufacturing",
      "Mechanical Design",
    ],
    biography:
      "Passionate about hands-on engineering education, innovation and helping students develop practical engineering skills.",
    research:
      "Mechanical design, manufacturing and thermal engineering.",
  },
  {
    id: 5,
    name: "Faculty Member 5",
    designation: "Assistant Professor",
    department: "Civil Engineering",
    image: "/managementand faculty/faculty5.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Academic instruction and engineering project guidance",
    specialization: [
      "Structural Engineering",
      "Construction Technology",
      "Environmental Engineering",
    ],
    biography:
      "Encourages sustainable design, practical engineering knowledge and responsible professional development.",
    research:
      "Structural design, sustainable construction and civil infrastructure.",
  },
  {
    id: 6,
    name: "Faculty Member 6",
    designation: "Assistant Professor",
    department: "Information Technology",
    image: "/managementand faculty/faculty6.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Teaching, technical training and student project mentoring",
    specialization: [
      "Web Technologies",
      "Database Systems",
      "Information Security",
    ],
    biography:
      "Focused on helping students build strong programming skills and understand real-world information technology applications.",
    research:
      "Information systems, cybersecurity and modern software technologies.",
  },
  {
    id: 7,
    name: "Faculty Member 7",
    designation: "Lecturer",
    department: "Computer Science and Engineering",
    image: "/managementand faculty/faculty7.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Teaching and practical technical training",
    specialization: [
      "Programming",
      "Data Structures",
      "Software Development",
    ],
    biography:
      "Committed to strengthening students' programming fundamentals, logical thinking and software development abilities.",
    research:
      "Computing education, software development and programming methodologies.",
  },
  {
    id: 8,
    name: "Faculty Member 8",
    designation: "Lecturer",
    department: "Electronics and Communication Engineering",
    image: "/managementand faculty/faculty8.png",
    qualifications: ["B.E.", "M.E."],
    experience: "Academic instruction and laboratory training",
    specialization: [
      "Digital Electronics",
      "Circuit Design",
      "Communication Systems",
    ],
    biography:
      "Promotes practical learning and technical curiosity through structured instruction and hands-on engineering activities.",
    research:
      "Digital systems, electronic circuits and communication technologies.",
  },
];

const departments = [
  "All Faculty",
  ...Array.from(
    new Set(facultyMembers.map((faculty) => faculty.department))
  ),
];

export default function Faculty() {
  const [activeDepartment, setActiveDepartment] =
    useState("All Faculty");
  const [search, setSearch] = useState("");
  const [selectedFaculty, setSelectedFaculty] =
    useState<FacultyMember | null>(null);

  useEffect(() => {
    const page = document.querySelector(".faculty-page");
    if (!page) return;

    const elements =
      page.querySelectorAll<HTMLElement>("[data-reveal]");

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
        rootMargin: "0px 0px -35px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  useEffect(() => {
    if (!selectedFaculty) return;

    const previousOverflow = document.body.style.overflow;
    document.body.style.overflow = "hidden";

    const handleKeyDown = (event: KeyboardEvent) => {
      if (event.key === "Escape") setSelectedFaculty(null);
    };

    window.addEventListener("keydown", handleKeyDown);

    return () => {
      document.body.style.overflow = previousOverflow;
      window.removeEventListener("keydown", handleKeyDown);
    };
  }, [selectedFaculty]);

  const filteredFaculty = useMemo(() => {
    const query = search.trim().toLowerCase();

    return facultyMembers.filter((faculty) => {
      const matchesDepartment =
        activeDepartment === "All Faculty" ||
        faculty.department === activeDepartment;

      const searchableText = [
        faculty.name,
        faculty.designation,
        faculty.department,
        faculty.biography,
        faculty.research,
        ...faculty.qualifications,
        ...faculty.specialization,
      ]
        .join(" ")
        .toLowerCase();

      return (
        matchesDepartment &&
        (!query || searchableText.includes(query))
      );
    });
  }, [activeDepartment, search]);

  return (
    <main className="faculty-page">
      <style>{`
        .faculty-page {
          --maroon: #68182b;
          --maroon-dark: #350812;
          --maroon-deep: #24050c;
          --gold: #d6ad55;
          --gold-light: #f6dfa0;
          --cream: #fbf7f0;
          --ink: #38262a;
          --muted: #76676a;

          min-height: 100vh;
          overflow: clip;
          color: var(--ink);
          background: var(--cream);
          font-family: Arial, Helvetica, sans-serif;
        }

        .faculty-page *,
        .faculty-page *::before,
        .faculty-page *::after {
          box-sizing: border-box;
        }

        .faculty-container {
          width: 100%;
          max-width: 1440px;
          margin: 0 auto;
          padding: 48px 5% 76px;
        }

        .faculty-heading {
          margin-bottom: 36px;
          text-align: center;
        }

        .faculty-eyebrow {
          margin: 0 0 12px;
          color: #9b7126;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .26em;
          text-transform: uppercase;
        }

        .faculty-title {
          margin: 0;
          color: var(--maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4.2vw, 52px);
          line-height: 1.2;
        }

        .faculty-title span {
          color: #b68a35;
        }

        .faculty-subtitle {
          max-width: 720px;
          margin: 14px auto 0;
          color: var(--muted);
          font-size: 14px;
          line-height: 1.9;
        }

        .faculty-heading-line {
          position: relative;
          left: 50%;
          width: 100vw;
          height: 3px;
          margin-top: 34px;
          transform: translateX(-50%);
          background: linear-gradient(
            90deg,
            #9b7126,
            #f8e5ad,
            #c69b43,
            #f8e5ad,
            #9b7126
          );
          box-shadow: 0 2px 14px #d6ad5540;
        }

        /* Search and result count */
        .faculty-search-row {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 18px;
          margin-bottom: 22px;
        }

        .faculty-result-count {
          color: var(--muted);
          font-size: 13px;
        }

        .faculty-search {
          width: 320px;
          max-width: 100%;
          padding: 13px 16px;
          border: 1px solid #d9c79c;
          border-radius: 7px;
          outline: none;
          color: var(--maroon);
          background: #fffdf9;
          font-size: 14px;
          transition: border-color .25s, box-shadow .25s;
        }

        .faculty-search:focus {
          border-color: var(--gold);
          box-shadow: 0 0 0 4px #d6ad5528;
        }

        /* Department filters */
        .faculty-filters {
          display: flex;
          flex-wrap: wrap;
          gap: 10px;
          margin-bottom: 30px;
        }

        .faculty-filter {
          padding: 10px 16px;
          border: 1px solid #ddcda8;
          border-radius: 6px;
          color: var(--maroon);
          background: transparent;
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            transform .25s ease;
        }

        .faculty-filter:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
          background: #f4ead5;
        }

        .faculty-filter.active {
          border-color: var(--maroon);
          color: #fff;
          background: var(--maroon);
          box-shadow: 0 5px 15px #68182b20;
        }

        /* Faculty card grid */
        .faculty-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          align-items: stretch;
          gap: 24px;
        }

        .faculty-card {
          min-width: 0;
          overflow: hidden;
          border: 1px solid #e3d1a7;
          border-radius: 12px;
          background: #fffdf9;
          box-shadow: 0 5px 18px #45101a0a;
          transition:
            transform .35s ease,
            border-color .35s ease,
            box-shadow .35s ease;
        }

        .faculty-card:hover {
          transform: translateY(-7px);
          border-color: var(--gold);
          box-shadow:
            0 16px 32px #45101a16,
            0 0 0 1px #d6ad5524;
        }

        .faculty-card-photo-wrap {
          position: relative;
          height: 245px;
          overflow: hidden;
          background: #eee5d8;
        }

        .faculty-card-photo-wrap::after {
          position: absolute;
          inset: auto 0 0;
          height: 5px;
          background: linear-gradient(
            90deg,
            var(--maroon),
            var(--gold-light),
            var(--maroon)
          );
          content: "";
        }

        .faculty-card-photo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          object-position: center top;
          transition: transform .55s ease;
        }

        .faculty-card:hover .faculty-card-photo {
          transform: scale(1.055);
        }

        .faculty-card-body {
          display: flex;
          min-height: 218px;
          flex-direction: column;
          align-items: center;
          padding: 21px 15px 18px;
          text-align: center;
        }

        .faculty-card-name {
          margin: 0;
          color: var(--maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          line-height: 1.45;
          overflow-wrap: anywhere;
        }

        .faculty-card-designation {
          margin: 7px 0 5px;
          color: #9b7126;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.5;
        }

        .faculty-card-department {
          margin: 0 0 18px;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.6;
        }

        .faculty-view-button {
          width: 100%;
          max-width: 190px;
          margin-top: auto;
          padding: 11px 14px;
          border: 1px solid var(--maroon);
          border-radius: 5px;
          color: #fff;
          background: var(--maroon);
          cursor: pointer;
          font-size: 12px;
          font-weight: 700;
          transition:
            color .25s ease,
            background .25s ease,
            border-color .25s ease,
            transform .25s ease;
        }

        .faculty-view-button:hover {
          transform: translateY(-2px);
          border-color: var(--gold);
          color: var(--maroon-dark);
          background: linear-gradient(
            110deg,
            #dfb95f,
            #f9e6ab,
            #d0a34a
          );
        }

        .faculty-empty {
          grid-column: 1 / -1;
          padding: 45px 20px;
          border: 1px dashed #cbb981;
          border-radius: 9px;
          color: var(--muted);
          text-align: center;
        }

        /* Scroll reveal animations */
        .faculty-page [data-reveal] {
          opacity: 0;
          transition:
            opacity .75s ease,
            transform .75s cubic-bezier(.2, .7, .2, 1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        .faculty-page [data-reveal="left"] {
          transform: translate3d(-48px, 0, 0);
        }

        .faculty-page [data-reveal="right"] {
          transform: translate3d(48px, 0, 0);
        }

        .faculty-page [data-reveal="up"],
        .faculty-page [data-reveal]:not([data-reveal="left"]):not([data-reveal="right"]) {
          transform: translate3d(0, 35px, 0);
        }

        .faculty-page [data-reveal].is-visible {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }

        /* Faculty profile popup */
        .faculty-profile-overlay {
          position: fixed;
          inset: 0;
          z-index: 99999;
          display: flex;
          align-items: center;
          justify-content: center;
          padding: 24px;
          background: #18050bd9;
          backdrop-filter: blur(8px);
          -webkit-backdrop-filter: blur(8px);
          animation: facultyOverlayIn .25s ease both;
        }

        .faculty-profile-panel {
          position: relative;
          display: grid;
          grid-template-columns: minmax(240px, .8fr) minmax(0, 1.2fr);
          gap: 30px;
          width: 100%;
          max-width: 1080px;
          max-height: 90vh;
          overflow-y: auto;
          margin: 0;
          padding: 30px;
          border: 1px solid var(--gold);
          border-radius: 18px;
          color: var(--ink);
          background: var(--cream);
          box-shadow: 0 24px 75px #0005;
          animation: facultyPanelIn .35s ease both;
        }

        .faculty-profile-photo-wrap {
          width: 100%;
          min-height: 390px;
          max-height: 560px;
          overflow: hidden;
          border: 1px solid var(--gold);
          border-radius: 12px;
          background: #eee5d8;
        }

        .faculty-profile-photo {
          display: block;
          width: 100%;
          height: 100%;
          min-height: 390px;
          object-fit: cover;
          object-position: center top;
        }

        .faculty-profile-content {
          min-width: 0;
          padding: 10px 20px 10px 0;
        }

        .faculty-profile-kicker {
          margin: 0 0 10px;
          color: #9b7126;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: .2em;
          text-transform: uppercase;
        }

        .faculty-profile-name {
          margin: 0;
          padding-right: 35px;
          color: var(--maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(26px, 3vw, 39px);
          line-height: 1.3;
          overflow-wrap: anywhere;
        }

        .faculty-profile-role {
          margin: 8px 0 5px;
          color: #9b7126;
          font-size: 15px;
          font-weight: 700;
        }

        .faculty-profile-department {
          margin: 0 0 18px;
          color: var(--maroon);
          font-size: 13px;
          line-height: 1.7;
        }

        .faculty-profile-divider {
          height: 1px;
          margin: 17px 0;
          background: linear-gradient(
            90deg,
            var(--gold),
            #e8d6a9,
            transparent
          );
        }

        .faculty-profile-content h4 {
          margin: 0 0 9px;
          color: var(--maroon);
          font-size: 14px;
        }

        .faculty-profile-biography {
          margin: 0;
          color: #514247;
          font-size: 13px;
          line-height: 1.9;
        }

        .faculty-profile-details {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          margin-top: 23px;
        }

        .faculty-profile-details ul {
          margin: 0;
          padding-left: 19px;
        }

        .faculty-profile-details li {
          margin: 6px 0;
          color: #514247;
          font-size: 12px;
          line-height: 1.7;
          overflow-wrap: anywhere;
        }

        .faculty-profile-details li::marker {
          color: #b88b2e;
        }

        .faculty-profile-details p {
          margin: 0;
          color: #514247;
          font-size: 12px;
          line-height: 1.8;
          overflow-wrap: anywhere;
        }

        .faculty-profile-close {
          position: absolute;
          top: 14px;
          right: 14px;
          z-index: 2;
          display: flex;
          width: 39px;
          height: 39px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--gold);
          border-radius: 50%;
          color: var(--maroon);
          background: #fffdf8;
          cursor: pointer;
          font-size: 26px;
          line-height: 1;
          transition:
            color .2s ease,
            background .2s ease,
            transform .2s ease;
        }

        .faculty-profile-close:hover {
          transform: rotate(90deg);
          color: #fff;
          background: var(--maroon);
        }

        @keyframes facultyOverlayIn {
          from { opacity: 0; }
          to { opacity: 1; }
        }

        @keyframes facultyPanelIn {
          from {
            opacity: 0;
            transform: translateY(20px) scale(.985);
          }
          to {
            opacity: 1;
            transform: translateY(0) scale(1);
          }
        }

        @media (max-width: 1100px) {
          .faculty-grid {
            grid-template-columns: repeat(3, minmax(0, 1fr));
          }

          .faculty-card-photo-wrap {
            height: 225px;
          }

          .faculty-profile-panel {
            gap: 22px;
            padding: 25px;
          }
        }

        @media (max-width: 760px) {
          .faculty-container {
            padding: 36px 4% 50px;
          }

          .faculty-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 15px;
          }

          .faculty-card-photo-wrap {
            height: 195px;
          }

          .faculty-card-body {
            min-height: 205px;
            padding: 16px 10px;
          }

          .faculty-card-name {
            font-size: 16px;
          }

          .faculty-profile-overlay {
            padding: 14px;
          }

          .faculty-profile-panel {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
            max-height: 92vh;
            padding: 20px;
            border-radius: 15px;
          }

          .faculty-profile-photo-wrap {
            width: 100%;
            max-width: 300px;
            height: 280px;
            min-height: 0;
            margin: 0 auto;
          }

          .faculty-profile-photo {
            min-height: 0;
          }

          .faculty-profile-content {
            padding: 0 2px 8px;
          }

          .faculty-profile-details {
            grid-template-columns: minmax(0, 1fr);
            gap: 16px;
          }
        }

        @media (max-width: 520px) {
          .faculty-container {
            padding: 30px 16px 40px;
          }

          .faculty-search-row {
            align-items: stretch;
            flex-direction: column;
            gap: 10px;
          }

          .faculty-search {
            width: 100%;
          }

          .faculty-filters {
            gap: 8px;
          }

          .faculty-filter {
            padding: 9px 11px;
            font-size: 11px;
          }

          .faculty-grid {
            gap: 12px;
          }

          .faculty-card-photo-wrap {
            height: 155px;
          }

          .faculty-card-body {
            min-height: 215px;
            padding: 14px 8px;
          }

          .faculty-card-name {
            font-size: 14px;
          }

          .faculty-card-designation {
            font-size: 11px;
          }

          .faculty-card-department {
            font-size: 11px;
          }

          .faculty-view-button {
            padding: 9px 6px;
            font-size: 11px;
          }

          .faculty-profile-panel {
            padding: 17px;
          }

          .faculty-profile-photo-wrap {
            height: 245px;
          }

          .faculty-profile-name {
            font-size: 27px;
          }

          .faculty-profile-close {
            top: 10px;
            right: 10px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .faculty-page *,
          .faculty-page *::before,
          .faculty-page *::after {
            scroll-behavior: auto !important;
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
          }

          .faculty-page [data-reveal] {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <div className="faculty-container">
        <header className="faculty-heading" data-reveal="left">
          <div className="faculty-heading-content">
            <p className="faculty-eyebrow">
              ST. Lourdes Engineering College
            </p>

            <h1 className="faculty-title">
              Meet Our <span>Faculty</span>
            </h1>

            <p className="faculty-subtitle">
              Meet the educators, researchers and mentors committed
              to engineering excellence, innovation, practical
              learning and the professional growth of our students.
            </p>
          </div>

          <div className="faculty-heading-line" />
        </header>

        <div className="faculty-search-row" data-reveal="right">
          <p className="faculty-result-count" aria-live="polite">
            Showing {filteredFaculty.length} of {facultyMembers.length} faculty members
          </p>

          <input
            className="faculty-search"
            type="search"
            placeholder="Search faculty, department..."
            aria-label="Search faculty"
            value={search}
            onChange={(event) => setSearch(event.target.value)}
          />
        </div>

        <nav
          className="faculty-filters"
          aria-label="Filter faculty by department"
          data-reveal="right"
        >
          {departments.map((department) => (
            <button
              key={department}
              type="button"
              className={
                "faculty-filter" +
                (activeDepartment === department ? " active" : "")
              }
              onClick={() => setActiveDepartment(department)}
              aria-pressed={activeDepartment === department}
            >
              {department}
            </button>
          ))}
        </nav>

        <section
          className="faculty-grid"
          aria-label="Faculty directory"
        >
          {filteredFaculty.length > 0 ? (
            filteredFaculty.map((faculty, index) => (
              <article
                className="faculty-card"
                key={faculty.id}
                data-reveal="up"
                style={
                  {
                    "--reveal-delay": `${(index % 4) * 100}ms`,
                  } as React.CSSProperties
                }
              >
                <div className="faculty-card-photo-wrap">
                  <img
                    className="faculty-card-photo"
                    src={faculty.image}
                    alt={faculty.name}
                    loading="lazy"
                    onError={(event) => {
                      event.currentTarget.style.visibility = "hidden";
                    }}
                  />
                </div>

                <div className="faculty-card-body">
                  <h2 className="faculty-card-name">
                    {faculty.name}
                  </h2>

                  <p className="faculty-card-designation">
                    {faculty.designation}
                  </p>

                  <p className="faculty-card-department">
                    {faculty.department}
                  </p>

                  <button
                    className="faculty-view-button"
                    type="button"
                    onClick={() => setSelectedFaculty(faculty)}
                  >
                    View Profile <span aria-hidden="true">→</span>
                  </button>
                </div>
              </article>
            ))
          ) : (
            <div className="faculty-empty">
              No faculty members found. Try another search or department.
            </div>
          )}
        </section>
      </div>

      {selectedFaculty && (
        <div
          className="faculty-profile-overlay"
          onClick={() => setSelectedFaculty(null)}
        >
          <section
            className="faculty-profile-panel"
            role="dialog"
            aria-modal="true"
            aria-label={`Profile of ${selectedFaculty.name}`}
            onClick={(event) => event.stopPropagation()}
          >
            <button
              type="button"
              className="faculty-profile-close"
              onClick={() => setSelectedFaculty(null)}
              aria-label="Close faculty profile"
            >
              ×
            </button>

            <div className="faculty-profile-photo-wrap">
              <img
                className="faculty-profile-photo"
                src={selectedFaculty.image}
                alt={selectedFaculty.name}
              />
            </div>

            <div className="faculty-profile-content">
              <p className="faculty-profile-kicker">
                Faculty Profile
              </p>

              <h2 className="faculty-profile-name">
                {selectedFaculty.name}
              </h2>

              <p className="faculty-profile-role">
                {selectedFaculty.designation}
              </p>

              <p className="faculty-profile-department">
                {selectedFaculty.department}
              </p>

              <div className="faculty-profile-divider" />

              <h4>About</h4>
              <p className="faculty-profile-biography">
                {selectedFaculty.biography}
              </p>

              <div className="faculty-profile-details">
                <div>
                  <h4>Qualifications</h4>
                  <ul>
                    {selectedFaculty.qualifications.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Professional Experience</h4>
                  <p>{selectedFaculty.experience}</p>
                </div>

                <div>
                  <h4>Specialization</h4>
                  <ul>
                    {selectedFaculty.specialization.map((item) => (
                      <li key={item}>{item}</li>
                    ))}
                  </ul>
                </div>

                <div>
                  <h4>Research Interests</h4>
                  <p>{selectedFaculty.research}</p>
                </div>
              </div>
            </div>
          </section>
        </div>
      )}
    </main>
  );
}
