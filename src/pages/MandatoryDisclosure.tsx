import { useEffect, useRef, useState, type ReactNode, type ElementType } from "react";
import {
  Landmark, Users, Network, MessageSquare, ShieldCheck, HeartHandshake,
  Scale, Award, GraduationCap, ArrowRight, Home, FileText, CheckCircle2,
  CalendarDays, UserRound, Info, ClipboardList, BookOpen, ChevronRight,
  Phone, Mail, Building2, ListChecks,
} from "lucide-react";

const sections = [
  { id: "institution", number: "01", title: "Institutional Details", description: "Institution profile, management, principal and affiliation", icon: Landmark },
  { id: "approval", number: "02", title: "AICTE Approval & Affiliation", description: "Approval letters, affiliation and sanctioned intake", icon: FileText },
  { id: "governance", number: "03", title: "Governance", description: "Board meetings, faculty and student participation", icon: Users },
  { id: "organization", number: "04", title: "Organizational Chart", description: "Institutional hierarchy and department responsibilities", icon: Network },
  { id: "grievance", number: "05", title: "Grievance Redressal", description: "Grievance committees, procedures and complaint resolution", icon: MessageSquare },
  { id: "anti", number: "06", title: "Anti-Ragging Committee", description: "Anti-ragging committee, squad and student protection", icon: ShieldCheck },
  { id: "icc", number: "07", title: "Internal Complaints Committee (ICC)", description: "Women's safety, empowerment and complaint handling", icon: HeartHandshake },
  { id: "scst", number: "08", title: "SC/ST & Equal Opportunity", description: "Student welfare, inclusion and equal opportunity", icon: Scale },
  { id: "iqac", number: "09", title: "Internal Quality Assurance Cell", description: "IQAC objectives, strategies, functions and benefits", icon: Award },
  { id: "programmes", number: "10", title: "Programmes & Best Practices", description: "Approved programmes, intake and institutional practices", icon: GraduationCap },
];

const grievanceMembers = [
  ["1", "Dr. SURESH MOHAN KUMAR P", "Principal", "CHAIR PERSON"],
  ["2", "Mrs. SUVARNAVANI V", "Associate Professor", "HEAD OF COMMITTEE"],
  ["3", "Mr. PAUL BARNABAS C", "TAMILNADU CONSUMER PROTECTION ORGANIZATION", "MEMBER"],
  ["4", "Dr. PANNEERSELVAM TD", "MADRAS HIGHCOURT LAWYER", "MEMBER"],
  ["5", "Mr. SIVAMURUGAN J", "HEAD OF THE DEPARTMENT", "MEMBER"],
];

const antiRaggingCommittee = [
  ["1", "Dr. SURESH MOHAN KUMAR P", "Principal", "CHAIR PERSON", "PRINCIPAL448 @GMAIL.COM"],
  ["2", "Mr. CHARLES C", "Police Department", "CONVENOR", "CONTACTUS.MIET1243@GMAIL.COM"],
  ["3", "Mr. SUNDARAMOORTHY S", "Revenue/Taluk/Civil/Officers", "MEMBER", "CONTACTUS.MIET1243@GMAIL.COM"],
  ["4", "Mr. JOSEPH EMMANUEL S", "Official of NGO", "MEMBER", "JOSEPHEMMANUEL@GMAIL.COM"],
  ["5", "Mr. MURUGA R", "Representatives of parents", "MEMBER", "MURUGANDINESH25@GMAIL.COM"],
  ["6", "Ms. VYANNI SHINEY STEPHY G", "Representatives of Students", "MEMBER", "SHINEYGGREGORY474@GMAIL.COM"],
  ["7", "Mr. RAJENDRAN D", "Representatives Non-Teaching", "MEMBER", "CONTACTUS1243.MIET@GMAIL.COM"],
];

const antiRaggingSquad = [
  ["1", "Dr. SURESH MOHAN KUMAR P", "PRINCIPAL", "CHAIR PERSON", "9444803122", "PRINCIPAL448@GMAIL.COM"],
  ["2", "Mr. SIVAMURUGAN J", "HOD CSE", "CONVENOR", "9840375699", "jpsiva715@gmail.com"],
  ["3", "Mr. VIDHYA K", "HOD AI&DS", "CO-CONVENOR", "9597530454", "DASARADHANDK@GMAIL.COM"],
  ["4", "Mr. Maria Lenin Prathap J", "Assistant Professor", "MEMBER", "8056002675", "MARIALENINPRATHAP@GMAIL.COM"],
  ["5", "Mrs. Karthiga C", "Assistant Professor", "MEMBER", "7871612849", "Karthigaece.miet@gmail.com"],
  ["6", "Mr. Mohammed Yusuf Ansari P", "Assistant Professor", "MEMBER", "9952773854", "YUSUFANSARI2410@GMAIL.COM"],
  ["7", "Mr. Rajendran D", "Assistant Professor", "MEMBER", "9043922537", "contactus.miet1243@gmail.com"],
];

const iccMembers = [
  ["1", "Mr. J. Sivamurugan", "Chair Person", "Senior Faculty Member", "Asso Prof", "9840375699", "jpsiva715@gmail.com"],
  ["2", "Mr. John S Kumar", "Member", "Asst Prof", "Asst Prof", "9003099110", "Premilakumar2009@gmail.com"],
  ["3", "Mrs. V. Suvarnavani", "Member", "Asst Prof", "Asst Prof", "8608247884", "SUVARNA VANI.ECE@MIETCHENNAI.IN"],
  ["4", "Mr. D. Sekar", "Member", "Senior Lab Assistant", "Non-Teaching", "9498053180", "sekard1423@gmail.com"],
  ["5", "Mr. D. Rajenthiran", "Member", "Senior Lab Assistant", "Non-Teaching", "9566138059", "rajudraikannu@gmail.com"],
  ["6", "Ms. T. Banumathi", "Member", "Student", "Student", "9176202410", "ashokashokraja303@gmail.com"],
  ["7", "Mr. J. Dinesh", "Member", "Student", "Student", "9710260387", "dinesh7777priya@gmail.com"],
  ["8", "As. N. Rubiya", "Member", "Student", "Student", "7299329309", "nrubythomas@gmail.com"],
];

const scstMembers = [
  ["1", "Dr. P. Suresh Mohan Kumar", "Principal", "Chairman", "9444803122"],
  ["2", "Mr. J. Sivamurugan", "Associate Professor", "Member", "9840375699"],
  ["3", "Mr. John S Kumar", "Associate Professor", "Member", "9003099110"],
  ["4", "Mrs. R Ramya", "Assistant Professor", "Member", "9787622867"],
  ["5", "Mr. Stefan Juan Weston", "Assistant Professor", "Member", "8220763025"],
  ["6", "Mrs. M. Chandraprabha", "Assistant Professor", "Member", "9551036177"],
];

const orgTree: OrgNode = {
  label: "Governing Body",
  children: [{ label: "Chairman", children: [{ label: "Principal", side: "IQAC Coordinator", children: [
    { label: "Head of the Department", children: [{ label: "Teaching Members" }, { label: "Non-Teaching Members" }] },
    { label: "Administrative Office", children: [
      { label: "Dispatch Section", children: [{ label: "Account Section", children: [{ label: "Establishment Section", children: [{ label: "Student Section" }] }] }] },
      { label: "Transport Section" },
      { label: "Maintenance Section", children: [{ label: "Supervisor / Civil / Electrical" }, { label: "Security" }, { label: "Stores" }] },
      { label: "Dispensary" }, { label: "Canteen" },
      { label: "Hostel / Mess", children: [{ label: "Deputy Warden / Hostel Staff" }, { label: "Mess Staff" }] },
    ] },
    { label: "Training & Placement" }, { label: "Alumni Cell" }, { label: "Physical Education" },
    { label: "Library" }, { label: "Cells and Committees Members" },
  ] }] }],
};

type OrgNode = { label: string; side?: string; children?: OrgNode[] };

type TableProps = { headers: string[]; rows: string[][]; emailColumns?: number[] };
function DataTable({ headers, rows, emailColumns = [] }: TableProps) {
  return <div className="md-table-wrap"><table className="md-table"><thead><tr>{headers.map((h) => <th key={h}>{h}</th>)}</tr></thead><tbody>{rows.map((row, i) => <tr key={`${row[0]}-${i}`}>{row.map((cell, j) => <td key={j}>{emailColumns.includes(j) ? <a href={`mailto:${cell}`}>{cell}</a> : cell}</td>)}</tr>)}</tbody></table></div>;
}

function InfoNote({ children }: { children: ReactNode }) { return <div className="md-information-note"><Info size={19} /><p>{children}</p></div>; }
function Subheading({ children }: { children: ReactNode }) { return <h3 className="md-subheading">{children}</h3>; }
function BulletList({ items }: { items: string[] }) { return <ul className="md-bullet-list">{items.map((x, i) => <li key={i}>{x}</li>)}</ul>; }

export default function MandatoryDisclosure() {
  const [selected, setSelected] = useState("institution");
  const detailRef = useRef<HTMLElement>(null);
  const current = sections.find((x) => x.id === selected) ?? sections[0];
  const CurrentIcon = current.icon;

  useEffect(() => {
    const elements = document.querySelectorAll(".md-reveal");
    const observer = new IntersectionObserver((entries) => entries.forEach((entry) => {
      if (entry.isIntersecting) entry.target.classList.add("md-visible");
      else entry.target.classList.remove("md-visible");
    }), { threshold: 0.08, rootMargin: "0px 0px -25px 0px" });
    elements.forEach((el) => observer.observe(el));
    return () => observer.disconnect();
  }, [selected]);

  const selectSection = (id: string) => {
    setSelected(id);
    window.setTimeout(() => detailRef.current?.scrollIntoView({ behavior: "smooth", block: "nearest" }), 120);
  };

  return <main className="mandatory-page">
    <style>{styles}</style>
    <section className="md-hero"><div className="md-hero-inner"><div className="md-hero-icon"><FileText size={58} strokeWidth={1.5} /></div><div className="md-hero-content"><span className="md-hero-label">REGULATORY INFORMATION</span><h1>Mandatory Disclosure</h1><p>Transparency · Governance · Institutional Information</p></div></div></section>
    <div className="md-breadcrumb"><div className="md-container"><Home size={14} /><span>Home</span><ChevronRight size={13} /><span>About Us</span><ChevronRight size={13} /><strong>Mandatory Disclosure</strong></div></div>
    <section className="md-main md-container">
      <div className="md-heading md-reveal" data-direction="left"><div className="md-heading-left"><span className="md-heading-line" /><div><h2>Explore Disclosure Sections</h2><p>Select a category to view its information below.</p></div></div><div className="md-count"><ClipboardList size={23} /><span>10 SECTIONS</span></div></div>
      <div className="md-section-grid">{sections.map((section, index) => { const Icon = section.icon; const active = selected === section.id; return <button type="button" key={section.id} className={`md-section-card md-reveal ${active ? "active" : ""}`} data-direction={index % 2 === 0 ? "left" : "right"} onClick={() => selectSection(section.id)} aria-pressed={active}><div className="md-card-icon"><Icon size={34} strokeWidth={1.9} /></div><div className="md-card-content"><h3>{section.title}</h3><p>{section.description}</p></div><div className="md-card-number">{section.number}</div><div className="md-card-arrow"><ArrowRight size={19} /></div></button>; })}</div>
      <section className="md-detail-panel md-reveal" data-direction="right" ref={detailRef} key={selected}>
        <div className="md-detail-heading"><div><span className="md-detail-eyebrow">SELECTED DISCLOSURE · {current.number}</span><h2>{current.title}</h2></div><div className="md-detail-icon"><CurrentIcon size={43} strokeWidth={1.8} /></div></div>
        <div className="md-detail-divider" />
        {selected === "institution" && <InstitutionDetails />}
        {selected === "approval" && <ApprovalDetails />}
        {selected === "governance" && <GovernanceDetails />}
        {selected === "organization" && <OrganizationalChart />}
        {selected === "grievance" && <GrievanceDetails />}
        {selected === "anti" && <AntiRaggingDetails />}
        {selected === "icc" && <ICCDetails />}
        {selected === "scst" && <SCSTDetails />}
        {selected === "iqac" && <IQACDetails />}
        {selected === "programmes" && <ProgrammesDetails />}
      </section>
      <div className="md-footer md-reveal" data-direction="left"><span>ST. Lourdes Engineering College</span><div className="md-footer-line" /><strong>MANDATORY DISCLOSURE</strong></div>
    </section>
  </main>;
}

function InstitutionDetails() {
  const institutionRows = [
    ["Name of the Institution", "ST LOURDES ENGINEERING COLLEGE"],
    ["Address of the Institution", "Irandamkattalai, Anagaputhur, Chennai"],
    ["City & Pin code", "Chennai – 600 128"],
    ["State/UT", "Tamil Nadu"],
    ["Longitude & Latitude", "Longitude = 80° 07’ 21.26” E; Latitude = 12° 59’ 18.30” N"],
    ["Phone number with STD code", "044-24780711"],
    ["Fax number with STD code", ""],
    ["Office hours at the Institution", "08.45 A.M to 05.00 P.M."],
    ["Academic hours at the Institution", "09.00 A.M to 3.30 P.M"],
    ["Email", "principal@slec.edu.in; principal448@gmail.com"],
    ["Website", "www.slec.edu.in"],
    ["Nearest Railway Station (dist in Km)", "Pallavaram – 5 KM"],
    ["Nearest Airport (dist in Km)", "Chennai Airport – 8 KM"],
  ];
  const typeRows = [
    ["Type of Institution", "Private-Self Financed"],
    ["Category (1) of the Institution", "Non Minority"],
    ["Category (2) of the Institution", "Co-Ed"],
  ];
  const organizationRows = [
    ["Name of the organization running the Institution", "Loordhu Ammal Educational Trust"],
    ["Type of the organization", "Trust"],
    ["Address of the organization", "Plot No 6, Dhanalakshmi Street, Janaki Nagar, Valasaravakkam, Chennai – 600 087"],
    ["Registered with", "Sub Registrar, Kundrathur"],
    ["Registered Date", "13/08/1999"],
    ["Website of the Organization", "www.slec.edu.in"],
  ];
  const principalRows = [
    ["Name of Principal", "Dr. P. Suresh Mohan Kumar"],
    ["Exact Designation", "Principal"],
    ["Phone number with STD code", "044-24780711 / +91-9444803122"],
    ["FAX number with STD code", ""],
    ["Email", "principal@slec.edu.in, principal448@gmail.com"],
    ["Highest Degree", "Ph.D"],
    ["Field of specialization", "Mechanical Engineering"],
  ];
  const universityRows = [
    ["Name of the affiliating University", "Anna University, Chennai"],
    ["Address", "Guindy, Chennai – 600 025"],
    ["Website", "www.annauniv.edu"],
    ["Latest affiliation period", "2025 – 2026"],
  ];
  return <div className="md-content-body">
    <Subheading>Name of the Institution</Subheading>
    <DataTable headers={["Particulars", "Details"]} rows={institutionRows} />
    <Subheading>Type of Institution</Subheading>
    <DataTable headers={["Particulars", "Details"]} rows={typeRows} />
    <Subheading>Name of the Organization Running the Institution</Subheading>
    <DataTable headers={["Particulars", "Details"]} rows={organizationRows} />
    <Subheading>Name of the Principal</Subheading>
    <DataTable headers={["Particulars", "Details"]} rows={principalRows} />
    <Subheading>Name of the Affiliated University</Subheading>
    <DataTable headers={["Particulars", "Details"]} rows={universityRows} />
  </div>;
}
function ApprovalDetails() {
  const rows = [["Mandatory Disclosure", "Updated on February 2026"], ["AICTE File Number", "F. No. Southern/1-44643622820/2025/EOA/Corrigendum-1"], ["Date of Approval", "22-May-2025"], ["Approval Period", "2025–2026"], ["Affiliating University", "Anna University, Chennai"]];
  return <div className="md-content-body"><Subheading>AICTE Approval Information</Subheading><DataTable headers={["Mandatory Disclosure", "Details"]} rows={rows} /><div className="md-feature-card"><FileText size={30} /><h4>AICTE Extension of Approval</h4><p>Official approval document for the institution.</p><a href="/documents/aicte-mandatory-disclosure.pdf" target="_blank" rel="noreferrer">View PDF <ArrowRight size={15} /></a></div></div>;
}

function GovernanceDetails() {
  return <div className="md-content-body">
    <GovernanceCard icon={CalendarDays} title="Frequency of the Board Meeting and Academic Advisory Body">Yearly Twice</GovernanceCard>
    <GovernanceCard icon={Users} title="Nature and Extent of Involvement of Faculty and Students in Academic Affairs / Improvements">The faculty and the students collaborate and engage in developing and improving the academic activities related to curriculum design and development; course content preparation; feedback system development; and design and integration of students’ portfolio components. Faculty and students work together to identify the gap areas and lapses in the academic sphere comprising of curricular and co-curricular activities at SLEC and provide suggestions or guidelines for improving the current system at regular intervals.</GovernanceCard>
    <GovernanceCard icon={MessageSquare} title="Grievance Redressal Mechanism for Faculty, Staff and Students"><p>The institution has a formal grievance redressal mechanism for students and staff. The committee details and the complete grievance procedure are provided in the Grievance Redressal section.</p><DataTable headers={["S.No", "Name", "Designation", "Category"]} rows={grievanceMembers} /></GovernanceCard>
    <GovernanceCard icon={MessageSquare} title="Student Feedback on Institutional Governance / Faculty Performance">Student feedback is collected systematically through the online mode on an average of two times each semester on different aspects of faculty performance.</GovernanceCard>
  </div>;
}

function GovernanceCard({ icon: Icon, title, children }: { icon: ElementType; title: string; children: ReactNode }) {
  return <div className="md-governance-card"><div className="md-governance-icon"><Icon size={27} /></div><div className="md-governance-table-content"><h4>{title}</h4><div className="md-governance-text">{children}</div></div></div>;
}

function OrgBranch({ node, depth }: { node: OrgNode; depth: number }) {
  const tone = depth <= 2 ? "main" : "dept";
  return <li><div className="md-tree-row"><div className={`md-tree-box ${tone}`}>{node.label}</div>{node.side && <><span className="md-tree-link" aria-hidden="true" /><div className="md-tree-box side">{node.side}</div></>}</div>{node.children && <ul>{node.children.map((child) => <OrgBranch key={child.label} node={child} depth={depth + 1} />)}</ul>}</li>;
}
function OrganizationalChart() {
  return <div className="md-content-body"><Subheading>Institutional Organizational Structure</Subheading><p className="md-tree-hint">Scroll sideways to view the complete chart.</p><div className="md-tree-scroll" role="img" aria-label="Organizational chart of St. Lourdes Engineering College"><div className="md-tree"><ul><OrgBranch node={orgTree} depth={0} /></ul></div></div><InfoNote>The organizational chart above presents the institutional hierarchy and the administrative and academic sections.</InfoNote></div>;
}

function GrievanceDetails() {
  return <div className="md-content-body">
    <Subheading>Grievance Redressal Committee</Subheading>
    <p className="md-description">To redress the individual and collective grievances of the students and the staff at SLEC, a grievance redressal mechanism has been devised. An informal grievance redressal system was previously in place under the direct supervision of the Principal of the institution. However, a formal system was put in place with the provision of suggestion boxes to address the lodged grievances and judge each one through its merit. This also includes matters of harassment or bullying. Anyone with a grievance may also approach the department members in person directly or consult with the Officer-in-Charge of the Students’ Grievance Cell. However, aggrieved persons who are unwilling to appear directly could use the letterbox / suggestion box of the Grievance Cell at the Administrative Block.</p>
    <Subheading>The Grievances May Broadly Include the Following Complaints of the Aggrieved Students</Subheading>
    <BulletList items={["Academic", "Non-Academic", "Grievance related to Assessment", "Grievance related to Victimization", "Grievance related to Attendance", "Grievance related to charging of fees", "Grievance regarding conducting of Examinations", "Harassment by colleague students or the teachers etc."]} />
    <p className="md-description">There will be Grievance Redressal Committees at the Department / Institutes / central level to deal with the grievances of the students and staff.</p>
    <Subheading>Department Grievance Committee</Subheading>
    <BulletList items={["Head of the Department – Chairman", "Up to 3 faculties to be nominated by the Head of Department"]} />
    <p className="md-description">This committee will deal with the Grievance related to Academic and Administrative matters of the Department.</p>
    <Subheading>Institute Level Grievance Committee</Subheading>
    <BulletList items={["Senior faculty – Chairman", "Up to 5 senior faculties to be appointed by the Head of Institute as members"]} />
    <p className="md-description">This committee is responsible for all the grievances directly related to the academic and administrative complaints at the institution. Additionally, the committee will also adjudicate appeals filed by a student against the decision of the Department-level Committee for the same purpose.</p>
    <Subheading>Central Grievance Redressal Committee</Subheading>
    <BulletList items={["Principal", "Convener of the Faculty concerned", "Head of the Department concerned", "Senior Professor"]} />
    <p className="md-description">This central committee is responsible for all the grievances directly related to the academic and administrative complaints at the institution. Additionally, the committee will also adjudicate appeals filed by a student against the decisions of the Institution-level Committee.</p>
    <Subheading>Procedure for Redressal of Grievances</Subheading>
    <ol className="md-number-list">
      <li>An aggrieved student who has the Grievance or Grievances at the Department level shall make an application first to the HOD. The Head of the Department after verifying the facts will try to redress the grievance within a reasonable time.</li>
      <li>If the student is not satisfied with the verdict or solution of the HOD, then the same should be placed before the Department level committee.</li>
      <li>If the student is not satisfied with the decision of Department committee, he/she can submit an appeal to the Institute level grievance committee within a week from the date of the receipt of the reply from the Department level committee. The convenor of Institute grievance committee, after verifying the facts and the papers concerned and conducting one or more discussions with the Chairman of the Department committee will place the matter before the Institute level committee which shall either endorse the decision of the Department level committee or shall pass appropriate order in the best possible manner within reasonable time.</li>
      <li>If the student is further dissatisfied with the Redressal offered by the Institute level committee and feels that his/her Grievance is not redressed appropriately, he/she can submit an appeal to the Central Grievance Redressal Committee within a week from the date of receipt of decision with the relevant details. While dealing with the complaint the committee at all levels will observe law of natural justice and hear the complainant and concerned people. While passing an order on any Grievance at any level the relevant provisions of Act / Regulations should be kept in mind and no such order should be passed in contradiction of the same. The student will submit the application of Grievance or appeal to the Institute level committee or Central Grievance Redressal committee, as the case may be, through the Head of Department and Head of Institute concerned.</li>
    </ol>
    <Subheading>Grievance Redressal Committee Members</Subheading>
    <DataTable headers={["S.No", "Name", "Designation", "Category"]} rows={grievanceMembers} />
  </div>;
}

function AntiRaggingDetails() {
  return <div className="md-content-body">
    <Subheading>Anti-Ragging Committee</Subheading>
    <p className="md-description">The institution maintains an anti-ragging mechanism to ensure a safe, respectful and supportive campus environment for all students.</p>
    <DataTable headers={["S.No", "Name", "Designation", "Position", "Contact Details"]} rows={antiRaggingCommittee} emailColumns={[4]} />
    <Subheading>Anti-Ragging Squad</Subheading>
    <DataTable headers={["S.No", "Name", "Designation", "Position", "Phone", "Email"]} rows={antiRaggingSquad} emailColumns={[5]} />
    <InfoNote>Students may contact the designated committee or squad members using the contact details listed above to report ragging-related concerns.</InfoNote>
  </div>;
}

function ICCDetails() {
  return <div className="md-content-body">
    <Subheading>Establishment of Internal Committee (IC) – Internal Complaints Committee (ICC)</Subheading>
    <p className="md-description">As per section 4 of the Sexual Harassment of Women at Workplace (Prevention, Prohibition and Redressal) Act, 2013.</p>
    <DataTable headers={["Sl. No.", "Name", "Position", "Category", "Designation / Occupation", "Mobile Numbers", "E-mail ID"]} rows={iccMembers} emailColumns={[6]} />
    <Subheading>Establishment of Internal Complaints Committee (ICC)</Subheading>
    <p className="md-description">The Women’s Grievance & Empowerment Cell which is also called Internal Complaints Committee (ICC) was reconstituted on 1st July 2024.</p>
    <p className="md-description">The committee is required to review periodically the empowerment & awareness programmes of women faculty, staff and girl students of the college for enhancing their role adopting specific strategies in achieving upward mobility.</p>
    <p className="md-description">The committee is also required to redress the grievances of the women faculty, staff and girl students of the college by analyzing, scrutinizing and making proper enquiries. Periodically, the reports shall be submitted to the Principal / Management for his / their perusal and to initiate necessary action.</p>
  </div>;
}

function SCSTDetails() {
  return <div className="md-content-body">
    <Subheading>SC/ST Committee</Subheading>
    <p className="md-description">The institution supports student welfare, inclusion and equal opportunity through its SC/ST Committee and Equal Opportunity Facilities Cell.</p>
    <DataTable headers={["S. No.", "Name", "Designation", "Position", "Mobile No."]} rows={scstMembers} />
    <Subheading>Equal Opportunity Facilities Cell</Subheading>
    <p className="md-description">The Equal Opportunity Facilities Cell supports an inclusive institutional environment and encourages equitable access to academic and institutional opportunities for students.</p>
  </div>;
}

function IQACDetails() {
  return <div className="md-content-body">
    <Subheading>Internal Quality Assurance Cell (IQAC)</Subheading>
    <p className="md-description">The prime task of the IQAC is to develop a system for conscious, consistent, and catalytic improvement in the overall performance of institution. The IQAC is a part of the institution’s system and work towards realization of the goals of quality enhancement and sustenance. It channelizes all efforts and measures of the institution towards promoting its holistic academic excellence.</p>
    <Subheading>Objectives</Subheading>
    <p className="md-description"><strong>The primary aim of IQAC is:</strong></p>
    <BulletList items={["To develop a system for conscious, consistent and catalytic action to improve the academic and administrative performance of the institution.", "To promote measures for institutional functioning towards quality enhancement through internalization of quality culture and institutionalization of best practices."]} />
    <Subheading>Strategies</Subheading>
    <BulletList items={["Ensuring timely, efficient and progressive performance of academic, administrative and financial tasks.", "Examining the relevance and quality of academic and research programmes.", "Instituting equitable access to and affordability of academic programmes for various sections of society.", "Optimization and integration of modern methods of teaching and learning.", "Evaluating the credibility of evaluation procedures.", "Ensuring the adequacy, maintenance and functioning of the support structure and services.", "Establishing research sharing and networking with other institutions in India and abroad."]} />
    <Subheading>Functions</Subheading>
    <p className="md-description"><strong>Some of the functions expected of the IQAC are:</strong></p>
    <ol className="md-number-list">
      <li>Development and application of quality benchmarks / parameters for various academic and administrative activities of the institution.</li>
      <li>Facilitating the creation of a learning environment for students in SLEC to give quality of education and faculty maturation to adopt the required knowledge and technology for participatory teaching and learning process.</li>
      <li>Arrangement for feedback response from students, parents and other stakeholders on quality related institutional processes.</li>
      <li>Dissemination of information on various quality parameters of higher education.</li>
      <li>Organization of inter and intra institutional workshops, seminars on quality related themes and promotion of quality circles.</li>
      <li>Documentation of the various programmes / activities leading to quality improvement.</li>
      <li>Acting as a nodal agency of the Institution for coordinating quality-related activities, including adoption and dissemination of best practices.</li>
      <li>Development and maintenance of institutional data base through MIS for the purpose of maintaining / enhancing the institutional quality.</li>
      <li>Development of Quality Culture in the institution.</li>
    </ol>
    <Subheading>Benefits</Subheading>
    <p className="md-description"><strong>IQAC will facilitate / contribute:</strong></p>
    <ol className="md-number-list">
      <li>Ensure heightened level of clarity and focus in institutional functioning towards quality enhancement.</li>
      <li>Ensure internalization of the quality culture.</li>
      <li>Ensure enhancement and coordination among various activities of the institution and institutionalize all good practices.</li>
      <li>Provide a sound basis for decision-making to improve institutional functioning.</li>
      <li>Act as a dynamic system for quality changes in Higher Educational Institutions.</li>
      <li>Build an organized methodology of documentation and internal communication.</li>
    </ol>
  </div>;
}

function ProgrammesDetails() {
  const programmeRows = [
    ["UG Courses", "", ""], ["B.E. Degree", "", ""],
    ["1.", "B. E. Computer Science and Engineering", "60"],
    ["2.", "B. E. Electronics and Communication Engineering", "60"],
    ["3.", "B. E., Computer Science and Engineering (Cyber Security)", "60"],
    ["B.Tech. Degree", "", ""],
    ["4.", "B.Tech. Information Technology", "60"],
    ["5.", "B.Tech. Artificial Intelligence and Data Science", "60"],
    ["PG Courses", "", ""],
    ["6.", "M. E., Computer Science and Engineering", "18"],
    ["7.", "MBA", "60"],
  ];
  const practices = [
    "The course coordinator system has been continued.",
    "Conduct of subject based Seminars and workshops have been continued.",
    "Involvement of students in various committees.",
    "Practice of conducting Guest lectures, Industrial visits and Industrial training has been enhanced.",
    "The functioning of Research groups to promote better quality research has been strengthened.",
    "Certification programs as well as technology training is focused by various departments.",
    "Continuous inputs from all stakeholders are being implemented to improve the curriculum on regular basis.",
    "Professional ethics course has been introduced in the curriculum.",
    "Additional Training on communication skills and soft skills is further increased as per the market demand.",
    "Research aptitude among the students is inculcated through project implementations.",
    "An Advisory Committee has been formulated for every department with suitable external members.",
    "Institute has signed some MOUs and established collaborations with reputed organizations and institutions.",
    "Participation of students in Sports & NSS activities as well as cultural events is considered mandatory.",
  ];
  return <div className="md-content-body">
    <Subheading>Name of Programmes Approved by AICTE</Subheading>
    <DataTable headers={["Category / S.No.", "Programmes", "Sanctioned Intake (2025)"]} rows={programmeRows} />
    <Subheading>Best Practices Adopted, If Any</Subheading>
    <p className="md-description">Some best practices followed at our Institution to improve values and qualities are listed below.</p>
    <ol className="md-number-list">{practices.map((practice) => <li key={practice}>{practice}</li>)}</ol>
  </div>;
}

const styles = `
.mandatory-page{--md-maroon:#590c26;--md-deep:#68132e;--md-red:#8c1d3d;--md-gold:#c99735;--md-cream:#fffaf5;width:100%;overflow:hidden;background:var(--md-cream);color:#402b31;font-family:inherit;position:relative;isolation:isolate}
.mandatory-page *{box-sizing:border-box}.md-container{width:min(94%,1500px);margin:0 auto}
.md-hero{position:relative;z-index:0;min-height:255px;display:flex;align-items:center;overflow:hidden;padding:75px 7% 26px;background:linear-gradient(105deg,rgba(61,5,25,.98),rgba(91,10,39,.95) 42%,rgba(112,19,52,.86) 72%,rgba(83,12,36,.84)),url('/images/mandatory-disclosure-banner.jpg') center 48%/cover no-repeat,#590c26}
.md-hero:before{content:"";position:absolute;inset:0;pointer-events:none;background:radial-gradient(ellipse at 82% 22%,rgba(255,218,151,.16),transparent 36%),linear-gradient(90deg,rgba(35,0,13,.18),transparent 68%);z-index:1}.md-hero:after{content:"";position:absolute;z-index:2;left:0;right:0;bottom:0;height:5px;background:linear-gradient(90deg,#b77b20,#f1cf78,#b77b20)}
.md-hero-inner{position:relative;z-index:3;width:min(92%,1400px);margin:0 auto;display:flex;align-items:center;gap:25px;padding:105px 0 58px}.md-hero-icon{color:#f1c64f;display:flex;align-items:center;justify-content:center;min-width:78px;filter:drop-shadow(0 5px 12px rgba(0,0,0,.18));animation:md-enter .85s both}.md-hero-content{min-width:0;max-width:850px;animation:md-enter .85s .08s both}.md-hero-label{display:block;color:#f5d16f;font-size:12px;font-weight:800;letter-spacing:3px;margin-bottom:9px}.md-hero-content h1{color:#fffaf5;font-family:Georgia,serif;font-size:clamp(28px,4vw,40px);line-height:1.08;margin:0 0 9px}.md-hero-content p{color:rgba(255,241,235,.92);font-size:14px;line-height:1.6;margin:0}@keyframes md-enter{from{opacity:0;transform:translateY(14px)}to{opacity:1;transform:translateY(0)}}
.md-breadcrumb{background:linear-gradient(90deg,#76132f,#971f43);color:#fff;padding:10px 0;font-size:12px}.md-breadcrumb .md-container{display:flex;align-items:center;gap:9px}.md-breadcrumb strong{color:#ffe4a3}.md-main{padding-top:25px;padding-bottom:25px}.md-heading{display:flex;align-items:center;justify-content:space-between;gap:20px;margin-bottom:23px}.md-heading-left{display:flex;align-items:center;gap:17px}.md-heading-line{width:9px;height:55px;border-radius:20px;background:linear-gradient(#e6b43e,#bd8219);flex-shrink:0}.md-heading h2{font-family:Georgia,serif;font-size:clamp(23px,3vw,32px);color:#68132e;margin:0 0 4px}.md-heading p{font-size:14px;color:#000000;margin:0}.md-count{display:flex;align-items:center;gap:10px;padding:12px 17px;background:linear-gradient(135deg,#fff1d4,#ffe1a8);border:1px solid #f0d29a;border-radius:12px;color:#72142f;font-weight:800;font-size:13px;white-space:nowrap}
.md-section-grid{display:grid;grid-template-columns:repeat(2,minmax(0,1fr));gap:11px 13px;margin-bottom:20px}.md-section-card{position:relative;min-height:80px;width:100%;display:flex;align-items:center;gap:17px;padding:12px 46px 12px 19px;text-align:left;border:1px solid #e6d8cf;border-radius:14px;background:linear-gradient(120deg,#fff,#fffaf6);color:#68132e;cursor:pointer;overflow:hidden;box-shadow:0 3px 7px rgba(81,35,38,.045);transition:.35s}.md-section-card:hover{transform:translateY(-3px);border-color:#c79b48;box-shadow:0 8px 18px rgba(91,23,45,.1)}.md-section-card.active{background:linear-gradient(115deg,#590c26,#8a183b);border:2px solid #d9ad4c;box-shadow:0 6px 18px rgba(87,12,37,.17);color:#fff}.md-card-icon{width:69px;height:55px;min-width:69px;display:flex;align-items:center;justify-content:center;border-radius:15px;background:linear-gradient(135deg,#fff0db,#ffead1);color:#74132f}.md-card-content{flex:1;min-width:0}.md-card-content h3{font-family:Georgia,serif;color:inherit;font-size:17px;line-height:1.3;margin:0 0 5px}.md-card-content p{color:#000000;font-size:12px;line-height:1.45;margin:0}.md-section-card.active .md-card-content p{color:#f7e4e8}.md-card-number{position:absolute;top:9px;right:15px;color:#b47712;font-size:16px;font-weight:800}.md-section-card.active .md-card-number{color:#f2cf69}.md-card-arrow{position:absolute;right:15px;bottom:12px;width:27px;height:27px;border:1.5px solid #bd801d;border-radius:50%;display:flex;align-items:center;justify-content:center;color:#a56b11}.md-section-card.active .md-card-arrow{color:#f2cf69;border-color:#f2cf69;transform:rotate(-45deg)}
.md-detail-panel{padding:22px 25px;border:1px solid #e4c9b8;border-radius:15px;background:radial-gradient(circle at 100% 0%,rgba(205,153,72,.07),transparent 32%),linear-gradient(135deg,#fffefa,#fffaf5);box-shadow:0 5px 17px rgba(81,35,38,.045);animation:md-panel .5s both}@keyframes md-panel{from{opacity:0;transform:translateY(17px)}to{opacity:1;transform:translateY(0)}}.md-detail-heading{display:flex;align-items:center;justify-content:space-between;gap:15px}.md-detail-eyebrow{color:#aa721b;font-size:12px;letter-spacing:1.3px;font-weight:800;display:block;margin-bottom:5px}.md-detail-heading h2{font-family:Georgia,serif;font-size:clamp(24px,3vw,34px);color:#68132e;margin:0;line-height:1.2}.md-detail-icon{width:68px;height:62px;min-width:68px;display:flex;align-items:center;justify-content:center;background:#fff0e2;border:1px solid #efd5c2;border-radius:13px;color:#74142f}.md-detail-divider{height:1px;background:linear-gradient(90deg,#d29c39,#e8d6c6);margin:15px 0}.md-content-body{display:flex;flex-direction:column;gap:15px}.md-subheading{color:#74132e;background:linear-gradient(90deg,#fff0e7,#f4e0d8);border-radius:8px;padding:9px 13px;font-family:Georgia,serif;font-size:18px;margin:0}.md-description{color:#000000;font-size:14px;line-height:1.75;margin:0}.md-bullet-list,.md-number-list{color:#000000;font-size:14px;line-height:1.75;margin:0;padding-left:25px}.md-bullet-list li,.md-number-list li{padding:2px 0 5px}.md-info-grid{display:grid;grid-template-columns:repeat(4,minmax(0,1fr));gap:12px;margin-top:3px}.md-info-card{min-height:105px;padding:15px;display:flex;align-items:flex-start;gap:12px;background:linear-gradient(135deg,#fff8ef,#fff2e6);border:1px solid #ebd1b3;border-radius:11px;color:#79152f}.md-info-card div{display:flex;flex-direction:column;gap:9px}.md-info-card span{color:#a66a19;font-weight:700;font-size:12px}.md-info-card strong{color:#68132e;font-family:Georgia,serif;font-size:15px;line-height:1.4}.md-information-note{display:flex;align-items:flex-start;gap:10px;border-top:1px solid #eee0d5;padding-top:12px;color:#a06c17}.md-information-note p{color:#000000;font-size:12px;line-height:1.6;margin:0}
.md-governance-card{display:flex;align-items:flex-start;gap:15px;padding:13px;border:1px solid #f0e1d5;border-radius:11px;background:#fffdf9}.md-governance-icon{width:48px;height:48px;min-width:48px;border-radius:10px;background:#fff0d9;display:flex;align-items:center;justify-content:center;color:#8a1838}.md-governance-table-content{min-width:0;flex:1}.md-governance-card h4{color:#64122a;font-size:14px;font-weight:750;margin:2px 0 8px}.md-governance-text{color:#000000;font-size:13px;line-height:1.7}.md-governance-text p{margin:0 0 10px}.md-table-wrap{width:100%;overflow-x:auto;border:1px solid #ead7c8;border-radius:8px}.md-table{width:100%;border-collapse:collapse;font-size:12px;min-width:550px}.md-table thead{background:linear-gradient(90deg,#640e29,#8c1d3d);color:#fff}.md-table th{padding:11px 12px;text-align:left;font-weight:700;text-transform:uppercase;font-size:11px;white-space:nowrap}.md-table td{padding:10px 12px;color:#392b30;border-bottom:1px solid #eadbd1;line-height:1.5;vertical-align:top}.md-table td a{color:#781733;text-decoration:underline;overflow-wrap:anywhere}.md-table tbody tr:nth-child(even){background:#fff5ed}.md-table tbody tr:last-child td{border-bottom:0}
.md-tree-hint{display:none;margin:0;color:#8a6a3b;font-size:11px}.md-tree-scroll{--tree-line:#a96d2d;width:100%;overflow-x:auto;padding:26px 16px 30px;border:1px solid #ead9c9;border-radius:12px;background:radial-gradient(circle at 50% 0%,rgba(205,153,72,.09),transparent 45%),#fffaf4}.md-tree{display:flex;justify-content:center;width:max-content;min-width:100%}.md-tree ul{position:relative;display:flex;justify-content:center;margin:0;padding:22px 0 0;list-style:none}.md-tree>ul{padding-top:0}.md-tree li{position:relative;display:flex;flex-direction:column;align-items:center;padding:22px 7px 0}.md-tree>ul>li{padding-top:0}.md-tree li:before,.md-tree li:after{content:"";position:absolute;top:0;right:50%;width:50%;height:22px;border-top:2px solid var(--tree-line)}.md-tree li:after{right:auto;left:50%;border-left:2px solid var(--tree-line)}.md-tree li:only-child{padding-top:0}.md-tree li:only-child:before,.md-tree li:only-child:after{display:none}.md-tree li:first-child:before,.md-tree li:last-child:after{border:0}.md-tree li:last-child:before{border-right:2px solid var(--tree-line)}.md-tree ul ul:before{content:"";position:absolute;top:0;left:50%;height:22px;border-left:2px solid var(--tree-line)}.md-tree-row{display:flex;align-items:center}.md-tree-link{width:26px;height:2px;background:var(--tree-line)}.md-tree-box{position:relative;z-index:1;display:flex;align-items:center;justify-content:center;min-height:44px;padding:8px 10px;border:1px solid #bd8b43;border-radius:8px;background:#fff0e3;color:#64122a;font-size:11px;font-weight:700;line-height:1.35;text-align:center}.md-tree-box.dept,.md-tree-box.side{width:112px}.md-tree-box.main{min-width:150px;border-color:#650f2b;background:linear-gradient(90deg,#650f2b,#92213e);color:#fff;font-size:12px}.md-tree-box.side{border-color:#c99735;background:#fff6dc}
.md-feature-card{background:linear-gradient(135deg,#fff8ef,#fff1e6);border:1px solid #ead6c4;border-radius:11px;padding:18px;color:#821a37}.md-feature-card h4{color:#68132e;font-size:14px;margin:10px 0 5px}.md-feature-card p{color:#000000;font-size:12px;line-height:1.6;margin:0}.md-feature-card a{display:inline-flex;align-items:center;gap:6px;color:#811a39;font-size:12px;font-weight:700;text-decoration:none;margin-top:12px}.md-footer{display:flex;align-items:center;gap:18px;padding:23px 10px 12px;color:#665158;font-size:12px}.md-footer-line{flex:1;height:1px;background:linear-gradient(90deg,#d9a64b,#eadbd0)}.md-footer strong{color:#87501b;letter-spacing:1.4px;font-size:12px}.md-reveal{opacity:0;will-change:transform,opacity;transition:opacity .85s ease,transform 1s cubic-bezier(.2,.75,.25,1)}.md-reveal[data-direction=left]{transform:translateX(-45px)}.md-reveal[data-direction=right]{transform:translateX(45px)}.md-reveal.md-visible{opacity:1;transform:translateX(0)}
@media(max-width:1000px){.md-info-grid{grid-template-columns:repeat(2,minmax(0,1fr))}}@media(max-width:700px){.md-container{width:93%}.md-hero{min-height:220px;background-position:center}.md-hero-inner{width:91%;gap:9px;padding:88px 0 48px}.md-hero-icon{min-width:35px}.md-hero-icon svg{width:32px;height:32px}.md-hero-label{font-size:9px;letter-spacing:1.8px;line-height:1.5;margin-bottom:7px}.md-hero-content h1{font-size:clamp(23px,6.8vw,30px);line-height:1.12}.md-hero-content p{font-size:10px;line-height:1.5}.md-heading{align-items:flex-start;flex-direction:column;gap:13px}.md-heading-line{height:46px;width:6px}.md-count{margin-left:22px;padding:9px 13px}.md-section-grid{grid-template-columns:1fr;gap:10px}.md-section-card{min-height:78px;padding:11px 44px 11px 12px;gap:12px}.md-card-icon{width:54px;min-width:54px;height:51px}.md-card-icon svg{width:27px;height:27px}.md-card-content h3{font-size:14px}.md-card-content p{font-size:11px}.md-card-number{right:11px;top:7px;font-size:13px}.md-card-arrow{right:10px;bottom:9px;width:23px;height:23px}.md-detail-panel{padding:17px 13px}.md-detail-heading h2{font-size:23px}.md-detail-icon{width:48px;height:48px;min-width:48px}.md-detail-icon svg{width:29px;height:29px}.md-info-grid{grid-template-columns:repeat(2,minmax(0,1fr));gap:8px}.md-info-card{padding:11px;flex-direction:column;gap:8px;min-height:120px}.md-info-card strong{font-size:13px}.md-governance-card{gap:10px;padding:10px}.md-governance-icon{width:38px;min-width:38px;height:38px}.md-governance-card h4{font-size:12px}.md-governance-card p,.md-governance-text{font-size:11px}.md-tree-hint{display:block}.md-tree-scroll{padding:20px 10px 24px}.md-tree-box.dept,.md-tree-box.side{width:100px;font-size:10px}.md-tree-box.main{min-width:130px;font-size:11px}.md-footer{flex-wrap:wrap;gap:8px}.md-footer-line{min-width:30px}.md-footer strong{font-size:9px}.md-description,.md-bullet-list,.md-number-list{font-size:13px}}@media(max-width:380px){.md-hero-content h1{font-size:24px}.md-info-grid{grid-template-columns:1fr}.md-heading h2{font-size:22px}}@media(prefers-reduced-motion:reduce){.md-reveal,.md-section-card,.md-hero-icon,.md-hero-content{transition:none!important;animation:none!important}.md-reveal{opacity:1;transform:none!important}}
`;
