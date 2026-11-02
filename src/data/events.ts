export interface EventItem {
  id: string;
  date: string;
  dateLabel: string;
  title: string;
  description: string;
  image: string;
  venue: string;
  isPlaceholder: boolean;
}

// Placeholder upcoming events — clearly marked as editable sample content.
// Replace with confirmed college announcements before publishing.
export const eventItems: EventItem[] = [
  {
    id: 'event-1',
    date: '2026-04-15',
    dateLabel: '15 Apr 2026',
    title: 'Inter-College Technical Fest "Innovate 2026"',
    description:
      'A placeholder event entry — a multi-college technical fest featuring coding contests, robotics challenges, and project exhibitions. Confirm details before publishing.',
    image:
      'https://images.pexels.com/photos/6804071/pexels-photo-6804071.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    venue: 'Main Campus Auditorium',
    isPlaceholder: true,
  },
  {
    id: 'event-2',
    date: '2026-03-20',
    dateLabel: '20 Mar 2026',
    title: 'Industry-Academia Connect Seminar',
    description:
      'A placeholder event entry — a seminar bridging industry expectations with academic learning. Confirm details before publishing.',
    image:
      'https://images.pexels.com/photos/1708936/pexels-photo-1708936.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    venue: 'Seminar Hall, Block A',
    isPlaceholder: true,
  },
  {
    id: 'event-3',
    date: '2026-02-28',
    dateLabel: '28 Feb 2026',
    title: 'Annual Sports Day & Cultural Evening',
    description:
      'A placeholder event entry — a day of athletic competition followed by an evening of student cultural performances. Confirm details before publishing.',
    image:
      'https://images.pexels.com/photos/7683890/pexels-photo-7683890.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    venue: 'College Grounds',
    isPlaceholder: true,
  },
  {
    id: 'event-4',
    date: '2026-01-18',
    dateLabel: '18 Jan 2026',
    title: 'Placement Drive — Multi-Company Recruitment',
    description:
      'A placeholder event entry — campus recruitment drive with multiple visiting companies. Confirm details before publishing.',
    image:
      'https://images.pexels.com/photos/33175650/pexels-photo-33175650.jpeg?auto=compress&cs=tinysrgb&w=600&h=400&fit=crop',
    venue: 'Placement Cell, Block C',
    isPlaceholder: true,
  },
];
