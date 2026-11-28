
import { Link } from 'react-router-dom';
import {
  ChevronRight,
  ArrowRight,
  GraduationCap,
  ShieldCheck,
  UtensilsCrossed,
  Wifi,
  BookOpen,
  Droplets,
  BedDouble,
  Heart,
  Coffee,
  Clock,
  Users,
  Building2,
  Sparkles,
} from 'lucide-react';

import { useAdmissionModal } from '@/components/AdmissionModalContext';

/* =========================================================
   HOSTEL PAGE STYLES
   ========================================================= */

function HostelStyles() {
  return (
    <style>{`
      .hst-page {
        --maroon: #5A1427;
        --maroon-dark: #3A0C19;
        --gold: #D4AF5A;
        --gold-light: #F0D88F;
        --cream: #FBF7F2;
        --ink: #2A1A1D;
        --muted: #756365;
        --line: #E8DCC8;
        --serif: 'Playfair Display', Georgia, serif;

        background: var(--cream);
        color: var(--ink);
        overflow: hidden;
      }

      .hst-page *,
      .hst-page *::before,
      .hst-page *::after {
        box-sizing: border-box;
      }

      .hst-wrap {
        width: 100%;
        max-width: 1200px;
        margin: auto;
        padding-inline: 24px;
      }

      .hst-section {
        padding-block: 85px;
      }

      /* ================= ANIMATIONS ================= */

      @keyframes hst-slide-left {
        from {
          opacity: 0;
          transform: translateX(-100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes hst-slide-right {
        from {
          opacity: 0;
          transform: translateX(100px);
        }
        to {
          opacity: 1;
          transform: translateX(0);
        }
      }

      @keyframes hst-fade-up {
        from {
          opacity: 0;
          transform: translateY(35px);
        }
        to {
          opacity: 1;
          transform: translateY(0);
        }
      }

      @keyframes hst-hero-image {
        from {
          opacity: 0;
          transform: scale(1.08);
        }
        to {
          opacity: 1;
          transform: scale(1);
        }
      }

      .hst-fade-up {
        animation: hst-fade-up .85s ease both;
      }

      .hst-slide-left {
        animation: hst-slide-left 1s cubic-bezier(.2,.7,.2,1) both;
      }

      .hst-slide-right {
        animation: hst-slide-right 1s cubic-bezier(.2,.7,.2,1) both;
      }

      .hst-delay-1 { animation-delay: .15s; }
      .hst-delay-2 { animation-delay: .3s; }
      .hst-delay-3 { animation-delay: .45s; }

      /* ================= COMMON HEADINGS ================= */

      .hst-eyebrow {
        color: #98752E;
        font-size: 12px;
        font-weight: 800;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .hst-heading {
        margin-top: 12px;
        color: var(--maroon);
        font-family: var(--serif);
        font-size: 38px;
        font-weight: 700;
        line-height: 1.2;
      }

      .hst-description {
        max-width: 700px;
        margin: 16px auto 0;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.9;
      }

      .hst-section-head {
        margin: 0 auto 50px;
        max-width: 750px;
        text-align: center;
      }

      /* ================= BUTTONS ================= */

      .hst-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 10px;
        padding: 15px 28px;
        border-radius: 50px;
        border: 1px solid transparent;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        transition: all .3s ease;
      }

      .hst-btn:hover {
        transform: translateY(-4px);
      }

      .hst-btn-gold {
        background: var(--gold);
        color: var(--maroon-dark);
      }

      .hst-btn-gold:hover {
        background: #fff;
      }

      .hst-btn-outline {
        border-color: var(--gold);
        color: #fff;
      }

      .hst-btn-outline:hover {
        background: var(--gold);
        color: var(--maroon-dark);
      }

      /* ================= HERO ================= */

      .hst-hero {
        position: relative;
        padding: 145px 0 75px;
        background: var(--maroon-dark);
        color: white;
        overflow: hidden;
      }

      .hst-hero::before {
        content: '';
        position: absolute;
        width: 450px;
        height: 450px;
        top: -200px;
        right: -100px;
        border: 1px solid rgba(212,175,90,.2);
        border-radius: 50%;
        box-shadow:
          0 0 0 45px rgba(212,175,90,.04),
          0 0 0 90px rgba(212,175,90,.03);
      }

      .hst-hero-grid {
        position: relative;
        display: grid;
        grid-template-columns: 1.05fr .95fr;
        gap: 55px;
        align-items: center;
      }

      .hst-hero .hst-eyebrow {
        color: var(--gold-light);
      }

      .hst-hero-title {
        margin-top: 20px;
        font-family: var(--serif);
        font-size: clamp(38px, 5vw, 60px);
        font-weight: 700;
        line-height: 1.12;
      }

      .hst-hero-title span {
        color: var(--gold);
      }

      .hst-hero-text {
        max-width: 550px;
        margin-top: 22px;
        color: #E9D9DA;
        font-size: 16px;
        line-height: 1.9;
      }

      .hst-hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 32px;
      }

      .hst-hero-image {
        height: 390px;
        overflow: hidden;
        border: 2px solid var(--gold);
        border-radius: 24px;
        animation: hst-hero-image 1.2s ease both;
        box-shadow: 0 25px 60px rgba(0,0,0,.3);
      }

      .hst-hero-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .7s ease;
      }

      .hst-hero-image:hover img {
        transform: scale(1.06);
      }

      .hst-breadcrumb {
        position: relative;
        display: flex;
        align-items: center;
        gap: 9px;
        margin-top: 45px;
        color: rgba(255,255,255,.65);
        font-size: 13px;
      }

      .hst-breadcrumb a {
        color: inherit;
        text-decoration: none;
      }

      .hst-breadcrumb span {
        color: var(--gold);
      }

      /* ================= OVERVIEW ================= */

      .hst-overview {
        background: white;
      }

      .hst-overview-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 25px;
      }

      .hst-overview-card {
        padding: 32px 25px;
        border: 1px solid var(--line);
        border-radius: 18px;
        background: var(--cream);
        text-align: center;
        transition: all .35s ease;
      }

      .hst-overview-card:hover {
        transform: translateY(-10px);
        box-shadow: 0 18px 40px rgba(58,12,25,.12);
        border-color: var(--gold);
      }

      .hst-overview-icon {
        display: flex;
        width: 65px;
        height: 65px;
        align-items: center;
        justify-content: center;
        margin: 0 auto 20px;
        border-radius: 18px;
        background: var(--maroon);
        color: var(--gold);
        transition: all .3s ease;
      }

      .hst-overview-card:hover .hst-overview-icon {
        transform: rotate(-8deg) scale(1.1);
        background: var(--gold);
        color: var(--maroon);
      }

      .hst-overview-card h3 {
        color: var(--maroon);
        font-family: var(--serif);
        font-size: 21px;
      }

      .hst-overview-card p {
        margin-top: 12px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.8;
      }

      /* ================= BOYS AND GIRLS HOSTEL ================= */

      .hst-hostels {
        background: var(--cream);
      }

      .hst-hostel-grid {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 35px;
      }

      .hst-hostel-card {
        overflow: hidden;
        border: 1px solid var(--line);
        border-radius: 22px;
        background: white;
        box-shadow: 0 8px 25px rgba(58,12,25,.06);
        transition:
          transform .4s ease,
          box-shadow .4s ease,
          border-color .4s ease;
      }

      .hst-hostel-card:hover {
        transform: translateY(-12px);
        border-color: var(--gold);
        box-shadow: 0 25px 50px rgba(58,12,25,.15);
      }

      .hst-hostel-image {
        height: 270px;
        overflow: hidden;
      }

      .hst-hostel-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .7s ease;
      }

      .hst-hostel-card:hover .hst-hostel-image img {
        transform: scale(1.08);
      }

      .hst-hostel-content {
        padding: 30px;
      }

      .hst-hostel-label {
        color: #98752E;
        font-size: 11px;
        font-weight: 800;
        letter-spacing: .18em;
        text-transform: uppercase;
      }

      .hst-hostel-title {
        margin-top: 10px;
        color: var(--maroon);
        font-family: var(--serif);
        font-size: 29px;
        font-weight: 700;
      }

      .hst-hostel-description {
        margin-top: 15px;
        color: var(--muted);
        font-size: 14px;
        line-height: 1.9;
      }

      .hst-facility-list {
        display: grid;
        grid-template-columns: repeat(2, 1fr);
        gap: 15px;
        margin-top: 25px;
        padding-top: 23px;
        border-top: 1px solid var(--line);
      }

      .hst-facility-item {
        display: flex;
        align-items: flex-start;
        gap: 10px;
        color: var(--ink);
        font-size: 13px;
        line-height: 1.6;
      }

      .hst-facility-item svg {
        flex-shrink: 0;
        color: #98752E;
        margin-top: 2px;
      }

      /* ================= MESS AND DINING ================= */

      .hst-dining {
        background: white;
      }

      .hst-dining-grid {
        display: grid;
        grid-template-columns: 1fr 1fr;
        gap: 50px;
        align-items: center;
      }

      .hst-dining-image {
        height: 430px;
        overflow: hidden;
        border-radius: 22px;
        box-shadow: 0 15px 40px rgba(58,12,25,.12);
      }

      .hst-dining-image img {
        width: 100%;
        height: 100%;
        object-fit: cover;
        transition: transform .6s ease;
      }

      .hst-dining-image:hover img {
        transform: scale(1.06);
      }

      .hst-dining-content h2 {
        margin-top: 12px;
        color: var(--maroon);
        font-family: var(--serif);
        font-size: 38px;
        line-height: 1.2;
      }

      .hst-dining-content > p {
        margin-top: 18px;
        color: var(--muted);
        font-size: 15px;
        line-height: 1.9;
      }

      .hst-dining-points {
        display: grid;
        gap: 19px;
        margin-top: 28px;
      }

      .hst-dining-point {
        display: flex;
        gap: 15px;
        align-items: flex-start;
        padding: 15px;
        border-radius: 13px;
        background: var(--cream);
        transition: all .3s ease;
      }

      .hst-dining-point:hover {
        transform: translateX(8px);
        background: #F5EBD8;
      }

      .hst-dining-point-icon {
        display: flex;
        width: 43px;
        height: 43px;
        flex-shrink: 0;
        align-items: center;
        justify-content: center;
        border-radius: 12px;
        background: var(--maroon);
        color: var(--gold);
      }

      .hst-dining-point h4 {
        color: var(--maroon);
        font-size: 15px;
        font-weight: 700;
      }

      .hst-dining-point p {
        margin-top: 5px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.7;
      }

      /* ================= COMMON FACILITIES ================= */

      .hst-facilities {
        background: var(--cream);
      }

      .hst-facility-grid {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 22px;
      }

      .hst-facility-card {
        padding: 30px 25px;
        border: 1px solid var(--line);
        border-radius: 17px;
        background: white;
        transition: all .35s ease;
      }

      .hst-facility-card:hover {
        transform: translateY(-9px);
        border-color: var(--gold);
        box-shadow: 0 18px 35px rgba(58,12,25,.11);
      }

      .hst-facility-card .hst-icon {
        display: flex;
        width: 55px;
        height: 55px;
        align-items: center;
        justify-content: center;
        border-radius: 15px;
        background: var(--maroon);
        color: var(--gold);
        transition: all .35s ease;
      }

      .hst-facility-card:hover .hst-icon {
        transform: rotate(8deg) scale(1.1);
        background: var(--gold);
        color: var(--maroon);
      }

      .hst-facility-card h3 {
        margin-top: 20px;
        color: var(--maroon);
        font-family: var(--serif);
        font-size: 20px;
      }

      .hst-facility-card p {
        margin-top: 10px;
        color: var(--muted);
        font-size: 13px;
        line-height: 1.8;
      }

      /* ================= CTA ================= */

      .hst-cta {
        padding: 75px 20px;
        background: var(--gold);
        text-align: center;
      }

      .hst-cta h2 {
        color: var(--maroon-dark);
        font-family: var(--serif);
        font-size: 38px;
        font-weight: 700;
      }

      .hst-cta p {
        max-width: 650px;
        margin: 16px auto 28px;
        color: #56321C;
        font-size: 15px;
        line-height: 1.8;
      }

      .hst-cta .hst-btn {
        background: var(--maroon-dark);
        color: white;
      }

      .hst-cta .hst-btn:hover {
        background: white;
        color: var(--maroon-dark);
      }

      /* ================= RESPONSIVE ================= */

      @media (max-width: 900px) {
        .hst-hero-grid,
        .hst-dining-grid {
          grid-template-columns: 1fr;
        }

        .hst-hero-image {
          height: 350px;
        }

        .hst-hostel-grid {
          gap: 20px;
        }

        .hst-overview-grid,
        .hst-facility-grid {
          grid-template-columns: repeat(2, 1fr);
        }
      }

      @media (max-width: 600px) {
        .hst-section {
          padding-block: 60px;
        }

        .hst-wrap {
          padding-inline: 19px;
        }

        .hst-hero {
          padding-top: 115px;
        }

        .hst-hero-grid {
          gap: 35px;
        }

        .hst-hero-title {
          font-size: 39px;
        }

        .hst-hero-image {
          height: 260px;
        }

        .hst-heading {
          font-size: 30px;
        }

        .hst-overview-grid,
        .hst-hostel-grid,
        .hst-facility-grid {
          grid-template-columns: 1fr;
        }

        .hst-hostel-image {
          height: 230px;
        }

        .hst-hostel-content {
          padding: 23px;
        }

        .hst-hostel-title {
          font-size: 25px;
        }

        .hst-facility-list {
          grid-template-columns: 1fr;
        }

        .hst-dining-image {
          height: 270px;
        }

        .hst-dining-content h2 {
          font-size: 31px;
        }

        .hst-cta h2 {
          font-size: 30px;
        }

        .hst-btn {
          padding: 13px 20px;
        }
      }

      @media (prefers-reduced-motion: reduce) {
        .hst-page *,
        .hst-page *::before,
        .hst-page *::after {
          animation: none !important;
          transition: none !important;
          scroll-behavior: auto !important;
        }
      }
    `}</style>
  );
}

/* =========================================================
   REUSABLE FACILITY CARD
   ========================================================= */

function FacilityCard({
  icon: Icon,
  title,
  description,
}: {
  icon: React.ElementType;
  title: string;
  description: string;
}) {
  return (
    <article className="hst-facility-card">
      <div className="hst-icon">
        <Icon size={25} />
      </div>

      <h3>{title}</h3>
      <p>{description}</p>
    </article>
  );
}

/* =========================================================
   HOSTEL PAGE
   ========================================================= */

export default function Hostel() {
  const { openModal } = useAdmissionModal();

  return (
    <main className="hst-page">
      <HostelStyles />

      {/* HERO SECTION */}

      <section data-header-theme="dark" className="hst-hero">
        <div className="hst-wrap">
          <div className="hst-hero-grid">

            <div className="hst-fade-up">
              <p className="hst-eyebrow">
                Residential Life · 2026–27
              </p>

              <h1 className="hst-hero-title">
                A Place to Stay,
                <br />
                <span>A Place to Grow.</span>
              </h1>

              <p className="hst-hero-text">
                Experience a comfortable and supportive residential
                environment at St. Lourdes Engineering College.
                Our separate boys and girls hostels provide students
                with a welcoming atmosphere, essential facilities
                and a peaceful place to live and learn.
              </p>

              <div className="hst-hero-actions">
                <a href="#hostels" className="hst-btn hst-btn-gold">
                  Explore Hostels
                  <ArrowRight size={17} />
                </a>

                <a href="#dining" className="hst-btn hst-btn-outline">
                  Mess & Dining
                </a>
              </div>
            </div>

            <div className="hst-hero-image">
              <img
                src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1200&q=85"
                alt="Comfortable student accommodation"
              />
            </div>

          </div>

          <nav className="hst-breadcrumb" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight size={15} />
            <span>Hostel</span>
          </nav>
        </div>
      </section>

      {/* HOSTEL OVERVIEW */}

      <section className="hst-section hst-overview">
        <div className="hst-wrap">

          <div className="hst-section-head hst-fade-up">
            <p className="hst-eyebrow">Welcome to Campus Living</p>

            <h2 className="hst-heading">
              Comfortable Living, Better Learning
            </h2>

            <p className="hst-description">
              Our hostel facilities are designed to provide students
              with a safe, comfortable and disciplined residential
              environment. We focus on creating a home-like atmosphere
              that supports academic success, personal development
              and meaningful friendships.
            </p>
          </div>

          <div className="hst-overview-grid">

            <article className="hst-overview-card hst-fade-up hst-delay-1">
              <div className="hst-overview-icon">
                <ShieldCheck size={30} />
              </div>
              <h3>Safe Environment</h3>
              <p>
                A supervised residential atmosphere with appropriate
                security and student care arrangements.
              </p>
            </article>

            <article className="hst-overview-card hst-fade-up hst-delay-2">
              <div className="hst-overview-icon">
                <Heart size={30} />
              </div>
              <h3>Home-like Comfort</h3>
              <p>
                A welcoming living environment that helps students
                feel comfortable and connected.
              </p>
            </article>

            <article className="hst-overview-card hst-fade-up hst-delay-3">
              <div className="hst-overview-icon">
                <GraduationCap size={30} />
              </div>
              <h3>Academic Support</h3>
              <p>
                A peaceful atmosphere that encourages concentration,
                learning and personal growth.
              </p>
            </article>

          </div>
        </div>
      </section>

      {/* BOYS AND GIRLS HOSTEL */}

      <section id="hostels" className="hst-section hst-hostels">
        <div className="hst-wrap">

          <div className="hst-section-head hst-fade-up">
            <p className="hst-eyebrow">Our Residential Facilities</p>

            <h2 className="hst-heading">
              Separate Hostels for Boys & Girls
            </h2>

            <p className="hst-description">
              We provide separate residential facilities for boys
              and girls, with essential amenities and a comfortable
              atmosphere designed to support student well-being.
            </p>
          </div>

          <div className="hst-hostel-grid">

            {/* BOYS HOSTEL */}

            <article className="hst-hostel-card hst-slide-left">
              <div className="hst-hostel-image">
                <img
                  src="https://images.unsplash.com/photo-1555854877-bab0e564b8d5?auto=format&fit=crop&w=1000&q=85"
                  alt="Boys hostel accommodation"
                  loading="lazy"
                />
              </div>

              <div className="hst-hostel-content">
                <p className="hst-hostel-label">
                  Residential Facility
                </p>

                <h3 className="hst-hostel-title">
                  Boys Hostel
                </h3>

                <p className="hst-hostel-description">
                  The boys hostel provides a comfortable and
                  student-friendly residential environment.
                  It is designed to support students in balancing
                  their academic responsibilities and daily life
                  through convenient accommodation and essential
                  residential facilities.
                </p>

                <div className="hst-facility-list">
                  <div className="hst-facility-item">
                    <BedDouble size={18} />
                    Comfortable accommodation
                  </div>

                  <div className="hst-facility-item">
                    <ShieldCheck size={18} />
                    Supervised environment
                  </div>

                  <div className="hst-facility-item">
                    <BookOpen size={18} />
                    Study-friendly atmosphere
                  </div>

                  <div className="hst-facility-item">
                    <UtensilsCrossed size={18} />
                    Mess and dining facilities
                  </div>

                  <div className="hst-facility-item">
                    <Droplets size={18} />
                    Drinking water facilities
                  </div>

                  <div className="hst-facility-item">
                    <Wifi size={18} />
                    Connectivity facilities
                  </div>
                </div>
              </div>
            </article>

            {/* GIRLS HOSTEL */}

            <article className="hst-hostel-card hst-slide-right hst-delay-1">
              <div className="hst-hostel-image">
                <img
                  src="https://images.unsplash.com/photo-1611892440504-42a792e24d32?auto=format&fit=crop&w=1000&q=85"
                  alt="Girls hostel accommodation"
                  loading="lazy"
                />
              </div>

              <div className="hst-hostel-content">
                <p className="hst-hostel-label">
                  Residential Facility
                </p>

                <h3 className="hst-hostel-title">
                  Girls Hostel
                </h3>

                <p className="hst-hostel-description">
                  The girls hostel offers a comfortable and
                  supportive residential atmosphere where students
                  can focus on their education and personal growth.
                  Dedicated residential arrangements and appropriate
                  supervision help create a secure and welcoming
                  living environment.
                </p>

                <div className="hst-facility-list">
                  <div className="hst-facility-item">
                    <BedDouble size={18} />
                    Comfortable accommodation
                  </div>

                  <div className="hst-facility-item">
                    <ShieldCheck size={18} />
                    Security and supervision
                  </div>

                  <div className="hst-facility-item">
                    <BookOpen size={18} />
                    Peaceful study environment
                  </div>

                  <div className="hst-facility-item">
                    <UtensilsCrossed size={18} />
                    Mess and dining facilities
                  </div>

                  <div className="hst-facility-item">
                    <Droplets size={18} />
                    Drinking water facilities
                  </div>

                  <div className="hst-facility-item">
                    <Wifi size={18} />
                    Connectivity facilities
                  </div>
                </div>
              </div>
            </article>

          </div>
        </div>
      </section>

      {/* MESS AND DINING */}

      <section id="dining" className="hst-section hst-dining">
        <div className="hst-wrap">

          <div className="hst-dining-grid">

            <div className="hst-dining-image hst-slide-left">
              <img
                src="https://images.unsplash.com/photo-1555939594-58d7cb561ad1?auto=format&fit=crop&w=1200&q=85"
                alt="Freshly prepared food and dining"
                loading="lazy"
              />
            </div>

            <div className="hst-dining-content hst-fade-up">
              <p className="hst-eyebrow">Healthy Residential Living</p>

              <h2>
                Mess & Dining
                <br />
                <span>Facilities</span>
              </h2>

              <p>
                Our hostel dining facilities aim to provide students
                with a comfortable and hygienic place to enjoy their
                daily meals. Food arrangements are designed with
                attention to cleanliness, quality and the everyday
                nutritional needs of students.
              </p>

              <p>
                A well-maintained dining environment encourages
                healthy eating habits and provides students with
                an opportunity to enjoy their meals together.
              </p>

              <div className="hst-dining-points">

                <div className="hst-dining-point">
                  <div className="hst-dining-point-icon">
                    <UtensilsCrossed size={21} />
                  </div>
                  <div>
                    <h4>Nutritious Food</h4>
                    <p>
                      Food arrangements focused on balanced and
                      satisfying everyday meals.
                    </p>
                  </div>
                </div>

                <div className="hst-dining-point">
                  <div className="hst-dining-point-icon">
                    <Sparkles size={21} />
                  </div>
                  <div>
                    <h4>Clean Dining Environment</h4>
                    <p>
                      Emphasis on cleanliness and proper dining
                      area maintenance.
                    </p>
                  </div>
                </div>

                <div className="hst-dining-point">
                  <div className="hst-dining-point-icon">
                    <Coffee size={21} />
                  </div>
                  <div>
                    <h4>Daily Meal Arrangements</h4>
                    <p>
                      Dining arrangements to support students
                      throughout their residential routine.
                    </p>
                  </div>
                </div>

                <div className="hst-dining-point">
                  <div className="hst-dining-point-icon">
                    <Users size={21} />
                  </div>
                  <div>
                    <h4>Comfortable Dining Space</h4>
                    <p>
                      A welcoming place for students to enjoy
                      their meals together.
                    </p>
                  </div>
                </div>

              </div>
            </div>

          </div>
        </div>
      </section>

      {/* COMMON FACILITIES */}

      <section className="hst-section hst-facilities">
        <div className="hst-wrap">

          <div className="hst-section-head hst-fade-up">
            <p className="hst-eyebrow">More Than Accommodation</p>

            <h2 className="hst-heading">
              Hostel Facilities & Amenities
            </h2>

            <p className="hst-description">
              Essential amenities and supportive facilities
              contribute to a convenient and comfortable
              residential experience for students.
            </p>
          </div>

          <div className="hst-facility-grid">

            <FacilityCard
              icon={ShieldCheck}
              title="Safety & Security"
              description="A supervised residential environment with appropriate safety and security arrangements."
            />

            <FacilityCard
              icon={Wifi}
              title="Connectivity"
              description="Connectivity facilities to support students' academic and communication needs."
            />

            <FacilityCard
              icon={BookOpen}
              title="Study Environment"
              description="A peaceful atmosphere that encourages academic focus and independent learning."
            />

            <FacilityCard
              icon={Droplets}
              title="Drinking Water"
              description="Drinking water arrangements to support students' everyday needs."
            />

            <FacilityCard
              icon={UtensilsCrossed}
              title="Dining Facilities"
              description="Convenient dining arrangements with an emphasis on hygiene and food quality."
            />

            <FacilityCard
              icon={Heart}
              title="Student Well-being"
              description="A supportive residential atmosphere that encourages comfort, care and community."
            />

          </div>
        </div>
      </section>

      {/* CALL TO ACTION */}

      <section className="hst-cta">
        <div className="hst-wrap hst-fade-up">

          <p className="hst-eyebrow">
            Begin Your Campus Journey
          </p>

          <h2>
            Make Our Hostel Your Second Home
          </h2>

          <p>
            Enjoy a comfortable residential experience while
            focusing on your education, building friendships
            and creating memorable college experiences.
          </p>

          <button
            type="button"
            onClick={openModal}
            className="hst-btn"
          >
            Apply for Admission
            <ArrowRight size={18} />
          </button>

        </div>
      </section>

    </main>
  );
}
