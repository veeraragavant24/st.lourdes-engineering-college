import HeroSlider from '@/components/HeroSlider';
import NewsEventsSection from '@/components/NewsEventsSection';
import CampusHighlights from '@/components/CampusHighlights';
import PlacementSection from '@/components/PlacementSection';
import RecruitersSection from '@/components/RecruitersSection';
import AboutSection from '@/components/AboutSection';
import { Link } from 'react-router-dom';

export default function Home() {
  return (
    <>
      <HeroSlider />

      <NewsEventsSection />

      <CampusHighlights />

      <PlacementSection />

      <RecruitersSection />

      <AboutSection />

      {/* Academics section on Home page */}
      <section className="home-academics-section">
        <div className="home-academics-heading">
          <span className="home-academics-eyebrow">
            ACADEMIC EXCELLENCE
          </span>

          <h2>
            Discover Our <span>Courses</span>
          </h2>

          <p>
            Explore undergraduate and postgraduate programmes designed
            to develop knowledge, practical skills and successful careers.
          </p>
        </div>

        <div className="home-academics-preview">
          <div className="home-academics-card">
            <h3>Undergraduate Programmes</h3>

            <p>
              B.E. Computer Science and Engineering, B.Tech. Information
              Technology, B.Tech. Artificial Intelligence and Data Science,
              and B.E. Electronics and Communication Engineering.
            </p>

            <Link to="/academics" className="home-academics-card-link">
              View UG Courses <span>→</span>
            </Link>
          </div>

          <div className="home-academics-card">
            <h3>Postgraduate Programmes</h3>

            <p>
              Master of Business Administration (MBA) and M.E. Computer
              Science and Engineering.
            </p>

            <Link to="/academics" className="home-academics-card-link">
              View PG Courses <span>→</span>
            </Link>
          </div>
        </div>

        <Link to="/academics" className="home-academics-button">
          Explore All Courses
          <span aria-hidden="true">→</span>
        </Link>
      </section>

      <style>{`
        .home-academics-section {
          padding: 75px 24px;
          background: #fbf9f5;
          text-align: center;
        }

        .home-academics-heading {
          max-width: 720px;
          margin: 0 auto 35px;
        }

        .home-academics-eyebrow {
          color: #b68a2e;
          font-size: 11px;
          font-weight: 800;
          letter-spacing: 4px;
        }

        .home-academics-heading h2 {
          margin: 14px 0;
          color: #74182b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: clamp(30px, 4vw, 44px);
          line-height: 1.2;
        }

        .home-academics-heading h2 span {
          color: #d8ad45;
        }

        .home-academics-heading p {
          color: #6b6263;
          font-size: 14px;
          line-height: 1.8;
        }

        .home-academics-preview {
          display: grid;
          grid-template-columns: repeat(2, minmax(0, 1fr));
          gap: 22px;
          max-width: 1050px;
          margin: 0 auto 30px;
          text-align: left;
        }

        .home-academics-card {
          padding: 28px;
          background: #fff;
          border: 1px solid #ead9b7;
          border-bottom: 3px solid #d8ad45;
          border-radius: 8px;
          transition:
            transform 300ms ease,
            box-shadow 300ms ease;
        }

        .home-academics-card:hover {
          transform: translateY(-5px);
          box-shadow: 0 12px 28px rgba(94, 20, 38, 0.1);
        }

        .home-academics-card h3 {
          margin: 0 0 12px;
          color: #74182b;
          font-family: Georgia, "Times New Roman", serif;
          font-size: 21px;
          line-height: 1.4;
        }

        .home-academics-card p {
          margin: 0 0 20px;
          color: #6b6263;
          font-size: 13px;
          line-height: 1.9;
        }

        .home-academics-card-link {
          display: inline-flex;
          align-items: center;
          gap: 8px;
          color: #74182b;
          font-size: 12px;
          font-weight: 700;
          text-decoration: none;
        }

        .home-academics-card-link span {
          color: #b68a2e;
          font-size: 18px;
          transition: transform 200ms ease;
        }

        .home-academics-card-link:hover span {
          transform: translateX(4px);
        }

        .home-academics-button {
          display: inline-flex;
          align-items: center;
          justify-content: center;
          gap: 12px;
          padding: 13px 22px;
          border: 1px solid #74182b;
          border-radius: 5px;
          background: #74182b;
          color: #fff;
          font-size: 13px;
          font-weight: 700;
          text-decoration: none;
          transition:
            background 250ms ease,
            color 250ms ease,
            border-color 250ms ease;
        }

        .home-academics-button:hover {
          background: #d8ad45;
          border-color: #d8ad45;
          color: #591322;
        }

        .home-academics-button span {
          font-size: 19px;
        }

        @media (max-width: 640px) {
          .home-academics-section {
            padding: 50px 18px;
          }

          .home-academics-preview {
            grid-template-columns: 1fr;
            gap: 15px;
          }

          .home-academics-card {
            padding: 22px;
          }

          .home-academics-card h3 {
            font-size: 19px;
          }
        }
      `}</style>
    </>
  );
}