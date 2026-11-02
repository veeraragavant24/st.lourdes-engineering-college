export interface DocumentEntry {
  id: string;
  title: string;
  filePath: string | null; // null = unavailable; show "unavailable" state
  category: string;
}

// Document titles and file paths. Store actual PDF files in /public/documents/
// or supply verified URLs. Until files are available, an "unavailable" state is shown.
export const documents: DocumentEntry[] = [
  { id: 'doc-1', title: 'EOA Report 2024–25', filePath: null, category: 'EOA Reports' },
  { id: 'doc-2', title: 'EOA Report 2023–24', filePath: null, category: 'EOA Reports' },
  { id: 'doc-3', title: 'EOA Report 2022–23', filePath: null, category: 'EOA Reports' },
  { id: 'doc-4', title: 'Undertaking', filePath: null, category: 'Official Documents' },
  { id: 'doc-5', title: 'Governing Council', filePath: null, category: 'Official Documents' },
  { id: 'doc-6', title: 'EOA Report 2021–22', filePath: null, category: 'EOA Reports' },
  { id: 'doc-7', title: 'EOA Reports 2010–11 through 2019–20', filePath: null, category: 'EOA Reports' },
  { id: 'doc-8', title: 'Letter of Intent', filePath: null, category: 'Official Documents' },
  { id: 'doc-9', title: 'LOA 2009–10', filePath: null, category: 'Official Documents' },
  { id: 'doc-10', title: 'LOA 2021–22', filePath: null, category: 'Official Documents' },
];

export const approvals = [
  {
    id: 'apr-1',
    name: 'Anna University',
    description: 'Affiliated to Anna University, Chennai',
    logoUrl: null,
  },
  {
    id: 'apr-2',
    name: 'AICTE',
    description: 'Approved by All India Council for Technical Education',
    logoUrl: null,
  },
];
