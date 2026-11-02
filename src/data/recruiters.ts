export interface Recruiter {
  id: string;
  name: string;
  // Local image path or supplied logo URL. Until official logos are provided,
  // a text-based placeholder is rendered.
  logoUrl: string | null;
}

// Recruiter names as supplied. Logos are pending official files —
// presented as supplied content pending verification, not as confirmed recruiters.
export const recruiters: Recruiter[] = [
  'Amazon',
  'Capgemini',
  'Cognizant',
  'Flipkart',
  'HCL Technologies',
  'Hexaware',
  'IBM',
  'Infosys',
  'L&T Infotech',
  'Larsen & Toubro',
  'Polaris',
  'QSpiders',
  'Sutherland',
  'TCS',
  'Mahindra',
  'Vertafore',
  'Why Global Services',
  'Wipro',
  'YouTube',
  'Zoho',
].map((name, i) => ({
  id: `rec-${i + 1}`,
  name,
  logoUrl: null,
}));
