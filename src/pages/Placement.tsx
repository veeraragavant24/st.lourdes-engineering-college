import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { useAdmissionModal } from '@/components/AdmissionModalContext';
import {
  BriefcaseBusiness,
  Users,
  GraduationCap,
  Handshake,
  ArrowRight,
  TrendingUp,
  Target,
  Award,
  CalendarDays,
  Building2,
  ChevronRight,
  Sparkles,
  CheckCircle2,
  BookOpen,
  Lightbulb,
} from 'lucide-react';
import PageHero from '@/components/PageHero';

const features = [
  {
    icon: BriefcaseBusiness,
    number: '01',
    title: 'Placement Support',
    text: 'A dedicated placement cell coordinates campus recruitment drives, pre-placement training, and interview preparation for every eligible student.',
  },
  {
    icon: Users,
    number: '02',
    title: 'Recruiting Companies',
    text: 'National and multinational organizations across IT, core engineering, and consulting visit our campus for recruitment.',
  },
  {
    icon: GraduationCap,
    number: '03',
    title: 'Career Guidance',
    text: 'Mentorship programmes, resume workshops, mock interviews, and soft-skills training prepare students for professional success.',
  },
  {
    icon: Handshake,
    number: '04',
    title: 'Industry Collaboration',
    text: 'Internships, industrial visits, and guest lectures by industry leaders bridge the gap between academic learning and industry expectations.',
  },
];

const process = [
  {
    icon: Target,
    number: '01',
    title: 'Training & Preparation',
    text: 'Aptitude training, technical workshops, and communication-skills sessions prepare students for recruitment.',
  },
  {
    icon: CalendarDays,
    number: '02',
    title: 'Campus Recruitment Drives',
    text: 'Companies conduct recruitment drives involving written tests, group discussions, and interviews.',
  },
  {
    icon: Building2,
    number: '03',
    title: 'Industry Internships',
    text: 'Students gain real-world exposure through internships and industry-based learning opportunities.',
  },
  {
    icon: Award,
    number: '04',
    title: 'Alumni Network',
    text: 'Our alumni community provides mentorship, professional guidance, and valuable industry connections.',
  },
];

/* --------------------------------------------------
   TOP RECRUITERS
   Logo cards are in:  public/recruiters/<file>
   If a file is missing, the card shows the company
   name as text instead of a broken image.
   -------------------------------------------------- */

const recruiters = [
  { name: 'Google', logo: '/recuiters/google.png' },
  { name: 'Accenture', logo: '/recuiters/accenture.png' },
  { name: 'Cognizant', logo: '/recuiters/cognizant.png' },
  { name: 'HCL Tech', logo: '/recuiters/hcl.jpg' },
  { name: 'Flipkart', logo: '/recuiters/flipkart.png' },
  { name: 'Amazon', logo: '/recuiters/amazon.png' },
  { name: 'Mahindra', logo: '/recuiters/mahindra.jpg' },
  { name: 'Infosys', logo: '/recuiters/infosys.png' },
  { name: 'IBM', logo: '/recuiters/IBM.png' },
  { name: 'Hexaware', logo: '/recuiters/hexaware.jpg' },
  { name: 'L&T Infotech', logo: '/recuiters/l&tinfotech.png' },
  { name: 'L & T', logo: '/recuiters/l&t.png' },
  { name: 'Polaris', logo: '/recuiters/polaris.jpg' },
  { name: 'QSpiders', logo: '/recuiters/Qspider.png' },
  { name: 'Sutherland', logo: ' /recuiters/sutherland.jpg' },
  { name: 'TCS', logo: '/recuiters/tcs.jpg' },
  { name: 'Vertafore', logo: '/recuiters/vertafare.jpg' },
  { name: 'Why Global Service', logo: '/recuiters/why-global.png' },
  { name: 'Wipro', logo: '/recuiters/wipro.png' },
  { name: 'Zoho', logo: '/recuiters/zoho.png' },
];

/* --------------------------------------------------
   PLACEMENT & TRAINING CELL CONTENT
   -------------------------------------------------- */

const aboutIntro =
  'The Training and Placement Cell of SLEC operates round the year to provide job opportunities to the students as well as internships, workshops and placement trainings to all the students of our college. It serves as an interface between the students and the corporate. We aim at inviting companies from various fields to provide training and placement in order to make a wide range of opportunities available for our students.';

const aboutPoints = [
  'SLEC provides placement training for all eligible students to become successful in their placement interviews.',
  'SLEC successfully delivers the young graduates to meet the expectations of top-notch companies.',
  'The unique characteristics of our students include academic excellence with diverse skill sets and leadership qualities, which make them an asset to any organization.',
  'Experimental learning ambience with a blend of industry and research experienced faculty team.',
  'SLEC organizes internships during summer and winter vacation for all pre-final year students in leading industries and companies to face the real challenges in industry.',
  'Strong alumni connect to inculcate and imbibe the requirements of the industry.',
];

const internshipPoints = [
  'In SLEC, students take internships during their third and final years to gain experience in a selected domain and to observe the best practices in industry.',
  'Internship helps students get ready for addressing real-world challenges in full-time jobs, and gives opportunities to learn new skills and supplement knowledge.',
  'The internship program helps fresh pass-outs in gaining professional experience.',
];

const trainingParagraphs = [
  'Information regarding the campus recruitment process is displayed to the students. It helps students to plan their careers by providing information about the industries which approach the institute. At the beginning of the academic year, a general-body meeting of final-year students interested in placement activities is called. Every month, a review meeting is convened to plan the future course of action.',
  'Throughout the year, senior executives and alumni from a variety of businesses participate in scheduled informal discussions on industry and career trends. Representatives share practical advice and insights gained from their own backgrounds and experiences. The uniqueness of the training curriculum is that the programme is meticulously planned with a structured and progressive syllabus that facilitates holistic development of the students’ personality.',
  'The Placement Cell strives to enhance self-employment, which is supported by the government by extending financial assistance through the banking sector. Further, workshops are organized to bring out entrepreneurial skills.',
  'The Department of Training & Placement conducts programmes that offer various services to meet the professional development needs of students. The department partners with students in the process of career management. This starts with self-assessment and leads to identifying a career that meets individual goals.',
];

const activities = [
  'Developing verbal and non-verbal communication',
  'Enhancing public speaking skills',
  'Imparting personality improvement through in-house and external expert faculty programmes',
  'Programs providing career guidance',
  'Administering aptitude and psychological tests',
  'Conducting group discussions and mock interview practice sessions',
  'Organizing entrepreneurship promotion programmes',
  'Arranging in-plant training and obtaining project work from industries',
  'Assisting for GRE, GMAT and GATE in a simulated environment',
  'Arranging on and off campus recruitments',
];

const trainingProgrammes = [
  'Communication Skills',
  'Personality Development',
  'Finishing School',
  'Resume Writing Workshop',
  'Mock GD, Mock Interview',
  'Programming in C, C++',
  'Programming in Python',
  'Programming in Data Structures',
  'Programming in Java',
  'Advanced Java',
  'Web Technology',
  'CCNA',
  'STAAD Pro',
  'Revit Architecture',
  'AutoCAD 2D',
  'Python Interpreter Language',
  'PLC & SCADA',
  'Embedded Systems',
  'Electrical CADD',
  'PCB Design',
  'Vehicle Fundamentals',
  'HyperMesh',
  'SolidWorks',
  'MS Project',
  'CFD',
];

/* --------------------------------------------------
   REPEATING SCROLL REVEAL
   -------------------------------------------------- */

function useScrollReveal() {
  const pageRef = useRef<HTMLDivElement>(null);

  useEffect(() => {
    const root = pageRef.current;
    if (!root) return;

    const elements = root.querySelectorAll<HTMLElement>('[data-reveal]');

    const observer = new IntersectionObserver(
      (entries) => {
        entries.forEach((entry) => {
          const element = entry.target as HTMLElement;

          if (entry.isIntersecting) {
            element.classList.add('is-visible');
          } else {
            // Remove the class when the element leaves the viewport.
            // This allows the animation to replay on the next scroll.
            element.classList.remove('is-visible');
          }
        });
      },
      {
        threshold: 0.15,
        rootMargin: '0px 0px -45px 0px',
      }
    );

    elements.forEach((element) => observer.observe(element));

    return () => observer.disconnect();
  }, []);

  return pageRef;
}

/* --------------------------------------------------
   TOP RECRUITERS
   -------------------------------------------------- */

function RecruiterCard({
  company,
  hidden,
}: {
  company: { name: string; logo: string };
  hidden: boolean;
}) {
  const [failed, setFailed] = useState(false);

  return (
    <div className="recruiter-card" aria-hidden={hidden}>
      {failed ? (
        <div className="recruiter-brand-name">{company.name}</div>
      ) : (
        <img
          src={company.logo}
          alt={hidden ? '' : company.name}
          className="recruiter-logo"
          loading="lazy"
          draggable={false}
          onError={() => setFailed(true)}
        />
      )}
    </div>
  );
}

function RecruitersSection() {
  const repeatedRecruiters = [...recruiters, ...recruiters];

  return (
    <section className="placement-recruiters relative overflow-hidden">
      <div className="placement-recruiters-decoration placement-decoration-one" />
      <div className="placement-recruiters-decoration placement-decoration-two" />

      <div className="relative z-10 mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-12 text-center" data-reveal="fade">
          <span className="placement-gold-label">
            <Sparkles size={15} />
            OUR HIRING PARTNERS
          </span>

          <h2 className="mt-4 font-serif text-3xl font-bold text-white sm:text-4xl lg:text-5xl">
            Top Recruiters
          </h2>

          <div className="placement-heading-line" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-white/70 sm:text-base">
            We aim to connect our students with leading organisations and
            create opportunities for a successful professional future.
          </p>
        </div>

        <div className="recruiter-marquee" aria-label="Recruiting companies">
          <div className="recruiter-track">
            {repeatedRecruiters.map((company, index) => (
              <RecruiterCard
                key={`${company.name}-${index}`}
                company={company}
                hidden={index >= recruiters.length}
              />
            ))}
          </div>
        </div>

        <p className="mt-6 text-center text-xs tracking-wide text-white/50">
          Hover over the company cards to pause the carousel
        </p>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   ABOUT, INTERNSHIP, TRAINING AND PROGRAMMES
   -------------------------------------------------- */

function DetailCard({
  icon: Icon,
  title,
  direction,
  children,
}: {
  icon: typeof Lightbulb;
  title: string;
  direction: 'left' | 'right' | 'up';
  children: React.ReactNode;
}) {
  return (
    <div className="placement-detail-card" data-reveal={direction}>
      <div className="placement-detail-heading">
        <div className="placement-icon">
          <Icon size={26} strokeWidth={1.7} />
        </div>
        <h3 className="font-serif text-xl font-bold text-maroon-700 sm:text-2xl">
          {title}
        </h3>
      </div>
      {children}
    </div>
  );
}

function DetailList({ items }: { items: string[] }) {
  return (
    <ul className="placement-check-list">
      {items.map((item) => (
        <li key={item}>
          <CheckCircle2 size={17} />
          <span>{item}</span>
        </li>
      ))}
    </ul>
  );
}

function PlacementDetailsSection() {
  return (
    <section className="placement-details section-pad">
      <div className="mx-auto max-w-7xl px-5 sm:px-8">
        <div className="mb-14 text-center" data-reveal="fade">
          <p className="eyebrow">TRAINING &amp; PLACEMENT CELL</p>

          <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
            About Placement &amp; Training Cell
          </h2>

          <div className="placement-heading-line" />

          <p className="mx-auto mt-5 max-w-3xl text-sm leading-7 text-black sm:text-base">
            {aboutIntro}
          </p>
        </div>

        <div className="grid gap-6 lg:grid-cols-2">
          <DetailCard icon={BriefcaseBusiness} title="Why SLEC" direction="left">
            <DetailList items={aboutPoints} />
          </DetailCard>

          <DetailCard icon={GraduationCap} title="Internship" direction="right">
            <DetailList items={internshipPoints} />
          </DetailCard>
        </div>

        <div className="mt-6">
          <DetailCard icon={CalendarDays} title="Training & Placements" direction="up">
            <div className="placement-paragraphs">
              {trainingParagraphs.map((text) => (
                <p key={text.slice(0, 30)}>{text}</p>
              ))}
            </div>
          </DetailCard>
        </div>

        <div className="mt-6">
          <DetailCard icon={Lightbulb} title="Activities of the Department" direction="up">
            <DetailList items={activities} />
          </DetailCard>
        </div>

        <div className="placement-programmes" data-reveal="up">
          <div className="placement-detail-heading">
            <div className="placement-step-icon">
              <BookOpen size={26} strokeWidth={1.7} />
            </div>
            <h3 className="font-serif text-xl font-bold text-white sm:text-2xl">
              Training Programmes
            </h3>
          </div>

          <div className="placement-programme-grid">
            {trainingProgrammes.map((name) => (
              <div key={name} className="placement-programme-item">
                <CheckCircle2 size={16} />
                {name}
              </div>
            ))}
          </div>
        </div>
      </div>
    </section>
  );
}

/* --------------------------------------------------
   MAIN PLACEMENT PAGE
   -------------------------------------------------- */

export default function Placement() {
  const { openModal } = useAdmissionModal();
  const pageRef = useScrollReveal();

  return (
    <div ref={pageRef} className="placement-page">
      <style>{`
        /* Scroll reveal base */
        [data-reveal] {
          opacity: 0;
          will-change: opacity, transform;
          transition:
            opacity .85s ease,
            transform .85s cubic-bezier(.2,.7,.2,1);
          transition-delay: var(--reveal-delay, 0ms);
        }

        [data-reveal="left"] {
          transform: translateX(-75px);
        }

        [data-reveal="right"] {
          transform: translateX(75px);
        }

        [data-reveal="up"] {
          transform: translateY(45px);
        }

        [data-reveal="fade"] {
          transform: translateY(20px);
        }

        [data-reveal].is-visible {
          opacity: 1;
          transform: translate(0, 0);
        }

        .placement-features {
          background: #fffdf9;
        }

        .placement-feature-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(184,137,55,.19);
          background: linear-gradient(145deg,#fff,#fffaf3);
          border-radius: 20px;
          padding: 30px;
          transition: transform .35s ease, box-shadow .35s ease, border-color .35s ease;
        }

        .placement-feature-card:hover {
          transform: translateY(-7px);
          border-color: rgba(184,137,55,.65);
          box-shadow: 0 18px 40px rgba(73,15,35,.10);
        }

        .placement-icon {
          display: flex;
          align-items: center;
          justify-content: center;
          width: 60px;
          height: 60px;
          flex-shrink: 0;
          border-radius: 16px;
          color: #801b3a;
          background: linear-gradient(145deg,#fff0ce,#f7d783);
          transition: all .35s ease;
        }

        .placement-feature-card:hover .placement-icon {
          background: #741632;
          color: #f5ce75;
          transform: rotate(-5deg);
        }

        .placement-process {
          background:
            radial-gradient(circle at 10% 20%,rgba(220,181,94,.09),transparent 25%),
            linear-gradient(135deg,#fffaf5,#f8f0ed);
        }

        .placement-step-card {
          position: relative;
          min-height: 220px;
          padding: 28px 23px;
          border-radius: 19px;
          background: linear-gradient(145deg,#791936,#4c1026);
          color: white;
          box-shadow: 0 12px 28px rgba(74,13,35,.12);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .placement-step-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 18px 35px rgba(74,13,35,.22);
        }

        .placement-step-number {
          display: inline-flex;
          padding: 6px 14px;
          border-radius: 30px;
          color: #541326;
          background: linear-gradient(120deg,#f8dc9a,#e6b950);
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 1px;
        }

        .placement-step-icon {
          width: 52px;
          height: 52px;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 15px;
          color: #f3ca72;
          background: rgba(255,255,255,.09);
          border: 1px solid rgba(245,205,119,.2);
        }

        .placement-recruiters {
          padding: 90px 0 85px;
          background: linear-gradient(115deg,#4d1026,#791936 55%,#4c1026);
        }

        .placement-recruiters-decoration {
          position: absolute;
          width: 370px;
          height: 370px;
          border: 1px solid rgba(244,204,120,.12);
          border-radius: 50%;
          pointer-events: none;
        }

        .placement-decoration-one {
          top: -230px;
          left: -100px;
        }

        .placement-decoration-two {
          bottom: -260px;
          right: -90px;
        }

        .placement-gold-label {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 9px;
          color: #f4ce7c;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 3px;
        }

        .placement-heading-line {
          width: 75px;
          height: 2px;
          margin: 20px auto 0;
          background: linear-gradient(90deg,transparent,#e9bd65,transparent);
        }

        .recruiter-marquee {
          position: relative;
          width: 100%;
          overflow: hidden;
          padding: 14px 0 20px;
          -webkit-mask-image: linear-gradient(to right,transparent,black 5%,black 95%,transparent);
          mask-image: linear-gradient(to right,transparent,black 5%,black 95%,transparent);
        }

        .recruiter-track {
          display: flex;
          width: max-content;
          gap: 22px;
          animation: recruiter-scroll 60s linear infinite;
          will-change: transform;
        }

        .recruiter-marquee:hover .recruiter-track,
        .recruiter-marquee:focus-within .recruiter-track {
          animation-play-state: paused;
        }

        .recruiter-card {
          width: 255px;
          height: 120px;
          flex-shrink: 0;
          display: flex;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          overflow: hidden;
          border-radius: 16px;
          border: 1px solid rgba(255,255,255,.75);
          background: #fff;
          box-shadow: 0 8px 22px rgba(0,0,0,.14);
          transition: transform .3s ease, box-shadow .3s ease;
        }

        .recruiter-card:hover {
          transform: translateY(-6px) scale(1.04);
          box-shadow: 0 15px 30px rgba(0,0,0,.22);
        }

        .recruiter-logo {
          display: block;
          width: 100%;
          height: 100%;
          object-fit: cover;
          user-select: none;
        }

        .recruiter-brand-name {
          padding: 0 12px;
          color: #4d1026;
          font-size: 20px;
          font-weight: 800;
          letter-spacing: -.5px;
          text-align: center;
        }

        .placement-cta {
          position: relative;
          overflow: hidden;
          background: linear-gradient(90deg,rgba(71,12,34,.97),rgba(120,24,54,.92));
        }

        .placement-cta-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 15px 27px;
          border-radius: 50px;
          background: linear-gradient(120deg,#f7dc9c,#e6b953);
          color: #591329;
          font-size: 14px;
          font-weight: 800;
          transition: all .3s ease;
        }

        .placement-cta-button:hover {
          transform: translateY(-3px);
          box-shadow: 0 12px 28px rgba(230,185,83,.25);
        }

        .placement-outline-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 10px;
          padding: 14px 27px;
          border: 1px solid rgba(255,255,255,.65);
          border-radius: 50px;
          color: white;
          font-size: 14px;
          font-weight: 700;
          transition: all .3s ease;
        }

        .placement-outline-button:hover {
          color: #f5d58b;
          border-color: #f5d58b;
          background: rgba(255,255,255,.07);
        }

        /* About, internship, training and programmes */

        .placement-details {
          background: #fffdf9;
        }

        .placement-detail-card {
          height: 100%;
          padding: 30px;
          border: 1px solid rgba(184,137,55,.25);
          border-radius: 20px;
          background: linear-gradient(145deg,#fff,#fffaf3);
          box-shadow: 0 6px 20px rgba(73,15,35,.05);
        }

        .placement-detail-heading {
          display: flex;
          align-items: center;
          gap: 16px;
          margin-bottom: 22px;
        }

        .placement-detail-heading .placement-icon,
        .placement-detail-heading .placement-step-icon {
          width: 52px;
          height: 52px;
        }

        .placement-check-list {
          display: grid;
          gap: 13px;
          margin: 0;
          padding: 0;
          list-style: none;
        }

        .placement-check-list li {
          display: flex;
          align-items: flex-start;
          gap: 11px;
          color: #4a3f44;
          font-size: 14px;
          line-height: 1.8;
        }

        .placement-check-list li svg {
          flex-shrink: 0;
          margin-top: 5px;
          color: #b98219;
        }

        .placement-paragraphs {
          display: grid;
          gap: 16px;
        }

        .placement-paragraphs p {
          margin: 0;
          color: #4a3f44;
          font-size: 14px;
          line-height: 1.9;
        }

        .placement-programmes {
          margin-top: 24px;
          padding: 32px;
          border: 1px solid rgba(216,181,76,.5);
          border-radius: 20px;
          background: linear-gradient(145deg,#791936,#4c1026);
          box-shadow: 0 14px 34px rgba(74,13,35,.18);
        }

        .placement-programme-grid {
          display: grid;
          grid-template-columns: repeat(3, minmax(0, 1fr));
          gap: 12px;
        }

        .placement-programme-item {
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 12px 15px;
          border: 1px solid rgba(245,205,119,.25);
          border-radius: 10px;
          background: rgba(255,255,255,.06);
          color: rgba(255,255,255,.95);
          font-size: 13px;
          transition: background .3s ease, border-color .3s ease;
        }

        .placement-programme-item:hover {
          border-color: rgba(245,205,119,.6);
          background: rgba(255,255,255,.12);
        }

        .placement-programme-item svg {
          flex-shrink: 0;
          color: #f3ca72;
        }

        @media(max-width:900px) {
          .placement-programme-grid {
            grid-template-columns: repeat(2, minmax(0, 1fr));
          }
        }

        @media(max-width:600px) {
          .placement-detail-card,
          .placement-programmes {
            padding: 22px 18px;
          }

          .placement-programme-grid {
            grid-template-columns: 1fr;
          }
        }

        @keyframes recruiter-scroll {
          from { transform: translateX(0); }
          to { transform: translateX(-50%); }
        }

        @media(max-width:768px) {
          .placement-recruiters {
            padding: 65px 0;
          }

          .recruiter-card {
            width: 204px;
            height: 96px;
          }

          .recruiter-brand-name {
            font-size: 17px;
          }

          .recruiter-track {
            gap: 14px;
            animation-duration: 45s;
          }

          .placement-step-card {
            min-height: auto;
          }

          [data-reveal="left"] {
            transform: translateX(-35px);
          }

          [data-reveal="right"] {
            transform: translateX(35px);
          }
        }

        @media(prefers-reduced-motion:reduce) {
          [data-reveal] {
            opacity: 1;
            transform: none;
            transition: none;
          }

          .recruiter-track {
            animation: none;
          }
        }
      `}</style>

      {/* HERO */}
      <PageHero
        eyebrow="YOUR CAREER. OUR COMMITMENT."
        title="Career & Placement Assistance"
        description="With an experienced team and extensive industry connections, we help you find the right opportunities to take your career to the next level."
        image="/facilites/placement.png"
        breadcrumb="Placement"
      />

      {/* PLACEMENT PROCESS */}
      <section className="placement-process section-pad">
        <div className="mx-auto max-w-7xl px-5 sm:px-8">
          <div className="mb-14 text-center" data-reveal="fade">
            <p className="eyebrow">THE JOURNEY</p>

            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Placement Process
            </h2>

            <div className="placement-heading-line" />

            <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-black">
              A structured journey that helps students build confidence,
              develop professional skills and prepare for recruitment.
            </p>
          </div>

          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {process.map((step, index) => {
              const Icon = step.icon;

              return (
                <div
                  key={step.number}
                  data-reveal={index % 2 === 0 ? 'right' : 'left'}
                  style={{ '--reveal-delay': `${index * 110}ms` } as React.CSSProperties}
                  className="placement-step-card"
                >
                  <div className="flex items-center justify-between">
                    <span className="placement-step-number">
                      STEP {step.number}
                    </span>

                    <div className="placement-step-icon">
                      <Icon size={27} strokeWidth={1.7} />
                    </div>
                  </div>

                  <h3 className="mt-7 font-serif text-xl font-bold text-white">
                    {step.title}
                  </h3>

                  <p className="mt-3 text-sm leading-7 text-white/75">
                    {step.text}
                  </p>

                  <div className="absolute bottom-0 left-6 right-6 h-px bg-gradient-to-r from-transparent via-gold/50 to-transparent" />
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* ABOUT, INTERNSHIP, TRAINING AND PROGRAMMES */}
      <PlacementDetailsSection />

      {/* TOP RECRUITERS */}
      <RecruitersSection />

      {/* CTA */}
      <section className="placement-cta py-20 sm:py-24">
        <div className="pointer-events-none absolute -right-24 -top-36 h-96 w-96 rounded-full border border-gold/20" />
        <div className="pointer-events-none absolute -left-36 bottom-0 h-96 w-96 rounded-full border border-gold/10" />

        <div
          className="relative mx-auto max-w-5xl px-5 text-center sm:px-8"
          data-reveal="up"
        >
          <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-2xl border border-gold/30 bg-white/10 text-gold">
            <TrendingUp size={34} strokeWidth={1.5} />
          </div>

          <p className="mt-6 text-xs font-bold tracking-[3px] text-gold">
            YOUR FUTURE STARTS HERE
          </p>

          <h2 className="mt-4 font-serif text-3xl font-bold text-ivory sm:text-4xl lg:text-5xl">
            Ready to Launch Your Career?
          </h2>

          <div className="placement-heading-line" />

          <p className="mx-auto mt-5 max-w-2xl text-sm leading-7 text-ivory/75 sm:text-base">
            Join a community of learners and achievers. Apply today and take
            the first step toward a rewarding engineering career.
          </p>

          <div className="mt-9 flex flex-wrap items-center justify-center gap-4">
            <button
              onClick={openModal}
              className="placement-cta-button"
            >
              Apply for Admission
              <ArrowRight size={18} />
            </button>

            <Link to="/academics" className="placement-outline-button">
              Explore Programs
              <ChevronRight size={18} />
            </Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-x-8 gap-y-3 text-xs text-white/65">
            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Career Guidance
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Industry Exposure
            </span>

            <span className="flex items-center gap-2">
              <CheckCircle2 size={15} className="text-gold" />
              Professional Development
            </span>
          </div>
        </div>
      </section>
    </div>
  );
}