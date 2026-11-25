import { Link } from 'react-router-dom';
import {
  ClipboardList,
  CheckCircle2,
  FileCheck,
  Phone,
  Mail,
  ArrowRight,
  Award,
  CalendarDays,
  Info,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/data/siteConfig';
import { programs } from '@/data/programs';
import { useAdmissionModal } from '@/components/AdmissionModalContext';
import RecruitersSection from '@/components/RecruitersSection';

/* =========================================================
   STYLES (internal CSS)
   ========================================================= */

function AdmissionStyles() {
  return (
    <style>{`
      .adm-page {
        --adm-maroon-50: #F9ECEF;
        --adm-maroon-600: #8A1F3D;
        --adm-maroon-700: #6E1832;
        --adm-maroon-800: #5C1328;
        --adm-maroon-900: #4A1022;
        --adm-maroon-900-rgb: 74, 16, 34;
        --adm-gold: #D8B54C;
        --adm-gold-rgb: 216, 181, 76;
        --adm-gold-50: #FBF5E1;
        --adm-gold-100: #F7EBC6;
        --adm-gold-600: #B8922F;
        --adm-ivory: #FBF9F5;
        --adm-ivory-rgb: 251, 249, 245;
        --adm-charcoal-rgb: 43, 43, 43;
      }

      .adm-page *,
      .adm-page *::before,
      .adm-page *::after {
        box-sizing: border-box;
      }

      /* ================= SHARED ================= */

      .adm-container {
        width: 100%;
        max-width: 80rem;
        margin-inline: auto;
        padding-inline: 20px;
      }

      .adm-container-narrow {
        width: 100%;
        max-width: 56rem;
        margin-inline: auto;
        padding-inline: 20px;
        text-align: center;
      }

      .adm-section-white { background: #fff; }
      .adm-section-ivory { background: var(--adm-ivory); }

      .adm-section-head {
        margin-bottom: 56px;
        text-align: center;
      }

      .adm-page .adm-eyebrow-light {
        color: var(--adm-gold-100);
      }

      .adm-h2 {
        margin: 12px 0 0;
        color: var(--adm-maroon-700);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 30px;
        font-weight: 700;
        line-height: 1.2;
      }

      .adm-h2-light {
        color: var(--adm-ivory);
      }

      .adm-divider {
        width: 80px;
        height: 1px;
        margin: 16px auto 0;
        background: linear-gradient(
          to right,
          transparent,
          var(--adm-gold),
          transparent
        );
      }

      .adm-icon-circle {
        display: flex;
        align-items: center;
        justify-content: center;
        flex-shrink: 0;
        border-radius: 50%;
        background: var(--adm-maroon-50);
        color: var(--adm-maroon-600);
        transition: background-color 300ms ease, color 300ms ease;
      }

      /* ================= TNEA BANNER ================= */

      .adm-banner {
        padding-block: 48px;
        background: linear-gradient(
          to bottom right,
          var(--adm-maroon-600),
          var(--adm-maroon-800)
        );
      }

      .adm-banner-card {
        display: flex;
        flex-direction: column;
        align-items: center;
        justify-content: space-between;
        gap: 24px;
        padding: 24px;
        border: 1px solid rgba(var(--adm-gold-rgb), .3);
        border-radius: 16px;
        background: rgba(var(--adm-maroon-900-rgb), .4);
      }

      .adm-banner-code {
        margin: 8px 0 0;
        color: var(--adm-gold);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1.1;
      }

      .adm-banner-note {
        margin: 8px 0 0;
        color: rgba(var(--adm-ivory-rgb), .7);
        font-size: 14px;
        line-height: 1.5;
      }

      .adm-banner-btn {
        flex-shrink: 0;
      }

      .adm-btn-icon {
        width: 16px;
        height: 16px;
      }

      /* ================= ADMISSION PROCESS ================= */

      .adm-steps-grid {
        display: grid;
        gap: 24px;
        grid-template-columns: 1fr;
      }

      .adm-step {
        position: relative;
        padding: 24px;
        border: 1px solid rgba(var(--adm-gold-rgb), .1);
        border-radius: 16px;
        background: var(--adm-ivory);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
        transition: transform 300ms ease, box-shadow 300ms ease;
      }

      .adm-step:hover {
        transform: translateY(-4px);
        box-shadow: 0 20px 25px -5px rgba(0, 0, 0, .1),
                    0 8px 10px -6px rgba(0, 0, 0, .1);
      }

      .adm-step-number {
        position: absolute;
        top: 16px;
        right: 16px;
        color: rgba(var(--adm-gold-rgb), .2);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 36px;
        font-weight: 700;
        line-height: 1;
      }

      .adm-step-icon {
        width: 56px;
        height: 56px;
      }

      .adm-step-icon svg {
        width: 28px;
        height: 28px;
      }

      .adm-step:hover .adm-step-icon {
        background: var(--adm-maroon-600);
        color: var(--adm-gold);
      }

      .adm-step-title {
        margin: 20px 0 0;
        color: var(--adm-maroon-700);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 14px;
        font-weight: 700;
      }

      .adm-step-text {
        margin: 8px 0 0;
        color: rgba(var(--adm-charcoal-rgb), .6);
        font-size: 14px;
        line-height: 1.625;
      }

      /* ================= ELIGIBILITY ================= */

      .adm-elig-grid {
        display: grid;
        gap: 32px;
        grid-template-columns: 1fr;
      }

      .adm-elig-card {
        padding: 28px;
        border: 1px solid rgba(var(--adm-gold-rgb), .1);
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      }

      .adm-elig-title {
        margin: 0;
        color: var(--adm-maroon-700);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 20px;
        font-weight: 700;
      }

      .adm-elig-rule {
        width: 48px;
        height: 1px;
        margin-top: 16px;
        background: rgba(var(--adm-gold-rgb), .3);
      }

      .adm-elig-list {
        display: flex;
        flex-direction: column;
        gap: 12px;
        margin: 20px 0 0;
        padding: 0;
        list-style: none;
      }

      .adm-elig-item {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        color: rgba(var(--adm-charcoal-rgb), .7);
        font-size: 14px;
        line-height: 1.5;
      }

      .adm-elig-item svg {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-top: 2px;
        color: var(--adm-gold);
      }

      .adm-note {
        display: flex;
        align-items: flex-start;
        gap: 12px;
        margin-top: 32px;
        padding: 20px;
        border: 1px solid rgba(var(--adm-gold-rgb), .2);
        border-radius: 12px;
        background: var(--adm-gold-50);
      }

      .adm-note svg {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        margin-top: 2px;
        color: var(--adm-gold-600);
      }

      .adm-note p {
        margin: 0;
        color: rgba(var(--adm-charcoal-rgb), .7);
        font-size: 14px;
        line-height: 1.5;
      }

      /* ================= PROGRAMS ================= */

      .adm-prog-grid {
        display: grid;
        gap: 20px;
        grid-template-columns: 1fr;
      }

      .adm-prog-card {
        display: flex;
        align-items: center;
        gap: 16px;
        padding: 20px;
        border: 1px solid rgba(var(--adm-gold-rgb), .1);
        border-radius: 12px;
        background: var(--adm-ivory);
        box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
        text-decoration: none;
        transition: border-color 300ms ease, box-shadow 300ms ease;
      }

      .adm-prog-card:hover {
        border-color: rgba(var(--adm-gold-rgb), .3);
        box-shadow: 0 4px 6px -1px rgba(0, 0, 0, .1),
                    0 2px 4px -2px rgba(0, 0, 0, .1);
      }

      .adm-prog-icon {
        width: 48px;
        height: 48px;
      }

      .adm-prog-icon svg {
        width: 24px;
        height: 24px;
      }

      .adm-prog-card:hover .adm-prog-icon {
        background: var(--adm-maroon-600);
        color: var(--adm-gold);
      }

      .adm-prog-body {
        flex: 1;
        min-width: 0;
      }

      .adm-prog-name {
        margin: 0;
        color: var(--adm-maroon-700);
        font-family: Georgia, 'Times New Roman', serif;
        font-size: 14px;
        font-weight: 700;
        line-height: 1.4;
        display: -webkit-box;
        -webkit-box-orient: vertical;
        -webkit-line-clamp: 2;
        line-clamp: 2;
        overflow: hidden;
      }

      .adm-prog-meta {
        display: flex;
        align-items: center;
        gap: 8px;
        margin: 4px 0 0;
        color: rgba(var(--adm-charcoal-rgb), .5);
        font-size: 12px;
      }

      .adm-prog-meta svg {
        width: 14px;
        height: 14px;
        color: var(--adm-gold);
      }

      .adm-prog-arrow {
        flex-shrink: 0;
        width: 20px;
        height: 20px;
        color: var(--adm-gold);
        transition: transform 200ms ease;
      }

      .adm-prog-card:hover .adm-prog-arrow {
        transform: translateX(4px);
      }

      /* ================= ENQUIRY CTA ================= */

      .adm-cta {
        background: linear-gradient(
          to bottom right,
          var(--adm-maroon-700),
          var(--adm-maroon-900)
        );
      }

      .adm-cta-text {
        max-width: 42rem;
        margin: 20px auto 0;
        color: rgba(var(--adm-ivory-rgb), .7);
        font-size: 16px;
        line-height: 1.625;
      }

      .adm-cta-actions {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 16px;
        margin-top: 32px;
      }

      .adm-cta-contacts {
        display: flex;
        flex-wrap: wrap;
        align-items: center;
        justify-content: center;
        gap: 24px;
        margin-top: 40px;
        color: rgba(var(--adm-ivory-rgb), .7);
      }

      .adm-cta-link {
        display: flex;
        align-items: center;
        gap: 8px;
        color: inherit;
        font-size: 14px;
        text-decoration: none;
        transition: color 200ms ease;
      }

      .adm-cta-link:hover {
        color: var(--adm-gold-100);
      }

      .adm-cta-link svg {
        width: 16px;
        height: 16px;
        color: var(--adm-gold);
      }

      /* ================= RESPONSIVE ================= */

      @media (min-width: 640px) {
        .adm-container,
        .adm-container-narrow { padding-inline: 32px; }

        .adm-banner-card { padding: 32px; }
        .adm-banner-code { font-size: 48px; line-height: 1; }

        .adm-h2 { font-size: 36px; line-height: 1.1; }

        .adm-prog-grid { grid-template-columns: repeat(2, 1fr); }
      }

      @media (min-width: 768px) {
        .adm-banner-card { flex-direction: row; }

        .adm-steps-grid { grid-template-columns: repeat(2, 1fr); }
        .adm-elig-grid { grid-template-columns: repeat(2, 1fr); }
      }

      @media (min-width: 1024px) {
        .adm-container { padding-inline: 48px; }

        .adm-h2-lg { font-size: 48px; line-height: 1; }

        .adm-steps-grid { grid-template-columns: repeat(4, 1fr); }
        .adm-prog-grid { grid-template-columns: repeat(3, 1fr); }
      }

      /* ================= ACCESSIBILITY ================= */

      @media (prefers-reduced-motion: reduce) {
        .adm-step,
        .adm-prog-card,
        .adm-prog-arrow,
        .adm-icon-circle,
        .adm-cta-link {
          transition: none;
        }

        .adm-step:hover,
        .adm-prog-card:hover .adm-prog-arrow {
          transform: none;
        }
      }
    `}</style>
  );
}

/* =========================================================
   DATA
   ========================================================= */

const steps = [
  {
    icon: ClipboardList,
    title: 'Submit Enquiry',
    text: 'Fill out the admission enquiry form or contact our admissions office to express your interest in a program.',
  },
  {
    icon: FileCheck,
    title: 'TNEA Counselling',
    text: `Admission to B.E./B.Tech. programs is through TNEA counselling (Anna University). Use our counselling code ${siteConfig.tneaCode}.`,
  },
  {
    icon: CheckCircle2,
    title: 'Document Verification',
    text: 'Submit and verify required documents including mark sheets, transfer certificate, community certificate, and photographs.',
  },
  {
    icon: Award,
    title: 'Confirm Admission',
    text: 'Complete fee payment and enrollment formalities to secure your seat and begin your academic journey.',
  },
];

const eligibility = [
  {
    level: 'B.E. / B.Tech. Programs',
    points: [
      'Pass in 10+2 (HSC) or equivalent with Mathematics, Physics, and Chemistry.',
      'Minimum aggregate as prescribed by Anna University for TNEA counselling.',
      'Valid TNEA registration with counselling code participation.',
    ],
  },
  {
    level: 'M.B.A. / M.E. Programs',
    points: [
      "Relevant Bachelor's degree in Engineering / Technology for M.E. programs.",
      "Bachelor's degree in any discipline for M.B.A. program.",
      'As per Anna University PG admission norms and eligibility criteria.',
    ],
  },
];

/* =========================================================
   PAGE
   ========================================================= */

export default function Admission() {
  const { openModal } = useAdmissionModal();


  console.log('ADMISSION FILE LOADED v2');   // <-- add this line

  

  return (
    <div className="adm-page">
      <AdmissionStyles />

      <PageHero
        eyebrow="Admissions 2026–27"
        title="Admission to ST. Lourdes"
        description="Begin your engineering journey with a guided, transparent admission process designed to help you every step of the way."
        image="/hero/slide23.png"
        breadcrumb="Admission"
      />

      {/* TNEA Code banner */}
      <section className="adm-banner">
        <div className="adm-container">
          <div className="adm-banner-card">
            <div>
              <p className="eyebrow adm-eyebrow-light">TNEA Counselling Code</p>
              <p className="adm-banner-code">{siteConfig.tneaCode}</p>
              <p className="adm-banner-note">
                Use this code during TNEA counselling for B.E. / B.Tech. admissions.
              </p>
            </div>
            <button onClick={openModal} className="btn-gold adm-banner-btn">
              Apply for Admission
              <ArrowRight className="adm-btn-icon" />
            </button>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-pad adm-section-white">
        <div className="adm-container">
          <div className="adm-section-head">
            <p className="eyebrow">Step by Step</p>
            <h2 className="adm-h2 adm-h2-lg">Admission Process</h2>
            <div className="adm-divider" />
          </div>

          <div className="adm-steps-grid">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div key={step.title} className="adm-step">
                  <span className="adm-step-number">{i + 1}</span>
                  <div className="adm-icon-circle adm-step-icon">
                    <Icon strokeWidth={1.5} />
                  </div>
                  <h3 className="adm-step-title">{step.title}</h3>
                  <p className="adm-step-text">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section id="eligibility" className="section-pad adm-section-ivory">
        <div className="adm-container">
          <div className="adm-section-head">
            <p className="eyebrow">Qualifications</p>
            <h2 className="adm-h2">Eligibility Criteria</h2>
            <div className="adm-divider" />
          </div>

          <div className="adm-elig-grid">
            {eligibility.map((cat) => (
              <div key={cat.level} className="adm-elig-card">
                <h3 className="adm-elig-title">{cat.level}</h3>
                <div className="adm-elig-rule" />
                <ul className="adm-elig-list">
                  {cat.points.map((point) => (
                    <li key={point} className="adm-elig-item">
                      <CheckCircle2 strokeWidth={1.5} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="adm-note">
            <Info strokeWidth={1.5} />
            <p>
              Eligibility criteria are indicative and based on Anna University norms. Final criteria
              are subject to the university's official admission notification for the academic year.
            </p>
          </div>
        </div>
      </section>

      {/* Programs available for admission */}
      <section id="tnea" className="section-pad adm-section-white">
        <div className="adm-container">
          <div className="adm-section-head">
            <p className="eyebrow">Programs Available</p>
            <h2 className="adm-h2">Programs for Admission</h2>
            <div className="adm-divider" />
          </div>

          <div className="adm-prog-grid">
            {programs.map((p) => (
<Link key={p.id} to={`/academics?programme#${p.slug}`} className="adm-prog-card">
                <div className="adm-icon-circle adm-prog-icon">
                  <Award strokeWidth={1.5} />
                </div>
                <div className="adm-prog-body">
                  <p className="adm-prog-name">{p.name}</p>
                  <p className="adm-prog-meta">
                    <CalendarDays strokeWidth={1.5} />
                    {p.duration} &middot; {p.level}
                  </p>
                </div>
                <ArrowRight className="adm-prog-arrow" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section id="enquiry" className="section-pad adm-cta">
        <div className="adm-container-narrow">
          <p className="eyebrow adm-eyebrow-light">Need Help?</p>
          <h2 className="adm-h2 adm-h2-light">Submit Your Admission Enquiry</h2>
          <div className="adm-divider" />
          <p className="adm-cta-text">
            Have questions about programs, eligibility, or the admission process? Our admissions
            team is here to guide you. Fill out the enquiry form and we'll get back to you.
          </p>

          <div className="adm-cta-actions">
            <button onClick={openModal} className="btn-gold">
              Open Enquiry Form
              <ArrowRight className="adm-btn-icon" />
            </button>
            <Link to="/contact" className="btn-outline-gold">
              Contact Admissions
            </Link>
          </div>

          <div className="adm-cta-contacts">
            <a
              href={`tel:${siteConfig.phones[0].replace(/\s/g, '')}`}
              className="adm-cta-link"
            >
              <Phone strokeWidth={1.5} />
              {siteConfig.phones[0]}
            </a>
            <a href={`mailto:${siteConfig.emails[0]}`} className="adm-cta-link">
              <Mail strokeWidth={1.5} />
              {siteConfig.emails[0]}
            </a>
          </div>
        </div>
      </section>

      <RecruitersSection />
    </div>
  );
}