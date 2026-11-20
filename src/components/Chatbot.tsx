import React, { useEffect, useRef, useState } from "react";
import { useNavigate } from "react-router-dom";
import { useAdmissionModal } from "@/components/AdmissionModalContext";

/* ------------------------------------------------------------------ */
/* Types                                                              */
/* ------------------------------------------------------------------ */

interface Message {
  id: number;
  sender: "bot" | "user";
  text: string;
}

interface ChatOption {
  label: string;
  value: string;
}

interface ChatbotProps {
  onOpenAdmission?: () => void;
}

type Menu =
  | "main"
  | "about"
  | "admission"
  | "courses"
  | "ug-branches"
  | "pg-branches"
  | "course-actions"
  | "departments"
  | "facilities"
  | "placements"
  | "contact";

/* ------------------------------------------------------------------ */
/* Menu options                                                       */
/* ------------------------------------------------------------------ */

const mainOptions: ChatOption[] = [
  { label: "About Our College", value: "about" },
  { label: "Admissions", value: "admission" },
  { label: "Courses & Programmes", value: "courses" },
  { label: "Departments", value: "departments" },
  { label: "Campus & Facilities", value: "facilities" },
  { label: "Placements", value: "placements" },
  { label: "Contact Us", value: "contact" },
];

const aboutOptions: ChatOption[] = [
  { label: "About Us", value: "about-us" },
  { label: "Vision & Mission", value: "vision" },
  { label: "Management", value: "management" },
];

const admissionOptions: ChatOption[] = [
  { label: "Admission Process", value: "admission-process" },
  { label: "Eligibility", value: "admission-eligibility" },
  { label: "Required Documents", value: "documents" },
  { label: "Fees Information", value: "fees-information" },
  { label: "Admission Enquiry Form", value: "admission-enquiry" },
  { label: "Apply Now", value: "apply" },
];

const courseOptions: ChatOption[] = [
  { label: "Undergraduate (B.E. / B.Tech)", value: "ug-branches" },
  { label: "Postgraduate (M.E. / MBA)", value: "pg-branches" },
];

const ugBranchOptions: ChatOption[] = [
  { label: "Computer Science & Engineering (CSE)", value: "ug-cse" },
  { label: "Information Technology (IT)", value: "ug-it" },
  { label: "Electronics & Communication (ECE)", value: "ug-ece" },
  { label: "AI & Data Science (AI&DS)", value: "ug-aids" },
  { label: "Cyber Security (CS)", value: "ug-cs" },
];

const pgBranchOptions: ChatOption[] = [
  { label: "M.E. Computer Science & Engineering", value: "pg-cse" },
  { label: "MBA", value: "pg-mba" },
];

const courseActionOptions: ChatOption[] = [
  { label: "Course Overview", value: "course-overview" },
  { label: "Eligibility Criteria", value: "eligibility" },
  { label: "Course Duration", value: "duration" },
  { label: "Fees Information", value: "fees" },
];

const departmentOptions: ChatOption[] = [
  { label: "Computer Science & Engineering", value: "dept-cse" },
  { label: "Cyber Security", value: "dept-cb" },
  { label: "Information Technology", value: "dept-it" },
  { label: "Artificial Intelligence & Data Science", value: "dept-aids" },
  { label: "Electronics & Communication Engineering", value: "dept-ece" },
  { label: "M.E. Computer Science & Engineering", value: "dept-me-cse" },
  { label: "Master of Business Administration (MBA)", value: "dept-mba" },
];

const facilityOptions: ChatOption[] = [
  { label: "Hostel", value: "hostel" },
  { label: "Library", value: "library" },
  { label: "Laboratories", value: "labs" },
  { label: "Transport Information", value: "transport" },
];

const placementOptions: ChatOption[] = [
  { label: "Placement Cell", value: "placement-cell" },
  { label: "Training & Development", value: "training" },
];

const contactOptions: ChatOption[] = [
  { label: "Contact Details", value: "details" },
  { label: "Admission Enquiry", value: "admission-enquiry" },
  { label: "Open Contact Page", value: "contact-page" },
];

const menuOptions: Record<Menu, ChatOption[]> = {
  main: mainOptions,
  about: aboutOptions,
  admission: admissionOptions,
  courses: courseOptions,
  "ug-branches": ugBranchOptions,
  "pg-branches": pgBranchOptions,
  "course-actions": courseActionOptions,
  departments: departmentOptions,
  facilities: facilityOptions,
  placements: placementOptions,
  contact: contactOptions,
};

const menuTitles: Record<Menu, string> = {
  main: "HOW CAN I HELP YOU?",
  about: "ABOUT OUR COLLEGE",
  admission: "ADMISSION ASSISTANCE",
  courses: "CHOOSE A PROGRAMME",
  "ug-branches": "UNDERGRADUATE PROGRAMMES",
  "pg-branches": "POSTGRADUATE PROGRAMMES",
  "course-actions": "PROGRAMME INFORMATION",
  departments: "DEPARTMENTS",
  facilities: "CAMPUS & FACILITIES",
  placements: "PLACEMENTS",
  contact: "CONTACT & ENQUIRIES",
};

/** Message shown when an option opens a sub menu. */
const menuIntros: Partial<Record<Menu, string>> = {
  about: "What would you like to know about the college?",
  admission:
    "I can help you understand the admission process, eligibility, documents, fees, and enquiry options.",
  courses: "Choose a programme level to learn more about it.",
  "ug-branches": "Choose an undergraduate programme.",
  "pg-branches": "Choose a postgraduate programme.",
  departments: "Choose a department to learn more.",
  facilities:
    "Choose a campus facility to learn more. Please confirm specific facility availability with the college.",
  placements: "Choose a placement topic below.",
  contact: "Choose a contact or enquiry option below.",
};

/* ------------------------------------------------------------------ */
/* Content                                                            */
/* ------------------------------------------------------------------ */

interface CourseData {
  name: string;
  overview: string;
  eligibility: string;
  duration: string;
  fees: string;
}

const UG_ELIGIBILITY =
  "Pass in 10+2 with Mathematics, Physics, and Chemistry. Meet Anna University aggregate requirements and complete TNEA registration.";
const UG_DURATION =
  "B.E. / B.Tech. programmes are typically 4 years. Please confirm the current duration with the college.";
const UG_FEES =
  "For the current tuition fees and other charges, please contact the admission office.\n+91 818181 6735\n+91 81900 50400\n+91 81900 50600\n+91 81900 30500";
const PG_DURATION =
  "Postgraduate programmes are typically 2 years. Please confirm the current duration with the college.";
const PG_FEES =
  "For the current fees and other charges, please contact the admission office.\n+91 818181 6735\n+91 81900 50400\n+91 81900 50600\n+91 81900 30500";

const courseData: Record<string, CourseData> = {
  "ug-cse": {
    name: "B.E. Computer Science & Engineering (CSE)",
    overview:
      "Research & Teaching Excellence\nOutstanding research environment with a strong focus on quality education.\n\nAdvanced Infrastructure\nState-of-the-art laboratories and Centres of Excellence in Cyber Security, Data Science, Artificial Intelligence, Cloud Computing, Front-End Engineering and Full Stack Technology.\n\nCSI Recognition\nAwarded the CSI Best Student Chapter for 2016–2017.\n\nInnovative Learning\nProject-based, activity-based and blended learning methodologies.\n\nAI-Powered Education\nPersonalized learning through an AI-powered learning platform.\n\nDigital Learning Resources\nFaculty-developed digital course materials that enhance the teaching-learning process.",
    eligibility: UG_ELIGIBILITY,
    duration: UG_DURATION,
    fees: UG_FEES,
  },
  "ug-it": {
    name: "B.Tech. Information Technology (IT)",
    overview:
      "Academic Excellence\nDeveloping innovative, industry-ready IT professionals through value-based education and emerging technologies.\n\nExperienced Faculty\nExpertise in Software Engineering, Data Science, Artificial Intelligence, Cybersecurity, Cloud Computing, Networking, DBMS and Web Technologies.\n\nPractical Learning\nHands-on training through projects, coding practices, hackathons, workshops, seminars and real-world case studies.\n\nIndustry Collaboration\nStrong industry connections offering guest lectures, industrial visits, internships, certifications and placement training.\n\nHolistic Development\nEnhancing technical skills, communication, teamwork, creativity and ethical responsibility.\n\nCareer Readiness\nPreparing competent and confident IT professionals to succeed in the evolving global technology industry.",
    eligibility: UG_ELIGIBILITY,
    duration: UG_DURATION,
    fees: UG_FEES,
  },
  "ug-ece": {
    name: "B.E. Electronics & Communication Engineering (ECE)",
    overview:
      "Established in 2009\nStarted with an intake of 30 students, increased to 60 in 2025. The programme is AICTE-approved and affiliated with Anna University.\n\nAcademic Excellence\nA dynamic department committed to global standards through dedicated faculty and student participation.\n\nModern Laboratories\nWell-equipped laboratories provide practical training aligned with the university curriculum.\n\nPractical Learning\nTutorial sessions and hands-on activities help students strengthen their technical knowledge.\n\nIndustry Exposure\nIndustrial visits twice every semester provide valuable real-world experience.\n\nTechnical Development\nSeminars and National/International conference paper publications encourage innovation and improve communication skills.",
    eligibility: UG_ELIGIBILITY,
    duration: UG_DURATION,
    fees: UG_FEES,
  },
  "ug-aids": {
    name: "B.Tech. Artificial Intelligence & Data Science (AI&DS)",
    overview:
      "Vision\nTo become a global centre of excellence in AI and Data Science education, research and innovation, promoting ethical AI and data-driven solutions.\n\nMission\nTo deliver quality education, advanced research and industry-driven innovation, preparing skilled and ethical professionals to solve real-world challenges through intelligent technologies.",
    eligibility: UG_ELIGIBILITY,
    duration: UG_DURATION,
    fees: UG_FEES,
  },
  "ug-cs": {
    name: "B.E. Cyber Security (CS)",
    overview:
      "Established in 2022\nStarted with an intake of 30 students, increased to 60 in 2025. The programme is AICTE-approved and affiliated with Anna University.\n\nAcademic Excellence\nA progressive department focused on global standards and industry-oriented cybersecurity education.\n\nAdvanced Cyber Security Labs\nHands-on training in ethical hacking, network security, digital forensics and secure coding using modern tools.\n\nPractical Learning\nStructured laboratory sessions and tutorials strengthen technical knowledge and problem-solving skills.\n\nIndustry Exposure\nSemester-wise industrial visits provide insights into real-world cybersecurity practices.\n\nTechnical Development\nSeminars, hackathons and National/International conference publications promote innovation, research and communication skills.",
    eligibility: UG_ELIGIBILITY,
    duration: UG_DURATION,
    fees: UG_FEES,
  },
  "pg-cse": {
    name: "M.E. Computer Science & Engineering",
    overview:
      "Advanced Education\nProviding in-depth Computer Science knowledge with a strong focus on research and innovation.\n\nModern Laboratories\nWell-equipped labs in Artificial Intelligence, Data Science, Cyber Security, Cloud Computing and Machine Learning.\n\nResearch & Innovation\nEncouraging real-time projects, research publications and industry-based problem-solving.\n\nInnovative Learning\nProject-based learning, seminars, workshops and blended teaching methods.\n\nExpert Guidance\nFaculty mentorship and digital learning resources enhance technical and research skills.\n\nCareer Development\nPreparing skilled professionals, researchers and technology experts in advanced computing fields.",
    eligibility:
      "A relevant Engineering / Technology degree. Admissions follow Anna University eligibility norms.",
    duration: PG_DURATION,
    fees: PG_FEES,
  },
  "pg-mba": {
    name: "Master of Business Administration (MBA)",
    overview:
      "Management Excellence\nDeveloping future-ready management professionals through value-based education and industry-oriented training.\n\nExperienced Faculty\nExpertise in Human Resources, Finance, Marketing, Operations, Systems and Entrepreneurship.\n\nPractical Learning\nCase studies, experiential projects, business simulations, seminars and workshops enhance managerial skills.\n\nIndustry Exposure\nCorporate collaborations, guest lectures, industrial visits and internships provide real-world business experience.\n\nCareer Development\nPlacement training and leadership initiatives strengthen communication, teamwork and professional skills.\n\nEthical Leadership\nPreparing confident, innovative and socially responsible business leaders for the global market.",
    eligibility:
      "A Bachelor's degree in any discipline. Admissions follow Anna University eligibility norms.",
    duration: PG_DURATION,
    fees: PG_FEES,
  },
};

const courseNames: Record<string, string> = Object.fromEntries(
  Object.entries(courseData).map(([key, course]) => [key, course.name])
);

const courseInfo: Record<string, Record<string, string>> = Object.fromEntries(
  Object.entries(courseData).map(([key, course]) => [
    key,
    {
      "course-overview": course.overview,
      eligibility: course.eligibility,
      duration: course.duration,
      fees: course.fees,
    },
  ])
);

const departmentDescriptions: Record<string, string> = {
  "dept-cse":
    "Develop strong computing and software skills through practical learning in emerging technologies, preparing students to solve real-world challenges and excel in future careers.\n\nKey Focus Areas\nSoftware Development\nData Structures and Algorithms\nArtificial Intelligence\nWeb and Application Development\nComputer Networks",
  "dept-cb":
    "Develop expertise in cybersecurity, ethical hacking and digital forensics to protect systems, networks and applications from evolving cyber threats through practical learning and industry-relevant skills.\n\nKey Focus Areas\nCyber Security Fundamentals\nEthical Hacking\nNetwork Security\nDigital Forensics\nCryptography and Data Protection",
  "dept-it":
    "Build strong IT skills in software engineering, databases, cloud computing and digital platforms. Gain practical experience to develop innovative technology solutions and prepare for successful careers.\n\nKey Focus Areas\nInformation Systems\nWeb Technologies\nDatabase Management\nCloud Computing\nSoftware Engineering",
  "dept-aids":
    "Explore Artificial Intelligence, Machine Learning and Data Analytics to transform complex data into intelligent solutions. Gain practical skills and industry-relevant knowledge for future technology careers.\n\nKey Focus Areas\nArtificial Intelligence\nMachine Learning\nData Analytics\nDeep Learning\nBig Data Technologies",
  "dept-ece":
    "Gain expertise in electronic circuits, communication systems, embedded technologies and intelligent devices through practical learning and industry-relevant skills, preparing for future engineering careers.\n\nKey Focus Areas\nElectronic Circuit Design\nCommunication Systems\nEmbedded Systems\nSignal Processing\nInternet of Things",
  "dept-me-cse":
    "Advance your expertise in Computer Science through postgraduate learning, research and innovative technology development. Gain advanced technical and practical skills for future career opportunities.\n\nKey Focus Areas\nAdvanced Computer Science\nResearch and Development\nAdvanced Algorithms\nIntelligent Computing\nEmerging Technologies",
  "dept-mba":
    "Develop leadership, business management and strategic decision-making skills. Gain practical knowledge in finance, marketing, human resources and entrepreneurship to prepare for successful management careers.\n\nKey Focus Areas\nBusiness Management\nFinancial Management\nMarketing Management\nHuman Resource Management\nEntrepreneurship and Strategy",
};

/** Leaf answers. `route` is opened after the answer is shown. */
const leafResponses: Record<string, { text: string; route?: string }> = {
  // About
  "about-us": {
    text: "St. Lourdes Engineering College, founded by Ln. Dr. S. Peter in 2009, is a Christian Minority Institution managed by Loordhu Ammal Educational Trust. Located on NH45, Chennai, the college is dedicated to delivering quality technical education through experienced faculty, modern infrastructure, industry-focused learning, and holistic student development.\n\n2009 – Established | 7 – Programs | 15+ – Years | Christian Minority – Institution",
    route: "/about",
  },
  vision: {
    text: "Vision\nTo become a model institution of excellence in Science, Engineering, Technology, and Management, fostering quality education, holistic development, and global readiness.\n\nMission\nTo provide quality technical education, promote research and innovation, nurture ethical values, and prepare students for successful careers and responsible citizenship.",
    route: "/about",
  },
  management: {
    text: "Dr. Ln. S. Peter\nChancellor\nAn education pioneer who established multiple institutions across various fields.\n\nMs. Mercy Florence Peter\nVice Chancellor\nAn accomplished professional focusing on academic excellence, innovation, and student development.\n\nMr. Ajay Ravindra Kumar\nManaging Director\nBrings global experience from Tesla in engineering, technology, and corporate leadership.",
    route: "/about",
  },

  // Admission
  "admission-process": {
    text: "Submit Enquiry\nFill out the admission enquiry form or contact our admissions office to express your interest in a program.\n\nTNEA Counselling\nAdmission to B.E./B.Tech. programs is through Anna University TNEA counselling. Counselling Code: 1243.\n\nDocument Verification\nSubmit required documents, including mark sheets, transfer certificate, community certificate, and photographs.\n\nConfirm Admission\nComplete fee payment and enrollment formalities to secure your seat and begin your academic journey.",
    route: "/admissions",
  },
  "admission-eligibility": {
    text: "B.E. / B.Tech. Programs\nPass in 10+2 with Mathematics, Physics, and Chemistry. Meet Anna University aggregate requirements and complete TNEA registration.\n\nM.B.A. / M.E. Programs\nM.E.: Relevant Engineering / Technology degree. M.B.A.: Bachelor's degree in any discipline. Admissions follow Anna University eligibility norms.",
    route: "/admissions",
  },
  documents: {
    text: "Required documents depend on the programme and current admission rules. Ask the admission office for its official checklist before applying.",
  },
  "fees-information": {
    text: "Please contact the admission office for the current approved fee structure and payment details.",
  },

  // Facilities
  library: {
    text: "Library Facilities\nA well-furnished 300 sq. m. library with a fully automated AutoLib system for circulation, cataloguing, acquisitions, web OPAC and alerts.\n\nDigital Resources\nAccess to national and international journals, including Springer, ProQuest and J-Gate, along with LAN-connected computers and Wi-Fi.\n\nLearning Platforms\nStudents and faculty can access NDL, NPTEL, SWAYAM and DELNET resources, including e-books, journals, lectures and research materials.\n\nStudent Services\nAutomated book issue and return using college ID cards, internet browsing and photocopying facilities.\n\nAdditional Facilities\nOpen access, departmental libraries and CCTV surveillance ensure a supportive learning environment.\n\nWorking Days\nLibrary Hours: 09:00 AM – 05:00 PM\nIssue / Return: 09:00 AM – 05:00 PM\n\nHolidays\nLibrary Hours: 09:00 AM – 04:00 PM\nIssue / Return: 09:00 AM – 04:00 PM",
  },
  labs: {
    text: "Computer Laboratories\nModern computer labs with updated systems, high-speed internet and essential software for programming, design and project development. Faculty-guided practical sessions support hands-on learning.\n\nKey Facilities\nModern desktop systems\nHigh-speed internet\nLatest software and tools\nFaculty-guided sessions\nComfortable lab environment\n\nChemistry Laboratory\nA well-equipped laboratory providing practical experience in chemical analysis and experiments aligned with the university curriculum.\n\nKey Facilities\nModern lab equipment and glassware\nChemicals and analytical instruments\nFume hood and ventilation\nFirst-aid and fire safety equipment\nWater quality and volumetric analysis experiments\n\nPhysics Laboratory\nA practical learning space for exploring optics, mechanics, electricity and thermal physics through experiments and measurements.\n\nKey Facilities\nIndividual experiment stations\nModern physics instruments\nSpectrometer and laser setups\nAccurate measuring equipment\nUniversity syllabus-based experiments\nFaculty guidance and lab support",
  },
  hostel: {
    text: "Boys Hostel\nWarden supervision and round-the-clock security ensure student safety. Wi-Fi, study halls, sports, recreation, laundry and power backup facilities provide a comfortable living environment.\n\nGirls Hostel\nLady warden supervision, CCTV surveillance and regulated entry and visitor policies ensure safety. Wi-Fi, study halls, laundry and power backup facilities support a comfortable stay.",
  },
  transport: {
    text: "For bus routes, transport availability, schedules, and fees, please contact the college administration.",
  },

  // Placements
  "placement-cell": {
    text: "The Training and Placement Cell of SLEC operates round the year to provide job opportunities to the students as well as internships, workshops and placement trainings to all the students of our college. It serves as an interface between the students and the corporate. We aim at inviting companies from various fields to provide training and placement in order to make a wide range of opportunities available for our students.",
    route: "/placement",
  },
  training: {
    text: "Career Guidance\nProvides placement updates, industry information and career planning support to help students make informed career choices.\n\nIndustry Interaction\nRegular sessions with industry experts, senior executives and alumni offer insights into current career trends and opportunities.\n\nSkill Development\nStructured training programmes enhance communication, personality development and professional skills.\n\nPlacement Support\nThe Training and Placement Cell guides students through career planning, self-assessment and recruitment preparation.\n\nEntrepreneurship Development\nWorkshops and guidance encourage self-employment and entrepreneurial skills.",
    route: "/placement",
  },

  // Contact
  details: {
    text: "Contact Us\nPhone: +91 818181 6735\nPhone: +91 81900 50400\n\nOur Address\nSt. Lourdes Engineering College\nErandam Kattalai, Tharapakkam\nNear Anagaputhur\nChennai – 600128, Tamil Nadu, India",
  },
  "contact-page": {
    text: "Contact St. Lourdes Engineering College through our official contact page for enquiries and assistance.",
    route: "/contact",
  },
};

const NAV_VALUES = ["previous-menu", "main-menu", "reset"];

const WELCOME_TEXT =
  "Welcome to St. Lourdes Engineering College! 👋\n\nI'm your virtual assistant. Choose a topic below to learn about admissions, courses, departments, facilities, placements, and contact information.";

function normalize(text: string): string {
  return text.toLowerCase().replace(/[?.!,]/g, "").trim();
}

/* ------------------------------------------------------------------ */
/* Persistent state (survives route changes / remounts)               */
/* ------------------------------------------------------------------ */

/** The menu state just before an option was clicked. */
interface Snapshot {
  menu: Menu;
  hiddenOptions: string[];
  selectedCourse: string;
}

const saved: {
  isOpen: boolean;
  messages: Message[] | null;
  menu: Menu;
  menuHistory: Snapshot[];
  selectedCourse: string;
  hiddenOptions: string[];
  nextId: number;
} = {
  isOpen: false,
  messages: null,
  menu: "main",
  menuHistory: [],
  selectedCourse: "",
  hiddenOptions: [],
  nextId: 2,
};

/* ------------------------------------------------------------------ */
/* Component                                                          */
/* ------------------------------------------------------------------ */

const ChatbotView: React.FC<ChatbotProps> = ({ onOpenAdmission }) => {
  const navigate = useNavigate();

  const [isOpen, setIsOpen] = useState(saved.isOpen);
  const [input, setInput] = useState("");
  const [typing, setTyping] = useState(false);
  const [menu, setMenu] = useState<Menu>(saved.menu);
  const [menuHistory, setMenuHistory] = useState<Snapshot[]>(saved.menuHistory);
  const [selectedCourse, setSelectedCourse] = useState(saved.selectedCourse);
  const [hiddenOptions, setHiddenOptions] = useState<string[]>(saved.hiddenOptions);
  const [messages, setMessages] = useState<Message[]>(
    saved.messages ?? [{ id: 1, sender: "bot", text: WELCOME_TEXT }]
  );

  const messagesEndRef = useRef<HTMLDivElement>(null);
  const timerRef = useRef<ReturnType<typeof setTimeout> | null>(null);
  const idRef = useRef(saved.nextId);

  /* ---------- effects ---------- */

  useEffect(() => {
    saved.isOpen = isOpen;
    saved.messages = messages;
    saved.menu = menu;
    saved.menuHistory = menuHistory;
    saved.selectedCourse = selectedCourse;
    saved.hiddenOptions = hiddenOptions;
    saved.nextId = idRef.current;
  }, [isOpen, messages, menu, menuHistory, selectedCourse, hiddenOptions]);

  useEffect(() => {
    if (isOpen) {
      messagesEndRef.current?.scrollIntoView({
        behavior: "smooth",
        block: "end",
      });
    }
  }, [messages, typing, isOpen, menu, hiddenOptions]);

  useEffect(() => {
    return () => {
      if (timerRef.current) clearTimeout(timerRef.current);
    };
  }, []);

  /* ---------- helpers ---------- */

  const addUserMessage = (text: string) => {
    setMessages((previous) => [
      ...previous,
      { id: idRef.current++, sender: "user", text },
    ]);
  };

  /** Saves the current menu state so Previous Menu can restore it. */
  const saveSnapshot = () => {
    setMenuHistory((previous) => [
      ...previous,
      { menu, hiddenOptions, selectedCourse },
    ]);
  };

  const addBotMessage = (
    text: string,
    nextMenu?: Menu,
    route?: string,
    after?: () => void
  ) => {
    if (timerRef.current) clearTimeout(timerRef.current);

    setTyping(true);

    timerRef.current = setTimeout(() => {
      setMessages((previous) => [
        ...previous,
        { id: idRef.current++, sender: "bot", text },
      ]);

      if (nextMenu) {
        if (nextMenu !== menu) setHiddenOptions([]);
        setMenu(nextMenu);
      }

      after?.();

      setTyping(false);
      timerRef.current = null;

      if (route) setTimeout(() => navigate(route), 500);
    }, 400);
  };

  const openAdmission = () => {
    if (onOpenAdmission) {
      onOpenAdmission();
    } else {
      navigate("/admission");
    }
  };

  /* ---------- navigation ---------- */

  const goToMainMenu = () => {
    addBotMessage("Here are the main topics I can help you with.", "main", undefined, () => {
      setSelectedCourse("");
      setHiddenOptions([]);
      setMenuHistory([]);
    });
  };

  const goToPreviousMenu = () => {
    const snapshot = menuHistory[menuHistory.length - 1];

    if (!snapshot) {
      goToMainMenu();
      return;
    }

    addBotMessage("Here are the previous options:", undefined, undefined, () => {
      setMenu(snapshot.menu);
      setHiddenOptions(snapshot.hiddenOptions);
      setSelectedCourse(snapshot.selectedCourse);
      setMenuHistory((previous) => previous.slice(0, -1));
    });
  };

  const resetConversation = () => {
    if (timerRef.current) {
      clearTimeout(timerRef.current);
      timerRef.current = null;
    }

    setTyping(false);
    setMenu("main");
    setMenuHistory([]);
    setSelectedCourse("");
    setHiddenOptions([]);
    setInput("");
    setMessages([
      {
        id: idRef.current++,
        sender: "bot",
        text: "Welcome back to St. Lourdes Engineering College! 👋\n\nHow can I help you today?",
      },
    ]);
  };

  /* ---------- option click ---------- */

  const handleOption = (value: string, label: string) => {
    if (typing) return;

    if (!NAV_VALUES.includes(value)) {
      saveSnapshot();
      setHiddenOptions((previous) =>
        previous.includes(value) ? previous : [...previous, value]
      );
    }

    if (value === "reset") {
      resetConversation();
      return;
    }

    addUserMessage(label);
    setInput("");

    if (value === "main-menu") {
      goToMainMenu();
      return;
    }

    if (value === "previous-menu") {
      goToPreviousMenu();
      return;
    }

    // Opens a sub menu
    if (value in menuOptions && value !== "main") {
      addBotMessage(
        menuIntros[value as Menu] ?? "Please choose an option.",
        value as Menu
      );
      return;
    }

    // Course selection
    if (value in courseNames) {
      setSelectedCourse(value);
      addBotMessage(
        `You selected ${courseNames[value]}. Choose the information you need.`,
        "course-actions"
      );
      return;
    }

    // Course details (needs a selected course)
    if (menu === "course-actions" && selectedCourse && courseInfo[selectedCourse]?.[value]) {
      addBotMessage(courseInfo[selectedCourse][value]);
      return;
    }

    // Department descriptions
    if (departmentDescriptions[value]) {
      addBotMessage(departmentDescriptions[value]);
      return;
    }

    // Open Admission Enquiry Modal
    if (value === "admission-enquiry" || value === "apply") {
      addBotMessage(
        "Please fill out the Admission Enquiry Form to submit your details.",
        undefined,
        undefined,
        openAdmission
      );
      return;
    }

    // Leaf answers (optionally with a route)
    const leaf = leafResponses[value];
    if (leaf) {
      addBotMessage(leaf.text, undefined, leaf.route);
      return;
    }

    addBotMessage("Please contact our college office for further information.");
  };

  /* ---------- typed messages ---------- */

  const handleSend = () => {
    const message = input.trim();
    if (!message || typing) return;

    saveSnapshot();
    addUserMessage(message);
    setInput("");

    const text = normalize(message);
    const has = (...words: string[]) => words.some((word) => text.includes(word));

    if (/^(hi|hello|hey)\b/.test(text)) {
      addBotMessage(
        "Hello! Welcome to St. Lourdes Engineering College. Choose a topic below and I'll help you find the relevant information.",
        "main"
      );
      return;
    }

    if (has("placement", "recruit", "job", "career")) {
      addBotMessage("Choose a placement topic below.", "placements");
      return;
    }

    if (has("hostel", "transport", "bus")) {
      addBotMessage("Choose a facility below.", "facilities");
      return;
    }

    if (has("eligibility", "qualification", "eligible", "marks")) {
      addBotMessage(
        "Eligibility depends on the programme and current admission requirements. Select a programme for more specific guidance.",
        "courses"
      );
      return;
    }

    if (has("fee", "tuition", "cost")) {
      addBotMessage(
        "Fees depend on the programme and the current approved fee schedule. Select a programme for fee guidance.",
        "courses"
      );
      return;
    }

    if (has("admission", "apply", "application", "join")) {
      addBotMessage("Choose an admission topic below.", "admission");
      return;
    }

    if (has("department", "specialization", "specialisation")) {
      addBotMessage("Choose a department to explore.", "departments");
      return;
    }

    if (has("course", "programme", "program", "btech", "mtech", "engineering")) {
      addBotMessage("Here are the programmes you can ask about.", "courses");
      return;
    }

    if (has("facility", "laborator", "lab", "library", "campus")) {
      addBotMessage("Choose a facility below.", "facilities");
      return;
    }

    if (has("contact", "phone", "email", "address", "location")) {
      addBotMessage("Choose a contact option below.", "contact");
      return;
    }

    if (has("about", "mission", "vision", "management", "history")) {
      addBotMessage("Choose an About College topic below.", "about");
      return;
    }

    addBotMessage(
      "I'm sorry, I couldn't find an exact answer. I can help with admissions, courses, departments, facilities, placements, and contact information. Please choose a topic below or contact the college office.",
      "main"
    );
  };

  /* ---------- render helpers ---------- */

  const renderOptions = (options: ChatOption[]) => {
    const remaining = options.filter((option) => !hiddenOptions.includes(option.value));

    if (remaining.length === 0) return null;

    return (
      <div className="lourdes-menu-block">
        {remaining.map((option) => (
          <button
            key={option.value}
            type="button"
            className="lourdes-menu-option"
            onClick={() => handleOption(option.value, option.label)}
            disabled={typing}
          >
            <span>{option.label}</span>
            <span className="lourdes-option-arrow">›</span>
          </button>
        ))}
      </div>
    );
  };

  /* ---------- JSX ---------- */

  return (
    <>
      <style>{`
        :root {
          --lourdes-maroon: #681b2c;
          --lourdes-dark-maroon: #45101e;
          --lourdes-gold: #d6ad55;
          --lourdes-light-gold: #f1d995;
        }

        .lourdes-chat-launcher {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9998;
          display: flex;
          align-items: center;
          gap: 11px;
          padding: 13px 21px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 50px;
          background: linear-gradient(135deg, var(--lourdes-maroon), var(--lourdes-dark-maroon));
          color: #fff;
          font-size: 14px;
          font-weight: 600;
          cursor: pointer;
          box-shadow: 0 8px 28px rgba(0,0,0,.25);
          transition: all .3s ease;
        }

        .lourdes-chat-launcher:hover {
          transform: translateY(-4px);
          box-shadow: 0 12px 32px rgba(104,27,44,.35);
        }

        .lourdes-launcher-icon {
          color: var(--lourdes-light-gold);
          font-size: 22px;
        }

        .lourdes-chat-window {
          position: fixed;
          right: 28px;
          bottom: 28px;
          z-index: 9999;
          width: 390px;
          height: 590px;
          max-height: calc(100vh - 55px);
          display: flex;
          flex-direction: column;
          overflow: hidden;
          border: 2px solid var(--lourdes-gold);
          border-radius: 20px;
          background: transparent;
          box-shadow: 0 15px 50px rgba(0,0,0,.25);
          animation: lourdes-appear .3s ease;
        }

        @keyframes lourdes-appear {
          from { opacity: 0; transform: translateY(20px) scale(.97); }
          to { opacity: 1; transform: translateY(0) scale(1); }
        }

        .lourdes-chat-header {
          flex-shrink: 0;
          display: flex;
          justify-content: space-between;
          align-items: center;
          padding: 17px 18px;
          background: linear-gradient(120deg, var(--lourdes-dark-maroon), var(--lourdes-maroon));
          border-bottom: 2px solid var(--lourdes-gold);
          color: #fff;
        }

        .lourdes-header-info {
          display: flex;
          align-items: center;
          gap: 12px;
        }

        .lourdes-bot-avatar {
          width: 43px;
          height: 43px;
          display: flex;
          align-items: center;
          justify-content: center;
          border: 1px solid var(--lourdes-gold);
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          color: var(--lourdes-light-gold);
          font-size: 25px;
        }

        .lourdes-header-info h3 {
          margin: 0 0 5px;
          font-size: 15px;
          font-weight: 700;
          color: #fff;
        }

        .lourdes-online-status {
          display: flex;
          align-items: center;
          gap: 6px;
          font-size: 11px;
          color: #f5e8e8;
        }

        .lourdes-online-dot {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: #55d98a;
          box-shadow: 0 0 7px rgba(85,217,138,.8);
        }

        .lourdes-header-actions {
          display: flex;
          align-items: center;
          gap: 7px;
        }

        .lourdes-header-actions button {
          width: 32px;
          height: 32px;
          border: 1px solid rgba(255,255,255,.3);
          border-radius: 50%;
          background: rgba(255,255,255,.1);
          color: white;
          font-size: 21px;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-header-actions button:hover {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-chat-body {
          flex: 1;
          min-height: 0;
          overflow: hidden;
          background: transparent;
        }

        .lourdes-messages {
          height: 100%;
          overflow-y: auto;
          display: flex;
          flex-direction: column;
          gap: 13px;
          padding: 17px 13px;
          background: transparent;
          scrollbar-width: thin;
          scrollbar-color: var(--lourdes-gold) transparent;
        }

        .lourdes-messages::-webkit-scrollbar { width: 5px; }
        .lourdes-messages::-webkit-scrollbar-thumb {
          background: var(--lourdes-gold);
          border-radius: 10px;
        }

        .lourdes-message-row {
          display: flex;
          align-items: flex-start;
          gap: 8px;
          width: 100%;
        }

        .bot-row { justify-content: flex-start; }
        .user-row { justify-content: flex-end; }

        .lourdes-message-avatar,
        .lourdes-user-avatar {
          width: 29px;
          height: 29px;
          flex-shrink: 0;
          display: flex;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          font-size: 12px;
          font-weight: 700;
        }

        .lourdes-message-avatar {
          background: var(--lourdes-maroon);
          border: 1px solid var(--lourdes-gold);
          color: var(--lourdes-light-gold);
        }

        .lourdes-user-avatar {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-message {
          max-width: 84%;
          padding: 12px 14px;
          border-radius: 13px;
          font-size: 13px;
          line-height: 1.6;
          overflow-wrap: anywhere;
        }

        .lourdes-message p {
          margin: 0;
          white-space: pre-line;
        }

        .bot-message {
          background: rgba(104,27,44,.87);
          color: #fff;
          border: 1px solid rgba(214,173,85,.65);
          border-top-left-radius: 3px;
        }

        .user-message {
          background: rgba(214,173,85,.94);
          color: #32101a;
          border-top-right-radius: 3px;
          font-weight: 500;
        }

        /* Current menu (rendered under the messages) */
        .lourdes-section-label {
          margin: 2px 0 -6px 37px;
          color: var(--lourdes-light-gold);
          font-size: 9px;
          font-weight: 800;
          letter-spacing: .14em;
          text-shadow: 0 1px 3px rgba(0,0,0,.6);
        }

        .lourdes-menu-block {
          display: flex;
          flex-direction: column;
          gap: 7px;
          margin-left: 37px;
        }

        .lourdes-menu-option {
          width: 100%;
          display: flex;
          align-items: center;
          justify-content: space-between;
          padding: 10px 12px;
          border: 1px solid rgba(241,217,149,.7);
          border-radius: 8px;
          background: rgba(104,27,44,.87);
          color: #fff;
          text-align: left;
          font-size: 12px;
          font-weight: 500;
          cursor: pointer;
          transition: all .2s ease;
        }

        .lourdes-menu-option:hover:not(:disabled) {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
          transform: translateX(3px);
        }

        .lourdes-menu-option:disabled {
          opacity: .65;
          cursor: not-allowed;
        }

        .lourdes-option-arrow {
          font-size: 20px;
          line-height: 1;
        }

        .lourdes-nav-row {
          display: flex;
          gap: 8px;
          margin-left: 37px;
        }

        .lourdes-nav-row button,
        .lourdes-reset-button {
          display: flex;
          align-items: center;
          justify-content: center;
          gap: 6px;
          padding: 8px 10px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 8px;
          background: rgba(104,27,44,.9);
          color: #fff;
          font-size: 10px;
          font-weight: 600;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-nav-row button:hover:not(:disabled),
        .lourdes-reset-button:hover:not(:disabled) {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-reset-button {
          align-self: flex-start;
          margin-left: 37px;
        }

        .lourdes-typing {
          display: flex;
          align-items: center;
          gap: 5px;
          padding: 13px 15px;
          background: rgba(104,27,44,.87);
          border: 1px solid rgba(214,173,85,.65);
          border-radius: 12px;
        }

        .lourdes-typing span {
          width: 7px;
          height: 7px;
          border-radius: 50%;
          background: var(--lourdes-light-gold);
          animation: lourdes-typing 1.2s infinite ease-in-out;
        }

        .lourdes-typing span:nth-child(2) { animation-delay: .2s; }
        .lourdes-typing span:nth-child(3) { animation-delay: .4s; }

        @keyframes lourdes-typing {
          0%, 60%, 100% { transform: translateY(0); opacity: .5; }
          30% { transform: translateY(-5px); opacity: 1; }
        }

        .lourdes-chat-controls {
          flex-shrink: 0;
          padding: 10px 12px 8px;
          background: transparent;
          border-top: 1px solid rgba(214,173,85,.65);
        }

        .lourdes-input-area {
          display: flex;
          align-items: center;
          gap: 8px;
          padding: 6px 7px 6px 13px;
          border: 1px solid var(--lourdes-gold);
          border-radius: 30px;
          background: rgba(255,255,255,.92);
        }

        .lourdes-input-area input {
          flex: 1;
          min-width: 0;
          border: none;
          outline: none;
          background: transparent;
          color: #32101a;
          font-size: 12px;
        }

        .lourdes-input-area input::placeholder { color: #777; }

        .lourdes-input-area button {
          width: 33px;
          height: 33px;
          flex-shrink: 0;
          border: none;
          border-radius: 50%;
          background: var(--lourdes-maroon);
          color: var(--lourdes-light-gold);
          font-size: 17px;
          cursor: pointer;
          transition: .2s ease;
        }

        .lourdes-input-area button:hover:not(:disabled) {
          background: var(--lourdes-gold);
          color: var(--lourdes-dark-maroon);
        }

        .lourdes-input-area button:disabled {
          opacity: .5;
          cursor: not-allowed;
        }

        .lourdes-chat-footer {
          margin-top: 8px;
          color: #fff;
          text-align: center;
          font-size: 9px;
          text-shadow: 0 1px 3px rgba(0,0,0,.6);
        }

        .lourdes-chat-footer strong {
          color: var(--lourdes-light-gold);
        }

        @media (max-width: 480px) {
          .lourdes-chat-window {
            right: 10px;
            bottom: 10px;
            width: calc(100vw - 20px);
            height: min(620px, calc(100dvh - 20px));
            max-height: calc(100dvh - 20px);
            border-radius: 17px;
          }

          .lourdes-chat-launcher {
            right: 16px;
            bottom: 16px;
            padding: 12px 17px;
          }

          .lourdes-chat-header { padding: 14px; }
          .lourdes-message { max-width: 88%; }
          .lourdes-nav-row { flex-wrap: wrap; }
        }

        @media (max-width: 350px) {
          .lourdes-chat-controls { padding: 8px; }
        }
      `}</style>

      {!isOpen && (
        <button
          className="lourdes-chat-launcher"
          onClick={() => setIsOpen(true)}
          aria-label="Open chatbot"
        >
          <span className="lourdes-launcher-icon">✦</span>
          <span>Chat with us</span>
        </button>
      )}

      {isOpen && (
        <div className="lourdes-chat-window">
          <div className="lourdes-chat-header">
            <div className="lourdes-header-info">
              <div className="lourdes-bot-avatar">✦</div>
              <div>
                <h3>St. Lourdes Assistant</h3>
                <span className="lourdes-online-status">
                  <span className="lourdes-online-dot" />
                  Online | Here to help
                </span>
              </div>
            </div>

            <div className="lourdes-header-actions">
              <button
                onClick={resetConversation}
                title="New conversation"
                aria-label="New conversation"
              >
                ↻
              </button>
              <button
                onClick={() => setIsOpen(false)}
                title="Close chatbot"
                aria-label="Close chatbot"
              >
                ×
              </button>
            </div>
          </div>

          <div className="lourdes-chat-body">
            <div className="lourdes-messages">
              {messages.map((message) => (
                <div
                  key={message.id}
                  className={`lourdes-message-row ${
                    message.sender === "user" ? "user-row" : "bot-row"
                  }`}
                >
                  {message.sender === "bot" && (
                    <div className="lourdes-message-avatar">✦</div>
                  )}

                  <div
                    className={`lourdes-message ${
                      message.sender === "user" ? "user-message" : "bot-message"
                    }`}
                  >
                    <p>{message.text}</p>
                  </div>

                  {message.sender === "user" && (
                    <div className="lourdes-user-avatar">You</div>
                  )}
                </div>
              ))}

              {typing && (
                <div className="lourdes-message-row bot-row">
                  <div className="lourdes-message-avatar">✦</div>
                  <div className="lourdes-typing">
                    <span />
                    <span />
                    <span />
                  </div>
                </div>
              )}

              {!typing && (
                <>
                  <p className="lourdes-section-label">{menuTitles[menu]}</p>
                  {renderOptions(menuOptions[menu])}

                  {menu !== "main" && (
                    <div className="lourdes-nav-row">
                      <button
                        type="button"
                        onClick={() => handleOption("previous-menu", "Previous Menu")}
                      >
                        ‹ Previous Menu
                      </button>
                      <button
                        type="button"
                        onClick={() => handleOption("main-menu", "Main Menu")}
                      >
                        ⌂ Main Menu
                      </button>
                    </div>
                  )}

                  <button
                    type="button"
                    className="lourdes-reset-button"
                    onClick={() => handleOption("reset", "Start New Conversation")}
                  >
                    ↻ Start New Conversation
                  </button>
                </>
              )}

              <div ref={messagesEndRef} />
            </div>
          </div>

          <div className="lourdes-chat-controls">
            <form
              className="lourdes-input-area"
              onSubmit={(event) => {
                event.preventDefault();
                handleSend();
              }}
            >
              <input
                type="text"
                placeholder="Type your question..."
                value={input}
                onChange={(event) => setInput(event.target.value)}
                disabled={typing}
              />

              <button
                type="submit"
                disabled={!input.trim() || typing}
                aria-label="Send message"
              >
                ➤
              </button>
            </form>

            <div className="lourdes-chat-footer">
              Powered by <strong>St. Lourdes Engineering College</strong>
            </div>
          </div>
        </div>
      )}
    </>
  );
};

const Chatbot: React.FC = () => {
  const { openModal } = useAdmissionModal();

  return <ChatbotView onOpenAdmission={openModal} />;
};

export default Chatbot;