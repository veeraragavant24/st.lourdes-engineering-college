
import { useEffect, useState } from "react";

import {
  FileText,
  FileCheck,
  ArrowRight,
  ArrowUpRight,
  ChevronLeft,
  ChevronRight,
  ChevronsLeft,
  ChevronsRight,
  Search,
  ClipboardList,
  FileSearch,
} from "lucide-react";

type DocumentItem = {
  name: string;
  file?: string;
};

type Category = {
  id: string;
  title: string;
  description: string;
  icon: typeof FileText;
  documents: DocumentItem[];
};

const increaseDocuments: DocumentItem[] = [
  { name: "Resolution of the Trust" },
  { name: "Portal generated Affidavit" },
  { name: "NOC from affiliating University / Board" },
  { name: "NBA accreditation letter(s)/NAAC letter (Applicable for Category I & II University)" },
  { name: "River/ Canals/Rail Tracks/Highways/ High Tension line or any other such entity passing through the Site (Khasra Plan)" },
  { name: "Any other Institution (AICTE approved/non approved) are being run/proposed to be run in the same patch of land shown for the present institution." },
  { name: "Any other programmes such as BBA/BCA/B.Sc. , M.Sc. etc. are being run/sharing in the premises (Land and building) of the present Institution (Affidavit)." },
  { name: "Dead Stock Register (Lab equipment first year)" },
  { name: "Dead Stock Register" },
  { name: "Dead Stock Register (office equipment)" },
  { name: "Proof of Internet Bandwidth" },
  { name: "Fire Safety Certificate issued by Competent Authority (If applied attach proof of the same)" },
  { name: "List giving titles of books and volumes purchased for Library" },
  { name: "Copy of Invoice / Cash Memo for equipments and Library Books" },
  { name: "List and details of Hard Copy of National Journals Subscribed" },
  { name: "List and details of Hard Copy of International Journals subscribed" },
  { name: "Sanction of electrical load by electric supply provider company" },
  { name: "Certificate by architect" },
  { name: "Proof of telephone / Mobile connections" },
  { name: "TDS Certificate of all the faculty members" },
  { name: "Proof about medical facility and counseling arrangements" },
  { name: "Details of all other educational institutions under same society/trust/company" },
  { name: "General insurance for assets with policy number" },
  { name: "Details of reprographic facility available for students" },
  { name: "Occupancy/ Completion/ Structural Stability Certificate (if new area is added)" },
  { name: "Barrier free Built environment relevant for 1st year (Architect Certificate & Photographs)" },
];

const desirableDocuments: DocumentItem[] = [
  { name: "Implementation of the Schemes Announced by Government of India" },
  { name: "Offering of Skill Development Courses Approved by the Council" },
  { name: "Fabrication Facility Laboratory (FABLAB) Tinkering Laboratory/Innovation Laboratory" },
  { name: "Installation of Grid Connected Solar Rooftops/Power Systems" },
  { name: "Public Announcement System" },
  { name: "ERP Software" },
  { name: "Efforts to encourage Final Year Students to appear GATE examination" },
  { name: "Efforts to encourage students to participate in National/International competition like SIH, IDEATHON, etc" },
  { name: "Efforts to encourage students to take-up internship and project work in Indian Knowledge System related Areas/Topics/Disaster Management" },
  { name: "Transport Facility" },
  { name: "Post & Banking/ATM" },
  { name: "Projectors in Classrooms" },
  { name: "Auditorium" },
  { name: "Staff Quarters" },
  { name: "Display of Course(s) and Approved Intake in the Institution at the entrance of the Institution. Course(s) taken through duly recognized MOOCs shall be used as Supplementary Course(s)" },
  { name: "General Insurance" },
  { name: "Intellectual Property Right Cell" },
  { name: "Implementation of Unnat Bharat Abhiyan/Saansad Adarsh Gram Yojana (SAGY)" },
  { name: "Implementation of Startup Policy" },
  { name: "Innovation Cell/Club" },
  { name: "Media Cell" },
  { name: "Participation in the NIRF" },
  { name: "Measures for Cybersecurity" },
  { name: "Availability of Quality Sanitary Napkins through Sanitary Napkin Vending Machines and ensuring Safe and Environment friendly disposal of used Sanitary Napkin" },
  { name: "Rain Water Harvesting" },
  { name: "Implementation of Skill India Mission" },
  { name: "Implementation of Examination Reforms" },
  { name: "Provision to watch MOOCS Courses through Swayam" },
  { name: "Implementation of Student Induction Programme" },
  { name: "Facilitate teachers for undergoing Pedagogical training through NITTT Guidelines" },
];

const essentialDocuments: DocumentItem[] = [
  { name: "Establishment of Online Grievance Rederssal Mechanism" },
  { name: "Establishment of Anti Ragging Committee" },
  { name: "Establishment of Grievance Redressal Committee in the Institution and/or Appointment of OMBUDSMAN by the University" },
  { name: "Establishment of Internal Committee (IC): (along with Annual Report)" },
  { name: "Establishment of Committee For SC/ST" },
  { name: "Internal Quality Assurance Cell" },
  { name: "Barrier free Environment" },
  { name: "Fire and Safety Certificate" },
  { name: "Implementation of Teacher Training Policy" },
  { name: "Atleast 5 MoUs with Industries?" },
  { name: "Compliance of the Academic Bank of Credit (ABC) as per MoE directives, (Applicable for Standalone Institutions, PGDM/PGCM and Universities)." },
  { name: "Whether the Institution has Implemented Safety and Security measures in the Campus?" },
  { name: "Implementing Food Safety and Standard Act, 2006 in the Institution" },
  { name: "Digital Payment for all Financial Transactions as per MHRD Directives" },
  { name: "Display of information submitted to AICTE (including the accreditation status and Board of Governors) along with mandatory disclosures in the Web site of the Institution" },
  { name: "Potable Water Supply" },
  { name: "Electrical Grid Power Supply Connection" },
  { name: "Backup Electric Supply" },
  { name: "Sports Facilities" },
  { name: "Waste Management and environment improvement measures to ensure a sustainable Green Campus" },
  { name: "Sewage Disposal System" },
  { name: "Display Board within the premises as well as in the Website of the Institution Indicating the Feedback Facility of Students and Faculty Available in the AICTE Web Portal" },
  { name: "First Aid, Medical and counselling facilities" },
  { name: "Insurance for Students" },
  { name: "Group Accident Policy to be provided for the Employees" },
  { name: "All Weather Approach (Motorized Road)" },
  { name: "Institution-Industry Cell" },
  { name: "Copies of AICTE Approvals (LOA and EOA of subsequent years) obtained since Inception of Institution till date shall be placed in the Website of the Institution" },
  { name: "Appointment of Student Counselor" },
  { name: "Vehicle Parking" },
  { name: "General Notice Board and Departmental Notice Boards" },
  { name: "Display of Course(s) and Approved Intake in the Institution at the entrance of the Institution" },
  { name: "Establishment of platform or hiring counsellors for seeking help and guidance w.r.t psychological counselling related to Mental Health for Students, faculty and non-teaching faculty." },
  { name: "Implementation of mandatory Internship Policy for Students" },
  { name: "Internship shall be made compulsory for all final year students of AICTE approved Institutes/Universities." },
  { name: "Establishment of 24x7 women helpline number and a security system in the campus for providing safety to students and female faculty and non-teaching faculty." },
  { name: "As per NEP, every Institution shall have inbuilt mechanism for Social and Emotional Learning A crucial component of Education." },
  { name: "The electives mandatorily through SWAYAM (MOOCS Platform)" },
  { name: "Language Laboratory (for institutions having Diploma and Degree Programs)" },
  { name: "The AICTE approved institutions shall evolve a mechanism for earning credits through Skilling based courses offered by Skill India, Ministry of Skill Development and Entrepreneurship OR any other leading skilling platforms in order to improve their skill sets and employability" },
];

const categories: Category[] = [
  {
    id: "increase",
    title: "Increase In Intake or New Course",
    description: "Documents required for increase in intake or introduction of a new course as per AICTE guidelines.",
    icon: FileText,
    documents: increaseDocuments,
  },
  {
    id: "desirable",
    title: "Desirable Documents",
    description: "Additional institutional facilities, initiatives and desirable compliance documents.",
    icon: FileCheck,
    documents: desirableDocuments,
  },
  {
    id: "essential",
    title: "Essential Documents",
    description: "Essential institutional requirements and mandatory AICTE compliance documents.",
    icon: ClipboardList,
    documents: essentialDocuments,
  },
];

// Add the actual PDF paths here.
// Example: "increase-1": "/documents/aicte/resolution-of-trust.pdf"
const documentFiles: Record<string, string> = {};

const ITEMS_PER_PAGE = 10;

export default function AicteDocuments() {
  const [activeCategory, setActiveCategory] = useState("increase");
  const [page, setPage] = useState(1);
  const [search, setSearch] = useState("");

  const active = categories.find((category) => category.id === activeCategory)!;

  const filteredDocuments = active.documents.filter((document) =>
    document.name.toLowerCase().includes(search.toLowerCase())
  );

  const totalPages = Math.max(
    1,
    Math.ceil(filteredDocuments.length / ITEMS_PER_PAGE)
  );

  const currentPage = Math.min(page, totalPages);

  const startIndex = (currentPage - 1) * ITEMS_PER_PAGE;

  const visibleDocuments = filteredDocuments.slice(
    startIndex,
    startIndex + ITEMS_PER_PAGE
  );

  const firstDocument = filteredDocuments.length ? startIndex + 1 : 0;
  const lastDocument = Math.min(
    startIndex + ITEMS_PER_PAGE,
    filteredDocuments.length
  );

  useEffect(() => {
    const elements = document.querySelectorAll(".aicte-reveal");

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("aicte-visible");
          } else {
            // Remove the class when leaving the viewport.
            // This allows the animation to replay on the next scroll.
            entry.target.classList.remove("aicte-visible");
          }
        });
      },
      {
        threshold: 0.12,
        rootMargin: "0px 0px -30px 0px",
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, [activeCategory, currentPage, search]);

  const changeCategory = (id: string) => {
    setActiveCategory(id);
    setPage(1);
    setSearch("");
  };

  const changePage = (nextPage: number) => {
    setPage(Math.max(1, Math.min(nextPage, totalPages)));
  };

  const getDocumentKey = (index: number) =>
    `${activeCategory}-${index + 1}`;

  return (
    <main className="aicte-page">
      <style>{`

        /* =====================================
           AICTE DOCUMENT PORTAL
           ST. LOURDES ENGINEERING COLLEGE
           MAROON AND GOLD
        ===================================== */

        .aicte-page {
  --a-maroon: #650f2b;
  --a-deep: #811a39;
  --a-red: #9a2445;
  --a-gold: #c68d2c;
  --a-gold-light: #ffe9bd;
  --a-cream: #fffaf5;
  --a-border: #eadbd0;

  width: 100%;
  min-height: 100vh;
  padding: 0 0 45px;
  margin: 0;
  background: var(--a-cream);
  color: #38272d;
  font-family: inherit;
  overflow: hidden;
}

.aicte-page * {
  box-sizing: border-box;
}

        .aicte-container {
          width: min(94%, 1450px);
          margin: 0 auto;
        }

        /* PAGE TITLE */

        .aicte-breadcrumb {
          display: flex;
          align-items: center;
          gap: 9px;
          color: #856a6e;
          font-size: 12px;
          margin-bottom: 23px;
        }

        .aicte-breadcrumb strong {
          color: var(--a-maroon);
        }

        .aicte-title-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 20px;
          margin-bottom: 27px;
        }

        .aicte-title-left {
          display: flex;
          align-items: center;
          gap: 16px;
        }

        .aicte-title-line {
          width: 9px;
          height: 56px;
          flex-shrink: 0;
          border-radius: 20px;
          background: linear-gradient(
            180deg,
            #efbd45,
            #c48921
          );
        }

        .aicte-title-left h1 {
          font-family: Georgia, "Times New Roman", serif;
          color: var(--a-maroon);
          font-size: clamp(25px, 3vw, 35px);
          line-height: 1.2;
          margin: 0 0 5px;
          font-weight: 700;
        }

        .aicte-title-left p {
          color: #74636a;
          font-size: 14px;
          margin: 0;
        }

        .aicte-total-badge {
          display: flex;
          align-items: center;
          gap: 10px;
          padding: 13px 19px;
          border: 1px solid #efcf98;
          border-radius: 12px;
          background: linear-gradient(
            135deg,
            #fff2d9,
            #ffe4b5
          );
          color: var(--a-maroon);
          font-weight: 800;
          font-size: 13px;
          white-space: nowrap;
          box-shadow: 0 3px 8px rgba(91, 38, 20, .07);
        }

        /* CATEGORY CARDS */

        .aicte-category-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 14px;
          margin-bottom: 23px;
        }

        .aicte-category-card {
          position: relative;
          min-height: 110px;
          display: flex;
          align-items: center;
          gap: 15px;
          padding: 17px;
          padding-right: 45px;
          text-align: left;
          border: 1px solid #e8d8cd;
          border-radius: 15px;
          background: linear-gradient(
            130deg,
            #fff,
            #fff9f2
          );
          cursor: pointer;
          color: var(--a-maroon);
          transition:
            transform .4s ease,
            box-shadow .4s ease,
            border-color .4s ease,
            background .4s ease;
          box-shadow: 0 3px 9px rgba(70, 25, 35, .04);
        }

        .aicte-category-card:hover {
          transform: translateY(-4px);
          border-color: var(--a-gold);
          box-shadow: 0 10px 22px rgba(90, 20, 40, .1);
        }

        .aicte-category-card.active {
          background: linear-gradient(
            115deg,
            #590c26,
            #991f43
          );
          color: white;
          border: 2px solid #e4b84e;
          box-shadow: 0 6px 15px rgba(89, 12, 38, .17);
        }

        .aicte-category-icon {
          width: 74px;
          height: 74px;
          min-width: 74px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 16px;
          background: linear-gradient(
            135deg,
            #fff0d8,
            #f9e5c7
          );
          color: var(--a-maroon);
          transition: .3s ease;
        }

        .aicte-category-card.active .aicte-category-icon {
          background: rgba(255, 239, 210, .14);
          color: #ffdf88;
        }

        .aicte-category-content {
          flex: 1;
          min-width: 0;
        }

        .aicte-category-content h2 {
          font-family: Georgia, "Times New Roman", serif;
          font-size: 19px;
          line-height: 1.35;
          font-weight: 700;
          margin: 0;
          color: inherit;
        }

        .aicte-category-count {
          display: block;
          color: #9a7134;
          font-size: 11px;
          margin-top: 7px;
          font-weight: 700;
        }

        .aicte-category-card.active .aicte-category-count {
          color: #f5d78e;
        }

        .aicte-category-arrow {
          position: absolute;
          right: 15px;
          bottom: 20px;
          width: 31px;
          height: 31px;
          display: flex;
          justify-content: center;
          align-items: center;
          border: 1.5px solid #bd801d;
          border-radius: 50%;
          color: #a56b11;
          transition: .3s ease;
        }

        .aicte-category-card.active .aicte-category-arrow {
          color: #ffe08a;
          border-color: #ffe08a;
          transform: rotate(-45deg);
        }

        /* DOCUMENT PANEL */

        .aicte-document-panel {
          border: 1px solid #e6d4c8;
          border-radius: 16px;
          background: #fffdf9;
          padding: 24px;
          box-shadow: 0 5px 17px rgba(81, 35, 38, .045);
          animation: aicte-panel-in .5s ease both;
        }

        @keyframes aicte-panel-in {
          from {
            opacity: 0;
            transform: translateY(15px);
          }
          to {
            opacity: 1;
            transform: translateY(0);
          }
        }

        .aicte-panel-heading {
          display: flex;
          align-items: center;
          justify-content: space-between;
          gap: 15px;
          padding-bottom: 17px;
          border-bottom: 1px solid #e8d4c1;
          margin-bottom: 18px;
        }

        .aicte-panel-title {
          display: flex;
          align-items: center;
          gap: 17px;
          min-width: 0;
        }

        .aicte-panel-icon {
          width: 77px;
          height: 70px;
          min-width: 77px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          background: linear-gradient(
            135deg,
            #fff0d8,
            #f8e4c8
          );
          color: var(--a-maroon);
        }

        .aicte-panel-title h2 {
          color: var(--a-maroon);
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(21px, 2.5vw, 29px);
          line-height: 1.3;
          margin: 0 0 5px;
        }

        .aicte-panel-title p {
          color: #67565c;
          font-size: 13px;
          line-height: 1.5;
          margin: 0;
        }

        .aicte-document-count {
          padding: 13px 18px;
          border-radius: 12px;
          border: 1px solid #efcf98;
          background: linear-gradient(
            135deg,
            #fff2d9,
            #ffe5bd
          );
          color: var(--a-maroon);
          font-size: 13px;
          font-weight: 800;
          white-space: nowrap;
        }

        /* SEARCH */

        .aicte-toolbar {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          margin-bottom: 14px;
        }

        .aicte-search {
          width: min(100%, 380px);
          display: flex;
          align-items: center;
          gap: 10px;
          border: 1px solid #e5d6ca;
          border-radius: 9px;
          background: white;
          padding: 0 13px;
          color: #9a6e35;
          transition: border-color .25s ease, box-shadow .25s ease;
        }

        .aicte-search:focus-within {
          border-color: #bd8b37;
          box-shadow: 0 0 0 3px rgba(198, 141, 44, .1);
        }

        .aicte-search input {
          width: 100%;
          height: 43px;
          border: none;
          outline: none;
          background: transparent;
          color: #402b31;
          font-size: 13px;
          font-family: inherit;
        }

        .aicte-search input::placeholder {
          color: #a69a96;
        }

        .aicte-toolbar-note {
          color: #88777a;
          font-size: 12px;
        }

        /* TABLE */

        .aicte-table-wrap {
          width: 100%;
          overflow-x: auto;
          border: 1px solid #ead7c8;
          border-radius: 10px;
        }

        .aicte-table {
          width: 100%;
          border-collapse: collapse;
          min-width: 620px;
          table-layout: fixed;
        }

        .aicte-table th {
          background: linear-gradient(
            90deg,
            #650f2b,
            #921f41
          );
          color: white;
          padding: 14px 15px;
          text-align: left;
          font-size: 13px;
          font-weight: 700;
        }

        .aicte-table th:first-child {
          width: 82px;
          text-align: center;
        }

        .aicte-table th:last-child {
          width: 145px;
          text-align: center;
        }

        .aicte-table td {
          padding: 11px 15px;
          border-bottom: 1px solid #eee3da;
          color: #34272c;
          font-size: 13px;
          line-height: 1.55;
          vertical-align: middle;
        }

        .aicte-table tbody tr {
          transition: background .25s ease;
        }

        .aicte-table tbody tr:nth-child(odd) {
          background: #fffaf4;
        }

        .aicte-table tbody tr:nth-child(even) {
          background: #f8eee5;
        }

        .aicte-table tbody tr:hover {
          background: #fff0d8;
        }

        .aicte-table tbody tr:last-child td {
          border-bottom: none;
        }

        .aicte-table td:first-child {
          text-align: center;
          color: #74152f;
          font-weight: 800;
          font-size: 14px;
        }

        .aicte-table td:last-child {
          text-align: center;
        }

        .aicte-view-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 8px;
          min-width: 105px;
          padding: 8px 14px;
          border-radius: 9px;
          border: 1px solid #d9a04b;
          background: linear-gradient(
            135deg,
            #fff4df,
            #ffe8c4
          );
          color: #72142f;
          text-decoration: none;
          font-family: inherit;
          font-size: 12px;
          font-weight: 700;
          cursor: pointer;
          transition: .25s ease;
        }

        .aicte-view-button:hover {
          background: #72142f;
          color: white;
          border-color: #72142f;
          transform: translateY(-2px);
        }

        .aicte-view-button.disabled {
          opacity: .55;
          cursor: not-allowed;
          filter: grayscale(.3);
        }

        .aicte-empty {
          text-align: center;
          padding: 40px 15px;
          color: #89767a;
        }

        .aicte-empty svg {
          margin-bottom: 10px;
          color: #bd8b37;
        }

        /* PAGINATION */

        .aicte-pagination-row {
          display: flex;
          justify-content: space-between;
          align-items: center;
          gap: 15px;
          padding-top: 18px;
        }

        .aicte-showing {
          color: #64545a;
          font-size: 13px;
        }

        .aicte-pagination {
          display: flex;
          align-items: center;
          gap: 6px;
        }

        .aicte-page-button {
          min-width: 37px;
          height: 36px;
          padding: 0 9px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid #e7d5ca;
          border-radius: 8px;
          background: white;
          color: #6b263a;
          font-size: 13px;
          cursor: pointer;
          transition: .25s ease;
        }

        .aicte-page-button:hover:not(:disabled) {
          background: #fff0d8;
          border-color: #c99735;
        }

        .aicte-page-button.active {
          color: white;
          background: #781632;
          border-color: #781632;
        }

        .aicte-page-button:disabled {
          opacity: .35;
          cursor: not-allowed;
        }

        /* FOOTER */

        .aicte-footer {
          display: flex;
          align-items: center;
          gap: 17px;
          padding: 23px 10px 0;
          color: #756269;
          font-size: 12px;
        }

        .aicte-footer-line {
          height: 1px;
          flex: 1;
          background: linear-gradient(90deg,#d5a34c,#eadbd0);
        }

        .aicte-footer strong {
          color: #82451e;
          letter-spacing: 1px;
          font-size: 11px;
        }

        /* REVEAL ANIMATIONS */

        .aicte-reveal {
          opacity: 0;
          will-change: transform, opacity;
          transition:
            opacity .9s ease,
            transform 1s cubic-bezier(.2,.75,.25,1);
        }

        .aicte-reveal[data-direction="left"] {
          transform: translateX(-65px);
        }

        .aicte-reveal[data-direction="right"] {
          transform: translateX(65px);
        }

        .aicte-reveal[data-direction="fade"] {
          transform: translateY(22px);
        }

        .aicte-reveal.aicte-visible {
          opacity: 1;
          transform: translate(0,0);
        }

        /* RESPONSIVE */

        @media(max-width: 950px) {
          .aicte-category-grid {
            grid-template-columns: repeat(2,minmax(0,1fr));
          }

          .aicte-category-card:last-child {
            grid-column: 1 / -1;
          }
        }

        @media(max-width: 650px) {
          .aicte-page {
            padding-top: 20px;
          }

          .aicte-container {
            width: 93%;
          }

          .aicte-title-row {
            flex-direction: column;
            align-items: flex-start;
            gap: 13px;
          }

          .aicte-title-left h1 {
            font-size: 25px;
          }

          .aicte-title-left p {
            font-size: 12px;
            line-height: 1.5;
          }

          .aicte-title-line {
            height: 48px;
            width: 6px;
          }

          .aicte-total-badge {
            margin-left: 22px;
            padding: 9px 13px;
          }

          .aicte-category-grid {
            grid-template-columns: 1fr;
            gap: 10px;
          }

          .aicte-category-card:last-child {
            grid-column: auto;
          }

          .aicte-category-card {
            min-height: 88px;
            padding: 12px;
            padding-right: 48px;
            gap: 12px;
          }

          .aicte-category-icon {
            width: 58px;
            height: 58px;
            min-width: 58px;
          }

          .aicte-category-icon svg {
            width: 29px;
            height: 29px;
          }

          .aicte-category-content h2 {
            font-size: 16px;
          }

          .aicte-category-count {
            font-size: 10px;
          }

          .aicte-category-arrow {
            right: 11px;
            bottom: 12px;
            width: 26px;
            height: 26px;
          }

          .aicte-document-panel {
            padding: 14px 10px;
            border-radius: 12px;
          }

          .aicte-panel-heading {
            align-items: flex-start;
          }

          .aicte-panel-title {
            gap: 10px;
          }

          .aicte-panel-icon {
            width: 49px;
            height: 49px;
            min-width: 49px;
          }

          .aicte-panel-icon svg {
            width: 27px;
            height: 27px;
          }

          .aicte-panel-title h2 {
            font-size: 18px;
          }

          .aicte-panel-title p {
            font-size: 11px;
          }

          .aicte-document-count {
            padding: 8px;
            font-size: 10px;
          }

          .aicte-toolbar {
            flex-direction: column;
            align-items: stretch;
          }

          .aicte-search {
            width: 100%;
          }

          .aicte-toolbar-note {
            font-size: 11px;
          }

          .aicte-pagination-row {
            flex-direction: column;
            align-items: flex-start;
          }

          .aicte-pagination {
            width: 100%;
            justify-content: center;
            flex-wrap: wrap;
          }

          .aicte-page-button {
            min-width: 32px;
            height: 33px;
          }

          .aicte-footer {
            flex-wrap: wrap;
            gap: 8px;
          }

          .aicte-footer-line {
            min-width: 25px;
          }

          .aicte-footer strong {
            font-size: 9px;
          }
        }

        @media(max-width: 380px) {
          .aicte-document-count {
            display: none;
          }

          .aicte-panel-title h2 {
            font-size: 16px;
          }
        }

        @media(prefers-reduced-motion: reduce) {
          .aicte-reveal,
          .aicte-category-card,
          .aicte-view-button {
            transition: none !important;
          }

          .aicte-reveal {
            opacity: 1;
            transform: none !important;
          }
        }
/* =====================================
   AICTE HERO - MAROON REFERENCE DESIGN
===================================== */




/* =====================================
   AICTE HERO - MAROON DESIGN
===================================== */

.aicte-hero {
  position: relative;
  isolation: isolate;
  width: 100%;
  min-height: 520px;
  display: flex;
  align-items: center;
  overflow: hidden;
  padding: 0;
  background:
    radial-gradient(
      circle at 80% 15%,
      rgba(255, 226, 184, .16),
      transparent 35%
    ),
    linear-gradient(
      110deg,
      #390814 0%,
      #641127 38%,
      #8b4050 72%,
      #b9a6a9 100%
    );
}

.aicte-hero::after {
  content: "";
  position: absolute;
  inset: 0;
  z-index: -1;
  background: linear-gradient(
    90deg,
    rgba(45, 4, 17, .18),
    transparent 75%
  );
}

.aicte-hero-inner {
  position: relative;
  z-index: 1;
  width: min(92%, 1300px);
  margin: 0 auto;
  display: flex;
  align-items: center;
  gap: 35px;
  padding: 125px 0 65px;
}

.aicte-hero-icon {
  flex: 0 0 75px;
  width: 75px;
  display: flex;
  align-items: center;
  justify-content: center;
  color: #f4ce70;
  animation: aicte-icon-enter .9s ease both;
}

.aicte-hero-content {
  max-width: 760px;
  min-width: 0;
  animation: aicte-hero-enter 1s ease both;
}

.aicte-hero-eyebrow {
  display: block;
  color: #f5d16f;
  font-size: 13px;
  font-weight: 800;
  letter-spacing: 4px;
  margin-bottom: 16px;
}

.aicte-hero-content h1 {
  color: #fff;
  font-family: Georgia, "Times New Roman", serif;
  font-size: clamp(48px, 6vw, 76px);
  font-weight: 700;
  line-height: 1.02;
  letter-spacing: -1.5px;
  margin: 0;
}

.aicte-hero-content h1 span {
  display: block;
  color: #f2d17c;
}

.aicte-hero-underline {
  width: 105px;
  height: 4px;
  border-radius: 10px;
  margin: 23px 0 18px;
  background: linear-gradient(90deg, #ffe18b, #c68d2c);
}

.aicte-hero-description {
  max-width: 560px;
  color: #fff2f0;
  font-size: 15px;
  line-height: 1.8;
  margin: 0 0 25px;
}

.aicte-hero-button {
  display: inline-flex;
  align-items: center;
  justify-content: center;
  gap: 11px;
  padding: 14px 25px;
  border-radius: 50px;
  background: linear-gradient(120deg, #f5d77d, #d9a936);
  color: #510c23;
  font-size: 12px;
  font-weight: 800;
  letter-spacing: .5px;
  text-decoration: none;
  border: 1px solid rgba(255,255,255,.2);
  transition: .3s ease;
}

.aicte-hero-button:hover {
  transform: translateY(-4px);
  box-shadow: 0 9px 25px rgba(0,0,0,.2);
  background: #ffe8a6;
}

@keyframes aicte-hero-enter {
  from {
    opacity: 0;
    transform: translateX(-35px);
  }
  to {
    opacity: 1;
    transform: translateX(0);
  }
}

@keyframes aicte-icon-enter {
  from {
    opacity: 0;
    transform: scale(.75);
  }
  to {
    opacity: 1;
    transform: scale(1);
  }
}

/* TABLET */

@media(max-width: 900px) {
  .aicte-hero {
    min-height: 470px;
  }

  .aicte-hero-inner {
    width: 92%;
    padding-top: 115px;
  }

  .aicte-hero-content h1 {
    font-size: clamp(45px, 7vw, 65px);
  }
}

/* MOBILE */

@media(max-width: 700px) {
  .aicte-hero {
    min-height: 440px;
  }

  .aicte-hero-inner {
    width: 91%;
    align-items: flex-start;
    gap: 15px;
    padding: 110px 0 55px;
  }

  .aicte-hero-icon {
    flex: 0 0 42px;
    width: 42px;
    padding-top: 27px;
  }

  .aicte-hero-icon svg {
    width: 38px;
    height: 38px;
  }

  .aicte-hero-eyebrow {
    font-size: 9px;
    letter-spacing: 2px;
    margin-bottom: 13px;
  }

  .aicte-hero-content h1 {
    font-size: clamp(34px, 9vw, 48px);
    letter-spacing: -1px;
  }

  .aicte-hero-underline {
    width: 75px;
    margin: 17px 0 13px;
  }

  .aicte-hero-description {
    font-size: 12px;
    line-height: 1.7;
  }

  .aicte-hero-button {
    padding: 12px 17px;
    font-size: 10px;
  }
}

@media(prefers-reduced-motion: reduce) {
  .aicte-hero-content,
  .aicte-hero-icon {
    animation: none;
  }
}


      `}</style>

      

      
{/* ================= AICTE HERO ================= */}

<section className="aicte-hero">
  <div className="aicte-hero-inner">
    <div className="aicte-hero-icon">
      <FileText size={75} strokeWidth={1.4} />
    </div>

    <div className="aicte-hero-content">
      <span className="aicte-hero-eyebrow">
        REGULATORY DOCUMENTS
      </span>

      <h1>
        AICTE
        <span>DOCUMENTS</span>
      </h1>

      <div className="aicte-hero-underline" />

      <p className="aicte-hero-description">
        Access institutional approvals, essential compliance
        records and regulatory documents of St. Lourdes
        Engineering College.
      </p>

      <a
        href="#aicte-document-categories"
        className="aicte-hero-button"
      >
        <FileCheck size={18} />
        EXPLORE AICTE DOCUMENTS
        <ArrowRight size={16} />
      </a>
    </div>
  </div>
</section>

{/* ================= MAIN CONTENT ================= */}

<div className="aicte-container">

  {/* CATEGORY CARDS */}

  <div
    className="aicte-category-grid"
    id="aicte-document-categories"
  >
    {categories.map((category, index) => {
      const Icon = category.icon;
      const isActive = activeCategory === category.id;

      return (
        <button
          type="button"
          key={category.id}
          onClick={() => changeCategory(category.id)}
          className={`aicte-category-card aicte-reveal ${
            isActive ? "active" : ""
          }`}
          data-direction={index % 2 === 0 ? "left" : "right"}
          aria-pressed={isActive}
        >
          <div className="aicte-category-icon">
            <Icon size={37} strokeWidth={1.8} />
          </div>

          <div className="aicte-category-content">
            <h2>{category.title}</h2>
            <span className="aicte-category-count">
              {category.documents.length} DOCUMENTS
            </span>
          </div>

          <div className="aicte-category-arrow">
            <ArrowRight size={19} />
          </div>
        </button>
      );
    })}
  </div>

  {/* DOCUMENT PANEL */}

  <section
    className="aicte-document-panel aicte-reveal"
    data-direction="fade"
    key={activeCategory}
  >
    {/* PANEL HEADING */}

    <div className="aicte-panel-heading">
      <div className="aicte-panel-title">
        <div className="aicte-panel-icon">
          <FileText size={38} strokeWidth={1.7} />
        </div>

        <div>
          <h2>{active.title}</h2>
          <p>{active.description}</p>
        </div>
      </div>

      <div className="aicte-document-count">
        {active.documents.length} DOCUMENTS
      </div>
    </div>

    {/* SEARCH */}

    <div className="aicte-toolbar aicte-reveal" data-direction="fade">
      <div className="aicte-search">
        <Search size={18} />

        <input
          type="search"
          value={search}
          placeholder="Search documents..."
          onChange={(event) => {
            setSearch(event.target.value);
            setPage(1);
          }}
        />
      </div>

      <span className="aicte-toolbar-note">
        Showing documents in {active.title}
      </span>
    </div>

    {/* DOCUMENT TABLE */}

    <div className="aicte-table-wrap aicte-reveal" data-direction="fade">
      <table className="aicte-table">
        <thead>
          <tr>
            <th>S.No.</th>
            <th>Document Name</th>
            <th>View</th>
          </tr>
        </thead>

        <tbody>
          {visibleDocuments.length > 0 ? (
            visibleDocuments.map((document, index) => {
              const actualIndex = startIndex + index;

              const filePath =
                document.file ||
                documentFiles[getDocumentKey(actualIndex)];

              return (
                <tr
                  key={`${activeCategory}-${actualIndex}`}
                  className="aicte-reveal"
                  data-direction={index % 2 === 0 ? "left" : "right"}
                >
                  <td>
                    {String(actualIndex + 1).padStart(2, "0")}
                  </td>

                  <td>{document.name}</td>

                  <td>
                    {filePath ? (
                      <a
                        className="aicte-view-button"
                        href={filePath}
                        target="_blank"
                        rel="noopener noreferrer"
                      >
                        <FileText size={17} />
                        View
                        <ArrowUpRight size={13} />
                      </a>
                    ) : (
                      <button
                        type="button"
                        className="aicte-view-button disabled"
                        disabled
                      >
                        <FileText size={17} />
                        Add PDF
                      </button>
                    )}
                  </td>
                </tr>
              );
            })
          ) : (
            <tr>
              <td colSpan={3}>
                <div className="aicte-empty">
                  <FileSearch size={35} />
                  <p>No documents found for "{search}"</p>
                </div>
              </td>
            </tr>
          )}
        </tbody>
      </table>
    </div>

    {/* PAGINATION */}

    <div className="aicte-pagination-row aicte-reveal" data-direction="fade">
      <span className="aicte-showing">
        Showing {firstDocument} – {lastDocument} of{" "}
        {filteredDocuments.length} documents
      </span>

      <div className="aicte-pagination">
        <button
          type="button"
          className="aicte-page-button"
          onClick={() => changePage(1)}
          disabled={currentPage === 1}
          aria-label="First page"
        >
          <ChevronsLeft size={17} />
        </button>

        <button
          type="button"
          className="aicte-page-button"
          onClick={() => changePage(currentPage - 1)}
          disabled={currentPage === 1}
          aria-label="Previous page"
        >
          <ChevronLeft size={17} />
        </button>

        {Array.from(
          { length: totalPages },
          (_, index) => index + 1
        )
          .filter(
            (pageNumber) =>
              Math.abs(pageNumber - currentPage) <= 1 ||
              pageNumber === 1 ||
              pageNumber === totalPages
          )
          .map((pageNumber, index, visiblePages) => (
            <span key={pageNumber} style={{ display: "contents" }}>
              {index > 0 &&
                pageNumber - visiblePages[index - 1] > 1 && (
                  <span className="aicte-showing">...</span>
                )}

              <button
                type="button"
                onClick={() => changePage(pageNumber)}
                className={`aicte-page-button ${
                  currentPage === pageNumber ? "active" : ""
                }`}
              >
                {pageNumber}
              </button>
            </span>
          ))}

        <button
          type="button"
          className="aicte-page-button"
          onClick={() => changePage(currentPage + 1)}
          disabled={currentPage === totalPages}
          aria-label="Next page"
        >
          <ChevronRight size={17} />
        </button>

        <button
          type="button"
          className="aicte-page-button"
          onClick={() => changePage(totalPages)}
          disabled={currentPage === totalPages}
          aria-label="Last page"
        >
          <ChevronsRight size={17} />
        </button>
      </div>
    </div>
  </section>

  {/* FOOTER */}

  <div className="aicte-footer aicte-reveal" data-direction="fade">
    <span>ST. Lourdes Engineering College</span>
    <div className="aicte-footer-line" />
    <strong>AICTE DOCUMENTS</strong>
  </div>

</div>
</main>
);
}
