import { useEffect, useRef, useState } from 'react';
import { Link, useSearchParams } from 'react-router-dom';
import {
  ArrowRight,
  GraduationCap,
  Monitor,
  Network,
  BrainCircuit,
  Cpu,
  ChartNoAxesColumnIncreasing,
  BookOpen,
  Users,
  Settings,
  Award,
  Clock,
  CheckCircle2,
} from 'lucide-react';

type Course = {
  title: string;
  shortTitle: string;
  description: string;
  duration: string;
  eligibility: string;
  highlights: string[];
  icon: typeof GraduationCap;
};

const ugCourses: Course[] = [
  {
    title: 'B.E. Computer Science and Engineering',
    shortTitle: 'B.E. Computer Science',
    description:
      'Develop strong foundations in programming, software engineering, algorithms, databases and modern computing technologies.',
    duration: '4 Years',
    eligibility:
      'Candidates must satisfy the applicable Tamil Nadu engineering admission eligibility requirements.',
    highlights: [
      'Programming and Software Development',
      'Data Structures and Algorithms',
      'Database Management Systems',
    ],
    icon: Monitor,
  },
  {
    title: 'B.E. Computer Science and Engineering (Cyber Security)',
    shortTitle: 'B.E. CSE (Cyber Security)',
    description:
      'Develop expertise in securing digital systems, networks and data through ethical hacking, cyber forensics, network security and secure coding.',
    duration: '4 Years',
    eligibility:
      'Candidates must satisfy the applicable Tamil Nadu engineering admission eligibility requirements.',
    highlights: [
      'Ethical Hacking and Network Security',
      'Digital Forensics',
      'Security Operations and Threat Management',
    ],
    icon: Network,
  },
  {
    title: 'B.Tech. Information Technology',
    shortTitle: 'B.Tech. Information Technology',
    description:
      'Build practical skills in information systems, web technologies, networking, cloud computing and enterprise applications.',
    duration: '4 Years',
    eligibility:
      'Candidates must satisfy the applicable Tamil Nadu engineering admission eligibility requirements.',
    highlights: [
      'Web and Application Development',
      'Computer Networks and Cloud',
      'Information Systems',
    ],
    icon: Network,
  },
  {
    title: 'B.Tech. Artificial Intelligence and Data Science',
    shortTitle: 'B.Tech. AI and Data Science',
    description:
      'Explore intelligent systems, machine learning, data analytics and emerging technologies for solving real-world problems.',
    duration: '4 Years',
    eligibility:
      'Candidates must satisfy the applicable Tamil Nadu engineering admission eligibility requirements.',
    highlights: [
      'Artificial Intelligence',
      'Machine Learning',
      'Data Analytics and Visualization',
    ],
    icon: BrainCircuit,
  },
  {
    title: 'B.E. Electronics and Communication Engineering',
    shortTitle: 'B.E. Electronics and Communication',
    description:
      'Study electronic circuits, communication systems, embedded technologies and the engineering behind connected devices.',
    duration: '4 Years',
    eligibility:
      'Candidates must satisfy the applicable Tamil Nadu engineering admission eligibility requirements.',
    highlights: [
      'Electronic Circuits',
      'Communication Systems',
      'Embedded Systems',
    ],
    icon: Cpu,
  },
];

const pgCourses: Course[] = [
  {
    title: 'Master of Business Administration (MBA)',
    shortTitle: 'Master of Business Administration',
    description:
      'Develop management, leadership, business strategy and analytical skills for professional and entrepreneurial careers.',
    duration: '2 Years',
    eligibility:
      'Candidates must satisfy the applicable university and admission requirements for postgraduate management studies.',
    highlights: [
      'Business Management',
      'Strategic Planning',
      'Leadership and Decision-Making',
    ],
    icon: ChartNoAxesColumnIncreasing,
  },
  {
    title: 'M.E. Computer Science and Engineering',
    shortTitle: 'M.E. Computer Science and Engineering',
    description:
      'Advance your expertise in computing, research, advanced software systems and emerging areas of computer science.',
    duration: '2 Years',
    eligibility:
      'Candidates must satisfy the applicable university and postgraduate engineering admission requirements.',
    highlights: [
      'Advanced Computing',
      'Research and Development',
      'Advanced Software Systems',
    ],
    icon: BookOpen,
  },
];

function AcademicsStyles() {
  return (
    <style>{`
      .academics-page {
        --academic-maroon: #6E1832;
        --academic-maroon-dark: #4A1022;
        --academic-gold: #D8B54C;
        --academic-gold-light: #F7EBC6;
        --academic-cream: #FBF9F5;
        --academic-ink: #272126;
        --academic-muted: #6B6263;
        background: var(--academic-cream);
        color: var(--academic-ink);
        min-height: 100vh;
        overflow: clip;
      }

      .academics-page * {
        box-sizing: border-box;
      }

      .academics-hero {
        position: relative;
        overflow: hidden;
        padding: 64px 24px 58px;
        color: #fff;
        background:
          radial-gradient(
            circle at 88% 25%,
            rgba(216,181,76,.14),
            transparent 25%
          ),
          linear-gradient(
            115deg,
            var(--academic-maroon-dark),
            var(--academic-maroon)
          );
      }

      .academics-hero-inner {
        max-width: 1220px;
        margin: 0 auto;
        position: relative;
        z-index: 1;
      }

      .academics-hero-decoration {
        position: absolute;
        right: 7%;
        top: 35px;
        width: 180px;
        height: 180px;
        color: rgba(255,255,255,.08);
        stroke-width: .8;
        pointer-events: none;
      }

      .academics-breadcrumb {
        display: flex;
        align-items: center;
        gap: 10px;
        margin-bottom: 30px;
        color: rgba(255,255,255,.78);
        font-size: 12px;
      }

      .academics-breadcrumb a {
        color: #fff;
        text-decoration: none;
      }

      .academics-breadcrumb a:hover {
        color: var(--academic-gold);
      }

      .academics-eyebrow {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 12px;
        color: var(--academic-gold);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 4px;
        text-transform: uppercase;
      }

      .academics-eyebrow-line,
      .academics-heading-line {
        width: 44px;
        height: 1px;
        background: var(--academic-gold);
      }

      .academics-hero h1 {
        margin: 0 0 12px;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(34px, 4.5vw, 54px);
        font-weight: 600;
        line-height: 1.1;
        letter-spacing: -1px;
      }

      .academics-hero h1 span {
        color: var(--academic-gold);
      }

      .academics-hero-description {
        max-width: 560px;
        margin: 0;
        color: rgba(255,255,255,.86);
        font-size: 15px;
        line-height: 1.8;
      }

      .academics-benefits {
        padding: 22px 24px;
        background: #fff;
        border-bottom: 1px solid #E7D29A;
      }

      .academics-benefits-inner {
        display: grid;
        grid-template-columns: repeat(4, minmax(0, 1fr));
        max-width: 1220px;
        margin: 0 auto;
      }

      .academics-benefit {
        display: flex;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 12px 18px;
        border-right: 1px solid #E7D29A;
      }

      .academics-benefit:last-child {
        border-right: none;
      }

      .academics-benefit-icon {
        flex-shrink: 0;
        width: 28px;
        height: 28px;
        color: #B88D2E;
        stroke-width: 1.8;
      }

      .academics-benefit strong {
        display: block;
        margin-bottom: 3px;
        color: #292128;
        font-size: 13px;
        font-weight: 700;
      }

      .academics-benefit span {
        display: block;
        color: var(--academic-muted);
        font-size: 12px;
      }

      .academics-main {
        max-width: 1220px;
        margin: 0 auto;
        padding: 38px 24px 70px;
      }

      .academics-course-section {
        margin-bottom: 42px;
      }

      .academics-section-heading {
        display: flex;
        align-items: center;
        gap: 14px;
        margin-bottom: 20px;
        color: var(--academic-maroon);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 12px;
        font-weight: 700;
        letter-spacing: 4px;
        text-transform: uppercase;
      }

      /* Full-width course cards */
      .academics-zigzag-list {
        display: flex;
        flex-direction: column;
        gap: 22px;
        padding: 2px 0 12px;
      }

      /* Scroll animation initial state */
      .academics-zigzag-card {
        width: 100%;
        position: relative;
        opacity: 0;
        will-change: transform, opacity;
        transition:
          transform 850ms cubic-bezier(.22, 1, .36, 1),
          opacity 650ms ease;
      }

      /* Odd cards enter from the left */
      .academics-zigzag-card.from-left {
        transform: translateX(-100px);
      }

      /* Even cards enter from the right */
      .academics-zigzag-card.from-right {
        transform: translateX(100px);
      }

      /* Settle into the final position */
      .academics-zigzag-card.is-visible {
        opacity: 1;
        transform: translateX(0);
      }

      /* Card shell */
      .academics-course-card {
        height: 100%;
        overflow: hidden;
        background: #fff;
        border: 1px solid rgba(184,141,46,.42);
        border-bottom: 3px solid var(--academic-gold);
        border-radius: 9px;
        box-shadow: 0 5px 18px rgba(74,16,34,.06);
        transition:
          box-shadow 300ms ease,
          border-color 300ms ease;
      }

      .academics-course-card:hover {
        border-color: var(--academic-gold);
        box-shadow: 0 12px 30px rgba(74,16,34,.11);
      }

      /* Left identity panel + right course information */
      .academics-course-card-content {
        display: grid;
        grid-template-columns: 260px minmax(0, 1fr);
        align-items: stretch;
      }

      .academics-course-icon-wrap {
        min-width: 0;
        min-height: 230px;
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: center;
        gap: 14px;
        padding: 30px 22px;
        background: var(--academic-maroon);
        color: var(--academic-gold);
      }

      .academics-course-icon {
        width: 54px;
        height: 54px;
        flex-shrink: 0;
        padding: 13px;
        border-radius: 12px;
        background: var(--academic-gold);
        color: var(--academic-maroon-dark);
        stroke-width: 1.8;
      }

      .academics-course-panel-label {
        color: var(--academic-gold);
        font-size: 10px;
        font-weight: 800;
        letter-spacing: 1.5px;
        text-transform: uppercase;
      }

      .academics-course-panel-title {
        margin: 0;
        color: #fff;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 17px;
        line-height: 1.5;
        text-align: center;
      }

      .academics-course-info {
        min-width: 0;
        padding: 25px 28px;
      }

      .academics-course-description {
        margin: 0 0 17px;
        color: #5F5558;
        font-size: 13px;
        line-height: 1.85;
      }

      .academics-course-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px 22px;
        margin-bottom: 16px;
      }

      .academics-meta-item {
        display: flex;
        align-items: flex-start;
        gap: 7px;
        color: #51464A;
        font-size: 12px;
        line-height: 1.7;
      }

      .academics-meta-item svg {
        width: 16px;
        height: 16px;
        flex-shrink: 0;
        margin-top: 2px;
        color: #B88D2E;
      }

      .academics-highlights {
        display: flex;
        flex-wrap: wrap;
        gap: 8px;
        margin: 0 0 19px;
        padding: 0;
        list-style: none;
      }

      .academics-highlights li {
        display: inline-flex;
        align-items: center;
        gap: 6px;
        padding: 7px 10px;
        background: #FBF6E8;
        border: 1px solid #E9D9AF;
        border-radius: 5px;
        color: #59404A;
        font-size: 11px;
        line-height: 1.5;
      }

      .academics-highlights li svg {
        width: 13px;
        height: 13px;
        flex-shrink: 0;
        color: #A27B25;
      }

      .academics-apply-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 11px 17px;
        background: var(--academic-maroon);
        border: 1px solid var(--academic-maroon);
        border-radius: 5px;
        color: #fff;
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        transition:
          background 250ms ease,
          color 250ms ease,
          border-color 250ms ease,
          gap 250ms ease;
      }

      .academics-apply-button:hover {
        gap: 15px;
        background: var(--academic-gold);
        border-color: var(--academic-gold);
        color: var(--academic-maroon-dark);
      }

      .academics-apply-button svg {
        width: 15px;
        height: 15px;
      }
              /* Bottom admission call-to-action */
      .academics-bottom-cta {
        display: flex;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        overflow: hidden;
        margin-top: 10px;
        padding: 32px 34px;
        background: linear-gradient(
          115deg,
          var(--academic-maroon-dark),
          var(--academic-maroon)
        );
        border: 1px solid rgba(216,181,76,.55);
        border-radius: 10px;
        color: #fff;
      }

      .academics-bottom-cta h2 {
        margin: 0 0 8px;
        font-family: Georgia, 'Times New Roman', serif;
        font-size: clamp(22px, 3vw, 29px);
        line-height: 1.3;
      }

      .academics-bottom-cta p {
        max-width: 650px;
        margin: 0;
        color: rgba(255,255,255,.8);
        font-size: 13px;
        line-height: 1.8;
      }

      .academics-bottom-cta .academics-apply-button {
        flex-shrink: 0;
        background: var(--academic-gold);
        border-color: var(--academic-gold);
        color: var(--academic-maroon-dark);
      }

      .academics-bottom-cta .academics-apply-button:hover {
        background: #fff;
        border-color: #fff;
      }

      /* Programme buttons */
      .academics-card-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
      }

      .academics-programme-button {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 11px 17px;
        background: #fff;
        border: 1px solid var(--academic-gold);
        border-radius: 5px;
        color: var(--academic-maroon);
        font-size: 12px;
        font-weight: 700;
        text-decoration: none;
        transition: all 250ms ease;
      }

      .academics-programme-button:hover {
        gap: 15px;
        background: var(--academic-gold-light);
        color: var(--academic-maroon-dark);
        transform: translateY(-2px);
      }

      .academics-programme-button svg {
        width: 15px;
        height: 15px;
      }


      .programme-gallery-grid {
        display: grid;
        grid-template-columns: repeat(2, minmax(0, 1fr));
        gap: 13px;
      }

      .programme-gallery-card {
        overflow: hidden;
        padding: 0;
        border: 1px solid #E9D9AF;
        border-radius: 7px;
        background: #FFFEFB;
        cursor: pointer;
        text-align: left;
      }

      .programme-gallery-card img {
        display: block;
        width: 100%;
        height: 190px;
        object-fit: cover;
        transition: transform 350ms ease;
      }

      .programme-gallery-card:hover img {
        transform: scale(1.045);
      }

      .programme-gallery-card span {
        display: block;
        padding: 11px 13px;
        color: var(--academic-maroon);
        font-size: 12px;
        font-weight: 700;
      }

      .programme-lightbox {
        position: fixed;
        z-index: 9999;
        inset: 0;
        display: flex;
        align-items: center;
        justify-content: center;
        padding: 30px;
        background: rgba(20, 12, 16, .92);
      }

      .programme-lightbox img {
        display: block;
        max-width: min(100%, 1100px);
        max-height: 85vh;
        object-fit: contain;
        border-radius: 8px;
      }

      .programme-lightbox-close {
        position: absolute;
        top: 20px;
        right: 25px;
        width: 42px;
        height: 42px;
        border: 1px solid rgba(255,255,255,.5);
        border-radius: 50%;
        background: transparent;
        color: white;
        font-size: 30px;
        cursor: pointer;
      }

      @media(max-width:600px) {
        .programme-gallery-grid {
          grid-template-columns: 1fr;
        }

        .programme-gallery-card img {
          height: 210px;
        }

        .programme-lightbox {
          padding: 15px;
        }
      }

      /* Programme detail page */
      .programme-detail {
        min-height: 100vh;
        background: var(--academic-cream);
        /* Keep the programme page below the fixed college header. */
        padding-top: 88px;
      }

      .programme-detail-hero {
        position: relative;
        overflow: hidden;
        padding: 54px 24px 50px;
        color: #fff;
        background:
          radial-gradient(
            circle at 88% 25%,
            rgba(216,181,76,.16),
            transparent 25%
          ),
          linear-gradient(
            115deg,
            var(--academic-maroon-dark),
            var(--academic-maroon)
          );
      }

      .programme-detail-hero-inner {
        max-width: 1220px;
        margin: 0 auto;
      }

      .programme-back {
        display: inline-flex;
        align-items: center;
        gap: 9px;
        margin-bottom: 28px;
        color: rgba(255,255,255,.88);
        text-decoration: none;
        font-size: 12px;
        font-weight: 700;
      }

      .programme-back:hover {
        color: var(--academic-gold);
      }

      .programme-detail-kicker {
        margin-bottom: 12px;
        color: var(--academic-gold);
        font-size: 11px;
        font-weight: 800;
        letter-spacing: 3px;
        text-transform: uppercase;
      }

      .programme-detail-hero h1 {
        max-width: 850px;
        margin: 0 0 13px;
        font: 600 clamp(30px,4.5vw,50px)/1.15 Georgia, 'Times New Roman', serif;
      }

      .programme-detail-hero p {
        max-width: 780px;
        margin: 0;
        color: rgba(255,255,255,.86);
        font-size: 14px;
        line-height: 1.85;
      }

      .programme-detail-meta {
        display: flex;
        flex-wrap: wrap;
        gap: 10px;
        margin-top: 22px;
      }

      .programme-detail-meta span {
        padding: 8px 13px;
        border: 1px solid rgba(216,181,76,.5);
        border-radius: 30px;
        color: #F7EBC6;
        background: rgba(255,255,255,.06);
        font-size: 11px;
      }

      .programme-layout {
        display: grid;
        grid-template-columns: 245px minmax(0,1fr);
        gap: 28px;
        max-width: 1220px;
        margin: 0 auto;
        padding: 36px 24px 75px;
        align-items: start;
      }

      .programme-sidebar {
        position: sticky;
        top: 105px;
        padding: 19px 14px;
        background: #fff;
        border: 1px solid #E9D9AF;
        border-radius: 9px;
        box-shadow: 0 5px 18px rgba(74,16,34,.05);
      }

      .programme-sidebar h2 {
        margin: 0 0 12px;
        padding: 0 8px;
        color: var(--academic-maroon);
        font: 700 16px Georgia,serif;
      }

      .programme-sidebar a {
        display: block;
        margin: 3px 0;
        padding: 10px 11px;
        border-radius: 5px;
        color: #65585C;
        text-decoration: none;
        font-size: 12px;
        line-height: 1.5;
        transition: background .2s ease,color .2s ease;
      }

      .programme-sidebar a:hover {
        color: var(--academic-maroon);
        background: #FBF3DE;
      }

      .programme-content {
        min-width: 0;
      }

      .programme-section {
        scroll-margin-top: 110px;
        margin-bottom: 22px;
        padding: 26px;
        background: #fff;
        border: 1px solid #E9D9AF;
        border-radius: 9px;
        box-shadow: 0 5px 18px rgba(74,16,34,.045);
      }

      .programme-section-heading {
        display: flex;
        align-items: center;
        gap: 12px;
        margin: 0 0 17px;
        color: var(--academic-maroon);
        font: 700 22px/1.3 Georgia,serif;
      }

      .programme-section-number {
        display: grid;
        place-items: center;
        flex-shrink: 0;
        width: 35px;
        height: 35px;
        border-radius: 8px;
        background: #F7EBC6;
        color: #8B651B;
        font: 800 12px Arial,sans-serif;
      }

      .programme-section p {
        margin: 0 0 12px;
        color: #5F5558;
        font-size: 13px;
        line-height: 1.9;
      }

      .programme-objective-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 13px;
      }

      .programme-objective {
        padding: 17px;
        border: 1px solid #EFE3C7;
        border-left: 3px solid var(--academic-gold);
        border-radius: 6px;
        background: #FFFEFB;
      }

      .programme-objective h3 {
        margin: 0 0 8px;
        color: var(--academic-maroon);
        font-size: 13px;
      }

      .programme-objective p {
        margin: 0;
        font-size: 12px;
      }

      .programme-po-list {
        display: grid;
        gap: 9px;
      }

      .programme-po {
        overflow: hidden;
        border: 1px solid #E9D9AF;
        border-radius: 6px;
        background: #FFFEFC;
      }

      .programme-po summary {
        display: flex;
        align-items: center;
        gap: 12px;
        padding: 13px 15px;
        cursor: pointer;
        list-style: none;
        color: #4D2734;
        font-size: 12px;
        font-weight: 700;
      }

      .programme-po summary::-webkit-details-marker {
        display: none;
      }

      .programme-po summary:after {
        content: '+';
        margin-left: auto;
        color: #A27B25;
        font-size: 20px;
      }

      .programme-po[open] summary:after {
        content: '−';
      }

      .programme-po-code {
        display: grid;
        place-items: center;
        flex-shrink: 0;
        min-width: 48px;
        padding: 6px 7px;
        border-radius: 4px;
        background: #F7EBC6;
        color: #76551A;
        font-size: 11px;
      }

      .programme-po p {
        padding: 0 16px 14px 75px;
        margin: 0;
        font-size: 12px;
      }

      .programme-career-list {
        display: grid;
        gap: 12px;
      }

      .programme-career {
        display: grid;
        grid-template-columns: 40px minmax(0,1fr);
        gap: 13px;
        padding: 15px;
        border: 1px solid #EFE3C7;
        border-radius: 7px;
        background: #FFFEFB;
      }

      .programme-career-number {
        display: grid;
        place-items: center;
        width: 38px;
        height: 38px;
        border-radius: 8px;
        background: #F7EBC6;
        color: #8B651B;
        font-size: 12px;
        font-weight: 800;
      }

      .programme-career h3 {
        margin: 0 0 6px;
        color: var(--academic-maroon);
        font-size: 13px;
      }

      .programme-career p {
        margin: 0;
        font-size: 12px;
      }

      .programme-course-grid {
        display: grid;
        grid-template-columns: repeat(2,minmax(0,1fr));
        gap: 9px;
      }

      .programme-value-course {
        display: flex;
        align-items: flex-start;
        gap: 9px;
        padding: 11px 12px;
        background: #FBF6E8;
        border: 1px solid #E9D9AF;
        border-radius: 5px;
        color: #59404A;
        font-size: 12px;
        line-height: 1.55;
      }

      .programme-value-course svg {
        width: 15px;
        height: 15px;
        flex-shrink: 0;
        color: #A27B25;
        margin-top: 1px;
      }

      .programme-placeholder {
        padding: 25px;
        background: #fff;
        border: 1px solid #E9D9AF;
        border-radius: 9px;
      }

      .programme-placeholder h2 {
        margin: 0 0 10px;
        color: var(--academic-maroon);
        font: 700 23px Georgia,serif;
      }

      .programme-detail-cta {
        display: flex;
        justify-content: space-between;
        align-items: center;
        gap: 18px;
        margin-top: 22px;
        padding: 24px 26px;
        border-radius: 9px;
        background: linear-gradient(
          115deg,
          var(--academic-maroon-dark),
          var(--academic-maroon)
        );
        color: #fff;
      }

      .programme-detail-cta h2 {
        margin: 0 0 6px;
        font: 700 21px Georgia,serif;
      }

      .programme-detail-cta p {
        margin: 0;
        color: rgba(255,255,255,.82);
        font-size: 12px;
      }

      .programme-detail-cta .academics-apply-button {
        flex-shrink: 0;
        background: var(--academic-gold);
        border-color: var(--academic-gold);
        color: var(--academic-maroon-dark);
      }

      .programme-detail-cta .academics-apply-button:hover {
        background: #fff;
        border-color: #fff;
      }
              @media(max-width:850px) {
        .programme-layout {
          grid-template-columns: 1fr;
          gap: 18px;
        }

        .programme-sidebar {
          position: relative;
          top: auto;
          display: flex;
          flex-wrap: wrap;
          gap: 4px;
        }

        .programme-sidebar h2 {
          width: 100%;
        }

        .programme-sidebar a {
          flex: 1 1 180px;
        }
      }

      @media(max-width:600px) {
        .programme-detail {
          padding-top: 72px;
        }

        .academics-card-actions {
          align-items: stretch;
        }

        .academics-card-actions a {
          flex: 1 1 100%;
        }

        .programme-detail-hero {
          padding: 38px 19px 34px;
        }

        .programme-layout {
          padding: 22px 15px 45px;
        }

        .programme-section {
          padding: 20px 16px;
        }

        .programme-section-heading {
          font-size: 19px;
        }

        .programme-objective-grid,
        .programme-course-grid {
          grid-template-columns: 1fr;
        }

        .programme-po p {
          padding: 0 13px 13px;
        }

        .programme-detail-cta {
          flex-direction: column;
          align-items: flex-start;
          padding: 21px;
        }
      }

      /* Tablet */
      @media (max-width: 900px) {
        .academics-benefits-inner {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .academics-benefit:nth-child(2) {
          border-right: none;
        }

        .academics-benefit:nth-child(-n+2) {
          border-bottom: 1px solid #E7D29A;
        }

        .academics-course-card-content {
          grid-template-columns: 220px minmax(0, 1fr);
        }

        .academics-course-info {
          padding: 22px;
        }
      }

      /* Mobile */
      @media (max-width: 600px) {
        .academics-hero {
          padding: 42px 20px 38px;
        }

        .academics-hero-decoration {
          width: 105px;
          height: 105px;
          right: 4%;
          top: 65px;
        }

        .academics-breadcrumb {
          margin-bottom: 25px;
        }

        .academics-hero-description {
          max-width: 92%;
          font-size: 13px;
        }

        .academics-benefits {
          padding: 14px 12px;
        }

        .academics-benefits-inner {
          grid-template-columns: repeat(2, minmax(0, 1fr));
        }

        .academics-benefit {
          justify-content: flex-start;
          gap: 10px;
          padding: 13px 8px;
        }

        .academics-benefit-icon {
          width: 23px;
          height: 23px;
        }

        .academics-benefit strong {
          font-size: 11px;
        }

        .academics-benefit span {
          font-size: 10px;
        }

        .academics-main {
          padding: 30px 16px 45px;
        }

        .academics-course-section {
          margin-bottom: 34px;
        }

        .academics-zigzag-list {
          gap: 18px;
        }

        .academics-zigzag-card.from-left {
          transform: translateX(-45px);
        }

        .academics-zigzag-card.from-right {
          transform: translateX(45px);
        }

        .academics-zigzag-card.is-visible {
          transform: translateX(0);
        }

        .academics-course-card-content {
          grid-template-columns: 1fr;
        }

        .academics-course-icon-wrap {
          min-height: 150px;
          padding: 22px 16px;
        }

        .academics-course-icon {
          width: 48px;
          height: 48px;
          padding: 12px;
        }

        .academics-course-panel-title {
          font-size: 16px;
        }

        .academics-course-info {
          padding: 20px 16px;
        }

        .academics-course-description {
          font-size: 12px;
          line-height: 1.8;
        }

        .academics-course-meta {
          flex-direction: column;
          gap: 7px;
        }

        .academics-highlights {
          gap: 6px;
        }

        .academics-highlights li {
          font-size: 10px;
          padding: 6px 8px;
        }

        .academics-apply-button {
          font-size: 11px;
          padding: 10px 12px;
        }

        .academics-bottom-cta {
          flex-direction: column;
          align-items: flex-start;
          padding: 25px 20px;
        }
      }

      /* Respect reduced-motion accessibility settings */
      @media (prefers-reduced-motion: reduce) {
        .academics-zigzag-card,
        .academics-course-card,
        .academics-apply-button {
          transition: none !important;
        }

        .academics-zigzag-card {
          opacity: 1;
          transform: none !important;
        }
      }
    `}</style>
  );
}

type CourseCardProps = {
  course: Course;
  index: number;
};

function CourseCard({ course, index }: CourseCardProps) {
  const cardRef = useRef<HTMLDivElement>(null);
  const [visible, setVisible] = useState(false);
  const Icon = course.icon;

  useEffect(() => {
    const element = cardRef.current;
    if (!element) return;

    const observer = new IntersectionObserver(
      ([entry]) => {
        // Reset visibility when the card leaves the viewport.
        // This lets the animation replay when the user scrolls back.
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
      ref={cardRef}
      className={[
        'academics-zigzag-card',
        index % 2 === 0 ? 'from-left' : 'from-right',
        visible ? 'is-visible' : '',
      ].join(' ')}
      style={{
        transitionDelay: visible ? `${(index % 2) * 100}ms` : '0ms',
      }}
    >
      <article className="academics-course-card">
        <div className="academics-course-card-content">
          <div className="academics-course-icon-wrap">
            <Icon className="academics-course-icon" aria-hidden="true" />

            <span className="academics-course-panel-label">
              PROGRAM
            </span>

            <h3 className="academics-course-panel-title">
              {course.title}
            </h3>
          </div>

          <div className="academics-course-info">
            <p className="academics-course-description">
              {course.description}
            </p>

            <div className="academics-course-meta">
              <div className="academics-meta-item">
                <Clock aria-hidden="true" />
                <span>
                  <strong>Duration:</strong> {course.duration}
                </span>
              </div>

              <div className="academics-meta-item">
                <GraduationCap aria-hidden="true" />
                <span>
                  <strong>Eligibility:</strong> {course.eligibility}
                </span>
              </div>
            </div>

            <ul className="academics-highlights">
              {course.highlights.map((highlight) => (
                <li key={highlight}>
                  <CheckCircle2 aria-hidden="true" />
                  {highlight}
                </li>
              ))}
            </ul>

            <div className="academics-card-actions">
              <Link
                to={`/academics?programme=${encodeURIComponent(course.title)}`}
                className="academics-programme-button"
              >
                Our Programme
                <ArrowRight aria-hidden="true" />
              </Link>

              <Link
                to="/admission"
                className="academics-apply-button"
              >
                Apply for Admission
                <ArrowRight aria-hidden="true" />
              </Link>
            </div>
          </div>
        </div>
      </article>
    </div>
  );
}

function Benefits() {
  const benefits = [
    {
      icon: GraduationCap,
      title: 'Industry Aligned',
      subtitle: 'Curriculum',
    },
    {
      icon: Users,
      title: 'Experienced',
      subtitle: 'Faculty',
    },
    {
      icon: Settings,
      title: 'Modern Labs',
      subtitle: '& Facilities',
    },
    {
      icon: Award,
      title: 'Excellent',
      subtitle: 'Placement Support',
    },
  ];

  return (
    <section className="academics-benefits">
      <div className="academics-benefits-inner">
        {benefits.map((benefit) => {
          const Icon = benefit.icon;

          return (
            <div
              className="academics-benefit"
              key={benefit.title}
            >
              <Icon
                className="academics-benefit-icon"
                aria-hidden="true"
              />

              <div>
                <strong>{benefit.title}</strong>
                <span>{benefit.subtitle}</span>
              </div>
            </div>
          );
        })}
      </div>
    </section>
  );
}

type ProgrammeSectionData = {
  overview?: string[];
  vision?: string;
  mission?: string;
  highlights?: string[];
  labs?: string[];
  objectives?: { title: string; text: string }[];
  outcomes?: { code: string; title?: string; text: string }[];
  careers?: { title: string; text: string }[];
  valueCourses?: string[];
};

const cyberSecurityData: ProgrammeSectionData = {
  overview: [
    'The Department of Computer Science and Engineering (Cyber Security) at St. Lourdes Engineering College was established in 2022 with an initial intake of 30 students, which has been increased to 60 from the academic year 2025. The programme is approved by AICTE and affiliated to Anna University.',
    'As one of the most sought-after branches, the department attracts students who aspire to build expertise in securing digital systems, networks and data. The vibrant and progressive department aims to achieve global standards through strong academic commitment and industry-oriented learning.',
    'Laboratory sessions are conducted in a structured and systematic manner. The department is equipped with advanced cyber security labs featuring modern tools for ethical hacking, network security, digital forensics and secure coding—ensuring hands-on training that aligns with the University curriculum while enhancing real-world skills.',
    'Tutorials are designed to provide conceptual clarity and problem-solving proficiency. Students are taken for industrial visits every semester to gain exposure to current industry practices. They are also encouraged to present seminars, participate in hackathons and publish papers in National/International conferences, thereby strengthening technical knowledge, research aptitude and communication skills.'
  ],
  objectives: [
    { title: 'Strong Technical Foundation', text: 'To provide comprehensive knowledge in core areas such as Network Security, Cryptography, Ethical Hacking, Cyber Forensics, Cloud Security, Secure Coding and Cyber Law.' },
    { title: 'Skill Development and Hands-on Training', text: 'To equip students with practical skills through cybersecurity labs, simulation tools, capture-the-flag exercises, internships and real-time projects.' },
    { title: 'Industry Readiness and Employability', text: 'To prepare students for careers as Security Analysts, Ethical Hackers, SOC Analysts, Penetration Testers, Cyber Forensic Experts and Security Consultants through certification-oriented training.' },
    { title: 'Research and Innovation', text: 'To promote research in emerging areas such as AI in Cyber Security, Blockchain Security, IoT Security, Digital Forensics and Threat Intelligence.' },
    { title: 'Implementation of Outcome-Based Education (OBE)', text: 'To align curriculum and learning outcomes with Programme Outcomes (POs), Programme Specific Outcomes (PSOs) and industry standards.' },
    { title: 'Ethics and Legal Awareness', text: 'To inculcate professional ethics, cyber laws, data privacy regulations and responsible digital behaviour.' },
    { title: 'Entrepreneurship and Lifelong Learning', text: 'To encourage innovation, startup initiatives in security solutions and continuous professional development through global certifications and higher studies.' }
  ],
  outcomes: [
    { code: 'PO1', text: 'To analyze, design and implement secure computing solutions using core principles of computer science, networking, cryptography and cyber security.' },
    { code: 'PO2', text: 'To identify vulnerabilities and apply appropriate security mechanisms such as secure coding, penetration testing, digital forensics and risk management to safeguard information systems.' },
    { code: 'PO3', text: 'To develop reliable and compliant cyber-security solutions by integrating industry best practices, security standards and emerging technologies for applications in scientific, industrial and business domains.' }
  ],
  careers: [
    { title: 'Security Operations and Threat Management', text: 'Students can work as Security Analyst, SOC Analyst, Cyber Threat Analyst, Incident Responder, Malware Analyst and Vulnerability Assessment & Penetration Testing (VAPT) Engineer. These roles focus on monitoring, detecting and responding to cyber threats in real time.' },
    { title: 'Ethical Hacking, Network Security and Digital Forensics', text: 'Career paths include Ethical Hacker, Penetration Tester, Network Security Engineer, Firewall Administrator and Security Auditor. In Digital Forensics, graduates can work as Cyber Forensic Investigator, Digital Evidence Analyst and Fraud Investigation Specialist.' },
    { title: 'IT and Corporate Sector', text: 'Opportunities include Information Security Analyst, Cloud Security Engineer, Application Security Engineer, Data Security Specialist and Governance, Risk & Compliance (GRC) Analyst. Financial institutions and e-commerce platforms also require cyber security professionals to safeguard transactions and customer data.' },
    { title: 'Government and Public Sector', text: 'Government and public sector organizations recruit cyber security professionals for roles in cyber defense, intelligence and digital crime investigation through competitive examinations and direct recruitment processes.' },
    { title: 'Higher Studies and Certifications', text: 'M.E./M.Tech., MBA (Information Security), MS abroad and global certifications such as CEH, CISSP, CompTIA Security+ and CISM can further enhance career prospects.' },
    { title: 'Entrepreneurship Opportunities', text: 'Graduates can start cyber security consulting firms, digital forensics services, security auditing agencies and cyber security training centres.' }
  ],
  valueCourses: [
    'Ethical Hacking and Penetration Testing', 'Advanced Network Security',
    'Cyber Forensics and Digital Investigation', 'Security Operations Center (SOC) Training',
    'Vulnerability Assessment and Penetration Testing (VAPT)', 'Cloud Security Fundamentals',
    'Application Security and Secure Coding Practices', 'Cryptography and Blockchain Security',
    'IoT Security', 'Malware Analysis and Reverse Engineering',
    'Artificial Intelligence in Cyber Security', 'Cyber Law and Data Privacy Regulations',
    'Governance, Risk and Compliance (GRC)', 'Linux for Security Professionals',
    'Python for Cyber Security', 'Cyber Threat Intelligence and Incident Response',
    'Web Application Security Testing'
  ]
};

const eceData: ProgrammeSectionData = {
  overview: [
    'The Department of Electronics and Communication Engineering at St. Lourdes Engineering College was established in 2009 with an initial intake of 30, which was increased to 60 in the academic year 2025. The programme is duly approved by AICTE and affiliated to Anna University.',
    'The Electronics and Communication Engineering department is an attractive and preferred department among the student community. The young and dynamic department aspires to achieve global standards and competence through the untiring commitment of its faculty and students.',
    'Laboratory practical classes are conducted systematically. The laboratories are well equipped with modern training facilities that cater to the requirements of the University syllabus and enrich the learning experience. Problems are solved during tutorial hours with better clarity.',
    'Students are taken for industrial visits twice per semester. They are encouraged to deliver seminars and publish papers in National/International conferences on latest topics, promoting technical and communication skills.'
  ],
  objectives: [
    { title: 'Academic Excellence', text: 'To provide strong foundational knowledge in Electronics, Communication Systems, Signal Processing, VLSI Design, Embedded Systems, Microwave Engineering and Emerging Technologies through outcome-based education.' },
    { title: 'Skill Development', text: 'To equip students with practical skills through well-structured laboratory courses, industry-supported training programmes, internships and project-based learning aligned with curriculum objectives.' },
    { title: 'Research and Innovation', text: 'To promote research culture among faculty and students by encouraging funded projects, publications in reputed journals, patents, consultancy and interdisciplinary collaboration in thrust areas.' },
    { title: 'Industry Collaboration', text: 'To strengthen academia–industry interaction through MoUs, industrial visits, guest lectures, workshops and value-added certification programmes to enhance employability.' },
    { title: 'Outcome-Based Education (OBE) Implementation', text: 'To effectively implement Outcome-Based Education practices in alignment with Programme Outcomes (POs), Programme Specific Outcomes (PSOs) and Course Outcomes (COs) as prescribed by NBA guidelines.' },
    { title: 'Professional Ethics and Social Responsibility', text: 'To inculcate ethical values, leadership qualities, teamwork, environmental consciousness and social responsibility among students.' },
    { title: 'Lifelong Learning and Higher Studies', text: 'To encourage students to pursue higher education, research, entrepreneurship and continuous professional development.' }
  ],
  outcomes: [
    { code: 'PO1', title: 'Engineering Knowledge', text: 'Apply the knowledge of mathematics, science, engineering fundamentals and an engineering specialization to the solution of complex engineering problems.' },
    { code: 'PO2', title: 'Problem Analysis', text: 'Identify, formulate, review research literature and analyse complex engineering problems, reaching substantiated conclusions using first principles of mathematics, natural sciences and engineering sciences.' },
    { code: 'PO3', title: 'Design/Development of Solutions', text: 'Design solutions for complex engineering problems and design system components or processes that meet specified needs with appropriate consideration for public health and safety, and cultural, societal and environmental considerations.' },
    { code: 'PO4', title: 'Conduct Investigations of Complex Problems', text: 'Use research-based knowledge and research methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.' },
    { code: 'PO5', title: 'Modern Tool Usage', text: 'Create, select and apply appropriate techniques, resources, and modern engineering and IT tools including prediction and modelling to complex engineering activities with an understanding of the limitations.' },
    { code: 'PO6', title: 'The Engineer and Society', text: 'Apply reasoning informed by contextual knowledge to assess societal, health, safety, legal and cultural issues and the consequent responsibilities relevant to professional engineering practice.' },
    { code: 'PO7', title: 'Environment and Sustainability', text: 'Understand the impact of professional engineering solutions in societal and environmental contexts, and demonstrate the knowledge of and need for sustainable development.' },
    { code: 'PO8', title: 'Ethics', text: 'Apply ethical principles and commit to professional ethics, responsibilities and norms of engineering practice.' },
    { code: 'PO9', title: 'Individual and Team Work', text: 'Function effectively as an individual, and as a member or leader in diverse teams and in multidisciplinary settings.' },
    { code: 'PO10', title: 'Communication', text: 'Communicate effectively on complex engineering activities with the engineering community and society at large, including effective reports, design documentation, presentations and clear instructions.' },
    { code: 'PO11', title: 'Project Management and Finance', text: 'Demonstrate knowledge and understanding of engineering and management principles and apply these to one’s own work, as a member and leader in a team, to manage projects in multidisciplinary environments.' },
    { code: 'PO12', title: 'Lifelong Learning', text: 'Recognize the need for and have the preparation and ability to engage in independent and lifelong learning in the broadest context of technological change.' }
  ],
  careers: [
    { title: 'Core Electronics and Semiconductor Technology', text: 'Students can work as VLSI Design Engineers, Embedded Systems Engineers, FPGA/ASIC Engineers, Hardware Design Engineers, PCB Design Engineers and RF Engineers.' },
    { title: 'Communication and Telecom Sector', text: 'Career paths include Telecom Engineer, Network Engineer, Wireless Communication Engineer, Signal Processing Engineer and Satellite Communication Engineer.' },
    { title: 'IT and Software Domain', text: 'Opportunities include Software Developer, System Engineer, Data Analyst, AI/ML Engineer, Cloud Engineer and Cybersecurity Analyst.' },
    { title: 'Automation and Emerging Technologies', text: 'Graduates can work as IoT Developer, Robotics Engineer, Control Systems Engineer and Electric Vehicle Electronics Engineer.' },
    { title: 'Higher Studies and Government Careers', text: 'The programme prepares students for M.E./M.Tech., MS, MBA and Ph.D. studies. Graduates can pursue government and public sector opportunities through examinations such as GATE, ESE and other recruitment processes.' },
    { title: 'Entrepreneurship', text: 'Graduates can establish technology-based startups in electronics design, embedded product development, automation solutions and communication services.' }
  ],
  valueCourses: [
    'VLSI Design and Verification', 'Embedded Systems and ARM Programming',
    'Internet of Things (IoT) Applications', 'PCB Design using EDA Tools',
    'MATLAB and Simulink for Engineers', 'FPGA and Verilog HDL Programming',
    'Python for Electronics Engineers', '5G and Wireless Communication Technologies',
    'Robotics and Automation', 'Electric Vehicle (EV) Technology',
    'Industrial Automation using PLC and SCADA', 'Soft Skills and Technical Communication'
  ]
};

const itData: ProgrammeSectionData = {
  overview: [
    'The Department of Information Technology at St. Lourdes Engineering College is a dynamic academic unit dedicated to developing innovative and industry-ready technology professionals. The department is driven by a clear vision of delivering value-based technical education integrated with emerging technological advancements and practical industry exposure.',
    'Committed to academic excellence, ethical practices, innovation and social responsibility, the department fosters an environment that encourages creativity, critical thinking and continuous learning. It is supported by experienced faculty members specializing in Software Engineering, Data Science, Artificial Intelligence, Cybersecurity, Cloud Computing, Networking, Database Management Systems and Web Technologies.',
    'With a student-centric approach, the department integrates project-based learning, hands-on laboratory sessions, coding practices, hackathons, technical workshops, seminars and real-world case studies into its academic framework. This experiential learning model enables students to strengthen technical competencies, analytical skills and problem-solving abilities.',
    'The department maintains strong collaborations with IT companies, startups, industry professionals and technology experts. Guest lectures, industrial visits, internships, certification programmes and placement training sessions bridge the gap between academic learning and industry expectations.',
    'Through holistic development initiatives focusing on technical proficiency, communication skills, teamwork, innovation and ethical responsibility, the department strives to produce competent, confident and socially responsible IT professionals capable of excelling in a rapidly evolving global technological landscape.'
  ],
  highlights: [
    'Programming and Data Structures', 'Database Management Systems',
    'Artificial Intelligence and Machine Learning', 'Cloud Computing and Cyber Security',
    'Data Science and Business Analytics', 'Internet of Things (IoT)',
    'Software Engineering and Web Technologies'
  ],
  objectives: [
    { title: 'Technical Foundation', text: 'Develop competent IT professionals equipped with strong technical expertise, analytical thinking and problem-solving skills, with a solid foundation in programming, data structures, database management systems, computer networks, software engineering, cybersecurity, artificial intelligence and cloud computing.' },
    { title: 'Industry-Oriented Learning', text: 'Bridge the gap between academic learning and real-world technological applications through industry-oriented education aligned with current IT trends.' },
    { title: 'Practical Problem Solving', text: 'Enable students to analyze complex technical problems, design efficient software solutions, manage IT infrastructure and adapt to rapidly evolving technologies.' },
    { title: 'Ethics and Professional Responsibility', text: 'Instil ethical values, professional responsibility and awareness of cybersecurity and data privacy standards, encouraging secure, reliable and sustainable computing practices.' },
    { title: 'Communication and Teamwork', text: 'Enhance communication skills, teamwork and interpersonal effectiveness to improve employability and corporate readiness.' },
    { title: 'Research and Lifelong Learning', text: 'Foster continuous learning, research orientation and adaptability to emerging technologies such as AI, machine learning, big data analytics and IoT.' },
    { title: 'Holistic Development', text: 'Integrate classroom instruction with laboratory practice, real-time projects, internships, industry interaction and research activities to prepare graduates for national and international IT organizations.' }
  ],
  outcomes: [
    { code: 'PO1', title: 'Computing Knowledge', text: 'Demonstrate strong foundational and advanced knowledge in computing principles, software development and IT infrastructure.' },
    { code: 'PO2', title: 'Technical Problem Analysis', text: 'Analyze complex technical problems and design efficient, reliable and scalable technology solutions using appropriate tools and methodologies.' },
    { code: 'PO3', title: 'Technology Proficiency', text: 'Apply knowledge of programming languages, data structures, database management systems, computer networks, cybersecurity, artificial intelligence, cloud computing and data analytics.' },
    { code: 'PO4', title: 'Software Development', text: 'Develop, test, deploy and maintain software systems while effectively collaborating in multidisciplinary teams.' },
    { code: 'PO5', title: 'Ethics and Security', text: 'Apply ethical standards, professional practices and cybersecurity principles in the development and management of IT systems.' },
    { code: 'PO6', title: 'Research and Communication', text: 'Conduct technical research, analyze and interpret data, prepare comprehensive documentation and present solutions clearly to technical and non-technical stakeholders.' },
    { code: 'PO7', title: 'Innovation and Entrepreneurship', text: 'Cultivate innovation and entrepreneurial skills to design technology-driven products, pursue startups or contribute creatively within organizations.' },
    { code: 'PO8', title: 'Industry Readiness', text: 'Use internships, industry collaborations, laboratory work and live projects to address real-world technological challenges.' },
    { code: 'PO9', title: 'Lifelong Learning', text: 'Demonstrate adaptability, lifelong learning and a global outlook to work effectively in diverse cultural and professional environments.' }
  ],
  careers: [
    { title: 'Software Development and IT Services', text: 'Graduates can work as Software Engineers, Full Stack Developers, Mobile App Developers, DevOps Engineers and Quality Assurance Analysts.' },
    { title: 'Networking and Cybersecurity', text: 'Career roles include Network Administrator, Security Analyst, Ethical Hacker and Systems Engineer.' },
    { title: 'Data and Analytics', text: 'Opportunities include Data Analyst, Data Scientist, Business Intelligence Analyst, Machine Learning Engineer and AI Specialist.' },
    { title: 'Cloud and Enterprise Systems', text: 'Graduates can pursue roles such as Cloud Solutions Architect, ERP Consultant and IT Project Manager.' },
    { title: 'Higher Studies and Research', text: 'The programme prepares students for competitive examinations, certifications such as AWS, CISSP and Cisco, and advanced studies such as M.Tech. or Ph.D. in IT or related fields.' },
    { title: 'Entrepreneurship and Innovation', text: 'The curriculum encourages innovation and entrepreneurial thinking, enabling graduates to develop technology-driven startups or contribute creatively within organizations.' }
  ],
  valueCourses: [
    'Advanced Programming with Python and Java',
    'Data Analytics and Visualization using Python, R and Power BI',
    'Cloud Computing Fundamentals (AWS, Azure or Google Cloud)',
    'Cybersecurity and Ethical Hacking',
    'Artificial Intelligence and Machine Learning Basics',
    'Internet of Things (IoT) Applications',
    'Software Testing and Quality Assurance',
    'Web Development and Mobile App Development',
    'Database Management Systems with SQL',
    'DevOps and Agile Methodologies'
  ]
};

const aidsData: ProgrammeSectionData = {
  vision: 'To be a global centre of excellence in Artificial Intelligence and Data Science education, research and innovation, empowering students and professionals to drive transformative change through ethical AI, advanced analytics and data-driven decision making.',
  mission: 'To provide high-quality education, cutting-edge research and industry-driven innovation in Artificial Intelligence and Data Science, equipping students and professionals with the knowledge, skills and ethical mindset to solve real-world challenges and shape the future of intelligent systems.',
  highlights: [
    'Provide high-quality education in AI, Machine Learning, Data Science and related emerging technologies through a rigorous and industry-aligned curriculum.',
    'Foster innovation and research, encouraging students and faculty to develop intelligent systems and data-driven solutions for societal and industrial challenges.',
    'Promote ethical and responsible AI practices, ensuring students understand the social, legal and environmental implications of intelligent technologies.',
    'Build strong industry and academic collaborations to facilitate internships, projects and knowledge exchange.',
    'Develop skilled professionals equipped with analytical thinking, problem-solving abilities and lifelong learning habits.'
  ],
  labs: ['Artificial Intelligence Lab', 'Deep Learning Lab', 'Big Data and Analytics Lab'],
  outcomes: [
    { code: 'PO1', title: 'Engineering Knowledge', text: 'Apply engineering knowledge to solve complex problems.' },
    { code: 'PO2', title: 'Problem Analysis', text: 'Identify, formulate and analyze complex problems.' },
    { code: 'PO3', title: 'Design and Development of Solutions', text: 'Design and develop solutions that meet specified needs.' },
    { code: 'PO4', title: 'Conduct Investigations', text: 'Conduct investigations using research-based knowledge and methods.' },
    { code: 'PO5', title: 'Modern Tool Usage', text: 'Select and apply modern engineering and IT tools appropriately.' },
    { code: 'PO6', title: 'The Engineer and Society', text: 'Assess societal, health, safety, legal and cultural responsibilities.' },
    { code: 'PO7', title: 'Environment and Sustainability', text: 'Understand environmental impacts and sustainable development.' },
    { code: 'PO8', title: 'Ethics', text: 'Apply ethical principles and professional responsibilities.' },
    { code: 'PO9', title: 'Individual and Team Work', text: 'Function effectively as an individual and as a team member or leader.' },
    { code: 'PO10', title: 'Communication', text: 'Communicate effectively with technical and non-technical audiences.' },
    { code: 'PO11', title: 'Project Management and Finance', text: 'Apply engineering and management principles to projects and teams.' },
    { code: 'PO12', title: 'Lifelong Learning', text: 'Engage in independent and lifelong learning amid technological change.' }
  ],
  careers: [
    { title: 'Typical Roles', text: 'Data Scientist, Data Analyst, Business Intelligence Analyst and Research Scientist.' },
    { title: 'Key Skills', text: 'Statistics and Probability, Data Visualization using Tableau and Power BI, Python/R Programming, and SQL/NoSQL databases.' },
    { title: 'Industries Hiring', text: 'Finance, Healthcare, Commerce, Consulting, Gaming and Retail.' }
  ],
  valueCourses: [
    'Data Representation and Interpretation using Python',
    'Chatbot Development',
    'Rapid Development for AI',
    'Augmented Reality and Virtual Reality (AR/VR)',
    'Reinforcement Learning Methods'
  ]
};


const cseData: ProgrammeSectionData = {
  overview: [
    'The Department of Computer Science and Engineering at St. Lourdes Engineering College provides an outstanding research environment complemented by excellence in teaching.',
    'The department has state-of-the-art laboratories to fulfil the curriculum and industry-collaborated Centres of Excellence in Cyber Security, Data Science, Artificial Intelligence, Cloud Computing, Front-End Engineering and Full Stack Technology.',
    'The department received the CSI Best Student Chapter award for the years 2016–2017. Curriculum delivery is implemented using project-based learning, activity-based learning and blended learning.',
    'An AI-powered learning platform supports a personalized learning experience. Digital course materials designed and developed by faculty members support students in the teaching-learning process.'
  ],
  objectives: [
    { title: 'Strong Academic Foundation', text: 'Provide in-depth knowledge in Programming, Data Structures, Algorithms, Database Management Systems, Operating Systems, Computer Networks, Artificial Intelligence and Cloud Computing.' },
    { title: 'Technical Skill Development', text: 'Equip students with hands-on expertise through laboratories, project-based learning, internships and industry-oriented training in emerging technologies.' },
    { title: 'Problem-Solving and Analytical Ability', text: 'Cultivate logical thinking, analytical reasoning and the ability to design efficient and scalable computing solutions for real-world problems.' },
    { title: 'Research and Innovation', text: 'Promote research aptitude, innovation and entrepreneurship in Machine Learning, Data Science, Cyber Security, Blockchain and IoT.' },
    { title: 'Industry Readiness and Employability', text: 'Prepare students for professional careers in software development, system design, consulting and higher studies through continuous skill enhancement and certification support.' },
    { title: 'Professional Ethics and Social Responsibility', text: 'Inculcate ethical practices, teamwork, leadership qualities and social responsibility in the application of computing technologies.' },
    { title: 'Lifelong Learning', text: 'Encourage continuous learning and adaptability to technological advancements through higher education, research and professional certifications.' }
  ],
  outcomes: [
    { code: 'PO1', title: 'Engineering Knowledge', text: 'Apply mathematics, science, engineering fundamentals and computer science knowledge to solve complex engineering problems.' },
    { code: 'PO2', title: 'Problem Analysis', text: 'Identify, formulate, review research literature and analyze complex engineering problems using first principles.' },
    { code: 'PO3', title: 'Design and Development of Solutions', text: 'Design solutions for complex engineering problems and system components that meet specified needs with appropriate consideration for public health, safety, society and the environment.' },
    { code: 'PO4', title: 'Conduct Investigations', text: 'Use research-based knowledge and methods including design of experiments, analysis and interpretation of data, and synthesis of information to provide valid conclusions.' },
    { code: 'PO5', title: 'Modern Tool Usage', text: 'Create, select and apply appropriate techniques, resources and modern engineering and IT tools, including prediction and modelling, with an understanding of their limitations.' },
    { code: 'PO6', title: 'Engineer and Society', text: 'Apply contextual knowledge to assess societal, health, safety, legal and cultural issues and the responsibilities relevant to professional engineering practice.' },
    { code: 'PO7', title: 'Environment and Sustainability', text: 'Understand the impact of professional engineering solutions in societal and environmental contexts and demonstrate the need for sustainable development.' },
    { code: 'PO8', title: 'Ethics', text: 'Apply ethical principles and commit to professional ethics, responsibilities and norms of engineering practice.' },
    { code: 'PO9', title: 'Individual and Team Work', text: 'Function effectively as an individual and as a member or leader in diverse and multidisciplinary teams.' },
    { code: 'PO10', title: 'Communication', text: 'Communicate effectively on complex engineering activities through reports, design documentation, presentations and clear instructions.' },
    { code: 'PO11', title: 'Project Management and Finance', text: 'Demonstrate knowledge of engineering and management principles and apply them to manage projects and multidisciplinary teams.' },
    { code: 'PO12', title: 'Lifelong Learning', text: 'Recognize the need for and engage in independent and lifelong learning in the broadest context of technological change.' }
  ],
  careers: [
    { title: 'Software Development and Engineering', text: 'Career roles include Software Developer, Full Stack Developer, Backend Engineer, Frontend Developer, Mobile Application Developer and Software Test Engineer.' },
    { title: 'Data Science and Artificial Intelligence', text: 'Graduates can work as Data Analyst, Data Scientist, Machine Learning Engineer, Artificial Intelligence Engineer and Business Intelligence Analyst.' },
    { title: 'Cloud Computing and DevOps', text: 'Opportunities include Cloud Engineer, DevOps Engineer, Site Reliability Engineer and System Administrator.' },
    { title: 'Cyber Security and Network Administration', text: 'Graduates can work as Cyber Security Analyst, Network Engineer, Information Security Analyst and Security Consultant.' },
    { title: 'Government and Public Sector', text: 'Computer Science graduates can pursue technical and administrative roles in IT departments, defence services, banking, railways and public sector undertakings through competitive examinations and recruitment.' },
    { title: 'Higher Studies and Certifications', text: 'M.E./M.Tech., MBA, MS abroad and professional certifications in Cloud Computing, Data Science and Cyber Security can enhance career prospects.' },
    { title: 'Entrepreneurship', text: 'Graduates can establish startups in software development, SaaS platforms, AI-based solutions, IT consulting and technology-driven innovation.' }
  ],
  valueCourses: [
    'Python Programming for Developers',
    'Advanced Data Structures and Algorithms',
    'Full Stack Web Development',
    'Mobile Application Development (Android/iOS)',
    'Data Science using Python',
    'Machine Learning and Artificial Intelligence',
    'Cloud Computing (AWS / Azure / Google Cloud)',
    'DevOps and CI/CD Practices',
    'Cyber Security Fundamentals',
    'Ethical Hacking and Network Security',
    'Internet of Things (IoT)',
    'Blockchain Technology',
    'Big Data Analytics (Hadoop / Spark)',
    'UI/UX Design Principles',
    'Database Administration (SQL / NoSQL)',
    'Git and Version Control Systems',
    'Competitive Programming and Problem Solving',
    'Soft Skills and Technical Communication'
  ]
};


const meCseData: ProgrammeSectionData = {
  overview: [
    'The Department of M.E. Computer Science and Engineering aims to provide advanced knowledge and strong research opportunities in Computer Science. The programme focuses on developing technical skills, innovation and research ability among postgraduate students.',
    'The Department has well-equipped laboratories in Artificial Intelligence, Data Science, Cyber Security, Cloud Computing and Machine Learning. Students are encouraged to work on real-time projects, research publications and industry-based problems.',
    'Teaching is carried out using project-based learning, seminars, workshops and blended learning methods. Faculty members provide continuous guidance to help students improve their technical and research skills.',
    'Digital learning materials and modern teaching tools support effective learning. The programme prepares students to become skilled professionals, researchers and technology experts in advanced computing fields.'
  ],
  objectives: [
    { title: 'Provide Advanced Knowledge', text: 'Impart in-depth understanding of advanced computing concepts such as Artificial Intelligence, Machine Learning, Data Science, Cyber Security, Cloud Computing and Distributed Systems.' },
    { title: 'Develop Research Competency', text: 'Cultivate research aptitude by encouraging innovation, experimentation, publication and problem-solving in emerging technological domains.' },
    { title: 'Enhance Technical Expertise', text: 'Strengthen practical skills through advanced laboratories, real-time projects, industry collaboration and modern development tools.' },
    { title: 'Promote Analytical and Design Skills', text: 'Enable students to analyze complex computing problems and design scalable, secure and efficient system solutions.' },
    { title: 'Ensure Industry and Leadership Readiness', text: 'Prepare graduates for advanced technical roles, consultancy, system architecture and leadership positions in IT industries and research organizations.' },
    { title: 'Encourage Ethical and Professional Practice', text: 'Instill professional ethics, social responsibility, teamwork and effective communication skills.' },
    { title: 'Support Lifelong Learning', text: 'Motivate continuous learning, higher research (Ph.D.), certifications and adaptability to rapidly evolving technologies.' }
  ],
  outcomes: [
    { code: 'PO1', title: 'Advanced Engineering Knowledge', text: 'Apply advanced knowledge of mathematics, computing principles and specialized areas of Computer Science to solve complex and research-oriented engineering problems.' },
    { code: 'PO2', title: 'Research and Problem Analysis', text: 'Identify, formulate, review research literature and analyze complex computing problems using advanced theoretical and practical approaches.' },
    { code: 'PO3', title: 'Design and Development of Advanced Solutions', text: 'Design and develop innovative, scalable and secure computing systems or processes that meet specified needs with appropriate consideration for societal and environmental aspects.' },
    { code: 'PO4', title: 'Research-Based Investigation', text: 'Conduct investigations using research methodologies, including experimental design, data analysis, simulation and interpretation to derive valid conclusions.' },
    { code: 'PO5', title: 'Modern Tool Usage', text: 'Select and apply advanced computing tools, modeling techniques and contemporary software technologies for solving complex engineering and research problems.' },
    { code: 'PO6', title: 'Professional and Societal Responsibility', text: 'Apply contextual knowledge to assess societal, legal, ethical and security issues related to advanced computing solutions.' },
    { code: 'PO7', title: 'Sustainability and Emerging Technologies', text: 'Understand the impact of computing technologies on society and environment, and contribute towards sustainable and responsible technological development.' },
    { code: 'PO8', title: 'Ethics and Professional Integrity', text: 'Demonstrate commitment to professional ethics, research integrity and responsible engineering practices.' },
    { code: 'PO9', title: 'Leadership and Teamwork', text: 'Function effectively as an individual researcher, team member or leader in multidisciplinary and diverse environments.' },
    { code: 'PO10', title: 'Technical Communication', text: 'Communicate effectively through technical reports, research publications, presentations and documentation in professional and academic contexts.' },
    { code: 'PO11', title: 'Project and Research Management', text: 'Apply management principles and financial awareness in handling research projects, consultancy assignments and technology development initiatives.' },
    { code: 'PO12', title: 'Lifelong Learning', text: 'Engage in continuous learning, higher research, professional certifications and adaptation to rapidly evolving computing technologies.' }
  ],
  careers: [
    { title: 'Advanced Software Development and System Architecture', text: 'Senior Software Engineer, Solution Architect, Technical Lead, Full Stack Architect, Systems Engineer and Product Development Engineer roles focus on scalable enterprise systems, distributed applications and high-performance computing.' },
    { title: 'Artificial Intelligence and Data Science', text: 'Data Scientist, Machine Learning Engineer, AI Research Engineer, Deep Learning Specialist and Analytics Consultant roles involve intelligent systems, predictive models and automation solutions.' },
    { title: 'Research and Development (R&D)', text: 'Research Engineer, R&D Specialist, Innovation Engineer and Research Associate opportunities are available in research labs, multinational companies and technology centres. Graduates may also pursue Ph.D. studies.' },
    { title: 'Cloud Computing, DevOps and Infrastructure Engineering', text: 'Cloud Architect, DevOps Lead, Site Reliability Engineer and Infrastructure Consultant roles involve secure cloud environments, scalable systems and enterprise infrastructure.' },
    { title: 'Cyber Security and Information Assurance', text: 'Cyber Security Specialist, Security Architect, Information Security Consultant and Risk Analyst roles focus on security frameworks, threat analysis and enterprise data protection.' },
    { title: 'Academic and Teaching Careers', text: 'Graduates can pursue careers as Assistant Professors, Academic Researchers and Technical Trainers in engineering institutions and universities.' },
    { title: 'Government and Public Sector Opportunities', text: 'Graduates may pursue higher-level technical and research roles in government organizations, defence services, public sector undertakings and research agencies.' },
    { title: 'Entrepreneurship and Technology Consulting', text: 'Graduates can establish technology startups, AI-based solution firms, SaaS platforms, research consultancy services and innovation-driven enterprises.' }
  ],
  valueCourses: ['Advanced Machine Learning Techniques', 'Deep Learning and Neural Networks', 'Data Science using Python', 'Advanced Cyber Security and Ethical Hacking', 'Cloud Architecture and DevOps Practices', 'Big Data Analytics with Hadoop & Spark', 'Blockchain Technology and Applications', 'Internet of Things (IoT) System Design', 'Advanced Database Technologies (NoSQL & Distributed Databases)', 'Natural Language Processing', 'Computer Vision and Image Processing', 'High Performance Computing', 'Research Methodology and Technical Writing', 'Patent Drafting and Intellectual Property Rights', 'AI for Industry Applications', 'MLOps and Model Deployment', 'Microservices and Containerization (Docker & Kubernetes)', 'Secure Software Engineering', 'Edge Computing and Smart Systems']
};

const mbaData: ProgrammeSectionData = {
  overview: [
    'The Department of Management Studies (MBA) at St. Lourdes Engineering College is a dynamic academic unit committed to nurturing future-ready management professionals. The department delivers value-based education blended with contemporary business knowledge and industry-oriented training, emphasizing academic excellence, ethical leadership, innovation and social responsibility.',
    'The department is supported by experienced faculty members specializing in Human Resource Management, Finance, Marketing, Operations, Systems and Entrepreneurship. Its learner-centric approach integrates case-based learning, experiential projects, business simulations, seminars, workshops and industry interactions.',
    'Strong connections with corporate organizations, entrepreneurs and industry experts provide practical exposure alongside theoretical understanding. Guest lectures, industrial visits, internships and placement training bridge the gap between academia and industry.',
    'Through initiatives focused on communication skills, leadership development and ethical practices, the department strives to create competent, confident and socially responsible business leaders capable of thriving in a competitive global environment.'
  ],
  objectives: [
    { title: 'Build Management Competence', text: 'Develop competent management professionals equipped with analytical, leadership and decision-making skills, bridging academic knowledge and real-world business practices.' },
    { title: 'Understand Core Business Functions', text: 'Build understanding of management, economics, finance, marketing, operations and human resources.' },
    { title: 'Develop Strategic and Entrepreneurial Thinking', text: 'Cultivate strategic thinking, problem-solving abilities, innovation and an entrepreneurial mindset.' },
    { title: 'Instill Ethical Values', text: 'Promote ethical values, social responsibility, sustainable business practices and professional integrity.' },
    { title: 'Strengthen Communication and Teamwork', text: 'Enhance communication skills, teamwork and interpersonal effectiveness for employability and corporate readiness.' },
    { title: 'Prepare Future Leaders', text: 'Prepare graduates for leadership roles in national and international organizations while fostering adaptability and continuous learning.' },
    { title: 'Integrate Academic and Practical Learning', text: 'Use classroom instruction, case analysis, internships, research projects and industry interaction to support holistic development.' }
  ],
  highlights: ['Human Resource Management', 'Finance', 'Marketing', 'Operations Management', 'Systems Management', 'Business Analytics', 'Tourism', 'Logistics and Supply Chain Management', 'Two-year full-time MBA programme affiliated to Anna University, Chennai and approved by AICTE', 'Four-semester structure combining core management subjects, specialization subjects, internships and project work', 'Case studies, business simulations, management fests, seminars, workshops and certification programmes'],
  outcomes: [
    { code: 'PO1', title: 'Management Knowledge and Application', text: 'Demonstrate comprehensive knowledge of management theories and practical business applications.' },
    { code: 'PO2', title: 'Business Analysis and Strategic Solutions', text: 'Analyze complex business problems and propose strategic solutions using analytical and quantitative techniques.' },
    { code: 'PO3', title: 'Functional Specialization', text: 'Apply expertise in finance, marketing, human resource management, operations and systems to make informed decisions.' },
    { code: 'PO4', title: 'Leadership, Teamwork and Communication', text: 'Demonstrate leadership qualities, teamwork capabilities and effective communication skills in corporate environments.' },
    { code: 'PO5', title: 'Ethics and Professional Standards', text: 'Apply ethical principles and professional standards in managerial decision-making.' },
    { code: 'PO6', title: 'Research and Data Interpretation', text: 'Conduct research, interpret data and prepare analytical reports to support organizational growth.' },
    { code: 'PO7', title: 'Entrepreneurship and Innovation', text: 'Demonstrate entrepreneurial competencies and innovative thinking to establish ventures or contribute creatively within organizations.' },
    { code: 'PO8', title: 'Industry Readiness and Global Perspective', text: 'Apply learning from internships and live projects to real-time business challenges and demonstrate adaptability in diverse business environments.' }
  ],
  careers: [
    { title: 'Human Resource Management', text: 'HR Executive, Talent Acquisition Specialist, Training and Development Officer and HR Business Partner.' },
    { title: 'Finance', text: 'Financial Analyst, Investment Analyst, Banking Officer, Credit Analyst and Accounts Manager.' },
    { title: 'Marketing', text: 'Marketing Executive, Brand Manager, Sales Manager, Digital Marketing Analyst and Business Development Executive.' },
    { title: 'Operations Management', text: 'Operations Manager, Supply Chain Analyst, Production Planner and Logistics Manager.' },
    { title: 'Systems Management', text: 'Business Analyst, IT Consultant, Data Analyst and ERP Executive.' },
    { title: 'Higher Studies and Competitive Examinations', text: 'Graduates can pursue competitive examinations and higher studies such as Ph.D. in Management.' },
    { title: 'Entrepreneurship', text: 'The programme encourages graduates to start their own ventures and contribute to economic development.' }
  ],
  valueCourses: ['Advanced Excel for Managers', 'Business Analytics using Excel and Power BI', 'Digital Marketing Certification', 'SAP Fundamentals', 'Financial Modeling', 'HR Analytics', 'Soft Skills and Corporate Communication', 'Entrepreneurship Development Programme', 'Tally with GST', 'Stock Market and Investment Analysis']
};

const programmeData: Record<string, ProgrammeSectionData> = {
  'B.E. Computer Science and Engineering': cseData,
  'B.E. Computer Science and Engineering (Cyber Security)': cyberSecurityData,
  'B.E. Electronics and Communication Engineering': eceData,
  'B.Tech. Information Technology': itData,
  'B.Tech. Artificial Intelligence and Data Science': aidsData,
  'M.E. Computer Science and Engineering': meCseData,
  'Master of Business Administration (MBA)': mbaData
};

const sectionLinks = [
  ['department-overview', 'Department Overview'],
  ['vision-mission', 'Vision & Mission'],
  ['department-highlights', 'Department Highlights'],
  ['programme-objectives', 'Programme Objectives'],
  ['programme-outcomes', 'Programme Outcomes'],
  ['career-opportunities', 'Career Opportunities'],
  ['value-added-courses', 'Value-Added Courses'],
  ['department-labs', 'Department Labs'],
  ['department-gallery', 'Department Gallery']
] as const;

const aidsGallery = [
  { title: 'Artificial Intelligence Lab', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/Artificial-Intelligence-Lab.png' },
  { title: 'Deep Learning Lab', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/Deep-Learning-Lab.jpg' },
  { title: 'Big Data and Analytics Lab', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/Big-Data-and-Analytics-Lab.jpg' },
  { title: 'TECHTOPIA SYMPOSIUM 2025', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/TECHTOPIA-SYMPOSIUM-2025.jpg' },
  { title: 'INTERNAL HACKATHON', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/INTERNAL-HACKATHON.jpg' },
  { title: 'INTERNAL HACKATHON', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/INTERNAL-HACKATHON-1.jpg' },
  { title: 'INTERNAL HACKATHON', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/INTERNAL-HACKATHON-2.jpg' },
  { title: 'INTERNAL HACKATHON', src: 'https://www.slec.edu.in/wp-content/uploads/2023/08/INTERNAL-HACKATHON-3.jpg' }
];

function ProgrammeDetails({ course }: { course: Course }) {
  const data: ProgrammeSectionData = programmeData[course.title] || {};
  const isAids = course.title === 'B.Tech. Artificial Intelligence and Data Science';
  const isMba = course.title === 'Master of Business Administration (MBA)';
  const [activeImage, setActiveImage] = useState<string | null>(null);

  const sections = isAids
    ? sectionLinks.filter(([id]) => ['vision-mission', 'department-highlights', 'programme-outcomes', 'career-opportunities', 'value-added-courses', 'department-labs', 'department-gallery'].includes(id))
    : isMba
      ? sectionLinks.filter(([id]) => ['department-overview', 'department-highlights', 'programme-objectives', 'programme-outcomes', 'career-opportunities', 'value-added-courses'].includes(id))
      : sectionLinks.filter(([id]) => ['department-overview', 'programme-objectives', 'programme-outcomes', 'career-opportunities', 'value-added-courses'].includes(id));

  return (
    <div className="programme-detail">
      <section className="programme-detail-hero" data-header-theme="dark">
        <div className="programme-detail-hero-inner">
          <Link to="/academics" className="programme-back">
            <ArrowRight style={{ transform: 'rotate(180deg)' }} aria-hidden="true" />
            Back to Courses
          </Link>
          <div className="programme-detail-kicker">ST. LOURDES ENGINEERING COLLEGE · ACADEMICS</div>
          <h1>{course.title}</h1>
          <p>{course.description}</p>
          <div className="programme-detail-meta">
            <span>Duration: {course.duration}</span>
            <span>Full-Time Programme</span>
            <span>St. Lourdes Engineering College</span>
          </div>
        </div>
      </section>

      <main className="programme-layout">
        <aside className="programme-sidebar">
          <h2>Programme Overview</h2>
          {sections.map(([id, label]) => <a href={`#${id}`} key={id}>{label}</a>)}
        </aside>

        <div className="programme-content">
          {data?.overview && (
            <section className="programme-section" id="department-overview">
              <h2 className="programme-section-heading"><span className="programme-section-number">01</span>Department Overview</h2>
              {data.overview.map((paragraph, index) => <p key={index}>{paragraph}</p>)}
            </section>
          )}

          {(data?.vision || data?.mission) && (
            <section className="programme-section" id="vision-mission">
              <h2 className="programme-section-heading"><span className="programme-section-number">01</span>Vision & Mission</h2>
              {data.vision && <div className="programme-objective"><h3>Vision</h3><p>{data.vision}</p></div>}
              {data.mission && <div className="programme-objective" style={{ marginTop: 12 }}><h3>Mission</h3><p>{data.mission}</p></div>}
            </section>
          )}

          {data?.highlights && (
            <section className="programme-section" id="department-highlights">
              <h2 className="programme-section-heading"><span className="programme-section-number">02</span>{isMba ? 'Name of the Courses Offering' : 'Department Highlights'}</h2>
              <div className="programme-career-list">
                {data.highlights.map((item, index) => <article className="programme-career" key={item}><span className="programme-career-number">{String(index + 1).padStart(2, '0')}</span><div><p>{item}</p></div></article>)}
              </div>
            </section>
          )}

          {data?.objectives && (
            <section className="programme-section" id="programme-objectives">
              <h2 className="programme-section-heading"><span className="programme-section-number">02</span>Objectives of the Programme</h2>
              <p>The department is committed to delivering quality education, research and industry-oriented learning. The key objectives are:</p>
              <div className="programme-objective-grid">
                {data.objectives.map(item => <article className="programme-objective" key={item.title}><h3>{item.title}</h3><p>{item.text}</p></article>)}
              </div>
            </section>
          )}

          {data?.outcomes && (
            <section className="programme-section" id="programme-outcomes">
              <h2 className="programme-section-heading"><span className="programme-section-number">03</span>Programme Outcomes (POs)</h2>
              <p>On successful completion of the programme, graduates will be able to:</p>
              <div className="programme-po-list">
                {data.outcomes.map(item => <details className="programme-po" key={item.code}><summary><span className="programme-po-code">{item.code}</span>{item.title || 'Programme Outcome'}</summary><p>{item.text}</p></details>)}
              </div>
            </section>
          )}

          {data?.careers && (
            <section className="programme-section" id="career-opportunities">
              <h2 className="programme-section-heading"><span className="programme-section-number">04</span>Career Opportunities</h2>
              <p>{isAids ? 'A career in Artificial Intelligence and Data Science offers diverse, high-growth opportunities across industries.' : isMba ? 'The MBA programme opens diverse career opportunities across corporate organizations, financial institutions, consulting firms, manufacturing companies, IT firms and entrepreneurial ventures.' : course.title === 'M.E. Computer Science and Engineering' ? 'The M.E. Computer Science and Engineering programme prepares graduates for advanced technical, research and leadership roles in IT industries, product-based companies, research organizations, academia, startups and government sectors.' : `The ${course.title} programme opens diverse career opportunities across industry, research, government and entrepreneurial sectors.`}</p>
              <div className="programme-career-list">
                {data.careers.map((item, index) => <article className="programme-career" key={item.title}><span className="programme-career-number">{String(index + 1).padStart(2, '0')}</span><div><h3>{item.title}</h3><p>{item.text}</p></div></article>)}
              </div>
            </section>
          )}

          {data?.valueCourses && (
            <section className="programme-section" id="value-added-courses">
              <h2 className="programme-section-heading"><span className="programme-section-number">05</span>Value-Added Courses</h2>
              <p>{course.title === 'M.E. Computer Science and Engineering' ? 'The department offers advanced value-added courses to strengthen postgraduate students’ technical skills, research capabilities and industry readiness beyond the regular curriculum.' : isMba ? 'The Department of Management Studies offers value-added courses to enhance student competencies, employability skills and industry readiness beyond the regular curriculum.' : 'The department offers value-added courses to enhance students’ technical competencies, practical skills, industry readiness and professional development beyond the prescribed curriculum.'}</p>
              <div className="programme-course-grid">
                {data.valueCourses.map(item => <div className="programme-value-course" key={item}><CheckCircle2 aria-hidden="true" />{item}</div>)}
              </div>
            </section>
          )}

          {data?.labs && (
            <section className="programme-section" id="department-labs">
              <h2 className="programme-section-heading"><span className="programme-section-number">06</span>Department Labs</h2>
              <div className="programme-course-grid">
                {data.labs.map(item => <div className="programme-value-course" key={item}><CheckCircle2 aria-hidden="true" />{item}</div>)}
              </div>
            </section>
          )}

          {isAids && (
            <section className="programme-section" id="department-gallery">
              <h2 className="programme-section-heading"><span className="programme-section-number">07</span>Department Labs & Activities Gallery</h2>
              <div className="programme-gallery-grid">
                {aidsGallery.map((item, index) => (
                  <button className="programme-gallery-card" type="button" key={`${item.src}-${index}`} onClick={() => setActiveImage(item.src)}>
                    <img src={item.src} alt={item.title} loading="lazy" />
                    <span>{item.title}</span>
                  </button>
                ))}
              </div>
            </section>
          )}

          <section className="programme-detail-cta">
            <div><h2>Ready to begin your journey?</h2><p>Take the next step towards your academic and professional goals.</p></div>
            <Link to="/admission" className="academics-apply-button">Apply for Admission <ArrowRight aria-hidden="true" /></Link>
          </section>
        </div>
      </main>

      {activeImage && (
        <div className="programme-lightbox" role="dialog" aria-modal="true" aria-label="Department image preview" onClick={() => setActiveImage(null)}>
          <button type="button" className="programme-lightbox-close" aria-label="Close image preview" onClick={() => setActiveImage(null)}>×</button>
          <img src={activeImage} alt="Department gallery preview" onClick={event => event.stopPropagation()} />
        </div>
      )}
    </div>
  );
}

export default function Academics() {
  const [searchParams] = useSearchParams();

  const selectedProgramme = searchParams.get('programme');

  const allCourses = [...ugCourses, ...pgCourses];

  const selectedCourse = allCourses.find(
    (course) => course.title === selectedProgramme
  );

  return (
    <div className="academics-page">
      <AcademicsStyles />

      {selectedCourse ? (
        <ProgrammeDetails course={selectedCourse} />
      ) : (
        <>
          <section
            className="academics-hero"
            data-header-theme="dark"
          >
            <GraduationCap
              className="academics-hero-decoration"
              aria-hidden="true"
            />

            <div className="academics-hero-inner">
              <div className="academics-breadcrumb"></div>

              <div className="academics-eyebrow">
                <span>Our Courses</span>
                <span className="academics-eyebrow-line" />
              </div>

              <h1>
                Our <span>Courses</span>
              </h1>

              <p className="academics-hero-description">
                Industry-relevant programmes designed to build knowledge,
                skills and successful careers.
              </p>
            </div>
          </section>

          <Benefits />

          <main className="academics-main">
            <section className="academics-course-section">
              <div className="academics-section-heading">
                <span>Undergraduate Courses</span>
                <span className="academics-heading-line" />
              </div>

              <div className="academics-zigzag-list">
                {ugCourses.map((course, index) => (
                  <CourseCard
                    key={course.shortTitle}
                    course={course}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <section className="academics-course-section">
              <div className="academics-section-heading">
                <span>Postgraduate Courses</span>
                <span className="academics-heading-line" />
              </div>

              <div className="academics-zigzag-list">
                {pgCourses.map((course, index) => (
                  <CourseCard
                    key={course.shortTitle}
                    course={course}
                    index={index}
                  />
                ))}
              </div>
            </section>

            <section className="academics-bottom-cta">
              <div>
                <h2>Build Your Future with St. Lourdes</h2>
                <p>
                  Explore your academic opportunities and take the next step
                  towards your educational and professional goals.
                </p>
              </div>

              <Link
                to="/admission"
                className="academics-apply-button"
              >
                Apply for Admission
                <ArrowRight aria-hidden="true" />
              </Link>
            </section>
          </main>
        </>
      )}
    </div>
  );
}