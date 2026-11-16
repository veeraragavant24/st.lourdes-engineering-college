
import { useEffect, useMemo, useRef, useState } from 'react';
import { useLocation, useNavigate } from 'react-router-dom';
import { Search, X, ArrowUpRight } from 'lucide-react';

interface SearchPage {
  title: string;
  description: string;
  path: string;
  keywords: string[];
}

// Website search database
const searchPages: SearchPage[] = [
  {
    title: 'Home',
    description: 'Welcome to St. Lourdes Engineering College.',
    path: '/',
    keywords: ['home', 'college', 'welcome', 'engineering'],
  },
  {
    title: 'About the College',
    description: 'Learn about our college, vision, mission and history.',
    path: '/about',
    keywords: ['about', 'college', 'history', 'vision', 'mission'],
  },
  {
    title: 'Committees',
    description: 'Explore the various institutional committees.',
    path: '/about#committees',
    keywords: ['committees', 'institution', 'committee'],
  },
  {
    title: 'Grievance Redressal Committee',
    description: 'Information about student grievance redressal.',
    path: '/grievance-committee',
    keywords: ['grievance', 'complaint', 'redressal'],
  },
  {
    title: 'Sexual Harassment Redressal Committee',
    description: 'Information about the sexual harassment redressal committee.',
    path: '/committees/sexual-harassment',
    keywords: ['sexual harassment', 'women safety', 'committee'],
  },
  {
    title: 'Anti Ragging Committee',
    description: 'Information about anti-ragging policies and committee.',
    path: '/committees/anti-ragging',
    keywords: ['anti ragging', 'ragging', 'student safety'],
  },
  {
    title: 'Women Empowerment Cell',
    description: 'Activities and information about women empowerment.',
    path: '/committees/women-empowerment',
    keywords: ['women', 'empowerment', 'women cell'],
  },
  {
    title: 'Mandatory Disclosure',
    description: 'Institutional mandatory disclosure information.',
    path: '/mandatory-disclosure',
    keywords: ['mandatory', 'disclosure', 'documents'],
  },
  {
    title: 'AICTE Documents',
    description: 'View AICTE-related institutional documents.',
    path: '/aicte-documents',
    keywords: ['aicte', 'documents', 'approval'],
  },
  {
    title: 'Management',
    description: 'Meet the college management.',
    path: '/management',
    keywords: ['management', 'administration', 'trust'],
  },
  {
    title: 'Principal',
    description: 'Information about the college principal.',
    path: '/principal',
    keywords: ['principal', 'head', 'administration'],
  },
  {
    title: 'Faculty',
    description: 'Explore our teaching faculty and staff.',
    path: '/faculty',
    keywords: ['faculty', 'staff', 'teachers', 'professors'],
  },
  {
    title: 'Admission',
    description: 'Admission details and application information.',
    path: '/admission',
    keywords: ['admission', 'apply', 'application', 'join'],
  },
  {
    title: 'Eligibility Criteria',
    description: 'Find the eligibility requirements for admission.',
    path: '/eligibility',
    keywords: ['eligibility', 'criteria', 'qualification', 'requirements'],
  },
  {
    title: 'Scholarships',
    description: 'Information about available scholarships.',
    path: '/scholarships',
    keywords: ['scholarship', 'financial aid', 'fees', 'financial support'],
  },
  {
    title: 'Academics',
    description: 'Explore academic programmes and learning opportunities.',
    path: '/academics',
    keywords: ['academics', 'education', 'courses', 'learning', 'programs'],
  },
  {
    title: 'Departments',
    description: 'Explore the various college departments.',
    path: '/departments',
    keywords: ['departments', 'department', 'branches'],
  },
  {
    title: 'Gallery',
    description: 'View college events and campus photographs.',
    path: '/gallery',
    keywords: ['gallery', 'photos', 'images', 'events', 'pictures'],
  },
  {
    title: 'Facilities',
    description: 'Explore the facilities available on campus.',
    path: '/facilities',
    keywords: ['facilities', 'infrastructure', 'library', 'laboratory', 'labs', 'campus'],
  },
  {
    title: 'Placement',
    description: 'Explore placement opportunities and career support.',
    path: '/placement',
    keywords: ['placement', 'jobs', 'career', 'recruitment', 'companies'],
  },
  {
    title: 'Contact Us',
    description: 'Find college contact details and location information.',
    path: '/contact',
    keywords: ['contact', 'address', 'phone', 'email', 'location'],
  },
];

interface SearchBarProps {
  onClose?: () => void;
}

export default function SearchBar({ onClose }: SearchBarProps) {
  const [query, setQuery] = useState('');
  const [selectedIndex, setSelectedIndex] = useState(0);

  const wrapperRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);

  const navigate = useNavigate();
  const location = useLocation();

  // Automatically focus the search input
  useEffect(() => {
    inputRef.current?.focus();
  }, []);

  // Close search when clicking outside
  useEffect(() => {
    const handleOutsideClick = (event: MouseEvent) => {
      if (
        wrapperRef.current &&
        !wrapperRef.current.contains(event.target as Node)
      ) {
        onClose?.();
      }
    };

    document.addEventListener('mousedown', handleOutsideClick);

    return () => {
      document.removeEventListener('mousedown', handleOutsideClick);
    };
  }, [onClose]);

  // Search and rank matching website pages
  const results = useMemo(() => {
    const searchTerm = query.trim().toLowerCase();

    if (!searchTerm) return [];

    return searchPages
      .map((page) => {
        const title = page.title.toLowerCase();
        const description = page.description.toLowerCase();

        const matchingKeywords = page.keywords.filter((keyword) =>
          keyword.toLowerCase().includes(searchTerm)
        );

        let score = 0;

        if (title === searchTerm) score += 100;
        else if (title.startsWith(searchTerm)) score += 80;
        else if (title.split(' ').some((word) => word.startsWith(searchTerm))) {
          score += 60;
        } else if (title.includes(searchTerm)) score += 40;

        if (description.includes(searchTerm)) score += 10;

        score += matchingKeywords.length * 15;

        return { ...page, score };
      })
      .filter((page) => page.score > 0)
      .sort((a, b) => b.score - a.score);
  }, [query]);

  // Navigate to the selected page
  const openResult = (path: string) => {
    navigate(path);
    setQuery('');
    onClose?.();
  };

  // Keyboard navigation
  const handleKeyDown = (event: React.KeyboardEvent<HTMLInputElement>) => {
    if (event.key === 'Escape') {
      setQuery('');
      onClose?.();
      return;
    }

    if (results.length === 0) return;

    if (event.key === 'ArrowDown') {
      event.preventDefault();
      setSelectedIndex((previous) =>
        Math.min(previous + 1, results.length - 1)
      );
    }

    if (event.key === 'ArrowUp') {
      event.preventDefault();
      setSelectedIndex((previous) => Math.max(previous - 1, 0));
    }

    if (event.key === 'Enter') {
      event.preventDefault();
      openResult(results[selectedIndex]?.path || results[0].path);
    }
  };

  // Reset selected result when the search changes
  useEffect(() => {
    setSelectedIndex(0);
  }, [query]);

  // Clear search when the route changes
  useEffect(() => {
    setQuery('');
  }, [location.pathname, location.hash]);

  return (
    <div
      ref={wrapperRef}
      className="relative mx-auto w-full max-w-7xl"
    >
      {/* Search input */}
      <div className="flex items-center gap-3 rounded-xl border border-gold/30 bg-white/10 px-4 py-3 shadow-lg backdrop-blur-md focus-within:border-gold">
        <Search className="h-5 w-5 shrink-0 text-gold" />

        <input
          ref={inputRef}
          type="search"
          value={query}
          onChange={(event) => setQuery(event.target.value)}
          onKeyDown={handleKeyDown}
          placeholder="Search anything on our website..."
          autoComplete="off"
          role="combobox"
          aria-expanded={results.length > 0}
          aria-controls="website-search-results"
          aria-autocomplete="list"
          className="min-w-0 flex-1 bg-transparent text-sm text-white outline-none placeholder:text-white/50 sm:text-base"
        />

        {query && (
          <button
            type="button"
            onClick={() => {
              setQuery('');
              inputRef.current?.focus();
            }}
            className="text-white/60 transition-colors hover:text-gold"
            aria-label="Clear search"
          >
            <X className="h-4 w-4" />
          </button>
        )}

        <button
          type="button"
          onClick={onClose}
          className="text-white/60 transition-colors hover:text-gold"
          aria-label="Close search"
        >
          <X className="h-5 w-5" />
        </button>
      </div>

      {/* Search results dropdown */}
      {query.trim() && (
        <div
          id="website-search-results"
          role="listbox"
          className="absolute left-0 right-0 top-full z-[100] mt-2 max-h-[65vh] overflow-y-auto rounded-xl border border-gold/20 bg-white shadow-2xl"
        >
          {results.length > 0 ? (
            <>
              <div className="border-b border-gray-100 px-4 py-3">
                <p className="text-xs font-semibold uppercase tracking-wider text-gray-400">
                  {results.length} matching {results.length === 1 ? 'page' : 'pages'}
                </p>
              </div>

              {results.map((result, index) => (
                <button
                  key={result.path}
                  type="button"
                  role="option"
                  aria-selected={selectedIndex === index}
                  onMouseEnter={() => setSelectedIndex(index)}
                  onClick={() => openResult(result.path)}
                  className={`flex w-full items-center justify-between gap-3 border-b border-gray-100 px-4 py-3 text-left transition-colors last:border-0 ${
                    selectedIndex === index
                      ? 'bg-[#F8F0E8]'
                      : 'hover:bg-[#F8F0E8]'
                  }`}
                >
                  <div className="min-w-0">
                    <p className="truncate text-sm font-semibold text-[#4A0B18]">
                      {result.title}
                    </p>

                    <p className="mt-1 line-clamp-2 text-xs leading-relaxed text-gray-500">
                      {result.description}
                    </p>
                  </div>

                  <ArrowUpRight className="h-4 w-4 shrink-0 text-[#B38A3E]" />
                </button>
              ))}
            </>
          ) : (
            <div className="px-5 py-8 text-center">
              <Search className="mx-auto mb-3 h-7 w-7 text-gray-300" />

              <p className="text-sm font-semibold text-[#4A0B18]">
                No results found
              </p>

              <p className="mt-1 text-xs text-gray-500">
                Try searching with another keyword.
              </p>
            </div>
          )}
        </div>
      )}
    </div>
  );
}
