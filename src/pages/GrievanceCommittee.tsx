
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  Crown,
  GraduationCap,
  Home,
  MessageCircle,
  UserRound,
} from 'lucide-react';

const members = [
  { name: 'Dr. K. Balakannan', role: 'Principal', position: 'Convenor', featured: true },
  { name: 'Mr. A. Mosses', role: 'Dean', position: 'Member' },
  { name: 'Mr. J. Sivamurugan', role: 'HoD / CSE', position: 'Member' },
  { name: 'Mrs. V. Suvarnavani', role: 'HoD / ECE', position: 'Member' },
  { name: 'Mr. M. Senthilkumar', role: 'HoD / Civil', position: 'Member' },
  { name: 'Mr. S.H. Syed Vasiyulla', role: 'HoD / EEE', position: 'Member' },
  { name: 'Mrs. M. Meena', role: 'HoD / MBA', position: 'Member' },
];

export default function GrievanceCommittee() {
  return (
    <main className="grc">
      <style>{`
        .grc {
          --wine: #671329;
          --wine-dark: #3c0918;
          --gold: #e5b843;
          --cream: #fffaf3;
          --navy: #0c1c35;
          --muted: #696064;
          background: var(--cream);
          color: #35111c;
          font-family: Inter, Arial, sans-serif;
          overflow: hidden;
        }

        .grc * { box-sizing: border-box; }

        .grc a { text-decoration: none; }

        .grc-container {
          width: min(1120px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* HERO */
        .grc-hero {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          min-height: 250px;
          padding: 45px 0 42px;
          color: white;
          background:
            linear-gradient(
              90deg,
              rgba(61, 7, 23, .98) 0%,
              rgba(103, 19, 41, .94) 43%,
              rgba(54, 16, 27, .38) 100%
            ),
            url('/images/campus.jpg') center 43% / cover no-repeat;
          border-bottom: 3px solid var(--gold);
        }

        .grc-hero::after {
          content: "";
          position: absolute;
          z-index: -1;
          left: -5%;
          bottom: -15px;
          width: 110%;
          height: 22px;
          border-radius: 50%;
          background: var(--cream);
        }

        .grc-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 9px;
          color: var(--gold);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1.2px;
          text-transform: uppercase;
        }

        .grc-eyebrow::after {
          content: "";
          width: 30px;
          height: 1px;
          background: var(--gold);
        }

        .grc-hero h1 {
          max-width: 800px;
          margin: 0;
          color: #fffaf3;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(30px, 4vw, 43px);
          font-weight: 600;
          line-height: 1.17;
          letter-spacing: -.7px;
        }

        .grc-hero-description {
          max-width: 620px;
          margin: 10px 0 0;
          color: rgba(255,255,255,.85);
          font-size: 13px;
          line-height: 1.7;
        }

        .grc-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          color: rgba(255,255,255,.75);
          font-size: 11px;
        }

        .grc-breadcrumb a { color: #fff; }
        .grc-breadcrumb a:hover { color: var(--gold); }
        .grc-breadcrumb svg { color: var(--gold); }
        .grc-breadcrumb span { color: var(--gold); }

        /* SECTION HEADING */
        .grc-content {
          padding: 29px 0 23px;
        }

        .grc-heading {
          margin-bottom: 19px;
          text-align: center;
        }

        .grc-heading-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          margin-bottom: 7px;
          color: var(--gold);
        }

        .grc-heading-decoration span {
          width: 55px;
          height: 1px;
          background: #d9a936;
        }

        .grc-heading h2 {
          margin: 0;
          color: var(--wine);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: clamp(25px, 3vw, 31px);
          font-weight: 600;
        }

        .grc-heading p {
          max-width: 590px;
          margin: 8px auto 0;
          color: var(--muted);
          font-size: 12px;
          line-height: 1.7;
        }

        /* MEMBER CARDS + CONTACT PANEL */
        .grc-layout {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 255px;
          align-items: stretch;
          gap: 16px;
        }

        .grc-member-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-content: start;
          gap: 10px;
        }

        .grc-member {
          display: flex;
          align-items: center;
          gap: 10px;
          min-width: 0;
          min-height: 64px;
          padding: 10px 13px;
          border: 1px solid #eee0d1;
          border-radius: 9px;
          background: linear-gradient(135deg, #fffefd, #fff7ed);
          box-shadow: 0 4px 11px rgba(57, 21, 25, .075);
          transition: transform .22s ease, border-color .22s ease,
            box-shadow .22s ease;
        }

        .grc-member:hover {
          transform: translateY(-3px);
          border-color: #d9ab42;
          box-shadow: 0 8px 18px rgba(57, 21, 25, .12);
        }

        .grc-member.featured {
          grid-column: 1 / -1;
          min-height: 70px;
          border: 1px solid #e7ad31;
          box-shadow: 0 4px 12px rgba(132, 83, 13, .13);
        }

        .grc-avatar {
          display: grid;
          flex: 0 0 36px;
          width: 36px;
          height: 36px;
          place-items: center;
          border: 1px solid rgba(235, 190, 65, .7);
          border-radius: 50%;
          background: linear-gradient(140deg, #861b36, #4b0b20);
          color: #f1c44c;
        }

        .grc-member.featured .grc-avatar {
          flex-basis: 42px;
          width: 42px;
          height: 42px;
        }

        .grc-member-divider {
          flex: 0 0 2px;
          align-self: stretch;
          max-height: 38px;
          background: linear-gradient(#e3b23c, #d8a047);
        }

        .grc-member-copy {
          min-width: 0;
          flex: 1;
        }

        .grc-member h3 {
          margin: 0;
          color: #68152b;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 12px;
          font-weight: 700;
          line-height: 1.5;
          overflow-wrap: anywhere;
        }

        .grc-member p {
          margin: 2px 0 0;
          color: #63595b;
          font-size: 11px;
        }

        .grc-role {
          display: inline-flex;
          flex-shrink: 0;
          align-items: center;
          gap: 4px;
          padding: 5px 10px;
          border-radius: 20px;
          background: linear-gradient(110deg, #f1cf67, #e2a62e);
          color: #4b2510;
          font-size: 10px;
          font-weight: 800;
        }

        /* CONCERN PANEL */
        .grc-concern {
          position: relative;
          isolation: isolate;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          min-width: 0;
          padding: 25px 21px;
          overflow: hidden;
          border: 1px solid rgba(244, 201, 91, .25);
          border-radius: 10px;
          background: linear-gradient(150deg, #851c39, #500b20 75%);
          color: white;
        }

        .grc-concern::after {
          content: "ST. LOURDES";
          position: absolute;
          z-index: -1;
          right: -8px;
          bottom: 7px;
          color: rgba(255, 255, 255, .055);
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 28px;
          font-weight: 700;
          letter-spacing: 2px;
          transform: rotate(-8deg);
        }

        .grc-concern-icon {
          position: relative;
          width: 57px;
          height: 50px;
          margin: 0 auto 12px;
          color: var(--gold);
        }

        .grc-concern-icon svg:first-child {
          position: absolute;
          top: 0;
          left: 7px;
        }

        .grc-concern-icon svg:last-child {
          position: absolute;
          right: 0;
          bottom: 0;
        }

        .grc-concern h2 {
          margin: 0;
          color: #fffaf3;
          font-family: Georgia, 'Times New Roman', serif;
          font-size: 22px;
          font-weight: 600;
          line-height: 1.3;
        }

        .grc-concern-rule {
          width: 100%;
          height: 1px;
          margin: 13px 0 12px;
          background: linear-gradient(90deg, var(--gold), transparent);
        }

        .grc-concern p {
          margin: 0;
          color: rgba(255,255,255,.89);
          font-size: 12px;
          line-height: 1.65;
        }

        .grc-contact-link {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 7px;
          margin-top: 16px;
          padding: 10px 13px;
          border-radius: 25px;
          background: linear-gradient(110deg, #f3d16e, #e4ad35);
          color: #43101d;
          font-size: 10px;
          font-weight: 800;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .grc-contact-link:hover {
          transform: translateY(-2px);
          box-shadow: 0 5px 15px rgba(0, 0, 0, .18);
        }

        /* FOOTER SPACING */
        .grc-content {
          padding-bottom: 24px;
        }

        /* RESPONSIVE */
        @media (min-width: 1500px) {
          .grc-hero { min-height: 280px; }
          .grc-content { padding-top: 38px; }
        }

        @media (max-width: 760px) {
          .grc-container {
            width: calc(100% - 36px);
          }

          .grc-hero {
            min-height: 255px;
            padding: 35px 0;
            background-position: 58% center;
          }

          .grc-layout {
            grid-template-columns: minmax(0, 1fr);
          }

          .grc-concern {
            min-height: 0;
            padding: 23px;
          }

          .grc-concern-icon {
            margin-left: 0;
          }

          .grc-concern h2 { font-size: 24px; }

          .grc-contact-link {
            font-size: 11px;
          }
        }

        @media (max-width: 480px) {
          .grc-container {
            width: calc(100% - 28px);
          }

          .grc-hero {
            min-height: 245px;
            padding: 32px 0;
          }

          .grc-hero h1 {
            font-size: 32px;
            letter-spacing: -.5px;
          }

          .grc-hero-description {
            font-size: 12px;
          }

          .grc-content {
            padding-top: 26px;
          }

          .grc-heading h2 { font-size: 26px; }

          .grc-heading p { font-size: 11px; }

          .grc-member-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 9px;
          }

          .grc-member.featured {
            grid-column: auto;
          }

          .grc-member {
            min-height: 65px;
          }

          .grc-member h3 { font-size: 12px; }

          .grc-role {
            padding: 5px 8px;
            font-size: 9px;
          }

          .grc-concern {
            padding: 22px;
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .grc *,
          .grc *::before,
          .grc *::after {
            transition: none !important;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="grc-hero" data-header-theme="dark">
        <div className="grc-container">
          <p className="grc-eyebrow">
            Student Support &amp; Governance
          </p>

          <h1>Grievance Redressal Committee</h1>

          <p className="grc-hero-description">
            A fair, impartial and transparent mechanism to hear and address
            student concerns, ensuring a safe, respectful and conducive
            learning environment.
          </p>

          <nav className="grc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">
              <Home size={12} />
            </Link>
            <Link to="/">Home</Link>
            <ChevronRight size={12} />
            <Link to="/about">Administration</Link>
            <ChevronRight size={12} />
            <span>Grievance Redressal Committee</span>
          </nav>
        </div>
      </section>

      {/* Committee */}
      <section className="grc-content">
        <div className="grc-container">
          <header className="grc-heading">
            <div className="grc-heading-decoration">
              <span />
              <GraduationCap size={23} fill="currentColor" />
              <span />
            </div>

            <h2>Committee Members</h2>

            <p>
              The following members constitute the Grievance Redressal
              Committee (GRC) to address and resolve the concerns of
              students in a fair and timely manner.
            </p>
          </header>

          <div className="grc-layout">
            <div className="grc-member-grid">
              {members.map((member) => (
                <article
                  key={member.name}
                  className={`grc-member ${
                    member.featured ? 'featured' : ''
                  }`}
                >
                  <div className="grc-avatar" aria-hidden="true">
                    <UserRound size={21} fill="currentColor" />
                  </div>

                  <div className="grc-member-divider" />

                  <div className="grc-member-copy">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>

                  {member.featured && (
                    <span className="grc-role">
                      <Crown size={12} fill="currentColor" />
                      Convenor
                    </span>
                  )}
                </article>
              ))}
            </div>

            <aside className="grc-concern">
              <div className="grc-concern-icon" aria-hidden="true">
                <MessageCircle size={32} />
                <MessageCircle size={24} />
              </div>

              <h2>Have a concern?</h2>

              <div className="grc-concern-rule" />

              <p>
                Students can raise concerns through the appropriate college
                channels. All grievances are handled with fairness and
                confidentiality.
              </p>

              <Link to="/contact" className="grc-contact-link">
                Contact the Committee
                <ArrowRight size={14} />
              </Link>
            </aside>
          </div>
        </div>
      </section>
    </main>
  );
}
