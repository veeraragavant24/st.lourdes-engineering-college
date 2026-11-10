const API_BASE_URL = (
  import.meta.env.VITE_API_BASE_URL || "http://localhost:5013"
).replace(/\/$/, "");

export interface NewsEventItem {
  id: number | string;
  title: string;
  type: string;
  date: string;
  excerpt: string;
  content?: string | null;

  imageUrl?: string | null;
  imageURL?: string | null;
  ImageUrl?: string | null;
  imagePath?: string | null;
  image?: string | null;

  venue?: string | null;
  location?: string | null;
  department?: string | null;
  organizer?: string | null;
}

// Get all news and events
export async function getNewsEvents(): Promise<NewsEventItem[]> {
  const response = await fetch(
    `${API_BASE_URL}/api/news-events`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error(
      `Failed to load news and events. Status: ${response.status}`
    );
  }

  const data = await response.json();

  // Supports either a direct array or { data: [...] }
  const records = Array.isArray(data) ? data : data.data;

  if (!Array.isArray(records)) {
    throw new Error("Invalid news and events response.");
  }

  return records;
}

// Get one news/event record by ID
export async function getNewsEventById(
  id: number | string
): Promise<NewsEventItem> {
  const response = await fetch(
    `${API_BASE_URL}/api/news-events/${encodeURIComponent(String(id))}`,
    {
      method: "GET",
      headers: {
        Accept: "application/json",
      },
    }
  );

  if (!response.ok) {
    throw new Error("Unable to load news/event details.");
  }

  return response.json();
}
