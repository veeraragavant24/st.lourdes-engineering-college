export interface Program {
  id: string;
  name: string;
  shortName: string;
  level: 'Undergraduate' | 'Postgraduate';
  department: string;
  image: string;
  description: string;
  duration: string;
  slug: string;
}

export const programs: Program[] = [
  {
    id: 'prog-1',
    name: 'B.E. Computer Science and Engineering',
    shortName: 'B.E. CSE',
    level: 'Undergraduate',
    department: 'Computer Science & Engineering',
    image:
      'https://images.pexels.com/photos/6424591/pexels-photo-6424591.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A comprehensive program covering algorithms, software engineering, data structures, and emerging technologies that shape the digital world.',
    duration: '4 Years',
    slug: 'be-cse',
  },
  {
    id: 'prog-2',
    name: 'B.E. Computer Science and Engineering (Cyber Security)',
    shortName: 'B.E. CSE (Cyber Security)',
    level: 'Undergraduate',
    department: 'Computer Science & Engineering',
    image:
      'https://images.pexels.com/photos/4973899/pexels-photo-4973899.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A specialized track focused on network security, ethical hacking, cryptography, and protecting digital infrastructure from evolving threats.',
    duration: '4 Years',
    slug: 'be-cse-cyber-security',
  },
  {
    id: 'prog-3',
    name: 'B.Tech. Artificial Intelligence and Data Science',
    shortName: 'B.Tech. AI & DS',
    level: 'Undergraduate',
    department: 'Artificial Intelligence & Data Science',
    image:
      'https://images.pexels.com/photos/17483873/pexels-photo-17483873.png?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A cutting-edge program in machine learning, deep learning, data analytics, and intelligent systems design for the AI-driven future.',
    duration: '4 Years',
    slug: 'btech-ai-ds',
  },
  {
    id: 'prog-4',
    name: 'B.Tech. Information Technology',
    shortName: 'B.Tech. IT',
    level: 'Undergraduate',
    department: 'Information Technology',
    image:
      'https://images.pexels.com/photos/1148820/pexels-photo-1148820.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A program bridging computing fundamentals with enterprise IT, cloud infrastructure, networking, and modern web technologies.',
    duration: '4 Years',
    slug: 'btech-it',
  },
  {
    id: 'prog-5',
    name: 'B.E. Electronics and Communication Engineering',
    shortName: 'B.E. ECE',
    level: 'Undergraduate',
    department: 'Electronics & Communication Engineering',
    image:
      'https://images.pexels.com/photos/3520692/pexels-photo-3520692.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A program spanning analog and digital electronics, communication systems, VLSI design, and signal processing for connected worlds.',
    duration: '4 Years',
    slug: 'be-ece',
  },
  {
    id: 'prog-6',
    name: 'Master of Business Administration (MBA)',
    shortName: 'MBA',
    level: 'Postgraduate',
    department: 'Management Studies',
    image:
      'https://images.pexels.com/photos/34947115/pexels-photo-34947115.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'A postgraduate management program developing strategic thinking, leadership, and business acumen for the modern corporate landscape.',
    duration: '2 Years',
    slug: 'mba',
  },
  {
    id: 'prog-7',
    name: 'M.E. Computer Science and Engineering',
    shortName: 'M.E. CSE',
    level: 'Postgraduate',
    department: 'Computer Science & Engineering',
    image:
      'https://images.pexels.com/photos/2004161/pexels-photo-2004161.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    description:
      'An advanced postgraduate program emphasizing research, advanced algorithms, distributed systems, and specialized computing domains.',
    duration: '2 Years',
    slug: 'me-cse',
  },
];
