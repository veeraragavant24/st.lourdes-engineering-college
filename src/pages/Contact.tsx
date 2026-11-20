import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Loader2,
  ArrowRight,
} from 'lucide-react';
import {
  useEffect,
  useRef,
  useState,
  type FormEvent,
  type ReactNode,
} from 'react';
import { siteConfig } from '@/data/siteConfig';
import { useAdmissionModal } from '@/components/AdmissionModalContext';
import { api } from '@/services/api';

interface ContactForm {
  name: string;
  email: string;
  phone: string;
  subject: string;
  message: string;
}

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  subject?: string;
  message?: string;
}

type Status = 'idle' | 'submitting' | 'success' | 'error';
type RevealFrom = 'left' | 'right' | 'up';

const initialForm: ContactForm = {
  name: '',
  email: '',
  phone: '',
  subject: '',
  message: '',
};

function validate(data: ContactForm): FormErrors {
  const errors: FormErrors = {};

  if (!data.name.trim()) errors.name = 'Please enter your name';

  if (!data.email.trim()) {
    errors.email = 'Please enter your email';
  } else if (!/^[^\s@]+@[^\s@]+\.[^\s@]+$/.test(data.email)) {
    errors.email = 'Please enter a valid email address';
  }

  if (!data.phone.trim()) {
    errors.phone = 'Please enter your phone number';
  } else if (!/^[+\d\s\-()]{10,15}$/.test(data.phone)) {
    errors.phone = 'Please enter a valid phone number';
  }

  if (!data.subject.trim()) errors.subject = 'Please enter a subject';
  if (!data.message.trim()) errors.message = 'Please enter your message';

  return errors;
}

/*
  MAP TIP: the Google "place card" (name, rating, "Open in Maps") appears when the
  embed is searched by NAME. To get only the red pin + label, search by
  coordinates instead, for example:
  https://maps.google.com/maps?q=12.9700,80.1300&z=16&hl=en&output=embed
*/
const MAP_EMBED_SRC =
  'https://maps.google.com/maps?q=St.+Lourdes+Engineering+College,+Erandam+Kattalai,+Tharapakkam,+Anagaputhur,+Chennai+600128&z=15&hl=en&output=embed';

/* ---------- Scroll reveal wrapper ----------
   from="left"  : slides in from the left and settles
   from="right" : slides in from the right and settles
   from="up"    : fades up
   delay        : milliseconds, used to stagger items            */
function Reveal({
  children,
  from = 'up',
  delay = 0,
  className = '',
}: {
  children: ReactNode;
  from?: RevealFrom;
  delay?: number;
  className?: string;
}) {
  const ref = useRef<HTMLDivElement>(null);
  const [shown, setShown] = useState(false);

  useEffect(() => {
    const el = ref.current;
    if (!el) return;

    const reduceMotion = window.matchMedia(
      '(prefers-reduced-motion: reduce)'
    ).matches;

    if (reduceMotion || typeof IntersectionObserver === 'undefined') {
      setShown(true);
      return;
    }

    const observer = new IntersectionObserver(
      ([entry]) => {
        if (entry.isIntersecting) {
          setShown(true);
          observer.disconnect();
        }
      },
      { threshold: 0.12, rootMargin: '0px 0px -40px 0px' }
    );

    observer.observe(el);
    return () => observer.disconnect();
  }, []);

  return (
    <div
      ref={ref}
      data-from={from}
      className={`ct-reveal ${shown ? 'ct-in' : ''} ${className}`}
      style={{ transitionDelay: `${delay}ms` }}
    >
      {children}
    </div>
  );
}

export default function Contact() {
  const { openModal } = useAdmissionModal();

  const [formData, setFormData] = useState<ContactForm>(initialForm);
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const updateField = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();

    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }

    setErrors({});
    setStatus('submitting');

    try {
      const result = await api.submitAdmissionEnquiry({
        name: formData.name,
        email: formData.email,
        phone: formData.phone,
        program: `Contact Form: ${formData.subject}`,
        message: formData.message,
      });
      setStatus(result.success ? 'success' : 'error');
    } catch {
      setStatus('error');
    }
  };

  const errorText = (error?: string) =>
    error ? (
      <p className="ct-error-text">
        <AlertCircle />
        {error}
      </p>
    ) : null;

  return (
    <main className="ct-main">
      <style>{`
        /* ---------- Theme (change these to match your site) ---------- */
        .ct-main {
          --ct-gold: #d6ad55;
          --ct-gold-hover: #f0cf82;
          --ct-maroon: #5a0f26;
          --ct-maroon-dark: #4a1026;
          --ct-maroon-hover: #68152f;
          --ct-charcoal: #2b2b2b;
          --ct-card: #fdf8f1;
          --ct-serif: Georgia, 'Times New Roman', serif;

          --ct-overlap: 6rem;   /* how far the cards hang below the maroon area */
          --ct-slide: 40px;     /* how far left/right cards travel while revealing */
          --ct-ease: cubic-bezier(.22, 1, .36, 1);

          background: #fff;
          overflow-x: clip;     /* no sideways scrollbar while cards slide */
        }

        .ct-main *,
        .ct-main *::before,
        .ct-main *::after {
          box-sizing: border-box;
        }

        /* ---------- Reveal animations ---------- */
        .ct-reveal {
          opacity: 0;
          transition:
            opacity .9s var(--ct-ease),
            transform .9s var(--ct-ease);
          will-change: opacity, transform;
        }

        .ct-reveal[data-from='left']  { transform: translateX(calc(var(--ct-slide) * -1)); }
        .ct-reveal[data-from='right'] { transform: translateX(var(--ct-slide)); }
        .ct-reveal[data-from='up']    { transform: translateY(28px); }

        .ct-reveal.ct-in {
          opacity: 1;
          transform: none;
        }

        /* Reveal wrappers keep the original layout behaviour */
        .ct-form-wrap,
        .ct-map-wrap {
          margin-top: auto;
        }

        /* Info rows fade up one after another once the panel appears */
        .ct-info-list .ct-info {
          opacity: 0;
        }

        .ct-in .ct-info {
          animation: ct-fade-up .7s var(--ct-ease) both;
          animation-delay: calc(var(--i, 0) * 110ms + 350ms);
        }

        @keyframes ct-fade-up {
          from { opacity: 0; transform: translateY(18px); }
          to   { opacity: 1; transform: translateY(0); }
        }

        /* Slow zoom on the campus photo */
        @keyframes ct-zoom {
          from { transform: scale(1); }
          to   { transform: scale(1.08); }
        }

        /* Soft pulse on the decorative rings */
        @keyframes ct-pulse {
          0%, 100% { transform: scale(1); }
          50%      { transform: scale(1.06); }
        }

        /* ---------- Hero ---------- */
        .ct-hero {
          position: relative;
          padding: 60px 0 0;
          background-color: var(--ct-maroon); /* header colour detection reads this */
          color: #fff;
        }

        /* White cover for the part of the cards that hangs below the maroon */
        .ct-hero::after {
          content: '';
          position: absolute;
          left: 0;
          right: 0;
          bottom: 0;
          height: var(--ct-overlap);
          background: #fff;
          z-index: 1;
        }

        .ct-hero-bg {
          position: absolute;
          top: 0;
          left: 0;
          right: 0;
          bottom: var(--ct-overlap);
          overflow: hidden;
          background: var(--ct-maroon);
        }

        .ct-hero-photo {
          position: absolute;
          inset: 0;
          background-image: url('/about/campus3.png');
          background-size: cover;
          background-position: center;
          opacity: .4;
          animation: ct-zoom 20s ease-in-out infinite alternate;
        }

        .ct-hero-overlay {
          position: absolute;
          inset: 0;
          background: linear-gradient(
            to right,
            rgba(106, 16, 41, .95),
            rgba(90, 15, 38, .85),
            rgba(74, 11, 31, .9)
          );
        }

        .ct-ring-1,
        .ct-ring-2 {
          position: absolute;
          width: 20rem;
          height: 20rem;
          border-radius: 50%;
          animation: ct-pulse 7s ease-in-out infinite;
        }

        .ct-ring-1 {
          bottom: -10rem;
          left: -8rem;
          border: 6px solid rgba(214, 173, 85, .7);
        }

        .ct-ring-2 {
          bottom: -11rem;
          left: -9rem;
          border: 1px solid rgba(214, 173, 85, .4);
          animation-delay: 1.2s;
        }

        .ct-container {
          position: relative;
          z-index: 2;
          max-width: 80rem;
          margin: 0 auto;
          padding: 3.5rem 1.5rem 0;
        }

        /* Two columns: LEFT = title + form, RIGHT = details + map */
        .ct-grid {
          display: grid;
          align-items: stretch;
          gap: 2.5rem;
        }

        .ct-left,
        .ct-side {
          display: flex;
          flex-direction: column;
        }

        .ct-eyebrow {
          display: block;
          font-size: .75rem;
          font-weight: 700;
          text-transform: uppercase;
          letter-spacing: .2em;
          color: var(--ct-gold);
        }

        .ct-title {
          margin: .75rem 0 0;
          font-family: var(--ct-serif);
          font-size: 3rem;
          font-weight: 700;
          line-height: 1.05;
        }

        .ct-title span {
          color: var(--ct-gold);
        }

      .ct-intro {
  max-width: 28rem;
  margin: 2rem 0 4rem;   /* was 2rem, increase this for more gap */
  font-size: .875rem;
  line-height: 1.75rem;
  color: rgba(255, 255, 255, .85);
}

     /* ---------- Form card ---------- */
.ct-form-card {
  padding: 1.10rem 1.10rem 1rem;      /* was 1.75rem 1.5rem 1.5rem */
  border-radius: 1.25rem;
  background: #fff;
  color: var(--ct-charcoal);
  box-shadow: 0 20px 45px -12px rgba(0, 0, 0, .3);
  transition:
    transform .35s var(--ct-ease),
    box-shadow .35s var(--ct-ease);
}

.ct-form-card:hover {
  transform: translateY(-8px);
  box-shadow: 0 32px 60px -14px rgba(0, 0, 0, .42);
}

.ct-form-eyebrow {
  display: block;
  font-size: .6875rem;
  font-weight: 700;
  text-transform: uppercase;
  letter-spacing: .2em;
  color: var(--ct-maroon);
}

.ct-form-title {
  margin: .75rem 0 0;
  font-family: var(--ct-serif);
  font-size: 1.25rem;                  /* was 1.75rem */
  font-weight: 700;
  line-height: 1.2;
  color: var(--ct-maroon-dark);
}

.ct-divider {
  display: block;
  width: 4rem;
  height: 2px;
  margin-top: .75rem;
  border-radius: 2px;
  background: linear-gradient(to right, var(--ct-gold), transparent);
}

.ct-form {
  display: flex;
  flex-direction: column;
   gap: .25rem;                        /* was 1.1rem */
  margin-top: .75rem;                   /* was 1.5rem */;
}

.ct-row {
  display: grid;
    gap: .25rem; 
}

.ct-field {
  min-width: 0;
}

.ct-label {
  display: block;
   margin-bottom: .2rem;               /* was .5rem */
  font-size: .75rem;
  font-weight: 500;
  color: #1f1f1f;
}

.ct-req {
  color: #ef4444;
}

.ct-input {
  width: 100%;
    padding: .4rem .6rem;               /* was .875rem 1rem */

  border: 1px solid #e9a9c6;           /* soft pink border */
  border-radius: .6rem;
  background: #fff;
  color: var(--ct-charcoal);
  font-family: inherit;
  font-size: .8125rem;
  outline: none;
  transition: border-color .2s ease, box-shadow .2s ease;
}

.ct-input::placeholder {
  color: #9a9aa5;
}

.ct-input:hover {
  border-color: #dc8db3;
}

.ct-input:focus {
  border-color: var(--ct-maroon);
  box-shadow: 0 0 0 3px rgba(90, 15, 38, .12);
}

.ct-input-error {
  border-color: #ef4444;
}

.ct-textarea {
  min-height: 2rem;                   /* was 7.5rem */
  resize: vertical;
}

/* Full-width gold pill button */
.ct-submit {
  display: flex;
  width: 100%;
  align-items: center;
  justify-content: center;
  gap: .6rem;
  margin-top: .25rem;
  padding: .25rem 1.10rem;            /* was 1rem 1.5rem */
  border: 0;
  border-radius: 9999px;
  background: #d4af5a;
  color: #2a0b16;
  font-family: inherit;
  font-size: .9rem;
  font-weight: 700;
  cursor: pointer;
  transition:
    transform .25s var(--ct-ease),
    box-shadow .25s var(--ct-ease),
    background .2s ease;
}

.ct-submit:hover:not(:disabled) {
  background: var(--ct-gold-hover);
  transform: translateY(-3px);
  box-shadow: 0 12px 22px -8px rgba(214, 173, 85, .8);
}

.ct-submit:active:not(:disabled) {
  transform: translateY(0);
}

.ct-submit:disabled {
  opacity: .6;
  cursor: not-allowed;
}

.ct-submit svg {
  width: 1rem;
  height: 1rem;
}

.ct-note {
  margin: 0;
  text-align: center;
  font-size: .75rem;
  color: #8b8b95;
}

        .ct-form-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 60px -14px rgba(0, 0, 0, .42);
        }

       

       
        

        
        /* ---------- Success state ---------- */
        .ct-success {
          display: flex;
          min-height: 300px;
          flex-direction: column;
          align-items: center;
          justify-content: center;
          text-align: center;
        }

        .ct-success-icon {
          display: flex;
          width: 4rem;
          height: 4rem;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: #f0fdf4;
          animation: ct-pop .6s var(--ct-ease) both;
        }

        @keyframes ct-pop {
          from { opacity: 0; transform: scale(.5); }
          to   { opacity: 1; transform: scale(1); }
        }

        .ct-success-icon svg {
          width: 2.25rem;
          height: 2.25rem;
          color: #16a34a;
        }

        .ct-success-title {
          margin: 1.25rem 0 0;
          font-family: var(--ct-serif);
          font-size: 1.5rem;
          font-weight: 700;
          color: var(--ct-maroon-dark);
        }

        .ct-success-text {
          max-width: 24rem;
          margin: .5rem 0 0;
          font-size: .875rem;
          line-height: 1.5rem;
          color: rgba(43, 43, 43, .6);
        }

        .ct-btn-maroon {
          margin-top: 1.5rem;
          padding: .625rem 1.75rem;
          border: 0;
          border-radius: 9999px;
          background: var(--ct-maroon-dark);
          color: #fff;
          font-size: .875rem;
          font-weight: 600;
          cursor: pointer;
          transition: background .2s ease, transform .25s var(--ct-ease);
        }

        .ct-btn-maroon:hover {
          background: var(--ct-maroon-hover);
          transform: translateY(-3px);
        }

        /* ---------- Right column: details + map ---------- */
        .ct-info-list {
          display: flex;
          flex-direction: column;
          gap: 1.25rem;
          margin-bottom: 2rem;
          padding: 1.5rem;
          border-radius: 1.25rem;
          background: rgba(255, 255, 255, .08);
          border: 1px solid rgba(255, 255, 255, .18);
          -webkit-backdrop-filter: blur(10px);
          backdrop-filter: blur(10px);
        }

        .ct-info {
          display: flex;
          gap: 1rem;
        }

        .ct-info-icon {
          display: flex;
          width: 2.5rem;
          height: 2.5rem;
          flex-shrink: 0;
          align-items: center;
          justify-content: center;
          border-radius: 50%;
          background: var(--ct-gold);
          color: #420b1d;
          transition:
            transform .35s var(--ct-ease),
            background .25s ease,
            box-shadow .25s ease;
        }

        .ct-info:hover .ct-info-icon {
          transform: scale(1.12) rotate(-8deg);
          background: var(--ct-gold-hover);
          box-shadow: 0 0 0 6px rgba(214, 173, 85, .22);
        }

        .ct-info-icon svg {
          width: 1rem;
          height: 1rem;
        }

        .ct-info-title {
          margin: 0;
          font-size: .875rem;
          font-weight: 700;
          color: #fff;
          transition: color .25s ease;
        }

        .ct-info:hover .ct-info-title {
          color: var(--ct-gold);
        }

        .ct-info-text {
          margin: .25rem 0 0;
          font-size: .75rem;
          line-height: 1.25rem;
          color: rgba(255, 255, 255, .85);
        }

        .ct-info-links {
          display: flex;
          flex-direction: column;
          gap: .125rem;
          margin-top: .25rem;
        }

        .ct-info-links a {
          font-size: .75rem;
          color: rgba(255, 255, 255, .85);
          text-decoration: none;
          transition: color .2s ease, transform .25s var(--ct-ease);
        }

        .ct-info-links a:hover {
          color: var(--ct-gold);
          transform: translateX(4px);
        }

        /* Map card */
        .ct-map-card {
          position: relative;
          overflow: hidden;
          border: 1px solid rgba(255, 255, 255, .35);
          border-radius: 1.25rem;
          background: #fff;
          box-shadow: 0 20px 45px -12px rgba(0, 0, 0, .3);
          transition:
            transform .35s var(--ct-ease),
            box-shadow .35s var(--ct-ease);
        }

        .ct-map-card:hover {
          transform: translateY(-8px);
          box-shadow: 0 32px 60px -14px rgba(0, 0, 0, .42);
        }

        .ct-map-frame {
          display: block;
          width: 100%;
          height: 340px;
          border: 0;
        }

        .ct-map-btn {
          position: absolute;
          right: 1rem;
          bottom: 1rem;
          display: inline-flex;
          align-items: center;
          gap: .5rem;
          padding: .625rem 1.25rem;
          border-radius: 9999px;
          background: var(--ct-maroon-dark);
          color: #fff;
          font-size: .75rem;
          font-weight: 700;
          text-decoration: none;
          box-shadow: 0 6px 14px -4px rgba(0, 0, 0, .45);
          transition: background .2s ease, transform .25s var(--ct-ease);
        }

        .ct-map-btn:hover {
          background: var(--ct-maroon-hover);
          transform: translateY(-2px);
        }

        .ct-map-btn svg {
          width: .875rem;
          height: .875rem;
          transition: transform .25s var(--ct-ease);
        }

        .ct-map-btn:hover svg {
          transform: translateX(4px);
        }

        /* ---------- Bottom admission banner ---------- */
        .ct-banner-section {
          padding: 4rem 1.5rem;
          background: #fff;
        }

        .ct-banner {
          position: relative;
          max-width: 80rem;
          margin: 0 auto;
          padding: 3rem 1.75rem;
          overflow: hidden;
          border-radius: 1.5rem;
          background: var(--ct-maroon);
          text-align: center;
        }

        .ct-banner-ring-1,
        .ct-banner-ring-2 {
          position: absolute;
          width: 16rem;
          height: 16rem;
          border-radius: 50%;
          animation: ct-pulse 8s ease-in-out infinite;
        }

        .ct-banner-ring-1 {
          top: -5rem;
          right: -4rem;
          border: 1px solid rgba(255, 255, 255, .1);
        }

        .ct-banner-ring-2 {
          bottom: -6rem;
          left: -4rem;
          border: 1px solid rgba(214, 173, 85, .2);
          animation-delay: 1.5s;
        }

        .ct-banner-inner {
          position: relative;
        }

        .ct-banner-title {
          margin: 0;
          font-family: var(--ct-serif);
          font-size: 1.875rem;
          font-weight: 700;
          color: #fff;
        }

        .ct-banner-text {
          max-width: 36rem;
          margin: 1rem auto 0;
          font-size: .875rem;
          line-height: 1.75rem;
          color: rgba(255, 255, 255, .7);
        }

        .ct-apply {
          display: inline-flex;
          align-items: center;
          gap: .75rem;
          margin-top: 2rem;
          padding: .875rem 2rem;
          border: 0;
          border-radius: 9999px;
          background: var(--ct-gold);
          color: #420b1d;
          font-size: .875rem;
          font-weight: 700;
          cursor: pointer;
          transition:
            transform .25s var(--ct-ease),
            background .2s ease,
            box-shadow .25s var(--ct-ease);
        }

        .ct-apply:hover {
          transform: translateY(-4px);
          background: var(--ct-gold-hover);
          box-shadow: 0 14px 26px -8px rgba(0, 0, 0, .45);
        }

        .ct-apply svg {
          width: 1rem;
          height: 1rem;
          transition: transform .25s var(--ct-ease);
        }

        .ct-apply:hover svg {
          transform: translateX(5px);
        }

        /* ---------- Responsive ---------- */
        @media (min-width: 640px) {
          .ct-main { --ct-slide: 70px; }
          .ct-container { padding-left: 2.5rem; padding-right: 2.5rem; }
.ct-form-title { font-size: 1.6rem; } /* was 2rem */
.ct-form-card { padding: 1.5rem; }    /* was 2rem */
          .ct-row { grid-template-columns: 1fr 1fr; }
          .ct-banner { padding-left: 3rem; padding-right: 3rem; }
          .ct-banner-section { padding-left: 2.5rem; padding-right: 2.5rem; }
          .ct-banner-title { font-size: 2.25rem; }
        }

        @media (min-width: 1024px) {
          .ct-main { --ct-overlap: 11rem; --ct-slide: 90px; }
          .ct-container { padding: 4rem 3rem 0; }
          .ct-grid {
            grid-template-columns: 1.15fr .85fr;
            gap: 3.5rem;
          }
          .ct-banner-section { padding-left: 3rem; padding-right: 3rem; }
        }

        /* ---------- Reduced motion: show everything, no movement ---------- */
        @media (prefers-reduced-motion: reduce) {
          .ct-main *,
          .ct-main *::before,
          .ct-main *::after {
            animation: none !important;
            transition: none !important;
          }
          .ct-reveal,
          .ct-info-list .ct-info {
            opacity: 1 !important;
            transform: none !important;
          }
        }
      `}</style>

      {/* HERO */}
      <section className="ct-hero">
        <div className="ct-hero-bg">
          <div className="ct-hero-photo" />
          <div className="ct-hero-overlay" />
          <div className="ct-ring-1" />
          <div className="ct-ring-2" />
        </div>

        <div className="ct-container">
          <div className="ct-grid">
            {/* LEFT COLUMN: title + form */}
            <div className="ct-left">
              <Reveal from="up">
                <span className="ct-eyebrow">Get in Touch</span>
              </Reveal>

              <Reveal from="up" delay={120}>
                <h1 className="ct-title">
                  Contact <span>Us</span>
                </h1>
              </Reveal>

              <Reveal from="up" delay={240}>
                <p className="ct-intro">
                  We&apos;re always here to help. Reach out for any queries,
                  admissions or support.
                </p>
              </Reveal>

              {/* FORM CARD: slides in from the left */}
              <Reveal from="left" delay={200} className="ct-form-wrap">
                <div id="contact-form" className="ct-form-card">
                  {status === 'success' ? (
                    <div className="ct-success">
                      <div className="ct-success-icon">
                        <CheckCircle2 />
                      </div>
                      <h3 className="ct-success-title">Message Sent!</h3>
                      <p className="ct-success-text">
                        Thank you for contacting St. Lourdes Engineering
                        College. We will get back to you soon.
                      </p>
                      <button
                        onClick={() => {
                          setFormData(initialForm);
                          setStatus('idle');
                        }}
                        className="ct-btn-maroon"
                      >
                        Send Another Message
                      </button>
                    </div>
                  ) : (
                   <>
  <span className="ct-form-eyebrow">Send a Message</span>
  <h2 className="ct-form-title">We&apos;d Love to Hear From You</h2>
  <span className="ct-divider" />

  <form onSubmit={handleSubmit} noValidate className="ct-form">
    <div className="ct-field">
      <label htmlFor="c-name" className="ct-label">
        Full Name <span className="ct-req">*</span>
      </label>
      <input
        id="c-name"
        type="text"
        value={formData.name}
        onChange={(e) => updateField('name', e.target.value)}
        className={`ct-input ${errors.name ? 'ct-input-error' : ''}`}
        placeholder="Enter your full name"
      />
      {errorText(errors.name)}
    </div>

    <div className="ct-row">
      <div className="ct-field">
        <label htmlFor="c-email" className="ct-label">
          Email <span className="ct-req">*</span>
        </label>
        <input
          id="c-email"
          type="email"
          value={formData.email}
          onChange={(e) => updateField('email', e.target.value)}
          className={`ct-input ${errors.email ? 'ct-input-error' : ''}`}
          placeholder="you@example.com"
        />
        {errorText(errors.email)}
      </div>

      <div className="ct-field">
        <label htmlFor="c-phone" className="ct-label">
          Phone <span className="ct-req">*</span>
        </label>
        <input
          id="c-phone"
          type="tel"
          value={formData.phone}
          onChange={(e) => updateField('phone', e.target.value)}
          className={`ct-input ${errors.phone ? 'ct-input-error' : ''}`}
          placeholder="+91 XXXXX XXXXX"
        />
        {errorText(errors.phone)}
      </div>
    </div>

    <div className="ct-field">
      <label htmlFor="c-subject" className="ct-label">
        Subject <span className="ct-req">*</span>
      </label>
      <input
        id="c-subject"
        type="text"
        value={formData.subject}
        onChange={(e) => updateField('subject', e.target.value)}
        className={`ct-input ${errors.subject ? 'ct-input-error' : ''}`}
        placeholder="What is your message about?"
      />
      {errorText(errors.subject)}
    </div>

    <div className="ct-field">
      <label htmlFor="c-message" className="ct-label">
        Message <span className="ct-req">*</span>
      </label>
      <textarea
        id="c-message"
        rows={5}
        value={formData.message}
        onChange={(e) => updateField('message', e.target.value)}
        className={`ct-input ct-textarea ${errors.message ? 'ct-input-error' : ''}`}
        placeholder="Write your message here..."
      />
      {errorText(errors.message)}
    </div>

    {status === 'error' && (
      <div className="ct-alert">
        <AlertCircle />
        Sorry, your message could not be sent. Please try again or contact
        us directly.
      </div>
    )}

    <button
      type="submit"
      disabled={status === 'submitting'}
      className="ct-submit"
    >
      {status === 'submitting' ? (
        <>
          <Loader2 className="ct-spin" />
          Sending...
        </>
      ) : (
        <>
          <Send />
          Send Message
        </>
      )}
    </button>

    <p className="ct-note">
      Your details are used only to respond to your enquiry.
    </p>
  </form>
</>
                  )}
                </div>
              </Reveal>
            </div>

            {/* RIGHT COLUMN: contact details + map (slide in from the right) */}
            <div className="ct-side">
              <Reveal from="right">
                <div className="ct-info-list">
                  <div className="ct-info" style={{ ['--i' as string]: 0 }}>
                    <div className="ct-info-icon">
                      <MapPin />
                    </div>
                    <div>
                      <h3 className="ct-info-title">Our Address</h3>
                      <p className="ct-info-text">
                        {siteConfig.address.line1}
                        <br />
                        {siteConfig.address.line2}
                        <br />
                        {siteConfig.address.line3}
                        <br />
                        {siteConfig.address.line4}
                      </p>
                    </div>
                  </div>

                  <div className="ct-info" style={{ ['--i' as string]: 1 }}>
                    <div className="ct-info-icon">
                      <Phone />
                    </div>
                    <div>
                      <h3 className="ct-info-title">Phone Numbers</h3>
                      <div className="ct-info-links">
                        {siteConfig.phones.map((phone) => (
                          <a
                            key={phone}
                            href={`tel:${phone.replace(/\s/g, '')}`}
                          >
                            {phone}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ct-info" style={{ ['--i' as string]: 2 }}>
                    <div className="ct-info-icon">
                      <Mail />
                    </div>
                    <div>
                      <h3 className="ct-info-title">Email Us</h3>
                      <div className="ct-info-links">
                        {siteConfig.emails.map((email) => (
                          <a key={email} href={`mailto:${email}`}>
                            {email}
                          </a>
                        ))}
                      </div>
                    </div>
                  </div>

                  <div className="ct-info" style={{ ['--i' as string]: 3 }}>
                    <div className="ct-info-icon">
                      <Clock />
                    </div>
                    <div>
                      <h3 className="ct-info-title">Office Hours</h3>
                      <p className="ct-info-text">
                        Mon - Fri: 9:00 AM - 5:00 PM
                        <br />
                        Saturday: 9:00 AM - 1:00 PM
                        <br />
                        Sunday: Closed
                      </p>
                    </div>
                  </div>
                </div>
              </Reveal>

              {/* MAP CARD: slides in from the right */}
              <Reveal from="right" delay={200} className="ct-map-wrap">
                <div className="ct-map-card">
                  <iframe
                    title="St. Lourdes Engineering College Location"
                    src={MAP_EMBED_SRC}
                    className="ct-map-frame"
                    loading="lazy"
                    referrerPolicy="no-referrer-when-downgrade"
                    allowFullScreen
                  />
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="ct-map-btn"
                  >
                    View on Map
                    <ArrowRight />
                  </a>
                </div>
              </Reveal>
            </div>
          </div>
        </div>
      </section>

      {/* BOTTOM ADMISSION BANNER */}
      <section className="ct-banner-section">
        <Reveal from="up">
          <div className="ct-banner">
            <div className="ct-banner-ring-1" />
            <div className="ct-banner-ring-2" />

            <div className="ct-banner-inner">
              <h2 className="ct-banner-title">Your Future Starts Here</h2>
              <p className="ct-banner-text">
                Take the next step towards your academic and professional goals.
                Connect with St. Lourdes Engineering College today.
              </p>
              <button onClick={openModal} className="ct-apply">
                Apply Now
                <ArrowRight />
              </button>
            </div>
          </div>
        </Reveal>
      </section>
    </main>
  );
}