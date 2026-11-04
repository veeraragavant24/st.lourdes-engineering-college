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
      'Relevant Bachelor\'s degree in Engineering / Technology for M.E. programs.',
      'Bachelor\'s degree in any discipline for M.B.A. program.',
      'As per Anna University PG admission norms and eligibility criteria.',
  ],
  },
];

export default function Admission() {
  const { openModal } = useAdmissionModal();

  return (
    <>
      <PageHero
        eyebrow="Admissions 2026–27"
        title="Admission to ST. Lourdes"
        description="Begin your engineering journey with a guided, transparent admission process designed to help you every step of the way."
        image="https://images.pexels.com/photos/8441786/pexels-photo-8441786.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="Admission"
      />

      {/* TNEA Code banner */}
      
      <section className="bg-gradient-to-br from-maroon-600 to-maroon-800 py-12">
        <div className="mx-auto max-w-7xl px-5 sm:px-8 lg:px-12">
          <div className="flex flex-col items-center justify-between gap-6 rounded-2xl border border-gold/30 bg-maroon-900/40 p-6 sm:p-8 md:flex-row">
            <div>
              <p className="eyebrow text-gold-100">TNEA Counselling Code</p>
              <p className="mt-2 font-serif text-4xl font-bold text-gold sm:text-5xl">{siteConfig.tneaCode}</p>
              <p className="mt-2 text-sm text-ivory/70">Use this code during TNEA counselling for B.E. / B.Tech. admissions.</p>
            </div>
            <button onClick={openModal} className="btn-gold shrink-0">
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </button>
          </div>
        </div>
      </section>

      {/* Admission Process */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">Step by Step</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              Admission Process
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-4">
            {steps.map((step, i) => {
              const Icon = step.icon;
              return (
                <div
                  key={step.title}
                  className="group relative rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <span className="absolute right-4 top-4 font-serif text-4xl font-bold text-gold/20">
                    {i + 1}
                  </span>
                  <div className="flex h-14 w-14 items-center justify-center rounded-full bg-maroon-50 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <h3 className="mt-5 font-serif text-lg font-bold text-maroon-700">{step.title}</h3>
                  <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{step.text}</p>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Eligibility Criteria */}
      <section id="eligibility" className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">Qualifications</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Eligibility Criteria
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="grid gap-8 md:grid-cols-2">
            {eligibility.map((cat) => (
              <div key={cat.level} className="rounded-2xl border border-gold/10 bg-white p-7 shadow-sm">
                <h3 className="font-serif text-xl font-bold text-maroon-700">{cat.level}</h3>
                <div className="mt-4 h-px w-12 bg-gold/30" />
                <ul className="mt-5 space-y-3">
                  {cat.points.map((point) => (
                    <li key={point} className="flex items-start gap-3 text-sm text-charcoal/70">
                      <CheckCircle2 className="mt-0.5 h-5 w-5 shrink-0 text-gold" strokeWidth={1.5} />
                      {point}
                    </li>
                  ))}
                </ul>
              </div>
            ))}
          </div>

          <div className="mt-8 flex items-start gap-3 rounded-xl border border-gold/20 bg-gold-50 p-5">
            <Info className="mt-0.5 h-5 w-5 shrink-0 text-gold-600" strokeWidth={1.5} />
            <p className="text-sm text-charcoal/70">
              Eligibility criteria are indicative and based on Anna University norms. Final criteria
              are subject to the university\'s official admission notification for the academic year.
            </p>
          </div>
        </div>
      </section>

      {/* Programs available for admission */}
      <section id="tnea" className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">Programs Available</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Programs for Admission
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>
          <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
            {programs.map((p) => (
              <Link
                key={p.id}
                to={`/programs#${p.slug}`}
                className="group flex items-center gap-4 rounded-xl border border-gold/10 bg-ivory p-5 shadow-sm transition-all duration-300 hover:border-gold/30 hover:shadow-md"
              >
                <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-full bg-maroon-50 text-maroon-600 transition-colors duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                  <Award className="h-6 w-6" strokeWidth={1.5} />
                </div>
                <div className="min-w-0 flex-1">
                  <p className="font-serif text-sm font-bold text-maroon-700 line-clamp-2">{p.name}</p>
                  <p className="mt-1 flex items-center gap-2 text-xs text-charcoal/50">
                    <CalendarDays className="h-3.5 w-3.5 text-gold" strokeWidth={1.5} />
                    {p.duration} &middot; {p.level}
                  </p>
                </div>
                <ArrowRight className="h-5 w-5 shrink-0 text-gold transition-transform duration-200 group-hover:translate-x-1" />
              </Link>
            ))}
          </div>
        </div>
      </section>

      {/* Enquiry CTA */}
      <section id="enquiry" className="section-pad bg-gradient-to-br from-maroon-700 to-maroon-900">
        <div className="mx-auto max-w-4xl px-5 text-center sm:px-8">
          <p className="eyebrow text-gold-100">Need Help?</p>
          <h2 className="mt-3 font-serif text-3xl font-bold text-ivory sm:text-4xl">
            Submit Your Admission Enquiry
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            Have questions about programs, eligibility, or the admission process? Our admissions
            team is here to guide you. Fill out the enquiry form and we'll get back to you.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button onClick={openModal} className="btn-gold">
              Open Enquiry Form
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/contact" className="btn-outline-gold">Contact Admissions</Link>
          </div>

          <div className="mt-10 flex flex-wrap items-center justify-center gap-6 text-ivory/70">
            <a href={`tel:${siteConfig.phones[0].replace(/\s/g, '')}`} className="flex items-center gap-2 text-sm hover:text-gold-100">
              <Phone className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {siteConfig.phones[0]}
            </a>
            <a href={`mailto:${siteConfig.emails[0]}`} className="flex items-center gap-2 text-sm hover:text-gold-100">
              <Mail className="h-4 w-4 text-gold" strokeWidth={1.5} />
              {siteConfig.emails[0]}
            </a>
          </div>
        </div>
      </section>

      <RecruitersSection />
    </>
  );
}
