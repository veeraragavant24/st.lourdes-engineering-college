import { useEffect, useRef, useState } from 'react';
import { Link } from 'react-router-dom';
import { MessageCircle, X, Send, GraduationCap, User, ChevronDown } from 'lucide-react';
import { siteConfig } from '@/data/siteConfig';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

interface Message {
  id: number;
  sender: 'bot' | 'user';
  text: string;
  links?: { label: string; to: string }[];
  action?: { label: string; type: 'admission' };
}

interface KeywordRule {
  keywords: string[];
  response: string;
  links?: { label: string; to: string }[];
  action?: { label: string; type: 'admission' };
}

const rules: KeywordRule[] = [
  {
    keywords: ['admission', 'apply', 'admissions', 'enroll', 'enquiry', 'join', 'how to apply'],
    response:
      "Admissions for 2026-27 are open! Here's the process: 1) Submit an enquiry, 2) Participate in TNEA counselling (code " +
      siteConfig.tneaCode +
      '), 3) Verify documents, 4) Confirm your seat. You can start your enquiry right now.',
    links: [{ label: 'View Admission Details', to: '/admission' }],
    action: { label: 'Open Enquiry Form', type: 'admission' },
  },
  {
    keywords: ['tnea', 'counselling code', 'counselling', 'anna university counselling'],
    response:
      'Our TNEA Counselling Code is ' +
      siteConfig.tneaCode +
      '. Use this code during TNEA counselling for B.E. / B.Tech. admissions.',
    links: [{ label: 'Admission Process', to: '/admission' }],
  },
  {
    keywords: ['program', 'programs', 'course', 'courses', 'degree', 'branch', 'department', 'study', 'offer'],
    response:
      'We offer 7 programs: B.E. CSE, B.E. CSE (Cyber Security), B.Tech. AI & DS, B.Tech. IT, B.E. ECE, M.B.A., and M.E. CSE. Explore each one for details on duration, curriculum, and career paths.',
    links: [{ label: 'View All Programs', to: '/programs' }],
  },
  {
    keywords: ['cse', 'computer science'],
    response:
      'We offer B.E. Computer Science & Engineering and B.E. CSE (Cyber Security) at the undergraduate level, plus M.E. CSE at the postgraduate level. All are 4-year (UG) or 2-year (PG) programs.',
    links: [
      { label: 'B.E. CSE Details', to: '/programs#be-cse' },
      { label: 'B.E. CSE Cyber Security', to: '/programs#be-cse-cyber-security' },
      { label: 'M.E. CSE Details', to: '/programs#me-cse' },
    ],
  },
  {
    keywords: ['ai', 'artificial intelligence', 'data science', 'ds', 'machine learning'],
    response:
      'Our B.Tech. Artificial Intelligence & Data Science program covers machine learning, deep learning, data analytics, and intelligent systems design. It\'s a 4-year undergraduate program.',
    links: [{ label: 'B.Tech AI & DS Details', to: '/programs#btech-ai-ds' }],
  },
  {
    keywords: ['it', 'information technology', 'btech it'],
    response:
      'B.Tech. Information Technology bridges computing fundamentals with enterprise IT, cloud infrastructure, networking, and modern web technologies. It\'s a 4-year program.',
    links: [{ label: 'B.Tech IT Details', to: '/programs#btech-it' }],
  },
  {
    keywords: ['ece', 'electronics', 'communication'],
    response:
      'B.E. Electronics and Communication Engineering spans analog and digital electronics, communication systems, VLSI design, and signal processing. It\'s a 4-year program.',
    links: [{ label: 'B.E. ECE Details', to: '/programs#be-ece' }],
  },
  {
    keywords: ['mba', 'management', 'business', 'master of business'],
    response:
      'Our Master of Business Administration (M.B.A.) is a 2-year postgraduate program developing strategic thinking, leadership, and business acumen.',
    links: [{ label: 'M.B.A. Details', to: '/programs#mba' }],
  },
  {
    keywords: ['placement', 'recruiter', 'recruiters', 'job', 'jobs', 'career', 'careers', 'placement cell', 'campus placement'],
    response:
      'Our Placement Cell provides career guidance, mock interviews, resume workshops, and coordinates campus recruitment drives with national and multinational companies. Visit the placement page for the full recruiter list.',
    links: [{ label: 'Placement Overview', to: '/placement' }],
  },
  {
    keywords: ['eligibility', 'eligible', 'criteria', 'qualification', 'qualifications', 'marks', 'hsc', '12th'],
    response:
      'For B.E./B.Tech.: Pass 10+2 (HSC) with Mathematics, Physics, and Chemistry as per Anna University norms, plus valid TNEA registration. For M.B.A./M.E.: A relevant Bachelor\'s degree as per Anna University PG admission norms.',
    links: [{ label: 'Eligibility Details', to: '/admission#eligibility' }],
  },
  {
    keywords: ['fee', 'fees', 'tuition', 'cost', 'fee structure', 'scholarship'],
    response:
      'For the most accurate and up-to-date fee structure, please contact our admissions office directly. They can provide detailed fee information for each program and any available scholarships.',
    links: [{ label: 'Contact Admissions', to: '/contact' }],
    action: { label: 'Open Enquiry Form', type: 'admission' },
  },
  {
    keywords: ['library', 'books', 'study material', 'reading'],
    response:
      'Our Central Library is a state-of-the-art facility with an extensive collection of books, e-resources, digital journals, spacious reading halls, and group study rooms. It serves as the intellectual hub of our campus.',
    links: [{ label: 'Campus Facilities', to: '/gallery#facilities' }],
  },
  {
    keywords: ['hostel', 'accommodation', 'stay', 'lodging', 'residence'],
    response:
      'We provide separate, safe, and comfortable hostel facilities for boys and girls with nutritious food, hygiene facilities, and recreational and study areas.',
    links: [{ label: 'Campus Facilities', to: '/gallery#hostel' }],
  },
  {
    keywords: ['campus', 'facilities', 'infrastructure', 'labs', 'wifi', 'sports'],
    response:
      'Our campus features a central library, modern computer and science labs, high-speed Wi-Fi, separate hostels, sports grounds, and recreation facilities. Explore our photo gallery for a visual tour.',
    links: [{ label: 'View Gallery', to: '/gallery' }],
  },
  {
    keywords: ['about', 'history', 'founder', 'trust', 'established', 'when was', 'who started'],
    response:
      'ST. Lourdes Engineering College was founded by Ln. Dr. S. Peter in ' +
      siteConfig.established +
      ' under the Loordhu Ammal Educational Trust. It is a Christian Minority Institution located on NH45 at Erandam Kattalai, Tharapakkam, near Anagaputhur, Chennai - 600128.',
    links: [{ label: 'About the College', to: '/about' }],
  },
  {
    keywords: ['location', 'address', 'where', 'map', 'directions', 'reach', 'how to reach'],
    response:
      'We are located at ' +
      siteConfig.address.line2 +
      ' ' +
      siteConfig.address.line3 +
      ' ' +
      siteConfig.address.line4,
    links: [{ label: 'View on Map', to: '/contact' }],
  },
  {
    keywords: ['contact', 'phone', 'email', 'call', 'reach out'],
    response:
      'You can reach us at ' +
      siteConfig.phones[0] +
      ' or email ' +
      siteConfig.emails[0] +
      '. Visit our contact page for all phone numbers and office hours.',
    links: [{ label: 'Contact Page', to: '/contact' }],
  },
  {
    keywords: ['news', 'events', 'happening', 'latest', 'update', 'updates', 'upcoming'],
    response:
      'Recent news includes our National-Level Hackathon "Hack It Out", the "Techtopia \'25" symposium, and guest lectures on digital marketing and global education. Check our news section for full details.',
    links: [{ label: 'News & Events', to: '/about#news' }],
  },
  {
    keywords: ['gallery', 'photos', 'images', 'pictures', 'see campus'],
    response:
      'Our photo gallery showcases the library, labs, hostel, campus events, and student life. Take a visual tour of our campus!',
    links: [{ label: 'View Gallery', to: '/gallery' }],
  },
  {
    keywords: ['hello', 'hi', 'hey', 'greetings', 'good morning', 'good afternoon', 'good evening'],
    response:
      'Hello! Welcome to ST. Lourdes Engineering College. I can help you with admissions, programs, placements, campus facilities, and more. What would you like to know?',
  },
  {
    keywords: ['thank', 'thanks', 'thank you', 'great', 'awesome', 'perfect', 'helpful'],
    response:
      'You\'re welcome! Feel free to ask if you have any more questions. We\'re here to help you on your journey to ST. Lourdes.',
  },
  {
    keywords: ['bye', 'goodbye', 'see you', 'later'],
    response: 'Goodbye! We hope to see you at ST. Lourdes Engineering College soon. Have a great day!',
  },
];

const defaultResponse: KeywordRule = {
  keywords: [],
  response:
    'I can help with admissions, programs offered, placement support, campus facilities, eligibility, fees, location, and more. Try asking "What programs do you offer?" or "How do I apply?"',
  links: [
    { label: 'Programs', to: '/programs' },
    { label: 'Admission', to: '/admission' },
    { label: 'Contact', to: '/contact' },
  ],
};

const quickPrompts = [
  'What programs do you offer?',
  'How do I apply for admission?',
  'What is the TNEA counselling code?',
  'Tell me about placement support',
  'Where is the college located?',
];

function findResponse(input: string): KeywordRule {
  const lower = input.toLowerCase();
  for (const rule of rules) {
    if (rule.keywords.some((kw) => lower.includes(kw))) {
      return rule;
    }
  }
  return defaultResponse;
}

let messageIdCounter = 0;
function createMessage(sender: 'bot' | 'user', text: string, links?: { label: string; to: string }[], action?: { label: string; type: 'admission' }): Message {
  messageIdCounter += 1;
  return { id: messageIdCounter, sender, text, links, action };
}

export default function Chatbot() {
  const [isOpen, setIsOpen] = useState(false);
  const [messages, setMessages] = useState<Message[]>([]);
  const [input, setInput] = useState('');
  const [isTyping, setIsTyping] = useState(false);
  const [hasUnread, setHasUnread] = useState(false);
  const scrollRef = useRef<HTMLDivElement>(null);
  const inputRef = useRef<HTMLInputElement>(null);
  const { openModal } = useAdmissionModal();
  const initialized = useRef(false);

  // Seed welcome message on first open
  useEffect(() => {
    if (isOpen && !initialized.current) {
      initialized.current = true;
      setMessages([
        createMessage(
          'bot',
          'Welcome to ST. Lourdes Engineering College! I\'m Lourdes Assistant. How can I help you today? You can ask me about admissions, programs, placements, campus facilities, and more.'
        ),
      ]);
      setHasUnread(false);
    }
  }, [isOpen]);

  // Auto-scroll to bottom
  useEffect(() => {
    if (scrollRef.current) {
      scrollRef.current.scrollTo({ top: scrollRef.current.scrollHeight, behavior: 'smooth' });
    }
  }, [messages, isTyping]);

  // Focus input when opened
  useEffect(() => {
    if (isOpen && inputRef.current) {
      setTimeout(() => inputRef.current?.focus(), 300);
    }
  }, [isOpen]);

  // Show notification pulse after delay if never opened
  useEffect(() => {
    if (!isOpen && !initialized.current) {
      const timer = setTimeout(() => setHasUnread(true), 4000);
      return () => clearTimeout(timer);
    }
  }, [isOpen]);

  const handleSend = (text?: string) => {
    const messageText = (text ?? input).trim();
    if (!messageText) return;

    const userMsg = createMessage('user', messageText);
    setMessages((prev) => [...prev, userMsg]);
    setInput('');
    setIsTyping(true);

    // Simulate typing delay
    setTimeout(() => {
      const rule = findResponse(messageText);
      const botMsg = createMessage('bot', rule.response, rule.links, rule.action);
      setMessages((prev) => [...prev, botMsg]);
      setIsTyping(false);
    }, 600 + Math.random() * 400);
  };

  const handleAction = (action: { label: string; type: 'admission' }) => {
    if (action.type === 'admission') {
      setIsOpen(false);
      openModal();
    }
  };

  return (
    <>
      {/* Toggle button */}
      <button
        onClick={() => {
          setIsOpen((o) => !o);
          setHasUnread(false);
        }}
        className={`fixed bottom-6 left-6 z-[55] flex h-14 w-14 items-center justify-center rounded-full border-2 border-gold bg-maroon-600 text-gold-100 shadow-2xl shadow-maroon-900/50 transition-all duration-300 hover:scale-110 hover:bg-maroon-700 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2 ${
          hasUnread && !isOpen ? 'animate-pulse' : ''
        }`}
        aria-label={isOpen ? 'Close chat assistant' : 'Open chat assistant'}
      >
        {isOpen ? <X className="h-6 w-6" /> : <MessageCircle className="h-6 w-6" strokeWidth={1.5} />}
        {hasUnread && !isOpen && (
          <span className="absolute -right-0.5 -top-0.5 flex h-4 w-4 items-center justify-center rounded-full bg-gold text-[9px] font-bold text-maroon-800">
            1
          </span>
        )}
      </button>

      {/* Chat panel */}
      {isOpen && (
        <div className="fixed bottom-24 left-6 z-[55] flex h-[min(32rem,75vh)] w-[min(23rem,calc(100vw-3rem))] flex-col overflow-hidden rounded-2xl border-2 border-gold/30 bg-white shadow-2xl shadow-maroon-900/40 animate-scale-in">
          {/* Header */}
          <div className="relative overflow-hidden bg-gradient-to-br from-maroon-600 via-maroon-700 to-maroon-800 px-5 py-4">
            <div className="pointer-events-none absolute -right-4 -top-4 h-20 w-20 rounded-full bg-gold/10" />
            <div className="pointer-events-none absolute -left-6 -bottom-6 h-16 w-16 rounded-full border border-gold/10" />
            <div className="relative flex items-center gap-3">
              <div className="flex h-11 w-11 shrink-0 items-center justify-center rounded-full border-2 border-gold bg-maroon-700 shadow-md">
                <GraduationCap className="h-6 w-6 text-gold" strokeWidth={1.5} />
              </div>
              <div className="flex-1">
                <p className="font-serif text-lg font-bold text-ivory">Lourdes Assistant</p>
                <p className="flex items-center gap-1.5 text-xs font-medium text-gold-100/80">
                  <span className="h-2 w-2 rounded-full bg-green-400" />
                  Online now
                </p>
              </div>
              <button
                onClick={() => setIsOpen(false)}
                className="rounded-full p-1.5 text-ivory/60 transition-colors hover:bg-white/10 hover:text-ivory"
                aria-label="Close chat"
              >
                <X className="h-5 w-5" />
              </button>
            </div>
          </div>

          {/* Messages */}
          <div
            ref={scrollRef}
            className="flex-1 overflow-y-auto bg-ivory/30 px-4 py-4"
          >
            <div className="space-y-3">
              {messages.map((msg) => (
                <div
                  key={msg.id}
                  className={`flex items-end gap-2 ${msg.sender === 'user' ? 'flex-row-reverse' : ''}`}
                >
                  <div
                    className={`flex h-8 w-8 shrink-0 items-center justify-center rounded-full ${
                      msg.sender === 'bot'
                        ? 'border border-gold/30 bg-maroon-50 text-maroon-600'
                        : 'bg-gold/20 text-gold-600'
                    }`}
                  >
                    {msg.sender === 'bot' ? (
                      <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                    ) : (
                      <User className="h-4 w-4" strokeWidth={1.5} />
                    )}
                  </div>
                  <div className={`max-w-[80%] ${msg.sender === 'user' ? 'items-end' : 'items-start'}`}>
                    <div
                      className={`rounded-2xl px-4 py-3 text-[13px] leading-relaxed ${
                        msg.sender === 'bot'
                          ? 'rounded-bl-md border border-gold/15 bg-white text-charcoal shadow-sm'
                          : 'rounded-br-md bg-maroon-700 text-ivory'
                      }`}
                    >
                      {msg.text}
                    </div>

                    {/* Link buttons */}
                    {msg.links && msg.links.length > 0 && (
                      <div className="mt-2 flex flex-wrap gap-1.5">
                        {msg.links.map((link) => (
                          <Link
                            key={link.label}
                            to={link.to}
                            onClick={() => setIsOpen(false)}
                            className="inline-flex items-center gap-1 rounded-full border border-gold/30 bg-gold/10 px-3 py-1.5 text-[11px] font-medium text-maroon-600 transition-all duration-200 hover:border-gold hover:bg-gold hover:text-maroon-800"
                          >
                            {link.label}
                            <ChevronDown className="h-3 w-3 -rotate-90" />
                          </Link>
                        ))}
                      </div>
                    )}

                    {/* Action button */}
                    {msg.action && (
                      <button
                        onClick={() => handleAction(msg.action!)}
                        className="mt-2 inline-flex items-center gap-1.5 rounded-full bg-maroon-700 px-3.5 py-1.5 text-[11px] font-semibold text-gold-100 transition-all duration-200 hover:bg-maroon-600"
                      >
                        {msg.action.label}
                      </button>
                    )}
                  </div>
                </div>
              ))}

              {/* Typing indicator */}
              {isTyping && (
                <div className="flex items-end gap-2">
                  <div className="flex h-8 w-8 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-maroon-50 text-maroon-600">
                    <GraduationCap className="h-4 w-4" strokeWidth={1.5} />
                  </div>
                  <div className="flex items-center gap-1 rounded-2xl rounded-bl-md border border-gold/15 bg-white px-4 py-3 shadow-sm">
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60 [animation-delay:0ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60 [animation-delay:150ms]" />
                    <span className="h-2 w-2 animate-bounce rounded-full bg-gold/60 [animation-delay:300ms]" />
                  </div>
                </div>
              )}
            </div>
          </div>

          {/* Quick prompts */}
          {messages.length <= 1 && (
            <div className="border-t border-gold/15 bg-white px-4 py-3">
              <p className="mb-2 text-[11px] font-semibold uppercase tracking-wider text-gold-500">Quick questions</p>
              <div className="flex flex-wrap gap-1.5">
                {quickPrompts.map((prompt) => (
                  <button
                    key={prompt}
                    onClick={() => handleSend(prompt)}
                    className="rounded-full border border-gold/25 bg-ivory px-3.5 py-1.5 text-[11px] font-medium text-charcoal/70 transition-all duration-200 hover:border-gold/50 hover:bg-gold/10 hover:text-maroon-600"
                  >
                    {prompt}
                  </button>
                ))}
              </div>
            </div>
          )}

          {/* Input */}
          <div className="border-t border-gold/15 bg-white px-4 py-3">
            <form
              onSubmit={(e) => {
                e.preventDefault();
                handleSend();
              }}
              className="flex items-center gap-2"
            >
              <input
                ref={inputRef}
                type="text"
                value={input}
                onChange={(e) => setInput(e.target.value)}
                placeholder="Type your question..."
                className="flex-1 rounded-full border border-maroon-200 bg-ivory px-4 py-2.5 text-[13px] text-charcoal placeholder:text-charcoal/30 focus:border-gold focus:outline-none focus:ring-2 focus:ring-gold/20"
                aria-label="Type your message"
              />
              <button
                type="submit"
                disabled={!input.trim()}
                className="flex h-10 w-10 shrink-0 items-center justify-center rounded-full border border-gold/30 bg-maroon-700 text-gold-100 transition-all duration-200 hover:border-gold hover:bg-maroon-600 disabled:opacity-40 focus:outline-none focus-visible:ring-2 focus-visible:ring-gold focus-visible:ring-offset-2"
                aria-label="Send message"
              >
                <Send className="h-4 w-4" strokeWidth={1.5} />
              </button>
            </form>
            <p className="mt-2 text-center text-[10px] font-medium text-charcoal/30">
              ST. Lourdes Assistant &middot; Demo mode
            </p>
          </div>
        </div>
      )}
    </>
  );
}
