import {
  useCallback,
  useEffect,
  useMemo,
  useRef,
  useState,
  type ChangeEvent,
  type FormEvent,
} from 'react';

import {
  Plus,
  Pencil,
  Trash2,
  X,
  CalendarDays,
  Newspaper,
  RefreshCw,
  Search,
  ImagePlus,
  Upload,
  MapPin,
  Eye,
  Star,
  CheckCircle2,
  GraduationCap,
  LogOut,
  LayoutDashboard,
} from 'lucide-react';

import { useNavigate } from 'react-router-dom';
import { getNewsEvents, type NewsEventItem } from '@/services/newsEventsApi';

type NewsType = 'News' | 'Event';

type ExtendedNewsEvent = NewsEventItem & {
  imageUrl?: string;
  location?: string;
  isPublished?: boolean;
  isFeatured?: boolean;
};

type NewsForm = {
  title: string;
  date: string;
  type: NewsType;
  excerpt: string;
  content: string;
  imageUrl: string;
  location: string;
  isPublished: boolean;
  isFeatured: boolean;
};

const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || 'http://localhost:5013'
).replace(/\/$/, '');

const NEWS_API_URL = `${API_BASE_URL}/api/news-events`;

const emptyForm: NewsForm = {
  title: '',
  date: '',
  type: 'News',
  excerpt: '',
  content: '',
  imageUrl: '',
  location: '',
  isPublished: true,
  isFeatured: false,
};

function getAdminToken() {
  return (
    sessionStorage.getItem('adminToken') ||
    localStorage.getItem('adminToken') ||
    ''
  );
}

function getAuthHeaders(): HeadersInit {
  return {
    Authorization: `Bearer ${getAdminToken()}`,
  };
}

function dateInput(value?: string) {
  if (!value) return '';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) {
    return value.slice(0, 10);
  }

  return [
    date.getFullYear(),
    String(date.getMonth() + 1).padStart(2, '0'),
    String(date.getDate()).padStart(2, '0'),
  ].join('-');
}

function dateLabel(value?: string) {
  if (!value) return '—';

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return value;

  return date.toLocaleDateString('en-IN', {
    day: '2-digit',
    month: 'short',
    year: 'numeric',
  });
}

function isUpcoming(value?: string) {
  if (!value) return false;

  const date = new Date(value);

  if (Number.isNaN(date.getTime())) return false;

  const today = new Date();
  today.setHours(0, 0, 0, 0);

  date.setHours(0, 0, 0, 0);

  return date >= today;
}

async function readError(response: Response) {
  const text = await response.text().catch(() => '');

  if (!text) {
    return `Request failed (HTTP ${response.status}).`;
  }

  try {
    const data = JSON.parse(text);
    return data.message || data.title || text;
  } catch {
    return text;
  }
}

async function createNewsEvent(payload: NewsForm) {
  const response = await fetch(NEWS_API_URL, {
    method: 'POST',
    headers: {
      'Content-Type': 'application/json',
      ...getAuthHeaders(),
    },
    body: JSON.stringify(payload),
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.status === 204 ? null : response.json();
}

async function updateNewsEvent(id: string, payload: NewsForm) {
  const response = await fetch(
    `${NEWS_API_URL}/${encodeURIComponent(id)}`,
    {
      method: 'PUT',
      headers: {
        'Content-Type': 'application/json',
        ...getAuthHeaders(),
      },
      body: JSON.stringify(payload),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  return response.status === 204 ? null : response.json();
}

async function deleteNewsEvent(id: string) {
  const response = await fetch(
    `${NEWS_API_URL}/${encodeURIComponent(id)}`,
    {
      method: 'DELETE',
      headers: getAuthHeaders(),
    }
  );

  if (!response.ok) {
    throw new Error(await readError(response));
  }
}

async function uploadEventImage(file: File): Promise<string> {
  const body = new FormData();
  body.append('file', file);

  const response = await fetch(`${NEWS_API_URL}/upload-image`, {
    method: 'POST',
    headers: getAuthHeaders(),
    body,
  });

  if (!response.ok) {
    throw new Error(await readError(response));
  }

  const data = await response.json();

  if (!data.imageUrl) {
    throw new Error('The server did not return an image URL.');
  }

  return data.imageUrl as string;
}

export default function AdminNewsEvents() {
  const navigate = useNavigate();

  const [items, setItems] = useState<ExtendedNewsEvent[]>([]);
  const [form, setForm] = useState<NewsForm>({ ...emptyForm });

  const [editingId, setEditingId] = useState<string | null>(null);
  const [formOpen, setFormOpen] = useState(false);

  const [loading, setLoading] = useState(true);
  const [saving, setSaving] = useState(false);
  const [uploading, setUploading] = useState(false);
  const [deletingId, setDeletingId] = useState<string | null>(null);

  const [error, setError] = useState('');
  const [message, setMessage] = useState('');

  const [search, setSearch] = useState('');
  const [statusFilter, setStatusFilter] = useState('All statuses');

  const fileInputRef = useRef<HTMLInputElement>(null);

  // Load news and events
  const loadItems = useCallback(async () => {
    setLoading(true);
    setError('');

    try {
      const data = await getNewsEvents();

      const sorted = [...data].sort(
        (a, b) =>
          new Date(b.date).getTime() - new Date(a.date).getTime()
      );

      setItems(sorted as ExtendedNewsEvent[]);
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to load news and events.'
      );
    } finally {
      setLoading(false);
    }
  }, []);

  useEffect(() => {
    if (!getAdminToken()) {
      navigate('/admin/login', { replace: true });
      return;
    }

    void loadItems();
  }, [loadItems, navigate]);

  // Logout
  const handleLogout = () => {
    sessionStorage.removeItem('adminToken');
    sessionStorage.removeItem('adminName');
    sessionStorage.removeItem('adminEmail');

    localStorage.removeItem('adminToken');
    localStorage.removeItem('adminName');
    localStorage.removeItem('adminEmail');

    navigate('/admin/login', { replace: true });
  };

  // Open add form
  const openAddForm = () => {
    setEditingId(null);
    setForm({ ...emptyForm });
    setError('');
    setMessage('');
    setFormOpen(true);
  };

  // Open edit form
  const openEditForm = (item: ExtendedNewsEvent) => {
setEditingId(String(item.id));
    setForm({
      title: item.title || '',
      date: dateInput(item.date),
      type: item.type?.toLowerCase() === 'event' ? 'Event' : 'News',
      excerpt: item.excerpt || '',
      content: item.content || '',
      imageUrl: item.imageUrl || '',
      location: item.location || '',
      isPublished: item.isPublished ?? true,
      isFeatured: item.isFeatured ?? false,
    });

    setError('');
    setMessage('');
    setFormOpen(true);
  };

  // Image upload
  const handleImage = async (event: ChangeEvent<HTMLInputElement>) => {
    const file = event.target.files?.[0];

    event.target.value = '';

    if (!file) return;

    const allowedTypes = [
      'image/jpeg',
      'image/png',
      'image/webp',
      'image/jpg',
    ];

    if (!allowedTypes.includes(file.type)) {
      setError('Choose a JPG, JPEG, PNG or WEBP image.');
      return;
    }

    if (file.size > 20 * 1024 * 1024) {
      setError('Image size must be 20 MB or less.');
      return;
    }

    setError('');
    setUploading(true);

    try {
      const imageUrl = await uploadEventImage(file);

      setForm((current) => ({
        ...current,
        imageUrl,
      }));
    } catch (err) {
      setError(
        err instanceof Error ? err.message : 'Unable to upload image.'
      );
    } finally {
      setUploading(false);
    }
  };

  // Save news or event
  const saveItem = async (event: FormEvent<HTMLFormElement>) => {
    event.preventDefault();

    setSaving(true);
    setError('');
    setMessage('');

    const payload: NewsForm = {
      title: form.title.trim(),
      date: form.date,
      type: form.type,
      excerpt: form.excerpt.trim(),
      content: form.content.trim(),
      imageUrl: form.imageUrl,
      location: form.location.trim(),
      isPublished: Boolean(form.isPublished),
      isFeatured: Boolean(form.isFeatured),
    };

    try {
      if (editingId) {
        await updateNewsEvent(editingId, payload);
        setMessage('News or event updated successfully.');
      } else {
        await createNewsEvent(payload);
        setMessage('News or event created successfully.');
      }

      setFormOpen(false);
      setForm({ ...emptyForm });
      setEditingId(null);

      await loadItems();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to save the news or event.'
      );
    } finally {
      setSaving(false);
    }
  };

  // Delete news or event
  const deleteItem = async (item: ExtendedNewsEvent) => {
    const confirmed = window.confirm(
      `Are you sure you want to delete "${item.title}"?`
    );

    if (!confirmed) return;

setDeletingId(String(item.id));
    setError('');
    setMessage('');

    try {
await deleteNewsEvent(String(item.id));

      setMessage('Entry deleted successfully.');

      await loadItems();
    } catch (err) {
      setError(
        err instanceof Error
          ? err.message
          : 'Unable to delete this entry.'
      );
    } finally {
      setDeletingId(null);
    }
  };

  // Dashboard counts
  const upcomingCount = items.filter((item) =>
    isUpcoming(item.date)
  ).length;

  const expiredCount = items.length - upcomingCount;

  const publishedCount = items.filter(
    (item) => item.isPublished !== false
  ).length;

  const draftsCount = items.length - publishedCount;

  // Search and filter
  const filteredItems = useMemo(() => {
    return items.filter((item) => {
      const searchableText = [
        item.title,
        item.excerpt,
        item.type,
        item.location || '',
      ]
        .join(' ')
        .toLowerCase();

      const matchesSearch = searchableText.includes(
        search.toLowerCase()
      );

      const upcoming = isUpcoming(item.date);
      const published = item.isPublished !== false;

      const matchesStatus =
        statusFilter === 'All statuses' ||
        (statusFilter === 'Published' && published) ||
        (statusFilter === 'Drafts' && !published) ||
        (statusFilter === 'Upcoming' && upcoming) ||
        (statusFilter === 'Expired' && !upcoming);

      return matchesSearch && matchesStatus;
    });
  }, [items, search, statusFilter]);

  const adminName =
    sessionStorage.getItem('adminName') ||
    localStorage.getItem('adminName') ||
    'Administrator';

  const adminEmail =
    sessionStorage.getItem('adminEmail') ||
    localStorage.getItem('adminEmail') ||
    'Admin Account';

  return (
    <main className="min-h-screen bg-[#fcf9f4] text-[#481024]">

      <div className="flex min-h-screen">

        {/* SIDEBAR */}
        <aside className="hidden w-[260px] shrink-0 flex-col bg-gradient-to-b from-[#70152f] to-[#430b1d] text-white lg:flex">

          <div className="border-b border-white/10 px-6 py-7">
            <div className="flex items-center gap-3">
              <div className="flex h-14 w-14 items-center justify-center rounded-full border-2 border-[#e8c56c] bg-[#d8b45c]">
                <GraduationCap size={29} className="text-[#70152f]" />
              </div>

              <div>
                <h2 className="font-serif text-lg font-bold">
                  ST. Lourdes
                </h2>
                <p className="text-[10px] font-bold tracking-widest text-[#e8c56c]">
                  ENGINEERING COLLEGE
                </p>
              </div>
            </div>
          </div>

          <div className="flex-1 px-4 py-8">
            <p className="mb-4 px-3 text-[10px] font-bold uppercase tracking-[0.2em] text-white/40">
              Content Management
            </p>

            <div className="flex items-center gap-3 rounded-xl bg-gradient-to-r from-[#e8c56c] to-[#d8b45c] px-4 py-4 font-bold text-[#481024] shadow-lg">
              <Newspaper size={19} />
              <span className="text-sm">News & Events</span>
            </div>

            <button
              onClick={handleLogout}
              className="mt-3 flex w-full items-center gap-3 rounded-xl px-4 py-4 text-sm font-semibold text-white/75 transition hover:bg-white/10 hover:text-white"
            >
              <LogOut size={19} />
              Logout
            </button>
          </div>

          <div className="relative overflow-hidden border-t border-white/10 px-6 py-6">
            <div className="absolute -bottom-10 -right-8 opacity-[0.08]">
              <GraduationCap size={150} />
            </div>

            <p className="relative text-xs text-white/50">
              ST. Lourdes Engineering College
            </p>
            <p className="relative mt-1 text-[10px] text-[#e8c56c]">
              ADMINISTRATION PORTAL
            </p>
          </div>
        </aside>

        {/* MAIN CONTENT */}
        <section className="min-w-0 flex-1">

          {/* TOP HEADER */}
          <header className="flex flex-col gap-4 border-b border-[#eadfd2] bg-white px-5 py-5 sm:px-8 lg:flex-row lg:items-center lg:justify-between lg:px-10">

            <div>
              <p className="text-xs font-bold uppercase tracking-[0.18em] text-[#ad8536]">
                ST. Lourdes Engineering College
              </p>

              <h1 className="mt-1 font-serif text-2xl font-bold text-[#70152f] sm:text-3xl">
                News & Events <span className="text-[#d8b45c]">Admin</span>
              </h1>

              <p className="mt-2 text-sm text-slate-500">
                Manage college announcements, achievements and upcoming events.
              </p>
            </div>

            <div className="flex items-center justify-between gap-3 rounded-xl border border-[#eadfd2] bg-[#fffdfa] px-4 py-3 sm:justify-start">
              <div className="flex h-10 w-10 items-center justify-center rounded-full bg-[#f5eadc] text-[#70152f]">
                <LayoutDashboard size={19} />
              </div>

              <div className="min-w-0">
                <p className="truncate text-sm font-bold text-[#70152f]">
                  {adminName}
                </p>
                <p className="max-w-[180px] truncate text-xs text-slate-500">
                  {adminEmail}
                </p>
              </div>

              <button
                onClick={handleLogout}
                title="Logout"
                className="ml-2 rounded-lg p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600 lg:hidden"
              >
                <LogOut size={18} />
              </button>
            </div>
          </header>

          <div className="px-4 py-7 sm:px-7 lg:px-10">

            {/* ACTION BUTTONS */}
            <div className="mb-7 flex flex-wrap items-center justify-end gap-3">

              <button
                onClick={() => void loadItems()}
                disabled={loading}
                className="inline-flex items-center gap-2 rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm font-bold text-[#70152f] shadow-sm transition hover:bg-[#fbf3e5] disabled:opacity-50"
              >
                <RefreshCw
                  size={16}
                  className={loading ? 'animate-spin' : ''}
                />
                Refresh
              </button>

              <button
                onClick={openAddForm}
                className="inline-flex items-center gap-2 rounded-xl bg-[#70152f] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#70152f]/15 transition hover:bg-[#8b1d3d]"
              >
                <Plus size={18} />
                Add News / Event
              </button>
            </div>

            {/* SUCCESS MESSAGE */}
            {message && (
              <div className="mb-5 flex items-center gap-2 rounded-xl border border-emerald-200 bg-emerald-50 p-4 text-sm text-emerald-800">
                <CheckCircle2 size={18} />
                {message}
              </div>
            )}

            {/* ERROR MESSAGE */}
            {error && !formOpen && (
              <div
                role="alert"
                className="mb-5 rounded-xl border border-red-200 bg-red-50 p-4 text-sm text-red-700"
              >
                {error}
              </div>
            )}

            {/* DASHBOARD CARDS */}
            <section className="mb-8 grid grid-cols-2 gap-4 sm:grid-cols-3 xl:grid-cols-5">

              {[
                {
                  label: 'Total Entries',
                  value: items.length,
                  icon: Newspaper,
                },
                {
                  label: 'Upcoming',
                  value: upcomingCount,
                  icon: CalendarDays,
                },
                {
                  label: 'Expired',
                  value: expiredCount,
                  icon: CalendarDays,
                },
                {
                  label: 'Published',
                  value: publishedCount,
                  icon: Eye,
                },
                {
                  label: 'Drafts',
                  value: draftsCount,
                  icon: Pencil,
                },
              ].map((card) => (
                <div
                  key={card.label}
                  className="rounded-2xl border border-[#eadfd2] bg-white p-5 shadow-[0_8px_25px_rgba(75,11,32,0.04)]"
                >
                  <div className="flex items-center justify-between gap-2">
                    <p className="text-[10px] font-bold uppercase tracking-wider text-slate-500 sm:text-xs">
                      {card.label}
                    </p>

                    <div className="flex h-9 w-9 items-center justify-center rounded-xl bg-[#fbf3e5] text-[#ad8536]">
                      <card.icon size={18} />
                    </div>
                  </div>

                  <p className="mt-3 text-3xl font-extrabold text-[#70152f]">
                    {card.value}
                  </p>
                </div>
              ))}
            </section>

            {/* SEARCH AND FILTER */}
            <section className="mb-5 flex flex-col gap-3 rounded-2xl border border-[#eadfd2] bg-white p-4 sm:flex-row">

              <label className="flex flex-1 items-center gap-3 rounded-xl border border-[#eadfd2] bg-[#fffdfa] px-4 py-3">
                <Search size={18} className="shrink-0 text-[#ad8536]" />

                <input
                  value={search}
                  onChange={(e) => setSearch(e.target.value)}
                  placeholder="Search by title, description or location..."
                  className="w-full bg-transparent text-sm text-slate-700 outline-none placeholder:text-slate-400"
                />
              </label>

              <select
                value={statusFilter}
                onChange={(e) => setStatusFilter(e.target.value)}
                className="rounded-xl border border-[#eadfd2] bg-[#fffdfa] px-4 py-3 text-sm font-semibold text-[#70152f] outline-none focus:border-[#d8b45c]"
              >
                <option>All statuses</option>
                <option>Published</option>
                <option>Drafts</option>
                <option>Upcoming</option>
                <option>Expired</option>
              </select>
            </section>

            {/* NEWS AND EVENTS TABLE */}
            <section className="overflow-hidden rounded-2xl border border-[#eadfd2] bg-white shadow-[0_10px_35px_rgba(75,11,32,0.05)]">

              <div className="flex items-center justify-between border-b border-[#eadfd2] bg-[#fbf3e5] px-5 py-4">
                <div>
                  <h2 className="font-serif text-lg font-bold text-[#70152f]">
                    All News & Events
                  </h2>
                  <p className="mt-1 text-xs text-slate-500">
                    Manage your college website content
                  </p>
                </div>

                <span className="rounded-full bg-white px-3 py-1 text-xs font-bold text-[#70152f]">
                  {filteredItems.length} entries
                </span>
              </div>

              {loading ? (
                <div className="px-6 py-20 text-center">
                  <RefreshCw
                    size={28}
                    className="mx-auto animate-spin text-[#ad8536]"
                  />
                  <p className="mt-4 text-sm text-slate-500">
                    Loading news and events...
                  </p>
                </div>
              ) : filteredItems.length === 0 ? (
                <div className="px-6 py-20 text-center">
                  <Newspaper
                    size={42}
                    className="mx-auto mb-4 text-slate-300"
                  />

                  <h3 className="font-bold text-[#70152f]">
                    No news or events found
                  </h3>

                  <p className="mt-2 text-sm text-slate-500">
                    Try another search or add a new entry.
                  </p>

                  <button
                    onClick={openAddForm}
                    className="mt-5 inline-flex items-center gap-2 rounded-lg bg-[#70152f] px-4 py-2.5 text-sm font-bold text-white hover:bg-[#8b1d3d]"
                  >
                    <Plus size={16} />
                    Add New Entry
                  </button>
                </div>
              ) : (
                <>
                  {/* DESKTOP TABLE */}
                  <div className="hidden overflow-x-auto lg:block">
                    <table className="w-full min-w-[900px] text-left">
                      <thead className="bg-[#fffdfa] text-[10px] font-bold uppercase tracking-wider text-slate-500">
                        <tr>
                          <th className="px-5 py-4">Image</th>
                          <th className="px-5 py-4">Title</th>
                          <th className="px-5 py-4">Type</th>
                          <th className="px-5 py-4">Date</th>
                          <th className="px-5 py-4">Status</th>
                          <th className="px-5 py-4">Featured</th>
                          <th className="px-5 py-4 text-right">Actions</th>
                        </tr>
                      </thead>

                      <tbody className="divide-y divide-[#f0e8df]">
                        {filteredItems.map((item) => (
                          <tr
                            key={item.id}
                            className="transition hover:bg-[#fffdfa]"
                          >
                            <td className="px-5 py-4">
                              <div className="h-14 w-20 overflow-hidden rounded-lg bg-slate-100">
                                {item.imageUrl ? (
                                  <img
                                    src={item.imageUrl}
                                    alt={item.title}
                                    className="h-full w-full object-cover"
                                  />
                                ) : (
                                  <div className="flex h-full items-center justify-center text-slate-300">
                                    <ImagePlus size={23} />
                                  </div>
                                )}
                              </div>
                            </td>

                            <td className="max-w-[280px] px-5 py-4">
                              <p className="truncate text-sm font-bold text-[#70152f]">
                                {item.title}
                              </p>
                              <p className="mt-1 line-clamp-1 text-xs text-slate-500">
                                {item.excerpt}
                              </p>
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                                  item.type === 'Event'
                                    ? 'bg-purple-100 text-purple-700'
                                    : 'bg-rose-100 text-rose-700'
                                }`}
                              >
                                {item.type === 'Event' ? 'Event' : 'News'}
                              </span>
                            </td>

                            <td className="whitespace-nowrap px-5 py-4 text-xs font-medium text-slate-600">
                              {dateLabel(item.date)}
                            </td>

                            <td className="px-5 py-4">
                              <span
                                className={`rounded-full px-3 py-1.5 text-[10px] font-bold ${
                                  item.isPublished === false
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                {item.isPublished === false
                                  ? 'Draft'
                                  : 'Published'}
                              </span>
                            </td>

                            <td className="px-5 py-4">
                              {item.isFeatured ? (
                                <Star
                                  size={18}
                                  className="fill-[#d8b45c] text-[#d8b45c]"
                                />
                              ) : (
                                <Star size={18} className="text-slate-300" />
                              )}
                            </td>

                            <td className="px-5 py-4">
                              <div className="flex justify-end gap-2">
                                <button
                                  onClick={() => openEditForm(item)}
                                  title="Edit"
                                  className="rounded-lg border border-[#eadfd2] p-2.5 text-[#70152f] transition hover:bg-[#fbf3e5]"
                                >
                                  <Pencil size={16} />
                                </button>

                                <button
                                  onClick={() => void deleteItem(item)}
                                  disabled={deletingId === item.id}
                                  title="Delete"
                                  className="rounded-lg border border-red-200 p-2.5 text-red-600 transition hover:bg-red-50 disabled:opacity-50"
                                >
                                  <Trash2 size={16} />
                                </button>
                              </div>
                            </td>
                          </tr>
                        ))}
                      </tbody>
                    </table>
                  </div>

                  {/* MOBILE AND TABLET CARDS */}
                  <div className="divide-y divide-[#f0e8df] lg:hidden">
                    {filteredItems.map((item) => (
                      <article
                        key={item.id}
                        className="p-4 sm:p-5"
                      >
                        <div className="flex gap-4">
                          <div className="h-20 w-24 shrink-0 overflow-hidden rounded-xl bg-slate-100">
                            {item.imageUrl ? (
                              <img
                                src={item.imageUrl}
                                alt={item.title}
                                className="h-full w-full object-cover"
                              />
                            ) : (
                              <div className="flex h-full items-center justify-center text-slate-300">
                                <ImagePlus size={25} />
                              </div>
                            )}
                          </div>

                          <div className="min-w-0 flex-1">
                            <h3 className="line-clamp-2 text-sm font-bold text-[#70152f]">
                              {item.title}
                            </h3>

                            <p className="mt-1 line-clamp-2 text-xs text-slate-500">
                              {item.excerpt}
                            </p>

                            <div className="mt-2 flex flex-wrap gap-2">
                              <span className="rounded-full bg-[#fbf3e5] px-2.5 py-1 text-[10px] font-bold text-[#70152f]">
                                {item.type}
                              </span>

                              <span
                                className={`rounded-full px-2.5 py-1 text-[10px] font-bold ${
                                  item.isPublished === false
                                    ? 'bg-amber-100 text-amber-700'
                                    : 'bg-emerald-100 text-emerald-700'
                                }`}
                              >
                                {item.isPublished === false
                                  ? 'Draft'
                                  : 'Published'}
                              </span>
                            </div>
                          </div>
                        </div>

                        <div className="mt-4 flex flex-wrap items-center justify-between gap-3">
                          <div className="flex flex-wrap gap-3 text-xs text-slate-500">
                            <span className="flex items-center gap-1">
                              <CalendarDays size={14} />
                              {dateLabel(item.date)}
                            </span>

                            {item.location && (
                              <span className="flex items-center gap-1">
                                <MapPin size={14} />
                                {item.location}
                              </span>
                            )}
                          </div>

                          <div className="flex gap-2">
                            <button
                              onClick={() => openEditForm(item)}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-[#eadfd2] px-3 py-2 text-xs font-bold text-[#70152f]"
                            >
                              <Pencil size={14} />
                              Edit
                            </button>

                            <button
                              onClick={() => void deleteItem(item)}
                              disabled={deletingId === item.id}
                              className="inline-flex items-center gap-1.5 rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 disabled:opacity-50"
                            >
                              <Trash2 size={14} />
                              Delete
                            </button>
                          </div>
                        </div>
                      </article>
                    ))}
                  </div>
                </>
              )}
            </section>
          </div>
        </section>
      </div>

      {/* ADD / EDIT MODAL */}
      {formOpen && (
        <div className="fixed inset-0 z-50 flex items-start justify-center overflow-y-auto bg-[#270611]/70 p-3 backdrop-blur-sm sm:items-center sm:p-6">

          <section
            role="dialog"
            aria-modal="true"
            aria-labelledby="news-modal-title"
            className="my-3 w-full max-w-2xl overflow-hidden rounded-2xl border border-[#d8b45c] bg-white shadow-[0_0_0_1px_rgba(216,180,92,0.7),0_15px_60px_rgba(0,0,0,0.25)]"
          >

            {/* MODAL HEADER */}
            <div className="flex items-center justify-between border-b border-[#eadfd2] bg-[#fffdfa] px-5 py-4 sm:px-7">
              <div>
                <p className="text-[10px] font-bold uppercase tracking-[0.2em] text-[#ad8536]">
                  ST. Lourdes Engineering College
                </p>

                <h2
                  id="news-modal-title"
                  className="mt-1 font-serif text-xl font-bold text-[#70152f] sm:text-2xl"
                >
                  {editingId ? 'Edit News / Event' : 'Add News / Event'}
                </h2>
              </div>

              <button
                type="button"
                onClick={() => setFormOpen(false)}
                aria-label="Close form"
                className="rounded-full p-2 text-slate-500 transition hover:bg-red-50 hover:text-red-600"
              >
                <X size={22} />
              </button>
            </div>

            {/* MODAL FORM */}
            <form
              onSubmit={saveItem}
              className="max-h-[75vh] space-y-5 overflow-y-auto px-5 py-6 sm:px-7"
            >

              {error && (
                <div
                  role="alert"
                  className="rounded-xl border border-red-200 bg-red-50 p-3 text-sm text-red-700"
                >
                  {error}
                </div>
              )}

              {/* TITLE */}
              <div>
                <label
                  htmlFor="news-title"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                >
                  News / Event Title *
                </label>

                <input
                  id="news-title"
                  required
                  maxLength={200}
                  value={form.title}
                  onChange={(e) =>
                    setForm({ ...form, title: e.target.value })
                  }
                  placeholder="Enter news or event title"
                  className="w-full rounded-xl border border-[#eadfd2] px-4 py-3 text-sm outline-none transition focus:border-[#d8b45c] focus:ring-4 focus:ring-[#d8b45c]/10"
                />
              </div>

              {/* TYPE AND DATE */}
              <div className="grid gap-4 sm:grid-cols-2">

                <div>
                  <label
                    htmlFor="news-type"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                  >
                    Type *
                  </label>

                  <select
                    id="news-type"
                    value={form.type}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        type: e.target.value as NewsType,
                      })
                    }
                    className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#d8b45c]"
                  >
                    <option value="News">News / Announcement</option>
                    <option value="Event">College Event</option>
                  </select>
                </div>

                <div>
                  <label
                    htmlFor="news-date"
                    className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                  >
                    Date *
                  </label>

                  <input
                    id="news-date"
                    type="date"
                    required
                    value={form.date}
                    onChange={(e) =>
                      setForm({ ...form, date: e.target.value })
                    }
                    className="w-full rounded-xl border border-[#eadfd2] bg-white px-4 py-3 text-sm outline-none focus:border-[#d8b45c]"
                  />
                </div>
              </div>

              {/* SHORT DESCRIPTION */}
              <div>
                <label
                  htmlFor="news-excerpt"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                >
                  Short Description *
                </label>

                <textarea
                  id="news-excerpt"
                  required
                  maxLength={500}
                  rows={3}
                  value={form.excerpt}
                  onChange={(e) =>
                    setForm({ ...form, excerpt: e.target.value })
                  }
                  placeholder="Write a short description"
                  className="w-full resize-y rounded-xl border border-[#eadfd2] px-4 py-3 text-sm outline-none focus:border-[#d8b45c]"
                />
              </div>

              {/* FULL CONTENT */}
              <div>
                <label
                  htmlFor="news-content"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                >
                  Full Details *
                </label>

                <textarea
                  id="news-content"
                  required
                  rows={5}
                  value={form.content}
                  onChange={(e) =>
                    setForm({ ...form, content: e.target.value })
                  }
                  placeholder="Write the complete news or event details"
                  className="w-full resize-y rounded-xl border border-[#eadfd2] px-4 py-3 text-sm outline-none focus:border-[#d8b45c]"
                />
              </div>

              {/* LOCATION */}
              <div>
                <label
                  htmlFor="news-location"
                  className="mb-2 block text-xs font-bold uppercase tracking-wider text-[#70152f]"
                >
                  Location
                </label>

                <input
                  id="news-location"
                  value={form.location}
                  onChange={(e) =>
                    setForm({ ...form, location: e.target.value })
                  }
                  placeholder="College Auditorium / Seminar Hall"
                  className="w-full rounded-xl border border-[#eadfd2] px-4 py-3 text-sm outline-none focus:border-[#d8b45c]"
                />
              </div>

              {/* IMAGE UPLOAD */}
              <div>
                <p className="mb-2 text-xs font-bold uppercase tracking-wider text-[#70152f]">
                  News / Event Photograph
                </p>

                <input
                  ref={fileInputRef}
                  type="file"
                  accept=".jpg,.jpeg,.png,.webp,image/jpeg,image/png,image/webp"
                  onChange={handleImage}
                  className="hidden"
                />

                {form.imageUrl ? (
                  <div className="overflow-hidden rounded-xl border border-[#eadfd2]">
                    <img
                      src={form.imageUrl}
                      alt="News or event preview"
                      className="h-48 w-full bg-slate-50 object-cover"
                    />

                    <div className="flex flex-wrap items-center justify-between gap-3 bg-[#fffdfa] p-3">
                      <p className="text-xs font-semibold text-slate-500">
                        Image preview
                      </p>

                      <div className="flex gap-2">
                        <button
                          type="button"
                          disabled={uploading}
                          onClick={() => fileInputRef.current?.click()}
                          className="inline-flex items-center gap-2 rounded-lg border border-[#eadfd2] px-3 py-2 text-xs font-bold text-[#70152f] hover:bg-[#fbf3e5] disabled:opacity-50"
                        >
                          <Upload size={14} />
                          Replace
                        </button>

                        <button
                          type="button"
                          onClick={() =>
                            setForm({ ...form, imageUrl: '' })
                          }
                          className="rounded-lg border border-red-200 px-3 py-2 text-xs font-bold text-red-600 hover:bg-red-50"
                        >
                          Remove
                        </button>
                      </div>
                    </div>
                  </div>
                ) : (
                  <button
                    type="button"
                    disabled={uploading}
                    onClick={() => fileInputRef.current?.click()}
                    className="flex min-h-32 w-full flex-col items-center justify-center rounded-xl border-2 border-dashed border-[#d8b45c]/60 bg-[#fffdfa] px-4 py-6 text-center transition hover:border-[#70152f] hover:bg-[#fbf3e5] disabled:opacity-50"
                  >
                    <div className="mb-3 flex h-12 w-12 items-center justify-center rounded-full bg-[#fbf3e5] text-[#70152f]">
                      <ImagePlus size={23} />
                    </div>

                    <span className="text-sm font-bold text-[#70152f]">
                      {uploading ? 'Uploading image...' : 'Upload an image'}
                    </span>

                    <span className="mt-1 text-xs text-slate-500">
                      JPG, JPEG, PNG or WEBP · Maximum 20 MB
                    </span>

                    <span className="mt-3 inline-flex items-center gap-2 rounded-lg bg-[#70152f] px-4 py-2 text-xs font-bold text-white">
                      <Upload size={14} />
                      Choose File
                    </span>
                  </button>
                )}
              </div>

              {/* PUBLISH AND FEATURED */}
              <div className="grid gap-3 sm:grid-cols-2">

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#eadfd2] bg-[#fffdfa] px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#70152f]">
                    <Eye size={17} />
                    Published
                  </span>

                  <input
                    type="checkbox"
                    checked={form.isPublished}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isPublished: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-[#70152f]"
                  />
                </label>

                <label className="flex cursor-pointer items-center justify-between rounded-xl border border-[#eadfd2] bg-[#fffdfa] px-4 py-3">
                  <span className="flex items-center gap-2 text-sm font-bold text-[#70152f]">
                    <Star size={17} />
                    Featured
                  </span>

                  <input
                    type="checkbox"
                    checked={form.isFeatured}
                    onChange={(e) =>
                      setForm({
                        ...form,
                        isFeatured: e.target.checked,
                      })
                    }
                    className="h-5 w-5 accent-[#70152f]"
                  />
                </label>
              </div>

              {/* FORM BUTTONS */}
              <div className="flex flex-col-reverse gap-3 border-t border-[#eadfd2] pt-5 sm:flex-row">

                <button
                  type="button"
                  onClick={() => setFormOpen(false)}
                  disabled={saving || uploading}
                  className="flex-1 rounded-xl border border-[#eadfd2] bg-white px-5 py-3 text-sm font-bold text-[#70152f] transition hover:bg-[#fbf3e5] disabled:opacity-50"
                >
                  Cancel
                </button>

                <button
                  type="submit"
                  disabled={saving || uploading}
                  className="flex-1 rounded-xl bg-[#70152f] px-5 py-3 text-sm font-bold text-white shadow-lg shadow-[#70152f]/15 transition hover:bg-[#8b1d3d] disabled:cursor-not-allowed disabled:opacity-50"
                >
                  {saving
                    ? 'Saving...'
                    : uploading
                      ? 'Uploading image...'
                      : editingId
                        ? 'Save Changes'
                        : 'Publish Entry'}
                </button>
              </div>
            </form>
          </section>
        </div>
      )}
    </main>
  );
}