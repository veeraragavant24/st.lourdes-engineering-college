import { useEffect, useRef } from 'react';
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
  { name: 'Dr. B. R. Ramesh Bapu.', role: 'Principal', position: 'Convenor', featured: true },
  { name: 'Dr. J. Sivamurugan', role: 'HoD / CSE', position: 'Co-ordinator' },
  { name: 'Mr. Nagendra Pramoths', role: 'Assistant Professor', position: 'Member' },
  { name: 'Mr.J.Maria Lenin Prathap', role: 'HoD / S&H', position: 'Member' },
  { name: 'Dr.S.Raja', role: 'Assistant Professor', position: 'Member' },
  { name: 'Mr.M.John S Kumar', role: 'HoD / Cyber Security', position: 'Member' },
  { name: 'Mrs.A.Agalya', role: 'Assistant Professor', position: 'Member' },
];

export default function GrievanceCommittee() {
  const pageRef = useRef<HTMLElement | null>(null);

  /*
    SCROLL REVEAL
    - Hero + heading  -> fade up
    - Featured card   -> fade up
    - Other cards     -> alternate: left -> settle, right -> settle
    - Concern panel   -> right -> settle
  */
  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const timers: number[] = [];

    // Assign animation direction + stagger delay
    const assign = (selector: string, fn: (el: HTMLElement, i: number) => void) => {
      page.querySelectorAll<HTMLElement>(selector).forEach(fn);
    };

    assign('.grc-hero .grc-container, .grc-heading', (el) => {
      el.classList.add('grc-reveal-up');
    });

    assign('.grc-member', (el, i) => {
      if (el.classList.contains('featured')) {
        el.classList.add('grc-reveal-up');
      } else {
        // i = 1,2,3... (featured is 0) -> odd = left, even = right
        el.classList.add(i % 2 === 1 ? 'grc-reveal-left' : 'grc-reveal-right');
        el.style.transitionDelay = `${((i - 1) % 2) * 120}ms`;
      }
    });

    assign('.grc-concern', (el) => {
      el.classList.add('grc-reveal-right');
      el.style.transitionDelay = '150ms';
    });

    const targets = page.querySelectorAll<HTMLElement>(
      '.grc-reveal-up, .grc-reveal-left, .grc-reveal-right'
    );

    // Force the browser to apply the hidden start state before revealing
    void page.getBoundingClientRect();
    void page.offsetHeight;

    const show = (el: HTMLElement) => {
      el.classList.add('grc-reveal-visible');

      // After the entrance finishes, switch to fast hover transitions
      const delay = parseInt(el.style.transitionDelay || '0', 10);
      const id = window.setTimeout(() => {
        el.style.transitionDelay = '';
        el.classList.add('grc-reveal-done');
      }, 900 + delay);
      timers.push(id);
    };

    if (!('IntersectionObserver' in window)) {
      targets.forEach(show);
      return () => timers.forEach((t) => window.clearTimeout(t));
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            show(entry.target as HTMLElement);
            observer.unobserve(entry.target); // animate once
          }
        });
      },
      { threshold: 0.12, rootMargin: '0px 0px -35px 0px' }
    );

    targets.forEach((el) => observer.observe(el));

    // Safety net: if the observer never fires, reveal everything
    timers.push(
      window.setTimeout(() => {
        targets.forEach((el) => {
          if (!el.classList.contains('grc-reveal-visible')) show(el);
        });
      }, 2500)
    );

    return () => {
      observer.disconnect();
      timers.forEach((t) => window.clearTimeout(t));
    };
  }, []);

  return (
    <main ref={pageRef} className="grc">
      <style>{`
        .grc {
          --wine: #671329;
          --wine-dark: #3c0918;
          --gold: #e5b843;
          --cream: #fffaf3;
          --navy: #0c1c35;
          --muted: #696064;

          width: 100%;
          background: var(--cream);
          color: #35111c;
          font-family: Inter, Arial, sans-serif;
          overflow-x: hidden;
        }

        .grc * { box-sizing: border-box; }
        .grc a { text-decoration: none; }

        .grc-container {
          width: min(1120px, calc(100% - 64px));
          margin-inline: auto;
        }

        /* ---------- HERO ---------- */
        .grc-hero {
          position: relative;
          isolation: isolate;
          display: flex;
          align-items: center;
          min-height: 280px;
          padding: 130px 0 42px;
          color: white;
          background:
            linear-gradient(
              90deg,
              rgba(61, 7, 23, .98) 0%,
              rgba(103, 19, 41, .94) 43%,
              rgba(54, 16, 27, .38) 100%
            ),
            url('/about/grievance1.png') center 43% / cover no-repeat;
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
          color: rgba(255, 255, 255, .85);
          font-size: 13px;
          line-height: 1.7;
        }

        .grc-breadcrumb {
          display: flex;
          flex-wrap: wrap;
          align-items: center;
          gap: 8px;
          margin-top: 15px;
          color: rgba(255, 255, 255, .75);
          font-size: 11px;
        }

        .grc-breadcrumb a { color: #fff; transition: color .2s ease; }
        .grc-breadcrumb a:hover { color: var(--gold); }
        .grc-breadcrumb svg { color: var(--gold); }
        .grc-breadcrumb span { color: var(--gold); }

        /* ---------- SECTION HEADING ---------- */
        .grc-content { padding: 29px 0 24px; }

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
          color: #000;
          font-size: 12px;
          line-height: 1.7;
        }

        /* ---------- LAYOUT ---------- */
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

        /* ---------- MEMBER CARD ---------- */
        .grc-member {
          position: relative;
          overflow: hidden;
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
          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .grc-member.featured {
          grid-column: 1 / -1;
          min-height: 70px;
          border-color: #e7ad31;
          box-shadow: 0 4px 12px rgba(132, 83, 13, .13);
        }

        /* gold bar that grows on hover */
        .grc-member::before {
          content: "";
          position: absolute;
          left: 0;
          top: 0;
          width: 3px;
          height: 100%;
          background: linear-gradient(180deg, #f4d477, #c58a22);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform .3s ease;
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
          transition: transform .35s ease, box-shadow .35s ease;
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

        .grc-member-copy { min-width: 0; flex: 1; }

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
          color: #000;
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
          transition: transform .3s ease, box-shadow .3s ease;
        }

        /* card hover */
        .grc-member:hover {
          transform: translateY(-5px);
          border-color: #d9ab42;
          box-shadow: 0 12px 25px rgba(57, 21, 25, .15);
        }

        .grc-member:hover::before {
          transform: scaleY(1);
          transform-origin: top;
        }

        .grc-member:hover .grc-avatar {
          transform: scale(1.09) rotate(-5deg);
          box-shadow: 0 5px 13px rgba(229, 184, 67, .35);
        }

        .grc-member:hover .grc-role {
          transform: translateY(-2px);
          box-shadow: 0 4px 10px rgba(0, 0, 0, .12);
        }

        /* ---------- CONCERN PANEL ---------- */
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
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease;
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

        .grc-concern-icon svg {
          transition: transform .35s ease;
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
          color: rgba(255, 255, 255, .89);
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
          transition:
            transform .25s ease,
            box-shadow .25s ease,
            filter .25s ease;
        }

        .grc-concern:hover {
          transform: translateY(-5px);
          border-color: rgba(244, 201, 91, .75);
          box-shadow: 0 15px 32px rgba(60, 9, 24, .25);
        }

        .grc-concern:hover .grc-concern-icon svg:first-child {
          transform: translateY(-3px) rotate(-7deg);
        }

        .grc-concern:hover .grc-concern-icon svg:last-child {
          transform: translate(3px, 2px) rotate(7deg);
        }

        .grc-contact-link:hover {
          transform: translateY(-3px) scale(1.03);
          box-shadow: 0 7px 18px rgba(0, 0, 0, .22);
          filter: brightness(1.05);
        }

        /* ---------- SCROLL REVEAL ---------- */
        .grc .grc-reveal-up,
        .grc .grc-reveal-left,
        .grc .grc-reveal-right {
          opacity: 0;
          transition:
            opacity .8s ease,
            transform .8s cubic-bezier(.2, .75, .25, 1);
          will-change: opacity, transform;
        }

        .grc .grc-reveal-up    { transform: translateY(32px); }
        .grc .grc-reveal-left  { transform: translateX(-65px); }  /* left -> settle  */
        .grc .grc-reveal-right { transform: translateX(65px); }   /* right -> settle */

       .grc .grc-reveal-up.grc-reveal-visible,
.grc .grc-reveal-left.grc-reveal-visible,
.grc .grc-reveal-right.grc-reveal-visible {
  opacity: 1;
  transform: translate(0, 0);
}
        /* After entrance ends, restore fast hover transitions */
        .grc .grc-member.grc-reveal-done {
          will-change: auto;
          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease;
        }

        .grc .grc-concern.grc-reveal-done {
          will-change: auto;
          transition:
            transform .35s ease,
            box-shadow .35s ease,
            border-color .35s ease;
        }

        /* Hover must beat the reveal-visible transform */
        .grc .grc-member.grc-reveal-visible:hover  { transform: translateY(-5px); }
        .grc .grc-concern.grc-reveal-visible:hover { transform: translateY(-5px); }

/* ---------- RESPONSIVE ---------- */
@media (min-width: 1500px) {
  .grc-content { padding-top: 38px; }
}

@media (max-width: 760px) {
  .grc-container { width: calc(100% - 32px); }

  .grc-hero {
    min-height: 255px;
    padding: 110px 0 36px;
    background-position: 58% center;
  }

  .grc-layout { grid-template-columns: minmax(0, 1fr); }

  /* one card per row so names and badges have room */
  .grc-member-grid {
    grid-template-columns: minmax(0, 1fr);
    gap: 10px;
  }

  .grc-member.featured { grid-column: auto; }

  .grc-member {
    min-height: 66px;
    padding: 10px 12px;
  }

  .grc-member h3 {
    font-size: 13px;
    overflow-wrap: break-word;   /* wrap at spaces, not mid-word */
  }

  .grc-member p { font-size: 11px; }

  .grc-concern { padding: 23px; }
  .grc-concern-icon { margin-left: 0; }
  .grc-concern h2 { font-size: 24px; }
  .grc-contact-link { font-size: 11px; }

  .grc .grc-reveal-left  { transform: translateX(-40px); }
  .grc .grc-reveal-right { transform: translateX(40px); }
}

@media (max-width: 480px) {
  .grc-container { width: calc(100% - 28px); }

  .grc-hero {
    min-height: 245px;
    padding: 100px 0 32px;
  }

  .grc-hero h1 {
    font-size: 32px;
    letter-spacing: -.5px;
  }

  .grc-hero-description { font-size: 12px; }
  .grc-content { padding-top: 26px; }
  .grc-heading h2 { font-size: 26px; }
  .grc-heading p { font-size: 11px; }

  .grc-member { gap: 9px; }

  .grc-avatar,
  .grc-member.featured .grc-avatar {
    flex-basis: 34px;
    width: 34px;
    height: 34px;
  }

  .grc-role {
    padding: 4px 8px;
    font-size: 9px;
    white-space: nowrap;
  }

  .grc-concern { padding: 22px; }

  /* smaller slide distance so nothing pokes past the screen edge */
  .grc .grc-reveal-left  { transform: translateX(-24px); }
  .grc .grc-reveal-right { transform: translateX(24px); }
}
      `}</style>

      {/* Hero */}
      <section className="grc-hero" data-header-theme="dark">
        <div className="grc-container">
          <p className="grc-eyebrow">Student Support &amp; Governance</p>

          <h1>Grievance Redressal Committee</h1>

          <p className="grc-hero-description">
            A fair, impartial and transparent mechanism to hear and address
            student concerns, ensuring a safe, respectful and conducive
            learning environment.
          </p>

          <nav className="grc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/" aria-label="Home">
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
                  className={`grc-member ${member.featured ? 'featured' : ''}`}
                >
                  <div className="grc-avatar" aria-hidden="true">
                    <UserRound size={21} fill="currentColor" />
                  </div>

                  <div className="grc-member-divider" />

                  <div className="grc-member-copy">
                    <h3>{member.name}</h3>
                    <p>{member.role}</p>
                  </div>

                  {(member.featured || member.position === 'Co-ordinator') && (
                    <span className="grc-role">
                      {member.featured && <Crown size={12} fill="currentColor" />}
                      {member.position}
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