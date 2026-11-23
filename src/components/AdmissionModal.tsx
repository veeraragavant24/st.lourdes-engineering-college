import { useEffect, useState, type FormEvent } from 'react';
import { X, CheckCircle2, AlertCircle, Loader2, Send } from 'lucide-react';
import { programs } from '@/data/programs';
import { api, type AdmissionEnquiry } from '@/services/api';
import { useAdmissionModal } from './AdmissionModalContext';

type Status = 'idle' | 'submitting' | 'success' | 'demo-success' | 'error';

interface FormErrors {
  name?: string;
  email?: string;
  phone?: string;
  message?: string;
}

function validate(data: AdmissionEnquiry): FormErrors {
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
  if (!data.message.trim()) errors.message = 'Please enter a message';
  return errors;
}

export default function AdmissionModal() {
  const { isOpen, closeModal } = useAdmissionModal();
  const [formData, setFormData] = useState<AdmissionEnquiry>({
    name: '',
    email: '',
    phone: '',
    program: programs[0].name,
    message: '',
  });
  const [errors, setErrors] = useState<FormErrors>({});
  const [status, setStatus] = useState<Status>('idle');

  useEffect(() => {
    if (isOpen) {
      document.body.style.overflow = 'hidden';
    } else {
      document.body.style.overflow = '';
      setStatus('idle');
      setErrors({});
    }
    return () => {
      document.body.style.overflow = '';
    };
  }, [isOpen]);

  if (!isOpen) return null;

  const handleSubmit = async (e: FormEvent) => {
    e.preventDefault();
    const validationErrors = validate(formData);
    if (Object.keys(validationErrors).length > 0) {
      setErrors(validationErrors);
      return;
    }
    setErrors({});
    setStatus('submitting');

    const result = await api.submitAdmissionEnquiry(formData);

    if (result.success) {
      setStatus('success');
    } else {
      // No backend configured — show demo success state, clearly labeled.
      setStatus('demo-success');
    }
  };

  const handleClose = () => {
    closeModal();
    if (status === 'success' || status === 'demo-success') {
      setFormData({ name: '', email: '', phone: '', program: programs[0].name, message: '' });
    }
  };

  const updateField = (field: keyof AdmissionEnquiry, value: string) => {
    setFormData((prev) => ({ ...prev, [field]: value }));
    if (errors[field as keyof FormErrors]) {
      setErrors((prev) => ({ ...prev, [field]: undefined }));
    }
  };

  const inputClass = (error?: string) =>
    `w-full rounded-lg border px-3 py-2 text-sm text-charcoal transition-colors duration-200 focus:outline-none focus:ring-2 sm:px-4 sm:py-3 ${
      error
        ? 'border-red-400 focus:ring-red-300'
        : 'border-maroon-200 focus:border-gold focus:ring-gold/30'
    }`;

  const labelClass = 'mb-1 block text-xs font-medium text-charcoal sm:mb-1.5 sm:text-sm';

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-3 sm:p-4">
      <div
        className="absolute inset-0 bg-maroon-900/70 backdrop-blur-sm animate-fade-in"
        onClick={handleClose}
      />

      <div className="relative z-10 max-h-[85dvh] w-full max-w-[22rem] overflow-y-auto rounded-xl bg-white shadow-2xl animate-scale-in sm:max-h-[90vh] sm:max-w-lg sm:rounded-2xl">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-xl bg-gradient-to-br from-maroon-600 to-maroon-800 px-4 py-4 sm:rounded-t-2xl sm:px-8 sm:py-6">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-gold/10" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="eyebrow text-gold-100">Admission Enquiry</p>
              <h2 className="mt-0.5 font-serif text-lg font-bold text-ivory sm:mt-1 sm:text-2xl">
                Begin Your Journey
              </h2>
              <p className="mt-0.5 text-xs text-ivory/70 sm:mt-1 sm:text-sm">
                Fill in your details and we'll get back to you.
              </p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1 text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory sm:p-1.5"
              aria-label="Close form"
            >
              <X className="h-4 w-4 sm:h-5 sm:w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-4 py-4 sm:px-8 sm:py-6">
          {(status === 'success' || status === 'demo-success') && (
            <div className="py-3 text-center sm:py-6">
              <div className="mx-auto flex h-12 w-12 items-center justify-center rounded-full bg-green-50 sm:h-16 sm:w-16">
                <CheckCircle2 className="h-7 w-7 text-green-600 sm:h-9 sm:w-9" />
              </div>
              <h3 className="mt-3 font-serif text-lg font-bold text-maroon-700 sm:mt-4 sm:text-xl">
                Enquiry Received!
              </h3>
              <p className="mt-2 text-sm text-charcoal/70">
                Thank you for your interest in ST. Lourdes Engineering College.
                {status === 'demo-success' && (
                  <span className="mt-2 block rounded-lg bg-gold-50 px-4 py-2 text-xs text-gold-600">
                    Demo mode: No backend is connected yet. Your enquiry was not saved to a server.
                    This form is ready for .NET API integration.
                  </span>
                )}
                {status === 'success' && ' Our admissions team will contact you shortly.'}
              </p>
              <button onClick={handleClose} className="btn-maroon mt-4 sm:mt-6">
                Close
              </button>
            </div>
          )}

          {status !== 'success' && status !== 'demo-success' && (
            <form onSubmit={handleSubmit} className="space-y-3 sm:space-y-4" noValidate>
              <div>
                <label htmlFor="adm-name" className={labelClass}>
                  Full Name <span className="text-red-500">*</span>
                </label>
                <input
                  id="adm-name"
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

              <div className="grid gap-3 sm:grid-cols-2 sm:gap-4">
                <div>
                  <label htmlFor="adm-email" className={labelClass}>
                    Email <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="adm-email"
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
                  <label htmlFor="adm-phone" className={labelClass}>
                    Phone <span className="text-red-500">*</span>
                  </label>
                  <input
                    id="adm-phone"
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
                <label htmlFor="adm-program" className={labelClass}>
                  Program of Interest
                </label>
                <select
                  id="adm-program"
                  value={formData.program}
                  onChange={(e) => updateField('program', e.target.value)}
                  className={inputClass()}
                >
                  {programs.map((p) => (
                    <option key={p.id} value={p.name}>
                      {p.name}
                    </option>
                  ))}
                </select>
              </div>

              <div>
                <label htmlFor="adm-message" className={labelClass}>
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="adm-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`${inputClass(errors.message)} max-h-20 resize-none sm:max-h-none`}
                  placeholder="Tell us about your interests or questions..."
                />
                {errors.message && (
                  <p className="mt-1 flex items-center gap-1 text-xs text-red-500">
                    <AlertCircle className="h-3.5 w-3.5" /> {errors.message}
                  </p>
                )}
              </div>

              <button
                type="submit"
                disabled={status === 'submitting'}
                className="btn-gold w-full disabled:opacity-60"
              >
                {status === 'submitting' ? (
                  <>
                    <Loader2 className="h-4 w-4 animate-spin" /> Submitting...
                  </>
                ) : (
                  <>
                    <Send className="h-4 w-4" /> Submit Enquiry
                  </>
                )}
              </button>

              <p className="text-center text-[11px] text-charcoal/50 sm:text-xs">
                Demo form — ready for .NET Web API integration. No data is sent to a server yet.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}