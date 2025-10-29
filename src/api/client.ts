export const API_URL = import.meta.env.VITE_API_URL;
const isDev = import.meta.env.DEV;

export async function apiFetch<T>(endpoint: string, options?: RequestInit): Promise<T> {
  const res = await fetch(`${API_URL}${isDev ?'/api' : ''}${endpoint}`, {
    headers: {
      ...(options?.method !== 'DELETE' && { 'Content-Type': 'application/json' }),
    },
    ...options,
  });

  if (!res.ok) {
    let errorMessage = `API error: ${res.status}`;
    try {
      const data = await res.json();
      if (data?.message) {
        errorMessage = data.message; // Use server-provided message if available
      }
    } catch {
      // fallback to plain text
      try {
        const text = await res.text();
        if (text) errorMessage = text;
      } catch {}
    }
    throw new Error(errorMessage);
  }

  if (res.status === 204) {
    return null as unknown as T;
  }

  return res.json();
}
