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
    `w-full rounded-lg border px-4 py-3 text-sm text-charcoal transition-colors duration-200 focus:outline-none focus:ring-2 ${
      error
        ? 'border-red-400 focus:ring-red-300'
        : 'border-maroon-200 focus:border-gold focus:ring-gold/30'
    }`;

  return (
    <div className="fixed inset-0 z-[70] flex items-center justify-center p-4">
      <div className="absolute inset-0 bg-maroon-900/70 backdrop-blur-sm animate-fade-in" onClick={handleClose} />

      <div className="relative z-10 max-h-[90vh] w-full max-w-lg overflow-y-auto rounded-2xl bg-white shadow-2xl animate-scale-in">
        {/* Header */}
        <div className="relative overflow-hidden rounded-t-2xl bg-gradient-to-br from-maroon-600 to-maroon-800 px-6 py-6 sm:px-8">
          <div className="absolute right-0 top-0 h-32 w-32 -translate-y-12 translate-x-12 rounded-full bg-gold/10" />
          <div className="relative flex items-start justify-between">
            <div>
              <p className="eyebrow text-gold-100">Admission Enquiry</p>
              <h2 className="mt-1 font-serif text-2xl font-bold text-ivory">Begin Your Journey</h2>
              <p className="mt-1 text-sm text-ivory/70">Fill in your details and we'll get back to you.</p>
            </div>
            <button
              onClick={handleClose}
              className="rounded-full p-1.5 text-ivory/70 transition-colors hover:bg-white/10 hover:text-ivory"
              aria-label="Close form"
            >
              <X className="h-5 w-5" />
            </button>
          </div>
        </div>

        {/* Body */}
        <div className="px-6 py-6 sm:px-8">
          {(status === 'success' || status === 'demo-success') && (
            <div className="text-center py-6">
              <div className="mx-auto flex h-16 w-16 items-center justify-center rounded-full bg-green-50">
                <CheckCircle2 className="h-9 w-9 text-green-600" />
              </div>
              <h3 className="mt-4 font-serif text-xl font-bold text-maroon-700">Enquiry Received!</h3>
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
              <button onClick={handleClose} className="btn-maroon mt-6">
                Close
              </button>
            </div>
          )}

          {status !== 'success' && status !== 'demo-success' && (
            <form onSubmit={handleSubmit} className="space-y-4" noValidate>
              <div>
                <label htmlFor="adm-name" className="mb-1.5 block text-sm font-medium text-charcoal">
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

              <div className="grid gap-4 sm:grid-cols-2">
                <div>
                  <label htmlFor="adm-email" className="mb-1.5 block text-sm font-medium text-charcoal">
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
                  <label htmlFor="adm-phone" className="mb-1.5 block text-sm font-medium text-charcoal">
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
                <label htmlFor="adm-program" className="mb-1.5 block text-sm font-medium text-charcoal">
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
                <label htmlFor="adm-message" className="mb-1.5 block text-sm font-medium text-charcoal">
                  Message <span className="text-red-500">*</span>
                </label>
                <textarea
                  id="adm-message"
                  rows={4}
                  value={formData.message}
                  onChange={(e) => updateField('message', e.target.value)}
                  className={`${inputClass(errors.message)} resize-none`}
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

              <p className="text-center text-xs text-charcoal/50">
                Demo form — ready for .NET Web API integration. No data is sent to a server yet.
              </p>
            </form>
          )}
        </div>
      </div>
    </div>
  );
}
