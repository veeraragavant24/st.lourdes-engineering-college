import { Link } from 'react-router-dom';
import { ChevronRight, ArrowRight } from 'lucide-react';
import { hostelData, type HostelBlock } from '@/data/hostel';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

/* =========================================================
   STYLES (internal CSS)
   ========================================================= */

function HostelStyles() {
  return (
    <style>{`
      .hst-page {
        --hst-maroon-700: #5A1427;
        --hst-maroon-900: #3A0C19;
        --hst-maroon-900-rgb: 58, 12, 25;
        --hst-gold: #D4AF5A;
        --hst-gold-100: #F0D88F;
        --hst-gold-700: #8A6A24;
        --hst-cream: #FBF7F2;
        --hst-line: #E8DCC8;
        --hst-muted: #6D5A58;
        --hst-ink: #2A1A1D;
        --hst-serif: 'Playfair Display', Georgia, 'Times New Roman', serif;

        background: var(--hst-cream);
        color: var(--hst-ink);
      }

      .hst-page *,
      .hst-page *::before,
      .hst-page *::after { box-sizing: border-box; }

      /* ================= SHARED ================= */

      .hst-wrap {
        width: 100%;
        max-width: 75rem;
        margin-inline: auto;
        padding-inline: 20px;
      }

      .hst-section { padding-block: 56px; }

      .hst-head {
        max-width: 40rem;
        margin: 0 auto 44px;
        text-align: center;
      }

      .hst-eyebrow {
        margin: 0;
        color: var(--hst-gold-700);
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .22em;
        text-transform: uppercase;
      }

      .hst-h2 {
        margin: 10px 0 0;
        color: var(--hst-maroon-700);
        font-family: var(--hst-serif);
        font-size: 30px;
        font-weight: 700;
        line-height: 1.15;
      }

      .hst-sub {
        margin: 14px 0 0;
        color: var(--hst-muted);
        font-size: 15px;
        line-height: 1.7;
      }

      .hst-grid2 {
        display: grid;
        gap: 28px;
        grid-template-columns: 1fr;
      }

      .hst-btn {
        display: inline-flex;
        align-items: center;
        justify-content: center;
        gap: 8px;
        padding: 14px 28px;
        border-radius: 999px;
        font-size: 14px;
        font-weight: 700;
        text-decoration: none;
        cursor: pointer;
        border: 1.5px solid transparent;
        transition: transform 250ms ease, background-color 250ms ease, color 250ms ease;
      }

      .hst-btn:hover { transform: translateY(-2px); }
      .hst-btn svg { width: 16px; height: 16px; }

      .hst-btn-gold { background: var(--hst-gold); color: #2B0710; }
      .hst-btn-gold:hover { background: #fff; }

      .hst-btn-outline { border-color: var(--hst-gold); color: var(--hst-gold-100); background: transparent; }
      .hst-btn-outline:hover { background: var(--hst-gold); color: #2B0710; }

      .hst-btn-maroon { background: var(--hst-maroon-700); color: #fff; }

      /* ================= HERO ================= */

      .hst-hero {
        position: relative;
        padding: 130px 0 70px;
        background: var(--hst-maroon-900);
        color: var(--hst-cream);
        overflow: hidden;
      }

      .hst-hero-grid {
        display: grid;
        gap: 40px;
        align-items: center;
        grid-template-columns: 1fr;
      }

      .hst-hero .hst-eyebrow { color: var(--hst-gold-100); }

      .hst-hero-title {
        margin: 16px 0 0;
        font-family: var(--hst-serif);
        font-size: 36px;
        font-weight: 700;
        line-height: 1.1;
      }

      .hst-hero-text {
        max-width: 32rem;
        margin: 20px 0 0;
        color: #E9D9DA;
        font-size: 16px;
        line-height: 1.7;
      }

      .hst-hero-actions {
        display: flex;
        flex-wrap: wrap;
        gap: 14px;
        margin-top: 32px;
      }

      .hst-hero-media {
        height: 280px;
        border: 1.5px solid var(--hst-gold);
        border-radius: 18px;
        overflow: hidden;
        display: flex;
        align-items: center;
        justify-content: center;
        color: var(--hst-gold-100);
        font-size: 13px;
        letter-spacing: .1em;
        text-transform: uppercase;
        background: #4A1424;
      }

      .hst-hero-media img {
        width: 100%;
        height: 100%;
        object-fit: cover;
      }

      .hst-crumbs {
        display: flex;
        align-items: center;
        gap: 8px;
        margin-top: 36px;
        color: rgba(251, 247, 242, .55);
        font-size: 14px;
      }

      .hst-crumbs a { color: inherit; text-decoration: none; }
      .hst-crumbs a:hover { color: var(--hst-gold-100); }
      .hst-crumbs svg { width: 16px; height: 16px; }
      .hst-crumbs .hst-current { color: var(--hst-gold-100); }

      /* ================= AVAILABILITY ================= */

      .hst-card {
        overflow: hidden;
        border: 1px solid var(--hst-line);
        border-radius: 16px;
        background: #fff;
        box-shadow: 0 1px 2px rgba(0, 0, 0, .05);
      }

      .hst-card-head {
        display: flex;
        align-items: center;
        justify-content: space-between;
        padding: 22px 28px;
      }

      .hst-card-head.is-boys { background: var(--hst-maroon-700); color: var(--hst-cream); }
      .hst-card-head.is-girls { background: var(--hst-gold); color: #2B0710; }

      .hst-card-title {
        margin: 0;
        font-family: var(--hst-serif);
        font-size: 24px;
        font-weight: 700;
      }

      .hst-card-tag {
        font-size: 12px;
        font-weight: 700;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .hst-card-body { padding: 28px; }

      .hst-stats {
        display: grid;
        grid-template-columns: repeat(3, 1fr);
        gap: 12px;
        text-align: center;
      }

      .hst-stat-num {
        color: var(--hst-maroon-700);
        font-family: var(--hst-serif);
        font-size: 36px;
        font-weight: 700;
        line-height: 1;
      }

      .hst-stat-num.is-vacant { color: var(--hst-gold-700); }

      .hst-stat-label {
        margin-top: 6px;
        color: var(--hst-muted);
        font-size: 12px;
        letter-spacing: .08em;
        text-transform: uppercase;
      }

      .hst-bar {
        height: 10px;
        margin: 26px 0 8px;
        overflow: hidden;
        border-radius: 99px;
        background: #F1E6D2;
      }

      .hst-bar-fill { height: 100%; transition: width 600ms ease; }
      .hst-bar-fill.is-boys { background: var(--hst-maroon-700); }
      .hst-bar-fill.is-girls { background: var(--hst-gold); }

      .hst-bar-note { color: var(--hst-muted); font-size: 12px; }

      .hst-table-wrap { overflow-x: auto; }

      .hst-table {
        width: 100%;
        border-collapse: collapse;
        font-size: 14px;
      }

      .hst-table th,
      .hst-table td {
        padding: 14px 18px;
        text-align: left;
        border-bottom: 1px solid #EFE4D2;
        white-space: nowrap;
      }

      .hst-table th {
        background: #F6EEDF;
        color: var(--hst-maroon-700);
        font-size: 12px;
        letter-spacing: .1em;
        text-transform: uppercase;
      }

      .hst-status {
        display: inline-block;
        padding: 4px 12px;
        border-radius: 999px;
        font-size: 12px;
        font-weight: 700;
      }

      .hst-status.is-open { background: #E6F1E4; color: #2D5A27; }
      .hst-status.is-full { background: #F6E1E1; color: #8A1F1F; }

      /* ================= FEATURES ================= */

      .hst-features { background: #fff; }

      .hst-feature-card {
        padding: 32px;
        border: 1px solid var(--hst-line);
        border-radius: 16px;
        background: var(--hst-cream);
      }

      .hst-feature-title {
        margin: 0;
        color: var(--hst-maroon-700);
        font-family: var(--hst-serif);
        font-size: 24px;
        font-weight: 700;
      }

      .hst-list {
        display: grid;
        gap: 12px;
        margin: 18px 0 0;
        padding: 0;
        list-style: none;
        font-size: 15px;
        line-height: 1.5;
      }

      .hst-list li { position: relative; padding-left: 22px; }

      .hst-list li::before {
        content: '';
        position: absolute;
        top: 8px;
        left: 0;
        width: 8px;
        height: 8px;
        background: var(--hst-gold);
        transform: rotate(45deg);
      }

      /* ================= MESS ================= */

      .hst-mess-meta {
        margin: 14px 0 0;
        color: var(--hst-muted);
        font-size: 15px;
      }

      /* ================= CTA ================= */

      .hst-cta {
        padding: 56px 0;
        background: var(--hst-gold);
        color: #2B0710;
        text-align: center;
      }

      .hst-cta .hst-h2 { color: #2B0710; }
      .hst-cta p { margin: 12px 0 24px; }
      .hst-cta .hst-btn-maroon { background: var(--hst-maroon-900); }



/* ================= HOSTEL WARDENS ================= */

.hst-wardens {
  background: #fff;
}

.hst-warden-card {
  display: flex;
  flex-direction: column;
  align-items: center;
  padding: 35px 25px;
  border: 1px solid var(--hst-line);
  border-radius: 16px;
  background: var(--hst-cream);
  text-align: center;
  box-shadow: 0 5px 20px rgba(58, 12, 25, .06);
  transition: transform .3s ease, box-shadow .3s ease;
}

.hst-warden-card:hover {
  transform: translateY(-6px);
  box-shadow: 0 14px 30px rgba(58, 12, 25, .12);
}

.hst-warden-icon {
  display: flex;
  width: 75px;
  height: 75px;
  align-items: center;
  justify-content: center;
  margin-bottom: 18px;
  border-radius: 50%;
  color: var(--hst-gold);
  background: var(--hst-maroon-900);
  font-size: 30px;
}

.hst-warden-card.is-girls .hst-warden-icon {
  color: var(--hst-maroon-900);
  background: var(--hst-gold);
}

.hst-warden-title {
  margin: 0 0 8px;
  color: var(--hst-maroon-700);
  font-family: var(--hst-serif);
  font-size: 23px;
}

.hst-warden-role {
  margin: 0 0 22px;
  color: var(--hst-gold-700);
  font-size: 13px;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .1em;
}

.hst-warden-name {
  margin: 0 0 20px;
  color: var(--hst-ink);
  font-size: 18px;
  font-weight: 700;
}

.hst-warden-contact {
  display: grid;
  width: 100%;
  gap: 13px;
  padding-top: 18px;
  border-top: 1px solid var(--hst-line);
}

.hst-warden-contact a {
  display: flex;
  align-items: center;
  justify-content: center;
  gap: 10px;
  color: var(--hst-maroon-700);
  font-size: 14px;
  text-decoration: none;
  overflow-wrap: anywhere;
  transition: color .2s ease;
}

.hst-warden-contact a:hover {
  color: var(--hst-gold-700);
}

.hst-warden-contact span {
  font-weight: 700;
}



      /* ================= RESPONSIVE ================= */

      @media (min-width: 640px) {
        .hst-wrap { padding-inline: 32px; }
        .hst-hero-title { font-size: 48px; }
        .hst-h2 { font-size: 36px; }
      }

      @media (min-width: 768px) {
        .hst-grid2 { grid-template-columns: repeat(2, 1fr); }
        .hst-hero-grid { grid-template-columns: repeat(2, 1fr); }
        .hst-hero-media { height: 340px; }
        .hst-section { padding-block: 80px; }
      }

      @media (min-width: 1024px) {
        .hst-wrap { padding-inline: 48px; }
        .hst-hero-title { font-size: 56px; }
      }

      @media (prefers-reduced-motion: reduce) {
        .hst-btn,
        .hst-bar-fill { transition: none; }
        .hst-btn:hover { transform: none; }
      }
    `}</style>
  );
}

/* =========================================================
   HELPERS
   ========================================================= */

function HostelCard({ block, tone }: { block: HostelBlock; tone: 'boys' | 'girls' }) {
  const vacantRooms = Math.max(block.totalRooms - block.occupiedRooms, 0);
  const percent =
    block.totalRooms > 0
      ? Math.min(Math.round((block.occupiedRooms / block.totalRooms) * 100), 100)
      : 0;

  return (
    <div className="hst-card">
      <div className={`hst-card-head is-${tone}`}>
        <h3 className="hst-card-title">{block.name}</h3>
        <span className="hst-card-tag">{vacantRooms > 0 ? 'Available' : 'Full'}</span>
      </div>

      <div className="hst-card-body">
        <div className="hst-stats">
          <div>
            <div className="hst-stat-num">{block.totalRooms}</div>
            <div className="hst-stat-label">Total rooms</div>
          </div>
          <div>
            <div className="hst-stat-num">{block.occupiedRooms}</div>
            <div className="hst-stat-label">Occupied</div>
          </div>
          <div>
            <div className="hst-stat-num is-vacant">{vacantRooms}</div>
            <div className="hst-stat-label">Vacant</div>
          </div>
        </div>

        <div className="hst-bar" role="img" aria-label={`${percent}% occupied`}>
          <div className={`hst-bar-fill is-${tone}`} style={{ width: `${percent}%` }} />
        </div>
        <div className="hst-bar-note">{percent}% occupied</div>
      </div>

      <div className="hst-table-wrap">
        <table className="hst-table">
          <thead>
            <tr>
              <th>Room type</th>
              <th>Beds vacant</th>
              <th>Status</th>
            </tr>
          </thead>
          <tbody>
            {block.roomTypes.map((room) => {
              const open = room.vacantBeds > 0;
              return (
                <tr key={room.type}>
                  <td>{room.type}</td>
                  <td>
                    {room.vacantBeds} / {room.totalBeds}
                  </td>
                  <td>
                    <span className={`hst-status ${open ? 'is-open' : 'is-full'}`}>
                      {open ? 'Open' : 'Full'}
                    </span>
                  </td>
                </tr>
              );
            })}
          </tbody>
        </table>
      </div>
    </div>
  );
}

/* =========================================================
   PAGE
   ========================================================= */

export default function Hostel() {
  const { openModal } = useAdmissionModal();
  const { boys, girls, mess, contact, updatedOn, heroImage } = hostelData;

  return (
    <div className="hst-page">
      <HostelStyles />

      {/* Hero */}
      <section data-header-theme="dark" className="hst-hero">
        <div className="hst-wrap">
          <div className="hst-hero-grid">
            <div>
              <p className="hst-eyebrow">Residential Life · 2026–27</p>
              <h1 className="hst-hero-title">A safe home away from home</h1>
              <p className="hst-hero-text">
                Separate, supervised hostels for boys and girls with a college mess, study
                spaces and round-the-clock support.
              </p>
              <div className="hst-hero-actions">
                <a href="#availability" className="hst-btn hst-btn-gold">
                  Check room availability
                </a>
                <a href="#mess" className="hst-btn hst-btn-outline">
                  View mess menu
                </a>
              </div>
            </div>

            <div className="hst-hero-media">
              {heroImage ? <img src={heroImage} alt="Hostel campus" /> : 'Hostel photo'}
            </div>
          </div>

          <nav className="hst-crumbs" aria-label="Breadcrumb">
            <Link to="/">Home</Link>
            <ChevronRight aria-hidden="true" />
            <span className="hst-current">Hostel</span>
          </nav>
        </div>
      </section>

      {/* Availability */}
      <section id="availability" className="hst-section">
        <div className="hst-wrap">
          <div className="hst-head">
            <p className="hst-eyebrow">Live Availability</p>
            <h2 className="hst-h2">Rooms at a glance</h2>
            <p className="hst-sub">Updated by the hostel office. Last updated: {updatedOn}</p>
          </div>

          <div className="hst-grid2">
            <HostelCard block={boys} tone="boys" />
            <HostelCard block={girls} tone="girls" />
          </div>
        </div>
      </section>

      {/* Features */}
      <section className="hst-section hst-features">
        <div className="hst-wrap">
          <div className="hst-head">
            <p className="hst-eyebrow">Facilities</p>
            <h2 className="hst-h2">Boys and girls hostel features</h2>
          </div>

          <div className="hst-grid2">
            {[boys, girls].map((block) => (
              <div key={block.name} className="hst-feature-card">
                <h3 className="hst-feature-title">{block.name}</h3>
                <ul className="hst-list">
                  {block.features.map((feature) => (
                    <li key={feature}>{feature}</li>
                  ))}
                </ul>
              </div>
            ))}
          </div>
        </div>
      </section>

      {/* Mess */}
      <section id="mess" className="hst-section">
        <div className="hst-wrap">
          <div className="hst-head">
            <p className="hst-eyebrow">Dining</p>
            <h2 className="hst-h2">Mess details and weekly menu</h2>
            <p className="hst-mess-meta">
              Timings: {mess.timings} · Monthly fee: {mess.monthlyFee}
            </p>
          </div>

          <div className="hst-card">
            <div className="hst-table-wrap">
              <table className="hst-table">
                <thead>
                  <tr>
                    <th>Day</th>
                    <th>Breakfast</th>
                    <th>Lunch</th>
                    <th>Dinner</th>
                  </tr>
                </thead>
                <tbody>
                  {mess.menu.map((row) => (
                    <tr key={row.day}>
                      <td>{row.day}</td>
                      <td>{row.breakfast}</td>
                      <td>{row.lunch}</td>
                      <td>{row.dinner}</td>
                    </tr>
                  ))}
                </tbody>
              </table>
            </div>
          </div>
        </div>
      </section>


{/* HOSTEL WARDENS */}
<section className="hst-section hst-wardens">
  <div className="hst-wrap">

    <div className="hst-head">
      <p className="hst-eyebrow">Hostel Administration</p>

      <h2 className="hst-h2">
        Meet Our <span>Hostel Wardens</span>
      </h2>

      <p className="hst-sub">
        Our hostel wardens provide guidance, supervision
        and support to students throughout their stay.
        Contact them for hostel-related assistance.
      </p>
    </div>

    <div className="hst-grid2">

      {/* Boys Warden */}
      <article className="hst-warden-card">

        <div className="hst-warden-icon">
          <span aria-hidden="true">♂</span>
        </div>

        <h3 className="hst-warden-title">
          Boys Hostel Warden
        </h3>

        <p className="hst-warden-role">
          Boys Hostel Administration
        </p>

        <h4 className="hst-warden-name">
          Boys Warden Name
        </h4>

        <div className="hst-warden-contact">
          <a href="tel:+910000000000">
            <span>☎</span>
            +91 00000 00000
          </a>

          <a href="mailto:boyswarden@example.com">
            <span>✉</span>
            boyswarden@example.com
          </a>
        </div>

      </article>

      {/* Girls Warden */}
      <article className="hst-warden-card is-girls">

        <div className="hst-warden-icon">
          <span aria-hidden="true">♀</span>
        </div>

        <h3 className="hst-warden-title">
          Girls Hostel Warden
        </h3>

        <p className="hst-warden-role">
          Girls Hostel Administration
        </p>

        <h4 className="hst-warden-name">
          Girls Warden Name
        </h4>

        <div className="hst-warden-contact">
          <a href="tel:+910000000001">
            <span>☎</span>
            +91 00000 00001
          </a>

          <a href="mailto:girlswarden@example.com">
            <span>✉</span>
            girlswarden@example.com
          </a>
        </div>

      </article>

    </div>
  </div>
</section>


      {/* CTA */}
      <section className="hst-cta">
        <div className="hst-wrap">
          <h2 className="hst-h2">Reserve your hostel room</h2>
          <p>
            Warden contact: {contact.phone} · {contact.email}
          </p>
          <button type="button" onClick={openModal} className="hst-btn hst-btn-maroon">
            Apply for hostel
            <ArrowRight aria-hidden="true" />
          </button>
        </div>
      </section>
    </div>
  );
}