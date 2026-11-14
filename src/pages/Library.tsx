
import React, { useEffect, useState } from "react";

const libraryImage =
  "https://www.slec.edu.in/wp-content/themes/mietchennai/images/library.jpg";

const collections = [
  { icon: "📚", title: "Acquisition Section", desc: "Book requests and orders" },
  { icon: "⚙️", title: "Technical Processing Section", desc: "Cataloguing and database" },
  { icon: "🔄", title: "Circulation Section", desc: "Book issue and return" },
  { icon: "📰", title: "Periodical Section", desc: "Journals and magazines" },
  { icon: "💻", title: "Digital Section", desc: "E-Resources" },
  { icon: "📖", title: "Reference Section", desc: "Reference materials" },
];

const facilities = [
  { icon: "📚", title: "Fully Automated", desc: "ILMS (AutoLib)" },
  { icon: "📶", title: "Wi-Fi", desc: "Enabled" },
  { icon: "💻", title: "E-Resources", desc: "Digital Access" },
  { icon: "🖨️", title: "Photocopying", desc: "Facilities" },
  { icon: "📹", title: "CCTV", desc: "Surveillance" },
];

const timings = [
  { heading: "Working Days" },
  { name: "Working Hours", from: "09:00 AM", to: "05:00 PM" },
  { name: "Issue / Return", from: "09:00 AM", to: "05:00 PM" },
  { heading: "Holidays" },
  { name: "Working Hours", from: "09:00 AM", to: "04:00 PM" },
  { name: "Issue / Return", from: "09:00 AM", to: "04:00 PM" },
];

const resources = [
  {
    title: "E-Journals",
    subtitle: "Online journals and research publications",
    links: [
      ["Springer – Open Access E-Journals", "https://link.springer.com/"],
      ["ProQuest", "https://www.proquest.com/"],
      ["J-Gate", "https://jgateplus.com/"],
    ],
  },
  {
    title: "E-Books",
    subtitle: "Digital books and academic reading materials",
    links: [
      ["EBSCO E-Book Collection", "https://search.ebscohost.com/"],
    ],
  },
  {
    title: "E-Databases",
    subtitle: "Digital learning platforms and databases",
    links: [
      ["DELNET", ""],
      ["National Digital Library of India (NDLI)", "https://ndl.iitkgp.ac.in/"],
      ["NPTEL", "https://nptel.ac.in/"],
      ["Swayam Prabha", ""],
      ["eGyanKosh", "http://egyankosh.ac.in/"],
      ["ePathshala", "https://epathshala.nic.in/"],
      ["e-PG Pathshala", "http://epgp.inflibnet.ac.in/"],
    ],
  },
  {
    title: "E-Theses",
    subtitle: "Research theses and dissertations",
    links: [
      ["DART Europe E-Theses Portal", "http://www.dart-europe.eu/basic-search.php"],
      ["British Library EThOS", "https://ethos.bl.uk/Home.do"],
      ["Durham E-Theses", "http://etheses.dur.ac.uk/view/departments/"],
      ["MIT Theses", "http://dspace.mit.edu/handle/1721.1/7582"],
    ],
  },
  {
    title: "E-Patents",
    subtitle: "Patent search and intellectual property resources",
    links: [
      ["Indian Patent Search (IPAIRS)", "https://ipindiaservices.gov.in/publicsearch"],
      ["Free Patents Online", "http://www.freepatentsonline.com/"],
      ["Google Patents", "https://patents.google.com/"],
    ],
  },
  {
    title: "Open Access Institutional Repositories",
    subtitle: "Open academic journals and institutional research",
    links: [
      ["Indian Journals", "http://www.indianjournals.com/ijor.aspx"],
      ["Journal of Engineering and Technology", "http://www.onlinejet.net/"],
      ["The Journal of Engineering (JoE)", "http://digital-library.theiet.org/content/journals/joe/"],
      ["NIT Rourkela", "http://dspace.nitrkl.ac.in/dspace/"],
    ],
  },
  {
    title: "Plagiarism Detection Software",
    subtitle: "Tools for checking originality in academic work",
    links: [
      ["Plagiarism Software", "https://www.plagiarismsoftware.net/"],
      ["Plagiarism Detector", "https://plagiarismdetector.net/"],
      ["Small SEO Tools", "https://smallseotools.com/plagiarism-checker/"],
      ["Grammarly Plagiarism Checker", "https://www.grammarly.com/plagiarism-checker"],
    ],
  },
];

const usefulLinks = [
  {
    title: "Higher Education",
    links: [
      ["UGC", "https://www.ugc.ac.in/"],
      ["Dept of Higher Education (GOI)", "https://www.education.gov.in/en/higher_education"],
      ["AICTE", "https://www.aicte-india.org/"],
      ["DOTE", "http://www.tndte.gov.in/site/"],
      ["Anna University Chennai", "https://www.annauniv.edu/"],
    ],
  },
  {
    title: "Results",
    links: [
      ["Anna University", "https://www.annauniv.edu/"],
    ],
  },
  {
    title: "Jobs",
    links: [
      ["Employment News", "http://www.employmentnews.gov.in/"],
      ["Career 360.com", "https://www.careers360.com/"],
      ["Naukri.com", "https://www.naukri.com/"],
      ["TimeJobs.in", "https://www.timesjobs.com/"],
      ["Careerjet.co.in", "https://www.careerjet.co.in/"],
    ],
  },
  {
    title: "Search Engines",
    links: [
      ["Google", "https://www.google.com/"],
      ["Yahoo", "https://www.yahoo.com/"],
      ["MSN", "https://www.msn.com/"],
      ["ALTAVISTA", ""],
    ],
  },
];

const Library: React.FC = () => {
  const [activeAccordion, setActiveAccordion] = useState<number | null>(0);

  useEffect(() => {
    const elements = document.querySelectorAll(".library-reveal");

    if (!("IntersectionObserver" in window)) {
      elements.forEach((el) => el.classList.add("library-visible"));
      return;
    }

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          if (entry.isIntersecting) {
            entry.target.classList.add("library-visible");
            observer.unobserve(entry.target);
          }
        });
      },
      { threshold: 0.12, rootMargin: "0px 0px -35px 0px" }
    );

    elements.forEach((el) => observer.observe(el));

    return () => observer.disconnect();
  }, []);

  const toggleAccordion = (index: number) => {
    setActiveAccordion((current) => current === index ? null : index);
  };

  return (
    <>
      <style>{`
        .library-page {
          --maroon: #641C32;
          --dark: #481225;
          --gold: #C9A45C;
          --light-gold: #E5C681;
          --ivory: #F8F5F0;
          --cream: #FFFAF2;
          --text: #30252A;
          background: var(--ivory);
          color: var(--text);
          font-family: inherit;
          overflow: hidden;
          width: 100%;
        }

        .library-page * {
          box-sizing: border-box;
        }

        .library-section {
          width: min(1200px, 92%);
          margin: 0 auto;
        }

        /* SCROLL ANIMATIONS */

        .library-reveal {
          opacity: 0;
          transition:
            opacity .85s ease,
            transform .9s cubic-bezier(.22,1,.36,1);
          will-change: opacity, transform;
        }

        .reveal-left {
          transform: translateX(-85px);
        }

        .reveal-right {
          transform: translateX(85px);
        }

        .reveal-up {
          transform: translateY(55px);
        }

        .library-visible {
          opacity: 1 !important;
          transform: translate(0,0) !important;
        }

        /* HERO */

.library-hero {
  display: grid;
  grid-template-columns: 46% 54%;

  min-height: 380;
  padding: 50px 40px;
  box-sizing: border-box;
  position: relative;
  overflow: hidden;
  background: var(--maroon);
}
        .library-hero-content {
          position: relative;
          z-index: 2;
          background: linear-gradient(120deg,var(--dark),var(--maroon));
          color: white;
          padding: 65px 25px 55px max(5vw,calc((100vw - 1200px)/2));
          display: flex;
          flex-direction: column;
          justify-content: center;
          animation: libHeroFade 1s ease both;
        }

        .library-eyebrow {
          display: flex;
          align-items: center;
          gap: 18px;
          color: var(--light-gold);
          font-size: 19px;
          font-weight: 700;
          letter-spacing: 3px;
          margin-bottom: 15px;
        }

        .library-eyebrow i {
          display: block;
          height: 1px;
          width: 80px;
          background: var(--gold);
        }

        .library-hero h1 {
          font-family: Georgia,serif;
          font-size: clamp(32px,4vw,55px);
          font-weight: 500;
          line-height: 1.17;
          margin: 0;
          color: white;
        }

        .library-hero h1 span {
          display: block;
          color: var(--light-gold);
        }

        .library-hero-content > p {
          font-size: 16px;
          margin: 18px 0 0;
          color: #fff5e8;
        }

        .library-hero-image {
          min-height: 340px;
          position: relative;
          overflow: hidden;
          clip-path: polygon(13% 0,100% 0,100% 100%,25% 100%,0 0);
          margin-left: -55px;
        }

        .library-hero-image img {
          height: 100%;
          width: 100%;
          position: absolute;
          inset: 0;
          object-fit: cover;
          object-position: center;
          animation: libImageReveal 1.3s ease both;
        }

        /* ABOUT */

        .library-about {
          display: grid;
          grid-template-columns: .9fr 1.3fr .85fr;
          gap: 28px;
          align-items: center;
          padding: 55px 0 40px;
        }

        .library-about-image {
          height: 290px;
          position: relative;
        }

        .library-about-image img {
          width: 100%;
          height: 100%;
          object-fit: cover;
          border-radius: 12px;
          position: relative;
          z-index: 1;
        }

        .library-image-decoration {
          position: absolute;
          bottom: -9px;
          left: -9px;
          height: 65px;
          width: 65px;
          border-left: 4px solid var(--gold);
          border-bottom: 4px solid var(--gold);
          border-radius: 0 0 0 12px;
        }

        .library-small-heading {
          color: var(--gold);
          font-size: 11px;
          font-weight: 700;
          letter-spacing: 2px;
        }

        .library-about-content h2 {
          font-family: Georgia,serif;
          color: var(--maroon);
          font-size: 30px;
          margin: 8px 0 12px;
        }

        .library-heading-line {
          width: 65px;
          height: 2px;
          background: var(--gold);
          margin-bottom: 16px;
        }

        .library-about-content p {
          font-size: 13px;
          line-height: 1.85;
          margin: 0 0 11px;
          text-align: justify;
        }

        /* TIMINGS */

        .library-timings {
          border: 1px solid var(--gold);
          border-radius: 12px;
          overflow: hidden;
          background: var(--cream);
        }

        .library-timings-header {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 15px;
          background: var(--maroon);
          color: white;
        }

        .library-timings-header span {
          font-size: 27px;
          color: var(--light-gold);
        }

        .library-timings-header h3 {
          margin: 0;
          font-family: Georgia,serif;
          font-size: 20px;
        }

        .library-time-heading {
          background: #F0DFC0;
          color: var(--dark);
          font-weight: 700;
          font-size: 13px;
          padding: 9px 12px;
        }

        .library-time-row {
          display: grid;
          grid-template-columns: 1.5fr 1fr 1fr;
          gap: 5px;
          padding: 10px 12px;
          font-size: 11px;
          border-bottom: 1px solid #EADFCF;
        }

        /* FACILITIES */

        .library-facilities {
          width: min(1200px,92%);
          margin: 10px auto 45px;
          padding: 23px 20px;
          background: linear-gradient(115deg,var(--dark),var(--maroon),#761F3C);
          border-radius: 12px;
          color: white;
          display: grid;
          grid-template-columns: 1.25fr repeat(5,1fr);
          align-items: center;
          box-shadow: 0 8px 25px rgba(100,28,50,.12);
        }

        .library-facility-title {
          display: flex;
          align-items: center;
          gap: 12px;
          padding: 8px 15px 8px 5px;
          border-right: 1px solid var(--gold);
        }

        .library-facility-title span {
          color: var(--light-gold);
          font-size: 33px;
        }

        .library-facility-title h2 {
          font-family: Georgia,serif;
          font-size: 21px;
          margin: 0;
          line-height: 1.3;
        }

        .library-facility-item {
          min-height: 75px;
          text-align: center;
          padding: 4px 10px;
          border-right: 1px solid var(--gold);
        }

        .library-facility-item:last-child {
          border-right: none;
        }

        .facility-icon {
          display: block;
          font-size: 27px;
          margin-bottom: 7px;
        }

        .library-facility-item h3 {
          font-size: 12px;
          margin: 0;
          color: white;
        }

        .library-facility-item p {
          font-size: 11px;
          margin: 4px 0 0;
          color: #F3DFB6;
        }

        /* COLLECTIONS */

        .library-collections {
          padding-bottom: 45px;
        }

        .library-section-title {
          display: flex;
          align-items: center;
          gap: 17px;
          justify-content: center;
          margin-bottom: 20px;
        }

        .library-section-title > span {
          flex: 1;
          height: 1px;
          background: linear-gradient(to right,transparent,var(--gold));
        }

        .library-section-title > span:last-child {
          background: linear-gradient(to left,transparent,var(--gold));
        }

        .library-section-title h2 {
          font-family: Georgia,serif;
          color: var(--maroon);
          font-size: 28px;
          margin: 0;
          white-space: nowrap;
        }

        .library-collection-grid {
          display: grid;
          grid-template-columns: repeat(6,1fr);
          gap: 12px;
        }

        .library-collection-card {
          background: linear-gradient(145deg,#FFFAF2,#F7EEE1);
          border: 1px solid #E8C994;
          border-radius: 10px;
          min-height: 165px;
          padding: 19px 12px;
          text-align: center;
          transition: background .35s ease,box-shadow .35s ease,border-color .35s ease;
        }

        .library-collection-card:hover {
          background: white;
          border-color: var(--gold);
          box-shadow: 0 12px 25px rgba(100,28,50,.12);
        }

        .collection-icon {
          width: 47px;
          height: 47px;
          margin: 0 auto 12px;
          border-radius: 50%;
          background: var(--maroon);
          color: var(--light-gold);
          display: grid;
          place-items: center;
          font-size: 22px;
          transition: transform .4s ease;
        }

        .library-collection-card:hover .collection-icon {
          transform: rotate(8deg) scale(1.1);
        }

        .library-collection-card h3 {
          font-family: Georgia,serif;
          color: var(--maroon);
          font-size: 15px;
          margin: 0 0 8px;
          line-height: 1.4;
        }

        .library-collection-card p {
          color: #62534D;
          font-size: 11px;
          line-height: 1.5;
          margin: 0;
        }

        /* INFORMATION PANELS */

        .library-information-grid {
          display: grid;
          grid-template-columns: 1fr 1fr;
          gap: 22px;
          padding-bottom: 42px;
        }

        .library-info-card {
          border: 1px solid #E4C18A;
          border-radius: 11px;
          overflow: hidden;
          background: var(--cream);
        }

        .library-info-header {
          display: flex;
          align-items: center;
          gap: 12px;
          background: var(--maroon);
          padding: 13px 18px;
          color: white;
        }

        .library-info-header > span {
          color: var(--light-gold);
          font-size: 25px;
        }

        .library-info-header h2 {
          font-family: Georgia,serif;
          font-size: 21px;
          margin: 0;
          font-weight: 600;
        }

        .library-info-body {
          display: grid;
          grid-template-columns: 1fr 125px;
          min-height: 180px;
        }

        .library-info-text {
          padding: 20px;
        }

        .library-info-text > p {
          font-size: 13px;
          line-height: 1.7;
          margin: 0 0 15px;
        }

        .library-check-list {
          list-style: none;
          padding: 0;
          margin: 0;
        }

        .library-check-list li {
          font-size: 12px;
          line-height: 1.6;
          padding: 5px 0 5px 25px;
          position: relative;
        }

        .library-check-list li::before {
          content: "✓";
          position: absolute;
          left: 0;
          top: 4px;
          background: var(--gold);
          color: var(--dark);
          border-radius: 50%;
          width: 17px;
          height: 17px;
          display: grid;
          place-items: center;
          font-weight: bold;
        }

        .library-books-decoration {
          display: flex;
          align-items: center;
          justify-content: center;
          background: linear-gradient(90deg,transparent,#F3E5CF);
        }

        .library-books-decoration span {
          font-size: 70px;
        }

        /* ACCORDION */

        .library-resource-intro {
          padding: 13px 16px;
          font-size: 12px;
          color: #59464A;
          border-bottom: 1px solid #EADBC8;
        }

        .library-accordion-item {
          border-bottom: 1px solid #EADBC8;
        }

        .library-accordion-button {
          display: flex;
          width: 100%;
          align-items: center;
          gap: 12px;
          padding: 12px 15px;
          border: none;
          background: transparent;
          cursor: pointer;
          text-align: left;
          color: var(--dark);
          transition: background .3s ease;
          font-family: inherit;
        }

        .library-accordion-button:hover,
        .accordion-active .library-accordion-button {
          background: #F2E5D2;
        }

        .accordion-arrow {
          width: 24px;
          height: 24px;
          border-radius: 50%;
          background: var(--maroon);
          color: var(--light-gold);
          display: grid;
          place-items: center;
          font-size: 17px;
          flex-shrink: 0;
        }

        .accordion-title {
          flex: 1;
          font-size: 13px;
          font-weight: 700;
        }

        .accordion-title small {
          display: block;
          font-size: 10px;
          font-weight: 400;
          color: #806B64;
          margin-top: 3px;
        }

        .accordion-chevron {
          color: var(--maroon);
          font-size: 20px;
          font-weight: 700;
        }

        .library-accordion-panel {
          padding: 5px 20px 15px 53px;
          animation: libAccordionOpen .35s ease both;
        }

        .library-accordion-panel[hidden] {
          display: none;
        }

        .library-accordion-panel ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .library-accordion-panel li {
          padding: 7px 0;
          border-bottom: 1px dashed #E6D5BD;
          font-size: 12px;
        }

        .library-accordion-panel li:last-child {
          border: none;
        }

        .library-accordion-panel a,
        .resource-unlinked {
          color: var(--maroon);
          text-decoration: none;
          display: flex;
          justify-content: space-between;
          gap: 10px;
        }

        .library-accordion-panel a:hover {
          color: #B17A2B;
        }

        /* USEFUL LINKS */

        .library-useful-links {
          border: 1px solid #D9B779;
          border-radius: 11px;
          overflow: hidden;
          background: var(--cream);
          margin-bottom: 40px;
        }

        .library-useful-grid {
          display: grid;
          grid-template-columns: 1fr .8fr 1fr .8fr 1.25fr;
          padding: 20px 12px;
        }

        .library-useful-column {
          padding: 0 15px;
          border-right: 1px solid #E5C995;
        }

        .library-useful-column h3 {
          font-size: 14px;
          color: var(--maroon);
          margin: 0 0 12px;
          font-weight: 700;
        }

        .library-useful-column ul {
          list-style: none;
          margin: 0;
          padding: 0;
        }

        .library-useful-column li {
          font-size: 11px;
          margin-bottom: 9px;
          padding-left: 14px;
          position: relative;
        }

        .library-useful-column li::before {
          content: "›";
          color: #A82945;
          font-size: 18px;
          font-weight: bold;
          position: absolute;
          left: 0;
          top: -4px;
        }

        .library-useful-column a {
          color: var(--text);
          text-decoration: none;
          transition: color .25s ease;
        }

        .library-useful-column a:hover {
          color: #A82945;
        }

        .library-motto {
          background: var(--maroon);
          border-radius: 60% 0 0 0;
          color: var(--light-gold);
          display: flex;
          align-items: center;
          justify-content: center;
          flex-direction: column;
          text-align: center;
          gap: 12px;
          padding: 20px 10px;
          font-family: Georgia,serif;
          font-size: 18px;
          font-style: italic;
        }

        .library-motto div {
          font-size: 36px;
        }

        /* BOTTOM QUOTE */

        .library-bottom-quote {
          background: linear-gradient(110deg,var(--dark),var(--maroon));
          color: white;
          text-align: center;
          padding: 30px 15px;
          margin-top: 20px;
          border-top: 2px solid var(--gold);
        }

        .library-bottom-quote > span {
          color: var(--light-gold);
          font-family: Georgia,serif;
          font-size: 45px;
          line-height: .8;
        }

        .library-bottom-quote p {
          font-family: Georgia,serif;
          font-size: 19px;
          margin: 5px 0 10px;
        }

        .library-bottom-quote small {
          font-size: 10px;
          letter-spacing: 3px;
          color: var(--light-gold);
        }

        /* KEYFRAMES */

        @keyframes libHeroFade {
          from { opacity: 0; transform: translateX(-35px); }
          to { opacity: 1; transform: translateX(0); }
        }

        @keyframes libImageReveal {
          from { opacity: 0; transform: scale(1.08); }
          to { opacity: 1; transform: scale(1); }
        }

        @keyframes libAccordionOpen {
          from { opacity: 0; transform: translateY(-8px); }
          to { opacity: 1; transform: translateY(0); }
        }

        /* TABLET */

        @media (max-width: 1000px) {
          .library-about {
            grid-template-columns: .9fr 1.3fr;
          }

          .library-timings {
            grid-column: 1 / -1;
          }

          .library-facilities {
            grid-template-columns: repeat(3,1fr);
            gap: 15px;
          }

          .library-facility-title {
            grid-column: 1 / -1;
            justify-content: center;
            border-right: none;
            border-bottom: 1px solid var(--gold);
            padding-bottom: 15px;
          }

          .library-facility-item {
            border-right: none;
          }

          .library-collection-grid {
            grid-template-columns: repeat(3,1fr);
          }

          .library-useful-grid {
            grid-template-columns: repeat(2,1fr);
            gap: 20px;
          }

          .library-motto {
            min-height: 140px;
            border-radius: 10px;
          }
        }

        /* MOBILE */

        @media (max-width: 650px) {
          .library-section {
            width: 91%;
          }

          .library-hero {
            grid-template-columns: 1fr;
            min-height: auto;
          }

          .library-hero-content {
            padding: 42px 7% 35px;
          }

          .library-hero h1 {
            font-size: clamp(30px,8vw,42px);
          }

          .library-hero-image {
            min-height: 220px;
            margin: 0;
            clip-path: none;
          }

          .library-about {
            grid-template-columns: 1fr;
            gap: 24px;
            padding: 35px 0;
          }

          .library-about-image {
            height: 230px;
          }

          .library-about-content h2 {
            font-size: 26px;
          }

          .library-about-content p {
            font-size: 13px;
          }

          .library-timings {
            grid-column: auto;
          }

          .library-facilities {
            grid-template-columns: repeat(2,1fr);
            padding: 20px 12px;
            gap: 10px;
          }

          .library-facility-title {
            grid-column: 1 / -1;
          }

          .library-facility-item {
            min-height: 95px;
            border-bottom: 1px solid rgba(201,164,92,.4);
          }

          .library-facility-item:last-child {
            grid-column: 1 / -1;
            border-bottom: none;
          }

          .library-section-title {
            gap: 9px;
          }

          .library-section-title h2 {
            font-size: 22px;
          }

          .library-collection-grid {
            grid-template-columns: repeat(2,1fr);
            gap: 10px;
          }

          .library-collection-card {
            min-height: 155px;
            padding: 15px 8px;
          }

          .library-collection-card h3 {
            font-size: 13px;
          }

          .library-information-grid {
            grid-template-columns: 1fr;
            gap: 20px;
          }

          .library-info-header h2 {
            font-size: 19px;
          }

          .library-info-body {
            grid-template-columns: 1fr 90px;
          }

          .library-books-decoration span {
            font-size: 48px;
          }

          .library-accordion-button {
            padding: 12px 10px;
          }

          .accordion-title {
            font-size: 12px;
          }

          .library-accordion-panel {
            padding-left: 43px;
          }

          .library-useful-grid {
            grid-template-columns: repeat(2,1fr);
            gap: 22px 8px;
            padding: 18px 10px;
          }

          .library-useful-column {
            padding: 0 9px;
          }

          .library-useful-column:nth-child(2) {
            border-right: none;
          }

          .library-motto {
            grid-column: 1 / -1;
          }

          .library-bottom-quote p {
            font-size: 16px;
          }

          .reveal-left {
            transform: translateX(-45px);
          }

          .reveal-right {
            transform: translateX(45px);
          }

          .reveal-up {
            transform: translateY(35px);
          }
        }

        /* SMALL MOBILE */

        @media (max-width: 380px) {
          .library-collection-grid {
            grid-template-columns: 1fr;
          }

          .library-time-row {
            font-size: 10px;
            padding: 9px 7px;
          }

          .library-info-body {
            grid-template-columns: 1fr;
          }

          .library-books-decoration {
            display: none;
          }
        }

        /* REDUCED MOTION */

        @media (prefers-reduced-motion: reduce) {
          .library-page *,
          .library-page *::before,
          .library-page *::after {
            animation-duration: .01ms !important;
            animation-iteration-count: 1 !important;
            transition-duration: .01ms !important;
            scroll-behavior: auto !important;
          }

          .library-reveal {
            opacity: 1;
            transform: none;
          }
        }
      `}</style>

      <main className="library-page">

        {/* HERO */}
        <section className="library-hero">
          <div className="library-hero-content">
            <div className="library-eyebrow">
              <span>LIBRARY</span>
              <i />
            </div>

            <h1>
              Knowledge Today...
              <span>Excellence Tomorrow...</span>
            </h1>

            <p>A hub for learning, research and innovation</p>
          </div>

          <div className="library-hero-image">
            <img src={libraryImage} alt="MIET Central Library" />
          </div>
        </section>

        {/* ABOUT */}
        <section className="library-about library-section">

          <div className="library-about-image library-reveal reveal-left">
            <img src={libraryImage} alt="MIET Library Reading Hall" />
            <div className="library-image-decoration" />
          </div>

          <div className="library-about-content library-reveal reveal-up">
            <span className="library-small-heading">DISCOVER OUR LIBRARY</span>
            <h2>About the Library</h2>
            <div className="library-heading-line" />

            <p>
              The library in MIET with build-up area of 300 Sq.m. has a
              well-furnished reading hall. MIET Library uses fully automated
              ILMS software by AutoLib. The automated package of library
              services provides circulation, acquisitions, cataloguing,
              web OPAC, Report Generation, Email & SMS Alert etc. Book
              database is created along with the user's database.
            </p>

            <p>
              The students and Faculty members are encouraged to utilize
              the learning materials available in the library. Patrons can
              borrow books using the ID card issued by the college.
              Issue return process is fully automated and manual cards
              are kept as supporting documents for students and faculty.
            </p>

            <p>
              The MIET Library subscribes to national and international
              journals. E-Journals like Springer, ProQuest and J-Gate are
              available in the Library. Computers with LAN connectivity
              are provided for accessing E-resources. The Library is
              also Wi-Fi enabled. Free internet browsing and photocopying
              facilities with nominal charges are available throughout
              the working hours.
            </p>

            <p>
              The National Digital Library (NDL) is a digital repository
              containing textbooks, articles, videos, audiobooks,
              lectures, theses and other learning media. It provides
              a single-window search facility to access digital content
              free of cost.
            </p>

            <p>
              NPTEL and DELNET facilities are useful to students and staff.
              DELNET provides Inter Library Loan (ILL) services for
              requesting books, photocopies and articles. NPTEL and
              SWAYAM learning videos can be accessed through the
              facilities provided in the library. Open access is
              practiced, and departmental libraries also function
              across the MIET campus. CCTV cameras are installed
              at strategic locations for surveillance.
            </p>
          </div>

          {/* TIMINGS */}
          <div className="library-timings library-reveal reveal-right">
            <div className="library-timings-header">
              <span>◷</span>
              <h3>Library Timings</h3>
            </div>

            {timings.map((item, index) => (
              item.heading ? (
                <div className="library-time-heading" key={index}>
                  {item.heading}
                </div>
              ) : (
                <div className="library-time-row" key={index}>
                  <span>{item.name}</span>
                  <span>{item.from}</span>
                  <span>{item.to}</span>
                </div>
              )
            ))}
          </div>
        </section>

        {/* FACILITIES */}
        <section className="library-facilities library-reveal reveal-up">

          <div className="library-facility-title">
            <span>✦</span>
            <h2>Library<br />Facilities</h2>
          </div>

          {facilities.map((facility, index) => (
            <div
              className={`library-facility-item library-reveal ${
                index % 2 === 0 ? "reveal-right" : "reveal-left"
              }`}
              key={facility.title}
              style={{ transitionDelay: `${index * 100}ms` }}
            >
              <span className="facility-icon">{facility.icon}</span>
              <h3>{facility.title}</h3>
              <p>{facility.desc}</p>
            </div>
          ))}
        </section>

        {/* COLLECTIONS */}
        <section className="library-section library-collections">

          <div className="library-section-title library-reveal reveal-up">
            <span />
            <h2>Library Collections</h2>
            <span />
          </div>

          <div className="library-collection-grid">
            {collections.map((item, index) => (
              <article
                className={`library-collection-card library-reveal ${
                  index % 2 === 0 ? "reveal-right" : "reveal-left"
                }`}
                style={{ transitionDelay: `${(index % 3) * 120}ms` }}
                key={item.title}
              >
                <div className="collection-icon">{item.icon}</div>
                <h3>{item.title}</h3>
                <p>{item.desc}</p>
              </article>
            ))}
          </div>
        </section>

        {/* BOOKS AND E-RESOURCES */}
        <section className="library-information-grid library-section">

          {/* BOOKS */}
          <article className="library-info-card library-reveal reveal-left">
            <div className="library-info-header">
              <span>📖</span>
              <h2>Books & Periodicals</h2>
            </div>

            <div className="library-info-body">
              <div className="library-info-text">
                <p>
                  The Library has abundant collection of books and CD's
                  on various branches of Engineering & Technology.
                </p>

                <ul className="library-check-list">
                  <li>Periodicals – Magazines</li>
                  <li>Newspapers</li>
                  <li>
                    Special Collections – Question Banks, Project
                    Reports, Back Volumes
                  </li>
                </ul>
              </div>

              <div className="library-books-decoration">
                <span>📚</span>
              </div>
            </div>
          </article>

          {/* E-RESOURCES */}
          <article className="library-info-card library-resources library-reveal reveal-right">

            <div className="library-info-header">
              <span>🌐</span>
              <h2>E-Resources</h2>
            </div>

            <div className="library-resource-intro">
              Explore our collection of digital academic resources.
            </div>

            <div className="library-accordion">
              {resources.map((group, index) => (
                <div
                  className={`library-accordion-item ${
                    activeAccordion === index ? "accordion-active" : ""
                  }`}
                  key={group.title}
                >
                  <button
                    className="library-accordion-button"
                    onClick={() => toggleAccordion(index)}
                    aria-expanded={activeAccordion === index}
                    aria-controls={`library-resource-${index}`}
                  >
                    <span className="accordion-arrow">
                      {activeAccordion === index ? "−" : "+"}
                    </span>

                    <span className="accordion-title">
                      {group.title}
                      <small>{group.subtitle}</small>
                    </span>

                    <span className="accordion-chevron">
                      {activeAccordion === index ? "⌃" : "⌄"}
                    </span>
                  </button>

                  <div
                    id={`library-resource-${index}`}
                    className="library-accordion-panel"
                    hidden={activeAccordion !== index}
                  >
                    <ul>
                      {group.links.map(([name, url]) => (
                        <li key={name}>
                          {url ? (
                            <a
                              href={url}
                              target="_blank"
                              rel="noopener noreferrer"
                            >
                              {name}
                              <span>↗</span>
                            </a>
                          ) : (
                            <span className="resource-unlinked">{name}</span>
                          )}
                        </li>
                      ))}
                    </ul>
                  </div>
                </div>
              ))}
            </div>
          </article>
        </section>

        {/* USEFUL LINKS */}
        <section className="library-useful-links library-section library-reveal reveal-up">

          <div className="library-info-header">
            <span>🔗</span>
            <h2>Useful Links</h2>
          </div>

          <div className="library-useful-grid">
            {usefulLinks.map((group, index) => (
              <div
                className={`library-useful-column library-reveal ${
                  index % 2 === 0 ? "reveal-right" : "reveal-left"
                }`}
                style={{ transitionDelay: `${index * 100}ms` }}
                key={group.title}
              >
                <h3>{group.title}</h3>

                <ul>
                  {group.links.map(([name, url]) => (
                    <li key={name}>
                      {url ? (
                        <a
                          href={url}
                          target="_blank"
                          rel="noopener noreferrer"
                        >
                          {name}
                        </a>
                      ) : (
                        <span>{name}</span>
                      )}
                    </li>
                  ))}
                </ul>
              </div>
            ))}

            <div className="library-motto">
              <span>Learn · Research · Grow</span>
              <div>📖</div>
            </div>
          </div>
        </section>

        {/* BOTTOM QUOTE */}
        <section className="library-bottom-quote library-reveal reveal-up">
          <span>“</span>
          <p>Empowering minds through knowledge and lifelong learning.</p>
          <small>MIET LIBRARY</small>
        </section>

      </main>
    </>
  );
};

export default Library;
