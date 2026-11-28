import { BrowserRouter, Routes, Route, useLocation } from 'react-router-dom';

import { AdmissionModalProvider } from '@/components/AdmissionModalContext';
import AdmissionModal from '@/components/AdmissionModal';
import Header from '@/components/Header';
import Footer from '@/components/Footer';
import FloatingActionRail from '@/components/FloatingActionRail';
import Chatbot from '@/components/Chatbot';
import ScrollToTop from '@/components/ScrollToTop';

import Departments from '@/pages/departments';
import Home from '@/pages/Home';
import About from '@/pages/About';
import Admission from '@/pages/Admission';
import Placement from '@/pages/Placement';

import Contact from '@/pages/Contact';
import Academics from '@/pages/academics';
import Management from './pages/Management';
import Principal from '@/pages/principal';
import Faculty from '@/pages/faculty';
import GrievanceCommittee from './pages/GrievanceCommittee';
import SexualHarassmentCommittee from './pages/SexualHarassmentCommittee';
import AntiRaggingCommittee from './pages/AntiRaggingCommittee';
import WomenEmpowermentCell from './pages/WomenEmpowermentCell';
import MandatoryDisclosure from './pages/MandatoryDisclosure';
import AicteDocuments from './pages/AicteDocuments';
import Eligibility from './pages/Eligibility';
import Scholarships from './pages/Scholarships';
import NewsEvents from './pages/NewsEvents';
import Facility from '@/pages/Facility';
import AdminLogin from './pages/AdminLogin';
import AdminNewsEvents from './pages/AdminNewsEvents';
import Hostel from '@/pages/Hostel';
import HostelAdmin from "./pages/HostelAdmin";
import Library from "./pages/Library";

/**
 * Always start from the Home page when the browser is refreshed.
 *
 * This runs once when the app loads, BEFORE the router renders, so the
 * visitor never sees the old page flash. Normal navigation (clicking links,
 * typing a URL, back/forward) is not affected. Admin pages are skipped so
 * refreshing the admin portal does not kick you out of your work.
 */
(function redirectToHomeOnRefresh() {
  if (typeof window === 'undefined') return;

  const navEntry = performance.getEntriesByType('navigation')[0] as
    | PerformanceNavigationTiming
    | undefined;

  const isReload = navEntry?.type === 'reload';
  const isAdmin = window.location.pathname.startsWith('/admin');

  if (!isReload || isAdmin) return;

  // Stop the browser from restoring the old scroll position
  if ('scrollRestoration' in window.history) {
    window.history.scrollRestoration = 'manual';
  }

  const isAlreadyHome =
    window.location.pathname === '/' &&
    !window.location.search &&
    !window.location.hash;

  if (!isAlreadyHome) {
    window.history.replaceState(null, '', '/');
  }

  window.scrollTo(0, 0);
})();

function AppLayout() {
  const location = useLocation();

  // Hide the public college website layout on admin pages.
  const isAdminRoute = location.pathname.startsWith('/admin');

  return (
    <>
      <ScrollToTop />

      {!isAdminRoute && <Header onApplyClick={() => {}} />}

      <main className="flex-1">
        <Routes>
          {/* PUBLIC WEBSITE */}
          <Route path="/" element={<Home />} />
          <Route path="/about" element={<About />} />
          <Route path="/admission" element={<Admission />} />
          <Route path="/placement" element={<Placement />} />
          
          <Route path="/contact" element={<Contact />} />
          <Route path="/faculty" element={<Faculty />} />
          <Route path="/principal" element={<Principal />} />
          <Route path="/management" element={<Management />} />

          <Route
            path="/committees/sexual-harassment"
            element={<SexualHarassmentCommittee />}
          />

          <Route
            path="/committees/women-empowerment"
            element={<WomenEmpowermentCell />}
          />

          <Route path="/academic" element={<Academics />} />
          <Route path="/academics" element={<Academics />} />
          <Route path="/departments" element={<Departments />} />

          <Route
            path="/grievance-committee"
            element={<GrievanceCommittee />}
          />

          <Route
            path="/committees/anti-ragging"
            element={<AntiRaggingCommittee />}
          />

          <Route
            path="/mandatory-disclosure"
            element={<MandatoryDisclosure />}
          />

          <Route path="/aicte-documents" element={<AicteDocuments />} />
          <Route path="/eligibility" element={<Eligibility />} />
          <Route path="/scholarships" element={<Scholarships />} />
          <Route path="/news-events" element={<NewsEvents />} />

          {/* ADMIN PORTAL */}
          <Route path="/admin" element={<AdminLogin />} />
          <Route path="/admin/login" element={<AdminLogin />} />
          <Route path="/admin/news-events" element={<AdminNewsEvents />} />
          <Route path="/hostel" element={<Hostel />} />
<Route path="/hosteladmin" element={<HostelAdmin />} />
<Route path="/facilities" element={<Facility />} />
      <Route path="/library" element={<Library />} />

        </Routes>
      </main>

      {!isAdminRoute && (
        <>
          <Footer />
          <FloatingActionRail />
          <Chatbot />
          <AdmissionModal />
        </>
      )}
    </>
  );
}

export default function App() {
  return (
    <AdmissionModalProvider>
      <BrowserRouter>
        <div className="flex min-h-screen flex-col">
          <AppLayout />
        </div>
      </BrowserRouter>
    </AdmissionModalProvider>
  );
}