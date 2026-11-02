export interface NewsItem {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  description: string;
  image: string;
  department: string;
  readMoreUrl?: string;
}

export const newsItems: NewsItem[] = [
  {
    id: 'news-1',
    date: '2025-10-28',
    dateLabel: '28 Oct 2025',
    title: 'National-Level Hackathon: "Hack It Out – 8 Hours"',
    description:
      'A high-energy national-level hackathon organized by the Department of Electronics & Communication Engineering, challenging students to build innovative solutions under a strict 8-hour deadline.',
    image:
      'https://images.pexels.com/photos/1181260/pexels-photo-1181260.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    department: 'Department of ECE',
  },
  {
    id: 'news-2',
    date: '2025-10-10',
    dateLabel: '10–11 Oct 2025',
    title: 'National-Level Symposium: "Techtopia \'25"',
    description:
      'A two-day national symposium organized by the Department of Cyber Security and AI & DS, featuring technical paper presentations, workshops, and industry expert sessions.',
    image:
      'https://images.pexels.com/photos/5380607/pexels-photo-5380607.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    department: 'Cyber Security & AI & DS',
  },
  {
    id: 'news-3',
    date: '2025-09-26',
    dateLabel: '26 Sep 2025',
    title: 'Guest Lecture on "Digital Marketing – Essential for Future Leaders"',
    description:
      'An insightful guest lecture organized by the Department of Management Studies, exploring how digital marketing shapes modern business strategy and leadership.',
    image:
      'https://images.pexels.com/photos/15635241/pexels-photo-15635241.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    department: 'Department of Management Studies',
  },
  {
    id: 'news-4',
    date: '2025-09-13',
    dateLabel: '13 Sep 2025',
    title: 'Guest Lecture on "Think Global – Study Info Series"',
    description:
      'A thought-provoking guest lecture organized by the Department of Management Studies, guiding students on global education opportunities and career pathways.',
    image:
      'https://images.pexels.com/photos/8197551/pexels-photo-8197551.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    department: 'Department of Management Studies',
  },
];
