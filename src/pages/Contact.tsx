import {
  MapPin,
  Mail,
  Phone,
  Clock,
  Send,
  AlertCircle,
  CheckCircle2,
  Loader2,
} from 'lucide-react';
import { useState, type FormEvent } from 'react';
import PageHero from '@/components/PageHero';
import { siteConfig } from '@/data/siteConfig';
import { useAdmissionModal } from '@/components/AdmissionModalContext';

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

type Status = 'idle' | 'submitting' | 'success' | 'demo-success' | 'error';

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

export default function Contact() {
  const { openModal } = useAdmissionModal();
  const [formData, setFormData] = useState<ContactForm>({
    name: '',
    email: '',
    phone: '',
    subject: '',
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  const handleSubmit = (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');
    // No backend configured — simulate demo submission
    setTimeout(() => setStatus('demo-success'), 1000);
  };

  const updateField = (field: keyof ContactForm, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg border px-4 py-3 text-sm text-charcoal transition-colors duration-200 focus:outline-none focus:ring-2 ${
      error
        ? 'border-red-400 focus:ring-red-300'
        : 'border-maroon-200 focus:border-gold focus:ring-gold/30'
    }`;

  return (
    <>
      <PageHero
        eyebrow="Get in Touch"
        title="Contact Us"
        description="Have a question about admissions, programs, or campus life? We're here to help. Reach out and we'll get back to you."
        image="https://images.pexels.com/photos/11932106/pexels-photo-11932106.jpeg?auto=compress&cs=tinysrgb&w=1920&h=1080&fit=crop"
        breadcrumb="Contact Us"
      />

      {/* Contact info cards */}
      <section className="section-pad bg-white">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
            {/* Address */}
            <div className="rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                <MapPin className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-maroon-700">Our Address</h3>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <p className="mt-3 text-sm leading-relaxed text-charcoal/60">
                {siteConfig.address.line1}<br />
                {siteConfig.address.line2}<br />
                {siteConfig.address.line3}<br />
                {siteConfig.address.line4}
              </p>
              <a
                href={siteConfig.mapUrl}
                target="_blank"
                rel="noopener noreferrer"
                className="mt-4 inline-flex items-center gap-1.5 text-xs font-semibold uppercase tracking-wider text-maroon-600 transition-colors hover:text-gold"
              >
                View on Map
              </a>
            </div>

            {/* Phone */}
            <div className="rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                <Phone className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-maroon-700">Phone Numbers</h3>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <ul className="mt-3 space-y-2">
                {siteConfig.phones.map((phone) => (
                  <li key={phone}>
                    <a
                      href={`tel:${phone.replace(/\s/g, '')}`}
                      className="text-sm text-charcoal/60 transition-colors hover:text-maroon-600"
                    >
                      {phone}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Email */}
            <div className="rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                <Mail className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-maroon-700">Email Us</h3>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <ul className="mt-3 space-y-2">
                {siteConfig.emails.map((email) => (
                  <li key={email}>
                    <a
                      href={`mailto:${email}`}
                      className="text-sm text-charcoal/60 transition-colors hover:text-maroon-600"
                    >
                      {email}
                    </a>
                  </li>
                ))}
              </ul>
            </div>

            {/* Office hours */}
            <div className="rounded-2xl border border-gold/10 bg-ivory p-6 shadow-sm transition-all duration-300 hover:-translate-y-1 hover:shadow-lg">
              <div className="flex h-12 w-12 items-center justify-center rounded-full bg-maroon-50 text-maroon-600">
                <Clock className="h-6 w-6" strokeWidth={1.5} />
              </div>
              <h3 className="mt-4 font-serif text-lg font-bold text-maroon-700">Office Hours</h3>
              <div className="mt-4 h-px w-12 bg-gold/30" />
              <ul className="mt-3 space-y-2 text-sm text-charcoal/60">
                <li className="flex justify-between">
                  <span>Mon &ndash; Fri</span>
                  <span>9:00 AM &ndash; 5:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Saturday</span>
                  <span>9:00 AM &ndash; 1:00 PM</span>
                </li>
                <li className="flex justify-between">
                  <span>Sunday</span>
                  <span>Closed</span>
                </li>
              </ul>
            </div>
          </div>
        </div>
      </section>

      {/* Contact form + map */}
      <section className="section-pad bg-ivory">
        <div className="mx-auto max-w-7xl">
          <div className="grid gap-8 lg:grid-cols-2 lg:gap-12">
            {/* Form */}
            <div className="rounded-2xl border border-gold/10 bg-white p-7 shadow-sm sm:p-8">
              <p className="eyebrow">Send a Message</p>
              <h2 className="mt-2 font-serif text-2xl font-bold text-maroon-700 sm:text-3xl">
                We'd Love to Hear From You
              </h2>
              <div className="mt-3 h-px w-16 bg-gradient-to-r from-gold to-transparent" />

              {(status === 'success' || status === 'demo-success') ? (
                <div className="mt-8 text-center py-8">
                  <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                    <CheckCircle2 className="h-9 w-9 text-green-600" />
                  </div>
                  <h3 className="mt-4 font-serif text-xl font-bold text-maroon-700">Message Sent!</h3>
                  <p className="mt-2 text-sm text-charcoal/70">
                    Thank you for reaching out to ST. Lourdes Engineering College.
                  </p>
                  {status === 'demo-success' && (
                    <p className="mt-3 rounded-lg bg-gold-50 px-4 py-2 text-xs text-gold-600">
                      Demo mode: No backend is connected yet. Your message was not sent. This form is
                      ready for .NET API integration.
                    </p>
                  )}
                  <button
                    onClick={() => {
                      setFormData({ name: '', email: '', phone: '', subject: '', message: '' });
                      setStatus('idle');
                    }}
                    className="btn-maroon mt-6"
                  >
                    Send Another Message
                  </button>
                </div>
              ) : (
                <form onSubmit={handleSubmit} className="mt-6 space-y-4" noValidate>
                  <div>
                    <label htmlFor="c-name" className="mb-1.5 block text-sm font-medium text-charcoal">
                      Full Name <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="c-name"
                      type="text"
                      value={formData.name}
                      onChange={(e) => updateField('name', e.target.value)}
                      className={inputClass(errors.name)}
                      placeholder="Enter your full name"
                    />
                    {errors.name && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.name}
                      </p>
                    )}
                  </div>

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label htmlFor="c-email" className="mb-1.5 block text-sm font-medium text-charcoal">
                        Email <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-email"
                        type="email"
                        value={formData.email}
                        onChange={(e) => updateField('email', e.target.value)}
                        className={inputClass(errors.email)}
                        placeholder="you@example.com"
                      />
                      {errors.email && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.email}
                        </p>
                      )}
                    </div>

                    <div>
                      <label htmlFor="c-phone" className="mb-1.5 block text-sm font-medium text-charcoal">
                        Phone <span className="text-red-500">*</span>
                      </label>
                      <input
                        id="c-phone"
                        type="tel"
                        value={formData.phone}
                        onChange={(e) => updateField('phone', e.target.value)}
                        className={inputClass(errors.phone)}
                        placeholder="+91 XXXXX XXXXX"
                      />
                      {errors.phone && (
                        <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                          <AlertCircle className="h-3.5 w-3.5" /> {errors.phone}
                        </p>
                      )}
                    </div>
                  </div>

                  <div>
                    <label htmlFor="c-subject" className="mb-1.5 block text-sm font-medium text-charcoal">
                      Subject <span className="text-red-500">*</span>
                    </label>
                    <input
                      id="c-subject"
                      type="text"
                      value={formData.subject}
                      onChange={(e) => updateField('subject', e.target.value)}
                      className={inputClass(errors.subject)}
                      placeholder="What is your message about?"
                    />
                    {errors.subject && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.subject}
                      </p>
                    )}
                  </div>

                  <div>
                    <label htmlFor="c-message" className="mb-1.5 block text-sm font-medium text-charcoal">
                      Message <span className="text-red-500">*</span>
                    </label>
                    <textarea
                      id="c-message"
                      rows={5}
                      value={formData.message}
                      onChange={(e) => updateField('message', e.target.value)}
                      className={`${inputClass(errors.message)} resize-none`}
                      placeholder="Write your message here..."
                    />
                    {errors.message && (
                      <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                        <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                      </p>
                    )}
                  </div>

                  <button type="submit" disabled={status === 'submitting'} className="btn-gold w-full disabled:opacity-60">
                    {status === 'submitting' ? (
                      <>
                        <Loader2 className="h-4 w-4 animate-spin" /> Sending...
                      </>
                    ) : (
                      <>
                        <Send className="h-4 w-4" /> Send Message
                      </>
                    )}
                  </button>

                  <p className="text-center text-xs text-charcoal/50">
                    Demo form &mdash; ready for .NET Web API integration. No data is sent to a server yet.
                  </p>
                </form>
              )}
            </div>

            {/* Map + quick contact */}
            <div className="flex flex-col gap-6">
              <div className="overflow-hidden rounded-2xl border border-gold/10 shadow-sm">
                <iframe
                  title="ST. Lourdes Engineering College location"
                  src="https://www.openstreetmap.org/export/embed.html?bbox=80.07%2C12.90%2C80.14%2C12.95&layer=mapnik&marker=12.925%2C80.105"
                  className="h-80 w-full"
                  loading="lazy"
                  referrerPolicy="no-referrer-when-downgrade"
                />
              </div>

              <div className="rounded-2xl border border-gold/10 bg-white p-6 shadow-sm">
                <h3 className="font-serif text-lg font-bold text-maroon-700">Quick Actions</h3>
                <div className="mt-4 h-px w-12 bg-gold/30" />
                <div className="mt-4 space-y-3">
                  <button
                    onClick={openModal}
                    className="flex w-full items-center justify-between rounded-lg border border-gold/20 bg-gold-50 px-4 py-3 text-sm font-medium text-maroon-700 transition-colors hover:bg-gold/20"
                  >
                    Admission Enquiry
                    <Send className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  </button>
                  <a
                    href={siteConfig.mapUrl}
                    target="_blank"
                    rel="noopener noreferrer"
                    className="flex w-full items-center justify-between rounded-lg border border-gold/20 bg-gold-50 px-4 py-3 text-sm font-medium text-maroon-700 transition-colors hover:bg-gold/20"
                  >
                    Get Directions
                    <MapPin className="h-4 w-4 text-gold" strokeWidth={1.5} />
                  </a>
                </div>
              </div>
            </div>
          </div>
        </div>
      </section>
    </>
  );
}
