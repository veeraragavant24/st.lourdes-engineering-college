import { Link } from 'react-router-dom';
import { ChevronRight } from 'lucide-react';

interface PageHeroProps {
  eyebrow: string;
  title: string;
  description?: string;
  image: string;
  breadcrumb: string;
}


/* =========================================================
   STYLES (internal CSS)
   ========================================================= */

function PageHeroStyles() {
  return (
    <style>{`
      .ph-hero {
        --ph-maroon-900-rgb: 74, 16, 34;
        --ph-gold-100: #F7EBC6;
        --ph-ivory: #FBF9F5;
        --ph-ivory-rgb: 251, 249, 245;

        position: relative;
        display: flex;
        align-items: flex-end;
        min-height: 50vh;
        padding-top: 80px;
        overflow: hidden;
      }

      .ph-hero *,
      .ph-hero *::before,
      .ph-hero *::after {
        box-sizing: border-box;
      }

      /* ================= BACKGROUND ================= */

      .ph-img {
        position: absolute;
        inset: 0;
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .ph-overlay-side {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to right,
          rgba(var(--ph-maroon-900-rgb), .9),
          rgba(var(--ph-maroon-900-rgb), .6),
          rgba(var(--ph-maroon-900-rgb), .3)
        );
      }

      .ph-overlay-bottom {
        position: absolute;
        inset: 0;
        background: linear-gradient(
          to top,
          rgba(var(--ph-maroon-900-rgb), .8),
          transparent
        );
      }

      /* ================= CONTENT ================= */

      .ph-inner {
        position: relative;
        z-index: 10;
        width: 100%;
        max-width: 80rem;
        margin-inline: auto;
        padding: 64px 20px;
      }

      .ph-hero .ph-eyebrow {
        color: var(--ph-gold-100);
      }
.ph-title {
  margin: 12px 0 0;
  color: var(--ph-ivory);
  font-family: 'Playfair Display', Georgia, 'Times New Roman', serif;
 font-size: clamp(28px, 4vw, 40px);
  font-weight: 700;
  line-height: 1.1;
}
      .ph-description {
        max-width: 42rem;
        margin: 16px 0 0;
        color: rgba(var(--ph-ivory-rgb), .7);
        font-size: 16px;
        line-height: 1.625;
      }

      /* ================= BREADCRUMB ================= */

      .ph-breadcrumb {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 24px;
        color: rgba(var(--ph-ivory-rgb), .5);
        font-size: 13px;
      }

      .ph-breadcrumb a {
        color: inherit;
        text-decoration: none;
        transition: color 150ms ease;
      }

      .ph-breadcrumb a:hover {
        color: var(--ph-gold-100);
      }

      .ph-breadcrumb svg {
        width: 16px;
        height: 16px;
      }

      .ph-breadcrumb .ph-current {
        color: var(--ph-gold-100);
      }

      /* ================= ENTRY ANIMATION ================= */

      @keyframes phFadeInUp {
        from {
          opacity: 0;
          transform: translate3d(0, 24px, 0);
        }

        to {
          opacity: 1;
          transform: translate3d(0, 0, 0);
        }
      }

      .ph-fade-in-up {
        animation: phFadeInUp 700ms ease-out both;
      }

      /* ================= RESPONSIVE ================= */
@media (min-width: 640px) {
  .ph-inner { padding-inline: 32px; }
  .ph-title { line-height: 1; }          /* font-size removed */
}

@media (min-width: 1024px) {
  .ph-inner { padding: 80px 48px; }
  /* .ph-title rule removed */
}

      /* ================= ACCESSIBILITY ================= */

      @media (prefers-reduced-motion: reduce) {
        .ph-fade-in-up {
          animation: none;
        }

        .ph-breadcrumb a {
          transition: none;
        }
      }
    `}</style>
  );
}

/* =========================================================
   COMPONENT
   ========================================================= */

export default function PageHero({
  eyebrow,
  title,
  description,
  image,
  breadcrumb,
}: PageHeroProps) {
  return (
    <section data-header-theme="dark" className="ph-hero">
      <PageHeroStyles />

      <img src={image} alt="" className="ph-img" />
      <div className="ph-overlay-side" />
      <div className="ph-overlay-bottom" />

      <div className="ph-inner">
        <p className="eyebrow ph-eyebrow ph-fade-in-up">{eyebrow}</p>

        <h1 className="ph-title ph-fade-in-up">{title}</h1>

        {description && (
          <p className="ph-description ph-fade-in-up">{description}</p>
        )}

        {/* Breadcrumb */}
        <nav className="ph-breadcrumb" aria-label="Breadcrumb">
          <Link to="/">Home</Link>
          <ChevronRight aria-hidden="true" />
          <span className="ph-current">{breadcrumb}</span>
        </nav>
      </div>
    </section>
  );
}