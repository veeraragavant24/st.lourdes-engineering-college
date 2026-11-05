import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {

  Layers3,
  Monitor,
  Cpu,
  Settings,
  ShieldCheck,
  Code2,
  BrainCircuit,
  BriefcaseBusiness,
  ArrowRight,
  CheckCircle2,
  UserRound,
  BookOpen,
  Target,
  Trophy,
  Wrench,
  Lightbulb,
  Network,
  Database,
} from 'lucide-react';

import type { LucideIcon } from 'lucide-react';

/* =========================================================
   ST. LOURDES ENGINEERING COLLEGE
   DEPARTMENTS PAGE
   Theme: Royal Maroon + Elegant Gold
   ========================================================= */

type Department = {
  id: number;
  name: string;
  shortName: string;
  description: string;
  focusAreas: string[];
  facilities: string[];
  outcomes: string[];
  icon: LucideIcon;
  image: string;
  url: string;
};

const departments: Department[] = [
  {
    id: 1,
    name: 'Computer Science and Engineering',
    shortName: 'B.E. Computer Science and Engineering',
    description:
      'Build expertise in computing, software development, artificial intelligence and emerging technologies. Develop the technical skills needed to design innovative solutions and solve real-world challenges.',
    focusAreas: [
      'Software Development',
      'Data Structures and Algorithms',
      'Artificial Intelligence',
      'Web and Application Development',
      'Computer Networks',
    ],
    facilities: [
      'Programming Laboratories',
      'Software Development Labs',
      'Computer Networks Laboratory',
      'Project and Innovation Facilities',
    ],
    outcomes: [
      'Develop reliable software applications',
      'Apply computational thinking to problems',
      'Build practical technology solutions',
      'Collaborate on innovative projects',
    ],
    icon: Monitor,
    image:
      'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/b-e-computer-science-and-engineering/',
  },
  {
    id: 2,
    name: 'Computer Science and Engineering (Cyber Security)',
    shortName: 'B.E. CSE (Cyber Security)',
    description:
      'Explore the world of cybersecurity, ethical hacking, digital forensics and information protection. Develop the skills to secure digital systems, networks and applications against evolving cyber threats.',
    focusAreas: [
      'Cyber Security Fundamentals',
      'Ethical Hacking',
      'Network Security',
      'Digital Forensics',
      'Cryptography and Data Protection',
    ],
    facilities: [
      'Cyber Security Laboratory',
      'Network Security Laboratory',
      'Programming and Testing Facilities',
      'Digital Investigation Tools',
    ],
    outcomes: [
      'Identify and analyse security vulnerabilities',
      'Understand cyber threats and prevention',
      'Apply network and information security concepts',
      'Develop secure computing solutions',
    ],
    icon: ShieldCheck,
    image:
      'https://images.unsplash.com/photo-1550751827-4bd374c3f58b?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/b-e-computer-science-and-engineering-cyber-security/',
  },
  {
    id: 3,
    name: 'Electronics and Communication Engineering',
    shortName: 'B.E. Electronics and Communication Engineering',
    description:
      'Explore electronic circuits, communication technologies, embedded systems and intelligent electronic devices through theoretical and practical learning.',
    focusAreas: [
      'Electronic Circuit Design',
      'Communication Systems',
      'Embedded Systems',
      'Signal Processing',
      'Internet of Things',
    ],
    facilities: [
      'Electronic Circuits Laboratory',
      'Communication Systems Laboratory',
      'Digital Electronics Laboratory',
      'Embedded Systems Facilities',
    ],
    outcomes: [
      'Design and test electronic circuits',
      'Understand modern communication systems',
      'Develop embedded applications',
      'Apply engineering principles practically',
    ],
    icon: Cpu,
    image:
      'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/b-e-electronics-and-communication-engineering/',
  },
  {
    id: 4,
    name: 'Information Technology',
    shortName: 'B.Tech. Information Technology',
    description:
      'Develop a strong foundation in information technology, software engineering, databases, cloud computing and modern digital platforms. Learn to create technology-driven solutions for businesses and society.',
    focusAreas: [
      'Information Systems',
      'Web Technologies',
      'Database Management',
      'Cloud Computing',
      'Software Engineering',
    ],
    facilities: [
      'Information Technology Laboratories',
      'Database Management Laboratory',
      'Web Development Facilities',
      'Networking and Computing Facilities',
    ],
    outcomes: [
      'Design and develop modern applications',
      'Manage information systems effectively',
      'Work with databases and cloud platforms',
      'Solve business and technical challenges',
    ],
    icon: Database,
    image:
      'https://images.unsplash.com/photo-1519389950473-47ba0277781c?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/b-tech-information-technology/',
  },
  {
    id: 5,
    name: 'Artificial Intelligence and Data Science',
    shortName: 'B.Tech. Artificial Intelligence and Data Science',
    description:
      'Discover the power of artificial intelligence, machine learning, data analytics and intelligent systems. Gain the knowledge to transform complex data into meaningful insights and smart solutions.',
    focusAreas: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Analytics',
      'Deep Learning',
      'Big Data Technologies',
    ],
    facilities: [
      'Artificial Intelligence Laboratory',
      'Data Science Laboratory',
      'Machine Learning Facilities',
      'Computing and Research Facilities',
    ],
    outcomes: [
      'Build intelligent software solutions',
      'Analyse and interpret complex datasets',
      'Apply machine learning techniques',
      'Develop data-driven applications',
    ],
    icon: BrainCircuit,
    image:
      'https://images.unsplash.com/photo-1677442136019-21780ecad995?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/b-tech-artificial-intelligence-and-data-science/',
  },
  {
    id: 6,
    name: 'Computer Science and Engineering',
    shortName: 'M.E. Computer Science and Engineering',
    description:
      'Advance your technical knowledge through postgraduate study in computer science and engineering. Explore advanced computing concepts, research methodologies and innovative technology development.',
    focusAreas: [
      'Advanced Computer Science',
      'Research and Development',
      'Advanced Algorithms',
      'Intelligent Computing',
      'Emerging Technologies',
    ],
    facilities: [
      'Advanced Computing Laboratories',
      'Research and Development Facilities',
      'Technical Project Facilities',
      'Digital Learning Resources',
    ],
    outcomes: [
      'Develop advanced technical expertise',
      'Conduct research-oriented projects',
      'Evaluate emerging technologies',
      'Contribute to innovation and development',
    ],
    icon: Code2,
    image:
      'https://images.unsplash.com/photo-1516321318423-f06f85e504b3?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/m-e-computer-science-and-engineering/',
  },
  {
    id: 7,
    name: 'Master of Business Administration',
    shortName: 'Master of Business Administration (MBA)',
    description:
      'Develop leadership, management and strategic decision-making skills. Gain knowledge in business administration, finance, marketing, human resources and entrepreneurship.',
    focusAreas: [
      'Business Management',
      'Financial Management',
      'Marketing Management',
      'Human Resource Management',
      'Entrepreneurship and Strategy',
    ],
    facilities: [
      'Management Learning Facilities',
      'Seminar and Presentation Facilities',
      'Business Case Study Resources',
      'Collaborative Learning Spaces',
    ],
    outcomes: [
      'Develop effective leadership skills',
      'Understand business and financial operations',
      'Make informed management decisions',
      'Build entrepreneurial thinking',
    ],
    icon: BriefcaseBusiness,
    image:
      'https://images.unsplash.com/photo-1521737711867-e3b97375f902?auto=format&fit=crop&w=1400&q=85',
    url: 'https://www.slec.edu.in/departments/master-of-business-administration-mba/',
  },
];

/* =========================================================
   STYLES
   ========================================================= */

function DepartmentStyles() {
  return (
    <style>{`

      .dept-page {
        --dept-maroon: #6E1832;
        --dept-maroon-dark: #4A1022;
        --dept-gold: #D8B54C;
        --dept-gold-dark: #B98219;
        --dept-gold-light: #F7EBC6;
        --dept-cream: #FBF9F5;
        --dept-text: #191522;
        --dept-muted: #625B60;

        background: var(--dept-cream);
        color: var(--dept-text);
        min-height: 100vh;
        overflow: clip;
        position: relative;
        isolation: isolate;
      }

      .dept-page *,
      .dept-page *::before,
      .dept-page *::after {
        box-sizing: border-box;
      }

      .dept-container {
        width: min(1220px, calc(100% - 64px));
        margin-inline: auto;
      }

      /* ================= HERO ================= */

      .dept-hero {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        padding: 85px 0 58px;
        color: #fff;
        background: linear-gradient(
          112deg,
          #580F26 0%,
          #76132F 52%,
          #5A1026 100%
        );
      }

      .dept-hero::before {
        content: "";
        position: absolute;
        z-index: -1;
        width: 420px;
        height: 420px;
        right: -170px;
        top: -245px;
        border: 1px solid rgba(216,181,76,.18);
        border-radius: 50%;
      }

      .dept-hero::after {
        content: "";
        position: absolute;
        z-index: -1;
        width: 300px;
        height: 300px;
        right: -100px;
        bottom: -230px;
        border: 1px solid rgba(216,181,76,.16);
        border-radius: 50%;
      }

    .dept-hero-inner {
  display: grid;
  grid-template-columns: 1fr;
  align-items: center;
  gap: 0;
}

.dept-hero-inner > div:first-child {
  max-width: 850px;
}
      .dept-eyebrow {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: 16px;
        color: var(--dept-gold);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .dept-eyebrow::before,
      .dept-eyebrow::after {
        content: "";
        width: 36px;
        height: 2px;
        background: var(--dept-gold);
      }

      .dept-hero h1 {
        max-width: 650px;
        margin: 0 0 17px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(30px, 3.2vw, 44px);
        font-weight: 700;
        line-height: 1.08;
        letter-spacing: -1px;
      }

      .dept-hero h1 span {
        display: block;
        color: var(--dept-gold);
      }

      .dept-hero-description {
  max-width: 650px;
  margin: 0;
  color: rgba(255,255,255,.93);
  font-size: 16px;
  line-height: 1.9;
}

      .dept-hero-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: center;
      }

      .dept-stat {
        min-width: 0;
        padding: 12px 15px;
        text-align: center;
        border-right: 1px solid rgba(216,181,76,.8);
      }

      .dept-stat:last-child {
        border-right: none;
      }

      .dept-stat svg {
        display: block;
        width: 35px;
        height: 35px;
        margin: 0 auto 8px;
        color: var(--dept-gold);
        stroke-width: 1.7;
      }

      .dept-stat strong {
        display: block;
        margin-bottom: 3px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 21px;
        line-height: 1.2;
      }

      .dept-stat span {
        display: block;
        color: rgba(255,255,255,.88);
        font-size: 10px;
        line-height: 1.5;
      }

      /* ================= BUTTONS ================= */

      .dept-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 12px;
        min-height: 44px;
        padding: 11px 20px;
        border: 1px solid var(--dept-maroon);
        border-radius: 7px;
        background: var(--dept-maroon);
        color: #fff;
        font-size: 11px;
        font-weight: 700;
        text-decoration: none;
        transition: all 250ms ease;
      }

      .dept-button svg {
        width: 17px;
        height: 17px;
        flex-shrink: 0;
        transition: transform 250ms ease;
      }

      .dept-button:hover {
        gap: 17px;
        border-color: var(--dept-gold);
        background: var(--dept-gold);
        color: var(--dept-maroon-dark);
        box-shadow: 0 5px 15px rgba(74,16,34,.12);
      }

      .dept-button:hover svg {
        transform: translateX(3px);
      }

      .dept-button-gold {
        border-color: var(--dept-gold);
        background: var(--dept-gold);
        color: var(--dept-maroon-dark);
      }

      .dept-button-gold:hover {
        border-color: #fff;
        background: #fff;
        color: var(--dept-maroon-dark);
      }

      /* ================= DEPARTMENT SELECTOR ================= */

      .dept-selector-section {
        position: relative;
        z-index: 1;
        padding-top: 30px;
      }

      .dept-selector {
        padding: 24px;
        border: 1px solid rgba(184,130,25,.55);
        border-radius: 19px;
        background: #fff;
        box-shadow: 0 8px 28px rgba(74,16,34,.055);
      }

      .dept-selector-heading {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 16px;
        margin-bottom: 20px;
      }

      .dept-selector-title {
        display: flex;
        align-items: center;
        gap: 14px;
      }

      .dept-selector-title > svg {
        width: 32px;
        height: 32px;
        color: var(--dept-maroon);
        stroke-width: 1.8;
      }

      .dept-selector-title h2 {
        margin: 0;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 21px;
      }

      .dept-count {
        flex-shrink: 0;
        color: var(--dept-maroon);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: .5px;
      }

      .dept-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 15px 20px;
      }

      /* ================= DEPARTMENT CARDS ================= */

      .dept-card {
        min-width: 0;
        opacity: 0;
        transform: translate3d(-65px, 0, 0);
        transition:
          opacity 700ms ease,
          transform 900ms cubic-bezier(.22, 1, .36, 1);
        will-change: transform, opacity;
      }

      .dept-card.from-right {
        transform: translate3d(65px, 0, 0);
      }

      .dept-card.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .dept-card-link {
        display: grid;
        grid-template-columns: 62px minmax(0, 1fr) 30px;
        align-items: center;
        gap: 15px;
        width: 100%;
        min-height: 96px;
        padding: 14px 16px;
        border: 1px solid #E8D5B5;
        border-radius: 12px;
        background: #fff;
        color: inherit;
        text-decoration: none;
        box-shadow: 0 3px 8px rgba(74,16,34,.025);
        transition:
          transform 280ms ease,
          border-color 280ms ease,
          background 280ms ease,
          box-shadow 280ms ease;
      }

      .dept-card-link:hover {
        transform: translateY(-5px);
        border-color: var(--dept-gold-dark);
        background: #FFFCF5;
        box-shadow: 0 12px 24px rgba(74,16,34,.09);
      }

      .dept-card-link.selected {
        border-color: var(--dept-gold-dark);
        background: #FFFCF5;
        box-shadow: 0 0 0 2px rgba(216,181,76,.16);
      }

      .dept-card-icon {
        display: grid;
        place-items: center;
        width: 60px;
        height: 60px;
        border-radius: 14px;
        background: linear-gradient(145deg, #8B1C3B, var(--dept-maroon));
        color: var(--dept-gold);
        transition: transform 300ms ease, background 300ms ease;
      }

      .dept-card-icon svg {
        width: 31px;
        height: 31px;
        stroke-width: 1.9;
      }

      .dept-card-link:hover .dept-card-icon {
        transform: scale(1.06);
        background: var(--dept-maroon-dark);
      }

      .dept-card-title {
        display: block;
        margin: 0;
        color: #211321;
        font-family: Georgia, "Times New Roman", serif;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.45;
      }

      .dept-card-subtitle {
        display: block;
        margin-top: 5px;
        color: #8B7B78;
        font-family: Arial, sans-serif;
        font-size: 9px;
        font-weight: 600;
        letter-spacing: .5px;
        text-transform: uppercase;
      }

      .dept-card-arrow {
        display: grid;
        place-items: center;
        width: 29px;
        height: 29px;
        border: 2px solid var(--dept-gold-dark);
        border-radius: 50%;
        color: var(--dept-gold-dark);
        transition: all 250ms ease;
      }

      .dept-card-arrow svg {
        width: 16px;
        height: 16px;
      }

      .dept-card-link:hover .dept-card-arrow {
        transform: translateX(3px);
        background: var(--dept-gold);
        color: var(--dept-maroon-dark);
      }

      /* ================= FEATURED DEPARTMENT ================= */

      .dept-featured-section {
        padding-top: 30px;
      }

      .dept-featured {
        display: grid;
        grid-template-columns: .95fr 1.05fr;
        min-height: 300px;
        overflow: hidden;
        border: 1px solid var(--dept-gold-dark);
        border-radius: 18px;
        background: #fff;
        box-shadow: 0 8px 25px rgba(74,16,34,.06);
      }

      .dept-featured-copy {
        display: flex;
        flex-direction: column;
        align-items: flex-start;
        justify-content: center;
        padding: 35px 32px;
        background: linear-gradient(140deg, #77152F, var(--dept-maroon-dark));
        color: #fff;
      }

      .dept-featured-label {
        display: inline-flex;
        align-items: center;
        padding: 7px 14px;
        margin-bottom: 14px;
        border-radius: 30px;
        background: var(--dept-gold);
        color: var(--dept-maroon-dark);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: .7px;
        text-transform: uppercase;
      }

      .dept-featured-copy h2 {
        margin: 0 0 13px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(22px, 2.4vw, 30px);
        line-height: 1.15;
      }
.dept-featured-copy p {
  margin: 0 0 22px;
  color: rgba(255,255,255,.90);
  font-size: 15px;
  line-height: 1.9;
}

      .dept-featured-image {
        position: relative;
        min-height: 300px;
        overflow: hidden;
        background: #E9E4DA;
      }

      .dept-featured-image img {
        display: block;
        width: 100%;
        height: 100%;
        min-height: 300px;
        object-fit: cover;
        transition: transform 650ms ease;
      }

      .dept-featured:hover .dept-featured-image img {
        transform: scale(1.035);
      }

      /* ================= DETAILS GRID ================= */

      .dept-details-section {
        padding-top: 28px;
      }

      .dept-details-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
      }

      .dept-panel {
        min-width: 0;
        height: 100%;
        padding: 27px;
        border: 1px solid #E8D5B5;
        border-radius: 15px;
        background: #fff;
        box-shadow: 0 5px 17px rgba(74,16,34,.035);
      }

      .dept-panel-heading {
        display: flex;
        align-items: center;
        gap: 13px;
        margin: 0 0 18px;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 16px;
        line-height: 1.35;
      }

      .dept-panel-heading svg {
        width: 27px;
        height: 27px;
        flex-shrink: 0;
        color: var(--dept-gold-dark);
        stroke-width: 1.8;
      }

      .dept-hod {
        display: flex;
        align-items: center;
        gap: 16px;
        padding-bottom: 20px;
        margin-bottom: 20px;
        border-bottom: 1px solid #E8D5B5;
      }

      .dept-hod-icon {
        display: grid;
        place-items: center;
        width: 54px;
        height: 54px;
        flex-shrink: 0;
        border-radius: 12px;
        background: #FBF3DD;
        color: var(--dept-gold-dark);
      }

      .dept-hod-icon svg {
        width: 29px;
        height: 29px;
      }

      .dept-hod-label {
        margin: 0 0 5px;
        color: var(--dept-gold-dark);
        font-size: 9px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .dept-hod h3 {
        margin: 0 0 5px;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 14px;
      }

     .dept-hod p {
  margin: 0;
  color: var(--dept-muted);
  font-size: 14px;
  line-height: 1.8;
}
      .dept-overview-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 10px;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 16px;
      }

      .dept-overview-title svg {
        width: 24px;
        height: 24px;
        flex-shrink: 0;
        color: var(--dept-gold-dark);
      }

     .dept-overview-text {
  margin: 0;
  color: var(--dept-muted);
  font-size: 15px;
  line-height: 1.9;
}

      .dept-check-list {
        display: grid;
        gap: 13px;
        margin: 0;
        padding: 0;
        list-style: none;
      }
.dept-check-list li {
  display: flex;
  align-items: flex-start;
  gap: 11px;
  color: #393138;
  font-size: 14px;
  line-height: 1.8;
}

      .dept-check-list li svg {
        width: 17px;
        height: 17px;
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--dept-gold-dark);
      }

      /* ================= LOWER PANELS ================= */

      .dept-lower-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
        padding-top: 22px;
        padding-bottom: 60px;
      }

      .dept-lower-panel {
        min-width: 0;
        height: 100%;
        padding: 26px;
        border: 1px solid var(--dept-gold-dark);
        border-radius: 15px;
        background: #fff;
        box-shadow: 0 5px 17px rgba(74,16,34,.035);
      }

      .dept-lower-panel-maroon {
        border-color: var(--dept-gold);
        background: linear-gradient(135deg, #6E1832, #8B1737);
        color: #fff;
      }

      .dept-lower-panel-maroon .dept-panel-heading {
        color: #fff;
      }

      .dept-lower-panel-maroon .dept-panel-heading svg {
        color: var(--dept-gold);
      }

      .dept-lower-panel-maroon .dept-check-list li {
        color: rgba(255,255,255,.94);
      }

      .dept-lower-panel-maroon .dept-check-list li svg {
        color: var(--dept-gold);
      }

      /* ================= SCROLL REVEALS ================= */

      .dept-reveal {
        opacity: 0;
        transform: translate3d(0, 26px, 0);
        transition:
          opacity 650ms ease,
          transform 750ms cubic-bezier(.22, 1, .36, 1);
      }

      .dept-reveal.dept-from-left:not(.is-visible) {
        transform: translate3d(-75px, 22px, 0);
      }

      .dept-reveal.dept-from-right:not(.is-visible) {
        transform: translate3d(75px, 22px, 0);
      }

      .dept-reveal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .dept-reveal-child {
        opacity: 0;
        transform: translate3d(0, 18px, 0);
        transition:
          opacity 650ms ease,
          transform 750ms cubic-bezier(.22, 1, .36, 1);
      }

      .dept-reveal.is-visible .dept-reveal-child {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .dept-hero-inner > div:first-child {
        animation: deptHeroLeft 900ms cubic-bezier(.22, 1, .36, 1) both;
      }

      .dept-hero-stats {
        animation: deptHeroRight 1000ms 150ms cubic-bezier(.22, 1, .36, 1) both;
      }

      @keyframes deptHeroLeft {
        from {
          opacity: 0;
          transform: translate3d(-45px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      @keyframes deptHeroRight {
        from {
          opacity: 0;
          transform: translate3d(45px, 0, 0);
        }
        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      /* ================= TABLET ================= */

      @media (max-width: 900px) {
        .dept-container {
          width: min(100% - 40px, 760px);
        }

        .dept-hero {
          padding-top: 100px;
        }

        .dept-hero-inner {
          grid-template-columns: 1fr;
          gap: 28px;
        }

        .dept-hero-stats {
          max-width: 550px;
        }

        .dept-featured {
          grid-template-columns: 1fr 1fr;
        }

        .dept-featured-copy {
          padding: 27px 23px;
        }

        .dept-panel,
        .dept-lower-panel {
          padding: 22px;
        }

        .dept-card-link {
          grid-template-columns: 54px minmax(0, 1fr) 27px;
          gap: 12px;
          padding: 13px;
        }

        .dept-card-icon {
          width: 52px;
          height: 52px;
        }

        .dept-card-icon svg {
          width: 27px;
          height: 27px;
        }

        .dept-card-title {
          font-size: 12px;
        }
      }

      /* ================= MOBILE ================= */

      @media (max-width: 600px) {
        .dept-container {
          width: calc(100% - 30px);
        }

        .dept-hero {
          padding: 90px 0 36px;
        }

        .dept-hero-inner {
          gap: 24px;
        }

        .dept-eyebrow {
          gap: 9px;
          margin-bottom: 13px;
          font-size: 9px;
          letter-spacing: 2px;
        }

        .dept-eyebrow::before,
        .dept-eyebrow::after {
          width: 25px;
        }

        .dept-hero h1 {
          font-size: 30px;
          letter-spacing: -.5px;
        }

        .dept-hero-description {
          font-size: 11px;
          line-height: 1.8;
        }

        .dept-hero-stats {
          gap: 0;
        }

        .dept-stat {
          padding: 9px 5px;
        }

        .dept-stat svg {
          width: 27px;
          height: 27px;
          margin-bottom: 7px;
        }

        .dept-stat strong {
          font-size: 16px;
        }

        .dept-stat span {
          font-size: 9px;
        }

        .dept-selector-section {
          padding-top: 18px;
        }

        .dept-selector {
          padding: 17px 13px;
          border-radius: 13px;
        }

        .dept-selector-heading {
          align-items: flex-start;
          margin-bottom: 15px;
        }

        .dept-selector-title {
          gap: 9px;
        }

        .dept-selector-title > svg {
          width: 27px;
          height: 27px;
        }

        .dept-selector-title h2 {
          font-size: 17px;
        }

        .dept-count {
          padding-top: 6px;
          font-size: 8px;
        }

        .dept-grid {
          grid-template-columns: 1fr;
          gap: 11px;
        }

        .dept-card-link {
          grid-template-columns: 52px minmax(0, 1fr) 27px;
          min-height: 78px;
          gap: 11px;
          padding: 10px;
          border-radius: 10px;
        }

        .dept-card-icon {
          width: 49px;
          height: 49px;
          border-radius: 10px;
        }

        .dept-card-icon svg {
          width: 25px;
          height: 25px;
        }

        .dept-card-title {
          font-size: 12px;
        }

        .dept-card-subtitle {
          font-size: 8px;
        }

        .dept-card-arrow {
          width: 26px;
          height: 26px;
        }

        .dept-featured-section {
          padding-top: 20px;
        }

        .dept-featured {
          grid-template-columns: 1fr;
          border-radius: 13px;
        }

        .dept-featured-copy {
          padding: 25px 20px;
        }

        .dept-featured-copy h2 {
          font-size: 23px;
        }

        .dept-featured-copy p {
          font-size: 11px;
        }

        .dept-featured-image,
        .dept-featured-image img {
          min-height: 215px;
          height: 215px;
        }

        .dept-details-section {
          padding-top: 18px;
        }

        .dept-details-grid,
        .dept-lower-grid {
          grid-template-columns: 1fr;
          gap: 15px;
        }

        .dept-panel,
        .dept-lower-panel {
          padding: 20px 17px;
          border-radius: 12px;
        }

        .dept-panel-heading {
          gap: 10px;
          font-size: 16px;
        }

        .dept-hod {
          gap: 12px;
        }

        .dept-hod-icon {
          width: 46px;
          height: 46px;
        }

        .dept-hod h3 {
          font-size: 13px;
        }

        .dept-overview-title {
          font-size: 15px;
        }

        .dept-overview-text {
          font-size: 11px;
        }

        .dept-check-list {
          gap: 11px;
        }

        .dept-check-list li {
          font-size: 11px;
        }

        .dept-lower-grid {
          padding-top: 15px;
          padding-bottom: 35px;
        }
      }

      /* ================= ACCESSIBILITY ================= */

      @media (prefers-reduced-motion: reduce) {
        .dept-page *,
        .dept-page *::before,
        .dept-page *::after {
          scroll-behavior: auto !important;
          animation-duration: .01ms !important;
          animation-iteration-count: 1 !important;
          transition-duration: .01ms !important;
        }

        .dept-card,
        .dept-reveal,
        .dept-reveal-child {
          opacity: 1 !important;
          transform: none !important;
        }
      }

    `}</style>
  );
}

/* =========================================================
   REUSABLE SCROLL ANIMATION
   ========================================================= */

type RevealProps = {
  children: React.ReactNode;
  className?: string;
  direction?: 'left' | 'right' | 'up';
  delay?: number;
};

function Reveal({
  children,
  className = '',
  direction = 'up',
  delay = 0,
}: RevealProps) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -30px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  const directionClass =
    direction === 'left'
      ? 'dept-from-left'
      : direction === 'right'
        ? 'dept-from-right'
        : '';

  return (
    <div
      ref={ref}
      className={[
        'dept-reveal',
        directionClass,
        visible ? 'is-visible' : '',
        className,
      ]
        .filter(Boolean)
        .join(' ')}
      style={{
        transitionDelay: visible ? `${delay}ms` : '0ms',
      }}
    >
      {children}
    </div>
  );
}

/* =========================================================
   DEPARTMENT CARD
   ========================================================= */

function DepartmentCard({
  department,
  index,
  selected,
  onSelect,
}: {
  department: Department;
  index: number;
  selected: boolean;
  onSelect: () => void;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = department.icon;

  useEffect(() => {
    const element = ref.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        setVisible(entry.isIntersecting);
      },
      {
        threshold: 0.12,
        rootMargin: '0px 0px -25px 0px',
      }
    );

    observer.observe(element);

    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      className={[
        'dept-card',
        index % 2 === 0 ? 'from-left' : 'from-right',
        visible ? 'is-visible' : '',
      ].join(' ')}
      style={{
        transitionDelay: visible ? `${(index % 2) * 120}ms` : '0ms',
      }}
    >
      <a
        href={department.url}
        target="_blank"
        rel="noopener noreferrer"
        className={`dept-card-link ${selected ? 'selected' : ''}`}
        aria-label={`View ${department.shortName} department page`}
        onClick={onSelect}
      >
        <span className="dept-card-icon">
          <Icon aria-hidden="true" />
        </span>

        <span>
          <span className="dept-card-title">
            {department.name}
          </span>

          <span className="dept-card-subtitle">
            {department.shortName}
          </span>
        </span>

        <span className="dept-card-arrow">
          <ArrowRight aria-hidden="true" />
        </span>
      </a>
    </div>
  );
}

/* =========================================================
   REVEALING CHECKLIST
   ========================================================= */

function CheckList({
  items,
}: {
  items: string[];
}) {
  return (
    <ul className="dept-check-list">
      {items.map((item, index) => (
        <li
          key={item}
          className="dept-reveal-child"
          style={{
            transitionDelay: `${index * 110}ms`,
          }}
        >
          <CheckCircle2 aria-hidden="true" />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

/* =========================================================
   MAIN DEPARTMENTS PAGE
   ========================================================= */

export default function Departments() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department>(departments[0]);

  const featured = selectedDepartment;
  const FeaturedIcon = featured.icon;

  return (
    <div className="dept-page">

      <DepartmentStyles />

      {/* ================= HERO ================= */}

      <section
        className="dept-hero"
        data-header-theme="dark"
      >
        <div className="dept-container dept-hero-inner">

          <div>
            <div className="dept-eyebrow">
              Academics
            </div>

            <h1>
              Explore Our
              <span>Departments</span>
            </h1>

            <p className="dept-hero-description">
              Discover our diverse academic programmes designed
              to develop knowledge, technical expertise, research
              capabilities and professional excellence for a
              successful career.
            </p>
          </div>

        

         

        </div>
      </section>

      {/* ================= DEPARTMENT SELECTOR ================= */}

      <section
        className="dept-selector-section"
        id="all-departments"
      >
        <div className="dept-container">

          <Reveal>
            <div className="dept-selector">

              <div className="dept-selector-heading">

                <div className="dept-selector-title">
                  <Layers3 aria-hidden="true" />

                  <h2>
                    Choose a Department
                  </h2>
                </div>

                

              </div>

              <div className="dept-grid">

                {departments.map((department, index) => (
                  <DepartmentCard
                    key={department.id}
                    department={department}
                    index={index}
                    selected={selectedDepartment.id === department.id}
                    onSelect={() => setSelectedDepartment(department)}
                  />
                ))}

              </div>

            </div>
          </Reveal>

        </div>
      </section>

      {/* ================= FEATURED DEPARTMENT ================= */}

      <section className="dept-featured-section">

        <div className="dept-container">

          <Reveal>
            <div className="dept-featured">

              <div className="dept-featured-copy">

                <span className="dept-featured-label">
                  Programme {String(featured.id).padStart(2, '0')}
                </span>

                <h2>
                  {featured.shortName}
                </h2>

                <p>
                  {featured.description}
                </p>

                <a
                  href={featured.url}
                  target="_blank"
                  rel="noopener noreferrer"
                  className="dept-button dept-button-gold"
                >
                  Explore Department
                  <ArrowRight aria-hidden="true" />
                </a>

              </div>

              <div className="dept-featured-image">
                <img
                  src={featured.image}
                  alt={`${featured.name} academic programme`}
                  loading="lazy"
                />
              </div>

            </div>
          </Reveal>

        </div>

      </section>

      {/* ================= OVERVIEW AND FOCUS AREAS ================= */}

      <section className="dept-details-section">

        <div className="dept-container dept-details-grid">

          <Reveal direction="left">

            <div className="dept-panel">

              <div className="dept-hod">

                <div className="dept-hod-icon">
                  <FeaturedIcon aria-hidden="true" />
                </div>

                <div>
                  <p className="dept-hod-label">
                    Academic Programme
                  </p>

                  <h3>
                    {featured.shortName}
                  </h3>

                  <p>
                    St. Lourdes Engineering College
                  </p>
                </div>

              </div>

              <h3 className="dept-overview-title">
                <BookOpen aria-hidden="true" />
                Programme Overview
              </h3>

              <p className="dept-overview-text">
                {featured.description}

                {' '}The programme focuses on academic excellence,
                practical experience, professional skills and
                continuous learning to prepare students for
                future career opportunities.
              </p>

            </div>

          </Reveal>

          <Reveal direction="right" delay={100}>

            <div className="dept-panel">

              <h3 className="dept-panel-heading">
                <Target aria-hidden="true" />
                Key Focus Areas
              </h3>

              <CheckList items={featured.focusAreas} />

            </div>

          </Reveal>

        </div>

      </section>

      {/* ================= FACILITIES AND OUTCOMES ================= */}

      <section className="dept-container dept-lower-grid">

        <Reveal direction="left">

          <div className="dept-lower-panel">

            <h3 className="dept-panel-heading">
              <Wrench aria-hidden="true" />
              Learning Facilities
            </h3>

            <CheckList items={featured.facilities} />

          </div>

        </Reveal>

        <Reveal direction="right" delay={100}>

          <div className="dept-lower-panel dept-lower-panel-maroon">

            <h3 className="dept-panel-heading">
              <Trophy aria-hidden="true" />
              Learning Outcomes
            </h3>

            <CheckList items={featured.outcomes} />

          </div>

        </Reveal>

      </section>

      {/* ================= ADDITIONAL OPPORTUNITIES ================= */}

      <section className="dept-container dept-lower-grid">

        <Reveal direction="left">

          <div className="dept-lower-panel">

            <h3 className="dept-panel-heading">
              <Lightbulb aria-hidden="true" />
              Innovation & Research
            </h3>

            <p className="dept-overview-text">
              Encourage creative thinking, technical projects,
              collaborative learning and exploration of emerging
              technologies. Students are motivated to develop
              practical solutions through academic projects
              and research activities.
            </p>

          </div>

        </Reveal>

        <Reveal direction="right" delay={100}>

          <div className="dept-lower-panel">

            <h3 className="dept-panel-heading">
              <BriefcaseBusiness aria-hidden="true" />
              Career Opportunities
            </h3>

            <p className="dept-overview-text">
              Build professional skills through practical learning,
              projects, internships and career preparation activities.
              Explore opportunities in industry, research,
              entrepreneurship and higher education.
            </p>

            <div style={{ marginTop: 20 }}>

              <Link
                to="/admission"
                className="dept-button"
              >
                Apply for Admission
                <ArrowRight aria-hidden="true" />
              </Link>

            </div>

          </div>

        </Reveal>

      </section>

    </div>
  );
}