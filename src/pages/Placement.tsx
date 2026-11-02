import { Link } from 'react-router-dom';
import {
  Briefcase,
  Users,
  GraduationCap,
  Handshake,
  ArrowRight,
  TrendingUp,
  Target,
  Award,
  Calendar,
  Building2,
} from 'lucide-react';
import PageHero from '@/components/PageHero';
import RecruitersSection from '@/components/RecruitersSection';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

const features = [
  {
    icon: Briefcase,
    title: 'Placement Support',
    text: 'A dedicated placement cell coordinates campus recruitment drives, pre-placement training, and interview preparation for every eligible student.',
  },
  {
    icon: Users,
    title: 'Recruiting Companies',
    text: 'National and multinational organizations across IT, core engineering, and consulting visit our campus for recruitment each year.',
  },
  {
    icon: GraduationCap,
    title: 'Career Guidance',
    text: 'Mentorship programs, resume workshops, mock interviews, and soft-skills training prepare students to present themselves confidently.',
  },
  {
    icon: Handshake,
    title: 'Industry Collaboration',
    text: 'Internships, industrial visits, and guest lectures by industry leaders bridge the gap between academic learning and workplace expectations.',
  },
];

const process = [
  {
    icon: Target,
    title: 'Training & Preparation',
    text: 'Aptitude training, technical workshops, and communication-skills sessions begin well before placement season.',
  },
  {
    icon: Calendar,
    title: 'Campus Recruitment Drives',
    text: 'Companies conduct online and on-campus recruitment drives including written tests, group discussions, and interviews.',
  },
  {
    icon: Building2,
    title: 'Industry Internships',
    text: 'Students are encouraged to take up internships that provide real-world exposure and often lead to pre-placement offers.',
  },
  {
    icon: Award,
    title: 'Alumni Network',
    text: 'A growing alumni community provides mentorship, referrals, and industry connections to current students.',
  },
];

export default function Placement() {
  const { openModal } = useAdmissionModal();

  return (
    <>
      <PageHero
        eyebrow="Your Career. Our Commitment."
        title="Career & Placement Assistance"
        description="With an experienced team and extensive industry connections, we help you find the right opportunities to take your career to the next level."
        image="https://images.pexels.com/photos/39192317/pexels-photo-39192317.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="Placement"
      />

      {/* Feature cards */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">Comprehensive Support</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl lg:text-5xl">
              How We Support Your Career
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
            <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-charcoal/60">
              Our placement cell works year-round to connect students with opportunities that match
              their skills, interests, and aspirations.
            </p>
          </div>

          <div className="grid gap-6 md:grid-cols-2">
            {features.map((f) => {
              const Icon = f.icon;
              return (
                <div
                  key={f.title}
                  className="group flex gap-5 rounded-2xl border border-gold/10 bg-ivory p-7 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-xl"
                >
                  <div className="flex h-14 w-14 shrink-0 items-center justify-center rounded-xl bg-maroon-50 text-maroon-600 transition-all duration-300 group-hover:bg-maroon-600 group-hover:text-gold">
                    <Icon className="h-7 w-7" strokeWidth={1.5} />
                  </div>
                  <div>
                    <h3 className="font-serif text-xl font-bold text-maroon-700">{f.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{f.text}</p>
                  </div>
                </div>
              );
            })}
          </div>
        </div>
      </section>

      {/* Placement Process */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="mb-14 text-center">
            <p className="eyebrow">The Journey</p>
            <h2 className="mt-3 font-serif text-3xl font-bold text-maroon-700 sm:text-4xl">
              Placement Process
            </h2>
            <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          </div>

          <div className="relative">
            <div className="pointer-events-none absolute left-0 right-0 top-1/2 hidden h-px -translate-y-1/2 bg-gradient-to-r from-transparent via-gold/30 to-transparent lg:block" />
            <div className="grid gap-8 lg:grid-cols-4">
              {process.map((p, i) => {
                const Icon = p.icon;
                return (
                  <div key={p.title} className="relative text-center">
                    <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full border-2 border-gold/30 bg-white text-maroon-600 shadow-lg">
                      <Icon className="h-8 w-8" strokeWidth={1.5} />
                    </div>
                    <span className="mt-3 inline-block rounded-full bg-gold px-3 py-0.5 font-sans text-xs font-bold uppercase tracking-wider text-maroon-700">
                      Step {i + 1}
                    </span>
                    <h3 className="mt-3 font-serif text-lg font-bold text-maroon-700">{p.title}</h3>
                    <p className="mt-2 text-sm leading-relaxed text-charcoal/60">{p.text}</p>
                  </div>
                );
              })}
            </div>
          </div>
        </div>
      </section>

      {/* Recruiters */}
      <RecruitersSection />

      {/* CTA */}
      <section className="relative overflow-hidden bg-gradient-to-br from-maroon-700 via-maroon-800 to-maroon-900 py-20">
        <div className="pointer-events-none absolute -right-20 -top-20 h-72 w-72 rounded-full border border-gold/10" />
        <div className="pointer-events-none absolute -left-32 bottom-0 h-96 w-96 rounded-full border border-gold/5" />
        <div className="absolute inset-x-0 top-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />
        <div className="absolute inset-x-0 bottom-0 h-px bg-gradient-to-r from-transparent via-gold/40 to-transparent" />

        <div className="relative mx-auto max-w-4xl px-5 text-center sm:px-8">
          <TrendingUp className="mx-auto h-12 w-12 text-gold" strokeWidth={1.5} />
          <h2 className="mt-5 font-serif text-3xl font-bold text-ivory sm:text-4xl">
            Ready to Launch Your Career?
          </h2>
          <div className="mx-auto mt-4 h-px w-20 bg-gradient-to-r from-transparent via-gold to-transparent" />
          <p className="mx-auto mt-5 max-w-2xl text-base leading-relaxed text-ivory/70">
            Join a community of learners and achievers. Apply today and take the first step toward a
            rewarding engineering career.
          </p>
          <div className="mt-8 flex flex-wrap items-center justify-center gap-4">
            <button onClick={openModal} className="btn-gold">
              Apply for Admission
              <ArrowRight className="h-4 w-4" />
            </button>
            <Link to="/programs" className="btn-outline-gold">Explore Programs</Link>
          </div>
        </div>
      </section>
    </>
  );
}
