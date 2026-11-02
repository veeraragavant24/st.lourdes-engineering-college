// Service interface for future .NET Web API integration.
// All data-fetching and form-submission logic should go through here,
// so the backend can be wired up without changing component code.

export interface AdmissionEnquiry {
  name: string;
  email: string;
  phone: string;
  program: string;
  message: string;
}

export interface ApiResponse<T> {
  success: boolean;
  data?: T;
  error?: string;
}

// Base URL for the .NET API. Set via environment variable when the backend is ready.
const API_BASE_URL = import.meta.env.VITE_API_BASE_URL || '';

async function request<T>(path: string, options?: RequestInit): Promise<ApiResponse<T>> {
  if (!API_BASE_URL) {
    // No backend configured — return a demo response.
    return { success: false, error: 'API_BASE_URL not configured' };
  }
  try {
    const res = await fetch(`${API_BASE_URL}${path}`, {
      headers: { 'Content-Type': 'application/json' },
      ...options,
    });
    if (!res.ok) {
      return { success: false, error: `Request failed: ${res.status}` };
    }
    const data = await res.json();
    return { success: true, data };
  } catch (err) {
    return { success: false, error: err instanceof Error ? err.message : 'Unknown error' };
  }
}

export const api = {
  submitAdmissionEnquiry: (payload: AdmissionEnquiry): Promise<ApiResponse<{ id: string }>> => {
    return request('/api/admission-enquiry', {
      method: 'POST',
      body: JSON.stringify(payload),
    });
  },

  // When the backend is ready, add methods like:
  // getNews: () => request<NewsItem[]>('/api/news'),
  // getEvents: () => request<EventItem[]>('/api/events'),
  // getPrograms: () => request<Program[]>('/api/programs'),
};
