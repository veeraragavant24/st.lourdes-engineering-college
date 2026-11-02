
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import {
  GraduationCap,
  Users,
  FlaskConical,
  Layers3,
  Monitor,
  Cpu,
  Settings,
  HardHat,
  ArrowRight,
  CheckCircle2,
  UserRound,
  BookOpen,
  Target,
  Trophy,
  Wrench,
  Lightbulb,
  BriefcaseBusiness,
} from 'lucide-react';

/* =========================================================
   ST. LOURDES ENGINEERING COLLEGE
   Departments Page
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
  icon: typeof Monitor;
};

const departments: Department[] = [
  {
    id: 1,
    name: 'Computer Science & Engineering',
    shortName: 'Computer Science & Engineering',
    description:
      'Build expertise in computing, software development, artificial intelligence and emerging technologies. Develop the technical skills needed to solve real-world problems.',
    focusAreas: [
      'Software Development',
      'Artificial Intelligence',
      'Data Structures and Algorithms',
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
  },
  {
    id: 2,
    name: 'Electronics & Communication Engineering',
    shortName: 'Electronics & Communication Engineering',
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
  },
  {
    id: 3,
    name: 'Mechanical Engineering',
    shortName: 'Mechanical Engineering',
    description:
      'Design, analyse and innovate mechanical systems for real-world applications. Explore manufacturing, thermal engineering, automation and modern mechanical design.',
    focusAreas: [
      'Design and Manufacturing',
      'Thermal Engineering',
      'Automation and Robotics',
      'CAD / CAM / CAE',
      'Sustainable Engineering',
    ],
    facilities: [
      'Advanced Manufacturing Laboratory',
      'CAD / CAM Laboratory',
      'Thermal Engineering Laboratory',
      'Material Testing Facilities',
    ],
    outcomes: [
      'Apply engineering principles to real problems',
      'Design and analyse mechanical systems',
      'Use modern engineering tools effectively',
      'Demonstrate innovation and teamwork',
    ],
    icon: Settings,
  },
  {
    id: 4,
    name: 'Civil Engineering',
    shortName: 'Civil Engineering',
    description:
      'Explore the planning, design and construction of buildings and infrastructure, with a focus on structural safety, sustainable development and practical engineering.',
    focusAreas: [
      'Structural Engineering',
      'Construction Technology',
      'Geotechnical Engineering',
      'Environmental Engineering',
      'Surveying and Planning',
    ],
    facilities: [
      'Surveying Laboratory',
      'Concrete and Material Testing',
      'Soil Mechanics Laboratory',
      'Environmental Engineering Facilities',
    ],
    outcomes: [
      'Understand structural design principles',
      'Evaluate construction materials',
      'Plan sustainable infrastructure',
      'Apply engineering standards responsibly',
    ],
    icon: HardHat,
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

      /* HERO */

      .dept-hero {
        position: relative;
        overflow: hidden;
        isolation: isolate;
        padding: 54px 0 58px;
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
        grid-template-columns: 1.1fr .9fr;
        align-items: center;
        gap: 45px;
      }

      .dept-eyebrow {
        display: flex;
        align-items: center;
        gap: 13px;
        margin-bottom: 16px;
        color: var(--dept-gold);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .dept-eyebrow::before,
      .dept-eyebrow::after {
        content: "";
        width: 40px;
        height: 2px;
        background: var(--dept-gold);
      }

      .dept-hero h1 {
        max-width: 650px;
        margin: 0 0 17px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(36px, 4.5vw, 58px);
        font-weight: 700;
        line-height: .99;
        letter-spacing: -1.5px;
      }

      .dept-hero h1 span {
        display: block;
        color: var(--dept-gold);
      }

      .dept-hero-description {
        max-width: 580px;
        margin: 0;
        color: rgba(255,255,255,.91);
        font-size: 11px;
        line-height: 1.9;
      }

      .dept-hero-stats {
        display: grid;
        grid-template-columns: repeat(3, minmax(0, 1fr));
        align-items: center;
        gap: 0;
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
        width: 37px;
        height: 37px;
        margin: 0 auto 8px;
        color: var(--dept-gold);
        stroke-width: 1.7;
      }

      .dept-stat strong {
        display: block;
        margin-bottom: 3px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(18px, 2vw, 25px);
        line-height: 1.1;
      }

      .dept-stat span {
        display: block;
        color: rgba(255,255,255,.88);
        font-size: 11px;
        line-height: 1.5;
      }

      /* BUTTONS */

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
        transition:
          background 250ms ease,
          color 250ms ease,
          border-color 250ms ease,
          box-shadow 250ms ease,
          gap 250ms ease;
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

      /* DEPARTMENT SELECTOR */

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
        width: 34px;
        height: 34px;
        color: var(--dept-maroon);
        stroke-width: 1.8;
      }

      .dept-selector-title h2 {
        margin: 0;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(18px, 2vw, 25px);
      }

      .dept-count {
        flex-shrink: 0;
        color: var(--dept-maroon);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .5px;
      }

      .dept-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 16px 22px;
      }

      .dept-card {
        --card-x: -75px;

        position: relative;
        min-width: 0;
        opacity: 0;
        transform: translate3d(var(--card-x), 0, 0);
        transition:
          opacity 700ms ease,
          transform 900ms cubic-bezier(.22, 1, .36, 1);
        will-change: transform, opacity;
      }

      .dept-card.from-right {
        --card-x: 75px;
      }

      .dept-card.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .dept-card-link {
        display: grid;
        grid-template-columns: 72px minmax(0, 1fr) 32px;
        align-items: center;
        gap: 16px;
        width: 100%;
        min-height: 108px;
        padding: 16px 18px;
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

      .dept-card-icon {
        display: grid;
        place-items: center;
        width: 68px;
        height: 68px;
        border-radius: 15px;
        background: linear-gradient(
          145deg,
          #8B1C3B,
          var(--dept-maroon)
        );
        color: var(--dept-gold);
        transition:
          transform 300ms ease,
          background 300ms ease;
      }

      .dept-card-icon svg {
        width: 35px;
        height: 35px;
        stroke-width: 1.9;
      }

      .dept-card-link:hover .dept-card-icon {
        transform: scale(1.05);
        background: var(--dept-maroon-dark);
      }

      .dept-card-title {
        margin: 0;
        color: #211321;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(13px, 1.35vw, 18px);
        font-weight: 700;
        line-height: 1.3;
      }

      .dept-card-arrow {
        display: grid;
        place-items: center;
        width: 30px;
        height: 30px;
        border: 2px solid var(--dept-gold-dark);
        border-radius: 50%;
        color: var(--dept-gold-dark);
        transition:
          color 250ms ease,
          background 250ms ease,
          transform 250ms ease;
      }

      .dept-card-arrow svg {
        width: 17px;
        height: 17px;
      }

      .dept-card-link:hover .dept-card-arrow {
        transform: translateX(3px);
        background: var(--dept-gold);
        color: var(--dept-maroon-dark);
      }

      /* FEATURED DEPARTMENT */

      .dept-featured-section {
        padding-top: 32px;
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
        background: linear-gradient(
          140deg,
          #77152F,
          var(--dept-maroon-dark)
        );
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
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .7px;
        text-transform: uppercase;
      }

      .dept-featured-copy h2 {
        margin: 0 0 13px;
        font-family: Georgia, "Times New Roman", serif;
        font-size: clamp(24px, 2.8vw, 36px);
        line-height: 1.08;
      }

      .dept-featured-copy p {
        margin: 0 0 22px;
        color: rgba(255,255,255,.88);
        font-size: 11px;
        line-height: 1.8;
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

      /* DETAILS GRID */

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
        width: 28px;
        height: 28px;
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
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .dept-hod h3 {
        margin: 0 0 5px;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 16px;
      }

      .dept-hod p {
        margin: 0;
        color: var(--dept-muted);
        font-size: 11px;
        line-height: 1.7;
      }

      .dept-overview-title {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 10px;
        color: var(--dept-maroon);
        font-family: Georgia, "Times New Roman", serif;
        font-size: 18px;
      }

      .dept-overview-title svg {
        width: 25px;
        height: 25px;
        flex-shrink: 0;
        color: var(--dept-gold-dark);
      }

      .dept-overview-text {
        margin: 0;
        color: var(--dept-muted);
        font-size: 11px;
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
        font-size: 11px;
        line-height: 1.65;
      }

      .dept-check-list li svg {
        width: 17px;
        height: 17px;
        flex-shrink: 0;
        margin-top: 1px;
        color: var(--dept-gold-dark);
      }

      /* LOWER INFORMATION PANELS */

      .dept-lower-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 22px;
        padding-top: 22px;
        padding-bottom: 60px;
      }

      .dept-lower-panel {
        min-width: 0;
        padding: 26px;
        border: 1px solid var(--dept-gold-dark);
        border-radius: 15px;
        background: #fff;
        box-shadow: 0 5px 17px rgba(74,16,34,.035);
      }

      .dept-lower-panel-maroon {
        border-color: var(--dept-gold);
        background: linear-gradient(
          135deg,
          #6E1832,
          #8B1737
        );
        color: #fff;
      }

      .dept-lower-panel .dept-panel-heading {
        margin-bottom: 20px;
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

      /* SCROLL REVEALS */

      .dept-reveal {
        opacity: 0;
        transform: translate3d(0, 26px, 0);
        transition:
          opacity 650ms ease,
          transform 750ms cubic-bezier(.22, 1, .36, 1);
      }

      .dept-reveal.is-visible {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      .dept-reveal-child {
        opacity: 0;
        transform: translate3d(0, 15px, 0);
        transition:
          opacity 550ms ease,
          transform 650ms cubic-bezier(.22, 1, .36, 1);
      }

      .dept-reveal.is-visible .dept-reveal-child {
        opacity: 1;
        transform: translate3d(0, 0, 0);
      }

      /* RESPONSIVE TABLET */

      @media (max-width: 900px) {
        .dept-container {
          width: min(100% - 40px, 760px);
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
          grid-template-columns: 58px minmax(0, 1fr) 28px;
          gap: 12px;
          padding: 14px;
        }

        .dept-card-icon {
          width: 56px;
          height: 56px;
        }

        .dept-card-icon svg {
          width: 29px;
          height: 29px;
        }
      }

/* ===== ADVANCED LEFT / RIGHT SCROLL REVEALS ===== */

/* Content enters from the left */
.dept-reveal.dept-from-left:not(.is-visible) {
  opacity: 0;
  transform: translate3d(-85px, 22px, 0);
}

/* Content enters from the right */
.dept-reveal.dept-from-right:not(.is-visible) {
  opacity: 0;
  transform: translate3d(85px, 22px, 0);
}

/* Smooth reveal when the element enters the viewport */
.dept-reveal.is-visible {
  opacity: 1;
  transform: translate3d(0, 0, 0);
}

/* Reveal text and list items gradually */
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

/* Subtle entrance for the hero when the page loads */
.dept-hero-inner > div:first-child {
  animation: deptHeroLeft 900ms cubic-bezier(.22, 1, .36, 1) both;
}

.dept-hero-stats {
  animation: deptHeroRight 1000ms 150ms
    cubic-bezier(.22, 1, .36, 1) both;
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

/* Respect accessibility preferences */
@media (prefers-reduced-motion: reduce) {
  .dept-hero-inner > div:first-child,
  .dept-hero-stats {
    animation: none !important;
  }
}

      /* RESPONSIVE MOBILE */

      @media (max-width: 600px) {
        .dept-container {
          width: calc(100% - 30px);
        }

        .dept-hero {
          padding: 38px 0 36px;
        }

        .dept-hero-inner {
          gap: 25px;
        }

        .dept-eyebrow {
          gap: 9px;
          margin-bottom: 13px;
          font-size: 10px;
          letter-spacing: 2px;
        }

        .dept-eyebrow::before,
        .dept-eyebrow::after {
          width: 25px;
        }

        .dept-hero h1 {
          font-size: clamp(32px, 9vw, 44px);
          letter-spacing: -1px;
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
          width: 28px;
          height: 28px;
          margin-bottom: 7px;
        }

        .dept-stat strong {
          font-size: 16px;
        }

        .dept-stat span {
          font-size: 10px;
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
          font-size: 18px;
        }

        .dept-count {
          padding-top: 6px;
          font-size: 9px;
        }

        .dept-grid {
          grid-template-columns: 1fr;
          gap: 11px;
        }

        .dept-card {
          --card-x: -38px;
        }

        .dept-card.from-right {
          --card-x: 38px;
        }

        .dept-card-link {
          grid-template-columns: 54px minmax(0, 1fr) 27px;
          min-height: 82px;
          gap: 12px;
          padding: 11px;
          border-radius: 10px;
        }

        .dept-card-icon {
          width: 52px;
          height: 52px;
          border-radius: 11px;
        }

        .dept-card-icon svg {
          width: 27px;
          height: 27px;
        }

        .dept-card-title {
          font-size: 11px;
        }

        .dept-card-arrow {
          width: 27px;
          height: 27px;
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

        .dept-featured-label {
          margin-bottom: 11px;
          font-size: 10px;
        }

        .dept-featured-copy h2 {
          font-size: 27px;
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
          font-size: 18px;
        }

        .dept-hod {
          gap: 12px;
        }

        .dept-hod-icon {
          width: 46px;
          height: 46px;
        }

        .dept-hod h3 {
          font-size: 11px;
        }

        .dept-overview-title {
          font-size: 16px;
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

      /* ACCESSIBILITY */

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
        /* FIX: DEPARTMENTS PAGE OVERLAPPING THE HEADER */

.dept-page {
  position: relative;
  isolation: isolate;
  padding-top: 0;
}

/* Give the hero content more breathing room */
.dept-page .dept-hero {
  position: relative;
  z-index: 0;
  padding-top: 85px;
}

/* Keep the hero content below the header */
.dept-page .dept-hero-inner {
  position: relative;
  z-index: 1;
}

/* Prevent the page from covering the header */
header,
nav {
  position: relative;
  z-index: 100;
}

/* Responsive spacing */
@media (max-width: 900px) {
  .dept-page .dept-hero {
    padding-top: 100px;
  }
}

@media (max-width: 600px) {
  .dept-page .dept-hero {
    padding-top: 90px;
  }
}

/* ===== DEPARTMENTS PAGE: REDUCED FONT SIZES ===== */

/* Hero heading */
.dept-page .dept-hero h1 {
  font-size: clamp(30px, 3.2vw, 44px);
  line-height: 1.08;
}

/* Hero description */
.dept-page .dept-hero p {
  font-size: 12px;
  line-height: 1.6;
}

/* Hero label */
.dept-page .dept-eyebrow {
  font-size: 9px;
}

/* Statistics */
.dept-page .dept-stat strong {
  font-size: 21px;
}

.dept-page .dept-stat span {
  font-size: 10px;
}

/* Choose a Department heading */
.dept-page .dept-selector-title h2 {
  font-size: 20px;
}

/* Department count */
.dept-page .dept-count {
  font-size: 9px;
}

/* Department card names */
.dept-page .dept-card-title {
  font-size: 14px;
  line-height: 1.4;
}

/* Featured department heading */
.dept-page .dept-featured-copy h2 {
  font-size: clamp(22px, 2.4vw, 30px);
}

/* Featured descriptions */
.dept-page .dept-featured-copy p,
.dept-page .dept-overview-text,
.dept-page .dept-check-list li {
  font-size: 11px;
  line-height: 1.6;
}

/* Other section headings */
.dept-page .dept-panel-heading {
  font-size: 16px;
}

.dept-page .dept-overview-title {
  font-size: 16px;
}

/* HOD information */
.dept-page .dept-hod h3 {
  font-size: 14px;
}

.dept-page .dept-hod p {
  font-size: 11px;
}

/* Buttons and labels */
.dept-page .dept-button {
  font-size: 11px;
}

.dept-page .dept-featured-label {
  font-size: 9px;
}

/* Mobile font sizes */
@media (max-width: 600px) {
  .dept-page .dept-hero h1 {
    font-size: 30px;
  }

  .dept-page .dept-selector-title h2 {
    font-size: 17px;
  }

  .dept-page .dept-card-title {
    font-size: 12px;
  }

  .dept-page .dept-featured-copy h2 {
    font-size: 23px;
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
        // Reset when the element leaves the viewport.
        // It will animate again when the user scrolls back.
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
}: {
  department: Department;
  index: number;
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
        threshold: 0.15,
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
      <Link
        to="/admission"
        className="dept-card-link"
        aria-label={`Apply for admission to ${department.name}`}
      >
        <span className="dept-card-icon">
          <Icon aria-hidden="true" />
        </span>

        <span className="dept-card-title">
          {department.name}
        </span>

        <span className="dept-card-arrow">
          <ArrowRight aria-hidden="true" />
        </span>
      </Link>
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
   MAIN PAGE
   ========================================================= */

export default function Departments() {
  const [selectedDepartment, setSelectedDepartment] =
    useState<Department>(departments[2]);

  const featured = selectedDepartment;
  const FeaturedIcon = featured.icon;

  return (
    <div className="dept-page">
      <DepartmentStyles />

      {/* HERO */}
<section
  className="dept-hero"
  data-header-theme="dark"
>        <div className="dept-container dept-hero-inner">
          <div>
            <div className="dept-eyebrow">Academics</div>

            <h1>
              Explore Our
              <span>Departments</span>
            </h1>

            <p className="dept-hero-description">
              Four vibrant departments offering industry-oriented
              education, research and innovation for a successful
              engineering career.
            </p>
          </div>

          <div className="dept-hero-stats">
            <div className="dept-stat">
              <GraduationCap aria-hidden="true" />
              <strong>04</strong>
              <span>Departments</span>
            </div>

            <div className="dept-stat">
              <Users aria-hidden="true" />
              <strong>100+</strong>
              <span>Expert Faculty</span>
            </div>

            <div className="dept-stat">
              <FlaskConical aria-hidden="true" />
              <strong>Modern</strong>
              <span>Laboratories</span>
            </div>
          </div>
        </div>
      </section>

      {/* DEPARTMENT SELECTOR */}
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
                  <h2>Choose a Department</h2>
                </div>

                <span className="dept-count">04 DEPARTMENTS</span>
              </div>

              <div className="dept-grid">
                {departments.map((department, index) => (
                  <DepartmentCard
                    key={department.id}
                    department={department}
                    index={index}
                  />
                ))}
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* FEATURED DEPARTMENT */}
      <section className="dept-featured-section">
        <div className="dept-container">
          <Reveal>
            <div className="dept-featured">
              <div className="dept-featured-copy">
                <span className="dept-featured-label">
                  Department {String(featured.id).padStart(2, '0')}
                </span>

                <h2>{featured.name}</h2>

                <p>{featured.description}</p>

                <Link
                  to="/admission"
                  className="dept-button dept-button-gold"
                >
                  Apply for Admission
                  <ArrowRight aria-hidden="true" />
                </Link>
              </div>

              <div className="dept-featured-image">
                <img
                  src={
                    featured.id === 1
                      ? 'https://images.unsplash.com/photo-1518770660439-4636190af475?auto=format&fit=crop&w=1200&q=85'
                      : featured.id === 2
                        ? 'https://images.unsplash.com/photo-1581091226825-a6a2a5aee158?auto=format&fit=crop&w=1200&q=85'
                        : featured.id === 3
                          ? 'https://images.unsplash.com/photo-1581092160562-40aa08e78837?auto=format&fit=crop&w=1200&q=85'
                          : 'https://images.unsplash.com/photo-1503387762-592deb58ef4e?auto=format&fit=crop&w=1200&q=85'
                  }
                  alt={`${featured.name} laboratory and practical learning`}
                  loading="lazy"
                />
              </div>
            </div>
          </Reveal>
        </div>
      </section>

      {/* DEPARTMENT OVERVIEW AND FOCUS AREAS */}
      <section className="dept-details-section">
        <div className="dept-container dept-details-grid">
          <Reveal direction="left">
            <div className="dept-panel">
              <div className="dept-hod">
                <div className="dept-hod-icon">
                  <UserRound aria-hidden="true" />
                </div>

                <div>
                  <p className="dept-hod-label">
                    Department Leadership
                  </p>
                  <h3>Head of Department</h3>
                  <p>
                    Faculty details can be added here
                  </p>
                </div>
              </div>

              <h3 className="dept-overview-title">
                <BookOpen aria-hidden="true" />
                Department Overview
              </h3>

              <p className="dept-overview-text">
                {featured.description} The department focuses on
                academic excellence, practical experience, technical
                skills and professional development to prepare students
                for engineering careers.
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

      {/* FACILITIES AND LEARNING OUTCOMES */}
      <section className="dept-container dept-lower-grid">
        <Reveal direction="left">
          <div className="dept-lower-panel">
            <h3 className="dept-panel-heading">
              <Wrench aria-hidden="true" />
              Facilities
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

      {/* ADDITIONAL OPPORTUNITIES */}
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
              engineering technologies.
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
