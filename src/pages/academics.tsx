
import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
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

            <Link
              to="/admission"
              className="academics-apply-button"
            >
              Apply for Admission
              <ArrowRight aria-hidden="true" />
            </Link>
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

export default function Academics() {
  return (
    <div className="academics-page">
      <AcademicsStyles />

<section
  className="academics-hero"
  data-header-theme="dark"
>        <GraduationCap
          className="academics-hero-decoration"
          aria-hidden="true"
        />

        <div className="academics-hero-inner">
          <div className="academics-breadcrumb">
          
          </div>

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
    </div>
  );
}
