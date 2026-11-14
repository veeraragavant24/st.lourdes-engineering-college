
import { useState } from 'react';
import { Link, useNavigate } from 'react-router-dom';
import {
  Lock,
  User,
  Eye,
  EyeOff,
  ArrowRight,
  ShieldCheck,
  GraduationCap,
  Newspaper,
  CalendarDays,
  Image as ImageIcon,
  Building2,
  BedDouble,
  Utensils,
  CheckCircle2,
} from 'lucide-react';

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5013'
).replace(/\/$/, '');

interface LoginResponse {
  token?: string;
  name?: string;
  email?: string;
  message?: string;
}

type AdminPortal = 'news-events' | 'hostel';

export default function AdminLogin() {
  const navigate = useNavigate();

  const [selectedPortal, setSelectedPortal] =
    useState<AdminPortal>('news-events');

  const [email, setEmail] = useState('');
  const [password, setPassword] = useState('');
  const [showPassword, setShowPassword] = useState(false);
  const [rememberMe, setRememberMe] = useState(false);
  const [isLoading, setIsLoading] = useState(false);
  const [error, setError] = useState('');

  const portalDetails = {
    'news-events': {
      title: 'News & Events Management',
      description: 'Manage college news, events, announcements and photographs.',
      destination: '/admin/news-events',
    },
    hostel: {
      title: 'Hostel Management',
      description: 'Manage hostel rooms, mess menus, wardens, gallery and notices.',
      destination: '/hosteladmin',
    },
  };

  const handlePortalChange = (portal: AdminPortal) => {
    setSelectedPortal(portal);
    setError('');
  };

  const handleSubmit = async (e: React.FormEvent<HTMLFormElement>) => {
    e.preventDefault();
    setError('');

    if (!email.trim() || !password) {
      setError('Please enter your email and password.');
      return;
    }

    setIsLoading(true);

    try {
      const response = await fetch(`${API_BASE_URL}/api/admin/auth/login`, {
        method: 'POST',
        headers: {
          'Content-Type': 'application/json',
          Accept: 'application/json',
        },
        body: JSON.stringify({
          email: email.trim().toLowerCase(),
          password,
        }),
      });

      const data: LoginResponse = await response.json().catch(() => ({}));

      if (!response.ok) {
        setError(
          response.status === 401
            ? 'Invalid email or password.'
            : data.message || 'Unable to sign in. Please try again.'
        );
        return;
      }

      if (!data.token) {
        setError('Authentication token was not returned by the server.');
        return;
      }

      const storage = rememberMe ? localStorage : sessionStorage;

      // Save authentication details
      storage.setItem('adminToken', data.token);

      if (data.name) storage.setItem('adminName', data.name);
      if (data.email) storage.setItem('adminEmail', data.email);

      // Save selected dashboard
      storage.setItem('adminPortal', selectedPortal);

      // Navigate to selected dashboard
      navigate(portalDetails[selectedPortal].destination, {
        replace: true,
      });
    } catch (err) {
      console.error('Admin login error:', err);
      setError(
        'Cannot connect to the server. Please check whether the .NET API is running.'
      );
    } finally {
      setIsLoading(false);
    }
  };

  return (
    <main className="min-h-screen bg-[#fcf9f4] lg:grid lg:grid-cols-2">

      {/* LEFT BRANDING PANEL */}
      <section className="relative hidden min-h-screen overflow-hidden bg-[#70152f] lg:flex">
        <img
          src="https://images.pexels.com/photos/207692/pexels-photo-207692.jpeg?auto=compress&cs=tinysrgb&w=1600"
          alt="College campus"
          className="absolute inset-0 h-full w-full object-cover opacity-20"
        />

        <div className="absolute inset-0 bg-gradient-to-br from-[#4b0b20]/95 via-[#70152f]/90 to-[#3c091a]/95" />

        <div className="relative z-10 flex w-full flex-col justify-between p-12 xl:p-16">

          <Link to="/" className="flex items-center gap-4">
            <div className="flex h-16 w-16 items-center justify-center rounded-full border-2 border-[#d8b45c] bg-[#d8b45c] shadow-lg">
              <GraduationCap size={34} className="text-[#70152f]" />
            </div>

            <div>
              <h2 className="font-serif text-2xl font-bold text-white">
                ST. Lourdes
              </h2>
              <p className="text-sm font-bold tracking-[0.18em] text-[#e8c56c]">
                ENGINEERING COLLEGE
              </p>
            </div>
          </Link>

          <div className="max-w-xl">
            <div className="mb-5 inline-flex items-center gap-2 rounded-full border border-[#d8b45c]/40 bg-white/10 px-4 py-2 text-xs font-bold uppercase tracking-[0.18em] text-[#f2d58b]">
              <ShieldCheck size={15} />
              Authorized Administration
            </div>

            <h1 className="font-serif text-5xl font-bold leading-tight text-white xl:text-6xl">
              College
              <br />
              <span className="text-[#e8c56c]">Administration</span>
              <br />
              Portal
            </h1>

            <p className="mt-6 max-w-lg text-base leading-8 text-white/75">
              A centralized administration portal to manage college
              announcements, events, hostel facilities and important
              institutional information.
            </p>

            <div className="mt-10 space-y-5">
              {[
                {
                  icon: Newspaper,
                  title: 'News & Events Management',
                  description: 'Publish announcements and college events.',
                },
                {
                  icon: CalendarDays,
                  title: 'College Activities',
                  description: 'Manage programmes and achievements.',
                },
                {
                  icon: Building2,
                  title: 'Hostel Management',
                  description: 'Manage boys and girls hostel facilities.',
                },
                {
                  icon: Utensils,
                  title: 'Mess & Room Management',
                  description: 'Update mess menus and room availability.',
                },
              ].map((item) => (
                <div key={item.title} className="flex items-center gap-4">
                  <div className="flex h-12 w-12 shrink-0 items-center justify-center rounded-xl border border-[#d8b45c]/30 bg-[#4b0b20]/70">
                    <item.icon size={22} className="text-[#e8c56c]" />
                  </div>

                  <div>
                    <h3 className="font-semibold text-white">{item.title}</h3>
                    <p className="mt-1 text-sm text-white/60">
                      {item.description}
                    </p>
                  </div>
                </div>
              ))}
            </div>
          </div>

          <p className="text-xs tracking-wide text-white/50">
            © {new Date().getFullYear()} ST. Lourdes Engineering College.
            All rights reserved.
          </p>
        </div>
      </section>

      {/* RIGHT LOGIN PANEL */}
      <section className="flex min-h-screen items-center justify-center px-5 py-10 sm:px-8">

        <div className="w-full max-w-md">

          {/* MOBILE BRANDING */}
          <Link
            to="/"
            className="mb-10 flex items-center justify-center gap-3 lg:hidden"
          >
            <div className="flex h-14 w-14 items-center justify-center rounded-full bg-[#70152f]">
              <GraduationCap size={29} className="text-[#e8c56c]" />
            </div>

            <div>
              <h2 className="font-serif text-xl font-bold text-[#70152f]">
                ST. Lourdes
              </h2>
              <p className="text-xs font-bold tracking-widest text-[#ad8536]">
                ENGINEERING COLLEGE
              </p>
            </div>
          </Link>

          <div className="rounded-3xl border border-[#eadfd2] bg-white p-7 shadow-[0_20px_60px_rgba(75,11,32,0.09)] sm:p-10">

            {/* LOGIN HEADING */}
            <div className="mb-7 text-center">
              <div className="mx-auto mb-5 flex h-16 w-16 items-center justify-center rounded-2xl bg-[#70152f] shadow-lg shadow-[#70152f]/20">
                <Lock size={29} className="text-[#e8c56c]" />
              </div>

              <p className="mb-2 text-xs font-bold uppercase tracking-[0.2em] text-[#ad8536]">
                Administration Access
              </p>

              <h2 className="font-serif text-3xl font-bold text-[#70152f]">
                Admin Login
              </h2>

              <p className="mt-3 text-sm text-slate-500">
                Select your administration department to continue.
              </p>
            </div>

            {/* ADMIN PORTAL SELECTION */}
            <div className="mb-7">
              <label className="mb-3 block text-sm font-semibold text-[#481024]">
                Choose Management Portal
              </label>

              <div className="grid grid-cols-2 gap-3">

                {/* NEWS AND EVENTS */}
                <button
                  type="button"
                  onClick={() => handlePortalChange('news-events')}
                  disabled={isLoading}
                  className={`relative flex min-h-[145px] flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition ${
                    selectedPortal === 'news-events'
                      ? 'border-[#70152f] bg-[#70152f]/5 shadow-md'
                      : 'border-[#eadfd2] bg-[#fffdfa] hover:border-[#ad8536]'
                  }`}
                >
                  {selectedPortal === 'news-events' && (
                    <CheckCircle2
                      size={19}
                      className="absolute right-3 top-3 text-[#70152f]"
                    />
                  )}

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#70152f]">
                    <Newspaper size={24} className="text-[#e8c56c]" />
                  </div>

                  <span className="text-sm font-bold text-[#70152f]">
                    News & Events
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    Content Management
                  </span>
                </button>

                {/* HOSTEL MANAGEMENT */}
                <button
                  type="button"
                  onClick={() => handlePortalChange('hostel')}
                  disabled={isLoading}
                  className={`relative flex min-h-[145px] flex-col items-center justify-center rounded-2xl border-2 p-4 text-center transition ${
                    selectedPortal === 'hostel'
                      ? 'border-[#70152f] bg-[#70152f]/5 shadow-md'
                      : 'border-[#eadfd2] bg-[#fffdfa] hover:border-[#ad8536]'
                  }`}
                >
                  {selectedPortal === 'hostel' && (
                    <CheckCircle2
                      size={19}
                      className="absolute right-3 top-3 text-[#70152f]"
                    />
                  )}

                  <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-xl bg-[#70152f]">
                    <BedDouble size={24} className="text-[#e8c56c]" />
                  </div>

                  <span className="text-sm font-bold text-[#70152f]">
                    Hostel Management
                  </span>

                  <span className="mt-1 text-xs text-slate-500">
                    Hostel Administration
                  </span>
                </button>

              </div>
            </div>

            {/* SELECTED PORTAL DESCRIPTION */}
            <div className="mb-6 rounded-xl border border-[#eadfd2] bg-[#fcf9f4] p-3">
              <p className="text-xs font-bold uppercase tracking-wider text-[#ad8536]">
                Selected Portal
              </p>

              <p className="mt-1 text-sm font-bold text-[#70152f]">
                {portalDetails[selectedPortal].title}
              </p>

              <p className="mt-1 text-xs leading-5 text-slate-500">
                {portalDetails[selectedPortal].description}
              </p>
            </div>

            {/* ERROR MESSAGE */}
            {error && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 px-4 py-3 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* LOGIN FORM */}
            <form onSubmit={handleSubmit} className="space-y-6">

              {/* EMAIL */}
              <div>
                <label
                  htmlFor="admin-email"
                  className="mb-2 block text-sm font-semibold text-[#481024]"
                >
                  Email Address
                </label>

                <div className="relative">
                  <User
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ad8536]"
                  />

                  <input
                    id="admin-email"
                    type="email"
                    autoComplete="username"
                    required
                    value={email}
                    onChange={(e) => setEmail(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter your admin email"
                    className="w-full rounded-xl border border-[#e6ddd4] bg-[#fffdfa] py-3.5 pl-12 pr-4 text-sm text-[#481024] outline-none transition placeholder:text-slate-400 focus:border-[#70152f] focus:ring-4 focus:ring-[#70152f]/10 disabled:opacity-60"
                  />
                </div>
              </div>

              {/* PASSWORD */}
              <div>
                <label
                  htmlFor="admin-password"
                  className="mb-2 block text-sm font-semibold text-[#481024]"
                >
                  Password
                </label>

                <div className="relative">
                  <Lock
                    size={19}
                    className="absolute left-4 top-1/2 -translate-y-1/2 text-[#ad8536]"
                  />

                  <input
                    id="admin-password"
                    type={showPassword ? 'text' : 'password'}
                    autoComplete="current-password"
                    required
                    value={password}
                    onChange={(e) => setPassword(e.target.value)}
                    disabled={isLoading}
                    placeholder="Enter your password"
                    className="w-full rounded-xl border border-[#e6ddd4] bg-[#fffdfa] py-3.5 pl-12 pr-12 text-sm text-[#481024] outline-none transition placeholder:text-slate-400 focus:border-[#70152f] focus:ring-4 focus:ring-[#70152f]/10 disabled:opacity-60"
                  />

                  <button
                    type="button"
                    onClick={() => setShowPassword(!showPassword)}
                    aria-label={showPassword ? 'Hide password' : 'Show password'}
                    className="absolute right-4 top-1/2 -translate-y-1/2 text-slate-400 transition hover:text-[#70152f]"
                  >
                    {showPassword ? <EyeOff size={19} /> : <Eye size={19} />}
                  </button>
                </div>
              </div>

              {/* OPTIONS */}
              <div className="flex flex-wrap items-center justify-between gap-3 text-sm">
                <label className="flex cursor-pointer items-center gap-2 text-slate-600">
                  <input
                    type="checkbox"
                    checked={rememberMe}
                    onChange={(e) => setRememberMe(e.target.checked)}
                    className="h-4 w-4 accent-[#70152f]"
                  />
                  Remember me
                </label>

                <Link
                  to="/admin/forgot-password"
                  className="font-semibold text-[#70152f] transition hover:text-[#ad8536]"
                >
                  Forgot password?
                </Link>
              </div>

              {/* SIGN IN */}
              <button
                type="submit"
                disabled={isLoading}
                className="flex w-full items-center justify-center gap-3 rounded-xl bg-[#70152f] py-4 text-sm font-bold text-white shadow-lg shadow-[#70152f]/20 transition hover:-translate-y-0.5 hover:bg-[#8b1d3d] hover:shadow-xl disabled:cursor-not-allowed disabled:opacity-60"
              >
                {isLoading
                  ? 'Signing in...'
                  : `Sign In to ${
                      selectedPortal === 'hostel' ? 'Hostel' : 'News & Events'
                    }`}

                {!isLoading && <ArrowRight size={18} />}
              </button>
            </form>

            {/* BACK TO WEBSITE */}
            <div className="mt-8 border-t border-[#eee5dc] pt-6 text-center">
              <Link
                to="/"
                className="text-sm font-medium text-slate-500 transition hover:text-[#70152f]"
              >
                ← Back to College Website
              </Link>
            </div>
          </div>

          <p className="mt-6 text-center text-xs leading-6 text-slate-400">
            <ShieldCheck size={14} className="mr-1 inline-block" />
            Authorized personnel only. Secure administration access.
          </p>
        </div>
      </section>
    </main>
  );
}
