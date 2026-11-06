
import { useEffect, useRef } from 'react';
import { Link } from 'react-router-dom';
import {
  ArrowRight,
  ChevronRight,
  GraduationCap,
  ShieldCheck,
  UserRound,
  MessageCircle,
  CheckCircle2,
  Home,
  Shield,
} from 'lucide-react';

const committeeMembers = [
  {
    name: 'Mrs. V. Suvarnavani',
    designation: 'ASP & Head',
    position: 'Chair Person',
  },
  {
    name: 'Mrs. C. Shanthi',
    designation: 'AP',
    position: 'Member',
  },
  {
    name: 'Mrs. G. Geetha',
    designation: 'AP',
    position: 'Member',
  },
  {
    name: 'Mrs. A. Cecilia Susana',
    designation: 'AP',
    position: 'Member',
  },
  {
    name: 'Mrs. M. Meena',
    designation: 'AP',
    position: 'Member',
  },
  {
    name: 'Mrs. J. Jenit Chinna rani',
    designation: 'AP',
    position: 'Member',
  },
  {
    name: 'Ms. Devarapalli Lavanya',
    designation: 'II Year',
    position: 'Student Representative',
  },
  {
    name: 'Ms. Deepa Anuradha. A',
    designation: 'III Year',
    position: 'Student Representative',
  },
  {
    name: 'Ms. Viyanna Shiney',
    designation: 'III Year',
    position: 'Student Representative',
  },
];

const supportPoints = [
  'Confidential reporting of concerns',
  'Fair and impartial review',
  'Sensitive and respectful handling',
  'Appropriate action as per college policy',
];

export default function SexualHarassmentCommittee() {
  const pageRef = useRef<HTMLDivElement | null>(null);

  /* =========================================
     REPEATING SCROLL ANIMATION
  ========================================= */

  useEffect(() => {
    const page = pageRef.current;
    if (!page) return;

    const revealElements = page.querySelectorAll<HTMLElement>(
      '.shrc-hero-inner, .shrc-section-heading, .shrc-member, .shrc-support, .shrc-footer-inner > div, .shrc-footer-bottom'
    );

    revealElements.forEach((element, index) => {
      if (element.classList.contains('shrc-member')) {
        element.classList.add(
          index % 2 === 0
            ? 'shrc-reveal-left'
            : 'shrc-reveal-right'
        );

        element.style.setProperty(
          '--shrc-reveal-delay',
          `${(index % 4) * 90}ms`
        );
      } else if (element.classList.contains('shrc-support')) {
        element.classList.add('shrc-reveal-right');
      } else {
        element.classList.add('shrc-reveal-up');
      }
    });

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('shrc-reveal-visible');
          } else {
            element.classList.remove('shrc-reveal-visible');
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -35px 0px',
      }
    );

    revealElements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return (
    <div
      className="shrc-page"
      data-header-theme="light"
      ref={pageRef}
    >
      <style>{`
        .shrc-page {
          --shrc-maroon: #570d24;
          --shrc-deep: #350817;
          --shrc-gold: #e7b83f;
          --shrc-cream: #fffaf2;
          --shrc-text: #4a3040;

          width: 100%;
          padding-top: 72px;
          overflow: hidden;
          background: var(--shrc-cream);
          color: var(--shrc-text);
          font-family: Inter, Arial, sans-serif;
        }

        .shrc-page * {
          box-sizing: border-box;
        }

        .shrc-hero {
          position: relative;
          isolation: isolate;
          overflow: hidden;
          min-height: 300px;
          display: flex;
          align-items: center;
          background:
            radial-gradient(
              ellipse at 82% 10%,
              rgba(231,184,63,.14),
              transparent 36%
            ),
            linear-gradient(
              110deg,
              #390819 0%,
              #70182f 54%,
              #a17b78 100%
            );
        }

        .shrc-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          z-index: -1;
          opacity: .12;
          background-image:
            linear-gradient(
              135deg,
              transparent 45%,
              rgba(255,255,255,.25) 46%,
              transparent 47%
            );
          background-size: 36px 36px;
        }

        .shrc-hero-inner {
          width: min(1160px, calc(100% - 48px));
          margin: 0 auto;
          padding: 56px 0 48px;
        }

        .shrc-eyebrow {
          display: flex;
          align-items: center;
          gap: 12px;
          margin: 0 0 12px;
          color: var(--shrc-gold);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 2px;
          text-transform: uppercase;
        }

        .shrc-eyebrow::after {
          content: "";
          width: 38px;
          height: 1px;
          background: var(--shrc-gold);
        }

        .shrc-hero h1 {
          max-width: 850px;
          margin: 0;
          color: #fffaf1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(32px, 4.1vw, 54px);
          font-weight: 700;
          line-height: 1.1;
          letter-spacing: -.8px;
        }

        .shrc-hero-description {
          max-width: 650px;
          margin: 15px 0 0;
          color: rgba(255,250,241,.87);
          font-size: 14px;
          line-height: 1.85;
        }

        .shrc-breadcrumb {
          display: flex;
          align-items: center;
          flex-wrap: wrap;
          gap: 9px;
          margin-top: 22px;
          color: rgba(255,250,241,.72);
          font-size: 12px;
        }

        .shrc-breadcrumb a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #fffaf1;
          text-decoration: none;
          transition: color .2s ease;
        }

        .shrc-breadcrumb a:hover {
          color: var(--shrc-gold);
        }

        .shrc-breadcrumb-current {
          color: var(--shrc-gold);
        }

        .shrc-main {
          position: relative;
          padding: 42px 24px 48px;
          background:
            radial-gradient(
              ellipse at 50% 0%,
              rgba(231,184,63,.07),
              transparent 50%
            ),
            var(--shrc-cream);
        }

        .shrc-section-heading {
          max-width: 700px;
          margin: 0 auto 28px;
          text-align: center;
        }

        .shrc-heading-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          margin-bottom: 8px;
          color: var(--shrc-gold);
        }

        .shrc-heading-decoration span {
          width: 48px;
          height: 1px;
          background: var(--shrc-gold);
        }

        .shrc-section-heading h2 {
          margin: 0;
          color: var(--shrc-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(25px, 3vw, 34px);
          font-weight: 700;
        }

        .shrc-section-heading p {
          margin: 10px auto 0;
          color: #766575;
          font-size: 13px;
          line-height: 1.8;
        }

        .shrc-content-grid {
          display: grid;
          grid-template-columns: minmax(0, 1fr) 265px;
          align-items: stretch;
          gap: 20px;
          width: min(980px, 100%);
          margin: 0 auto;
        }

        .shrc-members {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          align-content: start;
          gap: 10px;
        }

        .shrc-member {
          display: flex;
          align-items: center;
          min-width: 0;
          min-height: 65px;
          gap: 12px;
          padding: 11px 12px;
          border: 1px solid #f0e0d1;
          border-radius: 11px;
          background: rgba(255,255,255,.78);
          box-shadow: 0 4px 12px rgba(71,26,34,.055);
          transition:
            transform .22s ease,
            border-color .22s ease,
            box-shadow .22s ease;
        }

        .shrc-member-chair {
          grid-column: 1 / -1;
          min-height: 76px;
          border-color: var(--shrc-gold);
          background: linear-gradient(
            110deg,
            #fff 0%,
            #fff6e6 100%
          );
        }

        .shrc-avatar {
          display: flex;
          flex: 0 0 39px;
          width: 39px;
          height: 39px;
          align-items: center;
          justify-content: center;
          border: 1px solid rgba(231,184,63,.65);
          border-radius: 50%;
          background: var(--shrc-maroon);
          color: var(--shrc-gold);
        }

        .shrc-member-chair .shrc-avatar {
          width: 44px;
          height: 44px;
          flex-basis: 44px;
        }

        .shrc-member-info {
          flex: 1;
          min-width: 0;
          padding-left: 10px;
          border-left: 1px solid var(--shrc-gold);
        }

        .shrc-member-info h3 {
          overflow-wrap: anywhere;
          margin: 0;
          color: var(--shrc-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 13px;
          font-weight: 700;
          line-height: 1.5;
        }

        .shrc-member-info p {
          margin: 3px 0 0;
          color: #766575;
          font-size: 11px;
          line-height: 1.4;
        }

        .shrc-role {
          flex-shrink: 0;
          align-self: center;
          padding: 5px 9px;
          border-radius: 20px;
          background: #f7e4b5;
          color: #653716;
          font-size: 9px;
          font-weight: 800;
          text-align: center;
        }

        .shrc-member-chair .shrc-role {
          display: inline-flex;
          align-items: center;
          gap: 4px;
          background: var(--shrc-gold);
          color: #3c190d;
        }

        .shrc-support {
          position: relative;
          display: flex;
          flex-direction: column;
          align-items: flex-start;
          overflow: hidden;
          min-height: 100%;
          padding: 25px 21px;
          border: 1px solid rgba(231,184,63,.4);
          border-radius: 13px;
          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(231,184,63,.16),
              transparent 35%
            ),
            linear-gradient(
              160deg,
              #79182f 0%,
              #4a0b20 100%
            );
          color: white;
        }

        .shrc-support::after {
          content: "ST. LOURDES";
          position: absolute;
          right: -8px;
          bottom: 8px;
          color: rgba(255,255,255,.045);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 25px;
          font-weight: 800;
          white-space: nowrap;
          pointer-events: none;
        }

        .shrc-support-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 54px;
          height: 54px;
          margin: 0 auto 18px;
          border: 1px solid rgba(231,184,63,.5);
          border-radius: 15px;
          color: var(--shrc-gold);
          background: rgba(255,255,255,.045);
        }

        .shrc-support h2 {
          margin: 0;
          color: #fffaf1;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 24px;
          line-height: 1.2;
        }

        .shrc-support-rule {
          width: 100%;
          height: 1px;
          margin: 15px 0;
          background: rgba(231,184,63,.6);
        }

        .shrc-support-description {
          margin: 0 0 15px;
          color: rgba(255,250,241,.9);
          font-size: 12px;
          line-height: 1.8;
        }

        .shrc-support-list {
          display: grid;
          gap: 12px;
          margin: 0 0 22px;
          padding: 0;
          list-style: none;
        }

        .shrc-support-list li {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          color: #fff5df;
          font-size: 11px;
          line-height: 1.5;
        }

        .shrc-support-list svg {
          flex: 0 0 15px;
          margin-top: 1px;
          color: var(--shrc-gold);
        }

        .shrc-contact-button {
          position: relative;
          z-index: 1;
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          width: 100%;
          margin-top: auto;
          padding: 12px 13px;
          border: 0;
          border-radius: 30px;
          background: linear-gradient(
            100deg,
            #f0c85d,
            #e1ad31
          );
          color: #3b160d;
          font-size: 11px;
          font-weight: 800;
          text-align: center;
          text-decoration: none;
          cursor: pointer;
          transition: transform .2s ease, box-shadow .2s ease;
        }

        .shrc-footer {
          border-top: 3px solid var(--shrc-gold);
          background: linear-gradient(
            110deg,
            #390819,
            #4e0b20
          );
          color: #fffaf1;
        }

        .shrc-footer-inner {
          display: grid;
          grid-template-columns: 1.2fr .8fr .9fr 1.1fr;
          gap: 28px;
          width: min(1060px, calc(100% - 48px));
          margin: 0 auto;
          padding: 35px 0 26px;
        }

        .shrc-footer-brand {
          display: flex;
          align-items: center;
          gap: 10px;
          margin-bottom: 12px;
        }

        .shrc-footer-logo {
          display: flex;
          flex: 0 0 40px;
          width: 40px;
          height: 40px;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--shrc-gold);
          border-radius: 50%;
          color: var(--shrc-gold);
        }

        .shrc-footer-brand strong {
          display: block;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
        }

        .shrc-footer-brand span {
          display: block;
          margin-top: 4px;
          color: var(--shrc-gold);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: 1.3px;
        }

        .shrc-footer p {
          margin: 0;
          color: rgba(255,250,241,.7);
          font-size: 11px;
          line-height: 1.8;
        }

        .shrc-footer h3 {
          margin: 5px 0 15px;
          color: var(--shrc-gold);
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
        }

        .shrc-footer-links {
          display: grid;
          gap: 10px;
        }

        .shrc-footer-links a {
          color: rgba(255,250,241,.8);
          font-size: 11px;
          text-decoration: none;
          transition: color .2s ease;
        }

        .shrc-footer-links a:hover {
          color: var(--shrc-gold);
        }

        .shrc-footer-bottom {
          display: flex;
          justify-content: space-between;
          gap: 12px;
          width: min(1060px, calc(100% - 48px));
          margin: 0 auto;
          padding: 15px 0;
          border-top: 1px solid rgba(255,255,255,.14);
          color: rgba(255,250,241,.65);
          font-size: 10px;
        }

        .shrc-footer-bottom a {
          color: rgba(255,250,241,.75);
          text-decoration: none;
        }

        @media (min-width: 1500px) {
          .shrc-hero-inner {
            width: min(1240px, calc(100% - 80px));
          }

          .shrc-content-grid {
            width: min(1080px, 100%);
          }
        }

        @media (max-width: 760px) {
          .shrc-hero {
            min-height: 285px;
          }

          .shrc-page {
            padding-top: 64px;
          }

          .shrc-hero-inner {
            width: calc(100% - 40px);
            padding: 48px 0 36px;
          }

          .shrc-hero h1 {
            font-size: clamp(30px, 7vw, 42px);
          }

          .shrc-hero-description {
            font-size: 13px;
          }

          .shrc-main {
            padding: 34px 18px 36px;
          }

          .shrc-content-grid {
            grid-template-columns: minmax(0, 1fr);
            gap: 18px;
          }

          .shrc-support {
            min-height: auto;
            padding: 24px;
          }

          .shrc-support h2 {
            font-size: 23px;
          }

          .shrc-support-icon {
            margin-left: 0;
          }

          .shrc-contact-button {
            width: auto;
            min-width: 210px;
          }

          .shrc-footer-inner {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 26px 20px;
            width: calc(100% - 40px);
          }

          .shrc-footer-bottom {
            width: calc(100% - 40px);
          }
        }

        @media (max-width: 480px) {
          .shrc-hero {
            min-height: 270px;
          }

          .shrc-hero-inner {
            width: calc(100% - 32px);
            padding: 40px 0 30px;
          }

          .shrc-eyebrow {
            font-size: 9px;
            letter-spacing: 1.5px;
          }

          .shrc-hero h1 {
            font-size: 32px;
          }

          .shrc-breadcrumb {
            gap: 6px;
            font-size: 10px;
          }

          .shrc-main {
            padding: 30px 14px;
          }

          .shrc-section-heading {
            margin-bottom: 22px;
          }

          .shrc-section-heading h2 {
            font-size: 27px;
          }

          .shrc-section-heading p {
            font-size: 12px;
          }

          .shrc-members {
            grid-template-columns: minmax(0, 1fr);
            gap: 9px;
          }

          .shrc-member-chair {
            grid-column: auto;
          }

          .shrc-member {
            min-height: 64px;
            padding: 10px;
          }

          .shrc-member-info h3 {
            font-size: 12px;
          }

          .shrc-member-info p {
            font-size: 10px;
          }

          .shrc-role {
            max-width: 108px;
            white-space: normal;
            font-size: 9px;
          }

          .shrc-support {
            padding: 22px 19px;
          }

          .shrc-footer-inner {
            grid-template-columns: minmax(0, 1fr) minmax(0, 1fr);
            gap: 24px 14px;
            width: calc(100% - 32px);
            padding: 28px 0 22px;
          }

          .shrc-footer-brand {
            align-items: flex-start;
          }

          .shrc-footer-brand strong {
            font-size: 13px;
          }

          .shrc-footer-brand span {
            font-size: 8px;
            letter-spacing: .7px;
          }

          .shrc-footer h3 {
            font-size: 14px;
          }

          .shrc-footer-bottom {
            flex-direction: column;
            width: calc(100% - 32px);
            line-height: 1.7;
          }
        }

        /* =========================================
           SCROLL REVEAL ANIMATIONS
        ========================================= */

        .shrc-page .shrc-reveal-left,
        .shrc-page .shrc-reveal-right,
        .shrc-page .shrc-reveal-up {
          opacity: 0;
          will-change: opacity, transform;
          transition:
            opacity .75s ease,
            transform .75s cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--shrc-reveal-delay, 0ms);
        }

        .shrc-page .shrc-reveal-left {
          transform: translateX(-55px);
        }

        .shrc-page .shrc-reveal-right {
          transform: translateX(55px);
        }

        .shrc-page .shrc-reveal-up {
          transform: translateY(35px);
        }

        .shrc-page .shrc-reveal-visible {
          opacity: 1;
          transform: translate3d(0,0,0);
        }

        /* =========================================
           MEMBER CARD HOVER ANIMATION
        ========================================= */

        .shrc-page .shrc-member {
          position: relative;
          overflow: hidden;
          transition:
            transform .3s ease,
            border-color .3s ease,
            box-shadow .3s ease,
            background .3s ease;
        }

        .shrc-page .shrc-member::before {
          content: "";
          position: absolute;
          inset: 0 auto 0 0;
          width: 3px;
          background: var(--shrc-gold);
          transform: scaleY(0);
          transform-origin: bottom;
          transition: transform .3s ease;
        }

        .shrc-page .shrc-member:hover::before {
          transform: scaleY(1);
        }

        .shrc-page .shrc-member:hover {
          transform: translateY(-5px);
          border-color: var(--shrc-gold);
          box-shadow: 0 12px 24px rgba(71,26,34,.13);
        }

        .shrc-page .shrc-avatar {
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .shrc-page .shrc-member:hover .shrc-avatar {
          transform: scale(1.08) rotate(-5deg);
          box-shadow: 0 5px 13px rgba(231,184,63,.2);
        }

        .shrc-page .shrc-role {
          transition: transform .25s ease, box-shadow .25s ease;
        }

        .shrc-page .shrc-member:hover .shrc-role {
          transform: scale(1.05);
          box-shadow: 0 4px 10px rgba(71,26,34,.1);
        }

        .shrc-page .shrc-member-chair:hover {
          background: linear-gradient(110deg,#fff 0%,#fff1d5 100%);
        }

        /* =========================================
           SUPPORT PANEL HOVER ANIMATION
        ========================================= */

        .shrc-page .shrc-support {
          transition: transform .35s ease, box-shadow .35s ease;
        }

        .shrc-page .shrc-support:hover {
          transform: translateY(-5px);
          box-shadow: 0 17px 32px rgba(53,8,23,.18);
        }

        .shrc-page .shrc-support-icon {
          transition: transform .35s ease, background .35s ease;
        }

        .shrc-page .shrc-support:hover .shrc-support-icon {
          transform: translateY(-4px) rotate(-5deg);
          background: rgba(255,255,255,.1);
        }

        .shrc-page .shrc-contact-button:hover {
          transform: translateY(-3px) scale(1.02);
          box-shadow: 0 5px 16px rgba(231,184,63,.22);
        }

        /* =========================================
           FOOTER LINK HOVER
        ========================================= */

        .shrc-page .shrc-footer-links a {
          display: inline-block;
          transition: color .25s ease, transform .25s ease;
        }

        .shrc-page .shrc-footer-links a:hover {
          transform: translateX(5px);
        }

        /* =========================================
           MOBILE + ACCESSIBILITY
        ========================================= */

        @media (max-width: 600px) {
          .shrc-page .shrc-reveal-left {
            transform: translateX(-25px);
          }

          .shrc-page .shrc-reveal-right {
            transform: translateX(25px);
          }

          .shrc-page .shrc-reveal-up {
            transform: translateY(22px);
          }
        }

        @media (prefers-reduced-motion: reduce) {
          .shrc-page .shrc-reveal-left,
          .shrc-page .shrc-reveal-right,
          .shrc-page .shrc-reveal-up {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .shrc-page .shrc-member,
          .shrc-page .shrc-support,
          .shrc-page .shrc-contact-button,
          .shrc-page .shrc-avatar,
          .shrc-page .shrc-role {
            transition: none;
          }
        }
      `}</style>

      {/* Hero section */}
      <section className="shrc-hero">
        <div className="shrc-hero-inner">
          <p className="shrc-eyebrow">
            Student Support &amp; Governance
          </p>

          <h1>Sexual Harassment Redressal Committee</h1>

          <p className="shrc-hero-description">
            A safe, respectful and inclusive campus environment
            where concerns related to sexual harassment are
            addressed with fairness, sensitivity and confidentiality.
          </p>

          <nav className="shrc-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">
              <Home size={13} />
              Home
            </Link>

            <ChevronRight size={13} />

            <Link to="/about">About Us</Link>

            <ChevronRight size={13} />

            <span className="shrc-breadcrumb-current">
              Sexual Harassment Redressal Committee
            </span>
          </nav>
        </div>
      </section>

      {/* Committee section */}
      <main className="shrc-main">
        <div className="shrc-section-heading">
          <div className="shrc-heading-decoration">
            <span />
            <GraduationCap size={24} />
            <span />
          </div>

          <h2>Committee Members</h2>

          <p>
            Meet the members responsible for supporting a safe,
            respectful and inclusive environment for women and
            students at ST. Lourdes Engineering College.
          </p>
        </div>

        <div className="shrc-content-grid">
          {/* Member cards */}
          <div className="shrc-members">
            {committeeMembers.map((member) => {
              const isChair = member.position === 'Chair Person';

              return (
                <article
                  key={member.name}
                  className={`shrc-member ${
                    isChair ? 'shrc-member-chair' : ''
                  }`}
                >
                  <div className="shrc-avatar" aria-hidden="true">
                    <UserRound size={22} fill="currentColor" />
                  </div>

                  <div className="shrc-member-info">
                    <h3>{member.name}</h3>
                    <p>{member.designation}</p>
                  </div>

                  <span className="shrc-role">
                    {isChair ? (
                      <>
                        <ShieldCheck size={11} />
                        Chair Person
                      </>
                    ) : (
                      member.position
                    )}
                  </span>
                </article>
              );
            })}
          </div>

          {/* Confidential support panel */}
          <aside className="shrc-support">
            <div className="shrc-support-icon">
              <Shield size={31} strokeWidth={1.5} />
            </div>

            <h2>Confidential Support</h2>

            <div className="shrc-support-rule" />

            <p className="shrc-support-description">
              Every student deserves to feel safe and respected.
              Concerns related to sexual harassment should be
              handled sensitively, fairly and confidentially.
            </p>

            <ul className="shrc-support-list">
              {supportPoints.map((point) => (
                <li key={point}>
                  <CheckCircle2 size={15} />
                  <span>{point}</span>
                </li>
              ))}
            </ul>

            <Link
              to="/contact"
              className="shrc-contact-button"
            >
              Contact the Committee
              <ArrowRight size={15} />
            </Link>
          </aside>
        </div>
      </main>

      
    </div>
  );
}
