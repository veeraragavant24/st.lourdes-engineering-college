
import { useEffect, useRef, useState } from "react";
import {
  Landmark,
  Users,
  Network,
  MessageSquare,
  ShieldCheck,
  HeartHandshake,
  Scale,
  Award,
  GraduationCap,
  ArrowRight,
  Home,
  FileText,
  CheckCircle2,
  CalendarDays,
  UserRound,
  Info,
  ClipboardList,
  BookOpen,
  ChevronRight,
} from "lucide-react";

/* =========================================
   DISCLOSURE CATEGORY DATA
========================================= */

const sections = [
  {
    id: "institution",
    number: "01",
    title: "Institutional Details",
    description: "Institution profile, management, principal and affiliation",
    icon: Landmark,
  },
  {
    id: "approval",
    number: "02",
    title: "AICTE Approval & Affiliation",
    description: "Approval letters, affiliation and sanctioned intake",
    icon: FileText,
  },
  {
    id: "governance",
    number: "03",
    title: "Governance",
    description: "Board meetings, faculty and student participation",
    icon: Users,
  },
  {
    id: "organization",
    number: "04",
    title: "Organizational Chart",
    description: "Institutional hierarchy and department responsibilities",
    icon: Network,
  },
  {
    id: "grievance",
    number: "05",
    title: "Grievance Redressal",
    description: "Grievance committees and complaint resolution",
    icon: MessageSquare,
  },
  {
    id: "anti",
    number: "06",
    title: "Anti-Ragging Committee",
    description: "Anti-ragging committee, squad and student protection",
    icon: ShieldCheck,
  },
  {
    id: "icc",
    number: "07",
    title: "Internal Complaints Committee (ICC)",
    description: "Women's safety and complaint handling",
    icon: HeartHandshake,
  },
  {
    id: "scst",
    number: "08",
    title: "SC/ST & Equal Opportunity",
    description: "Student welfare, inclusion and equal opportunity",
    icon: Scale,
  },
  {
    id: "iqac",
    number: "09",
    title: "Internal Quality Assurance Cell",
    description: "IQAC objectives, strategies and quality initiatives",
    icon: Award,
  },
  {
    id: "programmes",
    number: "10",
    title: "Programmes & Best Practices",
    description: "Approved programmes, intake and institutional practices",
    icon: GraduationCap,
  },
];

/* =========================================
   COMMITTEE DATA
========================================= */

const grievanceMembers = [
  ["1", "Dr. Suresh Mohan Kumar P", "Principal", "Chair Person"],
  ["2", "Mrs. Suvarnavani V", "Associate Professor", "Head of Committee"],
  [
    "3",
    "Mr. Paul Barnabas C",
    "Tamil Nadu Consumer Protection Organization",
    "Member",
  ],
  ["4", "Dr. Panneerselvam TD", "Madras High Court Lawyer", "Member"],
  ["5", "Mr. Sivamurugan J", "Head of the Department", "Member"],
];

const committeeMembers = [
  ["1", "Principal", "Chairperson"],
  ["2", "Senior Faculty Member", "Coordinator"],
  ["3", "Faculty Representative", "Member"],
];

/* =========================================
   MAIN COMPONENT
========================================= */

export default function MandatoryDisclosure() {
  const [selected, setSelected] = useState("institution");
  const detailRef = useRef<HTMLDivElement>(null);

  const current = sections.find((item) => item.id === selected);
  const CurrentIcon = current?.icon || FileText;

  /* REPEAT SCROLL REVEAL ANIMATION */

  useEffect(() => {
    const elements = document.querySelectorAll(".md-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("md-visible");
          } else {
            entry.target.classList.remove("md-visible");
          }
        });
      },
      {
        threshold: 0.08,
        rootMargin: "0px 0px -25px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [selected]);

  /* CATEGORY SELECTION */

  const selectSection = (id: string) => {
    setSelected(id);

    window.setTimeout(() => {
      detailRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }, 120);
  };

  return (
    <main className="mandatory-page">

      <style>{`

        /* =====================================
           GLOBAL STYLES
        ===================================== */

        .mandatory-page {
          --md-maroon: #590c26;
          --md-deep: #68132e;
          --md-red: #8c1d3d;
          --md-gold: #c99735;
          --md-cream: #fffaf5;
          --md-border: #eadbd0;

          width: 100%;
          overflow: hidden;
          background: var(--md-cream);
          color: #402b31;
          font-family: inherit;
          position: relative;
          isolation: isolate;
        }

        .mandatory-page * {
          box-sizing: border-box;
        }

        .md-container {
          width: min(94%, 1500px);
          margin: 0 auto;
        }

        /* =====================================
           HERO SECTION
        ===================================== */

        .md-hero {
          position: relative;
          z-index: 0;
          min-height: 255px;
          display: flex;
          align-items: center;
          overflow: hidden;

          background:
            linear-gradient(
              105deg,
              rgba(61, 5, 25, .98) 0%,
              rgba(91, 10, 39, .95) 42%,
              rgba(112, 19, 52, .86) 72%,
              rgba(83, 12, 36, .84) 100%
            ),
            url("/images/mandatory-disclosure-banner.jpg")
              center 48% / cover no-repeat,
            linear-gradient(120deg, #3d0519, #8b1d42);
        }

        .md-hero::before {
          content: "";
          position: absolute;
          inset: 0;
          pointer-events: none;

          background:
            radial-gradient(
              ellipse at 82% 22%,
              rgba(255, 218, 151, .16),
              transparent 36%
            ),
            linear-gradient(
              90deg,
              rgba(35, 0, 13, .18),
              transparent 68%
            );

          z-index: 1;
        }

        .md-hero-inner {
          position: relative;
          z-index: 3;

          width: min(92%, 1400px);
          margin: 0 auto;

          display: flex;
          align-items: center;
          gap: 25px;

          /* Space for the transparent navbar */
          padding: 105px 0 58px;
        }

        .md-hero-icon {
          color: #f1c64f;
          display: flex;
          align-items: center;
          justify-content: center;
          min-width: 78px;

          filter: drop-shadow(0 5px 12px rgba(0,0,0,.18));
        }

        .md-hero-label {
          display: block;
          color: #f5d16f;
          font-size: 12px;
          font-weight: 800;
          letter-spacing: 3px;
          margin-bottom: 9px;
          text-transform: uppercase;
        }

        .md-hero-content {
          min-width: 0;
          max-width: 850px;
        }

        .md-hero-content h1 {
          color: #fffaf5;

          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(34px, 4.3vw, 56px);
          line-height: 1.08;
          font-weight: 700;
          letter-spacing: -.8px;

          margin: 0 0 9px;

          text-shadow: 0 3px 18px rgba(0,0,0,.2);
        }

        .md-hero-content p {
          color: rgba(255,241,235,.92);
          font-size: 14px;
          line-height: 1.6;
          letter-spacing: .15px;
          margin: 0;
        }

        /* GOLD CURVE */

        /* STRAIGHT GOLD LINE */

.md-hero::after {
  content: "";
  position: absolute;
  z-index: 2;
  left: 0;
  right: 0;
  bottom: 0;
  height: 5px;

  background: linear-gradient(
    90deg,
    #b77b20,
    #f1cf78,
    #b77b20
  );

  clip-path: none;
}

/* REMOVE THE CURVED BOTTOM SHAPE */

.md-hero-bottom {
  display: none;
}

        .md-hero-bottom {
          position: absolute;
          z-index: 2;
          bottom: -1px;
          left: 0;
          width: 100%;
          height: 20px;
          background: var(--md-cream);

          clip-path: polygon(
            0 100%,
            0 90%,
            34% 90%,
            54% 23%,
            76% 36%,
            100% 90%,
            100% 100%
          );

          pointer-events: none;
        }

        /* HERO ENTRANCE */

        .md-hero-icon,
        .md-hero-content {
          animation: md-hero-enter .85s cubic-bezier(.2,.75,.25,1) both;
        }

        .md-hero-content {
          animation-delay: .08s;
        }

        @keyframes md-hero-enter {
          from {
            opacity: 0;
            transform: translateY(14px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        /* =====================================
           BREADCRUMB
        ===================================== */

        .md-breadcrumb {
          background: linear-gradient(90deg, #76132f, #971f43);
          color: #fff;
          padding: 10px 0;
          font-size: 12px;
        }

        .md-breadcrumb .md-container {
          display: flex;
          align-items: center;
          gap: 9px;
        }

        .md-breadcrumb strong {
          color: #ffe4a3;
        }

        /* =====================================
           MAIN CONTENT
        ===================================== */

        .md-main {
          padding-top: 25px;
          padding-bottom: 25px;
        }

        .md-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 20px;
          margin-bottom: 23px;
        }

        .md-heading-left {
          display: flex;
          align-items: center;
          gap: 17px;
        }

        .md-heading-line {
          width: 9px;
          height: 55px;
          border-radius: 20px;

          background: linear-gradient(
            #e6b43e,
            #bd8219
          );

          flex-shrink: 0;
        }

        .md-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(23px, 3vw, 32px);
          color: #68132e;
          margin: 0 0 4px;
        }

        .md-heading p {
          font-size: 14px;
          color: #66545a;
          margin: 0;
        }

        .md-count {
          display: flex;
          align-items: center;
          gap: 10px;

          padding: 12px 17px;

          background: linear-gradient(
            135deg,
            #fff1d4,
            #ffe1a8
          );

          border: 1px solid #f0d29a;
          border-radius: 12px;

          color: #72142f;
          font-weight: 800;
          font-size: 13px;
          white-space: nowrap;

          box-shadow: 0 3px 8px rgba(91,38,20,.1);
        }

        /* =====================================
           CATEGORY LANDSCAPE CARDS
        ===================================== */

        .md-section-grid {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 11px 13px;
          margin-bottom: 20px;
        }

        .md-section-card {
          position: relative;

          min-height: 80px;
          width: 100%;

          display: flex;
          align-items: center;
          gap: 17px;

          padding: 12px 46px 12px 19px;

          text-align: left;

          border: 1px solid #e6d8cf;
          border-radius: 14px;

          background: linear-gradient(
            120deg,
            #fff,
            #fffaf6
          );

          color: #68132e;
          cursor: pointer;
          overflow: hidden;

          box-shadow: 0 3px 7px rgba(81,35,38,.045);

          transition:
            background .35s ease,
            border-color .35s ease,
            transform .35s ease,
            box-shadow .35s ease;
        }

        .md-section-card:hover {
          transform: translateY(-3px);
          border-color: #c79b48;
          box-shadow: 0 8px 18px rgba(91,23,45,.1);
        }

        .md-section-card.active {
          background: linear-gradient(
            115deg,
            #590c26,
            #8a183b
          );

          border: 2px solid #d9ad4c;

          box-shadow: 0 6px 18px rgba(87,12,37,.17);
          color: #fff;
        }

        .md-card-icon {
          width: 69px;
          height: 55px;
          min-width: 69px;

          display: flex;
          align-items: center;
          justify-content: center;

          border-radius: 15px;

          background: linear-gradient(
            135deg,
            #fff0db,
            #ffead1
          );

          color: #74132f;
          transition: .3s ease;
        }

        .md-card-content {
          flex: 1;
          min-width: 0;
        }

        .md-card-content h3 {
          font-family: Georgia, "Times New Roman", serif;
          color: inherit;
          font-size: 17px;
          line-height: 1.3;
          font-weight: 700;
          margin: 0 0 5px;
        }

        .md-card-content p {
          color: #65535a;
          font-size: 12px;
          line-height: 1.45;
          margin: 0;
        }

        .md-section-card.active .md-card-content p {
          color: #f7e4e8;
        }

        .md-card-number {
          position: absolute;
          top: 9px;
          right: 15px;
          color: #b47712;
          font-size: 16px;
          font-weight: 800;
        }

        .md-section-card.active .md-card-number {
          color: #f2cf69;
        }

        .md-card-arrow {
          position: absolute;
          right: 15px;
          bottom: 12px;

          width: 27px;
          height: 27px;

          border: 1.5px solid #bd801d;
          border-radius: 50%;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #a56b11;
          transition: .3s ease;
        }

        .md-section-card.active .md-card-arrow {
          color: #f2cf69;
          border-color: #f2cf69;
          transform: rotate(-45deg);
        }

        /* =====================================
           DETAIL PANEL
        ===================================== */

        .md-detail-panel {
          padding: 22px 25px;

          border: 1px solid #e4c9b8;
          border-radius: 15px;

          background:
            radial-gradient(
              circle at 100% 0%,
              rgba(205,153,72,.07),
              transparent 32%
            ),
            linear-gradient(
              135deg,
              #fffefa,
              #fffaf5
            );

          box-shadow: 0 5px 17px rgba(81,35,38,.045);

          animation: md-panel-enter .5s ease both;
        }

        @keyframes md-panel-enter {
          from {
            opacity: 0;
            transform: translateY(17px);
          }

          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .md-detail-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
        }

        .md-detail-eyebrow {
          color: #aa721b;
          font-size: 12px;
          letter-spacing: 1.3px;
          font-weight: 800;
          display: block;
          margin-bottom: 5px;
        }

        .md-detail-heading h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(24px, 3vw, 34px);
          color: #68132e;
          margin: 0;
          line-height: 1.2;
        }

        .md-detail-icon {
          width: 68px;
          height: 62px;
          min-width: 68px;

          display: flex;
          align-items: center;
          justify-content: center;

          background: #fff0e2;
          border: 1px solid #efd5c2;
          border-radius: 13px;

          color: #74142f;
        }

        .md-detail-divider {
          height: 1px;
          background: linear-gradient(90deg, #d29c39, #e8d6c6);
          margin: 15px 0;
        }

        .md-content-body {
          display: flex;
          flex-direction: column;
          gap: 15px;
        }

        .md-subheading {
          color: #74132e;

          background: linear-gradient(
            90deg,
            #fff0e7,
            #f4e0d8
          );

          border-radius: 8px;
          padding: 7px 13px;

          font-family: Georgia, "Times New Roman", serif;
          font-size: 18px;
          margin: 0;
        }

        .md-check-list {
          display: flex;
          flex-direction: column;
          gap: 7px;
          padding: 2px 12px;
        }

        .md-check-item {
          display: flex;
          align-items: center;
          gap: 10px;
          color: #32252a;
          font-size: 14px;
        }

        .md-check-item svg {
          color: #c78a20;
          fill: #c78a20;
          stroke: #fff;
          flex-shrink: 0;
        }

        .md-info-grid {
          display: grid;
          grid-template-columns: repeat(4, minmax(0, 1fr));
          gap: 12px;
          margin-top: 3px;
        }

        .md-info-card {
          min-height: 105px;
          padding: 15px;

          display: flex;
          align-items: flex-start;
          gap: 12px;

          background: linear-gradient(
            135deg,
            #fff8ef,
            #fff2e6
          );

          border: 1px solid #ebd1b3;
          border-radius: 11px;
          color: #79152f;
        }

        .md-info-card svg {
          flex-shrink: 0;
        }

        .md-info-card div {
          display: flex;
          flex-direction: column;
          gap: 9px;
        }

        .md-info-card span {
          color: #a66a19;
          font-weight: 700;
          font-size: 12px;
        }

        .md-info-card strong {
          color: #68132e;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 15px;
          line-height: 1.4;
        }

        .md-information-note {
          display: flex;
          align-items: flex-start;
          gap: 10px;

          border-top: 1px solid #eee0d5;
          padding-top: 12px;

          color: #a06c17;
        }

        .md-information-note p {
          color: #76636a;
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        /* =====================================
           GOVERNANCE
        ===================================== */

        .md-governance-card {
          display: flex;
          align-items: flex-start;
          gap: 15px;

          padding: 13px;

          border: 1px solid #f0e1d5;
          border-radius: 11px;

          background: #fffdf9;
        }

        .md-governance-icon {
          width: 48px;
          height: 48px;
          min-width: 48px;

          border-radius: 10px;

          background: #fff0d9;

          display: flex;
          align-items: center;
          justify-content: center;

          color: #8a1838;
        }

        .md-governance-card h4 {
          color: #64122a;
          font-size: 14px;
          font-weight: 750;
          margin: 2px 0 5px;
        }

        .md-governance-card p {
          color: #3f3436;
          font-size: 13px;
          line-height: 1.65;
          margin: 0;
        }

        .md-governance-table-content {
          min-width: 0;
          flex: 1;
        }

        /* =====================================
           TABLES
        ===================================== */

        .md-table-wrap {
          width: 100%;
          overflow-x: auto;

          border: 1px solid #ead7c8;
          border-radius: 8px;
        }

        .md-table {
          width: 100%;
          border-collapse: collapse;
          font-size: 12px;
          min-width: 550px;
        }

        .md-table thead {
          background: linear-gradient(90deg, #640e29, #8c1d3d);
          color: #fff;
        }

        .md-table th {
          padding: 10px 12px;
          text-align: left;
          font-weight: 700;
          text-transform: uppercase;
          font-size: 11px;
        }

        .md-table td {
          padding: 10px 12px;
          color: #392b30;
          border-bottom: 1px solid #eadbd1;
          line-height: 1.5;
        }

        .md-table tbody tr:nth-child(even) {
          background: #fff5ed;
        }

        .md-table tbody tr:last-child td {
          border-bottom: 0;
        }

        /* =====================================
           ORGANIZATIONAL CHART
        ===================================== */

        .md-org-chart {
          padding: 20px 12px;

          border: 1px solid #ead9c9;
          border-radius: 12px;

          background: #fffaf4;

          display: flex;
          flex-direction: column;
          align-items: center;

          overflow-x: auto;
        }

        .md-org-node {
          padding: 10px 18px;
          border-radius: 7px;
          border: 1px solid #bd8b43;

          text-align: center;
          font-size: 12px;
          font-weight: 700;
          min-width: 145px;
        }

        .md-org-node.main {
          background: linear-gradient(90deg, #650f2b, #92213e);
          color: white;
          border-color: #650f2b;
        }

        .md-org-node.highlight {
          background: #fff1e8;
          color: #68132e;
        }

        .md-org-connector {
          height: 19px;
          width: 2px;
          background: #a96d2d;
        }

        .md-org-principal-row {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 25px;
          width: 100%;
        }

        .md-org-departments {
          display: grid;
          grid-template-columns: repeat(7, minmax(105px, 1fr));
          gap: 9px;
          width: 100%;
        }

        .md-org-node.department {
          min-width: 0;
          padding: 12px 7px;
          background: #fff0e3;
          color: #64122a;
          font-size: 11px;
        }

        /* =====================================
           FEATURE CARDS
        ===================================== */

        .md-description {
          color: #625156;
          font-size: 14px;
          line-height: 1.7;
          margin: 0;
        }

        .md-section-subtitle {
          color: #68132e;
          font-size: 15px;
          margin: 4px 0 0;
        }

        .md-feature-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .md-feature-card {
          background: linear-gradient(135deg, #fff8ef, #fff1e6);
          border: 1px solid #ead6c4;
          border-radius: 11px;
          padding: 18px;
          color: #821a37;
        }

        .md-feature-card h4 {
          color: #68132e;
          font-size: 14px;
          margin: 10px 0 5px;
        }

        .md-feature-card p {
          color: #75636a;
          font-size: 12px;
          line-height: 1.6;
          margin: 0;
        }

        .md-feature-card a {
          display: inline-flex;
          align-items: center;
          gap: 6px;
          color: #811a39;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
          margin-top: 12px;
        }

        /* =====================================
           FOOTER
        ===================================== */

        .md-footer {
          display: flex;
          align-items: center;
          gap: 18px;
          padding: 23px 10px 12px;
          color: #665158;
          font-size: 12px;
        }

        .md-footer-line {
          flex: 1;
          height: 1px;
          background: linear-gradient(90deg, #d9a64b, #eadbd0);
        }

        .md-footer strong {
          color: #87501b;
          letter-spacing: 1.4px;
          font-size: 12px;
        }

        /* =====================================
           SCROLL REVEAL ANIMATION
        ===================================== */

        .md-reveal {
          opacity: 0;
          will-change: transform, opacity;

          transition:
            opacity .85s ease,
            transform 1s cubic-bezier(.2,.75,.25,1);
        }

        .md-reveal[data-direction="left"] {
          transform: translateX(-45px);
        }

        .md-reveal[data-direction="right"] {
          transform: translateX(45px);
        }

        .md-reveal.md-visible {
          opacity: 1;
          transform: translateX(0);
        }

        /* =====================================
           TABLET RESPONSIVE
        ===================================== */

        @media(max-width: 1000px) {

          .md-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .md-org-departments {
            grid-template-columns: repeat(4, minmax(110px, 1fr));
          }
        }

        /* =====================================
           MOBILE RESPONSIVE
        ===================================== */

        @media(max-width: 700px) {

          .md-container {
            width: 93%;
          }

          .md-hero {
            min-height: 220px;
            background-position: center;
          }

          .md-hero-inner {
            width: 91%;
            gap: 9px;
            align-items: center;
            padding: 88px 0 48px;
          }

          .md-hero-icon {
            min-width: 35px;
          }

          .md-hero-icon svg {
            width: 32px;
            height: 32px;
          }

          .md-hero-label {
            font-size: 9px;
            letter-spacing: 1.8px;
            line-height: 1.5;
            margin-bottom: 7px;
          }

          .md-hero-content h1 {
            font-size: clamp(23px, 6.8vw, 30px);
            line-height: 1.12;
          }

          .md-hero-content p {
            font-size: 10px;
            line-height: 1.5;
          }

          .md-heading {
            align-items: flex-start;
            flex-direction: column;
            gap: 13px;
          }

          .md-heading-line {
            height: 46px;
            width: 6px;
          }

          .md-count {
            margin-left: 22px;
            padding: 9px 13px;
          }

          .md-section-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .md-section-card {
            min-height: 78px;
            padding: 11px 44px 11px 12px;
            gap: 12px;
          }

          .md-card-icon {
            width: 54px;
            min-width: 54px;
            height: 51px;
          }

          .md-card-icon svg {
            width: 27px;
            height: 27px;
          }

          .md-card-content h3 {
            font-size: 14px;
          }

          .md-card-content p {
            font-size: 11px;
          }

          .md-card-number {
            right: 11px;
            top: 7px;
            font-size: 13px;
          }

          .md-card-arrow {
            right: 10px;
            bottom: 9px;
            width: 23px;
            height: 23px;
          }

          .md-detail-panel {
            padding: 17px 13px;
          }

          .md-detail-heading h2 {
            font-size: 23px;
          }

          .md-detail-icon {
            width: 48px;
            height: 48px;
            min-width: 48px;
          }

          .md-detail-icon svg {
            width: 29px;
            height: 29px;
          }

          .md-info-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
            gap: 8px;
          }

          .md-info-card {
            padding: 11px;
            flex-direction: column;
            gap: 8px;
            min-height: 120px;
          }

          .md-info-card strong {
            font-size: 13px;
          }

          .md-governance-card {
            gap: 10px;
            padding: 10px;
          }

          .md-governance-icon {
            width: 38px;
            min-width: 38px;
            height: 38px;
          }

          .md-governance-icon svg {
            width: 22px;
            height: 22px;
          }

          .md-governance-card h4 {
            font-size: 12px;
          }

          .md-governance-card p {
            font-size: 11px;
          }

          .md-feature-grid {
            grid-template-columns: 1fr;
          }

          .md-org-chart {
            align-items: stretch;
          }

          .md-org-node.main {
            align-self: center;
          }

          .md-org-principal-row {
            flex-direction: column;
            gap: 10px;
          }

          .md-org-departments {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }

          .md-footer {
            flex-wrap: wrap;
            gap: 8px;
          }

          .md-footer-line {
            min-width: 30px;
          }

          .md-footer strong {
            font-size: 9px;
          }
        }

        @media(max-width: 380px) {

          .md-hero-content h1 {
            font-size: 24px;
          }

          .md-info-grid {
            grid-template-columns: 1fr;
          }

          .md-heading h2 {
            font-size: 22px;
          }
        }

        /* ACCESSIBILITY */

        @media(prefers-reduced-motion: reduce) {

          .md-reveal,
          .md-section-card {
            transition: none !important;
          }

          .md-reveal {
            opacity: 1;
            transform: none !important;
          }
        }

      `}</style>

      {/* =====================================
          HERO SECTION
      ===================================== */}

      <section className="md-hero">

        <div className="md-hero-inner">

          <div className="md-hero-icon">
            <FileText size={58} strokeWidth={1.5} />
          </div>

          <div className="md-hero-content">

            <span className="md-hero-label">
              REGULATORY INFORMATION
            </span>

            <h1>
              Mandatory Disclosure
            </h1>

            <p>
              Transparency · Governance · Institutional Information
            </p>

          </div>

        </div>

        <div className="md-hero-bottom" />

      </section>

      {/* =====================================
          BREADCRUMB
      ===================================== */}

      <div className="md-breadcrumb">

        <div className="md-container">

          <Home size={14} />

          <span>Home</span>

          <ChevronRight size={13} />

          <span>About Us</span>

          <ChevronRight size={13} />

          <strong>Mandatory Disclosure</strong>

        </div>

      </div>

      {/* =====================================
          MAIN CONTENT
      ===================================== */}

      <section className="md-main md-container">

        {/* PAGE HEADING */}

        <div
          className="md-heading md-reveal"
          data-direction="left"
        >

          <div className="md-heading-left">

            <span className="md-heading-line" />

            <div>
              <h2>Explore Disclosure Sections</h2>

              <p>
                Select a category to view its information below.
              </p>
            </div>

          </div>

          <div className="md-count">
            <ClipboardList size={23} />
            <span>10 SECTIONS</span>
          </div>

        </div>

        {/* =====================================
            TEN LANDSCAPE CATEGORY CARDS
        ===================================== */}

        <div className="md-section-grid">

          {sections.map((section, index) => {

            const Icon = section.icon;
            const active = selected === section.id;

            return (

              <button
                type="button"
                key={section.id}
                className={`md-section-card md-reveal ${
                  active ? "active" : ""
                }`}
                data-direction={
                  index % 2 === 0 ? "left" : "right"
                }
                onClick={() => selectSection(section.id)}
                aria-pressed={active}
              >

                <div className="md-card-icon">
                  <Icon size={34} strokeWidth={1.9} />
                </div>

                <div className="md-card-content">

                  <h3>{section.title}</h3>

                  <p>{section.description}</p>

                </div>

                <div className="md-card-number">
                  {section.number}
                </div>

                <div className="md-card-arrow">
                  <ArrowRight size={19} />
                </div>

              </button>

            );

          })}

        </div>

        {/* =====================================
            SELECTED DISCLOSURE CONTENT
        ===================================== */}

        <section
          className="md-detail-panel md-reveal"
          data-direction="right"
          ref={detailRef}
          key={selected}
        >

          <div className="md-detail-heading">

            <div>

              <span className="md-detail-eyebrow">
                SELECTED DISCLOSURE · {current?.number}
              </span>

              <h2>{current?.title}</h2>

            </div>

            <div className="md-detail-icon">
              <CurrentIcon size={43} strokeWidth={1.8} />
            </div>

          </div>

          <div className="md-detail-divider" />

          {selected === "institution" && <InstitutionDetails />}

          {selected === "approval" && <ApprovalDetails />}

          {selected === "governance" && <GovernanceDetails />}

          {selected === "organization" && <OrganizationalChart />}

          {selected === "grievance" && <GrievanceDetails />}

          {selected === "anti" && <AntiRaggingDetails />}

          {selected === "icc" && <ICCDetails />}

          {selected === "scst" && <SCSTDetails />}

          {selected === "iqac" && <IQACDetails />}

          {selected === "programmes" && <ProgrammesDetails />}

        </section>

        {/* =====================================
            FOOTER
        ===================================== */}

        <div
          className="md-footer md-reveal"
          data-direction="left"
        >

          <span>ST. Lourdes Engineering College</span>

          <div className="md-footer-line" />

          <strong>MANDATORY DISCLOSURE</strong>

        </div>

      </section>

    </main>
  );
}

/* =========================================
   INSTITUTIONAL DETAILS
========================================= */

function InstitutionDetails() {

  const details = [
    {
      icon: Landmark,
      label: "Institution",
      value: "St. Lourdes Engineering College",
    },
    {
      icon: Users,
      label: "Organization",
      value: "St. Lourdes Educational Trust",
    },
    {
      icon: UserRound,
      label: "Principal",
      value: "Dr. P. Suresh Mohan Kumar",
    },
    {
      icon: GraduationCap,
      label: "University",
      value: "Anna University, Chennai",
    },
  ];

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Section Information
      </h3>

      <div className="md-check-list">

        {[
          "Name of the Institution",
          "Name of the Organization",
          "Name of the Principal",
          "Affiliating University",
        ].map((item) => (

          <div className="md-check-item" key={item}>
            <CheckCircle2 size={20} />
            <span>{item}</span>
          </div>

        ))}

      </div>

      <div className="md-info-grid">

        {details.map((item) => {

          const Icon = item.icon;

          return (

            <div className="md-info-card" key={item.label}>

              <Icon size={30} />

              <div>
                <span>{item.label}</span>
                <strong>{item.value}</strong>
              </div>

            </div>

          );

        })}

      </div>

      <div className="md-information-note">

        <Info size={19} />

        <p>
          Official institutional details and supporting documents should
          be maintained as per the latest approved college records.
        </p>

      </div>

    </div>

  );
}

/* =========================================
   AICTE APPROVAL
========================================= */

function ApprovalDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        AICTE Approval Information
      </h3>

      <div className="md-table-wrap">

        <table className="md-table">

          <tbody>

            <tr>
              <th>Mandatory Disclosure</th>
              <td>Updated on February 2026</td>
            </tr>

            <tr>
              <th>AICTE File Number</th>
              <td>
                F. No. Southern/1-44643622820/2025/EOA/Corrigendum-1
              </td>
            </tr>

            <tr>
              <th>Date of Approval</th>
              <td>22-May-2025</td>
            </tr>

            <tr>
              <th>Approval Period</th>
              <td>2025–2026</td>
            </tr>

            <tr>
              <th>Affiliating University</th>
              <td>Anna University, Chennai</td>
            </tr>

          </tbody>

        </table>

      </div>

      <div className="md-feature-card">

        <FileText size={30} />

        <h4>AICTE Extension of Approval</h4>

        <p>
          Official approval document for the institution.
        </p>

        <a
          href="/documents/aicte-mandatory-disclosure.pdf"
          target="_blank"
          rel="noreferrer"
        >
          View PDF <ArrowRight size={15} />
        </a>

      </div>

    </div>

  );

}

/* =========================================
   GOVERNANCE
========================================= */

function GovernanceDetails() {

  return (

    <div className="md-content-body">

      <GovernanceCard
        icon={CalendarDays}
        title="Frequency of the Board Meeting and Academic Advisory Body"
      >
        Yearly Twice
      </GovernanceCard>

      <GovernanceCard
        icon={Users}
        title="Nature and Extent of Involvement of Faculty and Students in Academic Affairs / Improvements"
      >
        The faculty and students collaborate and engage in developing and
        improving academic activities related to curriculum design and
        development, course content preparation, feedback system development,
        and design and integration of students' portfolio components.
        Faculty and students work together to identify gap areas and lapses
        in the academic sphere comprising curricular and co-curricular
        activities and provide suggestions or guidelines for improving the
        current system at regular intervals.
      </GovernanceCard>

      <GovernanceCard
        icon={MessageSquare}
        title="Grievance Redressal Mechanism for Faculty, Staff and Students"
      >
        <CommitteeTable />
      </GovernanceCard>

      <GovernanceCard
        icon={MessageSquare}
        title="Student Feedback on Institutional Governance / Faculty Performance"
      >
        Student feedback is collected systematically through the online mode
        on an average of two times each semester on different aspects of
        faculty performance.
      </GovernanceCard>

    </div>

  );

}

function GovernanceCard({
  icon: Icon,
  title,
  children,
}: {
  icon: typeof CalendarDays;
  title: string;
  children: React.ReactNode;
}) {

  return (

    <div className="md-governance-card">

      <div className="md-governance-icon">
        <Icon size={27} />
      </div>

      <div className="md-governance-table-content">

        <h4>{title}</h4>

        {typeof children === "string" ? (
          <p>{children}</p>
        ) : (
          children
        )}

      </div>

    </div>

  );

}

/* =========================================
   ORGANIZATIONAL CHART
========================================= */

function OrganizationalChart() {

  const departments = [
    "Head of the Department",
    "Administrative Office",
    "Training & Placement",
    "Alumni Cell",
    "Physical Education",
    "Library",
    "Cells & Committees",
  ];

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Institutional Organizational Structure
      </h3>

      <div className="md-org-chart">

        <div className="md-org-node main">
          Governing Body
        </div>

        <div className="md-org-connector" />

        <div className="md-org-node main">
          Chairman
        </div>

        <div className="md-org-connector" />

        <div className="md-org-principal-row">

          <div className="md-org-node main">
            Principal
          </div>

          <div className="md-org-node highlight">
            IQAC Coordinator
          </div>

        </div>

        <div className="md-org-connector" />

        <div className="md-org-departments">

          {departments.map((department) => (

            <div
              className="md-org-node department"
              key={department}
            >
              {department}
            </div>

          ))}

        </div>

      </div>

    </div>

  );

}

/* =========================================
   GRIEVANCE REDRESSAL
========================================= */

function GrievanceDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Grievance Redressal Committee
      </h3>

      <p className="md-description">
        The institution provides a mechanism for students, faculty and staff
        to submit grievances and receive appropriate resolution through
        the designated committee.
      </p>

      <CommitteeTable />

    </div>

  );

}

/* =========================================
   COMMITTEE TABLE
========================================= */

function CommitteeTable() {

  return (

    <div className="md-table-wrap">

      <table className="md-table">

        <thead>

          <tr>
            <th>S.No</th>
            <th>Name</th>
            <th>Designation</th>
            <th>Category</th>
          </tr>

        </thead>

        <tbody>

          {grievanceMembers.map((member) => (

            <tr key={member[0]}>

              {member.map((value, index) => (
                <td key={index}>{value}</td>
              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

/* =========================================
   ANTI-RAGGING
========================================= */

function AntiRaggingDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Anti-Ragging Committee
      </h3>

      <p className="md-description">
        The institution maintains an anti-ragging mechanism to ensure a safe,
        respectful and supportive campus environment for all students.
      </p>

      <h4 className="md-section-subtitle">
        Committee Members
      </h4>

      <GenericCommitteeTable />

      <FeatureGrid
        items={[
          {
            icon: ShieldCheck,
            title: "Anti-Ragging Awareness",
            text: "Awareness programmes and student orientation.",
          },
          {
            icon: Users,
            title: "Student Protection",
            text: "Monitoring and support for students.",
          },
          {
            icon: MessageSquare,
            title: "Complaint Reporting",
            text: "A channel for reporting ragging incidents.",
          },
        ]}
      />

    </div>

  );

}

/* =========================================
   INTERNAL COMPLAINTS COMMITTEE
========================================= */

function ICCDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Internal Complaints Committee (ICC)
      </h3>

      <p className="md-description">
        The Internal Complaints Committee supports a safe and respectful
        institutional environment and addresses complaints in accordance
        with applicable regulations.
      </p>

      <h4 className="md-section-subtitle">
        Committee Members
      </h4>

      <GenericCommitteeTable />

      <FeatureGrid
        items={[
          {
            icon: HeartHandshake,
            title: "Women Empowerment",
            text: "Awareness and empowerment initiatives.",
          },
          {
            icon: ShieldCheck,
            title: "Safe Campus",
            text: "Promoting a safe and respectful campus.",
          },
          {
            icon: MessageSquare,
            title: "Complaint Support",
            text: "Confidential complaint assistance.",
          },
        ]}
      />

    </div>

  );

}

/* =========================================
   SC/ST AND EQUAL OPPORTUNITY
========================================= */

function SCSTDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        SC/ST Committee & Equal Opportunity Facilities Cell
      </h3>

      <p className="md-description">
        The institution supports equal opportunity, inclusion and student
        welfare through its designated committees and support facilities.
      </p>

      <FeatureGrid
        items={[
          {
            icon: Scale,
            title: "SC/ST Committee",
            text: "Support and assistance for SC/ST students.",
          },
          {
            icon: Users,
            title: "Equal Opportunity",
            text: "Encouraging inclusive educational opportunities.",
          },
          {
            icon: BookOpen,
            title: "Student Support",
            text: "Academic and institutional guidance.",
          },
        ]}
      />

    </div>

  );

}

/* =========================================
   INTERNAL QUALITY ASSURANCE CELL
========================================= */

function IQACDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Internal Quality Assurance Cell
      </h3>

      <FeatureGrid
        items={[
          {
            icon: Award,
            title: "IQAC Objectives",
            text: "Developing and maintaining institutional quality.",
          },
          {
            icon: ClipboardList,
            title: "IQAC Strategies",
            text: "Planning and monitoring quality initiatives.",
          },
          {
            icon: Network,
            title: "IQAC Functions",
            text: "Coordinating academic and administrative quality.",
          },
          {
            icon: CheckCircle2,
            title: "Quality Improvement",
            text: "Supporting continuous institutional improvement.",
          },
        ]}
      />

    </div>

  );

}

/* =========================================
   PROGRAMMES AND BEST PRACTICES
========================================= */

function ProgrammesDetails() {

  return (

    <div className="md-content-body">

      <h3 className="md-subheading">
        Programmes & Institutional Best Practices
      </h3>

      <FeatureGrid
        items={[
          {
            icon: GraduationCap,
            title: "Approved Programmes",
            text: "Details of approved academic programmes.",
          },
          {
            icon: Users,
            title: "Student Intake",
            text: "Sanctioned intake details for academic programmes.",
          },
          {
            icon: Award,
            title: "Best Practices",
            text: "Institutional practices supporting academic excellence.",
          },
          {
            icon: BookOpen,
            title: "Academic Initiatives",
            text: "Academic, research and student development initiatives.",
          },
        ]}
      />

    </div>

  );

}

/* =========================================
   REUSABLE COMMITTEE COMPONENT
========================================= */

function GenericCommitteeTable() {

  return (

    <div className="md-table-wrap">

      <table className="md-table">

        <thead>

          <tr>
            <th>S.No</th>
            <th>Committee Member</th>
            <th>Designation</th>
          </tr>

        </thead>

        <tbody>

          {committeeMembers.map((member) => (

            <tr key={member[0]}>

              {member.map((value, index) => (
                <td key={index}>{value}</td>
              ))}

            </tr>

          ))}

        </tbody>

      </table>

    </div>

  );

}

/* =========================================
   REUSABLE FEATURE GRID
========================================= */

function FeatureGrid({
  items,
}: {
  items: {
    icon: React.ElementType;
    title: string;
    text: string;
  }[];
}) {

  return (

    <div className="md-feature-grid">

      {items.map((item) => {

        const Icon = item.icon;

        return (

          <div
            className="md-feature-card"
            key={item.title}
          >

            <Icon size={28} />

            <h4>{item.title}</h4>

            <p>{item.text}</p>

          </div>

        );

      })}

    </div>

  );

}
