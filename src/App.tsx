
import { BrowserRouter, Routes, Route } from 'react-router-dom';

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
import Gallery from '@/pages/Gallery';
import Contact from '@/pages/Contact';
import Academics from '@/pages/academics';
import Management from './pages/Management';
import Principal from '@/pages/principal';
import Faculty from '@/pages/faculty';
import GrievanceCommittee from './pages/GrievanceCommittee';
import SexualHarassmentCommittee from './pages/SexualHarassmentCommittee';
import AntiRaggingCommittee from "./pages/AntiRaggingCommittee";
import WomenEmpowermentCell from "./pages/WomenEmpowermentCell";
import MandatoryDisclosure from "./pages/MandatoryDisclosure";
import AicteDocuments from "./pages/AicteDocuments";


export default function App() {
  return (
    <AdmissionModalProvider>
      <BrowserRouter>
        <ScrollToTop />

        <div className="flex min-h-screen flex-col">
          <Header onApplyClick={() => {}} />

          <main className="flex-1">
            <Routes>
              <Route path="/" element={<Home />} />
              <Route path="/about" element={<About />} />
              <Route path="/admission" element={<Admission />} />
              <Route path="/placement" element={<Placement />} />
              <Route path="/gallery" element={<Gallery />} />
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
            </Routes>
          </main>

          <Footer />
          <FloatingActionRail />
          <Chatbot />
          <AdmissionModal />
        </div>
      </BrowserRouter>
    </AdmissionModalProvider>
  );
}
